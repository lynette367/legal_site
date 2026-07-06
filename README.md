# Panco 法律助手 - AI 法律 SaaS 平台

> 一个完整的企业级 AI 法律助手平台，集成用户认证、支付、积分和 AI 服务

## 🌟 功能特性

### AI 功能
- 🤖 **法律问答** - 回答各类法律问题
- ⚖️ **纠纷方案** - 生成结构化解决方案
- 📄 **文书生成** - 起诉状、答辩状、投诉书
- 📝 **合同生成** - 租房、劳务、NDA 等合同
- 🔍 **条款解释** - 解读合同条款风险

### 系统功能
- 👤 **用户认证** - 邮箱验证码登录
- 💳 **在线支付** - PayPal 官方集成
- 🎫 **Credits 积分** - 按次计费，自动管理
- 📊 **用户中心** - 余额查询、订单历史
- 🔒 **安全保护** - 路由保护、API 授权

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 到 `.env.local`，并配置以下关键项：

```bash
# DeepSeek AI（必需）
DEEPSEEK_API_KEY="sk-your_api_key"

# 邮箱服务（必需）
EMAIL_SERVER="smtp://user:pass@smtp.gmail.com:587"
EMAIL_FROM="Your App <noreply@example.com>"

# PayPal（可选，用于支付）
PAYPAL_CLIENT_ID="your_client_id"
PAYPAL_CLIENT_SECRET="your_secret"

# 其他已配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="3BGpZ4bgtFt66AojrgnOVxnA0+dUfMz0fMon1uEu7ZY="
DATABASE_URL="file:./dev.db"
```

### 3. 初始化数据库

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. 启动应用

```bash
npm run dev
```

访问：http://localhost:3000

---

## 📖 完整文档

### 快速开始
- **QUICK-START.md** ⭐ - 3 分钟快速配置（推荐先读）
- **FINAL-SYSTEM-GUIDE.md** - 系统完整指南

### 功能集成
- **README-AI.md** - DeepSeek AI 集成文档
- **NEXTAUTH-INTEGRATION.md** - NextAuth 用户系统
- **README-PAYPAL.md** - PayPal 支付集成
- **PRISMA-MIGRATION.md** - Prisma 数据库

### API 文档
- **app/api/ai/README.md** - AI API 接口文档
- **app/api/paypal/README.md** - PayPal API 接口文档

### 故障排查
- **TROUBLESHOOTING.md** - 常见问题解决
- **PRISMA-STUDIO-FIX.md** - 数据库问题修复

---

## 🏗️ 技术栈

- **前端**: Next.js 14 (App Router) + React 18 + TypeScript + TailwindCSS
- **认证**: NextAuth 5 + JWT Session
- **数据库**: Prisma 5 + SQLite (开发) / PostgreSQL (生产)
- **支付**: PayPal Orders API
- **AI**: DeepSeek API (deepseek-chat)
- **邮件**: Nodemailer + SMTP

---

## 📁 项目结构

```
panco.com/
├── app/                        # Next.js App Router 路由与页面
│   ├── api/                    # API 路由 (auth, credits, paypal, ai 等)
│   ├── dashboard/              # 用户控制中心
│   ├── freelance-contract/     # 场景化 SEO 导航与专题页
│   ├── guides/                 # 加州 SB 988 行业指南页
│   ├── login/                  # 登录校验模块
│   ├── pricing/                # 价格与套餐页面
│   ├── tools/                  # 法律工具（合同生成、违约金计算、合同审查）
│   ├── layout.tsx              # 全局 Layout 模版
│   ├── page.tsx                # 首页
│   └── providers.tsx          # Session & PayPal Provider 注入
├── components/                 # 页面组件
│   ├── common/                # 通用公用组件
│   ├── guides/                # 法律指南专属组件
│   ├── layout/                # 页面布局组件 (Header/Footer)
│   ├── modules/               # AI 核心业务模块
│   ├── pricing/               # 支付与方案购买组件
│   ├── providers/             # 注入全局状态与 Context
│   ├── tools/                 # 各个法律工具的具体客户端组件
│   ├── ui/                    # 基础原子 UI 库
│   ├── CopyCard.tsx           # 合同文本复制卡片组件
│   └── ScenarioTool.tsx       # 场景生成工具核心容器
├── data/                       # 核心业务数据源（静态生成配置）
│   ├── plans.ts               # 套餐定价与 Credits 配置
│   ├── professions.ts         # 指南页面对应的职业列表与元数据
│   └── seoPages.ts            # 100+ 场景化 SEO 页面的大纲与模板配置
├── lib/                        # 工具函数与集成服务
│   ├── auth.ts                # NextAuth 核心配置
│   ├── prisma.ts              # Prisma 数据库连接实例
│   ├── ai/                    # DeepSeek 客户端实现
│   └── paypal/                # PayPal SDK 包装与辅助工具
├── prisma/                     # 数据库配置层
│   ├── schema.prisma          # Prisma 数据模型与关系定义
│   └── migrations/            # SQL 数据库迁移历史
└── middleware.ts              # Next.js 中间件（实现 API 级保护与页面身份阻拦）
```

---

## 🎯 核心流程

### 用户注册登录
```
邮箱输入 → 验证邮件 → 点击链接 → 创建 User → 登录成功
```

### 购买 Credits
```
选择套餐 → PayPal 支付 → 订单完成 → Credits 充值
```

### 使用 AI 功能
```
提交问题 → 验证登录 → 扣除 Credits → 调用 AI → 返回结果
```

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产
npm run start

# 查看数据库
npm run studio

# 数据库迁移
npx prisma migrate dev
```

---

## 🧪 测试账户

### PayPal Sandbox
- 在 PayPal Developer Dashboard 创建测试账户
- 使用测试邮箱和密码进行支付测试

### DeepSeek API
- 注册后首次充值有优惠
- 建议充值 ¥50-100 用于开发测试

---

## 📊 数据库架构

### 核心表
- **User** - 用户信息和 Credits 余额
- **Order** - 订单记录
- **CreditUsageRecord** - Credits 使用历史

### NextAuth 表
- **Account** - OAuth 账户
- **Session** - 会话（JWT 模式不使用）
- **VerificationToken** - 邮箱验证令牌

---

## 🔒 安全特性

- ✅ NextAuth 用户认证
- ✅ JWT Session 管理
- ✅ API 路由保护（Middleware）
- ✅ 订单归属验证
- ✅ Credits 余额检查
- ✅ API Key 服务端保护
- ✅ Prisma SQL 注入防护

---

## 🚀 部署

### Vercel 部署

```bash
# 1. 连接 GitHub
# 2. 导入项目
# 3. 配置环境变量
# 4. 部署
```

### 自托管

```bash
# 1. 切换到 PostgreSQL
# 2. 配置生产环境变量
# 3. 构建项目
npm run build

# 4. 启动
npm run start
```

---

## 📞 获取帮助

- **快速开始**: 查看 `QUICK-START.md`
- **完整指南**: 查看 `FINAL-SYSTEM-GUIDE.md`
- **AI 集成**: 查看 `README-AI.md`
- **问题排查**: 查看 `TROUBLESHOOTING.md`

---

## 📄 开源协议

MIT License

---

## 🎉 开始使用

```bash
# 1. 配置环境变量（3 个关键项）
vi .env.local

# 2. 启动应用
npm run dev

# 3. 访问应用
open http://localhost:3000
```

**祝你使用愉快！** 🚀

---

**项目名称:** Panco 法律助手  
**版本:** 1.0.0  
**完成日期:** 2025-11-28  
**技术栈:** Next.js + NextAuth + Prisma + PayPal + DeepSeek


