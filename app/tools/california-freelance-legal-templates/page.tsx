import Link from 'next/link';
import ClientComponent from './ClientComponent';

export const metadata = {
  title: "California Freelance Legal Templates | AI-Generated CCPA & FWPA Compliant",
  description: "Free AI legal templates for California freelancers & independent contractors. Fully compliant with CCPA/CPRA and FWPA (SB 988) — contracts, privacy policies, data breach letters.",
  keywords: "California freelance legal templates, AI legal templates for freelancers, CCPA for freelancers, FWPA contract template, independent contractor agreement California",
  alternates: {
    canonical: "https://pancothink.com/tools/california-freelance-legal-templates"
  }
};

export default function CaliforniaFreelanceLegalTemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-3xl font-bold mb-6">
          AI Legal Templates for California Freelancers & Independent Contractors
        </h1>
        <p className="text-lg text-text-primary/70 max-w-3xl mx-auto">
          Free AI-generated legal templates tailored for California freelancers, fully compliant with CCPA/CPRA and FWPA (SB 988).
        </p>
      </section>

      {/* Tool Functionality Section */}
      <section className="bg-white rounded-2xl p-8 border border-border-lavender shadow-soft">
        <ClientComponent />
      </section>

      {/* SEO Content Section */}
      <div className="max-w-3xl mx-auto space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Legal Documents Every California Freelancer Must Have</h2>
          <p className="text-text-primary/80">
            As a California freelancer, having the right legal documents is essential to protect your business and ensure compliance with state laws. Here are the key documents you should have:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
            <li>Independent contractor agreements</li>
            <li>Privacy policies for your services</li>
            <li>Terms of service</li>
            <li>Non-disclosure agreements (NDAs)</li>
            <li>Invoicing and payment terms</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">CCPA Compliance Rules for Freelancers & Independent Contractors</h2>
          <p className="text-text-primary/80">
            The California Consumer Privacy Act (CCPA) affects freelancers who collect personal information from California residents. Here&lsquo;s what you need to know:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
            <li>You must disclose how you collect, use, and share personal information</li>
            <li>You must provide a way for consumers to opt out of data sharing</li>
            <li>You must respond to data subject requests within 45 days</li>
            <li>You must implement reasonable security measures to protect personal information</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">FWPA (SB 988) Contract Requirements in California</h2>
          <p className="text-text-primary/80">
            The Freelance Workers Protection Act (FWPA) or SB 988 establishes new rights and protections for freelance workers in California. Key requirements include:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
            <li>Written contracts for projects valued at $600 or more</li>
            <li>Payment terms and deadlines must be clearly stated</li>
            <li>Final payment must be made within 30 days of project completion</li>
            <li>Freelancers have the right to file complaints for non-payment</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Our AI-Powered Legal Template Generator for Freelancers</h2>
          <p className="text-text-primary/80">
            Our AI tool generates custom legal templates tailored to your specific needs as a California freelancer. Here&lsquo;s how it works:
          </p>
          <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
            <li>Select the type of template you need</li>
            <li>Answer a few simple questions about your business</li>
            <li>Our AI generates a custom template in minutes</li>
            <li>Review and download your template</li>
          </ol>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions for California Freelancers</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">Do I need a written contract as a freelancer in California?</h3>
              <p className="text-text-primary/70">
                Yes, for projects valued at $600 or more, the FWPA requires a written contract that includes payment terms, deliverables, and deadlines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">Am I required to have a privacy policy as a freelancer?</h3>
              <p className="text-text-primary/70">
                If you collect personal information from clients or website visitors, you should have a privacy policy that complies with CCPA requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">What are the payment requirements under FWPA?</h3>
              <p className="text-text-primary/70">
                Under FWPA, freelancers must be paid within 30 days of completing a project, and payment terms must be clearly stated in the contract.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Related CCPA & Legal Tools for Your Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/tools/ccpa-checker" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
              <h3 className="font-bold text-text-primary">CCPA Compliance Checker</h3>
              <p className="text-sm text-text-primary/70">Audit your business for CCPA compliance gaps.</p>
            </Link>
            <Link href="/tools/ccpa-generator" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
              <h3 className="font-bold text-text-primary">CCPA Privacy Policy Generator</h3>
              <p className="text-sm text-text-primary/70">Create compliant privacy policies for your business.</p>
            </Link>
            <Link href="/tools/freelancer-contract-review" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
              <h3 className="font-bold text-text-primary">Freelancer Contract Review</h3>
              <p className="text-sm text-text-primary/70">Review your contracts for compliance with California laws.</p>
            </Link>
            <Link href="/tools/ai-use-policy" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
              <h3 className="font-bold text-text-primary">Custom AI Use Policy</h3>
              <p className="text-sm text-text-primary/70">Create policies for using AI in your freelance business.</p>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-16 p-6 bg-primary-lavender/10 rounded-xl border border-primary-lavender/30">
          <p className="text-text-primary/80 text-sm">
            This tool provides AI-generated templates for informational purposes only. It is not legal advice. Consult a licensed California attorney.
          </p>
        </section>
      </div>
    </div>
  );
}