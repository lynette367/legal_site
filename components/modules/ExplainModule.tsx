"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase, OutputBlock } from "../ui/ExampleShowcase";

export function ExplainModule() {
  const example = moduleExamples.explain;
  const { callAIApi, isProcessing } = useAIModule();
  const [clause, setClause] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleUseExample = () => {
    setClause("乙方应承担由此产生的一切法律责任");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("请完成行为验证后继续。");
      return;
    }
    if (!clause.trim()) {
      setStatus("请粘贴需要解释的条款。");
      return;
    }

    setStatus("正在解释条款...");
    setAnalysis(null);

    const result = await callAIApi("/api/ai/explain", {
      clause: clause.trim(),
    });

    if (result.success && result.answer) {
      setStatus("✅ 条款解释已生成，已扣除 1 点");
      setAnalysis(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="示例条款解释" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">粘贴条款 · 获取解释</h2>
            <p className="text-sm text-text-primary/70">输出条款定义、风险点、建议与注意事项。</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            支持中文/中英双语条款
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="clause-input">
            粘贴条款
          </label>
          <textarea
            id="clause-input"
            className="min-h-[180px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
            placeholder="例如：乙方应承担由此产生的一切法律责任"
            value={clause}
            onChange={(event) => setClause(event.target.value)}
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
            我确认本条款来源合法并同意扣除 1 点。
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "处理中..." : "解释条款"}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {analysis && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender mb-4">AI 条款解释</p>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-text-primary bg-white rounded-xl p-4 border border-border-lavender/50">
                  {analysis}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
