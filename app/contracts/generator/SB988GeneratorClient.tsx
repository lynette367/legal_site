'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // 👈 新增：用于获取 URL 中的 ?role=
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { professions } from '@/data/professions'; // 👈 引入你现有的职业配置

interface FormData {
  projectAmount: string;
  serviceType: string;
  serviceDetails: string;
  clientName: string;
  clientAddress: string;
  freelancerName: string; // 👈 将原 designerName 改为更通用的 freelancerName，保持底层逻辑一致
  freelancerAddress: string; // 👈 同上
  paymentDeadline: string;
  internalProcessingDeadline: string;
  milestonePayments: string;
}



const SB988GeneratorClient: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  // 1. 动态动态匹配当前职业，找不到则默认降级到第一个 (Graphic Designer)
  const roleSlug = searchParams.get('role') || 'graphic-designers';
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string>(roleSlug);

  // Sync activeSlug with URL query param
  useEffect(() => {
    if (activeSlug !== roleSlug) {
      router.replace(`?role=${activeSlug}`, { scroll: false });
    }
  }, [activeSlug, router, roleSlug]);

  // Update currentProfession based on activeSlug
  const currentProfession = professions.find(p => p.slug === activeSlug) || professions[0];

  const [formData, setFormData] = useState<FormData>({
    projectAmount: '',
    serviceType: '', // 动态给初始值，见下方的 useEffect
    serviceDetails: '',
    clientName: '',
    clientAddress: '',
    freelancerName: '',
    freelancerAddress: '',
    paymentDeadline: '',
    internalProcessingDeadline: '',
    milestonePayments: '',
  });

  // 当路由或职业改变时，动态更新默认的 ServiceType
  useEffect(() => {
    if (currentProfession) {
      setFormData(prev => ({
        ...prev,
        // 这里可以直接把下拉框设为该职业的特定占位符，或者通过你原有的逻辑
        serviceType: currentProfession.name
      }));
    }
  }, [currentProfession]);

  const [isGenerated, setIsGenerated] = useState(false);
  const [showLegalAlert, setShowLegalAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // 👈 上一轮新增：登录拦截弹窗状态
  const [version, setVersion] = useState<'free' | 'premium'>('free');



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'projectAmount') {
      const amount = parseFloat(value);
      setShowLegalAlert(amount >= 250);
    }
  };

  // 2. 动态生成免费合同：全面用 currentProfession.name 替换硬编码的 Designer
  const generateFreeContract = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const pName = currentProfession.name; // 例如: "Web Developer", "Copywriter"

    const contract = `# SB 988 COMPLIANT CONTRACT AGREEMENT

## 1. Parties
This Agreement is made and entered into on ${today} between:

**Client:** ${formData.clientName}
Address: ${formData.clientAddress}

**${pName}:** ${formData.freelancerName}
Address: ${formData.freelancerAddress}

## 2. Services
${pName} agrees to provide ${formData.serviceType} services to Client.

**Service Details:** ${formData.serviceDetails || `Custom ${pName.toLowerCase()} services as mutually agreed.`}

## 3. Compensation
Client shall pay ${pName} the total amount of $${formData.projectAmount} for the services rendered.

**Payment Terms:** ${formData.milestonePayments || 'Payment shall be made in full upon completion of services.'}

## 4. Payment Deadline
Client shall pay ${pName} the total amount by ${formData.paymentDeadline}.
Client shall process payment by ${formData.internalProcessingDeadline} to ensure timely payment.

**SB 988 Compliance:** Payment shall be made within 15 business days of invoice submission.

## 5. Intellectual Property
Upon full payment, ${pName} grants Client a non-exclusive, worldwide license to use the deliverables for the intended purpose.
${pName} retains all other rights to the intellectual property.

## 6. Confidentiality
Both parties agree to keep confidential any proprietary information disclosed during the course of this agreement.

## 7. Delivery and Acceptance
${pName} shall deliver the services by the agreed-upon deadline.
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

### ${pName} Signature
_________________________
${formData.freelancerName}
Date: _______________

---
*This is a basic SB 988 compliant template tailored for freelance ${pName.toLowerCase()}s. For advanced IP clauses and detailed protection, upgrade to premium.*`;

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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // 👈 3. 让传给后端 AI 的 Prompt 同样动态适配职业
            contractType: `SB 988 California Freelance Contract - ${currentProfession.name} (${formData.serviceType})`,
            requirements: `Project Amount: $${formData.projectAmount}
Service Type: ${formData.serviceType}
Service Details: ${formData.serviceDetails || currentProfession.specificScopePlaceholder}
Client: ${formData.clientName}, Address: ${formData.clientAddress}
Freelancer Spec: ${currentProfession.name}, Name: ${formData.freelancerName}, Address: ${formData.freelancerAddress}
Payment Deadline: ${formData.paymentDeadline}
Internal Processing Deadline: ${formData.internalProcessingDeadline}
Milestone Payments: ${formData.milestonePayments || 'Full payment upon completion'}

Requirements: Generate a comprehensive SB 988 compliant contract for a freelance ${currentProfession.name.toLowerCase()} that includes:
1. Detailed parties identification
2. Advanced intellectual property protection clauses (specifically addressing industry risks: ${currentProfession.painPoint})
... (其余提示词保持不变)`,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            setShowLoginModal(true); // 👈 拦截未登录，直接弹窗
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
      projectAmount: '',
      serviceType: currentProfession.name,
      serviceDetails: '',
      clientName: '',
      clientAddress: '',
      freelancerName: '',
      freelancerAddress: '',
      paymentDeadline: '',
      internalProcessingDeadline: '',
      milestonePayments: '',
    });
    setIsGenerated(false);
    setShowLegalAlert(false);
    setError(null);
    setGeneratedContent(null);
    setShowUpgradeModal(false);
    setShowLoginModal(false);
    setVersion('free');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* 4. 升级版的更明显的登录拦截模态窗 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-2xl text-center">
            <div className="w-16 h-16 bg-primary-lavender/10 text-primary-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Sign In Required</h3>
            <p className="text-sm text-text-primary/70 mb-6 leading-relaxed">
              Premium contracts feature advanced IP protection specifically designed for {currentProfession.name}s. Please sign in to unlock this generation.
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

      {/* Pricing Upgrade Modal */}
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
          {/* Scenario Warning Banners */}
          {searchParams.get('scenario') === 'refuses-written-contract' && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-950 text-sm">
              <p className="font-bold mb-1">🛡️ Freelancer Contract Protection Active</p>
              <p>Working without a contract in California for projects over $250 leaves you completely unprotected. Protect your IP and guarantee your pay. Generate an ironclad, SB 988-compliant freelance agreement in 30 seconds.</p>
            </div>
          )}
          {searchParams.get('scenario') === 'hire-contractor-safely' && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-md text-blue-950 text-sm">
              <p className="font-bold mb-1">🛡️ Corporate Onboarding Framework Active</p>
              <p>California&apos;s Freelance Worker Protection Act enforces harsh fines on businesses that use generic web templates. Ensure your onboarding agreements pass state labor audits seamlessly. Generate a compliant contractor framework now.</p>
            </div>
          )}
          {/* Profession Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg max-w-max mb-4">
            {professions.map((p) => {
              const isActive = activeSlug === p.slug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setActiveSlug(p.slug)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-bold transition-all duration-200 ${isActive
                      ? 'bg-white text-primary-lavender shadow-sm ring-1 ring-black/5'
                      : 'text-text-primary/60 hover:text-text-primary hover:bg-white/50'
                    }`}
                >
                  <span>{p.icon ?? '⚙️'}</span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
          {/* H2 动态联动职业标题 */}
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Generate Your SB 988 Compliant Contract
          </h2>
          <p className="text-sm text-gray-500">
            Tailored specifically for <span className="font-semibold text-primary-lavender">{currentProfession.name}s</span>
          </p>

          {/* Version Selection */}
          <div className="space-y-4 pt-2">
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
              </div>
              <div className={`border rounded-lg p-4 cursor-pointer ${version === 'premium' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-gray-200'}`}
                onClick={() => {
                  if (!session) { setShowLoginModal(true); } // 👈 拦截点击事件，未登录直接弹窗
                  else { setVersion('premium'); }
                }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-primary">Premium Version</h4>
                    <p className="text-sm text-text-primary/70 mt-1">Professional {currentProfession.name} Contract</p>
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
            <input type="number" id="projectAmount" name="projectAmount" value={formData.projectAmount} onChange={handleInputChange} placeholder="Enter project amount" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender" required />
            {showLegalAlert && (
              <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-sm">
                Legal Alert: Projects over $250 require a written contract under CA SB 988.
              </div>
            )}
          </div>

          {/* Service Type 替换为单行输入输入框，并使用你 professions 里的 specificScopePlaceholder 作为引导 */}
          <div className="space-y-2">
            <label htmlFor="serviceType" className="block text-sm font-medium text-text-primary">Service Title / Scope Of Role</label>
            <input
              type="text"
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              placeholder={`e.g., ${currentProfession.specificScopePlaceholder}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceDetails" className="block text-sm font-medium text-text-primary">Service Details</label>
            <textarea id="serviceDetails" name="serviceDetails" value={formData.serviceDetails} onChange={handleInputChange} placeholder="Describe the deliverables, limitations, or technical requirements in detail..." rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender"></textarea>
          </div>

          {/* Freelancer Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">{currentProfession.name} Information (You)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="freelancerName" className="block text-sm font-medium text-text-primary">Your Name / Business Name</label>
                <input type="text" id="freelancerName" name="freelancerName" value={formData.freelancerName} onChange={handleInputChange} placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="freelancerAddress" className="block text-sm font-medium text-text-primary">Your Business Address</label>
                <input type="text" id="freelancerAddress" name="freelancerAddress" value={formData.freelancerAddress} onChange={handleInputChange} placeholder="City, State, Zip" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Client Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="clientName" className="block text-sm font-medium text-text-primary">Client Company / Individual Name</label>
                <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Enter client identity" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="clientAddress" className="block text-sm font-medium text-text-primary">Client Address</label>
                <input type="text" id="clientAddress" name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Client legal address" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
          </div>

          {/* Payment Deadlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="paymentDeadline" className="block text-sm font-medium text-text-primary">Contractual Payment Deadline</label>
              <input type="date" id="paymentDeadline" name="paymentDeadline" value={formData.paymentDeadline} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="internalProcessingDeadline" className="block text-sm font-medium text-text-primary">Client Internal Net Processing Window</label>
              <input type="date" id="internalProcessingDeadline" name="internalProcessingDeadline" value={formData.internalProcessingDeadline} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex space-x-4 pt-4">
            <button type="submit" disabled={isLoading} className="flex-1 px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 disabled:opacity-50">
              {isLoading ? 'Generating Spec Contract...' : version === 'free' ? 'Generate Free Contract' : `Generate Premium ${currentProfession.name} Contract`}
            </button>
            <button type="button" onClick={handleReset} className="px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50">Reset</button>
          </div>
        </form>
      ) : (
        /* 生成结果展示层 */
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text-primary">Your SB 988 Compliant Contract</h2>
            <span>{currentProfession.icon ?? '⚙️'}</span>
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

            {/* 小法庭营销卡片引流 */}
            {version === 'free' && isGenerated && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                <p className="text-sm font-medium mb-2">Your contract is now CA SB 988 compliant. But what if your client still refuses to pay?</p>
                <Link href="/guides/ca-contractor-small-claims" className="inline-block w-full px-6 py-4 bg-red-600 text-white font-bold rounded-md text-center hover:bg-red-700">
                  🚨 What is your next legal step? Click here to view your 3‑Step Small Claims Court Action Roadmap →
                </Link>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button onClick={handleReset} className="flex-1 px-6 py-3 bg-gray-100 text-text-primary font-medium rounded-md hover:bg-gray-200">Create Another Contract</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SB988GeneratorClient;