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
    setSituation("Bought a phone online and it was refurbished; the seller refuses a refund.");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("Please complete the verification checkbox to proceed.");
      return;
    }
    if (!situation.trim()) {
      setStatus("Please describe the dispute so an action plan can be generated.");
      return;
    }

    setStatus("Requesting an AI-generated dispute plan...");
    setPlan(null);

    const result = await callAIApi("/api/ai/dispute", {
      situation: situation.trim(),
    });

    if (result.success && result.answer) {
      setStatus("✅ Dispute plan generated. 2 credits deducted.");
      setPlan(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="Sample dispute plan" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Generate a dispute action plan</h2>
            <p className="text-sm text-text-primary/70">This call consumes <span className="font-semibold text-text-lavender">2 credits</span> and returns the dispute type, action path, evidence checklist, and risk points.</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            Paid call · human verification
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="dispute-input">
            Describe the dispute
          </label>
          <textarea
            id="dispute-input"
            className="min-h-[160px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
            placeholder="Example: Bought a phone online that was refurbished; the seller refuses a refund."
            value={situation}
            onChange={(event) => setSituation(event.target.value)}
          />
          <button
            type="button"
            onClick={handleUseExample}
            className="text-sm text-text-lavender hover:text-primary-lavender-dark underline transition-colors"
          >
            Use example prompt
          </button>
          <label className="flex items-center gap-3 text-sm text-text-primary/80">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary-lavender"
              checked={verified}
              onChange={(event) => setVerified(event.target.checked)}
            />
            I confirm this description is accurate and agree to deduct 2 credits to generate the plan.
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "Processing..." : "Generate dispute plan"}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {plan && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender mb-4">AI-generated dispute plan</p>
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
