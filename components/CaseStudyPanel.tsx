// components/CaseStudyPanel.tsx
// Static server component — renders a rich-text SB 988 case study panel.
// Used on faq-pipe landing pages to replace the interactive AI scenario tool.

import Link from "next/link";
import type { CaseStudy } from "@/data/seoPages";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyPanel({ caseStudy }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 mb-4">
          📋 {caseStudy.badge}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-text-primary leading-tight">
          {caseStudy.title}
        </h3>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden">

        {/* ── Parties + Contract Amount ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 border-b border-gray-200">
          <div className="bg-white px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">🏢 Client</p>
            <p className="text-sm font-semibold text-text-primary leading-snug">{caseStudy.parties.client}</p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">👤 Freelancer</p>
            <p className="text-sm font-semibold text-text-primary leading-snug">{caseStudy.parties.freelancer}</p>
          </div>
        </div>
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Contract Value:</span>
          <span className="text-sm font-black text-primary-lavender">{caseStudy.contractAmount}</span>
        </div>

        {/* ── Situation ─────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">What Happened</p>
          <blockquote className="relative pl-4 border-l-2 border-primary-lavender">
            <p className="text-sm text-gray-700 leading-relaxed italic">
              {caseStudy.situation}
            </p>
          </blockquote>
        </div>

        {/* ── Violation ─────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-gray-100 bg-red-50/40">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">SB 988 Violation Found</p>
          <div className="border border-red-200 bg-red-50 rounded-xl px-4 py-4">
            <div className="flex items-start gap-2.5 mb-2">
              <span className="text-base shrink-0 mt-0.5">⚠️</span>
              <p className="text-sm font-bold text-red-800">{caseStudy.violation.clause}</p>
            </div>
            <p className="text-xs text-red-700 leading-relaxed pl-7">{caseStudy.violation.explanation}</p>
          </div>
        </div>

        {/* ── Outcome ───────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Legal Outcome</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4 flex items-start gap-3">
              <span className="text-xl shrink-0">💰</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Statutory Damages</p>
                <p className="text-sm font-black text-emerald-800 leading-snug">{caseStudy.outcome.damages}</p>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex items-start gap-3">
              <span className="text-xl shrink-0">✅</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">What Happened</p>
                <p className="text-sm text-gray-700 leading-snug">{caseStudy.outcome.result}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Takeaway ──────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-gray-100 bg-blue-50/30">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">💡</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1.5">Key Takeaway</p>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">{caseStudy.takeaway}</p>
            </div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Don&apos;t let this happen to you.</p>
            <p className="text-xs text-gray-400">
              Use our free tools to protect your rights under California SB 988.
            </p>
          </div>
          <Link
            href={caseStudy.toolLink}
            className="shrink-0 inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap"
          >
            {caseStudy.toolLabel} →
          </Link>
        </div>

      </div>
    </div>
  );
}
