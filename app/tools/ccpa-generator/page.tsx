import { Suspense } from 'react';
import type { Metadata } from 'next';
import CCPAGeneratorClient from './ClientComponent';

export const metadata: Metadata = {
  title: "CCPA Privacy Policy Generator | Free CCPA/CPRA Compliance Tool 2026",
  description: "Generate a fully compliant CCPA/CPRA privacy policy for your California small business in 2 minutes. Free 3 previews, paid unlimited AI-generated policies tailored to your business.",
  alternates: {
    canonical: 'https://pancothink.com/tools/ccpa-generator',
  },
  openGraph: {
    title: "CCPA Privacy Policy Generator | Free CCPA/CPRA Compliance Tool 2026",
    description: "Generate a fully compliant CCPA/CPRA privacy policy for your California small business in 2 minutes.",
    url: 'https://pancothink.com/tools/ccpa-generator',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CCPA Privacy Policy Generator 2026",
    images: ['/og-image.png'],
  },
};

// SEO Schema Markup
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "CCPA Privacy Policy Generator",
      "operatingSystem": "All",
      "applicationCategory": "LegalSoftware",
      "offers": {
        "@type": "Offer",
        "price": "15.00",
        "priceCurrency": "USD"
      },
      "description": "Generate a fully compliant CCPA/CPRA privacy policy for your California small business in 2 minutes. Free 3 previews, paid unlimited AI-generated policies tailored to your business."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is this generator different from a free CCPA template?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our free version provides a professional preview, while the paid AI-generated policy is fully customized to your business's specific data collection practices, third-party services, and industry, ensuring full compliance with 2026 CCPA updates."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a lawyer to review my generated privacy policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This tool generates a compliant template, but we strongly recommend having a licensed California attorney review it to ensure it meets your unique business needs."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I update my CCPA privacy policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You must update your policy whenever your data collection practices change, and at least annually to reflect new CCPA/CPRA requirements (including 2026 updates)."
          }
        },
        {
          "@type": "Question",
          "name": "Does CCPA 2026 apply to startups with less than $25M revenue?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, if the startup processes the personal data of 50,000+ California residents or derives 50% of revenue from selling data."
          }
        }
      ]
    }
  ]
};

