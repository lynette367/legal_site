# Indie Legal Assistant - AI Legal SaaS & Freelance Compliance Platform

> 一个完整的企业级 AI 法律助手与自由职业合规 SaaS 平台，集成用户认证、支付、积分、AI 服务与 Lead Magnet 邮箱订阅

## 🌟 功能特性

### AI & 合规工具
- 🤖 **法律问答 & 场景引擎** - 回答各类法律问题，根据行业/场景路由专用工具
- ⚖️ **违约金与罚金计算器** - 计算逾期付款、双倍赔偿（Double Damages）及法律利息
- ✉️ **催款函生成器** - 一键生成符合加州 SB 988 等法律标准的催款信函
- 📝 **通用合同生成器** - 支持全美 50 州独立承包商（1099）与服务协议生成
- 🔍 **IRS 20 要素分类自检** - 3 分钟评估 1099 独立承包商 vs. W-2 员工合规风险
- 📋 **Lead Magnet 邮箱订阅** - 免费获取付款保护清单，数据库自动归集 Subscriber

### 系统功能
- 👤 **用户认证** - 无密码邮箱 Magic Link / 验证码登录 (NextAuth v4)
- 💳 **在线支付** - PayPal Checkout Server SDK 官方集成
- 🎫 **Credits 积分** - 按次计费，自动扣减与余额管理
- 📊 **用户中心** - 余额查询、订单历史记录
- 🔒 **安全保护** - Edge Middleware 路由保护、API 授权与 SQL 注入防护

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local`，并配置以下关键项：

```bash
# DeepSeek AI（必需）
DEEPSEEK_API_KEY="sk-your_api_key"

# 邮箱服务（必需，用于 Magic Link 登录）
EMAIL_SERVER="smtp://user:pass@smtp.gmail.com:587"
EMAIL_FROM="Indie Legal <noreply@indielegalterms.com>"

# PayPal（可选，用于支付）
PAYPAL_CLIENT_ID="your_client_id"
PAYPAL_CLIENT_SECRET="your_secret"
PAYPAL_MODE="sandbox"

# 数据库与应用配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_here_generate_with_openssl_rand_base64_32"
DATABASE_URL="file:./dev.db"
```

### 3. 初始化数据库

```bash
npx prisma generate
npx prisma db push
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
- **认证**: NextAuth 4 + JWT Session + Prisma Adapter
- **数据库**: Prisma 5 + SQLite (开发) / PostgreSQL (生产)
- **支付**: PayPal Checkout Server SDK
- **AI**: DeepSeek API (deepseek-chat) via OpenAI SDK compatibility
- **邮件**: Nodemailer + SMTP

---

## 📁 项目结构

```
indielegalterms.com/
├── app/                        # Next.js App Router 路由与页面
│   ├── api/                    # API 路由 (auth, credits, paypal, ai, subscribe 等)
│   │   ├── ai/                 # AI 合同/催款函生成
│   │   ├── auth/               # NextAuth 鉴权
│   │   ├── credits/            # Credits 积分查扣
│   │   ├── paypal/             # PayPal 支付创建/捕获/查询
│   │   └── subscribe/          # Lead Magnet 邮箱订阅 API
│   ├── compliance/             # 州级合规/法律落地页 [slug]
│   ├── contracts/              # 合同引擎及 100+ 场景 SEO 页
│   ├── dashboard/              # 用户控制中心
│   ├── guides/                 # 行业指南与加州 SB 988 诉讼指引
│   ├── login/                  # 登录校验模块
│   ├── pricing/                # 价格与套餐页面
│   ├── privacy-policy/         # 隐私政策
│   ├── tools/                  # 独立合规工具（违约金计算器、IRS 自检等）
│   ├── layout.tsx              # 全局 Layout
│   ├── page.tsx                # 重构版 6-Screen 首页
│   └── providers.tsx          # Session & PayPal Provider 注入
├── components/                 # UI 组件
│   ├── common/                # Shared 通用组件
│   ├── guides/                # 法律指南组件
│   ├── layout/                # 页面布局 (SiteHeader, SiteFooter, GoogleAnalytics)
│   ├── marketing/             # 营销与 Lead Magnet 组件 (EmailCaptureModal, HeroButtons, HowToWhyUsSection)
│   ├── modules/               # AI 核心业务模块
│   ├── pricing/               # 支付与套餐组件
│   ├── tools/                 # 法律工具客户端组件 (LightweightScenarioEngine, StateLawGrid)
│   └── ui/                    # 原子 UI 库
├── data/                       # 静态数据与 SEO 配置
│   ├── freelanceLawsByState.ts# 全美 50 州自由职业法律状态
│   ├── plans.ts               # 套餐定价与 Credits 配置
│   ├── professions.ts         # 4 大行业模板与 GSC 权重配置
│   └── seoPages.ts            # 100+ SEO 页面配置
├── lib/                        # 工具与服务封装
│   ├── ai/                    # DeepSeek 客户端封装
│   ├── auth.ts                # NextAuth 配置
│   ├── paypal/                # PayPal SDK 辅助函数
│   └── prisma.ts              # Prisma 单例
├── prisma/                     # 数据库配置层
│   └── schema.prisma          # Prisma 数据模型定义 (User, Order, EmailSubscriber 等)
└── middleware.ts              # Edge 路由重定向与保护
```

---

## 🎯 核心流程

### 用户注册登录
```
邮箱输入 → 验证邮件 Magic Link → 点击链接 → 创建/更新 User → 登录成功
```

### Lead Magnet 邮箱订阅
```
Hero 按钮 / 底部组件 → 弹窗/表单提交 → POST /api/subscribe → 数据库保存 EmailSubscriber → 解锁 IRS 20 要素自检工具
```

### 购买 Credits
```
选择套餐 → PayPal 支付 → Capture 确认 → User.remainingContracts 自动充值
```

### 使用 AI 功能
```
提交需求 → 校验登录状态 → 扣除 1 Credit → 调用 DeepSeek API → 返回生成文档
```

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev

# 构建 (prisma generate && next build)
npm run build

# 启动生产
npm run start

# 查看数据库 (Prisma Studio)
npm run studio

# 数据库推演 / 生成
npm run db:push
npm run db:generate
```

---

## 📊 数据库架构

### 核心表
- **User** - 用户信息、积分余额 (`remainingContracts`)
- **Order** - PayPal 订单记录 (`paypalOrderId`, `amount`, `status`)
- **EmailSubscriber** - Lead Magnet 邮箱订阅表 (`email`, `name`, `source`, `createdAt`)

### NextAuth 表
- **Account** - OAuth 账户
- **Session** - 会话管理
- **VerificationToken** - 邮箱验证令牌

---

## 🔒 安全特性

- ✅ NextAuth 用户认证 & JWT Session
- ✅ Edge Middleware 路由重定向与安全防护
- ✅ 订单归属与积分扣减前置原子操作
- ✅ API Key 服务端保护
- ✅ Prisma ORM SQL 注入防护

---

## 📄 开源协议

MIT License

---

**项目名称:** Indie Legal Assistant  
**版本:** 1.0.0  
**技术栈:** Next.js 14 + NextAuth + Prisma + PayPal + DeepSeek API

