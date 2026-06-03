// app/freelance-contract/page.tsx
// Hub page: /freelance-contract
// Lists all 100 programmatic SEO pages, grouped by pipe type
// Provides strong internal linking for Google crawl budget

import type { Metadata } from "next";
import Link from "next/link";
import { allSeoPages, type SeoPage } from "@/data/seoPages";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "California Freelance Contract Hub | SB 988 Legal Tools | PancoLegal",
  description:
    "Complete guide to California freelance contracts under SB 988. Browse 100+ guides for employers and freelancers: contract templates, late payment rights, demand letters, and more.",
  alternates: { canonical: "/freelance-contract" },
};

const PIPE_ORDER: SeoPage["painPipeType"][] = [
  "employer",
  "industry",
  "freelancer",
  "faq",
];

const PIPE_META: Record<
  SeoPage["painPipeType"],
  { title: string; desc: string; bgLight: string; textDark: string; borderCol: string; emoji: string }
> = {
  employer: {
    title: "Employer Compliance",
    desc: "For California businesses hiring freelancers — avoid double-damage liability and SB 988 violations.",
    bgLight: "bg-orange-50",
    textDark: "text-orange-600",
    borderCol: "border-orange-500",
    emoji: "🏢",
  },
  industry: {
    title: "Industry-Specific Templates",
    desc: "Contract templates built for your profession — tech contractors, designers, copywriters, photographers, and more.",
    bgLight: "bg-emerald-50",
    textDark: "text-emerald-600",
    borderCol: "border-emerald-500",
    emoji: "🎯",
  },
  freelancer: {
    title: "Freelancer Rights & Collections",
    desc: "Tools for freelancers pursuing late invoices, generating demand letters, and calculating double damages.",
    bgLight: "bg-blue-50",
    textDark: "text-blue-600",
    borderCol: "border-blue-500",
    emoji: "⚡",
  },
  faq: {
    title: "California Freelance FAQ",
    desc: "Answers to the most common SB 988 questions — written contract rules, payment deadlines, email contracts, and more.",
    bgLight: "bg-purple-50",
    textDark: "text-purple-600",
    borderCol: "border-purple-500",
    emoji: "❓",
  },
};

export default function FreelanceContractHub() {
  const byPipe = PIPE_ORDER.reduce(
    (acc, pipe) => {
      acc[pipe] = allSeoPages.filter((p) => p.painPipeType === pipe);
      return acc;
    },
    {} as Record<SeoPage["painPipeType"], SeoPage[]>
  );

  return (
    <div className="space-y-12 pb-16">
      {/* ── Hero ── */}
      <section className="bg-bg-card border border-border-lavender rounded-3xl p-8 md:p-12 shadow-soft">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-lavender/10 px-3.5 py-1 text-xs font-semibold text-text-lavender mb-4 border border-primary-lavender/20">
            California SB 988 Legal Hub
          </span>
          <h1 className={`${dmSerif.className} text-3xl md:text-5xl font-normal text-text-primary mb-4 leading-tight`}>
            California Freelance Contract Guides
          </h1>
          <p className="text-sm md:text-base text-text-primary/70 leading-relaxed mb-6 max-w-2xl">
            Everything California employers and freelancers need to stay
            compliant under SB 988 — the Freelance Worker Protection Act.
            Browse {allSeoPages.length} guides below.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold bg-bg-main border border-border-lavender/50 text-text-lavender px-3 py-1.5 rounded-full shadow-xs">✅ Written contracts explained</span>
            <span className="text-xs font-semibold bg-bg-main border border-border-lavender/50 text-text-lavender px-3 py-1.5 rounded-full shadow-xs">✅ Double damages calculator</span>
            <span className="text-xs font-semibold bg-bg-main border border-border-lavender/50 text-text-lavender px-3 py-1.5 rounded-full shadow-xs">✅ Demand letter generator</span>
            <span className="text-xs font-semibold bg-bg-main border border-border-lavender/50 text-text-lavender px-3 py-1.5 rounded-full shadow-xs">✅ Industry templates</span>
          </div>
        </div>
      </section>

      {/* ── Pipes ── */}
      <div className="space-y-8">
        {PIPE_ORDER.map((pipe) => {
          const meta = PIPE_META[pipe];
          const pages = byPipe[pipe];
          if (!pages.length) return null;

          return (
            <section key={pipe} className="bg-bg-card border border-border-lavender rounded-3xl p-6 md:p-8 shadow-soft">
              <div className={`flex items-start gap-4 border-l-4 ${meta.borderCol} pl-4 mb-6`}>
                <span className="text-3xl leading-none mt-1">{meta.emoji}</span>
                <div>
                  <h2 className={`${dmSerif.className} text-xl md:text-2xl font-normal text-text-primary`}>
                    {meta.title}
                  </h2>
                  <p className="text-xs md:text-sm text-text-primary/60 mt-1">{meta.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/freelance-contract/${p.slug}`}
                    className="group flex flex-col justify-between p-5 bg-bg-main/40 border border-border-lavender/50 rounded-2xl hover:bg-white hover:border-primary-lavender hover:shadow-soft transition-all duration-200"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-text-lavender transition-colors duration-200">
                        {p.h1}
                      </h3>
                      <p className="text-xs text-text-primary/60 mt-1.5 leading-relaxed">
                        {p.heroSubtitle.length > 90
                          ? p.heroSubtitle.slice(0, 90) + "…"
                          : p.heroSubtitle}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-text-lavender mt-4 group-hover:gap-1.5 transition-all">
                      Read Guide <span>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <section className="bg-gradient-to-br from-text-lavender to-primary-lavender text-white rounded-3xl p-8 md:p-12 text-center shadow-soft">
        <h2 className={`${dmSerif.className} text-2xl md:text-4xl font-normal text-white mb-4`}>
          Ready to generate your California-compliant contract?
        </h2>
        <p className="text-xs md:text-sm text-white/80 max-w-lg mx-auto mb-6 leading-relaxed">
          Use PancoLegal&apos;s AI tools to create SB 988-compliant
          contracts, demand letters, and dispute plans in under 60 seconds.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tools" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-text-lavender shadow-md transition-all hover:bg-bg-main hover:-translate-y-0.5">
            Open Legal Tools →
          </Link>
          <Link href="/pricing" className="rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5">
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
