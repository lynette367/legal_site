'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BreachTool {
  id: number;
  title: string;
  seoDesc: string;
  longTail: string;
  steps: string[];
  riskPoints: string[];
}

export default function CCPABreachLettersClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);

  const breachTool: BreachTool = {
    id: 6,
    title: 'CCPA Data Breach Letters',
    seoDesc: 'Automated CCPA-compliant notification drafting for security incidents.',
    longTail: 'CCPA data breach notification templates',
    steps: [
      'State: California (Required)',
      'Breach Type: PII / Financial / Health',
      'Affected Count: <500 / 500-1000 / 1000+'
    ],
    riskPoints: ['Strict statutory deadline (72hrs)', 'Incomplete consumer rights disclosure', 'Liability under Private Right of Action']
  };

  const handleSelect = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setResult(breachTool.riskPoints);
      }, 1500);
    }
  };

  return (
    <section className="space-y-6 pt-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold text-text-lavender uppercase tracking-widest mx-auto">
        AI Legal Tool
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center">
        CCPA Data Breach Notification Letter Generator for California Businesses
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-text-primary/60 text-center">
        Create CCPA/CPRA-compliant data breach notification letters in 1 click for your California business. Free AI-powered templates, instant download, no legal expertise needed.
      </p>

      <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-white border border-border-lavender shadow-soft relative overflow-hidden">
        <button onClick={() => router.back()} className="text-sm text-gray-400 mb-4">← Back</button>

        {isLoading ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-lavender mx-auto"></div>
            <p className="mt-4 text-primary-lavender font-medium">AI Analyzing Regulation Gaps...</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-green-700 text-center">✅ Analysis Ready</h4>
            <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
              <p className="font-bold text-gray-800 mb-3">Key Risk Alerts:</p>
              <ul className="space-y-2">
                {result.map((point: string, i: number) => (
                  <li key={i} className="text-sm text-red-600 flex items-start">
                    <span className="mr-2">⚠️</span> {point}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => router.push(`/pricing?tool=${encodeURIComponent(breachTool.title)}`)}
                className="w-full mt-6 py-4 bg-primary-lavender text-white rounded-xl font-bold shadow-lg hover:bg-primary-lavender-dark transition-colors"
              >
                Unlock My Report
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs font-bold text-primary-lavender uppercase tracking-wider mb-2">Step {step} of 3</p>
            <h4 className="text-lg font-medium mb-6">
              {breachTool?.steps[step - 1].includes(':') 
                ? breachTool.steps[step - 1].split(':')[0] 
                : 'Question'}
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {(() => {
                const stepContent = breachTool?.steps[step - 1];
                if (!stepContent) return null;
                
                const optionsPart = stepContent.includes(':') 
                  ? stepContent.split(':')[1] 
                  : stepContent;
                const options = optionsPart.split('/');
                
                return options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect()}
                    className="py-4 px-6 bg-white border border-gray-200 rounded-xl hover:border-primary-lavender hover:bg-primary-lavender/5 text-left font-medium transition-all"
                  >
                    {opt.trim()}
                  </button>
                ));
              })()}
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="max-w-3xl mx-auto mt-20 space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">What Is a CCPA Data Breach Notification Letter?</h2>
          <p className="text-text-primary/80">
            A CCPA data breach notification letter is a formal document that California businesses must send to affected consumers when their personal information has been compromised in a security breach. 
            This letter is required by the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA) to inform individuals about the breach and their rights.
          </p>
          <p className="text-text-primary/80">
            The letter must include specific information about the breach, the types of data affected, and steps consumers can take to protect themselves from identity theft or fraud.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">When Do You Need to Send a Data Breach Notice Under CCPA?</h2>
          <p className="text-text-primary/80">
            Under CCPA/CPRA, businesses must send data breach notifications when:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
            <li>A security breach has occurred that involves unencrypted personal information</li>
            <li>The breach affects California residents</li>
            <li>The business is required to comply with CCPA (based on revenue, user count, or data collection)</li>
          </ul>
          <p className="text-text-primary/80">
            Notifications must be sent &quot;without unreasonable delay&quot; and no later than 72 hours after discovery of the breach.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Key Requirements for CCPA/CPRA Breach Notification Letters</h2>
          <p className="text-text-primary/80">
            CCPA/CPRA breach notification letters must include:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-text-primary/80">
            <li>A description of the breach incident</li>
            <li>The types of personal information affected</li>
            <li>Steps consumers can take to protect themselves</li>
            <li>Contact information for the business</li>
            <li>Information about free credit monitoring services (if offered)</li>
            <li>Details about consumer rights under CCPA/CPRA</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Free CCPA Data Breach Letter Template</h2>
          <p className="text-text-primary/80">
            Our AI-powered generator creates compliant CCPA data breach notification letters tailored to your specific situation. The free version provides a professional template that includes all required elements under CCPA/CPRA.
          </p>
          <p className="text-text-primary/80">
            For more comprehensive coverage and customization, upgrade to our premium version for unlimited access to AI-generated letters.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">How to Use Our AI Breach Letter Generator</h2>
          <p className="text-text-primary/80">
            Using our generator is simple:
          </p>
          <ol className="list-decimal pl-8 space-y-2 text-text-primary/80">
            <li>Select your state (California)</li>
            <li>Choose the type of data breach (PII, Financial, Health)</li>
            <li>Indicate the number of affected individuals</li>
            <li>Generate your breach notification letter instantly</li>
            <li>Download and send the letter to affected consumers</li>
          </ol>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Frequently Asked Questions About CCPA Data Breach Rules</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">What is the deadline for sending CCPA breach notifications?</h3>
              <p className="text-text-primary/70">
                CCPA requires businesses to notify affected consumers &quot;without unreasonable delay&quot; and no later than 72 hours after discovering the breach.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">Do I need to notify the California Attorney General?</h3>
              <p className="text-text-primary/70">
                Yes, if the breach affects 500 or more California residents, you must also notify the California Attorney General within the same 72-hour timeframe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">What happens if I don&apos;t send required breach notifications?</h3>
              <p className="text-text-primary/70">
                Failure to comply with CCPA breach notification requirements can result in significant fines and potential legal action from affected consumers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
              <h3 className="text-xl font-bold mb-2">Can I use a template for breach notifications?</h3>
              <p className="text-text-primary/70">
                Yes, templates can be used as a starting point, but they should be customized to reflect the specific details of your breach incident to ensure compliance.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary">Related Compliance Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/tools/ccpa-checker" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
              <h3 className="font-bold text-text-primary">CCPA Compliance Checker</h3>
              <p className="text-sm text-text-primary/70">Audit your business for CCPA compliance gaps.</p>
            </a>
            <a href="/tools/ccpa-generator" className="p-4 rounded-xl border border-border-lavender hover:border-primary-lavender hover:bg-primary-lavender/5 transition-all">
              <h3 className="font-bold text-text-primary">CCPA Privacy Policy Generator</h3>
              <p className="text-sm text-text-primary/70">Create compliant privacy policies for your business.</p>
            </a>
          </div>
        </section>
      </div>

      <div className="max-w-2xl mx-auto mt-12 bg-gray-50 rounded-2xl p-6 text-left">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Disclaimer</p>
        <p className="text-sm text-gray-600">
          This tool is for reference only, not legal advice. Consult a licensed California attorney for your specific legal needs. 
          CCPA requires notification &quot;without unreasonable delay&quot; following the discovery of a breach that involves unencrypted personal information.
        </p>
      </div>
    </section>
  );
}
