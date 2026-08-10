import Link from "next/link";

export function HowToWhyUsSection() {
  const steps = [
    {
      stepNumber: "01",
      title: "Choose your agreement type & state",
      desc: "Select an independent contractor or service agreement template tailored to your jurisdiction and industry.",
      icon: "📑",
    },
    {
      stepNumber: "02",
      title: "Answer a few questions",
      desc: "Fill in key milestones, payment terms, IP rights, and statutory late payment penalty clauses in under 2 minutes.",
      icon: "⚡",
    },
    {
      stepNumber: "03",
      title: "Download your compliant contract",
      desc: "Export your customized, legally binding agreement instantly in PDF or plain text ready for signature.",
      icon: "✅",
    },
  ];

  const reasons = [
    {
      title: "Free Core Tools",
      desc: "Generate agreements, calculate late payment penalties, and build formal demand letters at zero cost.",
      icon: "🎁",
    },
    {
      title: "California SB 988 Clause Support",
      desc: "Automated compliance with mandatory 30-day payment windows and double damages rights under CA Civil Code.",
      icon: "⚖️",
    },
    {
      title: "IRS 20-Factor Classification Check",
      desc: "Built-in 1099 vs. W-2 risk evaluation to protect freelancers and employers from misclassification liabilities.",
      icon: "🛡️",
    },
    {
      title: "Late Payment Calculator with Legal Citations",
      desc: "Calculate exact interest, statutory fees, and legal damages backed by state-specific legal codes.",
      icon: "🧮",
    },
    {
      title: "No Account Required for Basic Generation",
      desc: "Start drafting immediately without lengthy registration, email confirmation, or forced account creation.",
      icon: "🚀",
    },
    {
      title: "State-by-State Legal Status Transparency",
      desc: "Real-time legal tracking verifying which states enforce statutory freelance prompt payment protections.",
      icon: "🗺️",
      link: "#states",
      linkText: "View state legal map ↓",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 space-y-16">
      {/* 3-Step How-To */}
      <div>
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mt-3 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-text-primary/70 mt-2 max-w-lg mx-auto">
            Generate enforceable, legally compliant agreements in minutes without lawyer fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-primary-lavender transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-xs font-black tracking-widest text-primary-lavender bg-primary-lavender/10 px-2.5 py-1 rounded-lg">
                  STEP {step.stepNumber}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-lavender transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us - 2 Column Grid */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Built for Freelancers &amp; Business Owners
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Why Use IndieLegal
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Practical legal tools designed for speed, statutory precision, and real-world payment enforcement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-primary-lavender/40 transition-colors"
            >
              <span className="text-2xl shrink-0 p-2 bg-gray-50 rounded-xl border border-gray-100">
                {reason.icon}
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {reason.desc}
                </p>
                {reason.link && (
                  <Link
                    href={reason.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-lavender hover:underline mt-2"
                  >
                    {reason.linkText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
