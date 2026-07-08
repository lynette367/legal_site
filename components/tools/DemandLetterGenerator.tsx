"use client";

import { useState } from "react";

interface FormState {
  yourName: string;
  yourAddress: string;
  clientName: string;
  clientAddress: string;
  serviceDescription: string;
  invoiceDate: string;
  dueDate: string;
  amountOwed: string;
  invoiceNumber: string;
  additionalContext: string;
}

const initialState: FormState = {
  yourName: "",
  yourAddress: "",
  clientName: "",
  clientAddress: "",
  serviceDescription: "",
  invoiceDate: "",
  dueDate: "",
  amountOwed: "",
  invoiceNumber: "",
  additionalContext: "",
};

type Status = "idle" | "needsAuth" | "needsCredits" | "loading" | "done" | "error";

export default function DemandLetterGenerator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [letter, setLetter] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const requiredFilled =
    form.yourName && form.clientName && form.serviceDescription && form.amountOwed && form.dueDate;

  async function handleSubmit() {
    if (!requiredFilled) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ai/demand-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        setStatus("needsAuth");
        return;
      }
      if (res.status === 402) {
        setStatus("needsCredits");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Generation failed");
      }

      const data = await res.json();
      setLetter(data.letter);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([letter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SB988-demand-letter-${form.clientName || "draft"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {status !== "done" ? (
        <div className="bg-bg-card rounded-2xl shadow-soft p-6 md:p-8 space-y-6 border border-border-lavender">
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-1">
              Tell us what happened
            </h2>
            <p className="text-sm text-text-lavender">
              This information is used only to draft your letter. Nothing is stored beyond
              generating your document.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Your name*" value={form.yourName} onChange={update("yourName")} />
            <Field
              label="Client / company name*"
              value={form.clientName}
              onChange={update("clientName")}
            />
            <Field
              label="Your mailing address"
              value={form.yourAddress}
              onChange={update("yourAddress")}
            />
            <Field
              label="Client mailing address"
              value={form.clientAddress}
              onChange={update("clientAddress")}
            />
            <Field
              label="Invoice date"
              type="date"
              value={form.invoiceDate}
              onChange={update("invoiceDate")}
            />
            <Field
              label="Payment due date*"
              type="date"
              value={form.dueDate}
              onChange={update("dueDate")}
            />
            <Field
              label="Amount owed (USD)*"
              value={form.amountOwed}
              onChange={update("amountOwed")}
              placeholder="e.g. 2500"
            />
            <Field
              label="Invoice number"
              value={form.invoiceNumber}
              onChange={update("invoiceNumber")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description of work performed*
            </label>
            <textarea
              className="w-full rounded-lg border border-border-lavender bg-white/80 p-3 text-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-primary-lavender"
              value={form.serviceDescription}
              onChange={update("serviceDescription")}
              placeholder="e.g. Designed and delivered final brand identity assets on March 3, invoice sent same day."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Anything else the letter should mention
            </label>
            <textarea
              className="w-full rounded-lg border border-border-lavender bg-white/80 p-3 text-sm min-h-[70px] focus:outline-none focus:ring-2 focus:ring-primary-lavender"
              value={form.additionalContext}
              onChange={update("additionalContext")}
              placeholder="e.g. Client acknowledged the invoice by email on March 10 but has not paid since."
            />
          </div>

          {status === "needsAuth" && (
            <Notice>
              Sign in to generate your letter — it takes one click via the link we email you.{" "}
              <a href="/login" className="underline font-medium">
                Sign in
              </a>
            </Notice>
          )}
          {status === "needsCredits" && (
            <Notice>
              Generating a letter costs $4.99 (1 credit).{" "}
              <a href="/pricing" className="underline font-medium">
                Buy a credit
              </a>
            </Notice>
          )}
          {status === "error" && <Notice tone="error">{errorMsg}</Notice>}

          <button
            onClick={handleSubmit}
            disabled={!requiredFilled || status === "loading"}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary-lavender hover:bg-primary-lavender-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition"
          >
            {status === "loading" ? "Drafting your letter…" : "Generate demand letter — $4.99"}
          </button>
        </div>
      ) : (
        <div className="bg-bg-card rounded-2xl shadow-soft p-6 md:p-8 space-y-4 border border-border-lavender">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Your demand letter</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm rounded-md border border-border-lavender hover:bg-primary-lavender/10"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-sm rounded-md bg-primary-lavender text-white hover:bg-primary-lavender-dark"
              >
                Download .txt
              </button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary font-sans bg-bg-main rounded-lg p-4 border border-border-lavender max-h-[600px] overflow-y-auto">
            {letter}
          </pre>
          <button
            onClick={() => {
              setStatus("idle");
              setLetter("");
            }}
            className="text-sm text-text-lavender underline"
          >
            Start a new letter
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border-lavender bg-white/80 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-lavender"
      />
    </div>
  );
}

function Notice({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "error";
}) {
  return (
    <div
      className={`text-sm rounded-lg p-3 ${
        tone === "error"
          ? "bg-red-50 text-red-700 border border-red-200"
          : "bg-primary-lavender/10 text-text-lavender border border-border-lavender"
      }`}
    >
      {children}
    </div>
  );
}
