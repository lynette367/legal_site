import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import CaliforniaContractGeneratorClient from '../california-independent-contractor-agreement-template/CaliforniaContractGeneratorClient';
import { professions } from '@/data/professions';

export const metadata: Metadata = {
  title: 'Freelance Copywriter Contract Template | California SB 988 Compliant | IndieLegal',
  description:
    'Free California SB 988 compliant contract template for freelance copywriters. Protect your writing, retain usage rights until paid, and secure mandatory double-damage late payment rights.',
  keywords: [
    'copywriting contract',
    'copywriter contract template',
    'copywriting contract template',
    'contract copywriter',
    'freelance writing agreement California',
    'SB 988 copywriter contract',
  ],
  alternates: {
    canonical: 'https://indielegalterms.com/contracts/freelance-copywriter-contract-template',
  },
  openGraph: {
    title: 'Freelance Copywriter Contract Template | California SB 988 Compliant | IndieLegal',
    description:
      'Free California SB 988 compliant contract template for freelance copywriters. Protect your writing and enforce payment terms.',
    url: 'https://indielegalterms.com/contracts/freelance-copywriter-contract-template',
    type: 'website',
  },
};

const copywriterProfession = professions.find((p) => p.slug === 'copywriters');

const FAQ_ITEMS = [
  {
    q: 'Does a freelance copywriter need a written contract in California?',
    a: 'Yes. Under California SB 988 (Freelance Worker Protection Act), any freelance engagement valued at $250 or more — individually or aggregated over 120 days — strictly requires a written contract signed by both parties before work begins.',
  },
  {
    q: 'Can a client publish copy on their live site before paying the invoice?',
    a: 'Only if your contract allows it. With our recommended conditional usage license clause, the client\'s license to publish, adapt, or distribute your copy is explicitly suspended until your invoice is cleared in full.',
  },
  {
    q: 'What happens if a client pays my copywriting invoice 30 days late?',
    a: 'Under California SB 988, if a client fails to pay within 30 days of the invoice date (or your agreed contract deadline), you are entitled to statutory double damages — equal to 2× your unpaid contract value — plus court costs and attorney fees.',
  },
  {
    q: 'Are email threads considered a valid freelance copywriter contract in California?',
    a: 'An email chain can legally qualify only if it explicitly specifies both parties\' names, itemized scope of writing deliverables, exact rate or total price, and payment terms/dates. Using a dedicated contract pre-filled with all SB 988 required clauses is far safer.',
  },
  {
    q: 'What is a reasonable kill fee for a canceled copywriting project?',
    a: 'Standard kill fees range from 25% to 50% for work scheduled but canceled prior to completion, or 100% for completed deliverables. Explicitly defining your deposit and milestone payment terms prevents unpaid work if a client pulls out early.',
  },
];

