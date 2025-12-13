"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase } from "../ui/ExampleShowcase";

const docOptions = [
  { value: "Complaint", label: "Complaint" },
  { value: "Defense statement", label: "Defense statement" },
  { value: "Demand letter", label: "Demand letter" },
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
    setDescription("Bought an e-bike that turned out to be refurbished; the seller refuses a refund.");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("Please complete the verification checkbox to continue.");
      return;
    }
    if (!description.trim()) {
      setStatus("Describe the dispute background, claims, and evidence so a draft can be generated.");
      return;
    }

    setStatus(`Generating ${docType}...`);
    setDraft(null);

    const result = await callAIApi("/api/ai/document", {
      docType,
      description: description.trim(),
    });

    if (result.success && result.answer) {
      setStatus(`✅ ${docType} created. 3 credits deducted.`);
      setDraft(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="Sample document structure" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Generate a legal document draft</h2>
            <p className="text-sm text-text-primary/70">This call consumes <span className="font-semibold text-text-lavender">3 credits</span>. Supports complaints, defense statements, and demand letters with copy-ready structures.</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            Single charge · structured fields
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-text-primary" htmlFor="doc-type">
            Document type
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
            Dispute description
          </label>
          <textarea
            id="doc-description"
            className="min-h-[160px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
            placeholder="Example: Bought an e-bike that was refurbished; the seller refuses a refund."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            I agree to deduct 3 credits to have Panco AI generate a {docType} draft.
          </label>
          <button
            onClick={handleGenerate}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!verified || isProcessing}
          >
            {isProcessing ? "Processing..." : `Generate ${docType}`}
          </button>
          {status && <p className="text-sm text-text-lavender">{status}</p>}
          {draft && (
            <div className="rounded-2xl border border-border-lavender/70 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender mb-4">AI-generated {docType}</p>
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
