export type ModuleExampleKey = "legalQa" | "explain" | "dispute" | "document" | "contract";

interface ModuleExample {
  prompt: string;
  answer: string;
}

export const moduleExamples: Record<ModuleExampleKey, ModuleExample> = {
  legalQa: {
    prompt: "Can an employer legally extend my probation period without my consent?",
    answer: `Issue classification
Employment law - probation period dispute

Key legal points
- In most jurisdictions, extending a probation period requires mutual consent.
- Unilateral extension may violate labor contract principles or local labor regulations.
- Repeated or indefinite probation extensions are generally prohibited.

Risk assessment
- High risk of unlawful contract modification if no written agreement exists.
- Potential exposure for the employer to labor arbitration or penalties.

Suggested next steps
1. Request written justification and legal basis from the employer
2. Review your original employment contract and probation clause
3. Preserve all communications in writing
4. Consider filing a labor complaint if extension is imposed unilaterally

Disclaimer
This analysis is for informational purposes only and does not constitute legal advice.`,
  },
  explain: {
    prompt: "\"The Client shall indemnify and hold harmless the Vendor from any and all claims arising out of this Agreement.\"",
    answer: `Clause summary
This is a broad indemnification clause in favor of the Vendor.

Key risks
- One-sided: Client may bear liability even when Vendor is at fault
- Scope ambiguity: "Any and all claims" may include third-party claims, negligence, or IP disputes
- Cost exposure: May require covering legal defense costs and settlements

Practical implications
If triggered, this clause could expose the Client to significant and unpredictable financial liability.

Suggested revisions
- Limit indemnity to claims caused by Client's breach or misconduct
- Exclude Vendor negligence or willful misconduct
- Add procedural safeguards (notice, defense control, settlement approval)`,
  },
  dispute: {
    prompt: "Bought a refurbished phone online that was advertised as new; seller refuses refund.",
    answer: `Dispute type
Consumer law - misrepresentation / sale of goods

Core legal basis
- False or misleading product description
- Breach of implied warranty / consumer protection laws

Step-by-step action plan
1. Collect evidence (listing screenshots, invoice, chat records)
2. Send a formal written refund request to the seller
3. Escalate to platform dispute or consumer protection authority
4. Prepare for small claims or arbitration if unresolved

Evidence checklist
- Product listing and advertisement
- Payment proof
- Photos/videos of received product
- Seller communications

Risk notes
- Delay may weaken refund position
- Seller may argue "used/refurbished" disclaimer - wording matters`,
  },
  document: {
    prompt: "I purchased a phone online that was advertised as 'brand new' but received a refurbished unit. The seller refuses to provide a refund despite clear misrepresentation. I need a formal demand letter requesting a full refund.",
    answer: `Formal Demand Letter for Refund of Misrepresented Goods

[Date: ________________________]

[Recipient's Name/Company Name]
[Recipient's Address]
[Recipient's Contact Information: Phone/Email]

Attention: [Relevant Department/Responsible Person, e.g., Customer Service Department/Refund Processing Department]

Subject: Formal Demand for Refund Due to Misrepresentation of Goods

Dear [Recipient's Name/Responsible Person],

I am writing this letter to formally demand a full refund for the goods I purchased from your company, as the received goods do not conform to the descriptions and promises you provided, constituting misrepresentation.

The details of the transaction and the misrepresentation are as follows:

1. Transaction Information: On [Purchase Date], I purchased [Product Name, Model/Specification, Quantity] from your company through [Purchase Channel, e.g., your official website/physical store/third-party e-commerce platform]. The order number is [Order Number], and the total payment amount is [Amount, Currency], which I have paid in full (relevant payment vouchers are attached for reference).

2. Your Representations Regarding the Goods: Prior to my purchase, your company promoted and described the aforementioned goods through [Promotion Channel, e.g., product detail page/advertising materials/sales staff's verbal introduction], claiming that the goods have the following key characteristics and functions: [List the specific representations clearly, e.g., "Made of 100% pure cotton", "Has a service life of 5 years", "Can achieve a maximum power of 2000W", "Comes with a 3-year free warranty service", etc.].

3. Facts of Misrepresentation: After I received the goods on [Receipt Date], I found that the actual situation of the goods is quite different from your representations. Specifically, [Describe the actual situation in detail to correspond to the previous representations, e.g., "The goods are actually made of 50% cotton and 50% polyester, which has been confirmed by a professional testing agency (test report attached)", "The goods failed to work normally after only 3 months of use", "The actual maximum power of the goods is only 1200W, which cannot meet the use needs", "Your company refused to provide the promised 3-year free warranty service on the ground that the goods are not covered by the warranty", etc.].

Your company's act of providing false or misleading information about the goods constitutes misrepresentation in accordance with [Relevant Laws and Regulations, e.g., the Consumer Rights Protection Law of the People's Republic of China, the Law of the People's Republic of China on the Protection of Consumer Rights and Interests, the Uniform Commercial Code, etc.]. This act has violated my legitimate rights and interests as a consumer/buyer, and caused me to suffer corresponding economic losses and troubles in use.

In view of the above facts, I hereby formally demand that your company: 1. Provide a full refund of [Amount, Currency] for the aforementioned goods to me within [X] working days from the date of receipt of this letter; 2. Bear the return shipping cost incurred when I return the goods (if necessary). The refund shall be made to the following account: Account Holder: [Your Name], Bank Name: [Bank Name], Account Number: [Account Number].

I have attached relevant evidence materials, including [List of Attached Materials, e.g., purchase order, payment voucher, product promotion materials, photos of the actual goods, test report, communication records with your company's staff, etc.], for your verification.

I sincerely hope that your company will attach great importance to this matter and handle the refund as required within the specified time. If your company fails to respond to my demand or refuses to handle the refund without justifiable reasons within the aforementioned time limit, I will have to take further legal measures, including but not limited to filing a complaint with the relevant regulatory authorities, initiating arbitration or litigation, to safeguard my legitimate rights and interests. At that time, all legal liabilities and costs arising therefrom shall be borne by your company.

Please contact me at [Your Contact Information: Phone/Email] for any matters related to the refund. I look forward to your positive response and handling.

Sincerely,

[Your Full Name]
[Your Address]
[Your Contact Information: Phone/Email]

Enclosures: 1. [List of Enclosed Materials 1]; 2. [List of Enclosed Materials 2]; ...`,
  },
  contract: {
    prompt: "I'm exploring a potential partnership with another startup. We need to exchange confidential business information, product roadmaps, and financial data. I need a mutual NDA to protect both parties during our discussions.",
    answer: `Non-Disclosure Agreement (NDA) for Startup Potential Partnership Discussions

This Non-Disclosure Agreement (the "Agreement") is entered into as of [Effective Date] (the "Effective Date") by and between:

[Startup Name], a [Jurisdiction of Incorporation] corporation with its principal place of business at [Startup Address] (hereinafter "Disclosing Party");

and

[Counterparty Name], a [Jurisdiction of Incorporation] [entity type, e.g., corporation/limited liability company] with its principal place of business at [Counterparty Address] (hereinafter "Receiving Party").

Collectively, the Disclosing Party and the Receiving Party are referred to herein as the "Parties."

WHEREAS the Parties intend to engage in discussions regarding a potential partnership (the "Potential Partnership") between them, which may involve the disclosure of confidential and proprietary information by one Party to the other;

WHEREAS the Parties acknowledge that the confidential information disclosed in connection with such discussions is valuable and proprietary, and that unauthorized disclosure or use of such information would cause irreparable harm to the Disclosing Party;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Parties agree as follows:

1. Definition of Confidential Information

"Confidential Information" means any non-public information, whether oral, written, electronic, or in any other form, disclosed by the Disclosing Party to the Receiving Party in connection with the Potential Partnership, including but not limited to:

• Business plans, financial projections, revenue data, and other financial information of the Disclosing Party;
• Product or service concepts, designs, prototypes, technical specifications, and intellectual property (including patents, trademarks, copyrights, and trade secrets) of the Disclosing Party;
• Customer lists, supplier information, marketing strategies, and other business intelligence of the Disclosing Party;
• Any information marked as "confidential" or "proprietary" at the time of disclosure, or which a reasonable person would recognize as confidential given the nature of the information and the circumstances of disclosure;
• The existence and terms of the Potential Partnership discussions between the Parties.

Confidential Information shall not include any information that:

• Is or becomes publicly available through no fault of the Receiving Party;
• Was already in the Receiving Party's possession prior to disclosure by the Disclosing Party, as evidenced by written records;
• Is independently developed by the Receiving Party without reference to or use of the Disclosing Party's Confidential Information;
• Is rightfully obtained by the Receiving Party from a third party who is not bound by a confidentiality obligation to the Disclosing Party;
• Is disclosed by the Receiving Party in accordance with a requirement of law or a valid order of a court or governmental authority, provided that the Receiving Party gives the Disclosing Party prompt written notice of such requirement prior to disclosure (to the extent legally permissible) and cooperates with the Disclosing Party in seeking a protective order or other remedy.

2. Confidentiality Obligations

The Receiving Party shall hold and maintain the Confidential Information in strict confidence and shall not disclose, disseminate, or otherwise make available any Confidential Information to any third party without the prior written consent of the Disclosing Party.

The Receiving Party shall use the same degree of care to protect the Confidential Information as it uses to protect its own confidential information of similar nature, but in no event less than a reasonable degree of care.

The Receiving Party shall limit access to the Confidential Information to only those of its employees, agents, or representatives who have a legitimate need to know such information for the purpose of evaluating the Potential Partnership, and who are bound by confidentiality obligations no less restrictive than those set forth herein. The Receiving Party shall be liable for any breach of this Agreement by its employees, agents, or representatives.

3. Use Restriction

The Receiving Party shall use the Confidential Information solely for the purpose of evaluating and negotiating the Potential Partnership. The Receiving Party shall not use the Confidential Information for any other purpose, including but not limited to developing, marketing, or selling products or services that compete with those of the Disclosing Party.

4. Return or Destruction of Confidential Information

Upon the Disclosing Party's written request, or upon the termination of the Potential Partnership discussions (whichever occurs first), the Receiving Party shall promptly return to the Disclosing Party all original and copies of Confidential Information (in any form) in its possession or control, or shall certify in writing that it has destroyed all such Confidential Information (with the exception of one copy retained solely for compliance with applicable law, which shall remain subject to the confidentiality obligations herein).

5. Term

The confidentiality obligations set forth herein shall remain in effect for a period of [X] years from the date of disclosure of the Confidential Information, or [Y] years from the Effective Date, whichever is longer.

6. No Obligation to Proceed

Nothing in this Agreement shall obligate either Party to enter into any partnership or other business relationship with the other Party. Either Party may terminate the Potential Partnership discussions at any time, for any reason, without liability to the other Party (except for liabilities arising from breach of this Agreement).

7. Intellectual Property Rights

This Agreement does not transfer any intellectual property rights from the Disclosing Party to the Receiving Party. All intellectual property rights in and to the Confidential Information shall remain the exclusive property of the Disclosing Party.

8. Remedies for Breach

The Parties acknowledge that a breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages may not be an adequate remedy. Therefore, in addition to any other remedies available at law or in equity, the Disclosing Party shall be entitled to seek injunctive relief to enforce the terms of this Agreement.

9. General Provisions

9.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of [Governing Jurisdiction], without regard to its conflict of laws principles.

9.2 Dispute Resolution: Any dispute arising out of or in connection with this Agreement shall first be resolved through good-faith negotiations between the Parties. If the dispute cannot be resolved through negotiations within [30] days, it shall be submitted to [arbitration/litigation] in [Venue] in accordance with the rules of [Arbitration Institution, if applicable].

9.3 Assignment: Neither Party may assign this Agreement or any of its rights or obligations herein without the prior written consent of the other Party.

9.4 Entire Agreement: This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, or understandings, whether oral or written.

9.5 Amendments: This Agreement may only be amended or modified by a written document signed by both Parties.

9.6 Severability: If any provision of this Agreement is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

___________________________
Name: [Authorized Signatory of Startup]
Title: [Title of Signatory]
Company: [Startup Name]
Date: ________________________

___________________________
Name: [Authorized Signatory of Counterparty]
Title: [Title of Signatory]
Company: [Counterparty Name]
Date: ________________________`,
  },
};
