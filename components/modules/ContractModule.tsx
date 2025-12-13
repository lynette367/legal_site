"use client";

import { useState } from "react";
import { moduleExamples } from "../../data/moduleExamples";
import { useAIModule } from "./ModuleWrapper";
import { ExampleShowcase } from "../ui/ExampleShowcase";

const contractTypes = [
  { value: "Residential lease", label: "Residential lease" },
  { value: "Labor contract", label: "Labor contract" },
  { value: "Partnership agreement", label: "Simple partnership agreement" },
  { value: "NDA", label: "NDA confidentiality agreement" },
];

const conversation = [
  { role: "User", content: "I need a labor contract with monthly payments and commercial insurance." },
  { role: "Panco AI", content: "Understood. I will include payment schedule, insurance obligations, breach terms, and dispute resolution clauses." },
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
    setRequirements("Residential lease; I am the landlord; three months deposit, one month rent upfront.");
  };

  const handleGenerate = async () => {
    if (!verified) {
      setStatus("Please complete the verification checkbox first.");
      return;
    }
    if (!requirements.trim()) {
      setStatus("Enter the contract requirements such as term, payment method, and confidentiality clauses.");
      return;
    }

    setStatus(`Generating ${contractType}...`);
    setDraft(null);

    const result = await callAIApi("/api/ai/contract", {
      contractType,
      requirements: requirements.trim(),
    });

    if (result.success && result.answer) {
      setStatus(`✅ ${contractType} created. 3 credits deducted.`);
      setDraft(result.answer);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-10">
      <ExampleShowcase inputExample={example.input} outputBlocks={example.output} title="Sample contract structure" />
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Input contract needs to generate a draft</h2>
            <p className="text-sm text-text-primary/70">This call consumes <span className="font-semibold text-text-lavender">3 credits</span>. Supports leases, labor agreements, simple partnerships, and NDAs with key clause reminders.</p>
          </div>
          <p className="rounded-full border border-border-lavender/80 px-4 py-1 text-xs font-semibold text-text-lavender">
            Verification required before billing
          </p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-text-primary" htmlFor="contract-type">
              Contract type
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
              Key information
            </label>
            <textarea
              id="contract-needs"
              className="min-h-[180px] w-full rounded-2xl border border-border-lavender/80 bg-white/80 p-4 text-sm outline-none focus:border-primary-lavender"
              placeholder="Example: Residential lease; I am the landlord; three months deposit and one month rent upfront."
              value={requirements}
              onChange={(event) => setRequirements(event.target.value)}
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
              I confirm the information is complete and agree to deduct 3 credits to generate the contract draft.
            </label>
            <button
              onClick={handleGenerate}
              className="w-full rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!verified || isProcessing}
            >
              {isProcessing ? "Processing..." : `Generate ${contractType}`}
            </button>
            {status && <p className="text-sm text-text-lavender">{status}</p>}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border-lavender/80 bg-white/90 p-5">
              <p className="text-sm font-semibold text-text-lavender">Sample conversation</p>
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
                <p className="text-sm font-semibold text-text-lavender mb-4">AI-generated {contractType}</p>
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
