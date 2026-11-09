'use client';

import Link from 'next/link';
import AiContractReviewTool from '@/components/tools/AiContractReviewTool';
import ComplianceStepper from './ComplianceStepper';

export default function FreelancerContractReviewClient() {
    return (
        <section className="space-y-6 pt-6">
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold text-text-lavender uppercase tracking-widest">
                    Contract Compliance Checklist
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center">
                Freelance Contract Checklist &amp; Risk Guide
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Self-check your independent contractor agreement against common California compliance risks, IP ownership pitfalls, and missing payment protections.
            </p>

            {/* ── Free AI Contract Review (hero tool) ── */}
            <div className="px-4 mt-12 space-y-4">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Free AI Contract Review</h2>
                    <p className="max-w-2xl mx-auto text-text-primary/60">
                        Paste your agreement and get an AI risk report in under a minute.
                    </p>
                </div>
                <AiContractReviewTool />
                <p className="max-w-2xl mx-auto text-xs text-text-primary/50 text-center">
                    Your first review is free, no sign-up required. Contract text is used only to generate your report and is not stored.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="max-w-3xl mx-auto mt-20 space-y-12 px-4">
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How the AI contract review works</h2>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li><strong>Paste your contract:</strong> Copy the full agreement text from your PDF, Word file or email into the review box.</li>
                        <li><strong>AI flags risky clauses:</strong> Payment terms, IP ownership, indemnification, termination and non-competes are ranked by severity, along with missing protections.</li>
                        <li><strong>Get suggested edits:</strong> Each flagged clause comes with replacement wording you can send back to your client, or start fresh with our <Link href="/contracts/generator" className="text-primary-lavender font-semibold hover:underline">contract generator</Link>.</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Quick Compliance Self-Check</h2>
                    <p className="text-text-primary/80">
                        No contract text yet? Answer three quick questions to see the key risk factors to look for.
                    </p>
                    <ComplianceStepper />
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">What is a Freelance Contract Checklist?</h2>
                    <p className="text-text-primary/80">
                        A freelance contract checklist provides a systematic approach for evaluating independent contractor agreements before signing. For California businesses and freelancers, careful review is critical due to strict statutory compliance requirements under Assembly Bill 5 (AB5) and the Freelance Worker Protection Act (SB 988).
                    </p>
                    <p className="text-text-primary/80">
                        Running through a standardized legal checklist helps avoid client payment disputes, ensure timely compensation deadlines, and prevent unintended transfer of intellectual property rights.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Key California Labor Laws for Freelancers</h2>
                    <p className="text-text-primary/80">
                        California has specific legal standards that govern independent contractor relationships:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
                        <li><strong>Assembly Bill 5 (AB5) / Labor Code § 2775:</strong> Establishes the three-prong ABC test for determining independent contractor status versus statutory employee classification.</li>
                        <li><strong>Senate Bill 988 (Business &amp; Professions Code § 18100+):</strong> The Freelance Worker Protection Act mandates written contracts for engagements over $250 and statutory 30-day payment deadlines.</li>
                        <li><strong>Civil Code § 3289(b):</strong> Grants 10% statutory simple interest per annum on past-due commercial balances when contracts lack agreed interest rates.</li>
                        <li><strong>IP Assignment Protections:</strong> Standard work-for-hire clauses must clarify whether rights transfer upon contract execution or only upon full invoice payment.</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About Freelancer Contracts</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What is the ABC test under AB5?</h3>
                            <p className="text-text-primary/70">
                                The ABC test is California&apos;s standard used to determine whether a worker is an independent contractor or an employee. Under California Labor Code § 2775, a hiring entity must prove all three prongs: (A) Freedom from control and direction; (B) Work performed is outside the usual course of the hiring business; and (C) Worker is customarily engaged in an established trade.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What essential terms must be in a California freelance contract?</h3>
                            <p className="text-text-primary/70">
                                Under California SB 988, written agreements for contracts of $250 or more must specify the parties&apos; identities, an itemized list of services, the compensation rate, the payment deadline (or a statutory 30-day default), and the method of delivery.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">How can freelancers protect their intellectual property rights?</h3>
                            <p className="text-text-primary/70">
                                Ensure your agreement specifies that copyright assignment and license grants are contingent upon receipt of full payment in cleared funds, and reserve non-exclusive rights to display deliverables in professional portfolios.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/contracts/generator" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all block">
                            <h3 className="font-bold text-text-primary">Independent Contractor Agreement Generator</h3>
                            <p className="text-sm text-text-primary/70 mt-1">Generate a customizable independent contractor agreement in minutes.</p>
                        </Link>
                        <Link href="/tools/ca-contractor-laws" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all block">
                            <h3 className="font-bold text-text-primary">California ABC Test &amp; Borello Checker</h3>
                            <p className="text-sm text-text-primary/70 mt-1">Test your contractor classification against state labor laws and EDD audit standards.</p>
                        </Link>
                    </div>
                </section>

                <div className="bg-gray-50 rounded-2xl p-6 text-left">
                    <p className="text-sm text-text-primary/60">
                        <strong>Disclaimer:</strong> This self-assessment checklist and compliance guide is provided for informational purposes only and does not constitute formal legal counsel. Always consult a licensed California attorney for binding legal agreements. The AI contract review may miss issues or misread context and is not a substitute for legal advice.
                    </p>
                </div>
            </div>
        </section>
    );
}
