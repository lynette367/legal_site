'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

interface FormData {
  governingState: string;
  projectAmount: string;
  serviceTitle: string;
  serviceDetails: string;
  clientName: string;
  clientAddress: string;
  freelancerName: string;
  freelancerAddress: string;
  paymentDeadlineDays: string;
  lateFeeTerms: string;
  killFeeTerms: string;
}

const UniversalContractGeneratorClient: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState<FormData>({
    governingState: '',
    projectAmount: '',
    serviceTitle: '',
    serviceDetails: '',
    clientName: '',
    clientAddress: '',
    freelancerName: '',
    freelancerAddress: '',
    paymentDeadlineDays: '30',
    lateFeeTerms: '1.5% per month (18% per annum)',
    killFeeTerms: '50% of remaining project value upon notice of cancellation',
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [version, setVersion] = useState<'free' | 'premium'>('free');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setFormData(prev => ({ ...prev, governingState: selectedState }));
    if (selectedState === 'CA') {
      router.push('/contracts/california-independent-contractor-agreement-template#generator-form');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedStateObj = US_STATES.find(s => s.code === formData.governingState);
  const stateName = selectedStateObj ? selectedStateObj.name : 'the Governing State';

  const generateFreeContract = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const contract = `# INDEPENDENT CONTRACTOR AGREEMENT

## 1. Parties
This Independent Contractor Agreement ("Agreement") is made and entered into on ${today} by and between:

**Client:** ${formData.clientName}
Address: ${formData.clientAddress}

**Contractor:** ${formData.freelancerName}
Address: ${formData.freelancerAddress}

## 2. Scope of Services
Contractor agrees to perform the following services for Client ("Services"):
**Title/Role:** ${formData.serviceTitle}
**Details:** ${formData.serviceDetails || 'Services as mutually agreed upon by the parties.'}

## 3. Compensation & Payment Terms
Client shall pay Contractor the total amount of $${formData.projectAmount} for the Services rendered.

**Payment Schedule:** Invoices are due within ${formData.paymentDeadlineDays} calendar days from invoice date ("Net ${formData.paymentDeadlineDays}").
**Late Payment Fee:** Overdue invoices shall accrue interest/late charges at the rate of ${formData.lateFeeTerms || '1.5% per month'} from the due date until paid in full.

## 4. Work Ownership & Intellectual Property
Upon Contractor's receipt of full payment, all right, title, and interest in deliverables created under this Agreement shall transfer to Client. Contractor retains ownership of all pre-existing materials, tools, and general technical know-how.

## 5. Cancellation & Kill Fee
Either party may terminate this Agreement upon written notice. Upon termination, Client shall pay Contractor for all work completed prior to termination plus a cancellation/kill fee equal to: ${formData.killFeeTerms}.

## 6. Independent Contractor Relationship
Contractor is an independent contractor, not an employee or partner of Client. Contractor is responsible for all income taxes, self-employment taxes, and business expenses.

## 7. Dispute Resolution & Governing Law
This Agreement shall be governed by and construed in accordance with the laws of the State of ${stateName}. The parties agree to attempt to resolve any dispute through good-faith mediation prior to commencing litigation.

## 8. Signatures

### Client Signature
_________________________
${formData.clientName}
Date: _______________

### Contractor Signature
_________________________
${formData.freelancerName}
Date: _______________

---
*This is a standard independent contractor agreement template. For tailored AI risk clauses, upgrade to premium.*`;

    setGeneratedContent(contract);
    setIsGenerated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.governingState) {
      setError('Please select a governing state for this engagement.');
      return;
    }

    if (version === 'free') {
      generateFreeContract();
    } else {
      setIsLoading(true);
      try {
        const response = await fetch('/api/ai/contract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractType: `Universal Independent Contractor Agreement (${stateName})`,
            requirements: `Governing State: ${stateName} (${formData.governingState})
Project Amount: $${formData.projectAmount}
Service Title: ${formData.serviceTitle}
Service Details: ${formData.serviceDetails}
Client: ${formData.clientName}, Address: ${formData.clientAddress}
Contractor: ${formData.freelancerName}, Address: ${formData.freelancerAddress}
Payment Terms: Net ${formData.paymentDeadlineDays} days
Late Fee: ${formData.lateFeeTerms}
Kill Fee: ${formData.killFeeTerms}

Requirements: Generate a generic, state-agnostic professional independent contractor agreement for ${stateName} that includes:
1. Itemized scope of work and clear deliverables.
2. Written compensation schedule and Net ${formData.paymentDeadlineDays} payment terms.
3. Contractual late fee terms (${formData.lateFeeTerms}).
4. Deliverable ownership transfer upon full payment.
5. Cancellation / kill fee clause.
6. Dispute resolution through mediation under the laws of ${stateName}.
7. Explicitly state the independent contractor relationship.
Do NOT include statutory California SB 988 references, double damages multipliers, or state labor commissioner penalties. Keep terms strictly contractual.`,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            setShowLoginModal(true);
            setIsLoading(false);
            return;
          }
          const errorData = await response.json();
          if (response.status === 402 && errorData?.code === 'INSUFFICIENT_CONTRACTS') {
            setShowUpgradeModal(true);
            return;
          }
          throw new Error(errorData.error || `API error: ${response.status}`);
        }

        const data = await response.json();
        if (typeof data.answer === 'string') {
          setGeneratedContent(data.answer);
          setIsGenerated(true);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate contract');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      governingState: '',
      projectAmount: '',
      serviceTitle: '',
      serviceDetails: '',
      clientName: '',
      clientAddress: '',
      freelancerName: '',
      freelancerAddress: '',
      paymentDeadlineDays: '30',
      lateFeeTerms: '1.5% per month (18% per annum)',
      killFeeTerms: '50% of remaining project value upon notice of cancellation',
    });
    setIsGenerated(false);
    setError(null);
    setGeneratedContent(null);
    setShowUpgradeModal(false);
    setShowLoginModal(false);
    setVersion('free');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8" id="generator-form">
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-2xl text-center">
            <div className="w-16 h-16 bg-primary-lavender/10 text-primary-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Sign In Required</h3>
            <p className="text-sm text-text-primary/70 mb-6 leading-relaxed">
              Premium contracts feature advanced IP protection and custom clauses. Please sign in to unlock this generation.
            </p>
            <div className="space-y-3">
              <Link href="/login" className="w-full block text-center px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90">
                Go to Sign In Page
              </Link>
              <button onClick={() => setShowLoginModal(false)} className="w-full px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-text-primary mb-4">Purchase Contract Credits</h3>
            <p className="text-text-primary/70 mb-6">You need a contract credit to generate the premium contract. Each generation costs $4.99.</p>
            <div className="space-y-3">
              <a href="/pricing" className="w-full block text-center px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90">Purchase for $4.99</a>
              <button onClick={() => setShowUpgradeModal(false)} className="w-full px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {!isGenerated ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Generate Your Independent Contractor Agreement
          </h2>
          <p className="text-sm text-gray-500">
            Compliant, professional, and customizable for any state in the US.
          </p>

          {/* State selector */}
          <div className="space-y-2 bg-primary-lavender/5 border border-primary-lavender/20 p-4 rounded-xl">
            <label htmlFor="governingState" className="block text-sm font-bold text-text-primary">
              Which state governs this engagement? <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-text-primary/60">
              Usually your client&apos;s state, or whatever state is named in your existing agreement.
            </p>
            <select
              id="governingState"
              name="governingState"
              value={formData.governingState}
              onChange={handleStateChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender bg-white font-medium"
              required
            >
              <option value="" disabled>-- Select state --</option>
              {US_STATES.map(s => (
                <option key={s.code} value={s.code}>
                  {s.name} {s.code === 'CA' ? '(SB 988 Protections Apply →)' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-text-primary/70 pt-1">
              💡 <span className="font-semibold">Not sure?</span> If your client is based in California, SB 988 protections may apply to you even if you aren&apos;t in California — select California above.
            </p>
          </div>

          {/* Version Selection */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-semibold text-text-primary">Select Contract Version</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`border rounded-lg p-4 cursor-pointer ${version === 'free' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-gray-200'}`} onClick={() => setVersion('free')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-primary">Free Version</h4>
                    <p className="text-sm text-text-primary/70 mt-1">Standard contractor terms</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${version === 'free' ? 'border-primary-lavender bg-primary-lavender' : 'border-gray-300'}`}>
                    {version === 'free' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
              <div className={`border rounded-lg p-4 cursor-pointer ${version === 'premium' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-gray-200'}`}
                onClick={() => {
                  if (!session) { setShowLoginModal(true); }
                  else { setVersion('premium'); }
                }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-primary">Premium Version</h4>
                    <p className="text-sm text-text-primary/70 mt-1">Advanced AI-Drafted Contract</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${version === 'premium' ? 'border-primary-lavender bg-primary-lavender' : 'border-gray-300'}`}>
                    {version === 'premium' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Project Amount */}
          <div className="space-y-2">
            <label htmlFor="projectAmount" className="block text-sm font-medium text-text-primary">Project Amount ($)</label>
            <input type="number" id="projectAmount" name="projectAmount" value={formData.projectAmount} onChange={handleInputChange} placeholder="e.g. 1500" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender" required />
          </div>

          {/* Service Title */}
          <div className="space-y-2">
            <label htmlFor="serviceTitle" className="block text-sm font-medium text-text-primary">Service Title / Role</label>
            <input
              type="text"
              id="serviceTitle"
              name="serviceTitle"
              value={formData.serviceTitle}
              onChange={handleInputChange}
              placeholder="e.g. Graphic Designer / Software Engineering Consultant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceDetails" className="block text-sm font-medium text-text-primary">Service Details / Scope of Work</label>
            <textarea id="serviceDetails" name="serviceDetails" value={formData.serviceDetails} onChange={handleInputChange} placeholder="Describe the deliverables, milestones, or technical requirements in detail..." rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender"></textarea>
          </div>

          {/* Freelancer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Contractor Information (You)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="freelancerName" className="block text-sm font-medium text-text-primary">Your Name / Business Name</label>
                <input type="text" id="freelancerName" name="freelancerName" value={formData.freelancerName} onChange={handleInputChange} placeholder="Full legal name or LLC" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="freelancerAddress" className="block text-sm font-medium text-text-primary">Your Business Address</label>
                <input type="text" id="freelancerAddress" name="freelancerAddress" value={formData.freelancerAddress} onChange={handleInputChange} placeholder="City, State, Zip" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Client Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="clientName" className="block text-sm font-medium text-text-primary">Client Company / Individual Name</label>
                <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Client legal name" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="clientAddress" className="block text-sm font-medium text-text-primary">Client Address</label>
                <input type="text" id="clientAddress" name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Client legal address" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="paymentDeadlineDays" className="block text-sm font-medium text-text-primary">Payment Due Window (Days)</label>
              <input type="number" id="paymentDeadlineDays" name="paymentDeadlineDays" value={formData.paymentDeadlineDays} onChange={handleInputChange} placeholder="30" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="lateFeeTerms" className="block text-sm font-medium text-text-primary">Late Payment Fee</label>
              <input type="text" id="lateFeeTerms" name="lateFeeTerms" value={formData.lateFeeTerms} onChange={handleInputChange} placeholder="e.g. 1.5%/month" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="killFeeTerms" className="block text-sm font-medium text-text-primary">Cancellation / Kill Fee</label>
              <input type="text" id="killFeeTerms" name="killFeeTerms" value={formData.killFeeTerms} onChange={handleInputChange} placeholder="e.g. 50% remaining value" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex space-x-4 pt-4">
            <button type="submit" disabled={isLoading} className="flex-1 px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 disabled:opacity-50">
              {isLoading ? 'Generating Contract...' : version === 'free' ? 'Generate Free Contract' : 'Generate Premium Contract'}
            </button>
            <button type="button" onClick={handleReset} className="px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50">Reset</button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text-primary">Your Independent Contractor Agreement</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${version === 'free' ? 'bg-green-100 text-green-800' : 'bg-primary-lavender/20 text-primary-lavender'}`}>
              {version === 'free' ? 'Free Version' : 'Premium Version'}
            </span>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap font-sans text-sm text-text-primary/90">
                {generatedContent ? (
                  generatedContent.split('\n').map((line, index) => {
                    const cleanedLine = line.replace(/\*/g, '').trim();
                    if (cleanedLine.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold text-center mb-6">{cleanedLine.replace('# ', '')}</h1>;
                    if (cleanedLine.startsWith('## ')) return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{cleanedLine.replace('## ', '')}</h2>;
                    if (cleanedLine.trim() === '') return <br key={index} />;
                    return <p key={index} className="mb-2">{cleanedLine}</p>;
                  })
                ) : (
                  <p>Assembling custom sections...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button onClick={handleReset} className="flex-1 px-6 py-3 bg-gray-100 text-text-primary font-medium rounded-md hover:bg-gray-200">Create Another Contract</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalContractGeneratorClient;
