# DeepSeek AI 集成完整文档

## ✅ 集成完成

已成功将 DeepSeek AI 集成到所有 AI 功能模块，并与 NextAuth + Prisma + Credits 体系深度联动。

---

## 📦 技术栈

- **AI 服务**: DeepSeek API（deepseek-chat 模型）
- **SDK**: OpenAI SDK（兼容模式）
- **认证**: NextAuth（自动验证登录）
- **计费**: Credits 系统（自动扣费）
- **数据库**: Prisma + SQLite/PostgreSQL

---

## 🚀 快速开始

### 1. 获取 DeepSeek API Key

1. 访问 https://platform.deepseek.com/
2. 注册/登录账户
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制 API Key

### 2. 配置环境变量

编辑 `.env.local`，添加：

```bash
DEEPSEEK_API_KEY="sk-your_actual_api_key_here"
DEEPSEEK_API_BASE="https://api.deepseek.com"
```

### 3. 启动应用

```bash
npm run dev
```

### 4. 测试 AI 功能

1. 登录账户（使用邮箱验证码）
2. 购买 Credits（使用 PayPal）
3. 访问任意 AI 功能页面
4. 提交问题，查看 AI 生成的结果

---

## 🤖 AI 功能模块

### 1. 法律问答 (Legal QA)

**端点**: `POST /api/ai/legal-qa`

**页面**: `/legal-qa`

**功能**: 回答用户的法律问题，提供性质判断、风险点和解决步骤

**请求参数**:
```json
{
  "query": "公司强制延长试用期，这合法吗？"
}
```

**响应示例**:
```json
{
  "success": true,
  "answer": "根据《劳动合同法》...",
  "creditsUsed": 1
}
```

### 2. 纠纷方案 (Dispute Resolution)

**端点**: `POST /api/ai/dispute`

**页面**: `/dispute`

**功能**: 分析纠纷情况，提供结构化的解决方案

**请求参数**:
```json
{
  "situation": "网购手机是翻新机，商家拒绝退款"
}
```

**响应示例**:
```json
{
  "success": true,
  "answer": "【纠纷类型】消费者权益纠纷\n【解决路径】...",
  "creditsUsed": 1
}
```

### 3. 文书生成 (Document Generation)

**端点**: `POST /api/ai/document`

**页面**: `/documents`

**功能**: 生成法律文书（起诉状、答辩状、投诉书等）

**请求参数**:
```json
{
  "docType": "起诉状",
  "description": "购买电动车后发现是翻新机，对方拒绝退款"
}
```

**响应示例**:
```json
{
  "success": true,
  "answer": "起诉状\n\n原告：...",
  "docType": "起诉状",
  "creditsUsed": 1
}
```

### 4. 合同生成 (Contract Generation)

**端点**: `POST /api/ai/contract`

**页面**: `/contracts`

**功能**: 根据用户需求生成合同草稿

**请求参数**:
```json
{
  "contractType": "租房合同",
  "requirements": "我是房东，押一付三，不允许养宠物"
}
```

**响应示例**:
```json
{
  "success": true,
  "answer": "租房合同\n\n甲方（出租方）：...",
  "contractType": "租房合同",
  "creditsUsed": 1
}
```

### 5. 条款解释 (Clause Explanation)

**端点**: `POST /api/ai/explain`

**页面**: `/explain`

**功能**: 解释合同条款的含义、法律效力和风险

**请求参数**:
```json
{
  "clause": "乙方应承担由此产生的一切法律责任"
}
```

**响应示例**:
```json
{
  "success": true,
  "answer": "这条款的含义是...",
  "creditsUsed": 1
}
```

---

## 🔐 认证与授权

### 自动认证流程

所有 AI API 都已集成 NextAuth 认证：

```typescript
// 1. 验证用户登录
const session = await getServerSession(authOptions);
if (!session?.user?.id) {
  return NextResponse.json({ error: "未登录" }, { status: 401 });
}

// 2. 获取用户 ID
const userId = session.user.id;
```

### 错误码

| 状态码 | 说明 | 处理方式 |
|--------|------|----------|
| 200 | 成功 | 显示 AI 结果 |
| 400 | 参数错误 | 提示用户修正 |
| 401 | 未登录 | 跳转到 /login |
| 402 | Credits 不足 | 提示充值 |
| 500 | 服务器错误 | 重试或联系支持 |

---

## 💰 Credits 计费规则

### 扣费机制

每次 AI 调用自动扣除 **1 Credit**：

