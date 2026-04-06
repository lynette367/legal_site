# 🚀 快速开始指南

## 系统已完成集成

✅ NextAuth 用户认证  
✅ PayPal 支付  
✅ Prisma 数据库  
✅ Credits 积分体系  
✅ DeepSeek AI 服务  

---

## ⚡ 3 分钟快速配置

### 1️⃣ 配置 DeepSeek API Key

```bash
# 访问 https://platform.deepseek.com/
# 注册并获取 API Key

# 编辑 .env.local（已存在，只需替换 API Key）
DEEPSEEK_API_KEY="sk-your_actual_api_key_here"
```

### 2️⃣ 配置邮箱（Gmail 示例）

```bash
# 访问 https://myaccount.google.com/apppasswords
# 生成应用专用密码

# 编辑 .env.local
EMAIL_SERVER="smtp://your@gmail.com:app_password@smtp.gmail.com:587"
EMAIL_FROM="Panco Legal <your@gmail.com>"
```

### 3️⃣ 配置 PayPal（可选，用于测试支付）

```bash
# 访问 https://developer.paypal.com/dashboard/
# 创建 Sandbox 应用

# 编辑 .env.local
PAYPAL_CLIENT_ID="your_sandbox_client_id"
PAYPAL_CLIENT_SECRET="your_sandbox_secret"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="your_sandbox_client_id"
```

---

## 🚀 启动应用

```bash
npm run dev
```

访问：**http://localhost:3000**

---

## 🧪 测试流程（5 步）

### 1. 登录测试
```
http://localhost:3000/login
→ 输入邮箱
→ 检查邮箱收取验证链接
→ 点击链接登录
✅ 登录成功
```

### 2. 购买 Credits
```
http://localhost:3000/pricing
→ 选择套餐
→ 使用 PayPal Sandbox 支付
→ 完成支付
✅ Credits 充值成功
```

### 3. 测试 AI 功能
```
http://localhost:3000/legal-qa
→ 提交法律问题
→ 等待 AI 生成
✅ 显示 AI 回答
✅ Credits 自动扣除
```

### 4. 查看用户中心
```
http://localhost:3000/dashboard
✅ 显示 Credits 余额
✅ 显示用户信息
```

### 5. 查看数据库
```bash
npm run studio
→ 访问 http://localhost:5555
✅ 查看所有数据
```

---

## ⚠️ 必须配置的 3 项

| 项目 | 优先级 | 用途 |
|------|--------|------|
| **DEEPSEEK_API_KEY** | 🔴 高 | AI 功能必需 |
| **EMAIL_SERVER** | 🔴 高 | 登录功能必需 |
| **PAYPAL 凭证** | 🟡 中 | 支付功能（测试可跳过）|

---

## 📖 详细文档

| 文档 | 用途 |
|------|------|
| **README-AI.md** | DeepSeek AI 完整文档 |
| **FINAL-SYSTEM-GUIDE.md** | 系统完整指南 |
| **PAYPAL-SETUP.md** | PayPal 快速设置 |

---

## 🎉 开始使用

**最快路径：**

1. 配置 DeepSeek API Key
2. 配置 Gmail SMTP
3. 运行 `npm run dev`
4. 访问 http://localhost:3000

**就这么简单！** 🚀

---

**需要帮助？** 查看 `FINAL-SYSTEM-GUIDE.md`

