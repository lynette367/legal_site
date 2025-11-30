"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase } from "../ui/ExampleShowcase";

const docOptions = [
  { value: "起诉状", label: "起诉状" },
  { value: "答辩状", label: "答辩状" },
  { value: "投诉书", label: "投诉书" },
];

export function DocumentModule() {
  const example = moduleExamples.documents;
  const { callAIApi, isProcessing } = useAIModule();
  const [docType, setDocType] = useState(docOptions[0].value);
  const [description, setDescription] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);

  const handleUseExample = () => {
    setDescription("购买电动车后发现是翻新机，对方拒绝退款");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("请完成行为验证以继续。");
      return;
    }
    if (!description.trim()) {
      setStatus("请描述纠纷背景、诉求与证据，以便生成文书。");
      return;
    }

    setStatus(`正在生成${docType}...`);
    setDraft(null);

    const result = await callAIApi("/api/ai/document", {
      docType,
      description: description.trim(),
    });

    if (result.success && result.answer) {
      setStatus(`✅ ${docType}已生成，已扣除 3 点`);
      setDraft(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="示例文书结构" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">生成法律文书草稿</h2>
            <p className="text-sm text-text-primary/70">本次调用消耗 <span className="font-semibold text-text-lavender">3 点</span>，支持起诉状、答辩状、投诉书，输出可复制结构。</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            单次扣费 · 模块化字段
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="doc-type">
            文书类型
          </label>
          <select
            id="doc-type"
            className="w-full rounded-full border border-border-lavender/80 bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary-lavender"
            value={docType}
            onChange={(event) => setDocType(event.target.value)}
          >
            {docOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className="text-sm font-semibold text-text-primary" htmlFor="doc-description">
            纠纷描述
          </label>
          <textarea
            id="doc-description"
            className="min-h-[160px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
            placeholder="例如：购买电动车后发现是翻新机，对方拒绝退款"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            我确认将扣除 3 点，由 Panco AI 生成 {docType} 草稿。
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "处理中..." : `生成${docType}`}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {draft && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender mb-4">AI 生成的{docType}</p>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-text-primary bg-white rounded-xl p-4 border border-border-lavender/50">
                  {draft}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
