# PayPal 支付集成 - 快速设置指南

## ✅ 已完成的功能

- ✅ PayPal SDK 安装
- ✅ PayPal 客户端配置（支持 sandbox/live 模式）
- ✅ 创建订单 API
- ✅ 捕获支付 API
- ✅ 查询订单 API
- ✅ 前端 PayPal 按钮集成
- ✅ 订单与 Credits 管理
- ✅ 完整的支付流程

## 🚀 快速开始（3 步）

### 1️⃣ 获取 PayPal 测试凭证

访问：https://developer.paypal.com/dashboard/

1. 登录/注册 PayPal Developer 账户
2. 点击 **Apps & Credentials**
3. 在 **Sandbox** 标签下创建应用
4. 复制 **Client ID** 和 **Secret**

### 2️⃣ 配置环境变量

创建 `.env.local` 文件（或复制 `env.example`）：

```bash
# 将下面的 your_client_id 和 your_secret 替换为你的真实凭证
PAYPAL_CLIENT_ID=你的_Client_ID
PAYPAL_CLIENT_SECRET=你的_Secret
PAYPAL_MODE=sandbox

# 前端也需要 Client ID
NEXT_PUBLIC_PAYPAL_CLIENT_ID=你的_Client_ID

# 应用地址
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3️⃣ 启动测试

```bash
npm run dev
```

访问：http://localhost:3000/pricing

点击任意套餐的「立即购买」→ 选择「PayPal 支付」→ 测试支付流程

## 🧪 测试账户

在 PayPal Developer Dashboard 创建测试买家账户：

1. 进入 **Sandbox** → **Accounts**
2. 复制测试买家邮箱和密码
3. 在支付时使用测试账户登录

## 📁 文件结构

```
├── app/api/paypal/
│   ├── create/route.ts    # 创建订单
│   ├── capture/route.ts   # 捕获支付
│   └── query/route.ts     # 查询订单
├── lib/paypal/
│   ├── client.ts          # PayPal 配置
│   └── orders.ts          # 订单工具
├── models/
│   └── order.ts           # 数据模型
└── components/pricing/
    ├── PayPalButton.tsx   # PayPal 按钮
    └── PricingContent.tsx # 定价页面（已更新）
```

## ⚠️ 重要提示

### 目前使用内存存储
- 订单和 Credits 存储在内存中
- **服务器重启后数据会丢失**
- 生产环境请替换为数据库（如 Prisma + PostgreSQL）

### 货币设置
- PayPal 当前配置为 **USD（美元）**
- 如需使用人民币，修改 `lib/paypal/orders.ts` 中的 `currency` 参数

### 切换到生产环境
1. 在 PayPal Dashboard 的 **Live** 标签下创建应用
2. 获取生产环境凭证
3. 修改 `.env.local`：`PAYPAL_MODE=live`

## 🔍 API 测试

### 创建订单
```bash
curl -X POST http://localhost:3000/api/paypal/create \
  -H "Content-Type: application/json" \
  -d '{"planId":"basic","userId":"test_user"}'
```

### 查询订单
```bash
curl "http://localhost:3000/api/paypal/query?userId=test_user"
```

## 📖 详细文档

完整的集成文档、API 参考、安全建议等，请查看：
- **README-PAYPAL.md** - 完整集成文档

## 🛠️ 故障排查

**PayPal 按钮不显示？**
- 检查 `NEXT_PUBLIC_PAYPAL_CLIENT_ID` 是否配置
- 打开浏览器开发者工具查看错误

**订单创建失败？**
- 验证 `PAYPAL_CLIENT_ID` 和 `PAYPAL_CLIENT_SECRET`
- 确认 `PAYPAL_MODE` 设置正确

**支付成功但 Credits 未增加？**
- 查看服务器控制台日志
- 检查订单状态：`GET /api/paypal/query?userId=你的用户ID`

## 💡 下一步

1. **集成数据库**: 使用 Prisma 实现数据持久化
2. **添加用户认证**: 使用 NextAuth.js 获取真实用户
3. **配置 Webhook**: 监听 PayPal 事件（退款、争议等）
4. **优化用户体验**: 添加加载动画、错误提示等

---

**需要帮助？** 查看 [PayPal 官方文档](https://developer.paypal.com/docs/)

