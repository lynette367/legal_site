import type { Metadata } from 'next';
import Link from 'next/link';
import FreelancerContractReviewClient from './ClientComponent';

export const metadata: Metadata = {
  title: "Freelance Contract Checklist & Risk Guide",
  description: "Check freelancer and independent contractor agreements for hidden risks, unfair indemnity, and missing payment terms. Get a compliance checklist free.",
  keywords: "freelancer contract checklist, independent contractor agreement, California AB5, contract risk detection, freelance legal protection",
  alternates: {
    canonical: 'https://indielegalterms.com/tools/freelancer-contract-review',
  },
  openGraph: {
    title: "Freelance Contract Checklist & Risk Guide",
    description: "Check freelancer and independent contractor agreements for hidden risks, unfair indemnity, and missing payment terms. Get a compliance checklist free.",
    url: 'https://indielegalterms.com/tools/freelancer-contract-review',
    siteName: 'Indie Legal',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Freelance Contract Checklist & Risk Guide",
    description: "Check freelancer and independent contractor agreements for hidden risks, unfair indemnity, and missing payment terms. Get a compliance checklist free.",
    images: ['/og-image.png'],
  },
};

export default function FreelancerContractReviewPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Freelance Contract Checklist & Risk Guide',
    url: 'https://indielegalterms.com/tools/freelancer-contract-review',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Self-check independent contractor agreements for common liability risks, unfair indemnity, and missing payment terms.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <FreelancerContractReviewClient />

      {/* ── Related template cross-link ── */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-1">Need a battle-tested agreement template that avoids common contractual pitfalls?</p>
          <p className="text-slate-600 leading-relaxed">
            Protect both parties from day one using our vetted{' '}
            <Link href="/contracts/california-independent-contractor-agreement-template" className="text-indigo-600 font-semibold underline hover:no-underline">
              California independent contractor agreement template
            </Link>, designed to satisfy mandatory statutory disclosures and fair payment terms.
          </p>
        </div>
      </section>

      {/* ── Related tool cross-link ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-indigo-50 border border-indigo-200 rounded-2xl px-7 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">Reviewing this as the hiring business?</p>
            <p className="text-sm text-indigo-900 font-semibold leading-snug">
              A clean contract doesn&apos;t fix a misclassified worker. Check your 1099 vs. W-2 risk in 3 minutes.
            </p>
          </div>
          <Link
            href="/tools/irs-20-point-checklist"
            className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            🧭 Run Free IRS Classification Check →
          </Link>
        </div>
      </section>
    </>
  );
}