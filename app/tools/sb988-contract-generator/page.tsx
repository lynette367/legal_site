import { Metadata } from 'next';
import Link from 'next/link';
import SB988GeneratorClient from './SB988GeneratorClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Free SB 988 Contract Generator for California Freelancers (2026) | PancoLegal',
  description:
    'Generate a California SB 988 compliant freelance contract in 60 seconds. Mandatory for $250+ projects — covers itemized services, 30-day payment deadlines, and 2x late payment penalties. Free, no account required.',
  alternates: { canonical: 'https://www.pancothink.com/tools/sb988-contract-generator' },
  openGraph: {
    title: 'Free SB 988 Contract Generator for California Freelancers (2026)',
    description:
      'Generate a California SB 988 compliant freelance contract in 60 seconds. Mandatory for $250+ projects — covers itemized services, 30-day payment deadlines, and 2x late payment penalties.',
    url: 'https://www.pancothink.com/tools/sb988-contract-generator',
    type: 'website',
  },
};

// ─── Static data ──────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Enter your project details',
    desc: 'Fill in your name, your client\'s name, the scope of work, and the agreed project value (must be $250 or more for SB 988 to apply).',
  },
  {
    step: '2',
    title: 'Set your payment terms',
    desc: 'Choose a payment deadline. SB 988 defaults to 30 calendar days from invoice — but you can specify an earlier date in the contract.',
  },
  {
    step: '3',
    title: 'Generate and download',
    desc: 'Our AI produces a complete, clause-by-clause agreement. Copy it, download it, and send it to your client before starting work.',
  },
];

const SB988_CLAUSES = [
  { icon: '📋', label: 'Itemized services', desc: 'A precise description of work scope, preventing scope creep disputes.' },
  { icon: '💰', label: 'Compensation amount', desc: 'The agreed total, specified in writing — oral agreements do not satisfy SB 988.' },
  { icon: '📅', label: '30-day payment deadline', desc: 'The statutory default. Clients who miss this trigger double-damage liability automatically.' },
  { icon: '⚖️', label: 'Double damages clause', desc: 'If payment is late, you are entitled to recover the full unpaid amount as statutory damages — on top of the original invoice.' },
  { icon: '🛡️', label: 'Anti-retaliation notice', desc: 'SB 988 prohibits clients from retaliating against freelancers who enforce their rights.' },
  { icon: '📌', label: '$1,000 refusal penalty', desc: 'Clients who refuse to provide a written contract face a separate $1,000 statutory penalty.' },
];

const INDUSTRY_LINKS = [
  { href: '/freelance-contract/california-tech-contractor-agreement-template', label: 'Tech Contractor Agreement (California)', tag: 'Industry' },
  { href: '/freelance-contract/freelance-copywriter-contract-template-california', label: 'Freelance Copywriter Contract Template', tag: 'Industry' },
  { href: '/freelance-contract/graphic-designer-freelance-contract-late-payment-ca', label: 'Graphic Designer Late Payment Protection', tag: 'Industry' },
  { href: '/freelance-contract/la-video-editor-freelance-contract-template', label: 'LA Video Editor Contract Template', tag: 'Industry' },
  { href: '/freelance-contract/client-refuses-to-pay-freelance-invoice-california', label: 'Client Refuses to Pay? Your SB 988 Rights', tag: 'Rights' },
  { href: '/freelance-contract/penalty-for-not-paying-independent-contractor-ca', label: 'CA Contractor Late Payment Penalties', tag: 'Rights' },
  { href: '/freelance-contract/california-freelance-contract-requirements-2026', label: 'California Freelance Contract Requirements 2026', tag: 'Compliance' },
  { href: '/freelance-contract/how-long-does-client-have-to-pay-freelancer-california', label: 'How Long Does a Client Have to Pay?', tag: 'FAQ' },
];

