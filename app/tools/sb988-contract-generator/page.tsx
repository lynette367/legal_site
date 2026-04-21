import { Metadata } from 'next';
import SB988GeneratorClient from './SB988GeneratorClient';

export const metadata: Metadata = {
  title: 'Free AI Contract Generator for CA Graphic Designers: 100% SB 988 Compliant (2026 Updated) | $250+ Project Protection',
  description: 'Protect your creative work under California\'s SB 988 (Freelance Worker Protection Act). Generate a legally mandatory contract in 60 seconds for $250+ projects. Our AI ensures itemized services, payment deadlines, 2x late payment penalties & $1,000 refusal clauses—built exclusively for CA graphic designers. Free preview, no credit card required.',
  keywords: ['SB 988', 'California freelance law', 'contract generator', 'graphic designers', '$250+ projects', 'freelance worker protection'],
  openGraph: {
    title: 'Free AI Contract Generator for CA Graphic Designers: 100% SB 988 Compliant (2026 Updated) | $250+ Project Protection',
    description: 'Protect your creative work under California\'s SB 988 (Freelance Worker Protection Act). Generate a legally mandatory contract in 60 seconds for $250+ projects.',
    type: 'website',
  },
};

export default function SB988ContractGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-widest mb-8">
          Free SB 988 Compliant Contract Generator for <br />
          <span className="text-primary-lavender">California Graphic Designers</span> <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/80">($250+ Projects)</span>
        </h1>
        
        <p className="text-lg text-text-primary/70 mb-12">
          Protect your creative work under California&apos;s SB 988 (Freelance Worker Protection Act).
          Generate a legally mandatory contract in 60 seconds for $250+ projects.
        </p>
        
        <SB988GeneratorClient />
      </div>
    </div>
  );
}