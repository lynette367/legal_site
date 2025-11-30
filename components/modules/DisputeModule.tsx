"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase } from "../ui/ExampleShowcase";

export function DisputeModule() {
  const example = moduleExamples.dispute;
  const { callAIApi, isProcessing } = useAIModule();
  const [situation, setSituation] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  const handleUseExample = () => {
    setSituation("网购手机是翻新机，商家拒绝退款");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("请勾选行为验证确认本次调用。");
      return;
    }
    if (!situation.trim()) {
      setStatus("请描述纠纷详情，便于输出行动方案。");
      return;
    }

    setStatus("正在调用 AI 生成纠纷方案...");
    setPlan(null);

    const result = await callAIApi("/api/ai/dispute", {
      situation: situation.trim(),
    });

    if (result.success && result.answer) {
      setStatus("✅ 纠纷方案已生成，已扣除 2 点");
      setPlan(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="示例纠纷方案" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">生成纠纷行动方案</h2>
            <p className="text-sm text-text-primary/70">本次调用消耗 <span className="font-semibold text-text-lavender">2 点</span>，输出纠纷类型、行动路径、证据要求与风险点。</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            付费调用 · 行为验证码
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="dispute-input">
            描述纠纷情况
          </label>
          <textarea
            id="dispute-input"
            className="min-h-[160px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
            placeholder="例如：网购手机是翻新机，商家拒绝退款"
            value={situation}
            onChange={(event) => setSituation(event.target.value)}
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
            我确认此纠纷描述真实有效，愿意扣除 2 点生成方案。
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "处理中..." : "生成纠纷方案"}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {plan && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender mb-4">AI 生成的纠纷方案</p>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-text-primary">
                  {plan}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
