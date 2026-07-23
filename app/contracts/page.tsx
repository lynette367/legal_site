// app/contracts/page.tsx  — Hub index page
// Scenario-driven navigation: users pick their situation, not a keyword

import type { Metadata } from "next";
import Link from "next/link";
import { allSeoPages, type SeoPage } from "@/data/seoPages";

export const metadata: Metadata = {
  title: "California Freelance Contract Hub | SB 988 Legal Tools | IndieLegal",
  description:
    "Find the right California SB 988 legal guide for your situation — contract templates, late payment rights, demand letters, and employer compliance tools. 100+ guides.",
  alternates: { canonical: "https://indielegalterms.com/contracts" },
};

// ── Scenario cards shown at top — high-intent entry points ──────────────────
const SCENARIOS = [
  {
    emoji: "😤",
    title: "Client won't pay my invoice",
    sub: "Calculate your double damages and generate a formal demand letter.",
    href: "/contracts/client-refuses-to-pay-freelance-invoice-california",
    badge: "Freelancer",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    accent: "border-blue-200 hover:border-blue-400",
  },
  {
    emoji: "📝",
    title: "I need a California-compliant contract",
    sub: "Generate an SB 988 contract for your specific industry in 60 seconds.",
    href: "/contracts/california-tech-contractor-agreement-template",
    badge: "Industry",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    accent: "border-emerald-200 hover:border-emerald-400",
  },
  {
    emoji: "🏢",
    title: "I hire freelancers and need to stay compliant",
    sub: "Understand SB 988 obligations and avoid double-damage liability.",
    href: "/contracts/california-freelance-contract-requirements-2026",
    badge: "Employer",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    accent: "border-orange-200 hover:border-orange-400",
  },
  {
    emoji: "❓",
    title: "I have a legal question about SB 988",
    sub: "Get plain-English answers to common California freelance law questions.",
    href: "/contracts/is-email-valid-contract-freelance-work-california",
    badge: "Legal FAQ",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    accent: "border-purple-200 hover:border-purple-400",
  },
];

// ── Pipe section config ──────────────────────────────────────────────────────
const PIPE_SECTIONS: {
  type: SeoPage["painPipeType"];
  emoji: string;
  title: string;
  desc: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  accentLine: string;
}[] = [
  {
    type: "freelancer",
    emoji: "⚡",
    title: "Freelancer Rights & Collections",
    desc: "Client late? Refusing to pay? Use SB 988 to claim double damages and draft demand letters.",
    badgeBg: "bg-blue-50", badgeText: "text-blue-700", border: "border-blue-100", accentLine: "bg-blue-500",
  },
  {
    type: "employer",
    emoji: "🏢",
    title: "Employer Compliance",
    desc: "Hiring freelancers in California? SB 988 mandates written contracts and 30-day payment windows.",
    badgeBg: "bg-orange-50", badgeText: "text-orange-700", border: "border-orange-100", accentLine: "bg-orange-500",
  },
  {
    type: "industry",
    emoji: "🎯",
    title: "Industry-Specific Templates",
    desc: "Contracts tailored to your profession — tech, design, copywriting, photography, consulting, and more.",
    badgeBg: "bg-emerald-50", badgeText: "text-emerald-700", border: "border-emerald-100", accentLine: "bg-emerald-500",
  },
  {
    type: "faq",
    emoji: "📖",
    title: "California Freelance FAQ",
    desc: "Plain-English answers to the most Googled SB 988 questions — $250 threshold, email contracts, and more.",
    badgeBg: "bg-purple-50", badgeText: "text-purple-700", border: "border-purple-100", accentLine: "bg-purple-500",
  },
];

