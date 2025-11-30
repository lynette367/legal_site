"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase, OutputBlock } from "../ui/ExampleShowcase";

export function LegalQaModule() {
  const example = moduleExamples.legalQa;
  const { callAIApi, isProcessing } = useAIModule();
  const [question, setQuestion] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("请先完成行为验证码，确认本次调用为真实需求。");
      return;
    }
    if (!question.trim()) {
      setStatus("请输入法律问题，便于 AI 判断类型与风险。");
      return;
    }

    setStatus("正在调用 AI 生成回答...");
    setResponse(null);

    // 调用 AI API（自动扣除 Credits）
    const result = await callAIApi("/api/ai/legal-qa", {
      query: question.trim(),
    });

    if (result.success && result.answer) {
      setStatus("✅ AI 回答已生成，已扣除 1 点");
      setResponse(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  const handleUseExample = () => {
    setQuestion("公司强制我延长试用期，这合法吗？");
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="示例回答" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">提交法律问题</h2>
            <p className="text-sm text-text-primary/70">本次调用消耗 <span className="font-semibold text-text-lavender">1 点</span>，输出问题类型、风险提示、建议步骤与注意事项。</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            行为验证 + 登录后方可调用
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="qa-input">
            描述你的法律问题
          </label>
          <textarea
            id="qa-input"
            className="min-h-[140px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm text-text-primary outline-none focus:border-primary-lavender"
            placeholder="例如：公司强制我延长试用期，这合法吗？"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
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
            我确认本次提交由真人操作，且同意扣除 1 点。
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "处理中..." : "生成法律回答"}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {response && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender">AI 法律回答</p>
              <div className="mt-4 prose prose-sm max-w-none">
                <div className="rounded-xl bg-primary-lavender/10 p-4 text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                  {response}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
