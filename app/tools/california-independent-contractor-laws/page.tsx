import { Metadata } from 'next';
import Link from 'next/link';
import ContractorAuditTool from '../../../components/tools/ContractorAuditTool';

export const metadata: Metadata = {
  title: 'California Independent Contractor Law: ABC & Borello Test Guide',
  description:
    'Audit your 1099 compliance instantly with our free California Independent Contractor Law tool. Test against AB5 ABC test, Borello test, and SB 988 rules for 2026.',
  alternates: { canonical: 'https://www.pancothink.com/tools/california-independent-contractor-laws' },
  openGraph: {
    title: 'California Independent Contractor Law: ABC & Borello Test Guide',
    description:
      'Free 2-minute audit tool for AB5, the ABC Test, the Borello Test, and SB 988 payment compliance in California.',
    url: 'https://www.pancothink.com/tools/california-independent-contractor-laws',
    type: 'website',
  },
};

// ─── Static data ──────────────────────────────────────────────────────────────

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Does California still use the IRS 20-point checklist?',
    a: (
      <>
        The IRS 20-factor test is still used for federal tax auditing. However, for state labor
        laws, payroll taxes (EDD), and worker&apos;s compensation, California mandates the much
        stricter ABC test. Meeting IRS standards does not mean you are compliant with California
        AB5. If you want to check the federal side too, run our{' '}
        <Link
          href="/tools/irs-20-point-checklist-for-independent-contractors"
          className="text-primary-lavender hover:underline font-semibold"
        >
          free IRS 20-point classification check
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Can a contract waive California AB5 rules?',
    a: "No. You cannot contract your way out of California labor laws. Even if a contractor signs an agreement stating they want to be a 1099 independent worker, the State of California will look past the contract and audit the actual economic reality of the working relationship.",
  },
  {
    q: 'What happens if I misclassify a worker in California?',
    a: (
      <>
        The penalties are severe. Civil penalties range from $5,000 to $25,000 per violation for
        willful misclassification, plus retroactive payments for unpaid overtime, meal breaks, and
        severe back taxes to the Employment Development Department (EDD). If your audit result
        above flagged high risk, run the{' '}
        <Link
          href="/tools/irs-20-point-checklist-for-independent-contractors"
          className="text-primary-lavender hover:underline font-semibold"
        >
          IRS 20-point checklist
        </Link>{' '}
        next, then{' '}
        <Link
          href="/tools/sb988-contract-generator#generator-form"
          className="text-primary-lavender hover:underline font-semibold"
        >
          generate a compliant written contract
        </Link>{' '}
        before continuing the engagement.
      </>
    ),
  },
];

