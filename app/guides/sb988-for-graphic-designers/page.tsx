import Link from "next/link";

export const metadata = {
  title: "SB 988 for Graphic Designers | California Freelance Contract Guide",
  description: "As a CA Graphic Designer, SB 988 protects your right to get paid. Learn the 5 mandatory contract clauses you need for every $250+ project, how to retain your IP rights, and use our specialized AI tool to generate a compliant agreement in seconds.",
  alternates: {
    canonical: 'https://pancothink.com/guides/sb988-for-graphic-designers',
  },
  openGraph: {
    title: "SB 988 for Graphic Designers | California Freelance Contract Guide",
    description: "As a CA Graphic Designer, SB 988 protects your right to get paid. Learn the 5 mandatory contract clauses you need for every $250+ project, how to retain your IP rights, and use our specialized AI tool to generate a compliant agreement in seconds.",
    url: 'https://pancothink.com/guides/sb988-for-graphic-designers',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SB 988 for Graphic Designers | California Freelance Contract Guide",
    description: "As a CA Graphic Designer, SB 988 protects your right to get paid. Learn the 5 mandatory contract clauses you need for every $250+ project, how to retain your IP rights, and use our specialized AI tool to generate a compliant agreement in seconds.",
    images: ['/og-image.png'],
  },
};

export default function SB988ForGraphicDesigners() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-primary-lavender hover:underline mb-4"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          The Graphic Designer&apos;s Guide to California&apos;s SB 988: How to Stay Compliant
        </h1>
        <div className="flex items-center text-sm text-text-primary/60">
          <span>Published: April 20, 2026</span>
          <span className="mx-2">•</span>
          <span>7 min read</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="prose prose-lg max-w-none">
        <p className="text-xl text-text-primary/80 mb-8">
          As a California graphic designer, you&apos;re protected by the Freelance Worker Protection Act (SB 988), which ensures you get paid fairly and on time for your creative work. This guide will walk you through everything you need to know to stay compliant and protect your rights.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">What is SB 988 and Why Does It Matter?</h2>
          <p className="mb-4">
            SB 988, also known as the Freelance Worker Protection Act, is a California law that went into effect on January 1, 2023. It&apos;s designed to protect freelance workers, including graphic designers, from non-payment and other unfair practices.
          </p>
          <p className="mb-4">
            For graphic designers, this means you have legal protections when working with clients, especially for projects worth $250 or more.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">5 Mandatory Contract Clauses for Graphic Designers</h2>
          <p className="mb-4">
            Under SB 988, any project worth $250 or more requires a written contract with these mandatory clauses:
          </p>
          <ol className="list-decimal pl-5 space-y-3 mb-6">
            <li><strong>Identification of the parties</strong>: Clear names and contact information for both you and your client</li>
            <li><strong>Description of services</strong>: Detailed scope of work, including deliverables and deadlines</li>
            <li><strong>Compensation terms</strong>: Total compensation and payment schedule</li>
            <li><strong>Payment deadline</strong>: Specific date or timeline for payment (must be 15 business days or less)</li>
            <li><strong>Retention of intellectual property rights</strong>: Clear terms about who owns the creative work</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Protecting Your Intellectual Property as a Designer</h2>
          <p className="mb-4">
            As a graphic designer, your intellectual property (IP) is your most valuable asset. SB 988 requires that contracts include clear terms about IP rights.
          </p>
          <p className="mb-4">
            Here&apos;s what you should include in your contracts:
          </p>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li><strong>Ownership rights</strong>: Specify whether you&apos;re transferring full ownership or retaining certain rights</li>
            <li><strong>Usage rights</strong>: Define how the client can use your work</li>
            <li><strong>Credit requirements</strong>: Whether you should be credited for your work</li>
            <li><strong>Non-exclusive rights</strong>: Can you use the work in your portfolio?</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Late Payment Penalties</h2>
          <p className="mb-4">
            One of the most powerful protections under SB 988 is the right to double damages for late payments. If a client pays you late, you may be entitled to twice the amount owed.
          </p>
          <p className="mb-4">
            For example, if a client owes you $1,000 and pays 30 days late, you could be entitled to an additional $1,000 in penalties.
          </p>
          <Link 
            href="/tools/sb988-late-payment-calculator" 
            className="inline-flex items-center text-primary-lavender font-medium hover:underline mb-4"
          >
            Calculate your potential late payment penalties →
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">How to Generate SB 988-Compliant Contracts</h2>
          <p className="mb-4">
            Creating SB 988-compliant contracts from scratch can be time-consuming and confusing. That&apos;s why we built a specialized AI tool just for California graphic designers.
          </p>
          <div className="bg-primary-lavender/5 border border-primary-lavender/30 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-text-primary mb-2">Our SB 988 Contract Generator for Graphic Designers</h3>
            <p className="mb-4">
              Our AI-powered tool generates legally compliant contracts specifically tailored for graphic design projects. It includes all the mandatory clauses required by SB 988 and allows you to customize terms to fit your specific needs.
            </p>
            <Link 
              href="/tools/sb988-contract-generator" 
              className="inline-flex items-center text-white bg-primary-lavender font-medium px-6 py-3 rounded-lg hover:bg-primary-lavender-dark transition"
            >
              Generate Your Contract Now →
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Case Study: A Graphic Designer&apos;s Experience with SB 988</h2>
          <p className="mb-4">
            Sarah, a freelance graphic designer in Los Angeles, was hired to create branding materials for a local startup. The project was worth $5,000, but the client refused to pay after receiving the final deliverables.
          </p>
          <p className="mb-4">
            Because Sarah had an SB 988-compliant contract, she was able to take legal action and recover not just the $5,000 owed, but an additional $5,000 in late payment penalties.
          </p>
          <p className="mb-4">
            This case highlights the importance of having a proper contract in place, especially for larger projects.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Key Takeaways for Graphic Designers</h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>Always use a written contract for projects worth $250 or more</li>
            <li>Include all 5 mandatory clauses required by SB 988</li>
            <li>Clearly define intellectual property rights in your contracts</li>
            <li>Know your rights regarding late payment penalties</li>
            <li>Use our specialized AI tool to generate compliant contracts quickly and easily</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-text-primary mb-2">Do I need a contract for every project?</h3>
              <p>Only for projects worth $250 or more. However, it&apos;s always a good idea to have a contract for any work you do.</p>
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-2">How long should I give clients to pay?</h3>
              <p>SB 988 requires payment within 15 business days or less. You can set shorter payment terms if you prefer.</p>
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-2">Can I still use my work in my portfolio?</h3>
              <p>Yes, as long as your contract specifies that you retain the right to use the work for self-promotional purposes.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Ready to Get Started?</h2>
          <p className="mb-6">
            Protect your freelance business and ensure you get paid fairly by using our SB 988-compliant contract generator specifically designed for graphic designers.
          </p>
          <Link 
            href="/tools/sb988-contract-generator" 
            className="inline-flex items-center text-white bg-primary-lavender font-medium px-6 py-3 rounded-lg hover:bg-primary-lavender-dark transition"
          >
            Generate Your SB 988-Compliant Contract →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border-lavender">
        <div className="text-center">
          <p className="text-sm text-text-primary/60 mb-4">
            This guide is for informational purposes only and does not constitute legal advice.
          </p>
          <Link 
            href="/" 
            className="text-primary-lavender font-medium hover:underline"
          >
            Back to PancoLegal
          </Link>
        </div>
      </footer>
    </div>
  );
}
