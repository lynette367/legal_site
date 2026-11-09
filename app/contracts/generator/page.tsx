import { Metadata } from 'next';
import Link from 'next/link';
import UniversalContractGeneratorClient from './UniversalContractGeneratorClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Free Independent Contractor Agreement Generator — Create & Download',
  description:
    'Generate a custom independent contractor agreement online in minutes. Tailor scope of work, payment terms, late fees, IP ownership, and cancellation for any US state. Free, no account required.',
  alternates: { canonical: 'https://indielegalterms.com/contracts/generator' },
  openGraph: {
    title: 'Free Independent Contractor Agreement Generator — Create & Download',
    description:
      'Generate a custom independent contractor agreement online in minutes. Tailor scope of work, payment terms, late fees, IP ownership, and cancellation for any US state. Free, no account required.',
    url: 'https://indielegalterms.com/contracts/generator',
    type: 'website',
  },
};

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Select your state & project details',
    desc: 'Specify the governing state for your contract, party details, and project amount.',
  },
  {
    step: '2',
    title: 'Customize payment & IP clauses',
    desc: 'Set payment due windows (e.g. Net 30), contractual late fees, IP transfer conditions, and cancellation terms.',
  },
  {
    step: '3',
    title: 'Generate & download instantly',
    desc: 'Our tool generates a clean, enforceable independent contractor agreement ready to download and print.',
  },
];

const GENERIC_CLAUSES = [
  { icon: '📋', label: 'Itemized scope of work', desc: 'Clearly defines project deliverables, deadlines, and revisions to stop scope creep.' },
  { icon: '💰', label: 'Written payment terms', desc: 'Defines agreed rates, invoicing schedules, and accepted payment methods in writing.' },
  { icon: '📅', label: 'Payment due window', desc: 'Establishes clear payment deadlines (such as Net 30) agreed upon by both parties.' },
  { icon: '⚡', label: 'Contractual late fee', desc: 'Protects cash flow by specifying a reasonable monthly interest penalty on overdue balances.' },
  { icon: '💡', label: 'IP transfer upon payment', desc: 'Ensures deliverable ownership transfers to the client only after full invoice payment is received.' },
  { icon: '🛡️', label: 'Cancellation & kill fee', desc: 'Guarantees compensation for work completed if a client terminates the project early.' },
];

const GENERIC_FAQS = [
  {
    q: 'Do I need a written contract if I\'m not in California?',
    a: (
      <>
        Yes. Even outside of California or states with explicit freelance payment laws, a written agreement is your primary legal protection against non-payment, scope creep, and intellectual property disputes. Without a signed written contract, proving agreed rates, Net 30 payment deadlines, or kill fee rights in court or arbitration is extremely difficult.
      </>
    ),
  },
  {
    q: 'What happens if my client is in California but I\'m not?',
    a: (
      <>
        California&apos;s Freelance Worker Protection Act (SB 988) applies based on the <strong>hiring party&apos;s location</strong>. If your client is a business or individual based in California, SB 988 statutory protections (including mandatory written contracts for $250+ projects, 30-day payment windows, and statutory double damages for late payment) apply to your engagement even if you reside in another state. If your client is in CA, we recommend using our <Link href="/contracts/california-independent-contractor-agreement-template" className="text-primary-lavender hover:underline font-semibold">California SB 988 Contractor Agreement Template</Link>.
      </>
    ),
  },
  {
    q: 'Are contractual late fees enforceable nationwide?',
    a: 'Yes, as long as the late fee rate is reasonable and specified in writing before work begins. Standard commercial late fee terms (such as 1.5% per month or 18% per annum) are widely recognized contractual terms enforced under state contract law across the US.',
  },
];

export default function UniversalContractGeneratorPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* ── Banner: Link to California Specific Page ── */}
      <section className="max-w-4xl mx-auto px-6 pt-6 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-primary-lavender/10 border border-primary-lavender/20 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🐻</span>
            <p className="text-sm text-text-primary font-medium">
              Freelancing with a California client? Get SB 988-specific protections (double damages, 30-day deadline) →
            </p>
          </div>
          <Link
            href="/contracts/california-independent-contractor-agreement-template"
            className="shrink-0 inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-4 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            California Template →
          </Link>
        </div>
      </section>

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto pt-8 pb-6 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          Universal US Independent Contractor Agreement — 2026
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
          Free Independent Contractor Agreement Generator
        </h1>

        <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Generate a complete contract in minutes — scope of work, payment terms, and IP ownership, built for freelancers and clients anywhere in the US.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 text-left">
          {[
            { icon: '📝', text: 'Clear scope of work & deliverable definitions' },
            { icon: '📅', text: 'Customizable Net 30 & contractual late fee terms' },
            { icon: '🛡️', text: 'IP transfer upon payment & kill fee clauses' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-lg shrink-0">{icon}</span>
              <span className="text-sm font-medium text-text-primary/80 leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Generator form ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <Suspense fallback={
          <div className="text-center py-12 text-text-primary/40">Loading contract generator…</div>
        }>
          <UniversalContractGeneratorClient />
        </Suspense>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Three steps to a legally sound agreement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="bg-white border border-gray-200 rounded-2xl p-6 relative">
              <div className="w-8 h-8 rounded-full bg-primary-lavender/10 border border-primary-lavender/20 flex items-center justify-center text-sm font-black text-primary-lavender mb-4">
                {step}
              </div>
              <h3 className="font-bold text-text-primary mb-2 leading-snug">{title}</h3>
              <p className="text-sm text-text-primary/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What this contract covers ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Contract Essentials
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Key clauses every independent contractor contract should contain
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {GENERIC_CLAUSES.map(({ icon, label, desc }) => (
            <div key={label} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="font-bold text-text-primary text-sm mb-1">{label}</p>
                <p className="text-xs text-text-primary/60 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Frequently asked questions about contractor agreements
          </h2>
        </div>

        <div className="space-y-3">
          {GENERIC_FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-sm text-text-primary leading-snug">{q}</span>
                <span className="shrink-0 text-primary-lavender text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 pt-1">
                <p className="text-sm text-text-primary/65 leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-primary-lavender/5 border border-primary-lavender/20 rounded-3xl px-8 py-10 text-center">
          <h2 className="text-2xl font-black text-text-primary mb-3">
            Ready to generate your agreement?
          </h2>
          <p className="text-sm text-text-primary/60 mb-6 max-w-md mx-auto leading-relaxed">
            Fill out the simple form above to create your customizable independent contractor agreement in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 bg-primary-lavender text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender-dark transition-colors text-sm"
            >
              Generate My Contract ↑
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
