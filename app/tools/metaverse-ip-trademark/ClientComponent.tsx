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

export default function MetaverseIPTrademarkClient() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const tool: Tool = {
        id: 5,
        title: 'Metaverse IP Trademark Support',
        seoDesc: 'Strategic guidance for protecting digital assets and trademarks in the metaverse.',
        longTail: 'Metaverse digital asset trademark protection',
        steps: [
            'Platform: Roblox / Decentraland / Other',
            'Asset Type: NFT / Avatar / Virtual Store',
            'Global Reach: US / EU / Asia'
        ],
        riskPoints: ['Class 9 vs Class 42 confusion', 'Jurisdiction ambiguity in Web3', 'Platform-specific IP limitations']
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
                Metaverse IP Trademark Support
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
                Strategic guidance for protecting digital assets and trademarks in the metaverse. Safeguard your virtual intellectual property rights.
            </p>

            <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
                <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

                {isLoading ? (
                    <div className="py-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                        <p className="mt-4 text-primary-lavender font-medium">AI Analyzing Metaverse IP Protection...</p>
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
                    <h2 className="text-3xl font-bold text-text-primary">What is Metaverse IP Trademark Protection?</h2>
                    <p className="text-text-primary/80">
                        Metaverse IP trademark protection involves safeguarding intellectual property rights in virtual environments. This includes protecting digital assets, virtual goods, brand identities, and creative works in platforms like Roblox, Decentraland, and other metaverse spaces.
                    </p>
                    <p className="text-text-primary/80">
                        As the metaverse continues to grow, protecting your intellectual property becomes increasingly important to prevent unauthorized use and infringement.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Key Challenges in Metaverse IP Protection</h2>
                    <p className="text-text-primary/80">
                        Protecting IP in the metaverse presents unique challenges:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
                        <li>Jurisdictional ambiguity in Web3 environments</li>
                        <li>Platform-specific IP limitations and terms of service</li>
                        <li>Classification issues for digital assets (Class 9 vs Class 42)</li>
                        <li>Enforcement difficulties across different metaverse platforms</li>
                        <li>NFT-related IP rights complexities</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">How Our Metaverse IP Trademark Tool Works</h2>
                    <p className="text-text-primary/80">
                        Our tool helps you navigate the complexities of metaverse IP protection:
                    </p>
                    <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
                        <li>Select the metaverse platform and asset type</li>
                        <li>Indicate your global reach and protection needs</li>
                        <li>Receive a comprehensive IP protection strategy</li>
                        <li>Get guidance on trademark registration and enforcement</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About Metaverse IP</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">Can I trademark my metaverse brand?</h3>
                            <p className="text-text-primary/70">
                                Yes, you can trademark your metaverse brand, but you need to ensure it meets the same requirements as traditional trademarks. This includes proving use in commerce and distinctiveness.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">What is the difference between Class 9 and Class 42 for digital assets?</h3>
                            <p className="text-text-primary/70">
                                Class 9 covers tangible goods like computer hardware and software, while Class 42 covers services like software development and technical consulting. Digital assets in the metaverse may fall under either or both classes depending on their nature.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
                            <h3 className="text-xl font-bold mb-2">How can I protect my NFTs from infringement?</h3>
                            <p className="text-text-primary/70">
                                You can protect your NFTs by registering trademarks for your brand, copyrighting the underlying creative works, and including clear terms of use in your smart contracts.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/tools/ai-copyright-filing" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">AI-generated Content Copyright Filing</h3>
                            <p className="text-sm text-text-primary/70">Protect your creative works in the metaverse with proper copyright filing.</p>
                        </a>
                        <a href="/tools/freelancer-contract-review" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
                            <h3 className="font-bold text-text-primary">Freelancer Contract Review</h3>
                            <p className="text-sm text-text-primary/70">Ensure your metaverse-related contracts protect your IP rights.</p>
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