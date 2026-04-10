import { Suspense } from 'react';
import type { Metadata } from 'next';
import CCPACheckerClient from './CCPACheckerClient';

export const metadata: Metadata = {
  title: "Free CCPA Compliance Checker & Data Breach Letter Generator | Panco",
  description: "Instant CCPA compliance check for California startups. Generate data breach notification letters in minutes. No hourly legal fees.",
  keywords: "CCPA compliance checker, data breach notification, California privacy law, CCPA 2026 update, startup compliance",
  alternates: {
    canonical: 'https://pancothink.com/tools/ccpa-checker',
  },
  openGraph: {
    title: "CCPA Compliance Checker & Data Breach Letter Generator | Panco",
    description: "Instant CCPA check for California startups. No legal fees.",
    url: 'https://pancothink.com/tools/ccpa-checker',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CCPA Compliance Helper for Startups",
    images: ['/og-image.png'],
  },
};

// SEO Schema Markup
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "CCPA Compliance Checker",
      "operatingSystem": "All",
      "applicationCategory": "LegalSoftware",
      "offers": {
        "@type": "Offer",
        "price": "15.00",
        "priceCurrency": "USD"
      },
      "description": "Instant CCPA compliance check for California startups. Generate data breach notification letters in minutes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does CCPA 2026 apply to startups with less than $25M revenue?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, if the startup processes the personal data of 50,000+ California residents or derives 50% of revenue from selling data."
          }
        },
        {
          "@type": "Question",
          "name": "How long do you have to notify users under CCPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CCPA requires notification 'without unreasonable delay' following the discovery of a breach that involves unencrypted personal information."
          }
        }
      ]
    }
  ]
};

export default function CCPACheckerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Interactive Client Component */}
      <Suspense fallback={<div className="text-center py-20">Loading Compliance Tools...</div>}>
        <CCPACheckerClient />
      </Suspense>

      {/* Trust Indicators Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-gray-100">
        <div className="space-y-2">
          <p className="text-2xl font-bold">1798.82</p>
          <p className="text-xs font-bold text-text-lavender uppercase">Regulatory Standard</p>
          <p className="text-sm text-text-primary/60 italic">&quot;Notification without unreasonable delay&quot;</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-center gap-1">
             {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-lg">★</span>)}
          </div>
          <p className="text-xs font-bold text-text-lavender uppercase">Startup Trust</p>
          <p className="text-sm text-text-primary/60">&quot;Compliance in 3 minutes vs 3 weeks&quot;</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-center items-center h-8 text-xl">🛡️</div>
          <p className="text-xs font-bold text-text-lavender uppercase">Privacy Guarantee</p>
          <p className="text-sm text-text-primary/60">Bank-grade encryption. Data processed locally.</p>
        </div>
      </section>

      {/* Comparison Calculator (Hook) */}
      <section className="bg-primary-lavender text-white rounded-[3rem] p-8 md:p-16 text-center space-y-8">
        <h2 className="text-3xl font-extrabold">Professional Law Firm Cost vs Panco AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <p className="text-sm font-bold uppercase opacity-60">Traditional Attorney</p>
            <p className="text-5xl font-black mt-2">$500/hr</p>
            <ul className="mt-6 text-left space-y-3 text-sm opacity-80">
              <li>• Initial intake meeting</li>
              <li>• Letter drafting (2-3 hrs)</li>
              <li>• Legal review fee</li>
              <li>• 1 week turnaround</li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-8 text-primary-lavender transition-transform duration-300 shadow-2xl">
            <p className="text-sm font-bold uppercase opacity-60">Panco AI</p>
            <p className="text-5xl font-black mt-2">$15</p>
            <ul className="mt-6 text-left space-y-3 text-sm font-semibold text-white">
              <li>• Instant AI processing</li>
              <li>• 2026 Regulation Check</li>
              <li>• Official PDF Download</li>
              <li>• 3-min turnaround</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance Matrix Table */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">2026 Compliance Matrix for Startups</h2>
          <p className="text-text-primary/60 mt-2">Stay ahead of the latest California privacy requirements.</p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border-lavender shadow-soft bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-main border-b border-border-lavender">
                <th className="px-8 py-6 font-bold text-text-primary">Requirement</th>
                <th className="px-8 py-6 font-bold text-text-primary">2026 Update</th>
                <th className="px-8 py-6 font-bold text-text-primary">Startup Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-8 py-6 font-semibold">Data Breach Notification</td>
                <td className="px-8 py-6 text-sm text-gray-600">&quot;Without unreasonable delay&quot;</td>
                <td className="px-8 py-6 text-sm">Generate letter via Panco</td>
              </tr>
              <tr>
                <td className="px-8 py-6 font-semibold">Right to Correct</td>
                <td className="px-8 py-6 text-sm text-gray-600">Expanded to sensitive data</td>
                <td className="px-8 py-6 text-sm">Update Privacy Policy</td>
              </tr>
              <tr>
                <td className="px-8 py-6 font-semibold">Risk Assessments</td>
                <td className="px-8 py-6 text-sm text-gray-600">Required for high-risk processing</td>
                <td className="px-8 py-6 text-sm">Perform annual AI audit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-primary-lavender">Q:</span>
              Does CCPA 2026 apply to startups with less than $25M revenue?
            </h3>
            <p className="text-text-primary/70 pl-8 leading-relaxed">
              Yes, if the startup processes the personal data of 50,000+ California residents or derives 50% of revenue from selling data. Revenue is only one of three potential triggers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-primary-lavender">Q:</span>
              How long do you have to notify users under CCPA?
            </h3>
            <p className="text-text-primary/70 pl-8 leading-relaxed">
              California law requires notification &quot;without unreasonable delay&quot; and &quot;immediately following discovery&quot; of the breach. In practice, this often means within days, not months.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-primary-lavender">Q:</span>
              What should be included in a CCPA notification letter?
            </h3>
            <p className="text-text-primary/70 pl-8 leading-relaxed">
              Under Section 1798.82, it must include what happened, what information was involved, what your company is doing, and how consumers can protect themselves. Our AI tool ensures all these elements are present.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center pb-8 opacity-40 text-xs font-mono uppercase tracking-widest">
        Legal Reference: California CCPA Section 1798.82 & 1798.150
      </div>
      
      <div className="text-center py-8 border-t border-gray-100">
        <p className="text-lg font-medium text-text-primary mb-4">
          Need to update your privacy policy after your audit?
        </p>
        <a 
          href="/tools/ccpa-generator" 
          className="inline-block px-6 py-3 bg-primary-lavender text-white font-bold rounded-xl hover:bg-primary-lavender-dark transition-all"
        >
          Use our CCPA Privacy Policy Generator
        </a>
        <p className="text-sm text-text-primary/60 mt-2">
          Create a fully compliant policy in minutes
        </p>
      </div>
    </div>
  );
}
