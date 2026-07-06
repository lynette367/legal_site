// app/freelance-contract/[slug]/page.tsx
// "Scenario Engine" layout — pain empathy → interactive tool → conversion

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { seoPageBySlug, allSeoSlugs, type SeoPage } from "@/data/seoPages";
import { professions } from "@/data/professions";
import { plans } from "@/data/plans";
import ScenarioTool from "@/components/ScenarioTool";

// ── Static generation ──────────────────────────────────────────────────────
export async function generateStaticParams() {
  return allSeoSlugs.map((slug) => ({ slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = seoPageBySlug.get(params.slug);
  if (!page) return { title: "Not Found" };
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: {
      canonical: `https://www.pancothink.com/freelance-contract/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      url: `https://www.pancothink.com/freelance-contract/${page.slug}`,
      type: "website",
    },
  };
}

// ── Pipe display config ────────────────────────────────────────────────────
const PIPE_META: Record<
  SeoPage["painPipeType"],
  { label: string; badgeBg: string; badgeText: string; border: string }
> = {
  employer:   { label: "Employer Compliance", badgeBg: "bg-orange-50",  badgeText: "text-orange-700",  border: "border-orange-200" },
  freelancer: { label: "Freelancer Rights",   badgeBg: "bg-blue-50",    badgeText: "text-blue-700",    border: "border-blue-200"   },
  industry:   { label: "Industry Template",   badgeBg: "bg-emerald-50", badgeText: "text-emerald-700", border: "border-emerald-200" },
  faq:        { label: "Legal FAQ",           badgeBg: "bg-purple-50",  badgeText: "text-purple-700",  border: "border-purple-200"  },
};

// ── Scenario copy per pipe type ────────────────────────────────────────────
const SCENARIO_COPY: Record<
  SeoPage["painPipeType"],
  { headline: string; sub: string; placeholder: string; ctaLabel: string }
> = {
  employer: {
    headline: "Scan Your Freelance Contract for SB 988 Violations",
    sub: "Paste your current agreement or describe the engagement. Our AI flags every missing clause that exposes you to double-damage liability.",
    placeholder: "Paste your freelance contract or describe your situation…\n\nExample: \"We verbally agreed on a $1,500 logo design project. No written contract was signed. Payment was due 45 days after delivery.\"",
    ctaLabel: "Scan for Compliance Gaps →",
  },
  freelancer: {
    headline: "Describe What Happened — We'll Tell You What You're Owed",
    sub: "Paste your invoice, contract, or just explain the situation in plain English. Our AI calculates your SB 988 damages and drafts your demand letter.",
    placeholder: "Describe your unpaid invoice situation…\n\nExample: \"I delivered a 10-page website for $3,200 on March 1st. Client has not paid after 45 days. They said they'd pay 'soon' over text.\"",
    ctaLabel: "Calculate My Damages & Draft Letter →",
  },
  industry: {
    headline: "Get Your SB 988-Compliant Contract in 60 Seconds",
    sub: "Tell us about your project — scope, rate, timeline. Our AI generates a California-compliant contract with all mandatory clauses pre-filled.",
    placeholder: "Describe your project details…\n\nExample: \"I'm a graphic designer in LA. Client wants a brand identity package — logo, business cards, and brand guide. Budget: $2,800. Timeline: 6 weeks.\"",
    ctaLabel: "Generate My Contract →",
  },
  faq: {
    headline: "Ask Your SB 988 Legal Question",
    sub: "Type your situation or question in plain English. Our AI gives you a clear legal analysis based on California SB 988 case law.",
    placeholder: "Ask your legal question…\n\nExample: \"My client sent a revised payment schedule after I completed the work, cutting my fee by 20%. Is this legal under California law?\"",
    ctaLabel: "Get Legal Analysis →",
  },
};

// ── Rights breakdown per pipe ──────────────────────────────────────────────
const RIGHTS_PILLS: Record<SeoPage["painPipeType"], { icon: string; text: string }[]> = {
  employer: [
    { icon: "📋", text: "Written contract required for $250+" },
    { icon: "⏱️", text: "30-day payment deadline mandatory" },
    { icon: "🚫", text: "Cannot waive contractor's SB 988 rights" },
    { icon: "⚠️", text: "Violation = double damages + attorney fees" },
  ],
  freelancer: [
    { icon: "💰", text: "2× your invoice if paid late" },
    { icon: "🛑", text: "Right to stop work without retaliation" },
    { icon: "📬", text: "Demand letter starts the legal clock" },
    { icon: "🏛️", text: "Small Claims up to $12,500" },
  ],
  industry: [
    { icon: "🔒", text: "Withhold IP until final invoice clears" },
    { icon: "📝", text: "Email can count as written contract" },
    { icon: "💸", text: "Late pay = double statutory damages" },
    { icon: "📅", text: "30-day payment window from invoice date" },
  ],
  faq: [
    { icon: "✅", text: "$250 threshold triggers written contract" },
    { icon: "📧", text: "Email qualifies if it has all SB 988 clauses" },
    { icon: "🔄", text: "Client can't unilaterally change payment terms" },
    { icon: "⚖️", text: "Oral contracts still enforceable under $250" },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────
export default function SeoLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = seoPageBySlug.get(params.slug);
  if (!page) notFound();

  const profession = professions.find((p) => p.slug === page.industry);
  const pipe = PIPE_META[page.painPipeType];
  const scenario = SCENARIO_COPY[page.painPipeType];
  const rights = RIGHTS_PILLS[page.painPipeType];

  const related = [...seoPageBySlug.values()]
    .filter((p) => p.painPipeType === page.painPipeType && p.slug !== page.slug)
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      {page.faqItems && page.faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faqItems.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            }),
          }}
        />
      )}

      <div className="bg-bg-main min-h-screen">

        {/* ══ 1. HERO — Pain Empathy ══════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
              <Link href="/" className="hover:text-primary-lavender transition-colors">Home</Link>
              <span>›</span>
              <Link href="/freelance-contract" className="hover:text-primary-lavender transition-colors">
                CA Legal Guides
              </Link>
              <span>›</span>
              <span className="text-gray-500 truncate max-w-xs">{page.h1.split("—")[0].trim()}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: headline block */}
              <div>
                {/* Pipe badge */}
                <span
                  className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg mb-5 border ${pipe.badgeBg} ${pipe.badgeText} ${pipe.border}`}
                >
                  ⚖️ {pipe.label}
                </span>

                <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-tight tracking-tight mb-5">
                  {page.h1}
                </h1>

                {/* Pain point notice from professions.ts if available */}
                {profession?.painPointNotice ? (
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {profession.painPointNotice}
                  </p>
                ) : (
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {page.heroSubtitle}
                  </p>
                )}

                {/* SB 988 rights pills */}
                <div className="flex flex-col gap-2">
                  {rights.map((r) => (
                    <div key={r.text} className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{r.icon}</span>
                      <span className="text-sm text-gray-700 font-medium">{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: stat card */}
              <div className="bg-gray-900 rounded-2xl p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
                  California SB 988 · Effective Jan 1, 2025
                </p>
                {[
                  { value: "$250+",   label: "Minimum contract value that triggers SB 988" },
                  { value: "30 days", label: "Maximum payment window from invoice date" },
                  { value: "2×",      label: "Statutory damages on late payments" },
                  { value: "4 yrs",   label: "Statute of limitations for written contracts" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between py-3 ${i < 3 ? "border-b border-gray-800" : ""}`}
                  >
                    <span className="text-sm text-gray-400 leading-snug max-w-[200px]">{s.label}</span>
                    <span className="text-2xl font-black text-primary-lavender ml-4 shrink-0">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. SCENARIO TOOL — Interactive AI Engine ════════════════════════
            This is the conversion core. Client component handles the textarea
            interaction and routes to the right tool with pre-filled context.
        ════════════════════════════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 py-14">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-2">
              AI-Powered Legal Tool
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary">
              {scenario.headline}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mt-2 max-w-xl mx-auto">
              {scenario.sub}
            </p>
          </div>

          {/* Client component handles textarea + routing */}
          <ScenarioTool
            pipeType={page.painPipeType}
            placeholder={scenario.placeholder}
            ctaLabel={scenario.ctaLabel}

          />

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-400">
            {[
              "✅ No account needed to preview",
              "🔒 Your text is never stored",
              "⚡ Results in under 10 seconds",
              "📋 Covers all 4 SB 988 mandatory clauses",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </section>

        {/* ══ 3. SB 988 PLAIN-ENGLISH EXPLAINER ══════════════════════════════ */}
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-2">
              Know the Law
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-10">
              California SB 988 — Plain English
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📋",
                  title: "Written contract is mandatory",
                  body: "Any California freelance engagement worth $250 or more — individually or cumulative within 120 days — must have a written contract. An email chain counts only if it specifies parties, services, rate, and payment date.",
                },
                {
                  icon: "📅",
                  title: "30 days to pay, no excuses",
                  body: "Once you submit an invoice, the client has 30 calendar days to pay — unless your written contract specifies a different date. There is no grace period. Day 31 onwards, double damages begin accruing.",
                },
                {
                  icon: "💰",
                  title: "Late? You owe double.",
                  body: "If payment is late, the contractor is entitled to damages equal to the full unpaid amount — effectively doubling what the client owes. Plus reasonable attorney fees and court costs. This right cannot be waived by contract.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6"
                >
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <h3 className="text-base font-bold text-text-primary mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Demand letter flow */}
            <div className="mt-10 bg-orange-50 border border-orange-200 rounded-2xl p-7">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-orange-900 mb-2">
                    🔥 If they&apos;re 30+ days late, this is your move
                  </h3>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Step 1 → Generate a formal SB 988 demand letter (states exact double-damage amount + 10-day response window).<br />
                    Step 2 → If no response, file in California Small Claims Court (up to $12,500, no lawyer needed).<br />
                    Step 3 → Present the demand letter as evidence — judge awards double damages automatically under SB 988.
                  </p>
                </div>
                <Link
                  href="/tools/sb988-late-payment-calculator"
                  className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all whitespace-nowrap"
                >
                  Calculate My Double Damages →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 4. CONTRACT SNIPPET PREVIEW ════════════════════════════════════ */}
        {profession && (
          <section className="max-w-5xl mx-auto px-6 py-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-2">
                  Sample Language
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-text-primary">
                  {profession.ctaTitle} Template Preview
                </h2>
                <p className="text-sm text-gray-500 mt-1 max-w-lg leading-relaxed">
                  {profession.painPoint}
                </p>
              </div>
              <Link
                href="/tools/sb988-contract-generator"
                className="shrink-0 inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                Generate Full Version →
              </Link>
            </div>

            {/* Code card */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-soft bg-white">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs font-mono text-gray-400">
                  {profession.ctaTitle.toLowerCase().replace(/\s+/g, "-")}-sb988.txt
                  <span className="ml-3 text-emerald-500 font-bold">● SB 988 Compliant</span>
                </span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-gray-600 p-5 overflow-x-auto max-h-64 whitespace-pre-wrap break-words bg-white">
                {profession.contractSnippet}
              </pre>
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">
                    ↑ Preview only — full contract includes 12+ clauses
                  </span>
                </div>
                <Link
                  href="/tools/sb988-contract-generator"
                  className="inline-flex items-center gap-1.5 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all"
                >
                  Generate Complete Contract — 3 credits →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ══ 5. PRICING — Remove friction, show value ════════════════════════ */}
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-2">
                Simple Credit Pricing
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-text-primary">
                One credit balance, every SB 988 tool
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                No subscription. Buy credits, use them on any tool. Most users start with the Starter pack.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border p-6 flex flex-col gap-4 relative ${
                    plan.recommended
                      ? "border-primary-lavender shadow-lg ring-1 ring-primary-lavender/20"
                      : "border-gray-200"
                  }`}
                >
                  {plan.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-lavender text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {plan.name}
                    </p>
                    <p className="text-3xl font-black text-text-primary">{plan.price}</p>
                    <p className="text-sm text-primary-lavender font-bold mt-0.5">
                      {plan.credits} credits
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    {plan.description}
                  </p>
                  <Link
                    href="/pricing"
                    className={`text-center text-sm font-bold py-3 px-4 rounded-xl transition-all ${
                      plan.recommended
                        ? "bg-primary-lavender hover:bg-primary-lavender-dark text-white"
                        : "border border-gray-300 hover:border-primary-lavender text-gray-700 hover:text-primary-lavender"
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6. FAQ ══════════════════════════════════════════════════════════ */}
        {page.faqItems && page.faqItems.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-2">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-8">
              Frequently asked questions
            </h2>
            <dl className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {page.faqItems.map((faq, i) => (
                <div key={i} className="px-6 py-5">
                  <dt className="text-sm font-bold text-text-primary mb-1.5">{faq.q}</dt>
                  <dd className="text-sm text-gray-600 leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ══ 7. RELATED GUIDES — Internal links ══════════════════════════════ */}
        {related.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-14">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-1">
                    Related Guides
                  </p>
                  <h2 className="text-xl font-black text-text-primary">
                    Also useful for California freelancers
                  </h2>
                </div>
                <Link
                  href="/freelance-contract"
                  className="text-sm font-bold text-primary-lavender hover:underline shrink-0"
                >
                  All guides →
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => {
                  const rPipe = PIPE_META[r.painPipeType];
                  return (
                    <Link
                      key={r.slug}
                      href={`/freelance-contract/${r.slug}`}
                      className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft hover:-translate-y-0.5 transition-all flex flex-col gap-3"
                    >
                      <span
                        className={`self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${rPipe.badgeBg} ${rPipe.badgeText} ${rPipe.border}`}
                      >
                        {rPipe.label}
                      </span>
                      <h3 className="text-sm font-bold text-text-primary group-hover:text-primary-lavender transition-colors leading-snug">
                        {r.h1}
                      </h3>
                      <span className="text-xs font-bold text-primary-lavender mt-auto">
                        Read guide →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ══ 8. BOTTOM CTA ════════════════════════════════════════════════════ */}
        <section className="bg-text-primary">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
              Stop leaving money on the table.
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto mb-8 text-base">
              California SB 988 gives you powerful legal tools. Use them.
              Generate a compliant contract or demand letter in under 60 seconds.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/tools/sb988-contract-generator"
                className="inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                {page.primaryCta} →
              </Link>
              <Link
                href="/tools/sb988-late-payment-calculator"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                Calculate Late Payment Damages
              </Link>
            </div>
            <p className="text-gray-600 text-xs mt-5">
              No subscription · Starter pack from $9.99 · First analysis is free
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
