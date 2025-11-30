# NextAuth 用户系统集成完成

## ✅ 集成完成总结

已成功将 NextAuth 5 用户认证系统集成到项目中，并与 Prisma 数据库、PayPal 支付、Credits 体系深度联动。

---

## 📦 已完成的工作

### 1. 依赖安装 ✅
```bash
npm install next-auth @next-auth/prisma-adapter nodemailer
```

### 2. 数据库架构更新 ✅

#### 新增字段到 User 模型：
- `emailVerified` - 邮箱验证时间
- `password` - 密码（可选，邮箱登录时为 null）
- `image` - 头像 URL
- `accounts` - NextAuth accounts 关联
- `sessions` - NextAuth sessions 关联

#### 新增 NextAuth 模型：
- **Account** - OAuth 账户信息
- **Session** - 用户会话（JWT 模式下不使用）
- **VerificationToken** - 邮箱验证令牌

### 3. NextAuth 配置 ✅

#### 文件：`lib/auth.ts`
- ✅ 使用 `PrismaAdapter` 连接数据库
- ✅ 配置 `EmailProvider`（邮箱验证码登录）
- ✅ 配置 `CredentialsProvider`（密码登录，可选）
- ✅ 设置 `session: { strategy: "jwt" }`
- ✅ Callbacks 注入 `user.id` 到 session

#### 文件：`app/api/auth/[...nextauth]/route.ts`
- ✅ NextAuth API 路由处理器

#### 文件：`types/next-auth.d.ts`
- ✅ TypeScript 类型扩展（添加 `id` 到 session.user）

### 4. 路由保护 ✅

#### 文件：`middleware.ts`
保护以下路由（需要登录）：
- `/dashboard/*` - 用户仪表板
- `/legal-qa/*` - AI 问答
- `/explain/*` - 条款解释
- `/documents/*` - 文书生成
- `/contracts/*` - 合同生成
- `/dispute/*` - 纠纷分析
- `/api/credits/*` - Credits API
- `/api/ai/*` - AI API

### 5. 支付 API 集成 ✅

#### 更新文件：
- `app/api/paypal/create/route.ts` - 从 session 获取 userId
- `app/api/paypal/capture/route.ts` - 验证用户登录和订单归属
- `app/api/paypal/query/route.ts` - 只能查询自己的订单

#### 主要改动：
```typescript
// 之前：从请求体获取 userId
const { planId, userId } = body;

// 现在：从 session 获取 userId
const session = await getServerSession(authOptions);
if (!session || !session.user?.id) {
  return NextResponse.json({ error: '未登录' }, { status: 401 });
}
const userId = session.user.id;
```

### 6. Credits API ✅

#### 新增文件：
- `app/api/credits/me/route.ts` - 获取当前用户 Credits
- `app/api/credits/use/route.ts` - 消费 Credits（AI 功能调用）

### 7. 前端组件更新 ✅

#### `components/common/LoginPanel.tsx`
- ✅ 使用 `signIn("email")` 邮箱登录
- ✅ 支持验证邮件发送
- ✅ 友好的 UI 提示

#### `components/common/UserCenterPanel.tsx`
- ✅ 使用 `useSession()` 获取登录状态
- ✅ 显示用户邮箱和 Credits 余额
- ✅ 支持 `signOut()` 退出登录
- ✅ 未登录时显示登录引导

#### `components/pricing/PricingContent.tsx`
- ✅ 移除临时 `userId`
- ✅ PayPal 按钮自动使用 session

#### `components/pricing/PayPalButton.tsx`
- ✅ 移除 `userId` prop
- ✅ API 自动从 session 获取用户

### 8. 应用层 Provider ✅

#### `app/providers.tsx`
- ✅ `SessionProvider` 包裹整个应用

#### `app/layout.tsx`
- ✅ 使用 `<Providers>` 替代旧的 `UsageProvider`

### 9. 环境变量配置 ✅

