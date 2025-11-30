# Prisma 数据库集成 - 快速入门

## ✅ 迁移完成！

PayPal 支付系统已成功从内存存储迁移到 Prisma 数据库。

---

## 🎉 测试结果

### ✅ 系统状态
```bash
curl http://localhost:3000/api/paypal/test
```

**结果：**
- ✅ PayPal SDK 已安装
- ✅ Prisma 已安装  
- ✅ 数据库已连接
- ✅ 所有配置正确

### ✅ 创建订单测试
```bash
curl -X POST http://localhost:3000/api/paypal/create \
  -H "Content-Type: application/json" \
  -d '{"planId":"basic","userId":"test_user_001"}'
```

**结果：**
```json
{
  "success": true,
  "orderId": "cmiic6q9e0001ky0hywe1fudf",
  "paypalOrderId": "6N6785319W603902D",
  "approveUrl": "https://www.sandbox.paypal.com/checkoutnow?token=...",
  "plan": {
    "id": "basic",
    "name": "基础包",
    "credits": 10,
    "amount": "9.9"
  }
}
```

### ✅ 查询订单测试
```bash
curl "http://localhost:3000/api/paypal/query?userId=test_user_001"
```

**结果：**
```json
{
  "success": true,
  "orders": [
    {
      "id": "cmiic6q9e0001ky0hywe1fudf",
      "userId": "test_user_001",
      "planId": "basic",
      "planName": "基础包",
      "credits": 10,
      "amount": 9.9,
      "currency": "USD",
      "paypalOrderId": "6N6785319W603902D",
      "status": "pending",
      "createdAt": "2025-11-28T04:02:32.691Z",
      "updatedAt": "2025-11-28T04:02:34.971Z"
    }
  ],
  "credits": {
    "userId": "test_user_001",
    "totalCredits": 0,
    "usedCredits": 0,
    "remainingCredits": 0
  }
}
```

---

## 📊 数据库架构

### User（用户表）
- `id` - 用户 ID（主键）
- `totalCredits` - 总充值 credits
- `usedCredits` - 已使用 credits
- `remainingCredits` - 剩余 credits

### Order（订单表）
- `id` - 订单 ID（主键）
- `userId` - 用户 ID（外键）
- `paypalOrderId` - PayPal 订单 ID（唯一索引）
- `status` - 订单状态（pending/completed/failed）
- `credits` - Credits 数量
- `amount` - 金额

### CreditUsageRecord（使用记录表）
- `id` - 记录 ID（主键）
- `userId` - 用户 ID（外键）
- `amount` - 变动数量（正数=充值，负数=消费）
- `type` - 类型（purchase/usage/refund）

---

## 🔧 常用命令

### 查看数据库
```bash
npx prisma studio
```
打开浏览器可视化查看数据库内容。

### 创建迁移
```bash
npx prisma migrate dev --name your_migration_name
```

### 重置数据库
```bash
npx prisma migrate reset
```

### 生成 Prisma Client
```bash
npx prisma generate
```

---

## 📝 代码示例

### 创建订单
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

### 查询订单
```typescript
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

### 管理 Credits
```typescript
import { UserCreditsService } from '@/lib/prisma';

// 增加 Credits
await UserCreditsService.addCredits('user_123', 10, 'order_xxx');

// 使用 Credits
await UserCreditsService.useCredits('user_123', 1, 'AI 问答服务');

// 查询余额
const credits = await UserCreditsService.getUserCredits('user_123');
```

---

## 🔄 完整支付流程

### 1. 用户选择套餐
前端 → `POST /api/paypal/create`

**数据库操作：**
- 创建 User（如果不存在）
- 创建 Order，状态为 `pending`
- 保存 PayPal Order ID

### 2. 用户完成支付
PayPal → 前端 → `POST /api/paypal/capture`

**数据库操作：**
- 查询 Order（通过 `paypalOrderId`）
- 更新 Order 状态为 `completed`
- 增加 User 的 `remainingCredits`
- 创建 CreditUsageRecord（类型为 `purchase`）

### 3. 用户使用服务
业务逻辑 → `UserCreditsService.useCredits()`

**数据库操作：**
- 检查 User 的 `remainingCredits`
- 扣减 `remainingCredits`，增加 `usedCredits`
- 创建 CreditUsageRecord（类型为 `usage`）

---

## ⚠️ 重要提示

### 1. 数据持久化
- ✅ 数据存储在 `prisma/dev.db` 文件中
- ✅ 服务器重启后数据**不会丢失**
- ⚠️ 生产环境请切换到 PostgreSQL 或 MySQL

### 2. 环境变量
在 `.env.local` 中配置：
```bash
DATABASE_URL="file:./dev.db"  # 开发环境
# DATABASE_URL="postgresql://..." # 生产环境
```

### 3. 备份数据库
```bash
# SQLite 备份
cp prisma/dev.db prisma/dev.db.backup

# 查看备份
npx prisma studio --schema prisma/schema.prisma
```

---

## 🚀 生产环境部署

### 切换到 PostgreSQL

1. **更新 `prisma/schema.prisma`：**
```prisma
datasource db {
  provider = "postgresql"  // 改为 postgresql
  url      = env("DATABASE_URL")
}
```

2. **更新环境变量：**
```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

3. **运行迁移：**
```bash
npx prisma migrate deploy
```

4. **生成 Client：**
```bash
npx prisma generate
```

---

## 📖 详细文档

| 文档 | 说明 |
|------|------|
| **PRISMA-MIGRATION.md** | 完整的迁移文档 |
| **PAYPAL-SETUP.md** | PayPal 快速设置 |
| **README-PAYPAL.md** | PayPal 完整文档 |

---

## 🎊 总结

### 已完成
- ✅ Prisma 5.22.0 安装
- ✅ SQLite 数据库创建
- ✅ 3 个数据模型（User/Order/CreditUsageRecord）
- ✅ 所有 API 路由迁移完成
- ✅ UserCreditsService 创建
- ✅ InMemoryStore 已废弃
- ✅ 测试通过

### 优势
- ✅ **数据持久化** - 不再丢失数据
- ✅ **类型安全** - TypeScript 支持
- ✅ **性能优化** - 索引和查询优化
- ✅ **关系管理** - 自动关联查询
- ✅ **生产就绪** - 支持多种数据库

### 下一步
1. ✅ 测试完整支付流程
2. ✅ 查看数据库内容（`npx prisma studio`）
3. ⚠️ 生产环境切换到 PostgreSQL
4. ⚠️ 配置数据库备份

---

**开始使用：**
```bash
# 查看数据库
npx prisma studio

# 测试 API
curl http://localhost:3000/api/paypal/test
```

**🎉 Prisma 集成完成！数据库已就绪！**