export default function CCPAGeneratorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Interactive Client Component */}
      <Suspense fallback={<div className="text-center py-20">Loading Privacy Policy Generator...</div>}>
        <CCPAGeneratorClient />
      </Suspense>

      {/* SEO Content Section */}
      <section className="space-y-16 pt-16 border-t border-gray-100">
        {/* CCPA/CPRA Introduction */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">What is CCPA/CPRA and Why Your Business Needs a Compliant Privacy Policy</h2>
            <p className="text-lg text-text-primary/60 max-w-3xl mx-auto">
              The California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) are comprehensive privacy laws that give California residents control over their personal information. 
              These laws apply to businesses that meet any of the following criteria:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-border-lavender shadow-soft">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">$25M+ Revenue</h3>
              <p className="text-text-primary/60 text-sm">Businesses with annual gross revenue of $25 million or more</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border-lavender shadow-soft">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">50,000+ Users</h3>
              <p className="text-text-primary/60 text-sm">Businesses that process personal data of 50,000+ California residents</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border-lavender shadow-soft">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">50% Data Revenue</h3>
              <p className="text-text-primary/60 text-sm">Businesses that derive 50% or more of their revenue from selling personal data</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-left space-y-4">
            <p className="text-text-primary/80">
              A compliant privacy policy is not just a legal requirement—it&apos;s a trust-building tool for your customers. 
              It demonstrates your commitment to protecting their personal information and helps you avoid costly fines and legal disputes.
            </p>
            <p className="text-text-primary/80">
              Our CCPA Privacy Policy Generator simplifies the process, ensuring your policy meets all legal requirements while being tailored to your specific business needs.
            </p>
          </div>
        </section>

        {/* 2026 CCPA Updates */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Key CCPA/CPRA 2026 Updates Every California Business Must Know</h2>
            <p className="text-text-primary/60 mt-2">Stay ahead of the latest California privacy requirements.</p>
          </div>
          
          <div className="overflow-x-auto rounded-3xl border border-border-lavender shadow-soft bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-main border-b border-border-lavender">
                  <th className="px-8 py-6 font-bold text-text-primary">Update</th>
                  <th className="px-8 py-6 font-bold text-text-primary">2026 Change</th>
                  <th className="px-8 py-6 font-bold text-text-primary">Startup Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-8 py-6 font-semibold">Data Breach Notification</td>
                  <td className="px-8 py-6 text-sm text-gray-600">Stricter timelines and expanded notification requirements</td>
                  <td className="px-8 py-6 text-sm">Update privacy policy and implement breach response plan</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-semibold">Right to Correct</td>
                  <td className="px-8 py-6 text-sm text-gray-600">Expanded to include all personal data, not just sensitive information</td>
                  <td className="px-8 py-6 text-sm">Add correction mechanism to privacy policy</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-semibold">Risk Assessments</td>
                  <td className="px-8 py-6 text-sm text-gray-600">Mandatory for businesses processing high-risk data</td>
                  <td className="px-8 py-6 text-sm">Conduct annual privacy risk assessment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How the Generator Works */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How Our CCPA Privacy Policy Generator Works</h2>
            <p className="text-text-primary/60 mt-2">Create a compliant privacy policy in just a few simple steps.</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">1. Free Preview vs. Full AI-Generated Policy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-border-lavender shadow-soft">
                  <h4 className="font-bold text-lg mb-3">Free Version</h4>
                  <ul className="space-y-2 text-sm text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>3 free policy previews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Basic template structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Limited customization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>No PDF download</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-lavender text-white rounded-2xl p-6 shadow-soft">
                  <h4 className="font-bold text-lg mb-3">Premium Version</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">✓</span>
                      <span>Unlimited full policy generations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">✓</span>
                      <span>DeepSeek AI-powered customization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">✓</span>
                      <span>Complete PDF export</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">✓</span>
                      <span>Full compliance with 2026 updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">2. 13 Mandatory CCPA/CPRA Disclosure Requirements</h3>
              <p className="text-text-primary/80">
                Our generator ensures your privacy policy includes all 13 statutory disclosure items required by CCPA/CPRA, including:
              </p>
              <ul className="space-y-2 text-sm text-text-primary/80 pl-6 list-disc">
                <li>Categories of personal information collected</li>
                <li>Purposes for collecting and using information</li>
                <li>How information is shared with third parties</li>
                <li>Consumer rights under CCPA/CPRA</li>
                <li>Process for exercising rights</li>
                <li>Data retention policies</li>
                <li>Security measures implemented</li>
                <li>Financial incentives program details (if applicable)</li>
                <li>Minors&apos; privacy protections</li>
                <li>Do Not Sell My Personal Information option</li>
                <li>Changes to the privacy policy</li>
                <li>Contact information</li>
                <li>Disclaimer and limitations</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">3. Data Breach Notification Requirements Under CCPA</h3>
              <p className="text-text-primary/80">
                CCPA requires businesses to notify California residents of data breaches &quot;without unreasonable delay&quot; and &quot;immediately following discovery&quot; of the breach. 
                Our generator includes proper breach notification procedures in your privacy policy.
              </p>
              <p className="text-text-primary/80">
                For more detailed breach notification letters, use our <a href="/tools/ccpa-breach-letters" className="text-primary-lavender font-medium hover:underline">CCPA Data Breach Letters Generator</a>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions (FAQ)</h2>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-primary-lavender">Q:</span>
                How is this generator different from a free CCPA template?
              </h3>
              <p className="text-text-primary/70 pl-8 leading-relaxed">
                Our free version provides a professional preview, while the paid AI-generated policy is fully customized to your business&apos;s specific data collection practices, third-party services, and industry, ensuring full compliance with 2026 CCPA updates.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-primary-lavender">Q:</span>
                Do I need a lawyer to review my generated privacy policy?
              </h3>
              <p className="text-text-primary/70 pl-8 leading-relaxed">
                Yes. This tool generates a compliant template, but we strongly recommend having a licensed California attorney review it to ensure it meets your unique business needs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-primary-lavender">Q:</span>
                How often should I update my CCPA privacy policy?
              </h3>
              <p className="text-text-primary/70 pl-8 leading-relaxed">
                You must update your policy whenever your data collection practices change, and at least annually to reflect new CCPA/CPRA requirements (including 2026 updates).
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-primary-lavender">Q:</span>
                Does CCPA 2026 apply to startups with less than $25M revenue?
              </h3>
              <p className="text-text-primary/70 pl-8 leading-relaxed">
                Yes, if the startup processes the personal data of 50,000+ California residents or derives 50% of revenue from selling data. Revenue is only one of three potential triggers.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Related Compliance Tools for Your Business</h2>
            <p className="text-text-primary/60 mt-2">Complete your CCPA compliance with these essential tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/tools/ccpa-checker" className="bg-white rounded-2xl p-6 border border-border-lavender shadow-soft hover:border-primary-lavender hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">CCPA Compliance Checker</h3>
              <p className="text-text-primary/60 text-sm">Audit your business for CCPA compliance gaps</p>
              <div className="mt-4 text-primary-lavender font-medium text-sm flex items-center gap-1">
                <span>Try Now</span>
                <span>→</span>
              </div>
            </a>
            <a href="/tools/ccpa-breach-letters" className="bg-white rounded-2xl p-6 border border-border-lavender shadow-soft hover:border-primary-lavender hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2">CCPA Data Breach Letters</h3>
              <p className="text-text-primary/60 text-sm">Draft breach notification letters instantly</p>
              <div className="mt-4 text-primary-lavender font-medium text-sm flex items-center gap-1">
                <span>Try Now</span>
                <span>→</span>
              </div>
            </a>
            <a href="/pricing" className="bg-primary-lavender text-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2">Premium Compliance Suite</h3>
              <p className="text-white/80 text-sm">Unlimited access to all CCPA tools</p>
              <div className="mt-4 font-medium text-sm flex items-center gap-1">
                <span>Upgrade Now</span>
                <span>→</span>
              </div>
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-lavender text-white rounded-[3rem] p-8 md:p-16 text-center space-y-8">
          <h2 className="text-3xl font-extrabold">Ready to Generate Your CCPA Privacy Policy?</h2>
          <p className="max-w-2xl mx-auto text-lg">
            Create a fully compliant privacy policy in minutes. Free previews available, no credit card required.
          </p>
          <a href="#generator" className="inline-block px-8 py-4 bg-white text-primary-lavender font-bold rounded-xl hover:bg-gray-100 transition-all">
            Generate Your Policy Now
          </a>
          <p className="text-white/60 text-sm">
            Not sure if your business is CCPA compliant? Run a free CCPA Compliance Check first to identify gaps.
          </p>
          <a href="/tools/ccpa-checker" className="inline-block text-white font-medium hover:underline">
            Run Free Compliance Check
          </a>
        </section>

        <div className="text-center pb-8 opacity-40 text-xs font-mono uppercase tracking-widest">
          Legal Reference: California CCPA Section 1798.82 & 1798.150
        </div>
      </section>
    </div>
  );
}
