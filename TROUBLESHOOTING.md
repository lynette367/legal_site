# 故障排查指南

## ✅ 问题已解决：Prisma Studio 错误

### 问题描述
运行 `npx prisma studio` 时出现错误：
```
Unable to process 'count' query undefined
```

### 根本原因
数据库文件 `prisma/dev.db` 不存在或损坏。

### 解决方案

✅ **已执行的修复步骤：**

1. **重新生成 Prisma Client**
```bash
npx prisma generate
```

2. **重新创建数据库和迁移**
```bash
export DATABASE_URL="file:./dev.db"
npx prisma migrate dev --name init
```

3. **验证数据库文件已创建**
```bash
ls -lh prisma/dev.db
# 输出: -rw-r--r-- 76K dev.db ✅
```

### ✅ 数据库已就绪

数据库文件已成功创建在 `prisma/dev.db`（76 KB）。

---

## 🚀 现在可以使用 Prisma Studio

### 启动 Prisma Studio

**方法 1：使用环境变量（推荐）**
```bash
cd /Users/lynnyee/Downloads/legal-law-site
export DATABASE_URL="file:./dev.db"
npx prisma studio
```

**方法 2：确保 .env.local 包含 DATABASE_URL**
```bash
# 确保 .env.local 文件中有：
DATABASE_URL="file:./dev.db"

# 然后启动
npx prisma studio
```

### 访问 Studio
浏览器会自动打开：`http://localhost:5555`

---

## 📊 验证数据库

### 检查数据库文件
```bash
ls -lh prisma/
```

应该看到：
```
dev.db            76K   # 数据库文件
dev.db-journal    8.5K  # 日志文件
migrations/             # 迁移文件夹
schema.prisma     1.8K  # Schema 定义
```

### 测试数据库连接
```bash
# 重启开发服务器
npm run dev

# 测试 API
curl http://localhost:3000/api/paypal/test
```

---

## 🔧 常见问题

### Q1: Prisma Studio 仍然报错？

**解决方案：**
```bash
# 1. 停止所有运行的进程
pkill -f "next dev"
pkill -f "prisma studio"

# 2. 重新生成
npx prisma generate

# 3. 启动 Studio
export DATABASE_URL="file:./dev.db"
npx prisma studio
```

### Q2: 数据库文件再次丢失？

**可能原因：**
- `.gitignore` 导致文件被清理
- 手动删除了文件
- 数据库路径配置错误

**解决方案：**
```bash
# 重新创建数据库
export DATABASE_URL="file:./dev.db"
npx prisma migrate dev --name recreate
```

### Q3: 环境变量未生效？

**解决方案：**
```bash
# 确保 .env.local 存在并包含：
echo 'DATABASE_URL="file:./dev.db"' >> .env.local

# 或在每次运行时手动导出：
export DATABASE_URL="file:./dev.db"
```

### Q4: 权限错误？

**解决方案：**
```bash
# 检查文件权限
ls -l prisma/dev.db

# 如果权限不足，修复权限：
chmod 644 prisma/dev.db
```

---

## 🔄 完整重置流程

如果遇到严重问题，可以完全重置数据库：

```bash
cd /Users/lynnyee/Downloads/legal-law-site

# 1. 删除旧数据库（如果存在）
rm -f prisma/dev.db prisma/dev.db-journal

# 2. 删除迁移历史
rm -rf prisma/migrations

# 3. 重新创建数据库
export DATABASE_URL="file:./dev.db"
npx prisma migrate dev --name init

# 4. 生成 Prisma Client
npx prisma generate

# 5. 验证
ls -lh prisma/dev.db

# 6. 启动 Studio
npx prisma studio
```

---

## 📋 环境检查清单

运行 Prisma Studio 前，确保：

- ✅ `prisma/schema.prisma` 文件存在
- ✅ `prisma/dev.db` 文件存在（约 76KB）
- ✅ `.env.local` 包含 `DATABASE_URL="file:./dev.db"`
- ✅ Prisma Client 已生成（运行 `npx prisma generate`）
- ✅ 迁移已应用（`prisma/migrations` 文件夹存在）

### 快速检查命令
```bash
# 一键检查所有项
cd /Users/lynnyee/Downloads/legal-law-site

echo "Schema 文件:" && ls prisma/schema.prisma
echo "数据库文件:" && ls -lh prisma/dev.db
echo "迁移文件夹:" && ls prisma/migrations
echo "环境变量:" && grep DATABASE_URL .env.local
```

---

## 🎯 推荐工作流程

### 日常开发
```bash
# 1. 启动开发服务器
npm run dev

# 2. 在另一个终端启动 Studio
export DATABASE_URL="file:./dev.db"
npx prisma studio

# 3. 访问 http://localhost:5555 查看数据库
```

### 修改 Schema 后
```bash
# 1. 编辑 prisma/schema.prisma

# 2. 创建并应用迁移
npx prisma migrate dev --name your_change_name

# 3. Studio 会自动刷新
```

---

## 📖 相关文档

- **PRISMA-QUICKSTART.md** - Prisma 快速入门
- **PRISMA-MIGRATION.md** - 完整迁移文档
- **DATABASE-MIGRATION-COMPLETE.md** - 数据库迁移总结

---

## ✅ 问题已解决

数据库已成功创建，Prisma Studio 现在应该可以正常工作了！

**立即尝试：**
```bash
export DATABASE_URL="file:./dev.db"
npx prisma studio
```

如果还有问题，请检查：
1. 开发服务器是否运行中（`npm run dev`）
2. 端口 5555 是否被占用
3. 数据库文件权限是否正确

---

**最后更新：** 2025-11-28
**状态：** ✅ 已解决