#### 新增环境变量：
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="3BGpZ4bgtFt66AojrgnOVxnA0+dUfMz0fMon1uEu7ZY="
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="Panco Legal <noreply@panco.com>"
```

---

## 🔐 用户认证流程

### 1. 邮箱登录流程
```
用户输入邮箱
  ↓
调用 signIn("email", { email })
  ↓
NextAuth 发送验证邮件
  ↓
用户点击邮件中的链接
  ↓
NextAuth 验证 token
  ↓
创建/更新 User 记录
  ↓
创建 JWT session
  ↓
跳转到 /dashboard
```

### 2. 支付流程（已集成 session）
```
用户点击购买套餐
  ↓
检查登录状态（middleware）
  ↓
未登录 → 跳转到 /login
已登录 → 继续
  ↓
点击 PayPal 按钮
  ↓
前端：POST /api/paypal/create { planId }
后端：从 session 获取 userId
  ↓
创建订单（userId 自动关联）
  ↓
PayPal 支付完成
  ↓
前端：POST /api/paypal/capture { paypalOrderId }
后端：验证用户和订单归属
  ↓
更新订单 + 增加 Credits
  ↓
完成
```

### 3. AI 功能使用流程
```
用户访问 AI 功能页
  ↓
middleware 检查登录（未登录 → /login）
  ↓
用户提交问题
  ↓
前端：POST /api/credits/use { amount: 1, description: "AI问答" }
后端：从 session 获取 userId
  ↓
检查 Credits 余额
  ↓
余额不足 → 返回 400
余额充足 → 扣除 Credits
  ↓
调用 AI API
  ↓
返回结果
```

---

## 🚀 快速开始

### 1. 配置环境变量

编辑 `.env.local`：

```bash
# NextAuth 配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here"  # 已自动生成

# 邮箱配置
EMAIL_SERVER="smtp://user:pass@smtp.gmail.com:587"
EMAIL_FROM="Your App <noreply@example.com>"
```

### 2. 配置邮箱服务

#### Gmail 示例：
```bash
EMAIL_SERVER="smtp://youremail@gmail.com:your_app_password@smtp.gmail.com:587"
EMAIL_FROM="Panco Legal <youremail@gmail.com>"
```

**获取 Gmail App Password：**
1. 访问 https://myaccount.google.com/apppasswords
2. 生成应用专用密码
3. 使用该密码替换 `your_app_password`

#### SendGrid 示例：
```bash
EMAIL_SERVER="smtp://apikey:your_sendgrid_api_key@smtp.sendgrid.net:587"
EMAIL_FROM="Panco Legal <noreply@yourdomain.com>"
```

### 3. 启动应用

```bash
npm run dev
```

### 4. 测试登录

1. 访问：http://localhost:3000/login
2. 输入邮箱地址
3. 点击"发送登录邮件"
4. 检查邮箱（包括垃圾邮件）
5. 点击验证链接
6. 自动跳转到 /dashboard

---

## 📊 API 参考

### 认证相关

#### `POST /api/auth/signin`
NextAuth 登录（由 NextAuth 自动处理）

#### `POST /api/auth/signout`
NextAuth 退出（由 NextAuth 自动处理）

#### `GET /api/auth/session`
获取当前 session（由 NextAuth 自动处理）

### Credits 相关

#### `GET /api/credits/me`
获取当前用户 Credits

**响应：**
```json
{
  "success": true,
  "credits": {
    "totalCredits": 10,
    "usedCredits": 0,
    "remainingCredits": 10,
    "lastUpdated": "2025-11-28T..."
  }
}
```

#### `POST /api/credits/use`
消费 Credits

**请求体：**
```json
{
  "amount": 1,
  "description": "AI 法律问答"
}
```

**响应：**
```json
{
  "success": true,
  "credits": {
    "totalCredits": 10,
    "usedCredits": 1,
    "remainingCredits": 9
  },
  "message": "成功消费 1 Credits"
}
```

### 支付相关

#### `POST /api/paypal/create`
创建订单（需要登录，userId 自动从 session 获取）

**请求体：**
```json
{
  "planId": "basic"
}
```

#### `POST /api/paypal/capture`
捕获支付（需要登录，验证订单归属）

#### `GET /api/paypal/query`
查询订单（需要登录，只能查询自己的订单）

---

## 🔧 前端使用指南

### 获取登录状态

```typescript
import { useSession } from "next-auth/react";