export default function FreelanceContractHub() {
  const byPipe = PIPE_SECTIONS.reduce(
    (acc, s) => {
      acc[s.type] = allSeoPages.filter((p) => p.painPipeType === s.type);
      return acc;
    },
    {} as Record<SeoPage["painPipeType"], SeoPage[]>
  );

  const totalPages = allSeoPages.length;

  return (
    <div className="bg-bg-main min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-primary-lavender transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-500">CA Legal Guides</span>
          </nav>
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full mb-5">
            California SB 988 Legal Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight mb-5">
            California Freelance<br className="hidden md:block" /> Contract Guides
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
            {totalPages}+ guides covering everything California freelancers and employers
            need under <strong>SB 988</strong> — the Freelance Worker Protection Act.
            Find your situation below.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { v: "$250+", l: "triggers written contract" },
              { v: "30 days", l: "max payment window" },
              { v: "2×",  l: "late payment damages" },
              { v: `${totalPages}+`, l: "legal guides" },
            ].map((s) => (
              <div key={s.l} className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[110px]">
                <div className="text-xl font-black text-primary-lavender">{s.v}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCENARIO PICKER ════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-2">
          Find Your Situation
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-8">
          What brings you here today?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {SCENARIOS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group bg-white border-2 rounded-2xl p-6 flex gap-4 transition-all hover:-translate-y-0.5 hover:shadow-soft ${s.accent}`}
            >
              <span className="text-3xl shrink-0 mt-0.5">{s.emoji}</span>
              <div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2 ${s.badgeBg} ${s.badgeText}`}>
                  {s.badge}
                </span>
                <h3 className="text-base font-black text-text-primary group-hover:text-primary-lavender transition-colors leading-snug mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ TOOLS STRIP ════════════════════════════════════════════════════════ */}
      <section className="bg-text-primary">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
            Core AI Tools
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "📋",
                title: "SB 988 Contract Generator",
                sub: "Generate a California-compliant freelance contract in 60 seconds.",
                href: "/contracts/generator",
                cta: "Generate Contract",
              },
              {
                icon: "💰",
                title: "Late Payment Calculator",
                sub: "Enter your invoice amount and days overdue — see your double damages.",
                href: "/tools/late-payment-calculator",
                cta: "Calculate Damages",
              },
              {
                icon: "🔍",
                title: "Contract Review",
                sub: "Upload or paste your contract. AI flags every missing SB 988 clause.",
                href: "/tools/freelancer-contract-review",
                cta: "Review Contract",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-lavender/40 rounded-xl p-5 transition-all flex flex-col gap-3"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary-lavender transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{tool.sub}</p>
                </div>
                <span className="text-xs font-bold text-primary-lavender mt-auto">
                  {tool.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GUIDE SECTIONS ═════════════════════════════════════════════════════ */}
      {PIPE_SECTIONS.map((section) => {
        const pages = byPipe[section.type];
        if (!pages?.length) return null;

        // Show first 6 prominently, rest collapsed
        const featured = pages.slice(0, 6);
        const rest = pages.slice(6);

        return (
          <section key={section.type} className="max-w-5xl mx-auto px-6 py-14 border-b border-gray-100 last:border-0">
            {/* Section header */}
            <div className={`flex gap-3 items-start mb-8 border-l-4 pl-4 ${section.accentLine}`}>
              <span className="text-2xl mt-0.5">{section.emoji}</span>
              <div>
                <h2 className="text-xl font-black text-text-primary">{section.title}</h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{section.desc}</p>
              </div>
            </div>

            {/* Featured grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {featured.map((page) => (
                <Link
                  key={page.slug}
                  href={`/contracts/${page.slug}`}
                  className={`group bg-white border rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft hover:-translate-y-0.5 transition-all flex flex-col gap-2 ${section.border}`}
                >
                  <span className={`self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${section.badgeBg} ${section.badgeText}`}>
                    {section.type === "faq" ? "FAQ" : section.type}
                  </span>
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-primary-lavender transition-colors leading-snug flex-1">
                    {page.h1}
                  </h3>
                  <span className="text-xs font-bold text-primary-lavender mt-auto">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>

            {/* Remaining as compact list */}
            {rest.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {rest.length} more guides
                </p>
                <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
                  {rest.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={`/contracts/${page.slug}`}
                        className="text-sm text-gray-600 hover:text-primary-lavender transition-colors flex items-start gap-1.5 leading-snug"
                      >
                        <span className="text-gray-300 shrink-0 mt-0.5">›</span>
                        <span className="line-clamp-1">{page.h1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}

      {/* ══ BOTTOM CTA ═════════════════════════════════════════════════════════ */}
      <section className="bg-text-primary">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to protect your work?
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto mb-8">
            Generate your first SB 988-compliant contract or demand letter in under 60 seconds.
            No subscription required to start.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contracts/generator"
              className="inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              Generate My Contract →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              View Credit Packs
            </Link>
          </div>
          <p className="text-gray-600 text-xs mt-5">
            Starter pack from $9.99 · Credits never expire · Used by CA freelancers since 2024
          </p>
        </div>
      </section>
    </div>
  );
}
