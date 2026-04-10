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

export default function AICopyrightFilingClient() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const tool: Tool = {
        id: 1,
        title: 'AI-generated Content Copyright Filing',
        seoDesc: 'Professional AI-generated content copyright filing assistant for digital creators.',
        longTail: 'AI-generated content copyright filing for creators',
        steps: [
            'State: California / New York / Other',
            'Work type: Image / Text / Video',
            'Human Content: ≥30% modification / <30% modification'
        ],
        riskPoints: ['High rejection risk without human log', 'USCO specific disclosure required', 'Potential derivative work conflicts']
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
                AI-generated Content Copyright Filing
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Professional AI-generated content copyright filing assistant for digital creators. Ensure your AI-created works are properly protected.
            </p>

            <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
                <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

                {isLoading ? (
                    <div className="py-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                        <p className="mt-4 text-primary-lavender font-medium">AI Analyzing Copyright Requirements...</p>
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
                    <h2 className="text-3xl font-bold text-text-primary">What is AI-generated Content Copyright Filing?</h2>
                    <p className="text-text-primary/80">
                        AI-generated content copyright filing is the process of registering creative works produced with the assistance of artificial intelligence with the U.S. Copyright Office (USCO). This process helps protect your AI-created content from unauthorized use and establishes your legal rights as the creator.
                    </p>
                    <p className="text-text-primary/80">
                        With the rise of AI tools like ChatGPT, Midjourney, and DALL-E, more creators are using AI to generate content. Proper copyright filing ensures that your AI-assisted works are legally protected.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Key Requirements for AI-generated Content Copyright</h2>
                    <p className="text-text-primary/80">
                        To successfully file for copyright protection for AI-generated content, you must:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
                        <li>Have made significant creative contributions to the work</li>
                        <li>Document the human involvement in the creation process</li>
                        <li>Disclose the use of AI in the creation process</li>
                        <li>Ensure the work is original and not derivative of other works</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How Our AI Copyright Filing Tool Works</h2>
                    <p className="text-text-primary/80">
                        Our tool helps you navigate the complex process of copyright filing for AI-generated content:
                    </p>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li>Select your state and the type of AI-generated content</li>
                        <li>Indicate the level of human modification in the work</li>
                        <li>Receive a comprehensive risk analysis and filing recommendations</li>
                        <li>Get guidance on how to properly document your human involvement</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About AI Content Copyright</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">Can AI-generated content be copyrighted?</h3>
                            <p className="text-text-primary/70">
                                Yes, but only if there is significant human involvement in the creation process. The U.S. Copyright Office requires that works have human authorship to be eligible for copyright protection.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What documentation do I need for AI content copyright filing?</h3>
                            <p className="text-text-primary/70">
                                You need to document your creative contributions, the specific AI tools used, and how you modified or directed the AI to create the final work.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">How long does copyright protection last for AI-generated content?</h3>
                            <p className="text-text-primary/70">
                                For works with human authorship, copyright protection generally lasts for the life of the author plus 70 years.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/tools/freelancer-contract-review" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">Freelancer Contract Review</h3>
                            <p className="text-sm text-text-primary/70">Ensure your freelance agreements protect your intellectual property rights.</p>
                        </a>
                        <a href="/tools/metaverse-ip-trademark" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">Metaverse IP Trademark Support</h3>
                            <p className="text-sm text-text-primary/70">Protect your digital assets and trademarks in virtual environments.</p>
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