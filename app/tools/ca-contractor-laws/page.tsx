import { Metadata } from 'next';
import Link from 'next/link';
import ContractorAuditTool from '../../../components/tools/ContractorAuditTool';
import MisclassificationCostCalculator from '../../../components/tools/MisclassificationCostCalculator';
import CaContractorLawLegalDepth from '../../../components/tools/CaContractorLawLegalDepth';

export const metadata: Metadata = {
  title: 'California ABC Test & Borello Test: Free Compliance Checker (2026)',
  description:
    'Audit your 1099 compliance instantly with our free California Independent Contractor Law tool. Test against AB5 ABC test, Borello test, and SB 988 rules for 2026 — plus a 1099 vs. W-2 true cost calculator that shows misclassification penalty exposure.',
  alternates: { canonical: 'https://indielegalterms.com/tools/ca-contractor-laws' },
  openGraph: {
    title: 'California ABC Test & Borello Test: Free Compliance Checker (2026)',
    description:
      'Free 2-minute audit tool for AB5, the ABC Test, the Borello Test, and SB 988 payment compliance in California — plus a 1099 vs. W-2 cost calculator.',
    url: 'https://indielegalterms.com/tools/ca-contractor-laws',
    type: 'website',
  },
};

// ─── Static data ──────────────────────────────────────────────────────────────

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What is the ABC Test in California?',
    a: (
      <>
        <p className="mb-2">
          The ABC Test is a strict three-prong standard used in California to determine whether a worker
          is an employee or an independent contractor. To classify a worker as an contractor,
          the hiring entity must prove <strong>all three</strong> of the following:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>A.</strong> The worker is free from the control and direction of the hiring entity in connection with the performance of the work.</li>
          <li><strong>B.</strong> The worker performs work that is outside the usual course of the hiring entity’s business.</li>
          <li><strong>C.</strong> The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.</li>
        </ul>
      </>
    ),
  },
  {
    q: 'What is the Borello Test?',
    a: (
      <>
        <p className="mb-2">
          The Borello Test is California&apos;s traditional common-law test used for occupations exempted from the ABC Test.
          Unlike the rigid ABC test, it relies on a <strong>&quot;total of the circumstances&quot;</strong> approach.
        </p>
        <p className="mb-2">
          The primary factor is whether the hiring entity has the <strong>right to control</strong> the manner and means of accomplishing the result desired.
          It also considers secondary factors such as:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Whether the worker is engaged in a distinct occupation or business.</li>
          <li>Whether the work is usually done under the direction of a principal or by a specialist without supervision.</li>
          <li>The skill required in the particular occupation.</li>
          <li>Whether the principal or the worker supplies the instrumentalities, tools, and the place of work.</li>
          <li>The length of time for which the services are to be performed.</li>
        </ul>
      </>
    ),
  },
  {
    q: 'Does California still use the IRS 20-point checklist?',
    a: (
      <>
        The IRS 20-factor test is still used for federal tax auditing. However, for state labor
        laws, payroll taxes (EDD), and worker&apos;s compensation, California mandates the much
        stricter ABC test. Meeting IRS standards does not mean you are compliant with California
        AB5. If you want to check the federal side too, run our{' '}
        <Link
          href="/tools/irs-20-point-checklist"
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
        The penalties are severe. Civil penalties range from $5,000 to $15,000 per violation under
        California Labor Code § 226.8 for willful misclassification; if the employer is found to have
        engaged in a pattern or practice (模式性或惯常性违规) of violations, civil penalties increase up to
        $25,000 per violation. In addition, employers face retroactive liability for unpaid overtime,
        meal breaks, and statutory tax deficiencies, penalties, and interest to the Employment
        Development Department (EDD). See what that looks like in dollars for your specific case with
        the{' '}
        <Link href="#cost-calculator" className="text-primary-lavender hover:underline font-semibold">
          1099 vs. W-2 true cost calculator
        </Link>{' '}
        above. If your audit result above flagged high risk, run the{' '}
        <Link
          href="/tools/irs-20-point-checklist"
          className="text-primary-lavender hover:underline font-semibold"
        >
          IRS 20-point checklist
        </Link>{' '}
        next, then{' '}
        <Link
          href="/contracts/generator#generator-form"
          className="text-primary-lavender hover:underline font-semibold"
        >
          generate an SB 988 compliant contract
        </Link>{' '}
        before continuing the engagement.
      </>
    ),
  },
];

