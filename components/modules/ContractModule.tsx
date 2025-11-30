"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase, OutputBlock } from "../ui/ExampleShowcase";

const contractTypes = [
  { value: "租房合同", label: "租房合同" },
  { value: "劳务合同", label: "劳务合同" },
  { value: "合作协议", label: "简单合作协议" },
  { value: "NDA", label: "NDA 保密协议" },
];

const conversation = [
  { role: "用户", content: "需要一份劳务合同，约定月结并提供商业保险。" },
  { role: "Panco AI", content: "好的，将在合同中加入付款周期、保险责任、违约责任及争议解决条款。" },
];

export function ContractModule() {
  const example = moduleExamples.contracts;
  const { callAIApi, isProcessing } = useAIModule();
  const [contractType, setContractType] = useState(contractTypes[0].value);
  const [requirements, setRequirements] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);

  const handleUseExample = () => {
    setRequirements("租房合同，我是房东，押一付三");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("请先完成行为验证。");
      return;
    }
    if (!requirements.trim()) {
      setStatus("请输入合同需求，如租期、付款方式、保密条款等。");
      return;
    }

    setStatus(`正在生成${contractType}...`);
    setDraft(null);

    const result = await callAIApi("/api/ai/contract", {
      contractType,
      requirements: requirements.trim(),
    });

    if (result.success && result.answer) {
      setStatus(`✅ ${contractType}已生成，已扣除 3 点`);
      setDraft(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="示例合同结构" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">输入合同需求，生成草稿</h2>
            <p className="text-sm text-text-primary/70">本次调用消耗 <span className="font-semibold text-text-lavender">3 点</span>，支持租房、劳务、简单合作及 NDA，包含关键条款提醒。</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            勾选行为验证后扣费生成
          </p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-text-primary" htmlFor="contract-type">
              合同类型
            </label>
            <select
              id="contract-type"
              className="w-full rounded-full border border-border-lavender/80 bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary-lavender"
              value={contractType}
              onChange={(event) => setContractType(event.target.value)}
            >
              {contractTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label className="text-sm font-semibold text-text-primary" htmlFor="contract-needs">
              关键信息
            </label>
            <textarea
              id="contract-needs"
              className="min-h-[180px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
              placeholder="例如：租房合同，我是房东，押一付三"
              value={requirements}
              onChange={(event) => setRequirements(event.target.value)}
            />
            <button
              type="button"
              onClick={handleUseExample}
              className="text-sm text-text-lavender hover:text-primary-lavender-dark underline transition-colors"
            >
              使用示例问题
            </button>
            <label className="flex items-center gap-3 text-sm text-text-primary/80">
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary-lavender"
                checked={verified}
                onChange={(event) => setVerified(event.target.checked)}
              />
              我确认信息完整，同意扣除 3 点生成合同草稿。
            </label>
            <button
              onClick={handleGenerate}
              className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!verified || isProcessing}
            >
              {isProcessing ? "处理中..." : `生成${contractType}`}
            </button>
            {status && <p className="text-sm text-text-lavender">{status}</p>}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border-lavender/80 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender">示例对话</p>
              <div className="mt-3 space-y-3">
                {conversation.map((msg, index) => (
                  <div key={`${msg.role}-${index}`} className="rounded-xl bg-primary-lavender/10 p-3 text-sm">
                    <p className="font-semibold text-text-lavender">{msg.role}</p>
                    <p className="mt-1 text-text-primary">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
            {draft && (
              <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
                <p className="text-sm font-semibold text-text-lavender mb-4">AI 生成的{contractType}</p>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-text-primary bg-white rounded-xl p-4 border border-border-lavender/50">
                    {draft}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
