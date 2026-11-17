import { Metadata } from 'next';
import Link from 'next/link';
import ContractorAuditTool from '../../../components/tools/ContractorAuditTool';
import MisclassificationCostCalculator from '../../../components/tools/MisclassificationCostCalculator';
import CaContractorLawLegalDepth from '../../../components/tools/CaContractorLawLegalDepth';

export const metadata: Metadata = {
  title: 'California ABC Test & Borello Test Checker',
  description:
    "Understand California's ABC Test, when a statutory exception may allow the Borello Test, and review key independent contractor classification factors.",
  alternates: { canonical: 'https://indielegalterms.com/tools/ca-contractor-laws' },
  openGraph: {
    title: 'California ABC Test & Borello Test Checker | Indie Legal',
    description:
      "Understand California's ABC Test, when a statutory exception may allow the Borello Test, and review key independent contractor classification factors.",
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
          Under California Labor Code § 2775(b)(1), the ABC Test applies for purposes of the Labor Code,
          the Unemployment Insurance Code, and Industrial Welfare Commission (IWC) wage orders, subject
          to statutory exceptions and other applicable rules. Under this framework, a worker is
          considered an employee rather than an independent contractor unless the hiring entity
          demonstrates <strong>all three</strong> of the following conditions:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>A.</strong> The person is free from the control and direction of the hiring entity in connection with the performance of the work, both under the contract for the performance of the work and in fact.</li>
          <li><strong>B.</strong> The person performs work that is outside the usual course of the hiring entity’s business.</li>
          <li><strong>C.</strong> The person is customarily engaged in an independently established trade, occupation, or business of the same nature as that involved in the work performed.</li>
        </ul>
      </>
    ),
  },
  {
    q: 'What is the Borello Test?',
    a: (
      <>
        <p className="mb-2">
          The Borello Test comes from the California Supreme Court&apos;s decision in{' '}
          <em>S.G. Borello &amp; Sons, Inc. v. Department of Industrial Relations</em> (1989) 48 Cal.3d 341.
          It applies when a specific statutory exception to the ABC Test (such as qualifying professional
          services under Labor Code § 2778, business-to-business contracting under § 2776, or referral
          agencies under § 2777) or another legally recognized rule directs classification to the
          common-law test.
        </p>
        <p className="mb-2">
          Borello is a fact-specific <strong>multifactor test</strong> in which no single factor is
          controlling. The principal factor is whether the hiring entity has the <strong>right to control</strong>{' '}
          the manner and means of accomplishing the result desired, evaluated alongside additional factors such as:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Whether the worker is engaged in a distinct occupation or business.</li>
          <li>Whether the work is an integral or regular part of the hiring entity&apos;s business.</li>
          <li>Whether the principal or the worker supplies the instrumentalities, tools, and the place of work.</li>
          <li>The worker&apos;s investment in the equipment or materials required by their task or their employment of helpers/employees.</li>
          <li>Whether the service rendered requires a special skill, and whether the work is usually done under the direction of the principal or by a specialist without supervision.</li>
          <li>The worker&apos;s opportunity for profit or loss depending on their managerial skill.</li>
          <li>The length of time for which the services are to be performed and the degree of permanence of the working relationship.</li>
          <li>The method of payment, whether by time or by the job.</li>
          <li>The hiring entity&apos;s right to terminate at will, and whether the parties believe they are creating an employer-employee relationship (which may be relevant but is not dispositive).</li>
        </ul>
      </>
    ),
  },
  {
    q: 'How does federal IRS classification compare to California law?',
    a: (
      <>
        For federal tax purposes, the IRS does not use a standalone 20-point numerical score as a
        conclusive worker-classification test. Instead, the IRS applies common-law rules organized
        into three main categories of evidence: <strong>behavioral control</strong>,{' '}
        <strong>financial control</strong>, and the <strong>type of relationship</strong> between the
        parties (with the historical 20-factor revenue ruling serving as analytical background rather
        than a mechanical scoring formula). Even if an arrangement satisfies federal common-law
        standards, California state labor laws, EDD payroll taxes, and wage orders generally apply
        the stricter ABC Test unless a statutory exception applies. You can also review federal common-law
        factors using our{' '}
        <Link
          href="/tools/irs-20-point-checklist"
          className="text-primary-lavender hover:underline font-semibold"
        >
          educational IRS classification factor guide
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Can a written contract or 1099 form waive California classification rules?',
    a: "No. A contract label, a 1099 tax form, or the parties' stated agreement to an independent contractor relationship does not by itself establish independent contractor status under California law. Courts and state agencies examine the actual statutory requirements and the real-world facts of the working relationship.",
  },
  {
    q: 'What are the statutory penalties for willful misclassification in California?',
    a: (
      <>
        Under California Labor Code § 226.8 (as amended effective January 1, 2026), if the Labor and
        Workforce Development Agency (LWDA) or a court determines that a person or employer has
        engaged in an enumerated violation—such as willful misclassification of an individual as an
        independent contractor—civil penalties range from <strong>$5,000 to $15,000 per violation</strong>{' '}
        (§ 226.8(b)), or from <strong>$10,000 to $25,000 per violation</strong> if the agency or court
        determines there is a pattern or practice of these violations (§ 226.8(c)). These statutory
        penalties require a formal agency or court determination and are not automatically triggered
        by an educational screening tool. Employers may also face liability for unpaid wages,
        overtime, meal and rest premiums, and Employment Development Department (EDD) tax
        assessments. You can explore illustrative cost differences in the{' '}
        <Link href="#cost-calculator" className="text-primary-lavender hover:underline font-semibold">
          1099 vs. W-2 cost comparison calculator
        </Link>{' '}
        above, or{' '}
        <Link
          href="/contracts/generator#generator-form"
          className="text-primary-lavender hover:underline font-semibold"
        >
          draft a written freelance agreement
        </Link>{' '}
        for qualifying independent contractor engagements.
      </>
    ),
  },
];

