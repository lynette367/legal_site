'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tool {
    id: number;
    title: string;
    seoDesc: string;
    longTail: string;
    steps: string[];
    riskPoints: string[];
}

export default function FreelancerContractReviewClient() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const tool: Tool = {
        id: 3,
        title: 'Freelance Contract Checklist & Risk Guide',
        seoDesc: 'Self-check your independent contractor agreement against common California compliance risks, IP ownership pitfalls, and payment terms.',
        longTail: 'California independent contractor contract checklist',
        steps: [
            'Work State: California / Remote / Other',
            'Payment Mode: Fixed / Hourly / Milestone',
            'IP Ownership: Client / Shared / Freelancer'
        ],
        riskPoints: ['Misclassification risks under California AB5 ABC test', 'Ambiguous IP transfer and copyright assignment clauses', 'Uncapped indemnification and liability terms']
    };

    const handleSelect = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setResult(tool.riskPoints);
            }, 800);
        }
    };

    return (
        <section className="space-y-6 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold text-text-lavender uppercase tracking-widest mx-auto">
                Contract Compliance Checklist
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center">
                Freelance Contract Checklist &amp; Risk Guide
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Self-check your independent contractor agreement against common California compliance risks, IP ownership pitfalls, and missing payment protections.
            </p>

            <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
                <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

                {isLoading ? (
                    <div className="py-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                        <p className="mt-4 text-primary-lavender font-medium">Evaluating Contract Risk Factors...</p>
                    </div>
                ) : result ? (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-green-700 text-center">✅ Checklist Evaluation Complete</h4>
                        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                            <p className="font-bold text-gray-800 mb-3">Key Risk Factors to Review:</p>
                            <ul className="space-y-2">
                                {result.map((point: string, i: number) => (
                                    <li key={i} className="text-sm text-red-600 flex items-start">
                                        <span className="mr-2">⚠️</span> {point}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => router.push(`/contracts/generator`)}
                                className="w-full mt-6 py-4 bg-primary-lavender text-white rounded-xl font-bold shadow-lg hover:bg-primary-lavender-dark transition-colors"
                            >
                                Generate a Compliant Agreement →
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-xs font-bold text-primary-lavender uppercase tracking-wider mb-2">Step {step} of 3</p>
                        <h4 className="text-lg font-medium mb-6">
                            {tool.steps[step - 1].includes(':') 
                                ? tool.steps[step - 1].split(':')[0] 
                                : 'Question'}
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            {(() => {
                                const stepContent = tool.steps[step - 1];
                                if (!stepContent) return null;
                                
                                const optionsPart = stepContent.includes(':') 
                                    ? stepContent.split(':')[1] 
                                    : stepContent;
                                const options = optionsPart.split('/');
                                
                                return options.map((opt: string) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleSelect()}
                                        className="py-4 px-6 bg-white border border-gray-200 rounded-xl hover:border-primary-lavender hover:bg-primary-lavender/5 text-left font-medium transition-all"
                                    >
                                        {opt.trim()}
                                    </button>
                                ));
                            })()}
                        </div>
                    </div>
                )}
            </div>

            {/* SEO Content Section */}
            <div className="max-w-3xl mx-auto mt-20 space-y-12">
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
                        <li><strong>Senate Bill 988 (Civil Code § 18100+):</strong> The Freelance Worker Protection Act mandates written contracts for engagements over $250 and statutory 30-day payment deadlines.</li>
                        <li><strong>Civil Code § 3289(b):</strong> Grants 10% statutory simple interest per annum on past-due commercial balances when contracts lack agreed interest rates.</li>
                        <li><strong>IP Assignment Protections:</strong> Standard work-for-hire clauses must clarify whether rights transfer upon contract execution or only upon full invoice payment.</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How Our Contract Checklist &amp; Risk Guide Works</h2>
                    <p className="text-text-primary/80">
                        Use this 3-step self-assessment guide to audit key contract terms:
                    </p>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li><strong>Select jurisdiction and location:</strong> Check whether California statutory protections apply to your client relationship.</li>
                        <li><strong>Audit payment schedule terms:</strong> Verify milestone deadlines against statutory Net-30 limits.</li>
                        <li><strong>Review intellectual property ownership:</strong> Confirm that work product rights transfer only after payment clearance.</li>
                        <li><strong>Take corrective action:</strong> Update agreement language using our compliant contract generator.</li>
                    </ol>
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
                            <h3 className="font-bold text-text-primary">California Contractor Agreement Generator</h3>
                            <p className="text-sm text-text-primary/70 mt-1">Generate a legally compliant, customizable independent contractor agreement in minutes.</p>
                        </Link>
                        <Link href="/tools/ca-contractor-laws" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all block">
                            <h3 className="font-bold text-text-primary">California ABC Test &amp; Borello Checker</h3>
                            <p className="text-sm text-text-primary/70 mt-1">Test your contractor classification against state labor laws and EDD audit standards.</p>
                        </Link>
                    </div>
                </section>

                <div className="bg-gray-50 rounded-2xl p-6 text-left">
                    <p className="text-sm text-text-primary/60">
                        <strong>Disclaimer:</strong> This self-assessment checklist and compliance guide is provided for informational purposes only and does not constitute formal legal counsel. Always consult a licensed California attorney for binding legal agreements.
                    </p>
                </div>
            </div>
        </section>
    );
}