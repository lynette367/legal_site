import type { Metadata } from "next";
import { Suspense } from "react";
import { PricingContent } from "../../components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing & Plans | California SB 988 Contract Tools | IndieLegal",
  description: "Simple pay-per-contract pricing for California SB 988 compliant agreements, statutory late payment calculators, and formal demand letters.",
  alternates: {
    canonical: "https://indielegalterms.com/pricing",
  },
};

const PRICING_FAQS = [
  {
    q: "What does each generated contract include?",
    a: "Every agreement contains mandatory California SB 988 provisions: itemized service scope, compensation rates, 30-day payment deadlines, anti-retaliation protections, and statutory double-damage clauses.",
  },
  {
    q: "Is there a monthly subscription or recurring fee?",
    a: "No. We operate on a straightforward pay-per-contract model ($4.99 per contract) without monthly recurring fees or hidden subscription commitments.",
  },
  {
    q: "When is a written contract legally required in California?",
    a: "Under the California Freelance Worker Protection Act (SB 988), any freelance agreement valued at $250 or more — individually or aggregated over 120 days — strictly requires a written contract signed before work begins.",
  },
  {
    q: "How does the contract protect me if a client pays late?",
    a: "Contracts pre-configured with SB 988 clauses entitle you to statutory double damages plus attorney fees if a client fails to pay within 30 days of invoice receipt.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-12 max-w-4xl mx-auto px-4 py-8">
        {/* Server-rendered Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full mb-3">
            California SB 988 Legal Tools
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
            Transparent Pricing for California Freelancers
          </h1>
          <p className="mt-3 text-base text-text-primary/70 leading-relaxed">
            Pay only for what you generate. Every document is tailored to California SB 988 statutory requirements.
          </p>
        </div>

        {/* Client Payment Component */}
        <Suspense fallback={<div className="h-64 animate-pulse bg-primary-lavender/5 rounded-3xl" />}>
          <PricingContent />
        </Suspense>

        {/* Server-rendered FAQ Section (4 items max, clean and concise) */}
        <section className="border-t border-border-lavender/60 pt-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary tracking-tight text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {PRICING_FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-border-lavender/40 pb-5">
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-text-primary/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
