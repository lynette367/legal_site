# PayPal 支付集成文档

## 📦 已完成的集成

本项目已完整集成 PayPal 官方支付系统（PayPal Orders API），支持按次收费和套餐制。

### 文件结构

```
├── app/
│   └── api/
│       └── paypal/
│           ├── create/route.ts      # 创建订单 API
│           ├── capture/route.ts     # 捕获支付 API
│           └── query/route.ts       # 查询订单 API
├── lib/
│   └── paypal/
│       ├── client.ts                # PayPal 客户端配置
│       └── orders.ts                # 订单工具函数
├── models/
│   └── order.ts                     # 订单模型与内存存储
├── components/
│   └── pricing/
│       ├── PayPalButton.tsx         # PayPal 按钮组件
│       └── PricingContent.tsx       # 定价页面（已更新）
└── .env.local                       # 环境变量配置
```

## 🚀 快速开始

### 1. 获取 PayPal 凭证

1. 访问 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. 创建或登录你的 PayPal 开发者账户
3. 进入 **Apps & Credentials**
4. 创建一个新的 **REST API app**
5. 复制 **Client ID** 和 **Secret**

### 2. 配置环境变量

编辑 `.env.local` 文件：

```bash
# PayPal 配置
PAYPAL_CLIENT_ID=your_actual_client_id_here
PAYPAL_CLIENT_SECRET=your_actual_client_secret_here
PAYPAL_MODE=sandbox  # 测试环境使用 sandbox，生产环境使用 live

# 前端 PayPal Client ID
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_actual_client_id_here

# 应用 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 启动项目

```bash
npm run dev
```

访问 http://localhost:3000/pricing 测试支付功能

## 💳 支付流程

### 用户端流程

1. 用户在 `/pricing` 页面选择套餐
2. 点击「立即购买」打开支付弹窗
3. 选择「PayPal 支付」
4. 点击 PayPal 按钮，弹出 PayPal 支付窗口
5. 登录 PayPal 账户或使用信用卡支付
6. 支付成功后自动跳转到成功页面
7. 系统自动为用户增加对应的 credits

### 技术流程

```
前端 PayPalButton 组件
  ↓
POST /api/paypal/create
  → 创建内部订单记录
  → 调用 PayPal API 创建订单
  → 返回 PayPal Order ID
  ↓
用户在 PayPal 完成支付
  ↓
POST /api/paypal/capture
  → 捕获 PayPal 订单
  → 更新订单状态为 completed
  → 为用户增加 credits
  → 返回成功结果
