'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface FormData {
  projectAmount: string;
  serviceType: string;
  serviceDetails: string;
  clientName: string;
  clientAddress: string;
  designerName: string;
  designerAddress: string;
  paymentDeadline: string;
  internalProcessingDeadline: string;
  milestonePayments: string;
}

const FREE_ACCESS_EMAIL = "yqying95@gmail.com";

const SB988GeneratorClient: React.FC = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    projectAmount: '',
    serviceType: 'Logo Design',
    serviceDetails: '',
    clientName: '',
    clientAddress: '',
    designerName: '',
    designerAddress: '',
    paymentDeadline: '',
    internalProcessingDeadline: '',
    milestonePayments: '',
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [showLegalAlert, setShowLegalAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [version, setVersion] = useState<'free' | 'premium'>('free');

  const serviceOptions = [
    'Logo Design',
    'UI/UX Design',
    'Illustration',
    'Graphic Design',
    'Web Design',
    'Branding',
    'Other',
  ];

  const isDeveloper = session?.user?.email?.toLowerCase() === FREE_ACCESS_EMAIL.toLowerCase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'projectAmount') {
      const amount = parseFloat(value);
      setShowLegalAlert(amount >= 250);
    }
  };

  const generateFreeContract = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const contract = `# SB 988 COMPLIANT CONTRACT AGREEMENT

## 1. Parties
This Agreement is made and entered into on ${today} between:

**Client:** ${formData.clientName}
Address: ${formData.clientAddress}

**Designer:** ${formData.designerName}
Address: ${formData.designerAddress}

## 2. Services
Designer agrees to provide ${formData.serviceType} services to Client.

**Service Details:** ${formData.serviceDetails || 'As mutually agreed upon by both parties.'}

## 3. Compensation
Client shall pay Designer the total amount of $${formData.projectAmount} for the services rendered.

**Payment Terms:** ${formData.milestonePayments || 'Payment shall be made in full upon completion of services.'}

## 4. Payment Deadline
Client shall pay Designer the total amount by ${formData.paymentDeadline}.
Client shall process payment by ${formData.internalProcessingDeadline} to ensure timely payment.

**SB 988 Compliance:** Payment shall be made within 15 business days of invoice submission.

## 5. Intellectual Property
Upon full payment, Designer grants Client a non-exclusive, worldwide license to use the deliverables for the intended purpose.
Designer retains all other rights to the intellectual property.

## 6. Confidentiality
Both parties agree to keep confidential any proprietary information disclosed during the course of this agreement.

## 7. Delivery and Acceptance
Designer shall deliver the services by the agreed-upon deadline.
Client shall have 7 days to review and accept the deliverables.

## 8. Dispute Resolution
Any disputes arising under this agreement shall be resolved through good faith negotiations.
If negotiations fail, the dispute shall be governed by the laws of the State of California.

## 9. SB 988 Compliance
In accordance with California SB 988 (Freelance Worker Protection Act):
- Failure to pay on time may result in double damages
- Refusal to sign this contract for projects over $250 may result in a $1,000 penalty under California law

## 10. Signatures

### Client Signature
_________________________
${formData.clientName}
Date: _______________

### Designer Signature
_________________________
${formData.designerName}
Date: _______________

---

*This is a basic SB 988 compliant template. For more comprehensive protection including advanced IP clauses, termination provisions, and professional legal review, consider upgrading to the premium version.*`;

    setGeneratedContent(contract);
    setIsGenerated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (version === 'free') {
      generateFreeContract();
    } else {
      setIsLoading(true);
      try {
        const response = await fetch('/api/ai/contract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contractType: `SB 988 California Freelance Contract - ${formData.serviceType}`,
            requirements: `Project Amount: $${formData.projectAmount}
Service Type: ${formData.serviceType}
Service Details: ${formData.serviceDetails || 'As mutually agreed'}
Client: ${formData.clientName}, Address: ${formData.clientAddress}
Designer: ${formData.designerName}, Address: ${formData.designerAddress}
Payment Deadline: ${formData.paymentDeadline}
Internal Processing Deadline: ${formData.internalProcessingDeadline}
Milestone Payments: ${formData.milestonePayments || 'Full payment upon completion'}

Requirements: Generate a comprehensive SB 988 compliant contract that includes:
1. Detailed parties identification
2. Comprehensive scope of services
3. Detailed compensation terms
4. Payment deadline (15 business days or less per SB 988)
5. Advanced intellectual property protection clauses
6. Confidentiality and non-disclosure provisions
7. Detailed dispute resolution mechanism
8. Late payment penalties (double damages under SB 988)
9. $1,000 refusal penalty clause for projects over $250
10. Termination clause with clear provisions
11. Force majeure clause
12. Governing law and jurisdiction

Use professional legal language, proper formatting, and ensure the contract is ready for immediate signing.`,
          }),
        });

        // 检查响应状态
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Please sign in to generate a premium contract. Check your email for the magic link.');
          }
          
          let data;
          try {
            data = await response.json();
          } catch {
            throw new Error(`Failed to process API response: ${response.status}`);
          }
          
          if (response.status === 402 && data?.code === 'INSUFFICIENT_CONTRACTS') {
            setShowUpgradeModal(true);
            return;
          }
          
          throw new Error(data.error || `API error: ${response.status}`);
        }

        // 解析响应数据
        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error('Please sign in and try again');
        }

        // 确保 data.answer 是字符串类型
        if (typeof data.answer === 'string') {
          setGeneratedContent(data.answer);
          setIsGenerated(true);
        } else {
          throw new Error('Invalid response format: answer is not a string');
        }
      } catch (err) {
        console.error('Contract generation error:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate contract');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      projectAmount: '',
      serviceType: 'Logo Design',
      serviceDetails: '',
      clientName: '',
      clientAddress: '',
      designerName: '',
      designerAddress: '',
      paymentDeadline: '',
      internalProcessingDeadline: '',
      milestonePayments: '',
    });
    setIsGenerated(false);
    setShowLegalAlert(false);
    setError(null);
    setGeneratedContent(null);
    setShowUpgradeModal(false);
    setVersion('free');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-text-primary mb-4">Purchase Contract Credits</h3>
            <p className="text-text-primary/70 mb-6">
              You need a contract credit to generate the premium contract. Each generation costs $4.99.
            </p>
            <div className="space-y-3">
              <a
                href="/pricing"
                className="w-full block text-center px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90"
              >
                Purchase for $4.99
              </a>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!isGenerated ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Generate Your SB 988 Compliant Contract</h2>

          {isDeveloper && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-600 text-sm font-medium">Developer Mode: You can access both free and premium versions</p>
            </div>
          )}

          {/* Version Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Select Contract Version</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`border rounded-lg p-4 cursor-pointer ${version === 'free' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-gray-200'}`} onClick={() => setVersion('free')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-primary">Free Version</h4>
                    <p className="text-sm text-text-primary/70 mt-1">Basic SB 988 compliance</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${version === 'free' ? 'border-primary-lavender bg-primary-lavender' : 'border-gray-300'}`}>
                    {version === 'free' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span className="text-text-primary/70">Basic SB 988 compliance</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span className="text-text-primary/70">Core contract terms</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span className="text-text-primary/70">Instant generation</span>
                  </div>
                  <div className="flex items-center text-green-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span>Free</span>
                  </div>
                </div>
              </div>
              <div className={`border rounded-lg p-4 cursor-pointer ${version === 'premium' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-gray-200'}`} onClick={() => setVersion('premium')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-primary">Premium Version</h4>
                    <p className="text-sm text-text-primary/70 mt-1">Professional SB 988 contract</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${version === 'premium' ? 'border-primary-lavender bg-primary-lavender' : 'border-gray-300'}`}>
                    {version === 'premium' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span className="text-text-primary/70">Advanced IP protection</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span className="text-text-primary/70">Detailed termination clauses</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    <span className="text-text-primary/70">Professional legal language</span>
                  </div>
                  <div className="flex items-center text-primary-lavender font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-lavender mr-2" />
                    <span>$4.99 per generation</span>
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

          <div className="space-y-2">
            <label htmlFor="projectAmount" className="block text-sm font-medium text-text-primary">
              Project Amount ($)
            </label>
            <input
              type="number"
              id="projectAmount"
              name="projectAmount"
              value={formData.projectAmount}
              onChange={handleInputChange}
              placeholder="Enter project amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
              required
            />
            {showLegalAlert && (
              <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                <p className="text-sm font-medium">Legal Alert: Projects over $250 require a written contract under CA SB 988.</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceType" className="block text-sm font-medium text-text-primary">
              Service Type
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
              required
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceDetails" className="block text-sm font-medium text-text-primary">
              Service Details
            </label>
            <textarea
              id="serviceDetails"
              name="serviceDetails"
              value={formData.serviceDetails}
              onChange={handleInputChange}
              placeholder="Describe the services to be provided in detail, including deliverables, revision limits, etc."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="milestonePayments" className="block text-sm font-medium text-text-primary">
              Milestone Payments (Optional)
            </label>
            <textarea
              id="milestonePayments"
              name="milestonePayments"
              value={formData.milestonePayments}
              onChange={handleInputChange}
              placeholder="Describe any milestone payments, e.g., 50% upfront, 50% upon completion"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            ></textarea>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Client Information</h3>
            <div className="space-y-2">
              <label htmlFor="clientName" className="block text-sm font-medium text-text-primary">
                Client Name
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="clientAddress" className="block text-sm font-medium text-text-primary">
                Client Address
              </label>
              <input
                type="text"
                id="clientAddress"
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="Enter client address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Designer Information</h3>
            <div className="space-y-2">
              <label htmlFor="designerName" className="block text-sm font-medium text-text-primary">
                Designer Name
              </label>
              <input
                type="text"
                id="designerName"
                name="designerName"
                value={formData.designerName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="designerAddress" className="block text-sm font-medium text-text-primary">
                Designer Address
              </label>
              <input
                type="text"
                id="designerAddress"
                name="designerAddress"
                value={formData.designerAddress}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Payment Information</h3>
            <div className="space-y-2">
              <label htmlFor="paymentDeadline" className="block text-sm font-medium text-text-primary">
                Payment Deadline
              </label>
              <input
                type="date"
                id="paymentDeadline"
                name="paymentDeadline"
                value={formData.paymentDeadline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="internalProcessingDeadline" className="block text-sm font-medium text-text-primary">
                Internal Processing Deadline
              </label>
              <input
                type="date"
                id="internalProcessingDeadline"
                name="internalProcessingDeadline"
                value={formData.internalProcessingDeadline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : version === 'free' ? 'Generate Free Contract' : 'Generate Premium Contract'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Reset
            </button>
          </div>

          {version === 'free' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="font-medium text-yellow-800 mb-2">Upgrade to Premium for Enhanced Protection</h4>
              <p className="text-sm text-yellow-700">
                The premium version includes advanced IP protection, detailed termination clauses, and professional legal language that will help you stand out to clients and provide better legal protection.
              </p>
              <button
                onClick={() => setVersion('premium')}
                className="mt-3 text-sm text-primary-lavender font-medium hover:underline"
              >
                Switch to Premium Version
              </button>
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text-primary">Your SB 988 Compliant Contract</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${version === 'free' ? 'bg-green-100 text-green-800' : 'bg-primary-lavender/20 text-primary-lavender'}`}>
              {version === 'free' ? 'Free Version' : 'Premium Version'}
            </span>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap font-sans text-sm text-text-primary/90">
                {generatedContent ? (
                  generatedContent.split('\n').map((line, index) => {
                    try {
                      // 移除所有星号
                      const cleanedLine = line.replace(/\*/g, '').trim();
                      
                      if (cleanedLine.startsWith('# ')) {
                        return <h1 key={index} className="text-2xl font-bold text-center mb-6">{cleanedLine.replace('# ', '')}</h1>;
                      } else if (cleanedLine.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{cleanedLine.replace('## ', '')}</h2>;
                      } else if (cleanedLine.startsWith('### ')) {
                        return <h3 key={index} className="text-lg font-semibold mt-3 mb-1">{cleanedLine.replace('### ', '')}</h3>;
                      } else if (cleanedLine.trim() === '') {
                        return <br key={index} />;
                      } else {
                        return <p key={index} className="mb-2">{cleanedLine}</p>;
                      }
                    } catch {
                      // 处理单行动错误，确保整个页面不会崩溃
                      return <p key={index} className="mb-2 text-red-500">{line}</p>;
                    }
                  })
                ) : (
                  <p>Generating contract...</p>
                )}
              </div>
            </div>
          </div>

          {version === 'free' && (
            <div className="border border-primary-lavender/30 rounded-lg p-6 bg-primary-lavender/5">
              <h3 className="text-lg font-bold text-primary-lavender mb-4">Upgrade to Premium</h3>
              <p className="text-text-primary/70 mb-4">
                Enhance your contract with professional legal language, advanced IP protection, and detailed termination clauses. The premium version will help you stand out to clients and provide better legal protection.
              </p>
              <button
                onClick={() => {
                  setIsGenerated(false);
                  setVersion('premium');
                }}
                className="w-full px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90"
              >
                Generate Premium Contract
              </button>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-100 text-text-primary font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Create New Contract
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SB988GeneratorClient;