// Plain-text mirror of FAQS for the FAQPage JSON-LD (schema requires plain text, not JSX)
const FAQS_PLAIN = [
  {
    q: 'Does California still use the IRS 20-point checklist?',
    a: "The IRS 20-factor test is still used for federal tax auditing. However, for state labor laws, payroll taxes (EDD), and worker's compensation, California mandates the much stricter ABC test. Meeting IRS standards does not mean you are compliant with California AB5.",
  },
  {
    q: 'Can a contract waive California AB5 rules?',
    a: "No. You cannot contract your way out of California labor laws. Even if a contractor signs an agreement stating they want to be a 1099 independent worker, the State of California will look past the contract and audit the actual economic reality of the working relationship.",
  },
  {
    q: 'What happens if I misclassify a worker in California?',
    a: "The penalties are severe. Civil penalties range from $5,000 to $25,000 per violation for willful misclassification, plus retroactive payments for unpaid overtime, meal breaks, and severe back taxes to the Employment Development Department (EDD).",
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS_PLAIN.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndependentContractorLawPage() {
  return (
    <div id="top" className="min-h-screen bg-bg-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero + interactive tool ── */}
      <section className="max-w-4xl mx-auto pt-14 pb-6 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          Updated for California AB5 &amp; SB 988 — 2026
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
          California Independent Contractor
          <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/60">
            &amp; Employee (AB5) Compliance Tool
          </span>
        </h1>

        <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Check your audit risk in 2 minutes under California AB5 &amp; SB 988. Free &amp; no
          sign-up required.
        </p>
      </section>

      {/* ── Audit tool ── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <ContractorAuditTool />
      </section>

      {/* ── Cross-links: IRS check + Demand Letter Generator ── */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between gap-4 bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
                Want the federal check too?
              </p>
              <p className="text-sm text-indigo-900 font-semibold leading-snug">
                California&apos;s ABC test is stricter than the IRS 20-point checklist. Run both
                before you finalize classification.
              </p>
            </div>
            <Link
              href="/tools/irs-20-point-checklist-for-independent-contractors"
              className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap w-fit"
            >
              🧭 Run Free IRS Classification Check →
            </Link>
          </div>

          <div className="flex flex-col justify-between gap-4 bg-orange-50 border border-orange-200 rounded-2xl px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">
                Already did the work and still haven&apos;t been paid?
              </p>
              <p className="text-sm text-orange-900 font-semibold leading-snug">
                Generate a formal SB 988 demand letter — cites the 30-day rule &amp; double
                damages — and send it today.
              </p>
            </div>
            <Link
              href="/tools/sb988-demand-letter-generator"
              className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap w-fit"
            >
              ✉️ Write Demand Letter →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEO content: ABC vs Borello ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            The legal standard
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            ABC Test vs. Borello Test: Which Applies to Your California Contractors?
          </h2>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 text-sm text-text-primary/70 leading-relaxed space-y-4">
          <p>
            In California, worker classification is no longer a guessing game. While the IRS uses
            a 20-point checklist, California strictly enforces the ABC Test established by
            Assembly Bill 5 (AB5) for most industries.
          </p>
          <p>
            To classify a worker legally as an independent contractor, a hiring entity must prove
            all three of the following conditions:
          </p>
          <ul className="space-y-2 list-none">
            <li>
              <strong className="text-text-primary">A (Behavioral Control):</strong> The worker is
              free from the control and direction of the hiring organization in connection with
              the performance of the work.
            </li>
            <li>
              <strong className="text-text-primary">B (Core Business):</strong> The worker
              performs work that is outside the usual course of the hiring entity&apos;s business.
              (This is where most businesses fail compliance.)
            </li>
            <li>
              <strong className="text-text-primary">C (Independent Trade):</strong> The worker is
              customarily engaged in an independently established trade, occupation, or business
              of the same nature as that involved in the work performed.
            </li>
          </ul>
          <p className="font-bold text-text-primary pt-2">What about the Borello Test?</p>
          <p>
            The older Borello standard relies on a multi-factor balancing test (similar to the IRS
            20 factors). Today, it only applies to specific statutory exemptions in California
            (such as licensed real estate agents, certain professional services, or direct
            salespersons). If your business doesn&apos;t fall under these rare exemptions, the
            strict ABC test rules your contract.
          </p>
        </div>
      </section>

      {/* ── SEO content: SB 988 payment rules ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Payment compliance
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            California Independent Contractor Payment Laws &amp; SB 988
          </h2>
          <p className="text-base text-text-primary/60 mt-2 max-w-2xl leading-relaxed">
            Ensuring your workers are classified correctly is only half the battle; paying them
            according to California law is the other. Under the Freelance Worker Protection Act
            (SB 988), California has introduced steep penalties for delayed payments to
            independent contractors.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 text-sm text-text-primary/70 leading-relaxed">
          <p className="mb-4">
            If you hire freelance workers in California, you must adhere to these strict
            guardrails:
          </p>
          <ol className="space-y-3 list-decimal list-inside">
            <li>
              <strong className="text-text-primary">Mandatory Written Contracts:</strong> Any
              contract valued at $250 or more must be in writing, specifying the rate, method, and
              date of payment.
            </li>
            <li>
              <strong className="text-text-primary">30-Day Payment Deadline:</strong> Payments
              must be made on or before the date specified in the contract, or no later than 30
              days after the completion of services if no date is specified.
            </li>
            <li>
              <strong className="text-text-primary">Late Payment Penalties:</strong> Hiring
              entities that fail to pay on time can face double damages (2x late payment penalty)
              plus attorney fees under SB 988.
            </li>
          </ol>
          <p className="mt-4">
            The audit tool above automatically factors these SB 988 checklist criteria into your
            result. If it flagged missing contract terms, generate a{' '}
            <Link
              href="/tools/sb988-contract-generator"
              className="text-primary-lavender hover:underline font-semibold"
            >
              compliant contract now
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            What is the new independent contractor law in California for 2026?
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

      {/* ── Related tools ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Related tools
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Next steps once you know your risk level
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/tools/sb988-contract-generator"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Contract Generator</p>
            <p className="text-xs text-text-primary/60 leading-relaxed">
              Build an SB 988 compliant freelance agreement in 60 seconds.
            </p>
          </Link>
          <Link
            href="/tools/sb988-demand-letter-generator"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Demand Letter Generator</p>
            <p className="text-xs text-text-primary/60 leading-relaxed">
              Already unpaid? Send a formal SB 988 demand letter today.
            </p>
          </Link>
          <Link
            href="/tools/sb988-late-payment-calculator"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Penalty Calculator</p>
            <p className="text-xs text-text-primary/60 leading-relaxed">
              Calculate double-damages exposure for a late payment.
            </p>
          </Link>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-primary-lavender/5 border border-primary-lavender/20 rounded-3xl px-8 py-10 text-center">
          <h2 className="text-2xl font-black text-text-primary mb-3">
            Not sure yet? Run the audit above.
          </h2>
          <p className="text-sm text-text-primary/60 mb-6 max-w-md mx-auto leading-relaxed">
            Two minutes tells you which test applies and whether your contract is exposed — before
            it becomes a $25,000 problem.
          </p>
          <a
            href="#top"
            className="inline-flex items-center justify-center gap-2 bg-primary-lavender text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender-dark transition-colors text-sm"
          >
            Run My Compliance Audit ↑
          </a>
        </div>
      </section>
    </div>
  );
}
