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

export default function ESGComplianceChecklistClient() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const tool: Tool = {
        id: 2,
        title: 'ESG Compliance Checklist',
        seoDesc: 'Comprehensive ESG compliance toolkit for California small businesses.',
        longTail: 'California ESG small business compliance',
        steps: [
            'Company Size: 1-10 / 11-50 / 51+',
            'Industry: Tech / Retail / Service',
            'Reporting Goal: Tax Credits / Investor / Internal'
        ],
        riskPoints: ['Inaccurate carbon footprint estimates', 'Missing California-specific disclosures', 'Inconsistent data sourcing']
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
                ESG Compliance Checklist
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Comprehensive ESG compliance toolkit for California small businesses. Ensure your business meets environmental, social, and governance standards.
            </p>

            <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
                <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

                {isLoading ? (
                    <div className="py-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                        <p className="mt-4 text-primary-lavender font-medium">AI Analyzing ESG Requirements...</p>
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
                    <h2 className="text-3xl font-bold text-text-primary">What is ESG Compliance?</h2>
                    <p className="text-text-primary/80">
                        ESG (Environmental, Social, and Governance) compliance refers to a company&lsquo;s adherence to environmental, social, and governance standards and practices. For California small businesses, ESG compliance is becoming increasingly important as regulations evolve and consumers prioritize sustainable and ethical business practices.
                    </p>
                    <p className="text-text-primary/80">
                        ESG compliance helps businesses reduce risk, improve reputation, attract investors, and access new opportunities, including tax credits and government contracts.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Key ESG Requirements for California Businesses</h2>
                    <p className="text-text-primary/80">
                        California has specific ESG requirements that businesses must consider:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
                        <li>California Environmental Quality Act (CEQA) compliance</li>
                        <li>Greenhouse gas emissions reporting requirements</li>
                        <li>Waste reduction and recycling mandates</li>
                        <li>Workplace diversity and inclusion requirements</li>
                        <li>Supply chain transparency regulations</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How Our ESG Compliance Tool Works</h2>
                    <p className="text-text-primary/80">
                        Our tool helps California small businesses navigate ESG compliance:
                    </p>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li>Select your company size and industry</li>
                        <li>Indicate your reporting goals (tax credits, investor, or internal)</li>
                        <li>Receive a customized ESG compliance checklist</li>
                        <li>Get guidance on meeting California-specific requirements</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About ESG Compliance</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">Do small businesses need to comply with ESG regulations?</h3>
                            <p className="text-text-primary/70">
                                Yes, even small businesses in California are subject to various ESG regulations, especially those related to environmental protection and labor practices. Additionally, ESG compliance can provide competitive advantages.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What are the benefits of ESG compliance for small businesses?</h3>
                            <p className="text-text-primary/70">
                                Benefits include access to tax credits, improved brand reputation, increased customer loyalty, better access to capital, and reduced operational risks.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">How often should I update my ESG compliance checklist?</h3>
                            <p className="text-text-primary/70">
                                You should review and update your ESG compliance checklist at least annually, and more frequently if there are changes to regulations or your business operations.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/tools/ai-use-policy" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">Custom AI Use Policy</h3>
                            <p className="text-sm text-text-primary/70">Create internal AI usage policies that align with ESG best practices.</p>
                        </a>
                        <a href="/tools/ccpa-checker" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">CCPA Compliance Checker</h3>
                            <p className="text-sm text-text-primary/70">Ensure your data privacy practices meet California regulations.</p>
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