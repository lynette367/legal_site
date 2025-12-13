"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase } from "../ui/ExampleShowcase";

export function LegalQaModule() {
  const example = moduleExamples.legalQa;
  const { callAIApi, isProcessing } = useAIModule();
  const [question, setQuestion] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("Complete the human verification to confirm this request.");
      return;
    }
    if (!question.trim()) {
      setStatus("Please enter a legal question so the AI can classify it and flag risks.");
      return;
    }

    setStatus("Requesting an AI-generated answer...");
    setResponse(null);

    // Call AI API (credits deducted server-side)
    const result = await callAIApi("/api/ai/legal-qa", {
      query: question.trim(),
    });

    if (result.success && result.answer) {
      setStatus("✅ AI response generated. 1 credit deducted.");
      setResponse(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  const handleUseExample = () => {
    setQuestion("The company is forcing me to extend my probation. Is that lawful?");
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="Sample answer" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Submit your legal question</h2>
            <p className="text-sm text-text-primary/70">This call consumes <span className="font-semibold text-text-lavender">1 credit</span> and returns the issue type, risk alerts, suggested steps, and notes.</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            Sign-in + human verification required
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="qa-input">
            Describe your legal question
          </label>
          <textarea
            id="qa-input"
            className="min-h-[140px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm text-text-primary outline-none focus:border-primary-lavender"
            placeholder="Example: The company is forcing me to extend probation. Is that lawful?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <button
            type="button"
            onClick={handleUseExample}
            className="text-sm text-text-lavender hover:text-primary-lavender-dark underline transition-colors"
          >
            Use example question
          </button>
          <label className="flex items-center gap-3 text-sm text-text-primary/80">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary-lavender"
              checked={verified}
              onChange={(event) => setVerified(event.target.checked)}
            />
            I confirm this request is made by a human and agree to deduct 1 credit.
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "Processing..." : "Generate legal answer"}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {response && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender">AI legal answer</p>
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
