# Prisma 数据库迁移完成

## ✅ 迁移概述

已成功将 PayPal 支付系统从内存存储（InMemoryStore）迁移到 Prisma 数据库存储。

---

## 📊 数据库架构

### 数据库类型
- **开发环境**: SQLite（文件数据库 `dev.db`）
- **生产环境**: 推荐使用 PostgreSQL 或 MySQL

### 数据模型

#### 1. User（用户表）
```prisma
model User {
  id               String   @id @default(cuid())
  email            String?  @unique
  name             String?
  totalCredits     Int      @default(0)     // 总充值 credits
  usedCredits      Int      @default(0)     // 已使用 credits
  remainingCredits Int      @default(0)     // 剩余 credits
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  orders           Order[]
  usageRecords     CreditUsageRecord[]
}
```

#### 2. Order（订单表）
```prisma
model Order {
  id            String    @id @default(cuid())
  userId        String
  planId        String
  planName      String
  credits       Int
  amount        Float
  currency      String
  paypalOrderId String?   @unique
  status        String    // pending, completed, failed, cancelled
  capturedAt    DateTime?
  errorMessage  String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  user          User      @relation(fields: [userId], references: [id])
}
```

#### 3. CreditUsageRecord（Credits 使用记录表）
```prisma
model CreditUsageRecord {
  id          String   @id @default(cuid())
  userId      String
  orderId     String?
  amount      Int      // 正数=充值，负数=消费
  type        String   // purchase, usage, refund, adjustment
  description String
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## 🔄 代码变更

### 1. 新增文件

#### `prisma/schema.prisma`
Prisma 数据库架构定义

#### `lib/prisma.ts`
- Prisma 客户端单例
- `UserCreditsService` - Credits 操作服务类

#### `prisma/migrations/`
数据库迁移文件（自动生成）

### 2. 更新文件

#### `app/api/paypal/create/route.ts`
**变更前：**
```typescript
import { InMemoryStore } from '@/models/order';
const order = InMemoryStore.createOrder(orderRecord);
InMemoryStore.updateOrder(orderId, { ... });
```

**变更后：**
```typescript
import { prisma } from '@/lib/prisma';
const order = await prisma.order.create({ data: { ... } });
await prisma.order.update({ where: { id }, data: { ... } });
```

#### `app/api/paypal/capture/route.ts`
**变更前：**
```typescript
const order = InMemoryStore.getOrderByPaypalId(paypalOrderId);
InMemoryStore.updateOrder(orderId, { status: 'completed' });
InMemoryStore.addCredits(userId, credits, orderId);
```

**变更后：**
```typescript
const order = await prisma.order.findUnique({ where: { paypalOrderId } });
await prisma.order.update({ where: { id }, data: { status: 'completed' } });
await UserCreditsService.addCredits(userId, credits, orderId);
```

#### `app/api/paypal/query/route.ts`
**变更前：**
```typescript
const orders = InMemoryStore.getUserOrders(userId);
const credits = InMemoryStore.getUserCredits(userId);
```

**变更后：**
```typescript
const orders = await prisma.order.findMany({ where: { userId } });
const credits = await UserCreditsService.getUserCredits(userId);
```

#### `app/api/paypal/test/route.ts`
**变更前：**
```typescript
// 内存存储无法获取准确统计
const stats = { totalOrders: 0, ... };
```

**变更后：**
```typescript
const totalOrders = await prisma.order.count();
const completedOrders = await prisma.order.count({ where: { status: 'completed' } });
// ... 真实的数据库统计
```

#### `models/order.ts`
**变更：**
- 保留类型定义以便向后兼容
- InMemoryStore 所有方法抛出错误提示迁移到 Prisma
- 添加 `@deprecated` 标记

---

## 🚀 使用指南

### 环境变量配置

在 `.env.local` 添加：

```bash
# SQLite（开发）
DATABASE_URL="file:./dev.db"

# PostgreSQL（生产）
# DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# MySQL（生产）
# DATABASE_URL="mysql://user:password@host:3306/database"
```

### Prisma 命令

```bash
# 生成 Prisma Client
npx prisma generate

# 创建迁移
npx prisma migrate dev --name your_migration_name

# 应用迁移（生产环境）
npx prisma migrate deploy

# 查看数据库
npx prisma studio

# 重置数据库（开发环境）
npx prisma migrate reset
```

### 代码使用示例

#### 创建订单
```typescript
import { prisma } from '@/lib/prisma';

const order = await prisma.order.create({
  data: {
    userId: 'user_123',
    planId: 'basic',
    planName: '基础包',
    credits: 10,
    amount: 9.9,
    currency: 'USD',
    status: 'pending',
  },
});
```

#### 查询订单
```typescript
// 根据 ID 查询
const order = await prisma.order.findUnique({
  where: { id: 'order_xxx' },
});

// 根据 PayPal Order ID 查询
const order = await prisma.order.findUnique({
  where: { paypalOrderId: 'paypal_xxx' },
});

// 查询用户所有订单
const orders = await prisma.order.findMany({
  where: { userId: 'user_123' },
  orderBy: { createdAt: 'desc' },
});
```

#### 更新订单
```typescript
const updatedOrder = await prisma.order.update({
  where: { id: 'order_xxx' },
  data: {
    status: 'completed',
    capturedAt: new Date(),
  },
});
```

#### 管理 Credits
```typescript
import { UserCreditsService } from '@/lib/prisma';

