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

/**
 * Original "Contract Compliance Checklist" 3-step self-check.
 * Moved out of the hero (replaced by the AI contract review) but kept on the page.
 */
export default function ComplianceStepper() {
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
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
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
    );
}
