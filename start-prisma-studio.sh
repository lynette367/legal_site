#!/bin/bash

# 启动 Prisma Studio 脚本

cd /Users/lynnyee/Downloads/legal-law-site

# 设置数据库 URL
export DATABASE_URL="file:./dev.db"

echo "🔍 正在检查数据库..."
echo "数据库路径: $(pwd)/prisma/dev.db"
echo ""

# 检查数据库中的表
echo "📊 数据库中的表："
sqlite3 prisma/dev.db ".tables"
echo ""

echo "👥 User 表中的记录数："
sqlite3 prisma/dev.db "SELECT COUNT(*) FROM User;"
echo ""

echo "🚀 启动 Prisma Studio..."
echo "访问: http://localhost:5555"
echo ""

npx prisma studio


