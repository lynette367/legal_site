import Link from "next/link";

export const metadata = {
  title: "[PancoLegal] | California SB 988 Compliance AI | Freelance Contract & Payment Protection",
  description: "Protect your freelance income under CA SB 988. Use our AI to draft mandatory contracts for projects over $250, track payment deadlines, and calculate 2x late payment penalties. The only AI legal tool built specifically for the California Freelance Worker Protection Act.",
  alternates: {
    canonical: 'https://pancothink.com',
  },
  openGraph: {
    title: "[PancoLegal] | California SB 988 Compliance AI | Freelance Contract & Payment Protection",
    description: "Protect your freelance income under CA SB 988. Use our AI to draft mandatory contracts for projects over $250, track payment deadlines, and calculate 2x late payment penalties. The only AI legal tool built specifically for the California Freelance Worker Protection Act.",
    url: 'https://pancothink.com',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "[PancoLegal] | California SB 988 Compliance AI | Freelance Contract & Payment Protection",
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};



export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl pt-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          California Freelancer Legal Protection
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl mb-6">
          Secure Your Freelance Business <br />
          <span className="text-primary-lavender">Under California SB 988</span>
        </h1>
        <h2 className="sr-only">California Freelance Isn&apos;t Free Act compliance tool</h2>
        <p className="mx-auto max-w-2xl text-lg text-text-primary/70 leading-relaxed mb-10">
          AI-powered contracts and legal tools built for the Freelance Isn&apos;t Free Act. Ensure you get paid on time and stay compliant with California&apos;s new mandatory contract laws.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tools/sb988-contract-generator"
            className="rounded-xl bg-primary-lavender px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-lavender/25 transition hover:bg-primary-lavender-dark hover:-translate-y-0.5"
          >
            SB 988 Contract Generator
          </Link>
          <Link
            href="/tools/sb988-late-payment-calculator"
            className="rounded-xl border border-primary-lavender/30 bg-primary-lavender/5 px-8 py-4 text-lg font-bold text-primary-lavender transition hover:bg-primary-lavender/10 hover:-translate-y-0.5"
          >
            Late Payment Penalty Calculator
          </Link>
        </div>
        <div className="mt-8 text-sm text-text-primary/60 font-medium">
          Compliant with CA SB 988 & AB 5
        </div>
      </section>

      {/* SB 988 Resource Center - Section 2 */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-primary-lavender/5 -skew-y-3 rounded-[3rem] -z-10 transform scale-105"></div>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">SB 988 Resource Center</h2>
            <p className="text-lg text-text-primary/70 max-w-2xl mx-auto">
              Essential tools and resources to help California freelancers comply with the Freelance Worker Protection Act
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SB 988 Contract Generator Card */}
            <Link
              href="/tools/sb988-contract-generator"
              className="group relative overflow-hidden rounded-2xl border border-primary-lavender/30 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-primary-lavender"
            >
              <div className="mb-4 inline-block rounded-full bg-primary-lavender/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-lavender transition-colors">
                SB 988 Contract Generator
              </h3>
              <p className="text-text-primary/70 mb-6">
                Generate legally mandatory contracts for projects over $250, ensuring compliance with California&apos;s Freelance Worker Protection Act.
              </p>
              <div className="flex items-center text-primary-lavender font-medium group-hover:translate-x-1 transition-transform">
                <span>Access Generator</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>

            {/* SB 988 Late Payment Penalty Calculator Card */}
            <Link
              href="/tools/sb988-late-payment-calculator"
              className="group relative overflow-hidden rounded-2xl border border-primary-lavender/30 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-primary-lavender"
            >
              <div className="mb-4 inline-block rounded-full bg-primary-lavender/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-lavender transition-colors">
                Late Payment Penalty Calculator
              </h3>
              <p className="text-text-primary/70 mb-6">
                Calculate potential 2x late payment penalties under CA SB 988 and determine how much you may be entitled to recover.
              </p>
              <div className="flex items-center text-primary-lavender font-medium group-hover:translate-x-1 transition-transform">
                <span>Use Calculator</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Content - Section 3 */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-text-primary">SB 988 Resources for Designers</h2>
          <p className="text-sm text-text-primary/60 mt-1">Expert guides to help California freelancers stay compliant</p>
        </div>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-primary-lavender/30 bg-primary-lavender/5 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-text-primary mb-2">The Graphic Designer&apos;s Guide to California&apos;s SB 988</h3>
            <p className="text-text-primary/70 mb-4">Learn the 5 mandatory contract clauses you need for every $250+ project, how to retain your IP rights, and use our specialized AI tool to generate a compliant agreement in seconds.</p>
            <a href="/guides/sb988-for-graphic-designers" className="inline-flex items-center text-primary-lavender font-medium hover:underline">
              Read Guide <span className="ml-1">→</span>
            </a>
          </div>
          <div className="p-6 rounded-2xl border border-primary-lavender/30 bg-primary-lavender/5 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-text-primary mb-2">How to Calculate Late Payment Penalties Under SB 988</h3>
            <p className="text-text-primary/70 mb-4">Discover how to calculate double damages for late payments and ensure you get the compensation you deserve as a California freelancer.</p>
            <a href="/tools/sb988-late-payment-calculator" className="inline-flex items-center text-primary-lavender font-medium hover:underline">
              Use Calculator <span className="ml-1">→</span>
            </a>
          </div>
          <div className="p-6 rounded-2xl border border-primary-lavender/30 bg-primary-lavender/5 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-text-primary mb-2">California Freelance Contract Templates</h3>
            <p className="text-text-primary/70 mb-4">Access pre-drafted contract templates specifically designed for California freelancers to ensure SB 988 compliance.</p>
            <a href="/tools/california-freelance-legal-templates" className="inline-flex items-center text-primary-lavender font-medium hover:underline">
              View Templates <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

