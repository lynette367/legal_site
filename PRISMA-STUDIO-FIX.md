# Prisma Studio 问题解决

## ✅ 问题已确认

User 表确实存在于数据库中！

### 数据库状态
- ✅ 数据库文件：`prisma/dev.db` (128 KB)
- ✅ User 表：存在，包含 11 个字段
- ✅ 数据：2 个 User 记录，1 个 Order 记录

### 数据库中的表
```
✅ User
✅ Account
✅ Session
✅ VerificationToken
✅ Order
✅ CreditUsageRecord
✅ _prisma_migrations
```

---

## 🔧 解决方案

### 方法 1：使用启动脚本（推荐）

我已经创建了一个启动脚本：

```bash
cd /Users/lynnyee/Downloads/legal-law-site
./start-prisma-studio.sh
```

这个脚本会：
1. 自动设置正确的 DATABASE_URL
2. 显示数据库中的表
3. 显示记录数
4. 启动 Prisma Studio

### 方法 2：手动启动

```bash
cd /Users/lynnyee/Downloads/legal-law-site
export DATABASE_URL="file:./dev.db"
npx prisma studio
```

### 方法 3：使用 package.json 脚本

添加到 `package.json`：

```json
{
  "scripts": {
    "studio": "prisma studio"
  }
}
```

然后运行：
```bash
npm run studio
```

---

## 🔍 验证数据库

### 查看所有表
```bash
cd /Users/lynnyee/Downloads/legal-law-site
sqlite3 prisma/dev.db ".tables"
```

### 查看 User 表结构
```bash
sqlite3 prisma/dev.db "PRAGMA table_info(User);"
```

### 查看 User 表数据
```bash
sqlite3 prisma/dev.db "SELECT * FROM User;"
```

### 查看所有表的记录数
```bash
sqlite3 prisma/dev.db "
SELECT 'User' as table_name, COUNT(*) as count FROM User
UNION ALL
SELECT 'Order', COUNT(*) FROM 'Order'
UNION ALL
SELECT 'Account', COUNT(*) FROM Account
UNION ALL
SELECT 'Session', COUNT(*) FROM Session;
"
```

---

## 🐛 可能的问题和解决方法

### 问题 1：Prisma Studio 显示空白或错误的数据库

**原因：** DATABASE_URL 环境变量未设置或设置错误

**解决：**
```bash
# 确保在启动 Prisma Studio 前设置环境变量
export DATABASE_URL="file:./dev.db"
npx prisma studio
```

### 问题 2：表不显示

**原因：** 浏览器缓存或 Prisma Studio 缓存

**解决：**
1. 关闭 Prisma Studio（Ctrl+C）
2. 清除浏览器缓存或使用无痕模式
3. 重新启动 Prisma Studio

### 问题 3：数据库文件路径错误

**原因：** 相对路径问题

**解决：**
```bash
# 使用绝对路径
export DATABASE_URL="file:/Users/lynnyee/Downloads/legal-law-site/prisma/dev.db"
npx prisma studio
```

---

## 📊 当前数据库内容

### User 表
- **记录数：** 2
- **字段：**
  - id (TEXT, PRIMARY KEY)
  - email (TEXT)
  - name (TEXT)
  - emailVerified (DATETIME)
  - password (TEXT)
  - image (TEXT)
  - totalCredits (INTEGER, default: 0)
  - usedCredits (INTEGER, default: 0)
  - remainingCredits (INTEGER, default: 0)
  - createdAt (DATETIME)
  - updatedAt (DATETIME)

### Order 表
- **记录数：** 1
- **字段：**
  - id, userId, planId, planName, credits, amount, currency
  - paypalOrderId, status, capturedAt, errorMessage
  - createdAt, updatedAt

---

## 🚀 立即启动

### 选项 1：使用脚本
```bash
cd /Users/lynnyee/Downloads/legal-law-site
./start-prisma-studio.sh
```

### 选项 2：手动启动
```bash
cd /Users/lynnyee/Downloads/legal-law-site
export DATABASE_URL="file:./dev.db"
npx prisma studio
```

然后访问：**http://localhost:5555**

---

## ✅ 预期结果

启动成功后，你应该在 Prisma Studio 中看到：

1. **左侧边栏：** 7 个表
   - User
   - Account
   - Session
   - VerificationToken
   - Order
   - CreditUsageRecord
   - _prisma_migrations

2. **User 表：** 2 条记录

3. **Order 表：** 1 条记录

---

## 🔄 如果还是看不到

1. **检查是否在正确的目录：**
```bash
pwd
# 应该显示：/Users/lynnyee/Downloads/legal-law-site
```

2. **检查数据库文件是否存在：**
```bash
ls -lh prisma/dev.db
# 应该显示：-rw-r--r-- ... 128K ... dev.db
```

3. **重新生成 Prisma Client：**
```bash
npx prisma generate
```

4. **强制同步数据库：**
```bash
export DATABASE_URL="file:./dev.db"
npx prisma db push
```

5. **重启 Prisma Studio：**
- 按 Ctrl+C 停止
- 重新运行启动命令

---

## 📝 添加到 .env.local

确保 `.env.local` 包含：

```bash
DATABASE_URL="file:./dev.db"
```

---

## 🎯 总结

- ✅ User 表存在
- ✅ 数据库有数据
- ✅ Schema 已同步
- ⚠️ 需要正确设置 DATABASE_URL
- ⚠️ 可能需要清除缓存

**立即尝试：**
```bash
./start-prisma-studio.sh
```

或

```bash
export DATABASE_URL="file:./dev.db" && npx prisma studio
```


