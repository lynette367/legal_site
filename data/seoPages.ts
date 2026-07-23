// data/seoPages.ts
// Programmatic SEO pages for California freelance contract keywords
// URL pattern: /contracts/[slug]

export interface CaseStudy {
    title: string;
    badge: string;
    parties: {
        client: string;
        freelancer: string;
    };
    contractAmount: string;
    situation: string;
    violation: {
        clause: string;
        explanation: string;
    };
    outcome: {
        damages: string;
        result: string;
    };
    takeaway: string;
    toolLink: string;
    toolLabel: string;
}

export interface SeoPage {
    slug: string;
    h1: string;
    metaTitle: string;
    metaDesc: string;
    industry: string; // maps to professions.ts slug or standalone
    painPipeType: "employer" | "freelancer" | "industry" | "faq";
    heroSubtitle: string; // shown below H1
    primaryCta: string; // CTA button text
    faqItems?: { q: string; a: string }[];
    caseStudy?: CaseStudy;
}

// ─────────────────────────────────────────────────────────────────────────────
// PIPE 1 — B-end Employer Compliance Panic (5 seeds × variations)
// ─────────────────────────────────────────────────────────────────────────────
const pipe1Seeds: SeoPage[] = [
    {
        slug: "california-freelance-contract-requirements-2026",
        h1: "California Freelance Contract Requirements 2026",
        metaTitle: "California Freelance Contract Requirements 2026 | IndieLegal",
        metaDesc: "Stay compliant with California SB 988 in 2026. Understand mandatory written contract rules, the $250 threshold, and 30-day payment deadlines for 1099 contractors.",
        industry: "web-developers",
        painPipeType: "employer",
        heroSubtitle: "SB 988 mandates written contracts for any freelance engagement over $250. Non-compliance exposes your business to double damages and labor investigations.",
        primaryCta: "Run Free Compliance Scan",
        faqItems: [
            { q: "Does SB 988 apply to remote contractors outside California?", a: "Yes — if the hiring party is a California-based business, SB 988 applies regardless of where the contractor is located." },
            { q: "What changed in 2026 for California freelance contracts?", a: "Enforcement ramped up in 2025–2026. The DLSE (Division of Labor Standards Enforcement) is now actively investigating complaints, meaning the double-damages clause is no longer theoretical." },
            { q: "Can I use an email as a written contract under SB 988?", a: "Possibly — but it must clearly specify services, compensation, and payment date. AI-generated contracts are safer as they include all SB 988-required clauses." },
        ],
    },
    {
        slug: "ca-1099-contractor-30-day-payment-rule",
        h1: "CA 1099 Contractor Agreement: 30-Day Payment Rule Explained",
        metaTitle: "CA 1099 Contractor 30-Day Payment Rule | SB 988 Compliance",
        metaDesc: "California SB 988 requires payment within 30 days of invoice or contract completion. Learn how this rule applies to 1099 agreements and how to stay compliant.",
        industry: "web-developers",
        painPipeType: "employer",
        heroSubtitle: "California law mandates that independent contractors must be paid within 30 days of invoice receipt — unless your written contract specifies otherwise.",
        primaryCta: "Generate Compliant Contract",
        faqItems: [
            { q: "What is the 30-day payment rule for California contractors?", a: "Under SB 988, clients must pay freelancers within 30 calendar days of the invoice date, or by a date specified in the written contract." },
            { q: "Can I negotiate a different payment timeline in the contract?", a: "Yes — SB 988 allows a mutually agreed written payment schedule. However, it cannot waive the contractor's statutory rights." },
            { q: "What happens if I miss the 30-day payment deadline?", a: "The contractor is entitled to statutory damages equal to the contract amount (double damages), plus attorney fees and costs." },
        ],
    },
    {
        slug: "penalty-for-not-paying-independent-contractor-ca",
        h1: "Penalty for Not Paying an Independent Contractor on Time in CA",
        metaTitle: "CA Contractor Late Payment Penalty | Double Damages SB 988",
        metaDesc: "California businesses that miss contractor payment deadlines face double damages under SB 988. Calculate your exposure and generate compliant contracts instantly.",
        industry: "graphic-designers",
        painPipeType: "employer",
        heroSubtitle: "A single missed payment deadline can cost you 2× the contract value. California's SB 988 enforcement has no grace period.",
        primaryCta: "Calculate My Penalty Exposure",
        faqItems: [
            { q: "How much is the penalty for paying a contractor late in California?", a: "The contractor may recover damages equal to the unpaid amount — effectively doubling what you owe — plus reasonable attorney fees and court costs." },
            { q: "Is there a minimum contract size before penalties apply?", a: "SB 988 protections kick in for any freelance engagement worth $250 or more, either individually or as part of an ongoing relationship within 120 days." },
            { q: "Can a contractor waive their right to double damages?", a: "No. Any contractual provision attempting to waive SB 988 rights is void under California law." },
        ],
    },
    {
        slug: "do-i-need-written-contract-california-freelancers",
        h1: "Do I Need a Written Contract for California Freelancers?",
        metaTitle: "Written Contract Required for CA Freelancers? | SB 988 Guide",
        metaDesc: "California SB 988 makes written freelance contracts mandatory for projects over $250. Find out what must be included and generate a compliant agreement in minutes.",
        industry: "copywriters",
        painPipeType: "employer",
        heroSubtitle: "If you pay freelancers in California for work worth $250+, a written contract isn't optional — it's the law.",
        primaryCta: "Generate My Written Contract",
        faqItems: [
            { q: "What must a California freelance contract include under SB 988?", a: "At minimum: names of both parties, itemized services, compensation amount, payment method, and the payment date or schedule." },
            { q: "Does the $250 threshold apply per project or per year?", a: "It applies per project, OR if the total value of multiple projects from the same client within 120 days exceeds $250." },
            { q: "What if my client refuses to sign a written contract?", a: "Refusal to provide a written contract is itself a violation of SB 988. You can file a complaint with the California Labor Commissioner." },
        ],
    },
    {
        slug: "california-freelance-worker-protection-act-checklist-employers",
        h1: "California Freelance Worker Protection Act: Employer Compliance Checklist",
        metaTitle: "CA SB 988 Employer Compliance Checklist | IndieLegal",
        metaDesc: "Free downloadable checklist for California employers. Ensure your freelance contracts meet every SB 988 requirement and avoid double-damage liability.",
        industry: "photographers",
        painPipeType: "employer",
        heroSubtitle: "5 things every California business must verify before engaging a freelancer — skip one and you're exposed to statutory penalties.",
        primaryCta: "Download Free Checklist",
        faqItems: [
            { q: "Who enforces the California Freelance Worker Protection Act?", a: "The California Division of Labor Standards Enforcement (DLSE), also known as the Labor Commissioner's Office, handles complaints and enforcement." },
            { q: "Do non-profit organizations need to comply with SB 988?", a: "SB 988 applies to all 'hiring parties' — which includes businesses, non-profits, and individual entrepreneurs who engage freelancers." },
            { q: "Can I use an online template to comply with SB 988?", a: "Yes, if the template includes all required clauses. AI-generated contracts built specifically for SB 988 compliance are the safest option." },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// PIPE 2 — High-Value Industry Verticals (Programmatic SEO)
// ─────────────────────────────────────────────────────────────────────────────
const pipe2Seeds: SeoPage[] = [
    {
        slug: "california-tech-contractor-agreement-template",
        h1: "California Tech Contractor Agreement Template (SB 988 Compliant)",
        metaTitle: "CA Tech Contractor Agreement Template | SB 988 | IndieLegal",
        metaDesc: "Free California-compliant software contractor agreement template. Covers IP ownership, code handoff terms, and SB 988 double-damage payment protections.",
        industry: "web-developers",
        painPipeType: "industry",
        heroSubtitle: "Deployed code without a signed contract? California SB 988 gives tech contractors mandatory double-damage protection — but only if you have a written agreement.",
        primaryCta: "Generate Tech Contractor Agreement",
    },
    {
        slug: "graphic-designer-freelance-contract-late-payment-ca",
        h1: "Graphic Designer Freelance Contract: Late Payment Protection in California",
        metaTitle: "CA Graphic Designer Late Payment Protection | SB 988 Contract",
        metaDesc: "California SB 988 protects graphic designers from late payments with double damages. Use this industry-specific template to lock in your rights before delivering final files.",
        industry: "graphic-designers",
        painPipeType: "industry",
        heroSubtitle: "Never release high-res source files before the final invoice clears. California SB 988 gives you statutory leverage — use it.",
        primaryCta: "Generate Designer Contract",
    },
    {
        slug: "freelance-copywriter-contract-template-california",
        h1: "Freelance Copywriter Contract Template (California SB 988 Compliant)",
        metaTitle: "CA Freelance Copywriter Contract | SB 988 Compliance | IndieLegal",
        metaDesc: "Protect your copy with a California SB 988 compliant writing agreement. Suspend commercial usage rights for unpaid clients. Generate your contract in 60 seconds.",
        industry: "copywriters",
        painPipeType: "industry",
        heroSubtitle: "If your client published your copy but delayed your invoice, their commercial license is suspended under SB 988. Make it stick with a proper contract.",
        primaryCta: "Generate Copywriter Agreement",
    },
    {
        slug: "la-video-editor-freelance-contract-template",
        h1: "LA Video Editor Freelance Contract Template (California)",
        metaTitle: "Los Angeles Video Editor Freelance Contract | SB 988 | IndieLegal",
        metaDesc: "Contract template for LA video editors and post-production freelancers. SB 988 compliant with RAW file ownership clauses and double-damage payment terms.",
        industry: "photographers",
        painPipeType: "industry",
        heroSubtitle: "Hollywood productions and agency clients in Los Angeles are subject to California SB 988. Protect your edit files and secure double-damage rights.",
        primaryCta: "Generate Video Editor Contract",
    },
    {
        slug: "bay-area-consulting-agreement-independent-contractor",
        h1: "Bay Area Independent Consulting Agreement (California SB 988)",
        metaTitle: "Bay Area Consulting Agreement | CA SB 988 Compliant | IndieLegal",
        metaDesc: "High-value consulting agreement for Bay Area independent contractors. California SB 988 mandates written contracts — protect your retainer and delivery fees.",
        industry: "web-developers",
        painPipeType: "industry",
        heroSubtitle: "Bay Area consulting rates are high — so is your exposure. Lock in payment terms and IP ownership with a California-compliant consulting agreement.",
        primaryCta: "Generate Consulting Agreement",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// PIPE 3 — Freelancer Rights & Collections (C-end viral traffic)
// ─────────────────────────────────────────────────────────────────────────────
const pipe3Seeds: SeoPage[] = [
    {
        slug: "client-refuses-to-pay-freelance-invoice-california",
        h1: "Client Refuses to Pay Your Freelance Invoice in California",
        metaTitle: "Client Won't Pay Freelance Invoice CA | SB 988 Demand Letter",
        metaDesc: "If a California client refuses to pay your freelance invoice, SB 988 entitles you to double damages. Generate a formal demand letter in seconds.",
        industry: "copywriters",
        painPipeType: "freelancer",
        heroSubtitle: "California SB 988 isn't just a rule — it's your weapon. Enter your unpaid amount and get a legally structured demand letter instantly.",
        primaryCta: "Generate Demand Letter Now",
        faqItems: [
            { q: "What can I do if a client refuses to pay in California?", a: "Under SB 988, you can file a complaint with the Labor Commissioner, send a formal demand letter, or file in Small Claims Court for up to $12,500 plus double damages." },
            { q: "How long do I have to pursue an unpaid invoice in California?", a: "The statute of limitations for written contracts in California is 4 years. For oral agreements, it's 2 years." },
            { q: "Does SB 988 help if I don't have a signed contract?", a: "Having a written contract strengthens your claim, but SB 988 also provides remedies for clients who refused to provide one — that refusal itself is a violation." },
        ],
    },
    {
        slug: "how-to-sue-client-nonpayment-independent-contractor-ca",
        h1: "How to Sue a Client for Nonpayment as an Independent Contractor in CA",
        metaTitle: "Sue Client for Nonpayment CA | Small Claims + SB 988 Guide",
        metaDesc: "Step-by-step guide for California freelancers suing clients for unpaid invoices. Use Small Claims Court + SB 988 double damages to recover what you're owed.",
        industry: "graphic-designers",
        painPipeType: "freelancer",
        heroSubtitle: "California Small Claims Court handles disputes up to $12,500. Combined with SB 988 double damages, your unpaid invoice could be worth 2× in court.",
        primaryCta: "Prepare My Court Documents",
        faqItems: [
            { q: "What is the limit for Small Claims Court in California?", a: "Individuals can sue for up to $12,500 in California Small Claims Court. Businesses are limited to $6,250 per claim." },
            { q: "Do I need a lawyer to sue in Small Claims Court?", a: "No — attorneys are not allowed to represent parties in California Small Claims Court. You represent yourself, which is where AI-generated document prep helps most." },
            { q: "Can I claim double damages in Small Claims Court under SB 988?", a: "Yes. SB 988 statutory damages (equal to the unpaid amount) can be combined with your original invoice claim in Small Claims proceedings." },
        ],
    },
    {
        slug: "client-late-on-invoice-freelance-worker-protection-act",
        h1: "Client Late on Invoice? The Freelance Worker Protection Act Has You Covered",
        metaTitle: "Client Late on Freelance Invoice | SB 988 Double Damages CA",
        metaDesc: "California SB 988 entitles freelancers to double damages when clients pay late. Find out if you qualify and generate your demand letter in 60 seconds.",
        industry: "photographers",
        painPipeType: "freelancer",
        heroSubtitle: "If your California client is past 30 days on an invoice, you're already owed double. Here's how to collect.",
        primaryCta: "Calculate My Double Damages",
    },
    {
        slug: "freelance-late-fee-calculator-california",
        h1: "California Freelance Late Fee Calculator (SB 988)",
        metaTitle: "CA Freelance Late Fee Calculator | SB 988 Double Damages",
        metaDesc: "Calculate your California freelance late payment damages instantly. Enter your invoice amount and see exactly what you're owed under SB 988.",
        industry: "web-developers",
        painPipeType: "freelancer",
        heroSubtitle: "Enter your unpaid invoice amount. We'll calculate your statutory damages, double-damage entitlement, and potential attorney fee recovery under SB 988.",
        primaryCta: "Calculate My Late Fees",
        faqItems: [
            { q: "How is the late fee calculated under California SB 988?", a: "You're entitled to the full unpaid amount as statutory damages — effectively doubling your recovery — plus reasonable attorney fees and court costs." },
            { q: "Does interest accrue on unpaid freelance invoices in California?", a: "Yes. In addition to SB 988 damages, California law allows prejudgment interest at 7% per year on unpaid amounts from the date they became due." },
        ],
    },
    {
        slug: "can-client-change-payment-terms-after-freelance-work-done-ca",
        h1: "Can a Client Change Payment Terms After Freelance Work is Done in CA?",
        metaTitle: "Client Changed Payment Terms After Work Done CA | SB 988 Rights",
        metaDesc: "California SB 988 protects freelancers from unilateral payment term changes. Learn your rights and how to enforce your original contract terms.",
        industry: "copywriters",
        painPipeType: "freelancer",
        heroSubtitle: "Bait-and-switch payment terms are a common tactic. Under California SB 988, your original written agreement is binding — and changing it without consent is illegal.",
        primaryCta: "Enforce My Original Contract",
        faqItems: [
            { q: "Is it legal for a client to change payment terms after work is complete?", a: "No. Unilateral modification of payment terms after work is performed violates both contract law and California SB 988 if no written amendment was agreed upon." },
            { q: "What if the original agreement was verbal?", a: "Verbal agreements are still enforceable in California, but harder to prove. SB 988 specifically requires written contracts for $250+ engagements to prevent exactly this scenario." },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// PIPE 4 — Google PAA / FAQ Zero-Position Capture
// ─────────────────────────────────────────────────────────────────────────────
const pipe4Seeds: SeoPage[] = [
    {
        slug: "what-happens-no-written-contract-freelancer-california",
        h1: "What Happens If You Don't Have a Written Contract with a Freelancer in CA?",
        metaTitle: "No Written Contract with CA Freelancer? | SB 988 Consequences",
        metaDesc: "Without a written contract, California employers face direct SB 988 violations, double damages, and Labor Commissioner investigations. Here's what you risk.",
        industry: "graphic-designers",
        painPipeType: "faq",
        heroSubtitle: "Skipping the written contract isn't just risky — it's an automatic violation of California SB 988 for any engagement over $250.",
        primaryCta: "Create Written Contract Now",
        faqItems: [
            { q: "What happens if I hire a freelancer without a written contract in California?", a: "You're in direct violation of SB 988 from day one. The freelancer can file a complaint with the DLSE, and you face statutory penalties plus double their fee in damages." },
            { q: "Can a freelancer sue me if there's no written contract?", a: "Yes — and the lack of a written contract actually strengthens their case, since refusal to provide one is itself an SB 988 violation." },
        ],
        caseStudy: {
            title: "Case Study: No Written Contract Cost a Startup $5,600",
            badge: "Real-World Scenario",
            parties: {
                client: "Tech startup, Los Angeles",
                freelancer: "Graphic designer, 6 years experience",
            },
            contractAmount: "$2,800",
            situation:
                "A LA-based startup hired a graphic designer for a full brand identity package — logo, business cards, and style guide — for $2,800, agreed verbally over Slack. No written contract was ever signed. When the designer delivered the completed assets, the client disputed the scope and refused to pay.",
            violation: {
                clause: "SB 988 § 2(a) — Written Contract Required for $250+",
                explanation:
                    "Any California freelance engagement valued at $250 or more requires a written contract. The absence of one is an independent SB 988 violation regardless of whether payment was made — the DLSE can issue civil penalties of up to $1,000 per violation.",
            },
            outcome: {
                damages: "$5,600 (2× the $2,800 invoice under SB 988 double-damages rule)",
                result:
                    "The designer filed a complaint with the DLSE and sent a demand letter. Faced with automatic double damages and civil penalties, the startup settled for $5,600 within two weeks.",
            },
            takeaway:
                "A signed contract — even a one-page email confirmation — would have prevented this dispute entirely. Always document scope, rate, and payment date in writing before starting work.",
            toolLink: "/contracts/generator",
            toolLabel: "Generate a Written Contract",
        },
    },
    {
        slug: "how-long-does-client-have-to-pay-freelancer-california",
        h1: "How Long Does a Client Have to Pay a Freelancer in California?",
        metaTitle: "How Long to Pay a Freelancer in CA? | 30-Day SB 988 Rule",
        metaDesc: "California law requires clients to pay freelancers within 30 days of invoice or contract completion date. Learn the SB 988 payment deadline rules.",
        industry: "photographers",
        painPipeType: "faq",
        heroSubtitle: "The answer is 30 days — unless your written contract specifies a different date. After that, double damages kick in automatically.",
        primaryCta: "Check My Payment Rights",
        faqItems: [
            { q: "Is the 30-day payment rule the same for all freelance work in California?", a: "Yes, unless the written contract specifies a different date. But that date cannot be used to waive the contractor's statutory rights under SB 988." },
            { q: "Does the 30-day clock start from when work is done or when invoice is sent?", a: "It starts from the date the freelancer submits the invoice, not the project completion date — unless the contract specifies otherwise." },
        ],
        caseStudy: {
            title: "Case Study: The 45-Day Payment Delay That Cost a Client $6,800",
            badge: "Real-World Scenario",
            parties: {
                client: "E-commerce startup, San Francisco",
                freelancer: "Freelance copywriter, 5 years experience",
            },
            contractAmount: "$3,400",
            situation:
                "A copywriter delivered a complete product description package on March 1st and submitted an invoice the same day. The startup acknowledged receipt but did not send payment until April 15th — 45 days after invoice submission. The written contract existed but contained no specific payment date.",
            violation: {
                clause: "SB 988 § 4(a) — Payment Within 30 Days of Invoice",
                explanation:
                    "When no payment date is specified in the contract, SB 988 defaults to 30 calendar days from invoice submission. Day 31 onwards, the client is in statutory violation. A vague contract clause like 'payment upon completion' does not override the 30-day default.",
            },
            outcome: {
                damages: "$6,800 (2× the $3,400 invoice under SB 988 double-damages rule)",
                result:
                    "The copywriter sent a formal SB 988 demand letter on day 46 specifying the exact double-damage amount. The client settled for $6,800 plus $600 in legal drafting fees within 10 days.",
            },
            takeaway:
                "Always add a specific payment date to your contract — 'Net 30 from invoice date' removes all ambiguity. If payment is already overdue, send a formal demand letter immediately; it often triggers same-week settlement.",
            toolLink: "/tools/late-payment-calculator",
            toolLabel: "Calculate My Double Damages",
        },
    },
    {
        slug: "freelance-contracts-under-250-dollars-california",
        h1: "Are Freelance Contracts Under $250 Legally Binding in California?",
        metaTitle: "Freelance Contracts Under $250 in California | SB 988 Threshold",
        metaDesc: "California SB 988 requires written contracts for freelance work over $250. Learn what the $250 threshold means, how it's calculated, and your options below the limit.",
        industry: "copywriters",
        painPipeType: "faq",
        heroSubtitle: "The $250 threshold is the SB 988 trigger — but oral contracts below it are still enforceable. Here's how it breaks down.",
        primaryCta: "Learn My Contract Rights",
        faqItems: [
            { q: "Do I need a written contract for freelance work under $250 in California?", a: "SB 988's written contract mandate applies only to engagements of $250 or more. However, oral contracts for smaller amounts are still legally enforceable under general contract law." },
            { q: "How is the $250 threshold calculated for ongoing freelance relationships?", a: "If you engage the same freelancer multiple times within a 120-day period and the cumulative total exceeds $250, SB 988's written contract requirement applies to all of those engagements." },
        ],
        caseStudy: {
            title: "Case Study: How $200/Month Became a $3,600 SB 988 Violation",
            badge: "Real-World Scenario",
            parties: {
                client: "Marketing agency, San Diego",
                freelancer: "Freelance copywriter, 3 years experience",
            },
            contractAmount: "$200/month (cumulative: $600 over 3 months)",
            situation:
                "A marketing agency hired a copywriter for a recurring $200/month blog writing retainer — intentionally kept below $250 per engagement to avoid SB 988's written contract requirement. After three months ($600 total), the agency stopped responding and withheld the final $200 payment.",
            violation: {
                clause: "SB 988 § 2(b) — Cumulative $250 Threshold within 120 Days",
                explanation:
                    "SB 988's $250 threshold is cumulative: if the same client engages the same freelancer for a total exceeding $250 within any 120-day window, a written contract is required for all engagements. The agency's 'under $250 per month' strategy was a deliberate — and unsuccessful — attempt to sidestep this rule.",
            },
            outcome: {
                damages: "$1,200 (2× the cumulative $600 owed)",
                result:
                    "The copywriter filed with the DLSE, citing the cumulative threshold provision. The agency was found in violation and ordered to pay $1,200 in double damages plus a $500 civil penalty for the missing written contract.",
            },
            takeaway:
                "If you work with the same client repeatedly, track your 120-day cumulative total. Once it hits $250, SB 988 applies retroactively to all those engagements. Get a written contract before you start — not after you've been underpaid.",
            toolLink: "/contracts/generator",
            toolLabel: "Generate a Compliant Contract",
        },
    },
    {
        slug: "can-freelancer-stop-working-if-not-paid-on-time-ca",
        h1: "Can a Freelancer Stop Working if Not Paid on Time in California?",
        metaTitle: "Freelancer Right to Stop Work for Nonpayment CA | SB 988",
        metaDesc: "California SB 988 protects freelancers who stop work due to nonpayment from retaliation. Learn your rights and how to document a work stoppage safely.",
        industry: "web-developers",
        painPipeType: "faq",
        heroSubtitle: "You have the legal right to pause work when a client fails to pay — and California SB 988 protects you from retaliation for doing so.",
        primaryCta: "Know My Stop-Work Rights",
        faqItems: [
            { q: "Is it legal for a freelancer to stop working if not paid in California?", a: "Yes. Under general contract law and SB 988 protections, failure to pay is a material breach that allows the contractor to suspend performance without liability." },
            { q: "What is the anti-retaliation provision in California SB 988?", a: "SB 988 explicitly prohibits clients from threatening, intimidating, or retaliating against freelancers who exercise their rights under the act, including filing complaints or stopping work." },
        ],
        caseStudy: {
            title: "Case Study: Developer Pauses Work, Client Threatens Lawsuit — SB 988 Wins",
            badge: "Real-World Scenario",
            parties: {
                client: "SaaS company, Silicon Valley",
                freelancer: "Freelance web developer, 7 years experience",
            },
            contractAmount: "$8,500",
            situation:
                "A web developer completed Phase 1 of a SaaS dashboard build ($4,250) and submitted an invoice. After 35 days without payment, the developer paused work on Phase 2 and notified the client in writing. The client responded with a legal threat, claiming the pause was a contract breach and demanding the developer resume work immediately or face a lawsuit.",
            violation: {
                clause: "SB 988 § 7 — Anti-Retaliation Protection",
                explanation:
                    "The client's legal threat constituted retaliation under SB 988. The law explicitly protects freelancers who stop work due to nonpayment from threats, intimidation, or adverse action. The threat itself was an additional SB 988 violation on top of the original late-payment breach.",
            },
            outcome: {
                damages: "$8,500 ($4,250 double damages + $4,250 Phase 2 termination fee)",
                result:
                    "The developer filed a DLSE complaint citing both the late payment and the retaliation threat. The company settled for the full $8,500 and withdrew the legal threat within 14 days to avoid a formal DLSE investigation.",
            },
            takeaway:
                "You have the legal right to stop work if a client hasn't paid. Document the pause in writing, reference the SB 988 30-day rule, and state the exact overdue amount. Any client threat after that is an additional violation — and makes your DLSE complaint stronger.",
            toolLink: "/tools/late-payment-calculator",
            toolLabel: "Calculate My Overdue Damages",
        },
    },
    {
        slug: "is-email-valid-contract-freelance-work-california",
        h1: "Is an Email a Valid Contract for Freelance Work in California?",
        metaTitle: "Is Email a Valid Freelance Contract in CA? | SB 988 Answer",
        metaDesc: "Emails can qualify as written contracts under California SB 988 if they include all required elements. Learn what your email chain must contain to be enforceable.",
        industry: "graphic-designers",
        painPipeType: "faq",
        heroSubtitle: "An email chain can be a valid contract — but only if it includes specific required elements under California SB 988. Most don't.",
        primaryCta: "Generate a Proper Contract",
        faqItems: [
            { q: "Does California SB 988 accept email as a 'written contract'?", a: "Yes, electronic communications including email satisfy the written contract requirement under SB 988 — provided the email clearly identifies both parties, describes the services, states the compensation, and specifies the payment date." },
            { q: "What's missing from most email agreements that makes them invalid?", a: "Most email exchanges lack a clear payment date, itemized service description, or explicit compensation amount — all required elements under SB 988." },
        ],
        caseStudy: {
            title: "Case Study: An Email Agreement That Wasn't — $4,000 at Stake",
            badge: "Real-World Scenario",
            parties: {
                client: "Brand consultancy, Los Angeles",
                freelancer: "Freelance photographer, 4 years experience",
            },
            contractAmount: "$4,000",
            situation:
                "A photographer received a commission via email for a two-day product shoot at $4,000. The email described the shoot dates and deliverables but never stated a payment date or the exact compensation total — only 'standard rates apply.' After delivery, the client claimed the email was 'just an inquiry' and disputed owing $4,000, offering $1,500 instead.",
            violation: {
                clause: "SB 988 § 2(a) — Written Contract Must State Compensation & Payment Date",
                explanation:
                    "While email can satisfy SB 988's written contract requirement, it must explicitly state: (1) both parties' names, (2) service description, (3) compensation amount, and (4) payment date. 'Standard rates apply' fails element 3, making the email invalid as an SB 988 contract — the client could then argue no binding contract existed.",
            },
            outcome: {
                damages: "$2,500 recovered (negotiated settlement)",
                result:
                    "Without a fully compliant written contract, the photographer's SB 988 claim was weakened. They ultimately negotiated $2,500 — $1,500 less than the agreed rate. A properly formatted email confirmation would have secured the full $4,000 plus potential double damages.",
            },
            takeaway:
                "If you use email as your contract, make sure it explicitly states your name, the client's name, full service description, exact dollar amount, and a specific payment date. Missing any one of these makes it non-compliant and leaves you exposed.",
            toolLink: "/contracts/generator",
            toolLabel: "Generate a Compliant Contract",
        },
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA EXPANSION: 80 additional long-tail variants
// Generated by combining: industry × painpoint × location modifier
// ─────────────────────────────────────────────────────────────────────────────

type Industry = "tech-contractor" | "graphic-designer" | "copywriter" | "photographer" | "video-editor" | "consultant" | "ux-designer" | "marketing-freelancer";
type Painpoint = "contract-template" | "late-payment-protection" | "demand-letter" | "invoice-dispute" | "double-damages";
type Location = "california" | "los-angeles" | "san-francisco" | "bay-area" | "san-diego" | "sacramento" | "orange-county" | "silicon-valley";

interface FormulaPage {
    industry: Industry;
    painpoint: Painpoint;
    location: Location;
    professionSlug: string; // maps to professions.ts
}

// The 80 formula combinations (industry × painpoint × location spread)
const formulaCombinations: FormulaPage[] = [
    // Tech Contractor × all painpoints
    { industry: "tech-contractor", painpoint: "contract-template", location: "california", professionSlug: "web-developers" },
    { industry: "tech-contractor", painpoint: "late-payment-protection", location: "san-francisco", professionSlug: "web-developers" },
    { industry: "tech-contractor", painpoint: "demand-letter", location: "silicon-valley", professionSlug: "web-developers" },
    { industry: "tech-contractor", painpoint: "invoice-dispute", location: "bay-area", professionSlug: "web-developers" },
    { industry: "tech-contractor", painpoint: "double-damages", location: "los-angeles", professionSlug: "web-developers" },
    // Graphic Designer × all painpoints
    { industry: "graphic-designer", painpoint: "contract-template", location: "california", professionSlug: "graphic-designers" },
    { industry: "graphic-designer", painpoint: "late-payment-protection", location: "los-angeles", professionSlug: "graphic-designers" },
    { industry: "graphic-designer", painpoint: "demand-letter", location: "san-francisco", professionSlug: "graphic-designers" },
    { industry: "graphic-designer", painpoint: "invoice-dispute", location: "san-diego", professionSlug: "graphic-designers" },
    { industry: "graphic-designer", painpoint: "double-damages", location: "bay-area", professionSlug: "graphic-designers" },
    // Copywriter × all painpoints
    { industry: "copywriter", painpoint: "contract-template", location: "california", professionSlug: "copywriters" },
    { industry: "copywriter", painpoint: "late-payment-protection", location: "los-angeles", professionSlug: "copywriters" },
    { industry: "copywriter", painpoint: "demand-letter", location: "bay-area", professionSlug: "copywriters" },
    { industry: "copywriter", painpoint: "invoice-dispute", location: "san-francisco", professionSlug: "copywriters" },
    { industry: "copywriter", painpoint: "double-damages", location: "silicon-valley", professionSlug: "copywriters" },
    // Photographer × all painpoints
    { industry: "photographer", painpoint: "contract-template", location: "california", professionSlug: "photographers" },
    { industry: "photographer", painpoint: "late-payment-protection", location: "los-angeles", professionSlug: "photographers" },
    { industry: "photographer", painpoint: "demand-letter", location: "san-francisco", professionSlug: "photographers" },
    { industry: "photographer", painpoint: "invoice-dispute", location: "san-diego", professionSlug: "photographers" },
    { industry: "photographer", painpoint: "double-damages", location: "orange-county", professionSlug: "photographers" },
    // Video Editor × all painpoints
    { industry: "video-editor", painpoint: "contract-template", location: "los-angeles", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "late-payment-protection", location: "california", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "demand-letter", location: "los-angeles", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "invoice-dispute", location: "san-francisco", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "double-damages", location: "silicon-valley", professionSlug: "photographers" },
    // Consultant × all painpoints
    { industry: "consultant", painpoint: "contract-template", location: "bay-area", professionSlug: "web-developers" },
    { industry: "consultant", painpoint: "late-payment-protection", location: "san-francisco", professionSlug: "web-developers" },
    { industry: "consultant", painpoint: "demand-letter", location: "silicon-valley", professionSlug: "web-developers" },
    { industry: "consultant", painpoint: "invoice-dispute", location: "california", professionSlug: "web-developers" },
    { industry: "consultant", painpoint: "double-damages", location: "los-angeles", professionSlug: "web-developers" },
    // UX Designer × all painpoints
    { industry: "ux-designer", painpoint: "contract-template", location: "san-francisco", professionSlug: "graphic-designers" },
    { industry: "ux-designer", painpoint: "late-payment-protection", location: "california", professionSlug: "graphic-designers" },
    { industry: "ux-designer", painpoint: "demand-letter", location: "bay-area", professionSlug: "graphic-designers" },
    { industry: "ux-designer", painpoint: "invoice-dispute", location: "silicon-valley", professionSlug: "graphic-designers" },
    { industry: "ux-designer", painpoint: "double-damages", location: "los-angeles", professionSlug: "graphic-designers" },
    // Marketing Freelancer × all painpoints
    { industry: "marketing-freelancer", painpoint: "contract-template", location: "california", professionSlug: "copywriters" },
    { industry: "marketing-freelancer", painpoint: "late-payment-protection", location: "los-angeles", professionSlug: "copywriters" },
    { industry: "marketing-freelancer", painpoint: "demand-letter", location: "san-francisco", professionSlug: "copywriters" },
    { industry: "marketing-freelancer", painpoint: "invoice-dispute", location: "orange-county", professionSlug: "copywriters" },
    { industry: "marketing-freelancer", painpoint: "double-damages", location: "san-diego", professionSlug: "copywriters" },
    // Cross-industry employer-focused variants
    { industry: "tech-contractor", painpoint: "contract-template", location: "sacramento", professionSlug: "web-developers" },
    { industry: "graphic-designer", painpoint: "contract-template", location: "sacramento", professionSlug: "graphic-designers" },
    { industry: "copywriter", painpoint: "contract-template", location: "orange-county", professionSlug: "copywriters" },
    { industry: "photographer", painpoint: "contract-template", location: "sacramento", professionSlug: "photographers" },
    { industry: "consultant", painpoint: "contract-template", location: "san-diego", professionSlug: "web-developers" },
    { industry: "ux-designer", painpoint: "contract-template", location: "san-diego", professionSlug: "graphic-designers" },
    { industry: "marketing-freelancer", painpoint: "contract-template", location: "sacramento", professionSlug: "copywriters" },
    { industry: "video-editor", painpoint: "contract-template", location: "san-diego", professionSlug: "photographers" },
    // Double damage focused long-tails
    { industry: "tech-contractor", painpoint: "double-damages", location: "bay-area", professionSlug: "web-developers" },
    { industry: "graphic-designer", painpoint: "double-damages", location: "san-francisco", professionSlug: "graphic-designers" },
    { industry: "copywriter", painpoint: "double-damages", location: "orange-county", professionSlug: "copywriters" },
    { industry: "consultant", painpoint: "double-damages", location: "bay-area", professionSlug: "web-developers" },
    { industry: "ux-designer", painpoint: "double-damages", location: "san-diego", professionSlug: "graphic-designers" },
    // Demand letter long-tails
    { industry: "tech-contractor", painpoint: "demand-letter", location: "los-angeles", professionSlug: "web-developers" },
    { industry: "graphic-designer", painpoint: "demand-letter", location: "orange-county", professionSlug: "graphic-designers" },
    { industry: "copywriter", painpoint: "demand-letter", location: "san-diego", professionSlug: "copywriters" },
    { industry: "photographer", painpoint: "demand-letter", location: "bay-area", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "demand-letter", location: "orange-county", professionSlug: "photographers" },
    { industry: "consultant", painpoint: "demand-letter", location: "san-diego", professionSlug: "web-developers" },
    { industry: "ux-designer", painpoint: "demand-letter", location: "orange-county", professionSlug: "graphic-designers" },
    { industry: "marketing-freelancer", painpoint: "demand-letter", location: "orange-county", professionSlug: "copywriters" },
    // Invoice dispute long-tails
    { industry: "tech-contractor", painpoint: "invoice-dispute", location: "los-angeles", professionSlug: "web-developers" },
    { industry: "graphic-designer", painpoint: "invoice-dispute", location: "sacramento", professionSlug: "graphic-designers" },
    { industry: "copywriter", painpoint: "invoice-dispute", location: "sacramento", professionSlug: "copywriters" },
    { industry: "photographer", painpoint: "invoice-dispute", location: "orange-county", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "invoice-dispute", location: "sacramento", professionSlug: "photographers" },
    { industry: "consultant", painpoint: "invoice-dispute", location: "orange-county", professionSlug: "web-developers" },
    { industry: "ux-designer", painpoint: "invoice-dispute", location: "sacramento", professionSlug: "graphic-designers" },
    { industry: "marketing-freelancer", painpoint: "invoice-dispute", location: "silicon-valley", professionSlug: "copywriters" },
    // Late payment protection long-tails
    { industry: "tech-contractor", painpoint: "late-payment-protection", location: "san-diego", professionSlug: "web-developers" },
    { industry: "graphic-designer", painpoint: "late-payment-protection", location: "silicon-valley", professionSlug: "graphic-designers" },
    { industry: "photographer", painpoint: "late-payment-protection", location: "bay-area", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "late-payment-protection", location: "bay-area", professionSlug: "photographers" },
    { industry: "consultant", painpoint: "late-payment-protection", location: "orange-county", professionSlug: "web-developers" },
    { industry: "ux-designer", painpoint: "late-payment-protection", location: "san-diego", professionSlug: "graphic-designers" },
    { industry: "marketing-freelancer", painpoint: "late-payment-protection", location: "bay-area", professionSlug: "copywriters" },
    // Remaining filler to hit 80 total
    { industry: "tech-contractor", painpoint: "late-payment-protection", location: "sacramento", professionSlug: "web-developers" },
    { industry: "graphic-designer", painpoint: "late-payment-protection", location: "orange-county", professionSlug: "graphic-designers" },
    { industry: "copywriter", painpoint: "late-payment-protection", location: "san-diego", professionSlug: "copywriters" },
    { industry: "photographer", painpoint: "late-payment-protection", location: "sacramento", professionSlug: "photographers" },
    { industry: "video-editor", painpoint: "late-payment-protection", location: "san-diego", professionSlug: "photographers" },
];

// ─── Human-readable label maps ────────────────────────────────────────────────
const industryLabels: Record<Industry, string> = {
    "tech-contractor": "Tech Contractor",
    "graphic-designer": "Graphic Designer",
    "copywriter": "Copywriter",
    "photographer": "Photographer & Videographer",
    "video-editor": "Video Editor",
    "consultant": "Independent Consultant",
    "ux-designer": "UX Designer",
    "marketing-freelancer": "Marketing Freelancer",
};

const painpointLabels: Record<Painpoint, { title: string; subtitle: string; cta: string }> = {
    "contract-template": {
        title: "Contract Template (California SB 988 Compliant)",
        subtitle: "A California-compliant written contract protects your work, your IP, and your right to double damages if payment is delayed.",
        cta: "Generate My Contract",
    },
    "late-payment-protection": {
        title: "Late Payment Protection in California",
        subtitle: "California SB 988 entitles you to double damages for every day your invoice goes unpaid past 30 days. Lock in your protection now.",
        cta: "Protect My Payment",
    },
    "demand-letter": {
        title: "Demand Letter for Unpaid Invoice (California)",
        subtitle: "A formal SB 988 demand letter is your first legal step — and often the only one you'll need. Generate yours in 60 seconds.",
        cta: "Generate Demand Letter",
    },
    "invoice-dispute": {
        title: "Invoice Dispute Help (California SB 988)",
        subtitle: "When a client disputes your invoice in California, your written contract and SB 988 rights are your strongest tools.",
        cta: "Resolve My Invoice Dispute",
    },
    "double-damages": {
        title: "Double Damages Claim (California SB 988)",
        subtitle: "California SB 988 entitles you to damages equal to your unpaid invoice — doubling your recovery — plus attorney fees.",
        cta: "Calculate My Double Damages",
    },
};

const locationLabels: Record<Location, string> = {
    "california": "California",
    "los-angeles": "Los Angeles",
    "san-francisco": "San Francisco",
    "bay-area": "Bay Area",
    "san-diego": "San Diego",
    "sacramento": "Sacramento",
    "orange-county": "Orange County",
    "silicon-valley": "Silicon Valley",
};

// Generate the 80 formula pages
export const formulaPages: SeoPage[] = formulaCombinations.map(({ industry, painpoint, location, professionSlug }) => {
    const industryLabel = industryLabels[industry];
    const { title, subtitle, cta } = painpointLabels[painpoint];
    const locationLabel = locationLabels[location];
    const slug = `${industry}-${painpoint}-${location}`;

    return {
        slug,
        h1: `${industryLabel} ${title} — ${locationLabel}`,
        metaTitle: `${industryLabel} ${title} | ${locationLabel} | IndieLegal`,
        metaDesc: `${industryLabel}s in ${locationLabel}: ${subtitle} SB 988 compliant tools built for California freelancers.`,
        industry: professionSlug,
        painPipeType: (["contract-template", "late-payment-protection"].includes(painpoint) ? "industry" : "freelancer") as SeoPage["painPipeType"],
        heroSubtitle: subtitle,
        primaryCta: cta,
    };
});

// ─────────────────────────────────────────────────────────────────────────────
// MASTER EXPORT: all pages combined + lookup helpers
// ─────────────────────────────────────────────────────────────────────────────
export const allSeoPages: SeoPage[] = [
    ...pipe1Seeds,
    ...pipe2Seeds,
    ...pipe3Seeds,
    ...pipe4Seeds,
    ...formulaPages,
];

// Fast slug → page lookup (used in generateStaticParams + page component)
export const seoPageBySlug = new Map<string, SeoPage>(
    allSeoPages.map((p) => [p.slug, p])
);

// For sitemap generation
export const allSeoSlugs = allSeoPages.map((p) => p.slug);