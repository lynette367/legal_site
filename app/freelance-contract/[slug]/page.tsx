// app/freelance-contract/[slug]/page.tsx
// Dynamic programmatic SEO page for California freelance contract keywords

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DM_Serif_Display } from "next/font/google";
import { allSeoPages } from "@/data/seoPages";
import { professions } from "@/data/professions";
import SB988PenaltyCalculator from "@/components/tools/SB988PenaltyCalculator";
import CopyCard from "@/components/CopyCard";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allSeoPages.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = allSeoPages.find((p) => p.slug === params.slug);
  if (!page) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pancothink.com";
  const pageUrl = `${siteUrl}/freelance-contract/${params.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      url: pageUrl,
      type: "article",
    },
  };
}

export default function FreelanceContractPage({ params }: Props) {
  const page = allSeoPages.find((p) => p.slug === params.slug);

  if (!page) {
    notFound();
    return null;
  }

  // Find associated profession (if any)
  const currentProfession = professions.find(
    (p) => p.slug === page.industry || p.name.toLowerCase().replace(" ", "-") === page.industry
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-text-primary/60 flex items-center gap-2">
        <Link href="/freelance-contract" className="hover:text-text-lavender transition-colors">
          California Freelance Contract Hub
        </Link>
        <span>/</span>
        <span className="text-text-lavender font-medium truncate max-w-xs">{page.h1}</span>
      </nav>

      {/* Hero Section */}
      <header className="bg-bg-card border border-border-lavender rounded-3xl p-8 shadow-soft">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-lavender/10 px-3 py-1 text-xs font-bold text-text-lavender mb-4 border border-primary-lavender/20">
          {page.painPipeType === "employer" && "🏢 Employer Compliance"}
          {page.painPipeType === "industry" && "🎯 Industry Template"}
          {page.painPipeType === "freelancer" && "⚡ Freelancer Rights"}
          {page.painPipeType === "faq" && "❓ Legal FAQ"}
        </span>
        <h1 className={`${dmSerif.className} text-2xl md:text-4xl font-normal text-text-primary mb-4 leading-tight`}>
          {page.h1}
        </h1>
        <p className="text-sm md:text-base text-text-primary/70 leading-relaxed max-w-3xl">
          {page.heroSubtitle}
        </p>
      </header>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left main content (col-span-2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Overview and Guide Context */}
          <section className="bg-bg-card border border-border-lavender rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
            <h2 className={`${dmSerif.className} text-xl md:text-2xl font-normal text-text-primary`}>
              California SB 988 Requirements Overview
            </h2>
            <p className="text-sm text-text-primary/80 leading-relaxed">
              Under the California Freelance Worker Protection Act (SB 988), all business-to-freelancer agreements valued at <strong>$250 or more</strong> must be in writing. The contract must be executed prior to commencing work, and final payments must be cleared within 30 days of invoice receipt, unless a mutual written timeline is specified.
            </p>
            <div className="p-4 bg-bg-main/60 border border-border-lavender/50 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-text-lavender uppercase tracking-wide">Key Legal Notice:</h3>
              <ul className="list-disc list-inside text-xs text-text-primary/70 space-y-1">
                <li>Failure to provide a written contract is a direct statutory violation.</li>
                <li>Hiring parties who pay late face double damages and attorney fee liabilities.</li>
                <li>SB 988 rights cannot be waived by any contractual clauses.</li>
              </ul>
            </div>
            
            {/* CTA action button */}
            <div className="pt-4">
              {["freelancer", "double-damages"].includes(page.painPipeType) || page.slug.includes("late") || page.slug.includes("dispute") || page.slug.includes("sue") ? (
                <Link
                  href="/tools/sb988-late-payment-calculator"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
                >
                  {page.primaryCta} →
                </Link>
              ) : (
                <Link
                  href={currentProfession ? `/tools/sb988-contract-generator?role=${currentProfession.slug}` : "/tools/sb988-contract-generator"}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary-lavender hover:bg-primary-lavender-dark px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
                >
                  {page.primaryCta} →
                </Link>
              )}
            </div>
          </section>

          {/* Section 2: Industry-specific template */}
          {currentProfession && (
            <section className="bg-bg-card border border-border-lavender rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
              <h2 className={`${dmSerif.className} text-xl md:text-2xl font-normal text-text-primary`}>
                {currentProfession.name} SB 988 Contract Template
              </h2>
              <p className="text-sm text-text-primary/80 leading-relaxed">
                Review and copy this basic statutory template text. It contains the strict boilerplate language required by the State of California, customized specifically for freelance {currentProfession.name.toLowerCase()}s.
              </p>
              
              <CopyCard contractSnippet={currentProfession.contractSnippet} />

              <div className="bg-primary-lavender/5 border border-border-lavender/40 rounded-2xl p-4 text-xs text-text-lavender">
                <strong>Pro Tip:</strong> Click &quot;Copy&quot; above to copy the raw text to your clipboard, or click the primary CTA above to use our intelligent AI tool to fill and customize it with your specific rates and scope!
              </div>
            </section>
          )}

          {/* Section 3: FAQ */}
          <section className="bg-bg-card border border-border-lavender rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
            <h2 className={`${dmSerif.className} text-xl md:text-2xl font-normal text-text-primary`}>
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              {page.faqItems && page.faqItems.length > 0 ? (
                page.faqItems.map((item, idx) => (
                  <div key={idx} className="border-b border-border-lavender pb-4 last:border-0 last:pb-0">
                    <h3 className="text-sm font-bold text-text-primary mb-1">Q: {item.q}</h3>
                    <p className="text-xs text-text-primary/70 leading-relaxed">A: {item.a}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="border-b border-border-lavender pb-4">
                    <h3 className="text-sm font-bold text-text-primary mb-1">Q: Does SB 988 apply if the project is under $250?</h3>
                    <p className="text-xs text-text-primary/70 leading-relaxed">A: No, the written contract requirement under the Freelance Worker Protection Act triggers at $250. However, verbal contracts are still legally binding for smaller projects under general contract law.</p>
                  </div>
                  <div className="border-b border-border-lavender pb-4">
                    <h3 className="text-sm font-bold text-text-primary mb-1">Q: Can clients pay late if we agree to it verbally?</h3>
                    <p className="text-xs text-text-primary/70 leading-relaxed">A: No. Unilateral delays are illegal. Any modified terms must be agreed in a signed written contract. The default payment deadline is 30 days if the contract does not specify a date.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary mb-1">Q: How can I enforce my rights if a client refuses to pay?</h3>
                    <p className="text-xs text-text-primary/70 leading-relaxed">A: Under SB 988, you can send a formal statutory demand letter, file a complaint with the California Labor Commissioner, or sue for double damages in Small Claims Court.</p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Section 4: Internal Links (SEO PageRank distribution) */}
          <section className="bg-bg-main/30 border border-border-lavender/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-xs font-bold text-text-lavender uppercase tracking-widest">
              More California Freelance Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {allSeoPages
                .filter((p) => p.slug !== page.slug && p.painPipeType === page.painPipeType)
                .slice(0, 6)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/freelance-contract/${p.slug}`}
                    className="text-text-primary hover:text-text-lavender underline truncate"
                  >
                    {p.h1}
                  </Link>
                ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar (col-span-1) */}
        <aside className="space-y-6">
          <div className="bg-bg-card border border-border-lavender rounded-3xl p-6 shadow-soft space-y-4 sticky top-6">
            <h3 className={`${dmSerif.className} text-lg font-normal text-text-primary border-b border-border-lavender pb-3`}>
              SB 988 Statutory Calculator
            </h3>
            <p className="text-xs text-text-primary/70 leading-relaxed">
              If a client has delayed your invoice payment, use our interactive compliance calculator to estimate late payment penalties and double damages:
            </p>
            <div className="p-1.5 bg-bg-main/50 border border-border-lavender/30 rounded-2xl">
              <SB988PenaltyCalculator />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