```typescript
// 在 AI API 中自动执行
await UserCreditsService.useCredits(
  userId,
  1,  // 扣除 1 Credit
  "AI 法律问答"  // 使用描述
);
```

### 扣费时机

```
用户提交问题
  ↓
验证登录状态
  ↓
扣除 1 Credit（在数据库中记录）
  ↓
调用 DeepSeek API
  ↓
返回结果
```

### Credits 不足处理

- 余额不足时返回 `402` 状态码
- 前端自动提示：`"Credits 余额不足，请先充值"`
- 用户点击跳转到 `/pricing` 页面

---

## 🎯 Prompt 工程

### 系统 Prompt 模板

#### 法律问答
```
你是一名专业的法律顾问助手。请根据用户的法律问题提供：
1. 问题性质分类（如劳动纠纷、合同纠纷、消费者权益等）
2. 主要风险点提示
3. 建议的解决步骤
4. 相关注意事项

请用结构化、专业但易懂的语言回答，避免过于复杂的法律术语。
```

#### 纠纷方案
```
你是一名法律专家，擅长分析纠纷并提供解决方案。请根据用户描述的纠纷情况，提供：
1. 纠纷类型判断
2. 双方权利义务分析
3. 可行的解决路径（协商、调解、仲裁、诉讼等）
4. 需要收集的证据清单
5. 潜在风险提示
6. 下一步行动建议

请输出结构化的方案，便于用户理解和执行。
```

#### 文书生成
```
你是一名法律文书起草专家。请根据用户提供的信息生成正式的法律文书草稿。

要求：
1. 使用标准的法律文书格式
2. 包含必要的法律条款引用
3. 事实陈述清晰、有逻辑
4. 诉讼请求或主张明确
5. 格式规范、语言专业

请注意：这是草稿，用户需根据实际情况修改完善，并建议咨询专业律师审核。
```

#### 合同生成
```
你是一名合同起草专家。请根据用户需求生成合同草稿。

合同应包含：
1. 合同标题和编号（建议）
2. 双方基本信息（留空待填）
3. 合同主要条款（权利义务、标的、价款、期限等）
4. 违约责任
5. 争议解决方式
6. 其他必要条款

请使用标准的合同格式，语言严谨专业。提醒用户这是草稿，需要根据实际情况修改并经专业律师审核后再签署。
```

#### 条款解释
```
你是一名合同法律专家，擅长解释合同条款。请对用户提供的合同条款进行详细解释：
1. 条款的字面含义
2. 法律效力分析
3. 对各方的权利义务影响
4. 潜在风险点
5. 是否有不公平条款
6. 建议的应对方式

请用通俗易懂的语言解释，帮助用户理解条款的真实含义和影响。
```

### 自定义 Prompt

可以在 `lib/ai/deepseek.ts` 的 `PROMPTS` 对象中修改或添加新的 prompt 模板。

---

## 🔧 开发指南

### 调用 DeepSeek API

```typescript
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

const answer = await callDeepSeek(
  "用户输入的内容",
  PROMPTS.LEGAL_QA,  // 系统 prompt
  0.3  // temperature（可选）
);
```

### 创建新的 AI 功能

1. 在 `PROMPTS` 中添加新的 prompt 模板
2. 创建新的 API 路由 `/app/api/ai/your-feature/route.ts`
3. 创建前端组件
4. 使用 `useAIModule` hook 调用 API

### API 路由模板

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

