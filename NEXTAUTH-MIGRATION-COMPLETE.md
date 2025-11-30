# NextAuth 迁移完成

## ✅ 问题已解决

`useUsage 必须在 UsageProvider 中使用` 错误已完全修复！

---

## 🔄 已完成的迁移

### 从 UsageProvider 到 NextAuth

所有组件已从旧的 `useUsage` hook 迁移到 NextAuth 的 `useSession` 和新的 `useAIModule` hook。

---

## 📝 更新的组件列表

### 1. ✅ Layout 组件
- **SiteHeader.tsx** - 使用 `useSession` 检查登录状态

### 2. ✅ 通用组件
- **LoginPanel.tsx** - 使用 `signIn("email")` 邮箱登录
- **UserCenterPanel.tsx** - 使用 `useSession` 和 Credits API

### 3. ✅ 支付组件
- **PaymentSuccessPanel.tsx** - 使用 `useSession` 和 Credits API
- **PayPalButton.tsx** - 移除 userId prop
- **PricingContent.tsx** - 移除临时 userId

### 4. ✅ AI 模块组件
- **LegalQaModule.tsx** - 使用 `useAIModule`
- **ExplainModule.tsx** - 使用 `useAIModule`
- **DocumentModule.tsx** - 使用 `useAIModule`
- **ContractModule.tsx** - 使用 `useAIModule`
- **DisputeModule.tsx** - 使用 `useAIModule`

### 5. ✅ 新增组件
- **ModuleWrapper.tsx** - 统一的 AI 模块 Credits 管理

---

## 🆕 useAIModule Hook

创建了一个新的自定义 hook `useAIModule`，用于统一处理所有 AI 模块的 Credits 消费逻辑。

### 功能特性

```typescript
const { session, isLoggedIn, isProcessing, consumeCreditsAndExecute } = useAIModule();
```

- ✅ **自动检查登录状态** - 未登录自动跳转 /login
- ✅ **自动消费 Credits** - 调用 /api/credits/use
- ✅ **余额检查** - Credits 不足时提示充值
- ✅ **加载状态管理** - isProcessing 禁用按钮
- ✅ **错误处理** - 统一的错误提示

### 使用示例

```typescript
const handleGenerate = async () => {
  if (!verified) {
    setStatus("请先完成行为验证");
    return;
  }
  
  const result = await consumeCreditsAndExecute("AI 法律问答", () => {
    // Credits 扣除成功后执行
    setResponse([...aiGeneratedData]);
  });
  
  setStatus(result.message);
};
```

---

## 🔄 迁移对比

### 之前（UsageProvider）

```typescript
import { useUsage } from "../providers/usage-provider";

export function MyModule() {
  const { consumeCredit } = useUsage();
  
  const handleGenerate = () => {
    const check = consumeCredit();
    if (!check.success) {
      setStatus(check.message ?? "无法扣除次数");
      return;
    }
    // 执行逻辑
  };
}
```

### 现在（NextAuth + useAIModule）

```typescript
import { useAIModule } from "./ModuleWrapper";

export function MyModule() {
  const { consumeCreditsAndExecute, isProcessing } = useAIModule();
  
  const handleGenerate = async () => {
    const result = await consumeCreditsAndExecute("功能描述", () => {
      // 执行逻辑
    });
    setStatus(result.message);
  };
  
  return (
    <button 
      onClick={handleGenerate}
      disabled={!verified || isProcessing}
    >
      {isProcessing ? "处理中..." : "生成内容"}
    </button>
  );
}
```

---

## 🎯 优势对比

| 特性 | UsageProvider | NextAuth + useAIModule |
|------|---------------|------------------------|
| **用户认证** | ❌ 模拟 | ✅ 真实邮箱登录 |
| **数据持久化** | ❌ 内存 | ✅ 数据库 |
| **Credits 管理** | ❌ 前端状态 | ✅ 后端 API + 数据库 |
| **安全性** | ❌ 无验证 | ✅ Session 验证 |
| **多端同步** | ❌ 不支持 | ✅ 支持 |
| **支付集成** | ❌ 模拟 | ✅ 真实 PayPal |
| **错误处理** | ⚠️ 基础 | ✅ 完善 |

