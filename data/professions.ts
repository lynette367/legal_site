export interface Profession {
  slug: string;
  name: string;
  ctaTitle: string;
  nextSlug: string;
  keywords: string[];
  painPoint: string;
  shortDesc: string;
  icon: string;
  baseTemplate: string;
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
    baseTemplate: `FREELANCE GRAPHIC DESIGN SERVICES AGREEMENT
This Agreement is entered into by and between the Creative Service Provider ("Designer") and the Client. 
PURSUANT TO CA CIVIL CODE (SB 988 - Freelance Worker Protection Act):
1. Description of Services: Designer shall deliver [UI/UX Design, Brand Identity Assets, Vector Graphics] as specified in the active Statement of Work.
2. Value of Services: The total compensation for this project shall not be less than $250.
3. Payment Terms: Client must issue payment within 30 days of invoice receipt. Failure to pay on time triggers statutory double damages, costs, and reasonable attorney's fees under California Law.`,
    specificScopePlaceholder: "UI/UX design, brand identity assets, and vector deliverables.",
    painPoint: "Never transfer Figma project ownership or deliver final high-res source files before the final invoice clears. Under SB 988, you hold statutory leverage.",
    shortDesc: "Protect your design assets and payments.",
    icon: "🎨"
  },
  {
    slug: "web-developers",
    name: "Web Developer",
    ctaTitle: "Software Development Contract",
    nextSlug: "photographers",
    keywords: ["freelance developer contract", "software development agreement california", "software engineer agreement", "penalty calculator CA"],
    seoTitle: "Freelance Web Developer Contract Template | CA SB 988 Penalty Calculator",
    seoDesc: "Protect your code. Access free California SB 988 compliant web development agreements, scan late payment penalties, and collect unpaid principal with double damages.",
    baseTemplate: `FREELANCE SOFTWARE DEVELOPMENT AGREEMENT
This Engineering Services Agreement complies with the California Freelance Worker Protection Act (SB 988).
1. Scope of Work: Developer shall provide [Frontend/Backend Software Development, API Integration, Code Deployment].
2. Compensation: Total contract value is $[Amount]. 
3. Explicit Payment Deadline: Payment is strictly due within 30 days of code hand-off or invoice presentation.
4. Enforcement: Any late payment constitutes a material breach, authorizing the Developer to seek up to double the contract price plus attorney fees in CA Small Claims Court.`,
    specificScopePlaceholder: "Software development, code deployment, and API integration services.",
    painPoint: "Did the client ghost you after code deployment or Git repository hand-off? Under SB 988, they cannot contractually waive your right to prompt payment.",
    shortDesc: "Secure your development contracts.",
    icon: "💻"
  },
  {
    slug: "copywriters",
    name: "Copywriter & Content Strategist",
    ctaTitle: "Writing Agreement",
    nextSlug: "web-developers",
    keywords: ["freelance writing contract", "copywriting agreement template CA", "copywriting contract CA", "freelance writer late payment"],
    seoTitle: "Free Freelance Copywriter Contract Template | CA SB 988 Legal Hub",
    seoDesc: "Stop client ghosting. Get legally compliant contract templates for freelance writers and copywriters in California. Learn how to draft a formal SB 988 Demand Letter.",
    baseTemplate: `FREELANCE COPYWRITING & CONTENT AGREEMENT
This Content Creation Agreement is fully subject to California SB 988 regulations for independent contractors.
1. Deliverables: Writer shall provide [SEO Articles, Copywriting, Marketing Collateral, Scriptwriting] as mapped in Exhibit A.
2. Financial Terms: The fixed rate for deliverables is $[Amount]. 
3. Late Payment Terms: Payment must be finalized on or before the 30th day following invoicing. 
4. Statutory Penalty Notice: Under CA Civil Code, late payments allow the contractor to recover statutory double damages.`,
    specificScopePlaceholder: "SEO copywriting, brand messaging, website content, and marketing scripts.",
    painPoint: "Clients love to launch your marketing copy while delaying your final check. Use this template to declare that the license to use your copy is suspended until paid.",
    shortDesc: "Ensure copywriters get paid.",
    icon: "✍️"
  },
  {
    slug: "photographers",
    name: "Photographer & Videographer",
    ctaTitle: "Photography Services Contract",
    nextSlug: "graphic-designers",
    keywords: ["freelance photography contract", "commercial photography agreement CA", "photography commercial agreement", "small claims court CA"],
    seoTitle: "Commercial Photography Contract Template (California SB 988 Compliant)",
    seoDesc: "Protect your creative assets. Download freelance photography contract templates built for California SB 988 compliance. Calculate penalties for overdue commercial invoices.",
    baseTemplate: `COMMERCIAL PHOTOGRAPHY & VISUAL MEDIA AGREEMENT
This Visual Media Production Agreement is drafted in strict accordance with California SB 988.
1. Scope of Production: Photographer shall execute [Commercial Photography, Video Editing, RAW Deliverables].
2. Minimum Compensation: The agreed contractual compensation is $[Amount].
3. Payment Window: Client must settle all outstanding invoices within 30 days of media delivery.
4. Copyright & Statutory Protection: Copyright ownership remains with the Photographer until full payment is received. Late payments trigger CA SB 988 double damages.`,
    specificScopePlaceholder: "Commercial photography, event coverage, high-res photo editing, and raw asset delivery.",
    painPoint: "If a client is using your images in live marketing campaigns but ignoring your invoice, they are violating both Copyright Law and CA SB 988. Lock down your rights.",
    shortDesc: "Protect your photography earnings.",
    icon: "📸"
  }
];