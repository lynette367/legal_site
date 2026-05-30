// data/professions.ts

export interface Profession {
  slug: string;
  name: string;
  ctaTitle: string;
  nextSlug: string;
  keywords: string[];
  painPoint: string;
  painPointNotice: string; // 🌟 新增：用于变体词落地页首屏的痛点导语
  shortDesc: string;
  icon: string;
  contractSnippet: string; // 🌟 规范化：专门用于 Canva 模板卡片渲染的清晰文本
  seoTitle: string;
  seoDesc: string;
  specificScopePlaceholder: string;
}

export const professions: Profession[] = [
  {
    slug: "graphic-designers",
    name: "Graphic Designer",
    ctaTitle: "Design Contract",
    nextSlug: "copywriters",
    keywords: ["freelance design agreement", "graphic design contract template california", "designer contract template", "SB 988 demand letter"],
    seoTitle: "Free Graphic Designer Contract Template & CA SB 988 Demand Letter Tool",
    seoDesc: "Download California SB 988 compliant contract templates for freelance graphic designers. Calculate double damages and generate formal late payment demand letters instantly.",
    painPoint: "Never transfer Figma project ownership or deliver final high-res source files before the final invoice clears. Under SB 988, you hold statutory leverage.",
    painPointNotice: "Clients ghosting you before signing off on the final brand assets? California's SB 988 law makes written contracts mandatory for design projects over $250. Use our curated, industry-specific template below to lock in your 2x late payment protection.",
    shortDesc: "Protect your design assets and payments.",
    icon: "🎨",
    contractSnippet: "FREELANCE GRAPHIC DESIGN SERVICES AGREEMENT\n" +
"==================================================\n" +
"This Agreement is entered into by and between the Creative Service Provider (\"Designer\") and the Client specified below.\n\n" +
"PURSUANT TO CA CIVIL CODE (SB 988 - Freelance Worker Protection Act):\n\n" +
"1. PARTIES:\n" +
"   - Designer: [Your Name / Studio Name]\n" +
"   - Client: [Client Company / Name]\n\n" +
"2. DESCRIPTION OF SERVICES & DELIVERABLES:\n" +
"   - Scope: UI/UX Design, Brand Identity Assets, Vector Graphics, and custom design layouts.\n" +
"   - Source Files: Final high-resolution assets and project source files (e.g., Figma .fig, Adobe Illustrator .ai) will remain the property of the Designer until the final invoice is paid in full.\n\n" +
"3. VALUE & COMPENSATION:\n" +
"   - Total Project Value: $[Enter Contract Value - Must be $250+ for SB 988 protection]\n" +
"   - Milestone Terms: [e.g., 50% Upfront / 50% Upon Approval]\n\n" +
"4. STRICT PAYMENT DEADLINE:\n" +
"   - Pursuant to California SB 988, Client must issue final payment within 30 days of invoice receipt.\n" +
"   - Failure to pay timely constitutes a statutory violation, triggering mandatory double damages, collection costs, and reasonable attorney's fees in California courts.",
    specificScopePlaceholder: "UI/UX design, brand identity assets, and vector deliverables."
  },
  {
    slug: "web-developers",
    name: "Web Developer",
    ctaTitle: "Software Development Contract",
    nextSlug: "photographers",
    keywords: ["freelance developer contract", "software development agreement california", "software engineer agreement", "penalty calculator CA"],
    seoTitle: "Freelance Web Developer Contract Template | CA SB 988 Penalty Calculator",
    seoDesc: "Protect your code. Access free California SB 988 compliant web development agreements, scan late payment penalties, and collect unpaid principal with double damages.",
    painPoint: "Did the client ghost you after code deployment or Git repository hand-off? Under SB 988, they cannot contractually waive your right to prompt payment.",
    painPointNotice: "Deployed the code but the client went radio silent on the invoice? Under CA SB 988, software projects over $250 require a signed agreement. Protect your repositories and enforce double damages with this dev-focused template.",
    shortDesc: "Secure your development contracts.",
    icon: "💻",
    contractSnippet: "FREELANCE SOFTWARE DEVELOPMENT AGREEMENT\n" +
"==================================================\n" +
"This Engineering Services Agreement is drafted in strict compliance with the California Freelance Worker Protection Act (SB 988).\n\n" +
"1. PARTIES:\n" +
"   - Developer: [Your Name / Engineering Entity]\n" +
"   - Client: [Client Entity / Name]\n\n" +
"2. SCOPE OF WORK & INTELLECTUAL PROPERTY:\n" +
"   - Scope: Frontend/Backend Software Development, API Integration, and Code Deployment.\n" +
"   - IP Transfer: Full ownership of the production code and repository access transfers to the Client ONLY upon zero-balance clearance of the final invoice.\n\n" +
"3. TOTAL CONTRACT VALUE:\n" +
"   - Agreed Price: $[Enter Total Amount]\n" +
"   - Payment Structure: [e.g., Retainer + Net-15 Net-30 Terms]\n\n" +
"4. STATUTORY LATE PENALTY NOTICE:\n" +
"   - Final payment is strictly due within 30 days of code hand-off or invoice presentation.\n" +
"   - Any late payment authorizes the Developer to seek up to double the contract price plus formal attorney fees in California Small Claims Court under CA Civil Code SB 988.",
    specificScopePlaceholder: "Software development, code deployment, and API integration services."
  },
  {
    slug: "copywriters",
    name: "Copywriter & Content Strategist",
    ctaTitle: "Writing Agreement",
    nextSlug: "web-developers",
    keywords: ["freelance writing contract", "copywriting agreement template CA", "copywriting contract CA", "freelance writer late payment"],
    seoTitle: "Free Freelance Copywriter Contract Template | CA SB 988 Legal Hub",
    seoDesc: "Stop client ghosting. Get legally compliant contract templates for freelance writers and copywriters in California. Learn how to draft a formal SB 988 Demand Letter.",
    painPoint: "Clients love to launch your marketing copy while delaying your final check. Use this template to declare that the license to use your copy is suspended until paid.",
    painPointNotice: "Did your client publish your copy on their live site but 'forgot' to pay your invoice? Establish your publishing leverage under California SB 988. This template suspends their commercial rights until they settle your bill.",
    shortDesc: "Ensure copywriters get paid.",
    icon: "✍️",
    contractSnippet: "FREELANCE COPYWRITING & CONTENT AGREEMENT\n" +
"==================================================\n" +
"This Content Creation Agreement is fully subject to California SB 988 regulations for independent contractors.\n\n" +
"1. PARTIES:\n" +
"   - Writer: [Your Name / Copywriter Brand]\n" +
"   - Client: [Client Name / Company]\n\n" +
"2. DELIVERABLES & COMMERCIAL USAGE:\n" +
"   - Scope: SEO Articles, Copywriting, Marketing Collateral, and Scriptwriting.\n" +
"   - Usage License: Writer grants Client a conditional license to publish and distribute the copy. This license is automatically suspended if payment is delayed beyond the statutory limit.\n\n" +
"3. FINANCIAL TERMS:\n" +
"   - Total Compensation: $[Enter Amount]\n" +
"   - Payment Window: Payment must be finalized on or before the 30th day following invoicing.\n\n" +
"4. CA CIVIL CODE PENALTIES:\n" +
"   - Late payments trigger statutory double damages under CA SB 988. Client explicitly acknowledges that unauthorized usage of copy during a payment default may incur additional copyright infringement liabilities.",
    specificScopePlaceholder: "SEO copywriting, brand messaging, website content, and marketing scripts."
  },
  {
    slug: "photographers",
    name: "Photographer & Videographer",
    ctaTitle: "Photography Services Contract",
    nextSlug: "graphic-designers",
    keywords: ["freelance photography contract", "commercial photography agreement CA", "photography commercial agreement", "small claims court CA"],
    seoTitle: "Commercial Photography Contract Template (California SB 988 Compliant)",
    seoDesc: "Protect your creative assets. Download freelance photography contract templates built for California SB 988 compliance. Calculate penalties for overdue commercial invoices.",
    painPoint: "If a client is using your images in live marketing campaigns but ignoring your invoice, they are violating both Copyright Law and CA SB 988. Lock down your rights.",
    painPointNotice: "Running visual media production without a contract in California is high risk. SB 988 mandates written terms for visual assets over $250. Use this commercial template to ensure you keep RAW rights until paid.",
    shortDesc: "Protect your photography earnings.",
    icon: "📸",
    contractSnippet: "COMMERCIAL PHOTOGRAPHY & VISUAL MEDIA AGREEMENT\n" +
"==================================================\n" +
"This Visual Media Production Agreement is drafted in strict accordance with California SB 988 guidelines.\n\n" +
"1. PARTIES:\n" +
"   - Media Provider: [Your Name / Photography Studio]\n" +
"   - Client: [Client Agency / Brand Name]\n\n" +
"2. SCOPE OF PRODUCTION & RAW ASSETS:\n" +
"   - Scope: Commercial Photography, Video Editing, and Creative Asset Delivery.\n" +
"   - RAW Files: RAW Deliverables remain exclusively locked under the photographer's copyright until the Client settles 100% of the agreed compensation.\n\n" +
"3. PAYMENT STRUCTURE:\n" +
"   - Contract Value: $[Enter Amount]\n" +
"   - Settlement Window: Client must settle all outstanding invoices within 30 days of final visual media watermarked delivery.\n\n" +
"4. STATUTORY ENFORCEMENT & DOUBLE DAMAGES:\n" +
"   - Continued commercial usage of delivered assets during an active payment default constitutes a willful violation of CA SB 988, rendering the Client liable for double statutory damages and collection costs.",
    specificScopePlaceholder: "Commercial photography, event coverage, high-res photo editing, and raw asset delivery."
  }
];