export default function FreelanceCopywriterContractTemplatePage() {
  return (
    <>
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-bg-main">
        {/* Top Banner Notice */}
        <div className="max-w-4xl mx-auto mt-4 mb-2 px-6 text-center">
          <Link href="/tools/ca-contractor-laws" className="text-text-lavender hover:underline font-semibold text-sm">
            Hiring in California? The IRS test isn&apos;t enough. Use our 2026 California AB5 (ABC &amp; Borello) Compliance Tool to calculate your risk under SB 988.
          </Link>
        </div>

        {/* ── Banner: Link to Universal Generator ── */}
        <section className="max-w-4xl mx-auto px-6 pt-4 pb-2">
          <div className="flex items-center justify-between gap-4 bg-bg-card border border-border-lavender rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌐</span>
              <p className="text-sm text-text-primary font-medium">
                Not in California? Use our universal contractor agreement template →
              </p>
            </div>
            <Link
              href="/contracts/generator"
              className="shrink-0 inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-4 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              Universal Generator →
            </Link>
          </div>
        </section>

        {/* ── Hero ── */}
        <section className="max-w-4xl mx-auto pt-10 pb-6 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-border-lavender">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
            </span>
            Updated for California SB 988 — Copywriting &amp; Content Strategy
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
            Freelance Copywriter Contract Template
            <br />
            <span className="text-2xl md:text-3xl font-bold text-text-lavender">
              — SB 988 Compliant ($250+ Copywriting Projects)
            </span>
          </h1>

          <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Protect your copy, enforce commercial usage licenses, and secure mandatory 30-day payment terms under California law. Generate your contract in 60 seconds — free, no account required.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 text-left">
            {[
              { icon: '✍️', text: 'Usage license suspended automatically until invoice is paid' },
              { icon: '📅', text: '30-day payment deadline under CA SB 988 statutory rule' },
              { icon: '⚖️', text: '2× statutory late payment damage clause pre-filled' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 bg-bg-card border border-border-lavender rounded-xl px-4 py-3 shadow-sm">
                <span className="text-lg shrink-0">{icon}</span>
                <span className="text-sm font-medium text-text-primary/80 leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI Contract Generator Tool (Top of Page) ── */}
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <Suspense fallback={<div className="text-center py-12 text-text-primary/40">Loading contract generator…</div>}>
            <CaliforniaContractGeneratorClient />
          </Suspense>
        </section>

        {/* ── SEO CONTENT SECTIONS BELOW TOOL ── */}
        <div className="max-w-4xl mx-auto px-6 pb-20 space-y-12">

          {/* Section 1: Understanding Copywriter Contracts in California */}
          <section className="bg-bg-card border border-border-lavender rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✍️</span>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                1. Understanding Copywriter Contracts in California
              </h2>
            </div>
            <p className="text-base text-text-primary/80 leading-relaxed mb-4">
              {copywriterProfession?.painPointNotice ||
                "Did your client publish your copy on their live site but 'forgot' to pay your invoice? Establish your publishing leverage under California SB 988. This template suspends their commercial rights until they settle your bill."}
            </p>
            <p className="text-sm text-text-primary/70 leading-relaxed">
              Under California SB 988 (the Freelance Worker Protection Act), any freelance copywriting or content writing agreement valued at $250 or more strictly mandates a formal written contract specifying itemized deliverables, agreed compensation, and explicit payment timelines. When hiring parties fail to execute a written agreement or delay payment beyond 30 days, California law exposes them to double statutory damages and legal costs.
            </p>
          </section>

          {/* Section 2: Copyright License vs. Copyright Assignment */}
          <section className="bg-bg-card border border-border-lavender rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔒</span>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                2. Copyright License vs. Copyright Assignment
              </h2>
            </div>
            <p className="text-base text-text-primary/80 leading-relaxed mb-4">
              Many freelance copywriters accidentally sign away full copyright ownership upon creation rather than conditioning the transfer on final payment clearance.
            </p>
            <div className="bg-bg-main border border-border-lavender rounded-xl p-5 mb-4">
              <h3 className="text-sm font-bold text-text-lavender mb-2 uppercase tracking-wider">
                Key Distinction for Freelance Copywriters
              </h3>
              <ul className="space-y-2 text-sm text-text-primary/80">
                <li className="flex items-start gap-2">
                  <span className="text-text-lavender font-bold">•</span>
                  <span><strong>Full Copyright Assignment:</strong> Immediately transfers total legal ownership to the client upon creation, leaving you with zero leverage if they default on payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-lavender font-bold">•</span>
                  <span><strong>Conditional Usage License:</strong> Retains your underlying copyright ownership and grants commercial publishing rights only upon 100% invoice clearance.</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-text-primary/70 leading-relaxed">
              As established in our copywriter contract snippet: <em className="text-text-lavender font-medium">&quot;Writer grants Client a conditional license to publish and distribute the copy. This license is automatically suspended if payment is delayed beyond the statutory limit.&quot;</em> If an unpaid client continues using your marketing copy, landing pages, or ad campaigns while in default, they face direct copyright infringement liability alongside California SB 988 statutory penalties.
            </p>
          </section>

          {/* Section 3: Work-for-Hire vs. Independent Copyright */}
          <section className="bg-bg-card border border-border-lavender rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚖️</span>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                3. Work-for-Hire vs. Independent Copyright
              </h2>
            </div>
            <p className="text-base text-text-primary/80 leading-relaxed mb-3">
              Default copyright ownership differs significantly based on the explicit language used in your contract:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-bg-main border border-border-lavender rounded-xl p-4">
                <h4 className="font-bold text-text-primary mb-1">Work-for-Hire Default</h4>
                <p className="text-text-primary/70 leading-relaxed">
                  Under U.S. copyright law, a strict &quot;work-made-for-hire&quot; clause treats the hiring client as the legal author from day one. In California, specifying work-for-hire in an independent contractor agreement can also trigger statutory employee classification risks under state labor codes.
                </p>
              </div>
              <div className="bg-bg-main border border-border-lavender rounded-xl p-4">
                <h4 className="font-bold text-text-primary mb-1">Independent Copyright License</h4>
                <p className="text-text-primary/70 leading-relaxed">
                  By default, an independent contractor owns the initial copyright to written deliverables. Ownership or exclusive usage rights should transfer to the client only after receiving full payment, preserving your legal protection throughout the project lifecycle.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: How to Negotiate Usage Rights & Kill Fees */}
          <section className="bg-bg-card border border-border-lavender rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                4. How to Negotiate Usage Rights &amp; Kill Fees
              </h2>
            </div>
            <div className="space-y-4 text-sm text-text-primary/80 leading-relaxed">
              <p>
                Negotiating fair commercial terms ensures your copywriting practice remains profitable while protecting you against canceled projects and Scope Creep:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Scope-Specific Usage Rights:</strong> Distinguish between local web use, email newsletter rights, and full global advertising campaigns. Charge higher licensing tiers for broader commercial distribution.
                </li>
                <li>
                  <strong>Enforceable Kill Fees:</strong> Include a standard 25%–50% cancellation fee for project cancellations after work has commenced, ensuring your reserved calendar time remains compensated.
                </li>
                <li>
                  <strong>Upfront Deposit Structure:</strong> Require a 50% upfront deposit for all new clients or projects exceeding $1,000 before initiating content outline phase.
                </li>
                <li>
                  <strong>Revision Caps:</strong> Explicitly cap included revision rounds (e.g., 2 revision cycles) and specify an hourly rate for additional revisions.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Two-column Tips Section with Colored Cross-link Boxes */}
          <section className="bg-bg-card border border-border-lavender rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🚀</span>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                5. Practical Tips for Copywriters &amp; Clients
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column A: Tips for Freelance Copywriters */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <span>✍️</span> Tips for Freelance Copywriters
                </h3>
                <ul className="text-sm text-text-primary/70 space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Never deliver final unwatermarked sales copy or publish directly to CMS without an executed contract.</li>
                  <li>Incorporate SB 988 30-day payment deadlines on every invoice sent to California clients.</li>
                  <li>If an invoice passes 30 days overdue, send a formal demand letter citing double statutory damages.</li>
                </ul>

                {/* Orange Cross-Link Box (Freelancer Demand-Letter Path) */}
                <div className="bg-orange-50 border border-orange-200 rounded-2xl px-6 py-5 flex flex-col justify-between gap-4 mt-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">Already sent copy and haven&apos;t been paid?</p>
                    <p className="text-sm text-orange-900 font-semibold leading-snug">
                      Generate a formal SB 988 demand letter — cites the 30-day rule &amp; 2× double damages — and send it today.
                    </p>
                  </div>
                  <Link
                    href="/tools/ca-demand-letter-template"
                    className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap w-fit"
                  >
                    ✉️ Write Demand Letter →
                  </Link>
                </div>
              </div>

              {/* Column B: Tips for Clients Hiring Copywriters */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <span>🏢</span> Tips for Clients Hiring Copywriters
                </h3>
                <ul className="text-sm text-text-primary/70 space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Execute a written agreement prior to project kickoff to satisfy California SB 988 compliance.</li>
                  <li>Clearly define payment milestones and ensure invoices are paid within the mandatory 30-day window.</li>
                  <li>Verify worker classification compliance under California AB5 (ABC test) before engaging 1099 copywriters.</li>
                </ul>

                {/* Indigo Cross-Link Box (Employer Compliance Path) */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5 flex flex-col justify-between gap-4 mt-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">Hiring copywriters in California?</p>
                    <p className="text-sm text-indigo-900 font-semibold leading-snug">
                      Before finalizing 1099 copywriter terms, verify worker classification &amp; legal compliance risk.
                    </p>
                  </div>
                  <Link
                    href="/tools/irs-20-point-checklist"
                    className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap w-fit"
                  >
                    🧭 Run Free IRS Classification Check →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: FAQ Accordion */}
          <section className="bg-bg-card border border-border-lavender rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">❓</span>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                6. Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-bg-main border border-border-lavender rounded-xl p-4 [&_summary::-webkit-details-marker]:none"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-text-primary group-open:text-text-lavender transition-colors text-base">
                    <span>{faq.q}</span>
                    <span className="text-text-lavender transition-transform group-open:rotate-180 text-xl font-bold ml-2">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-text-primary/80 leading-relaxed border-t border-border-lavender/50 pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
