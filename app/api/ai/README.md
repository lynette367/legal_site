# AI API 接口文档

## 概述

本目录包含所有 AI 功能的 API 接口，统一使用 DeepSeek API 提供服务。

---

## 🔐 认证要求

所有 AI API 都需要用户登录，通过 NextAuth session 验证。

```typescript
const session = await getServerSession(authOptions);
if (!session?.user?.id) {
  return { error: "未登录" }; // 401
}
```

---

## 💰 计费规则

每次 AI 调用自动扣除 **1 Credit**

- 扣费在 AI 调用前执行
- 余额不足返回 402 错误
- 扣费记录保存到数据库

---

## 📡 API 端点

### 1. POST /api/ai/legal-qa

法律问答

**请求体**:
```json
{
  "query": "劳动合同可以约定多久试用期？"
}
```

**响应**:
```json
{
  "success": true,
  "answer": "根据《劳动合同法》第十九条...",
  "creditsUsed": 1
}
```

---

### 2. POST /api/ai/dispute

纠纷方案生成

**请求体**:
```json
{
  "situation": "购买的手机是翻新机，商家拒绝退款"
}
```

**响应**:
```json
{
  "success": true,
  "answer": "【纠纷类型】消费者权益纠纷\n...",
  "creditsUsed": 1
}
```

---

### 3. POST /api/ai/document

法律文书生成

**请求体**:
```json
{
  "docType": "起诉状",
  "description": "购买电动车后发现是翻新机，要求退款"
}
```

**响应**:
```json
{
  "success": true,
  "answer": "起诉状\n\n原告：...",
  "docType": "起诉状",
  "creditsUsed": 1
}
```

---

### 4. POST /api/ai/contract

合同生成

**请求体**:
```json
{
  "contractType": "租房合同",
  "requirements": "我是房东，押一付三，租期一年"
}
```

**响应**:
```json
{
  "success": true,
  "answer": "租房合同\n\n甲方（出租方）：...",
  "contractType": "租房合同",
  "creditsUsed": 1
}
```

---

### 5. POST /api/ai/explain

条款解释

**请求体**:
```json
{
  "clause": "乙方应承担由此产生的一切法律责任"
}
```

**响应**:
```json
{
  "success": true,
  "answer": "这个条款的含义是...",
  "creditsUsed": 1
}
```

---

## 🔄 完整流程

```
用户提交请求
  ↓
1. getServerSession() - 验证登录
   ├─ 未登录 → 401
   └─ 已登录 → 继续
  ↓
2. 验证参数
   ├─ 参数缺失 → 400
   └─ 参数有效 → 继续
  ↓
3. UserCreditsService.useCredits()
   ├─ 余额不足 → 402
   └─ 扣费成功 → 继续
  ↓
4. callDeepSeek() - 调用 AI
   ├─ API 错误 → 500
   └─ 调用成功 → 继续
  ↓
5. 返回结果 (200)
```

---

## 🛡️ 安全措施

### 1. 认证验证
- 所有 API 验证 session
- 无法伪造用户身份
- Session 使用 JWT 签名

### 2. 参数验证
- 检查参数存在性
- 检查参数类型
- 检查参数长度

### 3. Credits 保护
- 先扣费后调用
- 防止恶意刷量
- 记录所有消费

### 4. API Key 保护
- 只存在服务器端
- 前端无法访问
- 不记录到日志

---

## 📊 监控指标

建议监控以下指标：

1. **调用量**
   - 每个 API 的调用次数
   - 每个用户的调用频率
   - 高峰时段分析

2. **成功率**
   - API 成功率
   - DeepSeek API 成功率
   - 错误类型分布

3. **响应时间**
   - API 响应时间
   - DeepSeek API 延迟
   - P95/P99 分位数

4. **Credits 消耗**
   - 总消耗量
   - 每个功能的消耗分布
   - 用户消耗排行

---

## 🔧 调试技巧

### 查看请求日志

服务器日志会输出：
```
Legal QA API Error: ...
Dispute API Error: ...
```

### 测试单个功能

```typescript
// 在 API 路由中添加
console.log("User ID:", userId);
console.log("Query:", query);
console.log("Credits before:", credits.remainingCredits);
```

### 检查 Credits 扣费

```bash
curl http://localhost:3000/api/credits/me \
  -H "Cookie: next-auth.session-token=xxx"
```

---

## 📝 添加新功能

### 步骤

1. **定义 Prompt**
在 `lib/ai/deepseek.ts` 的 `PROMPTS` 中添加

2. **创建 API 路由**
复制现有路由模板，修改参数和 prompt

3. **创建前端组件**
使用 `useAIModule` hook 调用 API

4. **测试**
登录 → 购买 Credits → 测试功能

---

## 🎉 总结

所有 AI 功能已完整集成 DeepSeek API，具备：

- ✅ 完整的认证保护
- ✅ 自动 Credits 扣费
- ✅ 专业的 Prompt 工程
- ✅ 完善的错误处理
- ✅ 类型安全的代码
- ✅ 生产级别的安全性

**开始使用：** 配置 `DEEPSEEK_API_KEY` 后即可！