export function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>加载中...</div>;
  }
  
  if (!session) {
    return <div>未登录</div>;
  }
  
  return <div>欢迎，{session.user.email}</div>;
}
```

### 登录/登出

```typescript
import { signIn, signOut } from "next-auth/react";

// 邮箱登录
await signIn("email", { 
  email: "user@example.com",
  callbackUrl: "/dashboard"
});

// 退出登录
await signOut({ callbackUrl: "/" });
```

### 获取 Credits

```typescript
const fetchCredits = async () => {
  const response = await fetch("/api/credits/me");
  const data = await response.json();
  if (data.success) {
    console.log(data.credits.remainingCredits);
  }
};
```

### 消费 Credits

```typescript
const useAIFeature = async () => {
  const response = await fetch("/api/credits/use", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: 1,
      description: "AI 法律问答"
    })
  });
  
  const data = await response.json();
  if (data.success) {
    // Credits 扣除成功，继续调用 AI
  } else if (response.status === 400) {
    // Credits 不足
    alert("Credits 余额不足，请先充值");
  }
};
```

---

## ⚠️ 重要提示

### 1. 邮箱配置必需
- 邮箱登录依赖 SMTP 服务器
- 必须配置 `EMAIL_SERVER` 和 `EMAIL_FROM`
- 推荐使用 Gmail、SendGrid 或 Mailgun

### 2. NEXTAUTH_SECRET
- 已自动生成：`3BGpZ4bgtFt66AojrgnOVxnA0+dUfMz0fMon1uEu7ZY=`
- 生产环境必须使用强随机密钥
- 不要泄露到公开仓库

### 3. Session 策略
- 使用 JWT session（`strategy: "jwt"`）
- 不依赖数据库 Session 表
- 更适合 serverless 部署

### 4. 路由保护
- AI 功能页面受 middleware 保护
- 未登录自动跳转到 /login
- API 路由返回 401 错误

### 5. 数据安全
- 所有支付 API 验证用户登录
- 验证订单归属（防止越权访问）
- Credits 操作自动关联当前用户

---

## 🧪 测试清单

### 登录测试
- [ ] 访问 /login 页面
- [ ] 输入邮箱发送验证邮件
- [ ] 接收验证邮件
- [ ] 点击链接完成登录
- [ ] 检查 session 是否创建

### 支付测试
- [ ] 登录后访问 /pricing
- [ ] 选择套餐点击购买
- [ ] 完成 PayPal 支付
- [ ] 检查 Credits 是否增加
- [ ] 查看订单记录

### Credits 测试
- [ ] 访问用户中心查看 Credits
- [ ] 使用 AI 功能
- [ ] 检查 Credits 是否扣除
- [ ] Credits 不足时的提示

### 路由保护测试
- [ ] 未登录访问 /dashboard → 跳转 /login
- [ ] 未登录访问 /legal-qa → 跳转 /login
- [ ] 未登录调用 /api/credits/me → 401 错误

---

## 📖 相关文档

- **NextAuth 官方文档**: https://next-auth.js.org/
- **Prisma Adapter**: https://authjs.dev/reference/adapter/prisma
- **PAYPAL-SETUP.md** - PayPal 支付集成
- **PRISMA-MIGRATION.md** - Prisma 数据库迁移

---

## 🎉 集成完成！

NextAuth 用户系统已成功集成，现在你的应用拥有：

- ✅ 完整的用户认证系统
- ✅ 邮箱验证码登录
- ✅ JWT session 管理
- ✅ 路由保护
- ✅ 支付系统深度集成
- ✅ Credits 体系自动关联
- ✅ 安全的 API 访问控制

**立即测试：**
```bash
npm run dev
# 访问 http://localhost:3000/login
```

**配置邮箱后即可使用！** 🚀

