'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        title: 'Freelancer Contract Review',
        seoDesc: 'Instantly detect risky clauses in freelancer and independent contractor agreements.',
        longTail: 'California independent contractor contract review',
        steps: [
            'Work State: California / Remote / Other',
            'Payment Mode: Fixed / Hourly / Milestone',
            'IP Ownership: Client / Shared / Freelancer'
        ],
        riskPoints: ['Misclassification risks under AB5', 'Ambiguous IP transfer clauses', 'Indemnification loops']
    };

    const handleSelect = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setResult(tool.riskPoints);
            }, 1500);
        }
    };

    return (
        <section className="space-y-6 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold text-text-lavender uppercase tracking-widest mx-auto">
                AI Legal Tool
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center">
                Freelancer Contract Review
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Instantly detect risky clauses in freelancer and independent contractor agreements. Protect your rights as a freelancer or client.
            </p>

            <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
                <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

                {isLoading ? (
                    <div className="py-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                        <p className="mt-4 text-primary-lavender font-medium">AI Analyzing Contract Clauses...</p>
                    </div>
                ) : result ? (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-green-700 text-center">✅ Analysis Ready</h4>
                        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                            <p className="font-bold text-gray-800 mb-3">Key Risk Alerts:</p>
                            <ul className="space-y-2">
                                {result.map((point: string, i: number) => (
                                    <li key={i} className="text-sm text-red-600 flex items-start">
                                        <span className="mr-2">⚠️</span> {point}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => router.push(`/pricing?tool=${encodeURIComponent(tool.title)}`)}
                                className="w-full mt-6 py-4 bg-primary-lavender text-white rounded-xl font-bold shadow-lg hover:bg-primary-lavender-dark transition-colors"
                            >
                                Unlock My Report
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
                    <h2 className="text-3xl font-bold text-text-primary">What is Freelancer Contract Review?</h2>
                    <p className="text-text-primary/80">
                        Freelancer contract review is the process of examining independent contractor agreements to identify potential risks, ensure legal compliance, and protect the rights of both parties. For California businesses and freelancers, this is especially important due to the state&lsquo;s strict labor laws, including AB5.
                    </p>
                    <p className="text-text-primary/80">
                        A thorough contract review can help prevent disputes, ensure fair compensation, and protect intellectual property rights.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Key California Labor Laws for Freelancers</h2>
                    <p className="text-text-primary/80">
                        California has specific laws that affect independent contractor relationships:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
                        <li>Assembly Bill 5 (AB5): Establishes the ABC test for determining employee vs. independent contractor status</li>
                        <li>Minimum wage and overtime requirements</li>
                        <li>Worker&lsquo;s compensation requirements</li>
                        <li>Tax reporting obligations</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How Our Freelancer Contract Review Tool Works</h2>
                    <p className="text-text-primary/80">
                        Our tool helps you review and analyze freelancer contracts:
                    </p>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li>Select your work state and payment mode</li>
                        <li>Indicate the IP ownership arrangement</li>
                        <li>Receive a comprehensive risk analysis</li>
                        <li>Get recommendations for contract improvements</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About Freelancer Contracts</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What is the ABC test under AB5?</h3>
                            <p className="text-text-primary/70">
                                The ABC test is used to determine if a worker is an independent contractor or employee. To be classified as an independent contractor, the worker must:
                                <br />A. Be free from the control and direction of the hiring entity
                                <br />B. Perform work that is outside the usual course of the hiring entity&lsquo;s business
                                <br />C. Be customarily engaged in an independently established trade, occupation, or business
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What should be included in a freelancer contract?</h3>
                            <p className="text-text-primary/70">
                                A comprehensive freelancer contract should include scope of work, payment terms, project timeline, IP ownership, confidentiality provisions, dispute resolution, and termination clauses.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">How can I protect my intellectual property as a freelancer?</h3>
                            <p className="text-text-primary/70">
                                Clearly define IP ownership in your contract, specify whether you retain any rights to your work, and consider including a clause that allows you to use the work in your portfolio.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/tools/california-freelance-legal-templates" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">California Freelance Legal Templates</h3>
                            <p className="text-sm text-text-primary/70">Access ready-to-use legal templates for California freelancers.</p>
                        </a>
                        <a href="/tools/ai-copyright-filing" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">AI-generated Content Copyright Filing</h3>
                            <p className="text-sm text-text-primary/70">Protect your creative works with proper copyright filing.</p>
                        </a>
                    </div>
                </section>

                <div className="bg-gray-50 rounded-2xl p-6 text-left">
                    <p className="text-sm text-text-primary/60">
                        <strong>Disclaimer:</strong> This tool provides AI-generated templates for informational purposes only. It is not legal advice. Consult a licensed California attorney.
                    </p>
                </div>
            </div>
        </section>
    );
}