// Plain-text mirror of FAQS for the FAQPage JSON-LD (schema requires plain text, not JSX)
const FAQS_PLAIN = [
  {
    q: 'What is the ABC Test in California?',
    a: "Under California Labor Code § 2775(b)(1), the ABC Test applies for purposes of the Labor Code, the Unemployment Insurance Code, and IWC wage orders, subject to statutory exceptions and other applicable rules. Under this framework, a worker is considered an employee unless the hiring entity demonstrates all three conditions: (A) the person is free from the control and direction of the hiring entity in connection with the performance of the work, both under the contract and in fact; (B) the person performs work that is outside the usual course of the hiring entity's business; and (C) the person is customarily engaged in an independently established trade, occupation, or business of the same nature as that involved in the work performed.",
  },
  {
    q: 'What is the Borello Test?',
    a: "The Borello Test comes from S.G. Borello & Sons, Inc. v. Department of Industrial Relations (1989) 48 Cal.3d 341 and applies when a statutory exception to the ABC Test (such as under Labor Code §§ 2776, 2777, or 2778) or another recognized rule directs classification to the common-law standard. It is a fact-specific multifactor test where no single factor controls. The principal factor is whether the hiring entity has the right to control the manner and means of accomplishing the result desired, considered alongside secondary factors including distinct occupation, whether the work is an integral or regular part of the hiring entity's business, who supplies tools and place of work, investment and hiring of helpers, skill required, supervision, opportunity for profit or loss, duration and permanence, method of payment, right to terminate, and the parties' understanding.",
  },
  {
    q: 'How does federal IRS classification compare to California law?',
    a: "For federal tax purposes, the IRS does not use a standalone 20-point numerical score as a conclusive worker-classification test. Instead, the IRS evaluates common-law rules across three categories: behavioral control, financial control, and the type of relationship (with historical 20-factor guidance serving as analytical background). Satisfying federal standards does not establish compliance with California's ABC Test under Labor Code § 2775.",
  },
  {
    q: 'Can a written contract or 1099 form waive California classification rules?',
    a: "No. A contract label, a 1099 form, or the parties' stated intention does not by itself establish independent contractor status under California law. Agencies and courts evaluate the applicable statutory requirements and actual working relationship.",
  },
  {
    q: 'What are the statutory penalties for willful misclassification in California?',
    a: "Under California Labor Code § 226.8 (effective January 1, 2026), if the Labor and Workforce Development Agency or a court determines that a person or employer has committed an enumerated violation, including willful misclassification, civil penalties are $5,000 to $15,000 per violation under § 226.8(b), or $10,000 to $25,000 per violation under § 226.8(c) when there is a determination of a pattern or practice of violations. In addition, employers may face liability for unpaid wages, overtime, meal and rest break premiums, and EDD payroll tax assessments.",
  },
];

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'California ABC Test & Borello Test Checker',
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
  'Educational screening tool for reviewing California ABC Test and Borello Test worker-classification factors and SB 988 freelance contract requirements.',
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
          California ABC Test &amp; Borello Test Checker
          <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/60">
            Independent Contractor Classification Screening Tool
          </span>
        </h1>

          <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-4 leading-relaxed">
            Review key California worker-classification factors under the ABC Test and Borello Test,
            plus separate written-contract rules under the Freelance Worker Protection Act (SB 988).
          </p>
          <p className="text-xs text-text-primary/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            <strong>Educational Screening Notice:</strong> This tool is a preliminary educational
            screening aid. It does not determine legal worker status, identify every statutory
            exception, or provide a legal opinion.
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
            A 1099 hire looks cheaper on paper. This calculator compares illustrative 1099 and W-2
            costs under 2026 California payroll tax rates and outlines potential statutory penalty
            ranges if an agency or court later determines a worker was willfully misclassified.
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
                Want to review federal factors too?
              </p>
              <p className="text-sm text-indigo-900 font-semibold leading-snug">
                Federal IRS classification uses common-law control categories rather than
                California&apos;s ABC Test. Review both federal and state factors.
              </p>
            </div>
            <Link
              href="/tools/irs-20-point-checklist"
              className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap w-fit"
            >
              🧭 Review Federal IRS Factors →
            </Link>
          </div>

          <div className="flex flex-col justify-between gap-4 bg-orange-50 border border-orange-200 rounded-2xl px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">
                Already did the work and still haven&apos;t been paid?
              </p>
              <p className="text-sm text-orange-900 font-semibold leading-snug">
                Generate a formal SB 988 payment demand letter for qualifying freelance engagements
                under Cal. Bus. &amp; Prof. Code §§ 18100–18107.
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
              <div className="px-6 pb-5 pt-1 text-sm text-text-primary/65 leading-relaxed">
                {a}
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
            Want to review the classification factors again?
          </h2>
          <p className="text-sm text-text-primary/60 mb-6 max-w-md mx-auto leading-relaxed">
            Use the preliminary educational screening tool above to review ABC Test and Borello Test
            considerations, along with separate SB 988 written-contract requirements.
          </p>
          <a
            href="#top"
            className="inline-flex items-center justify-center gap-2 bg-primary-lavender text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender-dark transition-colors text-sm"
          >
            Return to Screening Tool ↑
          </a>
        </div>
      </section>
    </div>
  );
}
