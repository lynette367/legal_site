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

export default function AIUsePolicyClient() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const tool: Tool = {
        id: 4,
        title: 'Custom AI Use Policy',
        seoDesc: 'Generate internal AI usage policies tailored for your team.',
        longTail: 'Internal AI use policy for small teams',
        steps: [
            'Department: Marketing / Engineering / Admin',
            'Data Sensitivity: High / Medium / Low',
            'Tool Type: ChatGPT / Midjourney / Custom'
        ],
        riskPoints: ['Lack of data leak prevention rules', 'Undefined liability for AI errors', 'Missing ethics guidelines']
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
                Custom AI Use Policy
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Generate internal AI usage policies tailored for your team. Ensure responsible and compliant use of AI tools in your organization.
            </p>

            <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
                <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

                {isLoading ? (
                    <div className="py-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                        <p className="mt-4 text-primary-lavender font-medium">AI Crafting Policy Guidelines...</p>
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
                    <h2 className="text-3xl font-bold text-text-primary">What is a Custom AI Use Policy?</h2>
                    <p className="text-text-primary/80">
                        A custom AI use policy is a document that outlines how your organization uses artificial intelligence tools, including guidelines for responsible use, data privacy, security measures, and ethical considerations. It helps ensure that AI is used in a compliant, safe, and effective manner.
                    </p>
                    <p className="text-text-primary/80">
                        For businesses in California, having a comprehensive AI use policy is especially important due to the state&lsquo;s strict data privacy regulations, including the CCPA/CPRA.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Key Components of an AI Use Policy</h2>
                    <p className="text-text-primary/80">
                        A well-crafted AI use policy should include:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
                        <li>Purpose and scope of AI use</li>
                        <li>Data privacy and security guidelines</li>
                        <li>Responsible AI use principles</li>
                        <li>Liability and risk management</li>
                        <li>Training and awareness requirements</li>
                        <li>Monitoring and enforcement procedures</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How Our AI Use Policy Generator Works</h2>
                    <p className="text-text-primary/80">
                        Our tool helps you create a customized AI use policy for your organization:
                    </p>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li>Select your department and data sensitivity level</li>
                        <li>Indicate the types of AI tools your team uses</li>
                        <li>Receive a customized AI use policy</li>
                        <li>Get guidance on implementing the policy in your organization</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About AI Use Policies</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">Why does my organization need an AI use policy?</h3>
                            <p className="text-text-primary/70">
                                An AI use policy helps mitigate risks associated with AI adoption, ensures compliance with regulations, promotes ethical AI use, and provides clear guidelines for employees.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">How often should I update my AI use policy?</h3>
                            <p className="text-text-primary/70">
                                You should review and update your AI use policy at least annually, and more frequently as new AI tools are adopted or as regulations change.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What are the legal implications of AI use in California?</h3>
                            <p className="text-text-primary/70">
                                California has strict data privacy regulations that apply to AI use, including the CCPA/CPRA. Additionally, businesses may face liability for AI errors or biases if proper safeguards are not in place.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/tools/esg-compliance-checklist" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">ESG Compliance Checklist</h3>
                            <p className="text-sm text-text-primary/70">Ensure your AI use aligns with environmental and social governance standards.</p>
                        </a>
                        <a href="/tools/ccpa-generator" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">CCPA Privacy Policy Generator</h3>
                            <p className="text-sm text-text-primary/70">Create privacy policies that address AI data collection practices.</p>
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