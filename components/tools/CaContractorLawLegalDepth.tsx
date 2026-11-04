// components/tools/CaContractorLawLegalDepth.tsx
// Pure Server Component: Authoritative legal depth analysis on AB5, ABC vs. Borello, EDD Audits, and SB 988

import Link from 'next/link';

export default function CaContractorLawLegalDepth() {
  return (
    <div className="space-y-16">

      {/* ── Module 1: ABC Test vs. Borello Test Comparison ── */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 text-sm text-text-primary/75 leading-relaxed space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Classification Standards
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
            ABC Test vs. Borello Test: Legal Standard Comparison
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-3xl leading-relaxed">
            In California, determining whether an engagement qualifies as an independent contractor
            or an employee is strictly governed by statutory law. Codified under California Labor Code
            § 2775 (originally enacted via Assembly Bill 5, AB 5) following the California Supreme
            Court&apos;s landmark decision in <em>Dynamex Operations West, Inc. v. Superior Court</em>{' '}
            (2018) 4 Cal.5th 903, the ABC Test serves as the default classification standard for
            virtually all California hiring entities.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-text-primary border-b border-gray-200">
                <th className="py-3 px-4 font-bold">Standard</th>
                <th className="py-3 px-4 font-bold">The ABC Test (Cal. Lab. Code § 2775)</th>
                <th className="py-3 px-4 font-bold">The Borello Test (48 Cal.3d 341)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Legal Origin</td>
                <td className="py-3 px-4"><em>Dynamex</em> (2018) &amp; Cal. Lab. Code § 2775</td>
                <td className="py-3 px-4"><em>S.G. Borello &amp; Sons, Inc. v. DIR</em> (1989)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Core Structure</td>
                <td className="py-3 px-4">Rigid 3-prong cumulative test (All 3 must be proven)</td>
                <td className="py-3 px-4">Totality-of-circumstances balancing test</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Primary Factor</td>
                <td className="py-3 px-4">Prong A (Control), Prong B (Core Business), Prong C (Trade)</td>
                <td className="py-3 px-4">Right to control manner and means of accomplishment</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Burden of Proof</td>
                <td className="py-3 px-4">Hiring entity must satisfy A, B, and C; presumption of employment</td>
                <td className="py-3 px-4">Flexible weighing of primary and secondary factors</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Scope of Application</td>
                <td className="py-3 px-4">Default rule for all California workers unless an express exemption applies</td>
                <td className="py-3 px-4">Statutory exemptions only (e.g., Cal. Lab. Code § 2778, § 2776)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The 3 Prongs */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-text-primary">
            The Three Cumulative Prongs of the ABC Test (Cal. Lab. Code § 2775)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                Prong A · Behavioral Control
              </span>
              <p className="font-bold text-text-primary text-sm">Cal. Lab. Code § 2775(b)(1)(A)</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The worker is free from the control and direction of the hiring entity in connection
                with the performance of the work, both under the contract for the performance of the
                work and in fact.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                Prong B · Usual Course of Business
              </span>
              <p className="font-bold text-text-primary text-sm">Cal. Lab. Code § 2775(b)(1)(B)</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The worker performs work that is outside the usual course of the hiring entity&apos;s
                business. Under the California ABC test, Prong B requires that the worker performs work
                that is outside the usual course of the hiring entity&apos;s business. A tech company
                outsourcing core product code to an individual contractor represents the quintessential
                scenario where businesses fail this prong. If any single prong fails, the worker is
                conclusively presumed to be an employee.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                Prong C · Independent Trade
              </span>
              <p className="font-bold text-text-primary text-sm">Cal. Lab. Code § 2775(b)(1)(C)</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The worker is customarily engaged in an independently established trade, occupation,
                or business of the same nature as that involved in the work performed.
              </p>
            </div>
          </div>
        </div>

        {/* The Borello Test & Exemption Note */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-base font-bold text-text-primary">
            The Borello Common-Law Right of Control Standard (48 Cal.3d 341)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The Borello standard established in <em>S.G. Borello &amp; Sons, Inc. v. Department of
            Industrial Relations</em> (1989) 48 Cal.3d 341 centers on whether the hiring entity
            possesses the &quot;right to control the manner and means of accomplishing the result
            desired.&quot; Secondary factors include the worker&apos;s investment in tools, whether the
            occupation is distinct, degree of supervision, skill required, opportunity for profit or
            loss, and duration of services.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs text-amber-900 leading-relaxed">
            <strong>Individualized Evaluation Rule:</strong> Under business-to-business (B2B)
            contracting exemptions (Cal. Lab. Code § 2776) and other statutory carve-outs, the Borello
            standard may still govern; whether an exemption applies requires an individualized,
            case-by-case determination.
          </div>
        </div>
      </section>

      {/* ── Module 2: California Labor Code § 2778 Professional Services Exemption ── */}
      <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 text-sm text-text-primary/75 leading-relaxed space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Statutory Carve-Outs
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
            California Labor Code § 2778: Professional Services Exemption Explained
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-3xl leading-relaxed">
            To relieve creative freelancers and independent specialists from the rigidity of Prong B,
            the California Legislature codified specific professional services exemptions under
            California Labor Code § 2778. When an engagement qualifies under § 2778, classification is
            governed by the flexible Borello multi-factor balancing test rather than the ABC test.
          </p>
        </div>

        {/* Covered Professions */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-base font-bold text-text-primary">
            Covered Occupations Under Cal. Lab. Code § 2778(b)(2)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The statute expressly enumerates qualifying professional service roles, including{' '}
            <Link
              href="/contracts/graphic-designer-freelance-contract-late-payment-ca"
              className="text-primary-lavender hover:underline font-semibold"
            >
              graphic design contracts
            </Link>
            ,{' '}
            <Link
              href="/contracts/bay-area-consulting-agreement-independent-contractor"
              className="text-primary-lavender hover:underline font-semibold"
            >
              independent consulting agreements
            </Link>
            , marketing involving original creative work, fine art,{' '}
            <Link
              href="/guides/photographers"
              className="text-primary-lavender hover:underline font-semibold"
            >
              photography and videography
            </Link>
            , and freelance writing or{' '}
            <Link
              href="/guides/copywriters"
              className="text-primary-lavender hover:underline font-semibold"
            >
              content creation
            </Link>
            .
          </p>
        </div>

        {/* The 6 Statutory Factors */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            The 6 Mandatory Statutory Factors Under Cal. Lab. Code § 2778(a)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Qualifying as an exempt professional service provider is not automatic. The hiring entity
            bears the statutory burden to prove that the contractor satisfies <strong>all 6</strong>{' '}
            of the following conditions set forth in California Labor Code § 2778(a)(1)–(6):
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(1)</span>
              <p className="font-semibold text-text-primary text-sm">Separate Business Location</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The individual maintains a business location, which may include the individual&apos;s
                residence, that is separate from the hiring entity.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(2)</span>
              <p className="font-semibold text-text-primary text-sm">Business License &amp; Registration</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                If work is performed more than six months after the effective date, the individual has
                a business license, in addition to any required professional licenses or permits.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(3)</span>
              <p className="font-semibold text-text-primary text-sm">Rate Negotiation Authority</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The individual has the ability to set or negotiate their own rates for the services
                performed.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(4)</span>
              <p className="font-semibold text-text-primary text-sm">Discretion Over Working Hours</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Outside of project completion dates and reasonable business hours, the individual has
                the discretion to set their own working hours.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(5)</span>
              <p className="font-semibold text-text-primary text-sm">Customary Multi-Client Trade</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The individual is customarily engaged in the same type of work performed under
                contract with other hiring entities or holds themselves out to potential clients.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(6)</span>
              <p className="font-semibold text-text-primary text-sm">Independent Judgment &amp; Discretion</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The individual customarily and regularly exercises discretion and independent judgment
                in the performance of the services.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 text-xs text-blue-950 leading-relaxed space-y-2">
          <p className="font-bold text-sm text-blue-900">
            ⚠️ Critical Scope Reminder on Payment Obligations
          </p>
          <p>
            Qualifying for the § 2778 professional services exemption and satisfying the Borello test
            only alters the legal standard for classification — it does not waive statutory payment
            obligations. Even a bona fide independent contractor is fully protected by the California
            Freelance Worker Protection Act (SB 988, Cal. Bus. &amp; Prof. Code §§ 18100–18107),
            including mandatory written contracts for engagements reaching $250 and statutory 30-day
            payment deadlines.
          </p>
        </div>
      </section>

      {/* ── Module 3: California EDD Worker Misclassification Audits ── */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 text-sm text-text-primary/75 leading-relaxed space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            State Enforcement &amp; Audits
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
            California EDD Worker Misclassification Audits: Legal Triggers &amp; Penalties
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-3xl leading-relaxed">
            The California Employment Development Department (EDD) conducts regular payroll tax audits
            to enforce worker classification compliance. If the EDD determines that an independent
            contractor was misclassified, it will assess liability for delinquent employment tax
            contributions plus mandatory statutory penalties and interest; when negligence or fraud is
            involved, statutory penalties increase significantly.
          </p>
        </div>

        {/* Audit Triggers */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            Key Audit Risk Indicators Under California Enforcement Practice
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">●</span>
              <span>
                <strong>Former Employee Conversions:</strong> Converting an existing W-2 employee into
                a 1099 independent contractor who continues performing similar duties under similar
                supervision is an immediate red flag in automated EDD audits.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">●</span>
              <span>
                <strong>Unemployment or Workers&apos; Comp Filings:</strong> When an independent
                contractor files an application for Unemployment Insurance (UI) or Disability
                Insurance after an assignment concludes, state databases automatically flag the
                unpaid payroll tax discrepancy.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">●</span>
              <span>
                <strong>Behavioral Restraints &amp; Tools:</strong> Mandating fixed daily work
                schedules, requiring exclusive full-time dedication, or furnishing corporate email
                addresses and proprietary equipment directly undermines contractor independence under
                Prong A and the Borello standard.
              </span>
            </li>
          </ul>
        </div>

        {/* Statutory Penalties */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            Statutory Penalties Under California Law (CUIC &amp; Labor Code)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                CUIC § 1127 · Negligence
              </span>
              <p className="font-bold text-text-primary text-sm">15% Penalty on Deficiency</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Under California Unemployment Insurance Code § 1127, if any part of a deficiency is
                due to negligence or intentional disregard of authorized rules and regulations, an
                additional penalty of 15% of the amount of the deficiency (tax contributions) is
                assessed.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                CUIC § 1128(a) · Fraud
              </span>
              <p className="font-bold text-text-primary text-sm">50% Penalty on Tax Assessment</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Under California Unemployment Insurance Code § 1128(a), if any part of the deficiency
                is due to fraud or an intent to evade the law, a statutory penalty of 50% of the
                assessed tax contributions is imposed.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                Cal. Lab. Code § 226.8 · Civil Fines
              </span>
              <p className="font-bold text-text-primary text-sm">$5,000 to $25,000 per Violation</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Under California Labor Code § 226.8, civil penalties range from $5,000 to $15,000 per
                violation for willful misclassification; if the Labor and Workforce Development Agency
                or a court determines the employer has engaged in a pattern or practice (模式性或惯常性违规)
                of violations, penalties increase up to $25,000 per violation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module 4: California Independent Contractor Payment Laws & SB 988 ── */}
      <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 text-sm text-text-primary/75 leading-relaxed space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Payment Compliance · SB 988
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
            California Independent Contractor Payment Laws &amp; SB 988
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-3xl leading-relaxed">
            Correctly classifying your workforce under AB5 and Borello is only half of the statutory
            equation; paying them in strict accordance with California law is the other. Under the
            California Freelance Worker Protection Act (SB 988, Cal. Bus. &amp; Prof. Code §§ 18100–18107),
            hiring entities face severe statutory liabilities for payment delays.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-4">
          <p className="font-bold text-text-primary text-sm">
            Mandatory Statutory Guardrails for California 1099 Engagements:
          </p>
          <ol className="space-y-4 list-decimal list-inside text-sm text-gray-700">
            <li className="pl-1">
              <strong className="text-text-primary">Mandatory Written Contracts ($250 Threshold):</strong>{' '}
              Under Cal. Bus. &amp; Prof. Code § 18103, any contract valued at $250 or more (individually
              or cumulatively within 120 days) must be executed in writing, specifying itemized services,
              rates, and due dates.
            </li>
            <li className="pl-1">
              <strong className="text-text-primary">30-Day Payment Deadline:</strong> Payments must be
              made on or before the contractual date, or strictly in accordance with the{' '}
              <Link
                href="/contracts/ca-1099-contractor-30-day-payment-rule"
                className="text-primary-lavender hover:underline font-semibold"
              >
                California 30-day contractor payment rule
              </Link>{' '}
              if no date is specified.
            </li>
            <li className="pl-1">
              <strong className="text-text-primary">Late Payment Penalties:</strong> Hiring parties
              that delay payments face{' '}
              <Link
                href="/contracts/penalty-for-not-paying-independent-contractor-ca"
                className="text-primary-lavender hover:underline font-semibold"
              >
                California contractor late payment penalties and double damages
              </Link>{' '}
              (statutory damages up to twice the unpaid amount under Cal. Bus. &amp; Prof. Code §
              18106(a)(2)), mandatory reasonable attorney fees, and 10% statutory interest under
              California Civil Code § 3289(b).
            </li>
          </ol>
          <div className="pt-2">
            <p className="text-xs text-gray-500 leading-relaxed">
              If your audit result flagged contract deficiencies, you can{' '}
              <Link
                href="/contracts/generator"
                className="text-primary-lavender hover:underline font-semibold"
              >
                generate an SB 988 compliant contract
              </Link>{' '}
              tailored to California statutory standards before commencing project work.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