export async function POST(request: NextRequest) {
  try {
    // 1. 验证登录
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    // 2. 解析参数
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: "缺少参数" }, { status: 400 });
    }

    // 3. 扣除 Credits
    try {
      await UserCreditsService.useCredits(session.user.id, 1, "功能描述");
    } catch (error: any) {
      if (error.message === "Credits 余额不足") {
        return NextResponse.json({ error: "余额不足" }, { status: 402 });
      }
      throw error;
    }

    // 4. 调用 AI
    const answer = await callDeepSeek(query, PROMPTS.YOUR_PROMPT);

    // 5. 返回结果
    return NextResponse.json({ success: true, answer, creditsUsed: 1 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 📊 数据流图

```
用户提交问题（前端）
  ↓
useAIModule.callAIApi()
  ↓
POST /api/ai/legal-qa
  ├─ getServerSession（验证登录）
  ├─ UserCreditsService.useCredits（扣除 1 Credit）
  ├─ callDeepSeek（调用 AI API）
  └─ 返回 AI 结果
  ↓
前端显示结果
```

---

## 🔒 安全特性

### 1. 用户认证
- ✅ 所有 AI API 需要登录
- ✅ 从 session 获取 userId
- ✅ 无法伪造用户身份

### 2. Credits 验证
- ✅ 调用前检查余额
- ✅ 余额不足自动拒绝
- ✅ 扣费记录保存到数据库

### 3. API Key 保护
- ✅ API Key 只存在服务器端
- ✅ 前端无法访问
- ✅ 防止 API Key 泄露

### 4. 请求验证
- ✅ 参数验证
- ✅ 类型检查
- ✅ SQL 注入防护（Prisma）

---

## 📖 API 参考

### 通用请求头

```
Content-Type: application/json
Cookie: next-auth.session-token=xxx (自动携带)
```

### 通用响应格式

**成功响应**:
```json
{
  "success": true,
  "answer": "AI 生成的内容...",
  "creditsUsed": 1
}
```

**错误响应**:
```json
{
  "error": "错误描述"
}
```

### 错误码说明

| 状态码 | 含义 | 用户操作 |
|--------|------|----------|
| 200 | 成功 | 显示结果 |
| 400 | 参数错误 | 检查输入 |
| 401 | 未登录 | 跳转登录 |
| 402 | Credits 不足 | 购买 Credits |
| 500 | 服务器错误 | 重试或反馈 |

---

## 🎯 使用示例

### 前端调用

```typescript
import { useAIModule } from "./ModuleWrapper";

export function MyComponent() {
  const { callAIApi, isProcessing } = useAIModule();
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await callAIApi("/api/ai/legal-qa", {
      query: "我的法律问题"
    });

    if (response.success) {
      setResult(response.answer);
    } else {
      alert(response.message);
    }
  };

  return (
    <button onClick={handleSubmit} disabled={isProcessing}>
      {isProcessing ? "处理中..." : "提交"}
    </button>
  );
}
```

### 后端调用

```typescript
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

const answer = await callDeepSeek(
  "用户的问题",
  PROMPTS.LEGAL_QA
);
```

---

## ⚙️ 配置参数

### DeepSeek 模型参数

在 `lib/ai/deepseek.ts` 中可调整：

```typescript
const response = await deepseekClient.chat.completions.create({
  model: "deepseek-chat",       // 模型名称
  messages: [...],
  temperature: 0.3,              // 温度（0-2，越低越确定）
  max_tokens: 4000,              // 最大输出 tokens
});
```

### 参数说明

| 参数 | 默认值 | 说明 |
|------|--------|------|
| model | deepseek-chat | DeepSeek 聊天模型 |
| temperature | 0.3 | 创造性（0=确定，2=随机） |
| max_tokens | 4000 | 最大输出长度 |

---

## 📁 文件结构

```
lib/ai/
└── deepseek.ts                 # DeepSeek 客户端 + Prompt 模板

app/api/ai/
├── legal-qa/route.ts           # 法律问答 API
├── dispute/route.ts            # 纠纷方案 API
├── document/route.ts           # 文书生成 API
├── contract/route.ts           # 合同生成 API
└── explain/route.ts            # 条款解释 API

components/modules/
├── ModuleWrapper.tsx           # AI 模块通用逻辑
├── LegalQaModule.tsx          # 法律问答组件
├── DisputeModule.tsx          # 纠纷方案组件
├── DocumentModule.tsx         # 文书生成组件
├── ContractModule.tsx         # 合同生成组件
└── ExplainModule.tsx          # 条款解释组件
```

---

## 🧪 测试指南

### 测试 DeepSeek 连接

```bash
# 测试 API Key 是否有效
curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 100
  }'
```

### 测试 AI API（需登录）

```bash
# 1. 登录获取 cookie

# 2. 测试法律问答
curl -X POST http://localhost:3000/api/ai/legal-qa \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=xxx" \
  -d '{"query":"劳动合同可以约定试用期多久？"}'
```

### 前端测试流程

1. **登录**
   - 访问 `/login`
   - 使用邮箱验证码登录

2. **购买 Credits**
   - 访问 `/pricing`
   - 使用 PayPal 购买套餐

3. **测试 AI 功能**
   - 访问 `/legal-qa`
   - 提交法律问题
   - 查看 AI 生成的回答
   - 验证 Credits 已扣除

4. **查看记录**
   - 访问 `/dashboard`
   - 查看 Credits 余额
   - 查看使用记录

---

## ⚠️ 重要提示

### 1. API Key 安全

- ❌ 不要在前端代码中使用 API Key
- ❌ 不要提交 `.env.local` 到 Git
- ✅ API Key 只存在服务器端环境变量
- ✅ 所有 AI 调用通过后端 API

### 2. Credits 管理

- 每次 AI 调用扣除 1 Credit
- Credits 不足时自动拒绝调用
- 所有扣费记录保存在数据库
- 用户可在用户中心查看余额和历史

### 3. 成本控制

- 每次调用约消耗 DeepSeek tokens
- 建议设置 `max_tokens` 限制
- 监控 API 使用量
- 可考虑添加单日调用次数限制

### 4. 错误处理

- 所有 API 都有完整的 try-catch
- DeepSeek API 错误会记录到日志
- 用户会看到友好的错误提示

---

## 🚀 生产环境部署

### 1. 环境变量

```bash
# DeepSeek API（必需）
DEEPSEEK_API_KEY="sk-your_production_api_key"
DEEPSEEK_API_BASE="https://api.deepseek.com"

# NextAuth（必需）
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="strong_random_secret"

# 邮箱（必需）
EMAIL_SERVER="smtp://user:pass@smtp.gmail.com:587"
EMAIL_FROM="Your App <noreply@yourdomain.com>"

# PayPal（必需）
PAYPAL_CLIENT_ID="your_production_client_id"
PAYPAL_CLIENT_SECRET="your_production_secret"
PAYPAL_MODE="live"

# 数据库（推荐 PostgreSQL）
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
```

### 2. 性能优化

- 考虑添加 Redis 缓存常见问题
- 实现请求队列防止并发过高
- 监控 DeepSeek API 响应时间
- 设置合理的超时时间

### 3. 监控告警

- 监控 Credits 消耗速度
- 监控 DeepSeek API 错误率
- 监控响应时间
- 设置余额告警

---

## 📈 扩展建议

### 短期优化

1. **添加流式输出** - 使用 DeepSeek Stream API
2. **添加重试机制** - API 失败时自动重试
3. **优化 Prompt** - 根据用户反馈调整
4. **添加输出格式化** - Markdown 渲染

### 中期优化

1. **添加对话历史** - 支持多轮对话
2. **添加文档上传** - 分析 PDF/Word 文件
3. **添加模板库** - 预设常用问题和模板
4. **添加导出功能** - 导出为 PDF/Word

### 长期优化

1. **Fine-tuning** - 使用领域数据微调模型
2. **RAG 集成** - 接入法律知识库
3. **多模型支持** - 支持其他 AI 模型
4. **API 聚合** - 智能选择最佳模型

---

## 🐛 故障排查

### DeepSeek API 调用失败

**可能原因：**
- API Key 未配置或错误
- API Key 余额不足
- 网络连接问题
- DeepSeek 服务故障

**解决方案：**
1. 检查 `DEEPSEEK_API_KEY` 是否正确
2. 访问 DeepSeek 控制台查看余额
3. 测试网络连接
4. 查看服务器日志

### Credits 扣除但没有返回结果

**可能原因：**
- DeepSeek API 超时
- 网络中断

**解决方案：**
- 实现事务回滚机制
- API 失败时退回 Credits
- 添加重试逻辑

### 前端调用失败

**可能原因：**
- 未登录
- Session 过期
- Credits 不足

**解决方案：**
- 检查登录状态
- 刷新页面重新登录
- 购买 Credits

---

## 📞 获取帮助

- **DeepSeek 官方文档**: https://platform.deepseek.com/docs
- **OpenAI SDK 文档**: https://github.com/openai/openai-node
- **项目文档**: 
  - NEXTAUTH-INTEGRATION.md - NextAuth 集成
  - PRISMA-MIGRATION.md - Prisma 数据库
  - PAYPAL-SETUP.md - PayPal 支付

---

## 🎉 集成完成

DeepSeek AI 已成功集成到所有功能模块！

**功能清单：**
- ✅ 5 个 AI 功能（法律问答、纠纷方案、文书生成、合同生成、条款解释）
- ✅ 统一的 API 客户端
- ✅ 专业的 Prompt 模板
- ✅ 自动 Credits 扣费
- ✅ NextAuth 认证集成
- ✅ 完整的错误处理

**立即使用：**
```bash
# 1. 配置 DeepSeek API Key
# 编辑 .env.local

# 2. 启动应用
npm run dev

# 3. 测试 AI 功能
# 访问 http://localhost:3000/legal-qa
```

**开始体验 AI 法律助手！** 🚀

---

**集成日期:** 2025-11-28  
**版本:** 1.0.0  
**状态:** ✅ 生产就绪