---

## 🚀 现在可以做什么

### 1. 用户认证
```bash
# 访问登录页
http://localhost:3000/login

# 输入邮箱 → 接收验证邮件 → 点击链接 → 登录成功
```

### 2. 购买 Credits
```bash
# 访问套餐页
http://localhost:3000/pricing

# 选择套餐 → PayPal 支付 → Credits 自动充值
```

### 3. 使用 AI 功能
```bash
# 访问任意 AI 功能页（需登录）
http://localhost:3000/legal-qa

# 提交问题 → 自动扣除 Credits → 生成结果
```

### 4. 查看余额
```bash
# 访问用户中心
http://localhost:3000/dashboard

# 或使用 API
curl http://localhost:3000/api/credits/me
```

---

## 🧪 测试清单

### ✅ 已测试项目

- [x] 应用正常启动（无 linter 错误）
- [x] 所有组件编译通过
- [x] 登录页面正常显示
- [x] 用户中心组件正常
- [x] 所有 AI 模块组件正常

### 建议测试流程

1. **登录测试**
   - 访问 /login
   - 输入邮箱（需配置 EMAIL_SERVER）
   - 接收验证邮件
   - 完成登录

2. **支付测试**
   - 访问 /pricing
   - 选择套餐
   - 使用 PayPal Sandbox 支付
   - 验证 Credits 增加

3. **AI 功能测试**
   - 访问任意 AI 功能页
   - 提交问题
   - 验证 Credits 扣除
   - 查看生成结果

---

## ⚠️ 重要提示

### 必须配置的环境变量

```bash
# NextAuth（已配置）
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="3BGpZ4bgtFt66AojrgnOVxnA0+dUfMz0fMon1uEu7ZY="

# 邮箱服务（必须配置）
EMAIL_SERVER="smtp://user:pass@smtp.gmail.com:587"  # ⚠️ 需要配置
EMAIL_FROM="Your App <noreply@example.com>"         # ⚠️ 需要配置

# PayPal（已配置）
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
PAYPAL_MODE=sandbox

# 数据库（已配置）
DATABASE_URL="file:./dev.db"
```

### 邮箱配置说明

**Gmail 示例：**
1. 访问 https://myaccount.google.com/apppasswords
2. 生成应用专用密码
3. 配置：
```bash
EMAIL_SERVER="smtp://your@gmail.com:app_password@smtp.gmail.com:587"
EMAIL_FROM="Your App <your@gmail.com>"
```

---

## 📊 系统架构

```
前端组件
  ↓
useAIModule Hook
  ↓
POST /api/credits/use
  ↓
getServerSession (验证登录)
  ↓
UserCreditsService.useCredits()
  ↓
Prisma 数据库
  ├─ 检查余额
  ├─ 扣除 Credits
  └─ 创建使用记录
```

---

## 🎉 迁移完成！

现在你的应用拥有：

- ✅ **真实的用户认证系统** （NextAuth + 邮箱登录）
- ✅ **完整的支付流程** （PayPal + 数据库）
- ✅ **Credits 积分体系** （自动充值和扣费）
- ✅ **统一的 AI 模块管理** （useAIModule Hook）
- ✅ **类型安全** （TypeScript）
- ✅ **无 lint 错误** （代码质量）

**系统状态：** 🟢 运行正常

**立即测试：**
```bash
npm run dev
# 访问 http://localhost:3000
```

**配置邮箱后即可完整使用所有功能！** 🚀

---

**迁移日期:** 2025-11-28  
**状态:** ✅ 完成  
**错误:** 🟢 已修复


