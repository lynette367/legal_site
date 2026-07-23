// app/guides/ca-contractor-small-claims/page.tsx
import Link from "next/link";
import WaitlistButton from "@/components/guides/WaitlistButton";

export const metadata = {
    title: "California SB 988 Small Claims Court Guide: Sue for Non-Payment (2026)",
    description: "Step-by-step enforcement protocol under California SB 988. Learn how to file Form SC-100, issue a 10-day demand letter, and claim 2x double damages without a lawyer.",
    alternates: {
        canonical: 'https://indielegalterms.com/guides/ca-contractor-small-claims',
    },
};

interface PageProps {
    searchParams?: {
        scenario?: string;
    };
}

export default function SmallClaimsGuidePage({ searchParams }: PageProps) {
    const currentUpdatedDate = "May 30, 2026";
    const scenario = searchParams?.scenario;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Scenario Context Banner */}
                {scenario === 'fully-protected-250' && (
                    <div className="mb-8 p-5 rounded-xl border-l-4 bg-red-50 border-red-500 text-red-950 animate-fadeIn">
                        <p className="font-bold mb-1">📢 Protected Over $250 CA Law Sync Active</p>
                        <p className="text-sm">Yes, California law mandates a written contract for anything over $250. If your client broke this rule, you have immense leverage. Read our step-by-step statutory enforcement blueprint to see how to hold them accountable.</p>
                    </div>
                )}

                {/* 1. 信任构建：权威头部（让气炸了的用户瞬间冷静，确信找对了地方） */}
                <header className="mb-10 text-center md:text-left">
                    <div className="flex items-center gap-2 text-xs font-mono text-red-600 font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        Statutory Enforcement Protocol
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        How to Sue a Client Under California SB 988: <br />
                        <span className="text-red-600">The 3-Step Double Damages Roadmap</span>
                    </h1>
                    <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
                        If your freelance contract totals $250+ and your client is 30+ days overdue in California, you are legally entitled to <strong className="text-slate-900 font-bold">2x statutory penalties plus attorney fees</strong>. Here is your exact legal roadmap to collect.
                    </p>
                    <div className="mt-4 text-xs text-slate-400">
                        Legal Schema Verified • Last Editorial Update: <span className="font-semibold text-slate-600">{currentUpdatedDate}</span>
                    </div>
                </header>

                {/* 2. 视觉化“维权3步走”路线图（建立有用感，同时暗示实操繁琐） */}
                <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm mb-10">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span>🗺️</span> The SB 988 Litigation Roadmap
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                        {/* Step 1 */}
                        <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="absolute top-3 right-3 text-xs font-black text-slate-300 font-mono">STEP 01</div>
                            <h3 className="text-sm font-bold text-slate-900 pr-10">10-Day Statutory Demand</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                You <span className="text-red-600 font-medium">must</span> issue a formal, written demand citing CA Civil Code SB 988. This establishes the mandatory 10-day cure window required by judges.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="absolute top-3 right-3 text-xs font-black text-slate-300 font-mono">STEP 02</div>
                            <h3 className="text-sm font-bold text-slate-900 pr-10">File Court Form SC-100</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                If they ignore the 10 days, file a complaint in CA Small Claims Court. You do not need a lawyer, but you must accurately calculate your 2x penalties on the filing.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="absolute top-3 right-3 text-xs font-black text-slate-300 font-mono">STEP 03</div>
                            <h3 className="text-sm font-bold text-slate-900 pr-10">Collect Double Damages</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                Present your written contract to the magistrate. Upon judgment, execute an asset levy or bank garnishment to extract your double payment.
                            </p>
                        </div>

                    </div>
                </section>

                {/* 3. 制造巨大的“行动力鸿沟”：披露细节，让用户发现“我自己搞不定” */}
                <section className="space-y-8 mb-12">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">The Invisible Trap in California Small Claims</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            While SB 988 is highly protective of freelancers, California courts are notoriously bureaucratic. Clerks will <span className="font-semibold text-red-600">reject your lawsuit</span> if you make a single formatting error in your pre-litigation demand, or if you fail to calculate interest and penalties pursuant to California Civil Code guidelines.
                        </p>
                    </div>

                    {/* 核心内链规划点 1：未来 Demand Letter PDF 的锚定占位 */}
                    <div className="border-l-4 border-amber-500 bg-amber-50/50 p-5 rounded-r-xl">
                        <h3 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                            ⚠️ Critical Requirement for Step 1
                        </h3>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                            Your Demand Letter cannot just say &quot;Please pay me.&quot; It must explicitly cite the California Freelance Worker Protection Act (SB 988), state the date of service completion, and declare the statutory 10-day cure period.
                        </p>
                        <div className="mt-3 text-xs font-medium text-amber-900">
                            💡 <em>Looking for a pre-formatted template?</em> You will soon be able to use our upcoming <span className="underline cursor-not-allowed text-amber-700">Automated SB 988 Demand Letter Generator (PDF)</span> to generate a judge-ready PDF in 60 seconds.
                        </div>
                    </div>

                    {/* 核心内链规划点 2：未来 Form SC-100 填表指南的锚定占位 */}
                    <div className="border-l-4 border-slate-400 bg-slate-100/50 p-5 rounded-r-xl">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            📋 Form SC-100 Filing Pitfalls
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            When filing Form SC-100 (Plaintiff&apos;s Claim and Order to Go to Small Claims Court), you must name the legal business entity correctly (e.g., Corp vs LLC). Misidentifying your client means your judgment cannot be collected.
                        </p>
                        <div className="mt-3 text-xs font-medium text-slate-800">
                            📖 <em>Step-by-Step Guide coming soon:</em> Our engineering team is finalizing the <span className="underline cursor-not-allowed text-slate-600">Form SC-100 California Freelancer Edition Guide</span> with annotated samples for freelancers.
                        </div>
                    </div>
                </section>

                {/* 4. 商业收割：Smoke Test 空手套白狼（把两眼一抹黑的用户洗入高客单价等待区） */}
                <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl text-center md:text-left relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 text-slate-700/20 text-9xl font-black font-mono pointer-events-none select-none">
                        $49
                    </div>

                    <div className="max-w-2xl">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 mb-4">
                            Pre-Litigation Essential Kit
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                            Get the CA SB 988 Small Claims <br className="hidden md:block" />
                            Enforcement Toolkit
                        </h2>
                        <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                            Don&apos;t waste $350/hour on a lawyer just to get an overdue invoice settled. Our comprehensive kit provides everything you need to act like a legal professional, scare your client into paying, or win absolute double damages in front of a judge.
                        </p>

                        {/* 包含什么组件（拉高确定感，拉大鸿沟） */}
                        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 text-left max-w-md mx-auto md:mx-0">
                            <li className="flex items-center gap-2">✅ Judge-Ready 10-Day Demand Letter Template</li>
                            <li className="flex items-center gap-2">✅ SC-100 Form Filling Interactive Blueprint</li>
                            <li className="flex items-center gap-2">✅ Small Claims Hearing Script & Speech Notes</li>
                            <li className="flex items-center gap-2">✅ Interest & 2x Double Damage Calculator Cheat-Sheet</li>
                        </ul>

                        {/* 💥 精益测试：点击弹窗或收集邮箱（Smoke Test 按钮） */}
                        <div className="mt-8 pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center gap-4">
                            <WaitlistButton />
                            <div className="text-[11px] text-slate-400">
                                ⚠️ Save thousands in legal fees. 100% focused on CA SB 988.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 返回聚合根节点的内链 */}
                <div className="mt-8 text-center">
                    <Link href="/guides" className="text-xs text-slate-500 hover:text-slate-800 underline">
                        ← Back to SB 988 Legal Document Index
                    </Link>
                </div>

            </div>
        </div>
    );
}