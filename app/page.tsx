// app/page.tsx
import Link from "next/link";
import { professions } from "@/data/professions";
import { allSeoPages } from "@/data/seoPages";
import LightweightScenarioEngine from "@/components/tools/LightweightScenarioEngine";
import { Suspense } from "react";

export const metadata = {
  title: "[PancoLegal] | California SB 988 Compliance AI | Freelance Contract & Payment Protection",
  description: "Protect your freelance income under CA SB 988. Use our AI to draft mandatory contracts for projects over $250, track payment deadlines, and calculate 2x late payment penalties. The only AI legal tool built specifically for the California Freelance Worker Protection Act.",
  alternates: { canonical: "https://pancothink.com" },
  openGraph: {
    title: "[PancoLegal] | California SB 988 Compliance AI | Freelance Contract & Payment Protection",
    description: "Protect your freelance income under CA SB 988. Use our AI to draft mandatory contracts for projects over $250, track payment deadlines, and calculate 2x late payment penalties. The only AI legal tool built specifically for the California Freelance Worker Protection Act.",
    url: "https://pancothink.com",
    siteName: "Panco",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "[PancoLegal] | California SB 988 Compliance AI | Freelance Contract & Payment Protection",
    images: ["/og-image.png"],
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

// Pick representative seed pages for homepage spotlight
// 4 pipes × 1 each = 4 cards, nicely balanced
const PIPE_SPOTLIGHTS = [
  "california-freelance-contract-requirements-2026",   // employer
  "california-tech-contractor-agreement-template",     // industry
  "client-refuses-to-pay-freelance-invoice-california",// freelancer
  "is-email-valid-contract-freelance-work-california", // faq
] as const;

const PIPE_COLORS: Record<string, string> = {
  employer: "#e85d26",
  industry: "#059669",
  freelancer: "#2563eb",
  faq: "#7c3aed",
};

const PIPE_LABELS: Record<string, string> = {
  employer: "Employer Compliance",
  industry: "Industry Template",
  freelancer: "Freelancer Rights",
  faq: "Legal FAQ",
};

export default function HomePage() {
  // Resolve spotlight pages at build time (server component)
  const spotlightPages = PIPE_SPOTLIGHTS
    .map((slug) => allSeoPages.find((p) => p.slug === slug))
    .filter(Boolean);

  // For the "browse all" row: pick 6 formula pages (diverse industry × painpoint)
  const browseMore = allSeoPages
    .filter((p) => p.painPipeType === "industry" || p.painPipeType === "freelancer")
    .slice(4, 10); // skip seeds already spotlighted

  return (
    <div className="space-y-24 pb-24 bg-gray-50/50">
      {/* 1. Hero Section & Lightweight Scenario Engine */}
      <section className="mx-auto max-w-4xl pt-16 text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          California Freelance Legal Protection (2026 Legal Sync)
        </div>
        <h1 className="text-4xl font-black tracking-tight text-text-primary sm:text-6xl mb-6 leading-none">
          Secure Your Freelance Business <br />
          <span className="text-primary-lavender bg-gradient-to-r from-primary-lavender to-purple-600 bg-clip-text text-transparent">
            Under California SB 988
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-primary/70 leading-relaxed mb-10">
          Draft legally mandated contracts, monitor pay deadlines, and estimate statutory double damages. Select your scenario below to access our standalone compliance tools.
        </p>

        <Suspense fallback={<div className="text-center py-8 text-slate-500">Loading Scenario Selector...</div>}>
          <LightweightScenarioEngine />
        </Suspense>
      </section>

      {/* 2. Industry Cards — unchanged */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Tailored Legal Blueprints
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3 tracking-tight">
            Find Your Industry Contract Template
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-xl mx-auto">
            Don&apos;t use generic, uninspired agreements. Select your field to access 100% compliant, industry‑specific contractual blueprints.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {professions.map((prof, index) => {
            const isLargeCard = index % 3 === 0;
            return (
              <Link
                key={prof.slug}
                href={`/guides/${prof.slug}`}
                className={`group p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary-lavender flex flex-col justify-between relative overflow-hidden ${isLargeCard ? "md:col-span-2 bg-gradient-to-br from-white to-primary-lavender/5 border-primary-lavender/30 shadow-sm" : "bg-white border-gray-200 shadow-sm"}`}
              >
                <div className="absolute right-2 bottom-2 text-9xl opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transform translate-x-4 translate-y-4 transition-all duration-300 group-hover:scale-110">
                  {prof.icon}
                </div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center rounded-xl bg-gray-50 border p-2.5 shadow-xs mb-4 group-hover:border-primary-lavender/30 transition-colors ${isLargeCard ? "text-3xl" : "text-2xl"}`}>
                    {prof.icon}
                  </div>
                  <h3 className={`font-black text-gray-900 group-hover:text-primary-lavender transition-colors tracking-tight ${isLargeCard ? "text-2xl" : "text-lg"}`}>
                    {prof.name} Contract Template
                  </h3>
                  <p className={`text-text-primary/70 mt-2 leading-relaxed ${isLargeCard ? "text-sm max-w-xl" : "text-xs"}`}>
                    {prof.shortDesc}
                  </p>
                  {isLargeCard && (
                    <div className="mt-4 p-3 bg-white/60 backdrop-blur-xs rounded-lg border border-dashed border-gray-200 text-[11px] font-mono text-gray-400 max-w-md hidden sm:block">
                      Includes: Mandated 30‑Day Pay Terms • IP Withholding Until Escrow Clears • 200% Statutory Failure Penalty Clauses
                    </div>
                  )}
                </div>
                <div className={`font-bold text-primary-lavender flex items-center gap-1 relative z-10 group-hover:text-primary-lavender-dark ${isLargeCard ? "text-sm mt-8" : "text-xs mt-6"}`}>
                  Get Free {prof.name} Blueprint
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Central Compliance Tools Index */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm text-center">
          <span className="bg-primary-lavender/10 text-primary-lavender text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Standalone Compliance Suite
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
            SB 988 Central Enforcement Hub
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
            Direct access to our standalone interactive utilities built for California Freelance Worker Protection Act standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Link
              href="/tools/sb988-contract-generator"
              className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary-lavender hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
            >
              <span className="text-2xl">📝</span>
              <h3 className="font-bold text-gray-900 mt-3 group-hover:text-primary-lavender transition-colors">Contract Generator</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Generate ironclad, SB 988-compliant freelance agreements in 30 seconds.</p>
              <div className="text-xs font-bold text-primary-lavender mt-4 flex items-center gap-1">
                Open Generator <span>→</span>
              </div>
            </Link>

            <Link
              href="/tools/sb988-late-payment-calculator"
              className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary-lavender hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
            >
              <span className="text-2xl">🧮</span>
              <h3 className="font-bold text-gray-900 mt-3 group-hover:text-primary-lavender transition-colors">Penalty Calculator</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Calculate double damages, late fees, and simulate corporate legal exposure.</p>
              <div className="text-xs font-bold text-primary-lavender mt-4 flex items-center gap-1">
                Open Calculator <span>→</span>
              </div>
            </Link>

            <Link
              href="/guides/sb988-small-claims-guide"
              className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary-lavender hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
            >
              <span className="text-2xl">⚖️</span>
              <h3 className="font-bold text-gray-900 mt-3 group-hover:text-primary-lavender transition-colors">Litigation Blueprint</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Step-by-step small claims roadmap to sue non-paying clients without a lawyer.</p>
              <div className="text-xs font-bold text-primary-lavender mt-4 flex items-center gap-1">
                Open Roadmap <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. SB 988 Legal Guide Hub  ← NEW SECTION
          Purpose: pass PageRank from homepage to /freelance-contract cluster
          Google treats homepage links as highest-trust internal signals
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
              California SB 988 Legal Guides
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mt-3 tracking-tight">
              Know Your Rights. Get Paid.
            </h2>
            <p className="text-base text-text-primary/70 mt-2 max-w-lg">
              100+ guides for California freelancers and employers — covering contracts, late payments, demand letters, and more.
            </p>
          </div>
          {/* Hub link — the most SEO-critical anchor on this page */}
          <Link
            href="/freelance-contract"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-primary-lavender border border-primary-lavender/30 rounded-xl px-5 py-2.5 hover:bg-primary-lavender/5 transition-colors"
          >
            Browse all guides
            <span>→</span>
          </Link>
        </div>

        {/* 4 spotlight cards — one per pipe type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {spotlightPages.map((page) => {
            if (!page) return null;
            const color = PIPE_COLORS[page.painPipeType] ?? "#6b7280";
            const label = PIPE_LABELS[page.painPipeType] ?? page.painPipeType;
            return (
              <Link
                key={page.slug}
                href={`/freelance-contract/${page.slug}`}
                className="group flex flex-col gap-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Pipe label */}
                <span
                  className="self-start text-[10px] font-bold uppercase tracking-widest rounded px-2 py-0.5 border"
                  style={{ color, borderColor: `${color}40`, backgroundColor: `${color}0d` }}
                >
                  {label}
                </span>
                {/* H1 of the target page — exact keyword match for Google */}
                <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-lavender transition-colors leading-snug">
                  {page.h1}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                  {page.heroSubtitle.length > 100
                    ? page.heroSubtitle.slice(0, 100) + "…"
                    : page.heroSubtitle}
                </p>
                <span className="text-xs font-bold text-primary-lavender flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                  {page.primaryCta} <span>→</span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Secondary row: 6 formula pages as compact text links */}
        {/* These give Google additional anchor text diversity from homepage */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            More California Freelance Guides
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5">
            {browseMore.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/freelance-contract/${page.slug}`}
                  className="text-sm text-gray-700 hover:text-primary-lavender font-medium transition-colors leading-snug flex items-start gap-1.5"
                >
                  <span className="text-gray-300 mt-0.5 shrink-0">›</span>
                  <span className="line-clamp-2">{page.h1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-gray-200">
            <Link
              href="/freelance-contract"
              className="text-sm font-bold text-primary-lavender hover:underline"
            >
              View all 100+ guides for California freelancers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
