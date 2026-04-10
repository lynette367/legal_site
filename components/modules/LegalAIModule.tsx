'use client';

import Link from 'next/link';

export default function LegalAIModule() {
    return (
        <section className="py-12 px-4 bg-white rounded-3xl border-2 border-primary-lavender/20 shadow-xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Specialized Compliance Toolkits</h2>
                <p className="text-gray-500 mt-2">California Small Business Support</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* AI-generated Content Copyright Filing */}
                <Link
                    href="/tools/ai-copyright-filing"
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group"
                >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">AI-generated Content Copyright Filing</h3>
                    <p className="text-sm text-gray-500 mb-4">Professional AI-generated content copyright filing assistant for digital creators.</p>
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        AI-generated content copyright filing for creators
                    </span>
                </Link>

                {/* ESG Compliance Checklist */}
                <Link
                    href="/tools/esg-compliance-checklist"
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group"
                >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">ESG Compliance Checklist</h3>
                    <p className="text-sm text-gray-500 mb-4">Comprehensive ESG compliance toolkit for California small businesses.</p>
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        California ESG small business compliance
                    </span>
                </Link>

                {/* Freelancer Contract Review */}
                <Link
                    href="/tools/freelancer-contract-review"
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group"
                >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">Freelancer Contract Review</h3>
                    <p className="text-sm text-gray-500 mb-4">Instantly detect risky clauses in freelancer and independent contractor agreements.</p>
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        California independent contractor contract review
                    </span>
                </Link>

                {/* Custom AI Use Policy */}
                <Link
                    href="/tools/ai-use-policy"
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group"
                >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">Custom AI Use Policy</h3>
                    <p className="text-sm text-gray-500 mb-4">Generate internal AI usage policies tailored for your team.</p>
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        Internal AI use policy for small teams
                    </span>
                </Link>

                {/* Metaverse IP Trademark Support */}
                <Link
                    href="/tools/metaverse-ip-trademark"
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group"
                >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">Metaverse IP Trademark Support</h3>
                    <p className="text-sm text-gray-500 mb-4">Strategic guidance for protecting digital assets and trademarks in the metaverse.</p>
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        Metaverse digital asset trademark protection
                    </span>
                </Link>

                {/* CCPA/CPRA Compliance Tools Group */}
                <div className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">CCPA/CPRA Compliance Tools</h3>
                    <p className="text-sm text-gray-500 mb-4">End-to-end privacy compliance for California small businesses</p>
                    
                    <div className="space-y-3 mb-4">
                        <Link
                            href="/tools/ccpa-checker"
                            className="block p-3 rounded-xl border border-gray-100 hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all"
                        >
                            <p className="text-sm font-medium mb-1">🔍 CCPA Compliance Checker</p>
                            <p className="text-xs text-gray-500">Audit your business for CCPA gaps</p>
                        </Link>
                        
                        <Link
                            href="/tools/ccpa-generator"
                            className="block p-3 rounded-xl border border-gray-100 hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all"
                        >
                            <p className="text-sm font-medium mb-1">📄 CCPA Privacy Policy Generator</p>
                            <p className="text-xs text-gray-500">Generate compliant privacy policy in 2 mins</p>
                        </Link>
                        
                        <Link
                            href="/tools/ccpa-breach-letters"
                            className="block p-3 rounded-xl border border-gray-100 hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all"
                        >
                            <p className="text-sm font-medium mb-1">⚠️ CCPA Data Breach Letters</p>
                            <p className="text-xs text-gray-500">Draft breach notification letters instantly</p>
                        </Link>
                    </div>
                    
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        Free 3 previews | No credit card required
                    </span>
                </div>

                {/* California Freelance Legal Templates */}
                <Link
                    href="/tools/california-freelance-legal-templates"
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-lavender hover:shadow-lg transition-all group"
                >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-lavender">California Freelance Legal Templates</h3>
                    <p className="text-sm text-gray-500 mb-4">AI-generated legal templates for California freelancers, compliant with CCPA and FWPA.</p>
                    <span className="text-xs font-semibold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
                        CCPA & FWPA compliant templates for freelancers
                    </span>
                </Link>
            </div>
        </section>
    );
}
