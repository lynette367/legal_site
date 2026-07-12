import type { Metadata } from 'next';
import Link from 'next/link';
import FreelancerContractReviewClient from './ClientComponent';

export const metadata: Metadata = {
  title: "Freelancer Contract Review | California Independent Contractor Tool",
  description: "Instantly detect risky clauses in freelancer and independent contractor agreements. Protect your rights as a freelancer or client in California.",
  keywords: "freelancer contract review, independent contractor agreement, California AB5, contract risk detection, freelance legal protection",
  alternates: {
    canonical: 'https://www.pancothink.com/tools/freelancer-contract-review',
  },
  openGraph: {
    title: "Freelancer Contract Review | California Independent Contractor Tool",
    description: "Instantly detect risky clauses in freelancer and independent contractor agreements.",
    url: 'https://www.pancothink.com/tools/freelancer-contract-review',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Freelancer Contract Review",
    description: "Instantly detect risky clauses in freelancer and independent contractor agreements.",
    images: ['/og-image.png'],
  },
};

export default function FreelancerContractReviewPage() {
  return (
    <>
      <FreelancerContractReviewClient />

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
            href="/tools/irs-20-point-checklist-for-independent-contractors"
            className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            🧭 Run Free IRS Classification Check →
          </Link>
        </div>
      </section>
    </>
  );
}