const FAQS = [
  {
    q: 'Who is required to provide a written contract under SB 988?',
    a: 'The hiring party (your client) is legally required to provide the written contract. However, in practice, many freelancers draft the contract themselves to ensure it contains all SB 988-required clauses. Either way, both parties must sign before work begins.',
  },
  {
    q: 'Does SB 988 apply to projects under $250?',
    a: 'The written contract mandate applies to any single freelance engagement worth $250 or more, or multiple engagements with the same client totaling $250 within any 120-day period. Below that threshold, written contracts are not legally required — but still strongly recommended.',
  },
  {
    q: 'What happens if my client pays late?',
    a: 'Under SB 988, a client who misses the payment deadline owes you statutory damages equal to the unpaid amount — effectively doubling your recovery — plus reasonable attorney fees and court costs. You can pursue this through the California Labor Commissioner or Small Claims Court.',
  },
  {
    q: 'Can a contract waive my SB 988 rights?',
    a: 'No. Any contractual clause that attempts to waive a freelancer\'s rights under SB 988 is void and unenforceable under California law. Your statutory protections cannot be signed away.',
  },
  {
    q: 'Does SB 988 cover freelancers working remotely outside California?',
    a: 'Yes — if the hiring party is a California-based business or individual, SB 988 applies regardless of where the freelancer physically works. The client\'s location, not yours, determines whether the law applies.',
  },
  {
    q: 'Is an email chain a valid written contract under SB 988?',
    a: 'An email can qualify if it clearly identifies both parties, describes the services, states the total compensation, and specifies the payment date. In practice, most email exchanges omit at least one of these required elements, which is why a purpose-built contract template is safer.',
  },
  {
    q: 'What if my client refuses to sign the contract?',
    a: 'Refusal to provide or sign a written contract is itself a violation of SB 988. You can file a complaint with the California Division of Labor Standards Enforcement (DLSE). The client faces a separate $1,000 penalty for each refusal.',
  },
  {
    q: 'Can I use this generator for any profession?',
    a: 'Yes. This tool supports graphic designers, web developers, copywriters, photographers, video editors, consultants, UX designers, and marketing freelancers. Select your profession using the role selector in the form and the contract language adjusts accordingly.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SB988ContractGeneratorPage() {
  return (
    <div className="min-h-screen bg-bg-main">

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto pt-14 pb-6 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          Updated for California SB 988 — 2026
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
          Free SB 988 Contract Generator
          <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/60">
            for California Freelancers ($250+ Projects)
          </span>
        </h1>

        <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          California law mandates a written contract for any freelance project worth $250 or more.
          Generate a fully SB 988-compliant agreement in 60 seconds — free, no account required.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 text-left">
          {[
            { icon: '⚖️', text: 'Mandatory double-damage clause auto-included' },
            { icon: '📅', text: '30-day payment deadline written in by default' },
            { icon: '🛡️', text: 'Anti-retaliation & $1,000 refusal penalty notice' },
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
          <SB988GeneratorClient />
        </Suspense>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Three steps to a legally binding contract
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

      {/* ── What this contract covers (SB 988 about) ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            About SB 988
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            What every SB 988 contract must include
          </h2>
          <p className="text-base text-text-primary/60 mt-2 max-w-2xl leading-relaxed">
            California&apos;s Freelance Worker Protection Act (SB 988) sets minimum legal requirements for
            written agreements between freelancers and clients. Missing even one required element can
            void your statutory protections. Our generator automatically includes all of the following:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {SB988_CLAUSES.map(({ icon, label, desc }) => (
            <div key={label} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="font-bold text-text-primary text-sm mb-1">{label}</p>
                <p className="text-xs text-text-primary/60 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prose authority block — SEO content */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 text-sm text-text-primary/70 leading-relaxed space-y-4">
          <p>
            SB 988 (the Freelance Worker Protection Act) became effective January 1, 2025 in California.
            It requires that any hiring party — a business, individual, or non-profit — provide a written
            contract to a freelancer before work begins, for any engagement worth $250 or more (either
            individually or cumulatively within a 120-day period with the same freelancer).
          </p>
          <p>
            The law applies regardless of where the freelancer is physically located. If your client is
            based in California, SB 988 governs your engagement. This matters especially for remote
            freelancers — a graphic designer in New York working for a Los Angeles agency is protected
            under SB 988.
          </p>
          <p>
            The statute&apos;s most powerful provision is the double-damages clause: a client who misses
            the written payment deadline owes the freelancer statutory damages equal to the unpaid amount.
            In practical terms, a $5,000 invoice that goes unpaid becomes a $10,000 claim before attorney
            fees. The law also prohibits retaliation against freelancers who exercise their rights, and
            imposes a separate $1,000 penalty on clients who refuse to provide a written contract.
          </p>
          <p>
            Enforcement is handled by the California Division of Labor Standards Enforcement (DLSE).
            Freelancers can file complaints directly, pursue claims in Small Claims Court (up to $12,500),
            or bring a civil action with attorney fee recovery. The statute of limitations is four years
            for written contracts.
          </p>
        </div>
      </section>

      {/* ── Industry guides (internal links → pSEO cluster) ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
              Industry guides
            </span>
            <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
              SB 988 guides by profession and situation
            </h2>
            <p className="text-sm text-text-primary/60 mt-1 max-w-xl">
              Contract language, late payment rights, and dispute tools — tailored to your industry.
            </p>
          </div>
          <Link
            href="/freelance-contract"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-primary-lavender border border-primary-lavender/30 rounded-xl px-5 py-2.5 hover:bg-primary-lavender/5 transition-colors"
          >
            Browse all 100+ guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INDUSTRY_LINKS.map(({ href, label, tag }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-primary-lavender hover:shadow-soft transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-300 shrink-0">›</span>
                <span className="text-sm font-medium text-text-primary group-hover:text-primary-lavender transition-colors leading-snug">
                  {label}
                </span>
              </div>
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                {tag}
              </span>
            </Link>
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
            Common questions about SB 988 contracts
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
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
            Ready to protect your next project?
          </h2>
          <p className="text-sm text-text-primary/60 mb-6 max-w-md mx-auto leading-relaxed">
            Scroll back up to generate your SB 988 contract now — or explore the late payment
            penalty calculator to see exactly what you&apos;re owed if a client pays late.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#top"
              
              className="inline-flex items-center justify-center gap-2 bg-primary-lavender text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender-dark transition-colors text-sm"
            >
              Generate My Contract ↑
            </a>
            <Link
              href="/tools/sb988-late-payment-calculator"
              className="inline-flex items-center justify-center gap-2 bg-white border border-primary-lavender/30 text-primary-lavender font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender/5 transition-colors text-sm"
            >
              Calculate Late Penalties →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
