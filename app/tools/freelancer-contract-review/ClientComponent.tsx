'use client';

import Link from 'next/link';
import AiContractReviewTool from '@/components/tools/AiContractReviewTool';

export default function FreelancerContractReviewClient() {
    return (
        <section className="space-y-6 pt-6">
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold text-text-lavender uppercase tracking-widest">
                    AI Contract Review
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center">
                Free AI Contract Review for Freelancers
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Paste a freelance or contractor agreement and get an AI risk report: unfair indemnity, IP traps, non-competes, missing payment terms. 1 free review.
            </p>

            {/* ── Free AI Contract Review (hero tool) ── */}
            <div className="px-4 mt-8 space-y-4">
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

                {/* ── 5 Risk Categories ── */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Five contract risks the AI flags</h2>
                    <p className="text-text-primary/75">
                        Every review scans your agreement for the five clause areas that most often cost freelancers money or leverage:
                    </p>
                    <ul className="space-y-3 text-text-primary/80">
                        <li className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong>1. Payment terms &amp; late-payment exposure:</strong> Flags long net-60/90 windows, subjective acceptance or pay-when-paid triggers, and missing late-fee protections (you can also check unpaid-invoice exposure in our{' '}
                            <Link href="/tools/late-payment-calculator" className="text-primary-lavender font-semibold hover:underline">
                                late payment calculator
                            </Link>{' '}
                            or{' '}
                            <Link href="/contracts/penalty-for-not-paying-independent-contractor-ca" className="text-primary-lavender font-semibold hover:underline">
                                late payment penalty guide
                            </Link>
                            ).
                        </li>
                        <li className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong>2. IP ownership &amp; transfer timing:</strong> Catches clauses that assign copyright or your pre-existing templates upon creation instead of only after full payment clears.
                        </li>
                        <li className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong>3. Indemnification &amp; liability:</strong> Spots one-sided, uncapped hold-harmless language that shifts the client&apos;s legal and financial risks onto you.
                        </li>
                        <li className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong>4. Non-competes &amp; restrictive covenants:</strong> Highlights overbroad non-compete, exclusivity, or non-solicitation clauses that restrict you from taking future client work.
                        </li>
                        <li className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong>5. Termination &amp; kill-fee terms:</strong> Flags at-will termination without notice or missing payment protections for work already completed or in progress.
                        </li>
                    </ul>
                </section>

                {/* ── Sample Report ── */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Sample AI review report</h2>
                    <p className="text-text-primary/75">
                        Here is an example of how the tool flags a risky clause and gives you replacement wording you can send straight to your client:
                    </p>
                    <div className="rounded-2xl border border-red-200 bg-white p-6 space-y-3 shadow-soft">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                                High risk
                            </span>
                            <span className="font-bold text-gray-900">
                                Delayed &amp; subjective payment trigger (60 days after acceptance)
                            </span>
                        </div>
                        <blockquote className="border-l-4 border-gray-200 pl-3 text-sm italic text-gray-600">
                            &ldquo;Client shall pay Contractor within 60 days after Client&apos;s final acceptance of the Deliverables.&rdquo;
                        </blockquote>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Tying a 60-day payment clock to &ldquo;final acceptance&rdquo; lets the client delay payment indefinitely by withholding or stalling approval, and leaves you waiting two months after delivery.
                        </p>
                        <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-3 leading-relaxed">
                            <strong>Suggested fix:</strong> &ldquo;Client shall pay each invoice within 15 days of receipt (and no later than 30 days). Deliverables are deemed accepted if Client does not send specific written revision requests within 5 business days of delivery.&rdquo;
                        </p>
                    </div>
                </section>

                {/* ── Supported Contract Types ── */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">What contracts you can review</h2>
                    <p className="text-text-primary/75">
                        The reviewer is built for general commercial and freelance agreements across <strong>any U.S. state</strong> (not limited to California):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-primary/80">
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong className="text-text-primary">Freelance Agreements</strong>
                            <p className="text-xs text-text-primary/65 mt-1">Client-drafted project or service agreements for designers, writers, developers, and consultants.</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong className="text-text-primary">Independent Contractor Agreements</strong>
                            <p className="text-xs text-text-primary/65 mt-1">Standard 1099 contractor contracts covering deliverables, IP, indemnity, and termination.</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong className="text-text-primary">Statements of Work (SOW)</strong>
                            <p className="text-xs text-text-primary/65 mt-1">Scope, milestone, revision-cap, and acceptance schedules attached to a master agreement.</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <strong className="text-text-primary">NDAs &amp; Retainer Agreements</strong>
                            <p className="text-xs text-text-primary/65 mt-1">Confidentiality terms, non-solicitation reach, recurring monthly retainers, and notice periods.</p>
                        </div>
                    </div>
                </section>

                {/* ── Tool FAQs ── */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently asked questions</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-lg font-bold mb-2">Is the AI contract review really free?</h3>
                            <p className="text-text-primary/70 text-sm leading-relaxed">
                                Yes. Your first contract review is free with no sign-up required. If you need additional reviews afterward, you can sign in or purchase credits.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-lg font-bold mb-2">Will my contract text be saved or stored?</h3>
                            <p className="text-text-primary/70 text-sm leading-relaxed">
                                No. We do not save your contract text. Your agreement is sent to our AI provider solely to generate your report and is not stored by IndieLegal.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-lg font-bold mb-2">Can the tool read PDF or Word (.docx) files?</h3>
                            <p className="text-text-primary/70 text-sm leading-relaxed">
                                Direct PDF and Word uploads are not supported yet. You can upload <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">.txt</code> or <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">.md</code> files, or simply open your PDF/Word contract, select all text (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">Ctrl/Cmd + A</code>), copy, and paste it into the review box (300 to 30,000 characters).
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-lg font-bold mb-2">How accurate is the review—especially on payment terms?</h3>
                            <p className="text-text-primary/70 text-sm leading-relaxed">
                                The AI is designed to catch common structural risks—such as delayed payment triggers, premature IP assignment, uncapped indemnity, and overbroad non-competes—and draft practical replacement wording. Still, AI can miss nuance or misread context, so always double-check critical terms. If a payment term is already overdue, check potential exposure with our{' '}
                                <Link href="/tools/late-payment-calculator" className="text-primary-lavender font-semibold hover:underline">
                                    late payment calculator
                                </Link>{' '}
                                or see our{' '}
                                <Link href="/contracts/penalty-for-not-paying-independent-contractor-ca" className="text-primary-lavender font-semibold hover:underline">
                                    contractor late-payment penalty guide
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-lg font-bold mb-2">Is this review legal advice?</h3>
                            <p className="text-text-primary/70 text-sm leading-relaxed">
                                No. This tool provides general informational risk screening only. It does not create an attorney-client relationship and is not a substitute for advice from a licensed attorney.
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
                        <strong>Disclaimer:</strong> This AI contract review is provided for informational purposes only and does not constitute formal legal counsel. Always consult a licensed attorney for binding legal agreements. The AI contract review may miss issues or misread context and is not a substitute for legal advice.
                    </p>
                </div>
            </div>
        </section>
    );
}
