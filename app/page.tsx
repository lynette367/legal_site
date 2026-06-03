// app/page.tsx
import Link from "next/link";
import { professions } from "@/data/professions";
import { allSeoPages } from "@/data/seoPages";

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
      {/* 1. Hero Section — unchanged */}
      <section className="mx-auto max-w-4xl pt-16 text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          California Freelancer Legal Protection (2026 Legal Sync)
        </div>
        <h1 className="text-4xl font-black tracking-tight text-text-primary sm:text-6xl mb-6 leading-none">
          Secure Your Freelance Business <br />
          <span className="text-primary-lavender bg-gradient-to-r from-primary-lavender to-purple-600 bg-clip-text text-transparent">
            Under California SB 988
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-primary/70 leading-relaxed mb-10">
          AI-powered contracts and late‑payment enforcement tools built for the Freelance Worker Protection Act. Ensure you collect double damages when clients ghost your invoices.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tools/sb988-contract-generator"
            className="rounded-xl bg-primary-lavender px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-lavender/25 transition-all hover:bg-primary-lavender-dark hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Free Contract Generator
          </Link>
          <Link
            href="/tools/sb988-late-payment-calculator"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:-translate-y-0.5"
          >
            Calculate Claims Penalty
          </Link>
          <Link
            href="/guides/sb988-small-claims-guide"
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-4 shadow-lg transition-all"
          >
            Client Refusing To Pay?
          </Link>
        </div>
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

      {/* 3. Resource Center — unchanged */}
      <section className="relative py-20 bg-[#d1d1f6] text-gray-900 rounded-[2.5rem] max-w-6xl mx-auto overflow-hidden px-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-lavender/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="bg-white/10 text-amber-400 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Core Interactive Apps
            </span>
            <h2 className="text-3xl font-black mt-2">
              SB 988 Central Enforcement Hub
            </h2>
            <p className="text-base text-gray-400 mt-2">
              Powerful functional utilities ensuring strict operational compliance with California labor standards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/tools/sb988-contract-generator"
              className="group rounded-xl border border-gray-200 bg-[#fbfbfe] p-6 transition-all hover:bg-white hover:border-primary-lavender"
            >
              <div className="mb-4 inline-block rounded-lg bg-primary-lavender/2">
                <span className="text-gray-900 font-bold">Tools</span>
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
