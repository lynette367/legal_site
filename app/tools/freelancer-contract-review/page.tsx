import type { Metadata } from 'next';
import Link from 'next/link';
import FreelancerContractReviewClient from './ClientComponent';

export const metadata: Metadata = {
  title: "Free AI Contract Review for Freelancers",
  description: "Paste a freelance or contractor agreement and get an AI risk report: unfair indemnity, IP traps, non-competes, missing payment terms. 1 free review.",
  keywords: "freelancer contract review, ai contract review, independent contractor agreement, contract risk detection, freelance legal protection",
  alternates: {
    canonical: 'https://indielegalterms.com/tools/freelancer-contract-review',
  },
  openGraph: {
    title: "Free AI Contract Review for Freelancers | Indie Legal",
    description: "Paste a freelance or contractor agreement and get an AI risk report: unfair indemnity, IP traps, non-competes, missing payment terms. 1 free review.",
    url: 'https://indielegalterms.com/tools/freelancer-contract-review',
    siteName: 'Indie Legal',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free AI Contract Review for Freelancers | Indie Legal",
    description: "Paste a freelance or contractor agreement and get an AI risk report: unfair indemnity, IP traps, non-competes, missing payment terms. 1 free review.",
    images: ['/og-image.png'],
  },
};

export default function FreelancerContractReviewPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free AI Contract Review for Freelancers',
    url: 'https://indielegalterms.com/tools/freelancer-contract-review',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Paste a freelance or contractor agreement and get an AI risk report: unfair indemnity, IP traps, non-competes, missing payment terms. 1 free review.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the AI contract review really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Your first contract review is free with no sign-up required. If you need additional reviews afterward, you can sign in or purchase credits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will my contract text be saved or stored?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. We do not save your contract text. Your agreement is sent to our AI provider solely to generate your report and is not stored by IndieLegal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can the tool read PDF or Word (.docx) files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Direct PDF and Word uploads are not supported yet. You can upload .txt or .md files, or open your PDF/Word contract, select all text, copy, and paste it into the review box (300 to 30,000 characters).',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is the review—especially on payment terms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The AI is designed to catch common structural risks—such as delayed payment triggers, premature IP assignment, uncapped indemnity, and overbroad non-competes—and draft practical replacement wording. Still, AI can miss nuance or misread context, so always double-check critical terms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this review legal advice?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. This tool provides general informational risk screening only. It does not create an attorney-client relationship and is not a substitute for advice from a licensed attorney.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([webAppSchema, faqSchema]) }}
      />
      <FreelancerContractReviewClient />

      {/* ── Related template cross-link ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
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
    </>
  );
}