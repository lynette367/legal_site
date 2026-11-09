'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ContractReviewResult } from '@/app/api/ai/review/route';

const MIN_CHARS = 300;
const MAX_CHARS = 30000;

const SAMPLE_CONTRACT = `INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is made between Acme Media LLC ("Client") and Jordan Lee ("Contractor").

1. Services. Contractor will provide website design services and any additional related work requested by Client, including unlimited revisions until Client is satisfied.

2. Payment. Client will pay Contractor $4,500 within 90 days after Client's own customer approves the final deliverables. No payment is due for work that Client, in its sole discretion, deems unsatisfactory.

3. Intellectual Property. All work product, including Contractor's pre-existing tools, templates and know-how, becomes the exclusive property of Client upon creation.

4. Indemnification. Contractor shall indemnify and hold Client harmless from any and all claims, losses and damages arising from or related to this Agreement, without limitation.

5. Termination. Client may terminate this Agreement at any time without notice. Contractor is not entitled to payment for work in progress at the time of termination.

6. Non-Compete. For two (2) years after termination, Contractor shall not provide similar services to any business in the United States.

7. Governing Law. This Agreement is governed by the laws of California.`;

type ErrorState = { message: string; code?: string } | null;

const SEVERITY_STYLES: Record<string, { badge: string; border: string; label: string }> = {
  high: { badge: 'bg-red-100 text-red-700', border: 'border-red-200', label: 'High risk' },
  medium: { badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200', label: 'Medium risk' },
  low: { badge: 'bg-sky-100 text-sky-700', border: 'border-sky-200', label: 'Low risk' },
};

const OVERALL_STYLES: Record<string, { box: string; label: string }> = {
  high: { box: 'bg-red-50 border-red-200 text-red-800', label: 'High risk — negotiate before signing' },
  medium: { box: 'bg-amber-50 border-amber-200 text-amber-800', label: 'Medium risk — a few clauses need fixing' },
  low: { box: 'bg-emerald-50 border-emerald-200 text-emerald-800', label: 'Low risk — mostly balanced' },
  unknown: { box: 'bg-slate-50 border-slate-200 text-slate-700', label: 'Could not assess' },
};

export default function AiContractReviewTool() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const [review, setReview] = useState<ContractReviewResult | null>(null);
  const [freeAvailable, setFreeAvailable] = useState<boolean | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/ai/review')
      .then((r) => r.json())
      .then((d) => setFreeAvailable(Boolean(d.freeAvailable)))
      .catch(() => setFreeAvailable(null));
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError(null);
    const name = file.name.toLowerCase();
    if (!(name.endsWith('.txt') || name.endsWith('.md') || file.type === 'text/plain')) {
      setError({
        message:
          'PDF and Word uploads are not supported yet. Open your contract, select all text (Ctrl/Cmd + A), copy and paste it into the box.',
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || '').slice(0, MAX_CHARS));
    reader.onerror = () => setError({ message: 'Could not read that file. Please paste the text instead.' });
    reader.readAsText(file);
  };

  const submit = async () => {
    setError(null);
    setReview(null);
    const trimmed = text.trim();
    if (trimmed.length < MIN_CHARS) {
      setError({ message: `Please paste the full contract (at least ${MIN_CHARS} characters).` });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/ai/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractText: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError({ message: data.error || 'Review failed. Please try again.', code: data.code });
        if (data.code === 'FREE_LIMIT_REACHED' || data.code === 'INSUFFICIENT_CREDITS') setFreeAvailable(false);
        return;
      }
      setReview(data.review);
      if (data.usage === 'free') setFreeAvailable(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch {
      setError({ message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const overall = review ? OVERALL_STYLES[review.riskLevel] || OVERALL_STYLES.unknown : null;

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-lg p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <label htmlFor="contract-text" className="font-bold text-gray-900">
            Paste your contract
          </label>
          <div className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => setText(SAMPLE_CONTRACT)}
              className="text-primary-lavender font-semibold hover:underline"
            >
              Try a sample contract
            </button>
            <label className="cursor-pointer text-gray-600 font-semibold hover:text-primary-lavender">
              Upload .txt
              <input
                type="file"
                accept=".txt,.md,text/plain"
                className="hidden"
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>

        <textarea
          id="contract-text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Paste the full text of your freelance or independent contractor agreement here…"
          rows={10}
          className="w-full rounded-xl border border-gray-300 p-4 text-sm leading-relaxed text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-lavender/40 focus:border-primary-lavender resize-y"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-gray-500">
          <span>
            {text.trim().length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </span>
          <span>
            {freeAvailable === false
              ? 'Free review used — sign in or get credits to continue'
              : '1 free review, no sign-up required'}
          </span>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="w-full mt-5 py-4 rounded-xl bg-primary-lavender text-white font-bold text-lg shadow-md hover:bg-primary-lavender-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Reviewing your contract… (about 20–40 seconds)' : 'Review My Contract for Free →'}
        </button>

        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          We don&apos;t save your contract text. It is sent to our AI provider only to generate this report.
          General information, not legal advice.
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p>{error.message}</p>
            {error.code === 'FREE_LIMIT_REACHED' && (
              <Link href="/login" className="inline-block mt-3 font-bold text-red-800 underline">
                Sign in to continue →
              </Link>
            )}
            {error.code === 'INSUFFICIENT_CREDITS' && (
              <Link href="/pricing" className="inline-block mt-3 font-bold text-red-800 underline">
                See pricing →
              </Link>
            )}
          </div>
        )}
      </div>

      {review && overall && (
        <div ref={resultRef} className="mt-8 space-y-6 scroll-mt-24">
          <div className={`rounded-2xl border p-6 ${overall.box}`}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1">Overall assessment</p>
            <p className="text-xl font-black mb-2">{overall.label}</p>
            <p className="text-sm leading-relaxed">{review.summary}</p>
          </div>

          {review.risks.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Risky clauses found ({review.risks.length})
              </h3>
              <ul className="space-y-4">
                {review.risks.map((risk, i) => {
                  const s = SEVERITY_STYLES[risk.severity] || SEVERITY_STYLES.medium;
                  return (
                    <li key={i} className={`rounded-2xl border bg-white p-5 ${s.border}`}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                        <span className="font-bold text-gray-900">{risk.title}</span>
                      </div>
                      {risk.clauseExcerpt && (
                        <blockquote className="border-l-4 border-gray-200 pl-3 my-3 text-sm italic text-gray-600">
                          &ldquo;{risk.clauseExcerpt}&rdquo;
                        </blockquote>
                      )}
                      <p className="text-sm text-gray-700 leading-relaxed">{risk.explanation}</p>
                      {risk.suggestion && (
                        <p className="mt-3 text-sm text-gray-800 bg-gray-50 rounded-lg p-3 leading-relaxed">
                          <strong>Suggested fix:</strong> {risk.suggestion}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {review.missingClauses.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Missing protections</h3>
              <ul className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
                {review.missingClauses.map((m, i) => (
                  <li key={i} className="p-4 text-sm">
                    <span className="font-bold text-gray-900">{m.title}</span>
                    {m.whyItMatters && <span className="text-gray-600"> — {m.whyItMatters}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl bg-primary-lavender/10 border border-primary-lavender/20 p-6">
            <p className="font-bold text-gray-900 mb-1">Rather start from a balanced contract?</p>
            <p className="text-sm text-gray-700 mb-4">
              Generate an agreement with fair payment terms, IP transfer on payment, and a kill fee built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contracts/generator"
                className="text-center px-5 py-3 rounded-xl bg-primary-lavender text-white font-bold hover:bg-primary-lavender-dark transition-colors"
              >
                Open the Contract Generator →
              </Link>
              <Link
                href="/contracts/california-independent-contractor-agreement-template"
                className="text-center px-5 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 font-bold hover:border-primary-lavender transition-colors"
              >
                California SB 988 Template
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            This AI review highlights common risks for informational purposes only. It may miss issues or
            misread context and is not a substitute for advice from a licensed attorney.
          </p>
        </div>
      )}
    </div>
  );
}
