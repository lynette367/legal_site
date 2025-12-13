"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase } from "../ui/ExampleShowcase";

export function ExplainModule() {
  const example = moduleExamples.explain;
  const { callAIApi, isProcessing } = useAIModule();
  const [clause, setClause] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleUseExample = () => {
    setClause("Party B shall bear all legal liability arising therefrom.");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("Complete the verification checkbox to continue.");
      return;
    }
    if (!clause.trim()) {
      setStatus("Please paste the clause that needs interpretation.");
      return;
    }

    setStatus("Generating clause analysis...");
    setAnalysis(null);

    const result = await callAIApi("/api/ai/explain", {
      clause: clause.trim(),
    });

    if (result.success && result.answer) {
      setStatus("✅ Clause explanation generated. 1 credit deducted.");
      setAnalysis(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="Sample clause explanation" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Paste a clause · Get an explanation</h2>
            <p className="text-sm text-text-primary/70">Returns the clause meaning, risk points, recommendations, and key notes.</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            Supports English and bilingual clauses
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="clause-input">
            Paste clause
          </label>
          <textarea
            id="clause-input"
            className="min-h-[180px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
            placeholder="Example: Party B shall bear all legal liability arising therefrom."
            value={clause}
            onChange={(event) => setClause(event.target.value)}
          />
          <button
            type="button"
            onClick={handleUseExample}
            className="text-sm text-text-lavender hover:text-primary-lavender-dark underline transition-colors"
          >
            Use example clause
          </button>
          <label className="flex items-center gap-3 text-sm text-text-primary/80">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary-lavender"
              checked={verified}
              onChange={(event) => setVerified(event.target.checked)}
            />
            I confirm the clause source is legitimate and agree to deduct 1 credit.
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "Processing..." : "Explain clause"}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {analysis && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender mb-4">AI clause explanation</p>
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
