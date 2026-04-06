# NextAuth 集成修复指南

## 问题：useUsage 错误

如果遇到 `useUsage 必须在 UsageProvider 中使用` 错误，这是因为某些组件还在使用旧的 `useUsage` hook。

## 解决方案

所有使用 `useUsage` 的组件都需要更新为使用 NextAuth 的 `useSession` 和新的 `useAIModule` hook。

### 已更新的组件

1. ✅ components/layout/SiteHeader.tsx
2. ✅ components/common/LoginPanel.tsx
3. ✅ components/common/UserCenterPanel.tsx
4. ✅ components/pricing/PaymentSuccessPanel.tsx
5. ✅ components/modules/LegalQaModule.tsx
6. ✅ components/modules/ExplainModule.tsx
7. ✅ components/modules/DocumentModule.tsx

### 待更新的组件

8. ⚠️ components/modules/ContractModule.tsx
9. ⚠️ components/modules/DisputeModule.tsx

## 手动修复步骤

对于 ContractModule.tsx 和 DisputeModule.tsx，请手动修改：

### 1. 更新 import
```typescript
// 之前
import { useUsage } from "../providers/usage-provider";

// 现在
import { useAIModule } from "./ModuleWrapper";
```

### 2. 更新 hook 调用
```typescript
// 之前
const { consumeCredit } = useUsage();

// 现在
const { consumeCreditsAndExecute, isProcessing } = useAIModule();
```

### 3. 更新 handleGenerate 函数
```typescript
// 之前
const handleGenerate = () => {
  if (!verified) {
    setStatus("...");
    return;
  }
  if (!requirements.trim()) {
    setStatus("...");
    return;
  }
  const check = consumeCredit();
  if (!check.success) {
    setStatus(check.message ?? "无法扣除次数");
    return;
  }
  setStatus("...");
  setDraft([...]);
};

// 现在
const handleGenerate = async () => {
  if (!verified) {
    setStatus("...");
    return;
  }
  if (!requirements.trim()) {
    setStatus("...");
    return;
  }

  const result = await consumeCreditsAndExecute("功能描述", () => {
    setDraft([...]);
  });

  setStatus(result.message);
};
```

### 4. 更新按钮
```typescript
// 之前
<button
  onClick={handleGenerate}
  disabled={!verified}
>
  生成内容
</button>

// 现在
<button
  onClick={handleGenerate}
  disabled={!verified || isProcessing}
>
  {isProcessing ? "处理中..." : "生成内容"}
</button>
```

## 完整示例（ContractModule.tsx）

```typescript
"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase, OutputBlock } from "../ui/ExampleShowcase";

export function ContractModule() {
  const example = moduleExamples.contracts;
  const { consumeCreditsAndExecute, isProcessing } = useAIModule();
  const [contractType, setContractType] = useState(contractTypes[0].value);
  const [requirements, setRequirements] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [draft, setDraft] = useState<OutputBlock[] | null>(null);

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("请先完成行为验证。");
      return;
    }
    if (!requirements.trim()) {
      setStatus("请输入合同需求，如租期、付款方式、保密条款等。");
      return;
    }

    const result = await consumeCreditsAndExecute(`生成${contractType}`, () => {
      setDraft([
        { label: "合同类型", value: contractType },
        { label: "需求摘要", value: requirements.trim() },
        ...example.output,
      ]);
    });

    setStatus(result.message);
  };

  // ... 其余代码保持不变 ...

  return (
    // ... JSX ...
    <button
      onClick={handleGenerate}
      disabled={!verified || isProcessing}
    >
      {isProcessing ? "处理中..." : `生成${contractType}`}
    </button>
  );
}
```

## 完成后测试

```bash
npm run dev
# 访问 http://localhost:3000
```

如果还有错误，请检查所有组件是否都已更新。