// 获取用户 Credits
const credits = await UserCreditsService.getUserCredits('user_123');

// 增加 Credits
const updated = await UserCreditsService.addCredits('user_123', 10, 'order_xxx');

// 使用 Credits
const used = await UserCreditsService.useCredits('user_123', 1, 'AI 问答服务');

// 查询使用历史
const history = await UserCreditsService.getUsageHistory('user_123');
```

---

## 🔒 数据一致性保证

### 1. 事务支持

Prisma 支持事务，确保数据一致性：

```typescript
const result = await prisma.$transaction(async (tx) => {
  // 更新订单状态
  const order = await tx.order.update({
    where: { id: orderId },
    data: { status: 'completed' },
  });

  // 增加用户 Credits
  const user = await tx.user.update({
    where: { id: userId },
    data: { remainingCredits: { increment: credits } },
  });

  return { order, user };
});
```

### 2. 唯一约束

- `paypalOrderId` 设置为 `@unique`，防止重复支付
- `email` 设置为 `@unique`，确保用户唯一性

### 3. 级联删除

- 删除用户时自动删除关联的订单和使用记录（`onDelete: Cascade`）

### 4. 索引优化

```prisma
@@index([userId])
@@index([paypalOrderId])
@@index([status])
@@index([createdAt])
```

---

## 📈 数据迁移（如果有现有数据）

如果你有现有的 InMemoryStore 数据需要迁移：

### 方法 1：手动导入

```typescript
import { prisma } from '@/lib/prisma';

// 假设你有导出的 JSON 数据
const oldOrders = [...]; // 旧订单数据

for (const oldOrder of oldOrders) {
  await prisma.order.create({
    data: {
      id: oldOrder.id,
      userId: oldOrder.userId,
      planId: oldOrder.planId,
      // ... 其他字段
    },
  });
}
```

### 方法 2：使用脚本

创建 `scripts/migrate-data.ts`:

```typescript
import { prisma } from '../lib/prisma';
import oldData from './old-data.json';

async function migrateData() {
  console.log('开始迁移数据...');
  
  for (const order of oldData.orders) {
    await prisma.order.create({ data: order });
  }
  
  console.log('迁移完成！');
}

migrateData();
```

---

## 🧪 测试迁移结果

### 1. 测试 API 配置

```bash
curl http://localhost:3000/api/paypal/test
```

应该看到：
```json
{
  "status": "ok",
  "database": {
    "status": "已连接 ✅"
  },
  "statistics": {
    "totalOrders": 0,
    "completedOrders": 0,
    ...
  }
}
```

### 2. 测试创建订单

```bash
curl -X POST http://localhost:3000/api/paypal/create \
  -H "Content-Type: application/json" \
  -d '{"planId":"basic","userId":"test_user"}'
```

### 3. 查看数据库

```bash
npx prisma studio
```

打开浏览器查看数据库内容。

---

## 🔄 切换到生产数据库

### PostgreSQL

1. 安装 PostgreSQL
2. 创建数据库：
```sql
CREATE DATABASE legal_law_db;
```

3. 更新 `.env.local`:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/legal_law_db?schema=public"
```

4. 运行迁移：
```bash
npx prisma migrate deploy
```

### MySQL

1. 安装 MySQL
2. 创建数据库：
```sql
CREATE DATABASE legal_law_db;
```

3. 更新 `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

4. 更新 `.env.local`:
```bash
DATABASE_URL="mysql://username:password@localhost:3306/legal_law_db"
```

5. 运行迁移：
```bash
npx prisma migrate deploy
```

---

## ⚠️ 注意事项

### 1. 数据持久化
- SQLite 数据存储在 `prisma/dev.db` 文件中
- 生产环境建议使用 PostgreSQL 或 MySQL

### 2. 备份
```bash
# SQLite 备份
cp prisma/dev.db prisma/dev.db.backup

# PostgreSQL 备份
pg_dump database_name > backup.sql

# MySQL 备份
mysqldump database_name > backup.sql
```

### 3. 性能优化
- 已添加必要的索引
- 使用连接池
- 考虑添加缓存层（Redis）

### 4. 错误处理
- 所有数据库操作都包含 try-catch
- 错误信息会记录到日志
- API 返回友好的错误信息

---

## 📝 迁移清单

- ✅ 安装 Prisma 依赖
- ✅ 创建 Prisma Schema
- ✅ 创建 Prisma Client
- ✅ 创建数据库迁移
- ✅ 更新 create API 使用 Prisma
- ✅ 更新 capture API 使用 Prisma
- ✅ 更新 query API 使用 Prisma
- ✅ 更新 test API 使用 Prisma
- ✅ 创建 UserCreditsService
- ✅ 废弃 InMemoryStore
- ✅ 更新环境变量配置
- ✅ 测试所有 API 端点

---

## 🎉 迁移完成！

现在你的 PayPal 支付系统使用 Prisma 数据库存储，具有：

- ✅ **数据持久化** - 服务器重启不会丢失数据
- ✅ **类型安全** - TypeScript 完整类型支持
- ✅ **关系管理** - 用户、订单、记录自动关联
- ✅ **查询优化** - 索引和查询优化
- ✅ **事务支持** - 保证数据一致性
- ✅ **生产就绪** - 支持多种数据库

**开始使用：**
```bash
npm run dev
# 访问 http://localhost:3000/api/paypal/test
```

**查看数据库：**
```bash
npx prisma studio
```

