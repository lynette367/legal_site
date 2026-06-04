"use client";
// app/freelance-contract/[slug]/ScenarioTool.tsx
// Interactive AI scenario tool — the conversion engine of every slug page.
// Calls the Anthropic API directly from the browser (no server route needed).

import { useState, useRef } from "react";
import Link from "next/link";
import type { SeoPage } from "@/data/seoPages";

interface Props {
  pipeType: SeoPage["painPipeType"];
  placeholder: string;
  ctaLabel: string;

}

// ── What the AI returns for each pipe ────────────────────────────────────────
interface AnalysisResult {
  summary: string;           // 1-sentence verdict
  findings: Finding[];       // 2-4 bullet findings
  damageAmount?: string;     // for freelancer pipe — "You may be owed $X"
  nextStep: string;          // the ONE recommended action
  toolLink: string;          // where to go for full generation
  toolLabel: string;         // CTA label
  urgency: "low" | "medium" | "high";
}

interface Finding {
  icon: string;
  label: string;
  detail: string;
  severity: "ok" | "warn" | "critical";
}

const URGENCY_STYLE = {
  low:    { bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  medium: { bar: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50 border-amber-200"   },
  high:   { bar: "bg-red-500",     text: "text-red-700",     bg: "bg-red-50 border-red-200"       },
};

const SEVERITY_STYLE = {
  ok:       { icon: "✅", bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-800" },
  warn:     { icon: "⚠️", bg: "bg-amber-50 border-amber-100",    text: "text-amber-800"   },
  critical: { icon: "🚨", bg: "bg-red-50 border-red-100",        text: "text-red-800"     },
};

// ── System prompts per pipe type ──────────────────────────────────────────────
function buildSystemPrompt(pipeType: SeoPage["painPipeType"]): string {
  const base = `You are PancoLegal, a California SB 988 (Freelance Worker Protection Act) legal analysis AI.
Analyze the user's situation and respond ONLY with a valid JSON object — no markdown, no explanation outside the JSON.

Required JSON structure:
{
  "summary": "One-sentence plain-English verdict (max 20 words)",
  "findings": [
    {
      "icon": "emoji",
      "label": "Short label (3-5 words)",
      "detail": "1-2 sentence explanation referencing SB 988",
      "severity": "ok" | "warn" | "critical"
    }
  ],
  "damageAmount": "string or null — only if calculable from the text (e.g. '$6,400 in double damages')",
  "nextStep": "The single most important action the user should take right now (1 sentence)",
  "toolLink": "/tools/sb988-contract-generator" | "/tools/sb988-late-payment-calculator" | "/tools/freelancer-contract-review",
  "toolLabel": "Short CTA for the tool button (max 6 words)",
  "urgency": "low" | "medium" | "high"
}

Rules:
- findings: 2 to 4 items only
- Always cite SB 988 by name in at least one finding detail
- damageAmount: calculate as 2× the stated invoice/contract amount if present; otherwise null
- Be direct and actionable — no legal disclaimers inside the JSON
- urgency "high" if there is a clear SB 988 violation or money at risk`;

  const pipeInstructions: Record<SeoPage["painPipeType"], string> = {
    employer: `\n\nThis user is an EMPLOYER or hiring party. Focus on:
- Whether a written contract was in place (required for $250+)
- Whether the 30-day payment deadline was honored
- Specific SB 988 clauses they may be violating
- Risk of double-damage liability`,
    freelancer: `\n\nThis user is a FREELANCER pursuing payment. Focus on:
- How many days overdue the invoice is
- Whether they have a written contract (affects claim strength)
- Calculate double damages if invoice amount is mentioned
- Whether they can file in Small Claims Court ($12,500 limit)
- Whether a formal demand letter should be sent first`,
    industry: `\n\nThis user wants to generate or check a freelance contract. Focus on:
- Whether their described project needs a written contract (>$250 threshold)
- What SB 988-required clauses should be in their contract
- IP ownership / withholding provisions
- Payment schedule and deadline compliance`,
    faq: `\n\nThis user has a general SB 988 legal question. Focus on:
- Direct answer to their question under California law
- Whether SB 988 applies to their specific situation
- Practical next steps`,
  };

  return base + pipeInstructions[pipeType];
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ScenarioTool({ pipeType, placeholder, ctaLabel }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = wordCount >= 10 && !loading;

  async function handleAnalyze() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(pipeType),
          messages: [{ role: "user", content: text }],
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);

      const data = await response.json();
      const raw = data.content?.find((b: { type: string }) => b.type === "text")?.text ?? "";

      // Strip any markdown fences the model might add
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed: AnalysisResult = JSON.parse(cleaned);
      setResult(parsed);

      // Scroll to result
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      console.error(err);
      setError("Something went wrong with the analysis. Please try again — or head directly to the tool.");
    } finally {
      setLoading(false);
    }
  }

  const urgencyStyle = result ? URGENCY_STYLE[result.urgency] : null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Input card ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
          <span className="text-lg">🤖</span>
          <div>
            <p className="text-sm font-bold text-text-primary leading-none">PancoLegal AI</p>
            <p className="text-xs text-gray-400 mt-0.5">California SB 988 Specialist</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>

        {/* Textarea */}
        <div className="p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            rows={7}
            className="w-full text-sm text-text-primary placeholder-gray-400 leading-relaxed resize-none focus:outline-none bg-transparent"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50 gap-3 flex-wrap">
          <span className={`text-xs transition-colors ${wordCount < 10 ? "text-gray-400" : "text-emerald-600 font-medium"}`}>
            {wordCount < 10
              ? `${10 - wordCount} more word${10 - wordCount !== 1 ? "s" : ""} to enable analysis`
              : `✓ ${wordCount} words — ready to analyze`}
          </span>
          <div className="flex items-center gap-3">
            {text.length > 0 && (
              <button
                onClick={() => { setText(""); setResult(null); setError(null); }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleAnalyze}
              disabled={!canSubmit}
              className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-xl transition-all ${
                canSubmit
                  ? "bg-primary-lavender hover:bg-primary-lavender-dark text-white hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>{ctaLabel}</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Error state ────────────────────────────────────────────────────── */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700">
          {error}{" "}
          <Link href="/tools" className="font-bold underline">
            Go to tools →
          </Link>
        </div>
      )}

      {/* ── Loading skeleton ───────────────────────────────────────────────── */}
      {loading && (
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-3/4 mb-4" />
          <div className="h-3 bg-gray-100 rounded w-full mb-2" />
          <div className="h-3 bg-gray-100 rounded w-5/6 mb-6" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* ── Result card ────────────────────────────────────────────────────── */}
      {result && !loading && (
        <div ref={resultRef} className="mt-6 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-soft">

          {/* Urgency bar */}
          <div className={`h-1.5 w-full ${urgencyStyle!.bar}`} />

          {/* Summary */}
          <div className={`px-6 py-5 border-b border-gray-100 ${urgencyStyle!.bg} border`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">
                {result.urgency === "high" ? "🚨" : result.urgency === "medium" ? "⚠️" : "✅"}
              </span>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${urgencyStyle!.text}`}>
                  {result.urgency === "high" ? "Action Required" : result.urgency === "medium" ? "Review Recommended" : "Looks Good"}
                </p>
                <p className="text-base font-bold text-text-primary leading-snug">{result.summary}</p>
              </div>
            </div>
            {/* Damage amount callout */}
            {result.damageAmount && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-xs text-gray-500">Potential recovery under SB 988</p>
                  <p className="text-lg font-black text-primary-lavender">{result.damageAmount}</p>
                </div>
              </div>
            )}
          </div>

          {/* Findings */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Analysis</p>
            <div className="flex flex-col gap-3">
              {result.findings.map((f, i) => {
                const sev = SEVERITY_STYLE[f.severity];
                return (
                  <div key={i} className={`flex gap-3 border rounded-xl px-4 py-3 ${sev.bg}`}>
                    <span className="text-base mt-0.5 shrink-0">{f.icon || sev.icon}</span>
                    <div>
                      <p className={`text-sm font-bold ${sev.text}`}>{f.label}</p>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{f.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next step */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Recommended Next Step</p>
            <p className="text-sm text-text-primary leading-relaxed font-medium">{result.nextStep}</p>
          </div>

          {/* CTA */}
          <div className="px-6 py-5 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                This is a free preview — full documents require credits
              </p>
              <p className="text-xs text-gray-400">
                Starter pack from $9.99 · No subscription
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={result.toolLink}
                className="inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
              >
                {result.toolLabel} →
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center border border-gray-300 hover:border-primary-lavender text-gray-600 hover:text-primary-lavender font-semibold text-sm px-4 py-3 rounded-xl transition-all"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Re-analyze */}
          <div className="px-6 pb-5 text-center">
            <button
              onClick={() => { setResult(null); setText(""); }}
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
            >
              Start over with a different situation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