// Plain-text mirror of FAQS for the FAQPage JSON-LD (schema requires plain text, not JSX)
const FAQS_PLAIN = [
  {
    q: 'What is the ABC Test in California?',
    a: "The ABC Test is a strict three-prong standard used in California to determine whether a worker is an employee or an independent contractor. Under California Labor Code § 2775, to classify a worker as an independent contractor, the hiring entity must prove all three of the following: A. The worker is free from the control and direction of the hiring entity in connection with the performance of the work. B. The worker performs work that is outside the usual course of the hiring entity's business. C. The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.",
  },
  {
    q: 'What is the Borello Test?',
    a: "The Borello Test is California's traditional common-law test established in S.G. Borello & Sons, Inc. v. Department of Industrial Relations (1989) 48 Cal.3d 341, applied to statutory exemptions from the ABC test (such as professional services under Labor Code § 2778 or B2B contracts under § 2776). The primary factor is whether the hiring entity has the right to control the manner and means of accomplishing the result desired, balanced against secondary factors including distinct occupation, supervision, skill, tool provision, and duration.",
  },
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
    a: "The penalties are severe. Civil penalties range from $5,000 to $15,000 per violation under California Labor Code § 226.8 for willful misclassification; if the employer is found to have engaged in a pattern or practice (模式性或惯常性违规) of violations, civil penalties increase up to $25,000 per violation. In addition, employers face retroactive liability for unpaid overtime, meal breaks, and statutory tax deficiencies, penalties, and interest to the Employment Development Department (EDD).",
  },
];

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'California ABC Test & Borello Test Compliance Checker',
  url: 'https://indielegalterms.com/tools/ca-contractor-laws',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free interactive compliance tool auditing California AB5 ABC test, Borello test, and SB 988 freelance worker rules, including misclassification penalty calculation.',
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([webAppJsonLd, faqJsonLd]) }}
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
          California ABC Test & Borello Test Checker
          <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/60">
            AB5 Independent Contractor Compliance Tool
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

      {/* ── Cost comparison: 1099 vs W-2 true cost + misclassification exposure ── */}
      <section id="cost-calculator" className="max-w-4xl mx-auto px-6 mb-16">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Now run the numbers
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            What Does This Worker Actually Cost You in California?
          </h2>
          <p className="text-base text-text-primary/60 mt-2 max-w-2xl leading-relaxed">
            A 1099 hire looks cheaper on paper. This calculator shows the real gap between 1099
            and W-2 costs under 2026 California rates — and what that gap can turn into if the
            audit above flagged high risk.
          </p>
        </div>
        <MisclassificationCostCalculator />
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
              href="/tools/irs-20-point-checklist"
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
              href="/tools/ca-demand-letter-template"
              className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap w-fit"
            >
              ✉️ Write Demand Letter →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Statutory analysis: ABC vs Borello, § 2778, EDD Audits, and SB 988 ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <CaContractorLawLegalDepth />
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
            href="/contracts/generator"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Contract Generator</p>
            <p className="text-xs text-text-primary/60 leading-relaxed">
              Build an SB 988 compliant freelance agreement in 60 seconds.
            </p>
          </Link>
          <Link
            href="/tools/ca-demand-letter-template"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Demand Letter Generator</p>
            <p className="text-xs text-text-primary/60 leading-relaxed">
              Already unpaid? Send a formal SB 988 demand letter today.
            </p>
          </Link>
          <Link
            href="/tools/ca-late-payment-calculator"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Penalty Calculator</p>
            <p className="text-xs text-text-primary/60 leading-relaxed">
              Calculate double-damages exposure for a late payment.
            </p>
          </Link>
        </div>

        {/* Reverse link out to the new multi-state cluster — this page only
            covers California; hiring elsewhere needs the state hub. */}
        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-indigo-900 font-semibold">
            Hiring outside California? Check rules for other states.
          </p>
          <Link
            href="/compliance"
            className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            Independent Contractor Laws by State →
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
