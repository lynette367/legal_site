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

export default function LegalAIModule() {
    const router = useRouter();
    const [activeTool, setActiveTool] = useState<Tool | null>(null);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const tools: Tool[] = [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
            id: 6,
            title: 'CCPA Data Breach Letters',
            seoDesc: 'Automated CCPA-compliant notification drafting for security incidents.',
            longTail: 'CCPA data breach notification templates',
            steps: [
                'State: California (Required)',
                'Breach Type: PII / Financial / Health',
                'Affected Count: <500 / 500-1000 / 1000+'
            ],
            riskPoints: ['Strict statutory deadline (72hrs)', 'Incomplete consumer rights disclosure', 'Liability under Private Right of Action']
        }
    ];

    const handleSelect = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                if (activeTool) {
                    setResult(activeTool.riskPoints);
                }
            }, 1500);
        }
    };

    return (
        <section className="py-12 px-4 bg-white rounded-3xl border-2 border-primary-lavender/20 shadow-xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Specialized Compliance Toolkits</h2>
                <p className="text-gray-500 mt-2">California Small Business Support</p>
            </div>

            {!activeTool ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div
                            key={tool.id}
                            onClick={() => { setActiveTool(tool); setStep(1); }}
                            className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg cursor-pointer transition-all group"
                        >
                            {/* SEO 结构化注入 */}
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">{tool.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{tool.seoDesc}</p>
                            <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                                {tool.longTail}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-xl mx-auto p-8 rounded-2xl bg-gray-50 border border-gray-200 relative overflow-hidden">
                    <button onClick={() => { setActiveTool(null); setResult(null); }} className="text-sm text-gray-400 mb-4">← Back</button>

                    {isLoading ? (
                        <div className="py-12 text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
                            <p className="mt-4 text-primary-lavender font-medium">AI Analyzing Regulation Gaps...</p>
                        </div>
                    ) : result ? (
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-green-700">✅ Analysis Ready</h4>
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
                                    onClick={() => activeTool && router.push(`/pricing?tool=${encodeURIComponent(activeTool.title)}`)}
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
                                {activeTool?.steps[step - 1].includes(':') 
                                    ? activeTool.steps[step - 1].split(':')[0] 
                                    : 'Question'}
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                                {(() => {
                                    const stepContent = activeTool?.steps[step - 1];
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
            )}
        </section>
    );
}