```

## 📊 API 接口

### 1. 创建订单

**端点:** `POST /api/paypal/create`

**请求体:**
```json
{
  "planId": "basic",
  "userId": "user_123"
}
```

**响应:**
```json
{
  "success": true,
  "orderId": "order_1234567890_abc",
  "paypalOrderId": "8XY12345AB678901C",
  "approveUrl": "https://www.sandbox.paypal.com/checkoutnow?token=...",
  "plan": {
    "id": "basic",
    "name": "基础包",
    "credits": 10,
    "amount": "9.9"
  }
}
```

### 2. 捕获支付

**端点:** `POST /api/paypal/capture`

**请求体:**
```json
{
  "paypalOrderId": "8XY12345AB678901C"
}
```

**响应:**
```json
{
  "success": true,
  "order": {
    "id": "order_1234567890_abc",
    "userId": "user_123",
    "status": "completed",
    "credits": 10,
    ...
  },
  "credits": {
    "userId": "user_123",
    "totalCredits": 10,
    "remainingCredits": 10,
    ...
  }
}
```

### 3. 查询订单

**端点:** `GET /api/paypal/query`

**查询参数:**
- `orderId`: 内部订单 ID
- `paypalOrderId`: PayPal 订单 ID
- `userId`: 用户 ID（查询该用户所有订单）

**示例:**
```
GET /api/paypal/query?userId=user_123
GET /api/paypal/query?orderId=order_1234567890_abc
GET /api/paypal/query?paypalOrderId=8XY12345AB678901C
```

## 🗄️ 数据模型

### OrderRecord

```typescript
{
  id: string;              // 内部订单 ID
  userId: string;          // 用户 ID
  planId: string;          // 套餐 ID
  planName: string;        // 套餐名称
  credits: number;         // Credits 数量
  amount: string;          // 金额
  currency: string;        // 货币类型
  paypalOrderId?: string;  // PayPal 订单 ID
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  capturedAt?: Date;
  errorMessage?: string;
}
```

### UserCredits

```typescript
{
  userId: string;
  totalCredits: number;       // 总充值 credits
  usedCredits: number;        // 已使用 credits
  remainingCredits: number;   // 剩余 credits
  lastUpdated: Date;
}
```

## ⚠️ 重要提示

### 当前使用内存存储

**注意：** 目前订单和 credits 数据存储在内存中（`InMemoryStore`），服务器重启后数据会丢失。

**生产环境建议：**
- 使用数据库（PostgreSQL, MySQL, MongoDB 等）
- 集成 ORM（Prisma, TypeORM 等）
- 实现持久化存储

### 货币设置

- 当前默认使用 `USD`（美元）
- 套餐价格显示为人民币 `¥`，但 PayPal 使用美元
- 可以在 `lib/paypal/orders.ts` 中修改货币类型

### Sandbox vs Live 模式

**Sandbox（测试）模式:**
- 使用测试凭证
- 支付不会真实扣款
- 用于开发和测试

**Live（生产）模式:**
- 使用生产凭证
- 真实扣款
- 确保测试充分后再切换

切换方式：修改 `.env.local` 中的 `PAYPAL_MODE`

## 🧪 测试

### Sandbox 测试账户

1. 在 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/) 中创建测试账户
2. 获取测试买家账户信息
3. 在支付时使用测试账户登录

### 测试信用卡

PayPal Sandbox 提供测试信用卡号：
- Visa: 4111 1111 1111 1111
- Mastercard: 5555 5555 5555 4444
- CVV: 任意 3 位数字
- 到期日期: 任意未来日期

## 🔐 安全建议

1. **永远不要** 将 `.env.local` 提交到 Git
2. **永远不要** 在前端暴露 `PAYPAL_CLIENT_SECRET`
3. 所有支付逻辑必须在服务器端处理
4. 验证所有用户输入
5. 记录所有支付操作日志
6. 定期审查订单和 credits 数据

## 📝 后续优化建议

1. **数据库集成**
   - 使用 Prisma 或其他 ORM
   - 实现订单和用户数据持久化

2. **用户认证**
   - 集成 NextAuth.js 或其他认证方案
   - 从 session 获取真实用户 ID

3. **Webhook 集成**
   - 监听 PayPal webhook 事件
   - 处理退款、争议等场景

4. **错误处理**
   - 完善错误日志
   - 用户友好的错误提示

5. **性能优化**
   - API 响应缓存
   - 订单查询优化

6. **国际化**
   - 支持多货币
   - 多语言界面

## 🛠️ 故障排查

### PayPal SDK 加载失败
- 检查 `NEXT_PUBLIC_PAYPAL_CLIENT_ID` 是否配置
- 检查网络连接
- 查看浏览器控制台错误信息

### 订单创建失败
- 验证 PayPal 凭证是否正确
- 检查 `PAYPAL_MODE` 设置
- 查看服务器日志

### 支付捕获失败
- 确认订单状态
- 检查 PayPal Order ID 是否有效
- 验证订单是否已被批准

## 📞 支持

- PayPal 开发者文档: https://developer.paypal.com/docs/
- PayPal REST API 参考: https://developer.paypal.com/api/rest/

---

**集成完成日期:** 2025-11-28
**版本:** 1.0.0

