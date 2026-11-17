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
            In California, worker-classification standards are governed by statute and case law.
            Codified under California Labor Code § 2775(b)(1) (enacted via Assembly Bill 5, AB 5)
            following <em>Dynamex Operations West, Inc. v. Superior Court</em> (2018) 4 Cal.5th 903,
            the ABC Test applies for purposes of the California Labor Code, the Unemployment Insurance
            Code, and Industrial Welfare Commission (IWC) wage orders, subject to statutory exceptions
            and other applicable rules.
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
                <td className="py-3 px-4">Three-prong cumulative test (All 3 must be established)</td>
                <td className="py-3 px-4">Fact-specific multifactor test; no single factor controls</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Primary Factor</td>
                <td className="py-3 px-4">Prong A (Control), Prong B (Usual Course of Business), Prong C (Independent Trade)</td>
                <td className="py-3 px-4">Right to control manner and means of accomplishing the desired result</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Burden of Proof</td>
                <td className="py-3 px-4">Hiring entity must satisfy A, B, and C; otherwise employee status applies</td>
                <td className="py-3 px-4">Totality-of-circumstances evaluation of control and secondary factors</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary bg-gray-50/50">Scope of Application</td>
                <td className="py-3 px-4">Labor Code, Unemployment Insurance Code, and IWC wage orders, subject to statutory exceptions and other applicable rules</td>
                <td className="py-3 px-4">Applies under qualifying statutory provisions (including §§ 2776, 2777, 2778) and other legally recognized contexts</td>
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
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            The Borello Common-Law Multifactor Test (48 Cal.3d 341)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The Borello Test comes from{' '}
            <em>S.G. Borello &amp; Sons, Inc. v. Department of Industrial Relations</em> (1989) 48 Cal.3d 341.
            It is a fact-specific multifactor test—not a fixed numerical score or pass/fail checklist—in
            which no single factor controls. While the principal factor is whether the hiring entity
            has the &quot;right to control the manner and means of accomplishing the result desired,&quot;
            courts and agencies also evaluate additional factors, including:
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc list-inside text-xs text-gray-600 leading-relaxed">
            <li>Whether the worker is engaged in a distinct occupation or business.</li>
            <li>Whether the work is an integral or regular part of the hiring entity&apos;s business.</li>
            <li>Who supplies the instrumentalities, tools, and the place of work.</li>
            <li>The worker&apos;s investment in the equipment or materials required by the task.</li>
            <li>Whether the worker hires their own employees or helpers.</li>
            <li>The skill required in the particular occupation.</li>
            <li>Whether the work is usually done under supervision or by a specialist without supervision.</li>
            <li>The worker&apos;s opportunity for profit or loss depending on their managerial skill.</li>
            <li>The length of time for which the services are to be performed and permanence of the relationship.</li>
            <li>The method of payment, whether by the time or by the job.</li>
            <li>The hiring entity&apos;s right to terminate at will, without cause.</li>
            <li>Whether the parties believe they are creating an employer-employee relationship (relevant, though not dispositive).</li>
          </ul>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs text-amber-900 leading-relaxed">
            <strong>When Borello May Apply:</strong> Borello may apply under specific statutory
            provisions and qualifying circumstances—including, but not limited to, business-to-business
            contracting (Cal. Lab. Code § 2776), referral agency relationships (§ 2777), and qualifying
            professional services (§ 2778)—as well as other legally recognized contexts. Whether a
            statutory exception applies requires a fact-specific, case-by-case evaluation.
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
            Enumerated Categories Under Cal. Lab. Code § 2778(b)(2)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Section 2778 does not create a blanket exemption for independent consulting agreements
            generally. Only services falling within the specific categories enumerated in Cal. Lab.
            Code § 2778(b)(2)—and satisfying both the six general conditions in § 2778(a) and any
            applicable occupation-specific conditions—qualify. Enumerated categories include, subject
            to statutory limits, certain marketing services (provided the work is original and creative
            in character and depends primarily on the individual&apos;s invention, imagination, or
            talent), human resources administration, travel agent services,{' '}
            <Link
              href="/contracts/graphic-designer-freelance-contract-late-payment-ca"
              className="text-primary-lavender hover:underline font-semibold"
            >
              graphic design
            </Link>
            , grant writing, fine art, enrolled agents, payment processing agents,{' '}
            <Link
              href="/guides/photographers"
              className="text-primary-lavender hover:underline font-semibold"
            >
              qualifying still photography, photojournalism, videography, or photo editing
            </Link>
            , and{' '}
            <Link
              href="/guides/copywriters"
              className="text-primary-lavender hover:underline font-semibold"
            >
              qualifying freelance writing, translation, editing, or illustration
            </Link>
            . Not every marketing, photography, videography, writing, or content-creation engagement
            automatically qualifies.
          </p>
        </div>

        {/* The 6 Statutory Factors */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            The 6 Mandatory General Requirements Under Cal. Lab. Code § 2778(a)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Qualifying under § 2778 is not automatic. The hiring entity bears the burden to
            demonstrate that the contractor satisfies <strong>all 6</strong> of the following general
            conditions in California Labor Code § 2778(a)(1)–(6):
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(1)</span>
              <p className="font-semibold text-text-primary text-sm">Separate Business Location</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The individual maintains a business location, which may include the individual&apos;s
                residence, that is separate from the hiring entity. Nothing in this subdivision
                prohibits an individual from choosing to perform services at the location of the
                hiring entity.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono font-bold text-primary-lavender">Cal. Lab. Code § 2778(a)(2)</span>
              <p className="font-semibold text-text-primary text-sm">Business License &amp; Registration</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                If work is performed more than six months after the effective date of § 2778 and the
                work is performed in a jurisdiction that requires the individual to have a business
                license or business tax registration, the individual has the required license or
                registration, in addition to any required professional licenses or permits.
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

        {/* Occupation-Specific Requirements */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            Occupation-Specific Statutory Requirements Under Cal. Lab. Code § 2778(b)(2)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For certain creative and media occupations, satisfying the six general requirements in §
            2778(a) is <strong>not enough</strong>—the statute also imposes additional
            occupation-specific conditions. These extra conditions apply <strong>in addition to</strong>{' '}
            (and do not replace) the six general § 2778(a) requirements:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender">
                Cal. Lab. Code § 2778(b)(2)(I)
              </span>
              <p className="font-semibold text-text-primary text-sm">
                Still Photographers, Photojournalists, Videographers &amp; Photo Editors
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 leading-relaxed">
                <li>
                  Services are provided under a written contract specifying the rate of pay and
                  obligation to pay by a defined time (as well as covered digital content aggregator
                  arrangements where applicable).
                </li>
                <li>
                  The individual does not directly replace an employee who performed the same work at
                  the same volume for the hiring entity.
                </li>
                <li>
                  The individual does not primarily perform the work at the hiring entity&apos;s
                  business location.
                </li>
                <li>
                  The individual is not restricted from working for more than one hiring entity.
                </li>
                <li>
                  <strong>Motion-picture exclusion:</strong> Does not apply to a still photographer,
                  photojournalist, videographer, or photo editor who works on motion pictures
                  (including theatrical or commercial productions, broadcast news, television, and
                  music videos).
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-primary-lavender">
                Cal. Lab. Code § 2778(b)(2)(J)
              </span>
              <p className="font-semibold text-text-primary text-sm">
                Freelance Writers, Translators, Editors, Copy Editors, Illustrators &amp; Newspaper Cartoonists
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 leading-relaxed">
                <li>
                  Services are provided under a written contract specifying the rate of pay,
                  intellectual property rights, and the obligation to pay by a defined time.
                </li>
                <li>
                  The individual does not directly replace an employee who performed the same work at
                  the same volume for the hiring entity.
                </li>
                <li>
                  The individual does not primarily perform the work at the hiring entity&apos;s
                  business location.
                </li>
                <li>
                  The individual is not restricted from working for more than one hiring entity.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-primary-lavender">
              2026 Statutory Update · AB 1514 (Cal. Lab. Code §§ 2778 &amp; 2783)
            </span>
            <p className="font-semibold text-text-primary text-sm">
              Additional Enumerated Categories, Conditions &amp; Sunset Dates
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Other categories enumerated in § 2778(b)(2)—such as licensed estheticians,
              electrologists, barbers, cosmetologists, manicurists, real estate appraisers,
              specialized performers, and home inspectors—carry their own statutory conditions in
              addition to § 2778(a). Effective January 1, 2026, <strong>AB 1514</strong> (Stats.
              2025, ch. 305) amended Labor Code §§ 2778 and 2783 to extend the sunset date for{' '}
              <strong>licensed manicurists</strong> under § 2778(b)(2) until{' '}
              <strong>January 1, 2029</strong> (subject to strict statutory conditions including
              setting own rates, controlling hours, and receiving client payments directly) and to
              extend the separate exemption for <strong>commercial fishers</strong> working on
              American vessels under § 2783 until <strong>January 1, 2031</strong>.
            </p>
          </div>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 text-xs text-blue-950 leading-relaxed space-y-2">
          <p className="font-bold text-sm text-blue-900">
            ⚠️ Critical Scope Reminder: Classification vs. Payment Protections
          </p>
          <p>
            Qualifying for the § 2778 professional services exception and satisfying the Borello
            multifactor test only addresses worker classification—it is separate from California&apos;s
            payment-protection law. When an engagement involves a covered &quot;freelance worker&quot;
            and a covered &quot;hiring party&quot; under the Freelance Worker Protection Act (SB 988,
            Cal. Bus. &amp; Prof. Code §§ 18100–18107), SB 988 requires a written contract and timely
            payment within the statutory framework.
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
            California EDD Worker Misclassification Considerations &amp; Statutory Penalties
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-3xl leading-relaxed">
            The California Employment Development Department (EDD) administers payroll tax compliance
            and conducts employment tax audits. If the EDD determines that a worker was
            misclassified, it may assess delinquent employment tax contributions along with
            statutory penalties and interest.
          </p>
        </div>

        {/* Audit Risk Considerations */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-text-primary">
            Facts That May Raise Classification Questions
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">●</span>
              <span>
                <strong>Former Employee Conversions:</strong> Reclassifying an existing W-2 employee
                into a 1099 independent contractor who continues performing similar duties under
                similar supervision may raise classification questions depending on the full
                working relationship, though it does not by itself determine status.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">●</span>
              <span>
                <strong>Unemployment or Disability Insurance Claims:</strong> When a worker files a
                claim for Unemployment Insurance (UI) or State Disability Insurance (SDI) after an
                engagement ends, the agency may review the underlying working relationship, depending
                on the full facts.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">●</span>
              <span>
                <strong>Behavioral Control &amp; Tools:</strong> Mandating fixed daily work schedules,
                requiring exclusive full-time dedication, or furnishing corporate email addresses and
                proprietary equipment can undermine contractor independence under Prong A and the
                Borello multifactor standard.
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
                Cal. Lab. Code § 226.8 · Civil Fines (2026)
              </span>
              <p className="font-bold text-text-primary text-sm">$5,000–$15,000 / $10,000–$25,000</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Under California Labor Code § 226.8 (effective January 1, 2026), if the Labor and
                Workforce Development Agency (LWDA) or a court determines that a person or employer
                has engaged in an enumerated violation—including willful misclassification—civil
                penalties are <strong>$5,000 to $15,000 per violation</strong> (§ 226.8(b)), or{' '}
                <strong>$10,000 to $25,000 per violation</strong> if the agency or court determines
                there is a pattern or practice of these violations (§ 226.8(c)). A preliminary
                screening result from this website does not trigger these penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module 4: California Freelance Worker Protection Act (SB 988) ── */}
      <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 text-sm text-text-primary/75 leading-relaxed space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Payment Protections · SB 988
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
            California Freelance Worker Protection Act (SB 988): Coverage &amp; Payment Rules
          </h2>
          <p className="text-base text-text-primary/70 mt-2 max-w-3xl leading-relaxed">
            SB 988 (Cal. Bus. &amp; Prof. Code §§ 18100–18107) is a payment-protection statute—not a
            worker-classification test. Under Cal. Bus. &amp; Prof. Code § 18101, a covered
            &quot;freelance worker&quot; is an individual or organization composed of no more than one
            person, retained as a bona fide independent contractor to provide &quot;professional
            services&quot; (as defined in Labor Code § 2778(b)(2)), for compensation of at least
            $250 under a single contract or aggregated with the same hiring party during the
            immediately preceding 120 days, subject to the statutory definition of &quot;hiring
            party&quot; and its exclusions (such as federal, state, and foreign governments, and
            individuals hiring for personal, family, or homestead benefit).
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-4">
          <p className="font-bold text-text-primary text-sm">
            Statutory Requirements for Covered SB 988 Engagements:
          </p>
          <ol className="space-y-4 list-decimal list-inside text-sm text-gray-700">
            <li className="pl-1">
              <strong className="text-text-primary">Written Contract ($250 Covered Threshold):</strong>{' '}
              For engagements covered by the Act, Cal. Bus. &amp; Prof. Code § 18103 requires a
              written contract when compensation is $250 or more (individually or aggregated over the
              preceding 120 days with the same hiring party), specifying itemized services, rates,
              and payment dates.
            </li>
            <li className="pl-1">
              <strong className="text-text-primary">30-Day Default Payment Deadline:</strong> Under
              Cal. Bus. &amp; Prof. Code § 18102, payment is due on or before the date specified in
              the contract, or—if no date is specified—no later than 30 days after completion of the
              services, as explained in our guide on the{' '}
              <Link
                href="/contracts/ca-1099-contractor-30-day-payment-rule"
                className="text-primary-lavender hover:underline font-semibold"
              >
                California 30-day contractor payment rule
              </Link>
              .
            </li>
            <li className="pl-1">
              <strong className="text-text-primary">Statutory Remedies &amp; Interest:</strong> Under
              Cal. Bus. &amp; Prof. Code § 18106(b), a prevailing plaintiff in an action under the Act
              is entitled to reasonable attorney&apos;s fees and costs, injunctive relief, and other
              appropriate remedies. Specifically: (1) under <strong>§ 18106(b)(1)</strong>, if the
              freelance worker requested a written contract prior to commencing work and the hiring
              party refused in violation of § 18103, the worker shall be awarded an additional{' '}
              <strong>$1,000</strong> in statutory damages; and (2) under{' '}
              <strong>§ 18106(b)(2)</strong>, for qualifying late-payment violations under § 18102,
              damages may be awarded up to <strong>twice the amount that remained unpaid</strong> at
              the time payment was due (see our overview of{' '}
              <Link
                href="/contracts/penalty-for-not-paying-independent-contractor-ca"
                className="text-primary-lavender hover:underline font-semibold"
              >
                California contractor late-payment remedies
              </Link>
              ). Double damages, the $1,000 refusal remedy, and attorney&apos;s fees require
              satisfying the statute&apos;s specific conditions and are not automatically granted for
              every late payment. Separately, California Civil Code § 3289(b) provides a 10% annual
              contractual interest rate only when its statutory conditions are met, including a
              qualifying contract with no stipulated legal rate and a breach.
            </li>
          </ol>
          <div className="pt-2">
            <p className="text-xs text-gray-500 leading-relaxed">
              For engagements covered by SB 988, you can{' '}
              <Link
                href="/contracts/generator"
                className="text-primary-lavender hover:underline font-semibold"
              >
                generate an SB 988 written contract
              </Link>{' '}
              tailored to California&apos;s statutory elements before project work begins.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
