'use client';

import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { PayPalButton } from '../../../components/pricing/PayPalButton';

interface FormData {
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  dataCategories: string[];
  collectionPurposes: string[];
  thirdPartyServices: string[];
  userRights: string[];
  financialIncentives: boolean;
  minors: boolean;
  retentionPeriod: string;
  securityMeasures: string;
}

interface HistoryItem {
  id: string;
  timestamp: number;
  formData: FormData;
  preview: string;
  isPaid: boolean;
}

const FREE_GENERATIONS_LIMIT = 3;
const PREVIEW_PERCENTAGE = 30;

export default function CCPAGeneratorClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyAddress: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    dataCategories: [],
    collectionPurposes: [],
    thirdPartyServices: [],
    userRights: [],
    financialIncentives: false,
    minors: false,
    retentionPeriod: '2 years',
    securityMeasures: 'encryption'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPolicy, setGeneratedPolicy] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [freeGenerations, setFreeGenerations] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadUserData();
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/subscription/check');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.isPaid) {
          setIsPaid(true);
          localStorage.setItem('ccpa_is_paid', 'true');
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const loadUserData = () => {
    const storedFree = localStorage.getItem('ccpa_free_generations');
    const storedHistory = localStorage.getItem('ccpa_history');
    const storedPaid = localStorage.getItem('ccpa_is_paid');
    
    if (storedFree) setFreeGenerations(parseInt(storedFree));
    if (storedHistory) setHistory(JSON.parse(storedHistory));
    if (storedPaid) setIsPaid(storedPaid === 'true');
  };

  const saveUserData = () => {
    localStorage.setItem('ccpa_free_generations', freeGenerations.toString());
    localStorage.setItem('ccpa_history', JSON.stringify(history));
    localStorage.setItem('ccpa_is_paid', isPaid.toString());
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const generateFreePolicy = () => {
    const template = getFreeTemplate(formData);
    return template;
  };

  const generatePaidPolicy = async () => {
    try {
      const response = await fetch('/api/ccpa-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });
      
      if (!response.ok) throw new Error('Failed to generate policy');
      
      const data = await response.json();
      return data.policy;
    } catch (error) {
      console.error('Error generating policy:', error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!isPaid && freeGenerations >= FREE_GENERATIONS_LIMIT) {
      setShowUpgradeModal(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      let policy = '';
      
      if (isPaid) {
        policy = await generatePaidPolicy();
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        policy = generateFreePolicy();
        setFreeGenerations(prev => prev + 1);
      }
      
      setGeneratedPolicy(policy);
      setShowResults(true);
      
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        formData: { ...formData },
        preview: policy.substring(0, 200) + '...',
        isPaid
      };
      
      setHistory(prev => [historyItem, ...prev].slice(0, 10));
      saveUserData();
      
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate policy. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!isPaid) {
      setShowUpgradeModal(true);
      return;
    }
    
    navigator.clipboard.writeText(generatedPolicy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!isPaid) {
      setShowUpgradeModal(true);
      return;
    }
    
    const doc = new jsPDF();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CCPA/CPRA PRIVACY POLICY', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 28);
    doc.text(`Company: ${formData.companyName}`, 20, 34);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitText = doc.splitTextToSize(generatedPolicy, 170);
    doc.text(splitText, 20, 45);
    
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('AI-Generated Template - Attorney Review Recommended', 20, pageHeight - 15);
    doc.text('This tool is for reference only, not legal advice. Consult a licensed California attorney.', 20, pageHeight - 10);
    
    doc.save(`CCPA_Policy_${formData.companyName.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setShowUpgradeModal(false);
    saveUserData();
  };

  const getPreviewContent = () => {
    const totalChars = generatedPolicy.length;
    const previewChars = Math.floor(totalChars * (PREVIEW_PERCENTAGE / 100));
    return generatedPolicy.substring(0, previewChars);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Company Name *</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-lavender focus:border-transparent outline-none transition-all"
          placeholder="e.g., Acme Corporation"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Company Address *</label>
        <input
          type="text"
          value={formData.companyAddress}
          onChange={(e) => handleInputChange('companyAddress', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-lavender focus:border-transparent outline-none transition-all"
          placeholder="e.g., 123 Business Ave, San Francisco, CA 94102"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Website *</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-lavender focus:border-transparent outline-none transition-all"
          placeholder="e.g., https://www.example.com"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-text-primary mb-3">Data Categories Collected *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {
            [
              'Identifiers (name, email, phone)',
              'Personal details (address, birthdate)',
              'Financial information',
              'Payment data',
              'Online identifiers (IP, cookies)',
              'Geolocation data',
              'Biometric data',
              'Internet activity'
            ].map(category => (
              <button
                key={category}
                onClick={() => handleArrayToggle('dataCategories', category)}
                className={`p-3 text-left text-sm font-medium rounded-lg border-2 transition-all ${
                  formData.dataCategories.includes(category)
                    ? 'border-primary-lavender bg-primary-lavender/10 text-primary-lavender'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formData.dataCategories.includes(category) && <span className="mr-2">✓</span>}
                {category}
              </button>
            ))
          }
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-3">Collection Purposes *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {
            [
              'Account management',
              'Payment processing',
              'Service delivery',
              'Marketing and communications',
              'Analytics and improvements',
              'Legal compliance',
              'Security and fraud prevention',
              'Research and development'
            ].map(purpose => (
              <button
                key={purpose}
                onClick={() => handleArrayToggle('collectionPurposes', purpose)}
                className={`p-3 text-left text-sm font-medium rounded-lg border-2 transition-all ${
                  formData.collectionPurposes.includes(purpose)
                    ? 'border-primary-lavender bg-primary-lavender/10 text-primary-lavender'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formData.collectionPurposes.includes(purpose) && <span className="mr-2">✓</span>}
                {purpose}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-text-primary mb-3">Third-Party Services</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {
            [
              'Google Analytics',
              'Facebook Pixel',
              'Payment processors (Stripe, PayPal)',
              'Email marketing (Mailchimp, SendGrid)',
              'Cloud hosting (AWS, Google Cloud)',
              'Customer support (Zendesk, Intercom)',
              'Advertising networks',
              'None'
            ].map(service => (
              <button
                key={service}
                onClick={() => handleArrayToggle('thirdPartyServices', service)}
                className={`p-3 text-left text-sm font-medium rounded-lg border-2 transition-all ${
                  formData.thirdPartyServices.includes(service)
                    ? 'border-primary-lavender bg-primary-lavender/10 text-primary-lavender'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formData.thirdPartyServices.includes(service) && <span className="mr-2">✓</span>}
                {service}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-text-primary mb-3">User Rights to Implement *</label>
        <div className="space-y-3">
          {
            [
              { key: 'access', label: 'Right to Know (Access)', desc: 'Consumers can request what data is collected' },
              { key: 'delete', label: 'Right to Delete', desc: 'Consumers can request deletion of their data' },
              { key: 'correct', label: 'Right to Correct', desc: 'Consumers can correct inaccurate data' },
              { key: 'optout', label: 'Right to Opt-Out of Sale', desc: 'Do Not Sell My Personal Information' },
              { key: 'sensitive', label: 'Sensitive Data Limitations', desc: 'Limit use of sensitive personal information' },
              { key: 'discrimination', label: 'Non-Discrimination', desc: 'No discrimination for exercising rights' }
            ].map(right => (
              <button
                key={right.key}
                onClick={() => handleArrayToggle('userRights', right.label)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  formData.userRights.includes(right.label)
                    ? 'border-primary-lavender bg-primary-lavender/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    formData.userRights.includes(right.label)
                      ? 'border-primary-lavender bg-primary-lavender text-white'
                      : 'border-gray-300'
                  }`}>
                    {formData.userRights.includes(right.label) && '✓'}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{right.label}</p>
                    <p className="text-xs text-text-primary/60 mt-1">{right.desc}</p>
                  </div>
                </div>
              </button>
            ))
          }
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleInputChange('financialIncentives', !formData.financialIncentives)}
          className={`flex-1 p-4 rounded-lg border-2 text-left transition-all ${
            formData.financialIncentives
              ? 'border-primary-lavender bg-primary-lavender/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="font-bold text-sm">Financial Incentives Program</p>
          <p className="text-xs text-text-primary/60 mt-1">Offer rewards for data sharing</p>
        </button>
        
        <button
          onClick={() => handleInputChange('minors', !formData.minors)}
          className={`flex-1 p-4 rounded-lg border-2 text-left transition-all ${
            formData.minors
              ? 'border-primary-lavender bg-primary-lavender/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="font-bold text-sm">Minors Under 16</p>
          <p className="text-xs text-text-primary/60 mt-1">Special protections for minors</p>
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Contact Email *</label>
        <input
          type="email"
          value={formData.contactEmail}
          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-lavender focus:border-transparent outline-none transition-all"
          placeholder="e.g., privacy@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Contact Phone</label>
        <input
          type="tel"
          value={formData.contactPhone}
          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-lavender focus:border-transparent outline-none transition-all"
          placeholder="e.g., +1 (555) 123-4567"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-3">Data Retention Period *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {
            ['1 year', '2 years', '3 years', '5 years', '7 years', 'Until account deletion', 'As required by law', 'Custom'].map(period => (
              <button
                key={period}
                onClick={() => handleInputChange('retentionPeriod', period)}
                className={`p-3 text-sm font-medium rounded-lg border-2 transition-all ${
                  formData.retentionPeriod === period
                    ? 'border-primary-lavender bg-primary-lavender/10 text-primary-lavender'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formData.retentionPeriod === period && <span className="mr-1">✓</span>}
                {period}
              </button>
            ))
          }
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-3">Security Measures *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {
            [
              'Encryption',
              'Access controls',
              'Regular security audits',
              'Employee training',
              'Incident response plan',
              'Third-party certifications'
            ].map(measure => (
              <button
                key={measure}
                onClick={() => handleInputChange('securityMeasures', measure)}
                className={`p-3 text-sm font-medium rounded-lg border-2 transition-all ${
                  formData.securityMeasures === measure
                    ? 'border-primary-lavender bg-primary-lavender/10 text-primary-lavender'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formData.securityMeasures === measure && <span className="mr-1">✓</span>}
                {measure}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.companyName && formData.companyAddress && formData.website;
      case 2: return formData.dataCategories.length > 0 && formData.collectionPurposes.length > 0;
      case 3: return true;
      case 4: return formData.userRights.length > 0;
      case 5: return formData.contactEmail && formData.retentionPeriod && formData.securityMeasures;
      default: return false;
    }
  };

  const canGenerate = () => {
    if (isPaid) return true;
    return freeGenerations < FREE_GENERATIONS_LIMIT;
  };

  return (
    <section id="generator" className="text-center space-y-6 pt-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold text-text-lavender uppercase tracking-widest">
        AI Legal Tool
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
        CCPA Privacy Policy Generator for California Small Businesses
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-text-primary/60">
        Generate compliant California privacy policies in minutes. AI-powered, attorney-reviewed templates for businesses of all sizes.
      </p>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-3 py-1 rounded-full font-bold ${isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {isPaid ? 'Premium' : 'Free'}
          </span>
          <span className="text-text-primary/60">
            {isPaid ? 'Unlimited Full AI Policies' : `${FREE_GENERATIONS_LIMIT - freeGenerations} free generations remaining`}
          </span>
        </div>
        
        {!isPaid && (
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="text-sm font-bold text-primary-lavender hover:underline"
          >
            Upgrade to Premium →
          </button>
        )}
      </div>

      {!showResults ? (
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-white rounded-3xl border border-border-lavender shadow-soft overflow-hidden">
            <div className="h-1 bg-gray-100">
              <div 
                className="h-full bg-primary-lavender transition-all duration-500" 
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-primary-lavender uppercase">Step {step} of 5</span>
                  <h2 className="text-2xl font-bold mt-1">
                    {step === 1 && 'Company Information'}
                    {step === 2 && 'Data Collection'}
                    {step === 3 && 'Third-Party Services'}
                    {step === 4 && 'User Rights & Protections'}
                    {step === 5 && 'Contact & Security'}
                  </h2>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <div
                      key={s}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        s === step
                          ? 'bg-primary-lavender text-white'
                          : s < step
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {s < step ? '✓' : s}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="min-h-[300px]">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
              </div>
              
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    step === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                  }`}
                >
                  ← Back
                </button>
                
                {step < 5 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      isStepValid()
                        ? 'bg-primary-lavender text-white hover:bg-primary-lavender-dark'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !canGenerate()}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${
                      canGenerate() && !isGenerating
                        ? 'bg-gradient-to-r from-primary-lavender to-purple-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isGenerating ? 'Generating...' : isPaid ? 'Generate Full Policy' : 'Generate Preview'}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {history.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl border border-border-lavender p-6">
              <h3 className="text-lg font-bold mb-4">Generation History</h3>
              <div className="space-y-3">
                {history.slice(0, 3).map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-left">
                      <p className="font-bold text-sm">{item.formData.companyName}</p>
                      <p className="text-xs text-text-primary/60">{new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${item.isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {item.isPaid ? 'Premium' : 'Free'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {!isPaid && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-2xl">⚠️</div>
              <div className="text-left flex-1">
                <p className="font-bold text-amber-800">Preview Generated - Not Fully Compliant</p>
                <p className="text-sm text-amber-700">This is a preview only. Upgrade to Premium for the complete, legally-compliant policy.</p>
              </div>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="px-4 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all"
              >
                Unlock Full Policy
              </button>
            </div>
          )}
          
          <div className="bg-white rounded-3xl border border-border-lavender shadow-soft overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold">CCPA/CPRA Privacy Policy</h3>
                <p className="text-sm text-text-primary/60">{formData.companyName}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    isPaid
                      ? 'bg-gray-100 text-text-primary hover:bg-gray-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    isPaid
                      ? 'bg-primary-lavender text-white hover:bg-primary-lavender-dark'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Download PDF
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="p-8 max-h-[600px] overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  {!isPaid ? (
                    <>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                        {getPreviewContent()}
                      </div>
                      
                      <div className="mt-8 p-8 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="text-center space-y-4">
                          <div className="text-4xl">🔒</div>
                          <div>
                            <p className="font-bold text-lg text-gray-700">Premium Content Locked</p>
                            <p className="text-sm text-gray-600 mt-2">
                              Upgrade to view the complete {100 - PREVIEW_PERCENTAGE}% of your privacy policy
                            </p>
                          </div>
                          <button
                            onClick={() => setShowUpgradeModal(true)}
                            className="px-6 py-3 bg-primary-lavender text-white font-bold rounded-xl hover:bg-primary-lavender-dark transition-all"
                          >
                            Unlock Full Policy
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                      {generatedPolicy}
                    </div>
                  )}
                </div>
              </div>
              
              {!isPaid && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80 pointer-events-none" />
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-left">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Disclaimer</p>
            <p className="text-sm text-gray-600">
              This tool is for reference only, not legal advice. Consult a licensed California attorney for your specific legal needs. 
              {isPaid ? ' This is an AI-generated template. Attorney review is recommended.' : ' This preview is not suitable for legal use.'}
            </p>
          </div>
          
          <button
            onClick={() => {
              setShowResults(false);
              setStep(1);
            }}
            className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-text-primary hover:bg-gray-50 transition-all"
          >
            Generate New Policy
          </button>
        </div>
      )}
      
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-lavender/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔓</span>
              </div>
              <h3 className="text-2xl font-bold">Upgrade to Premium</h3>
              <p className="text-text-primary/60 mt-2">
                Get unlimited access to full AI-generated CCPA/CPRA privacy policies
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600">✓</span>
                <span>Unlimited full policy generations</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600">✓</span>
                <span>DeepSeek AI-powered customization</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600">✓</span>
                <span>Complete PDF export with watermarks</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600">✓</span>
                <span>Copy and download full policies</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <PayPalButton
                planId="standard"
                onSuccess={() => handlePaymentSuccess()}
                onError={(error: Error) => console.error('Payment error:', error)}
                redirectUrl="/tools/ccpa-generator"
              />
            </div>
            
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full py-3 text-sm font-bold text-text-primary/60 hover:text-text-primary transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function getFreeTemplate(formData: FormData): string {
  const dataCategories = formData.dataCategories.length > 0 
    ? formData.dataCategories.join(', ')
    : 'personal information';
  
  const purposes = formData.collectionPurposes.length > 0
    ? formData.collectionPurposes.join(', ')
    : 'business operations';
  
  const rights = formData.userRights.length > 0
    ? formData.userRights.join(', ')
    : 'access and deletion rights';

  return `PRIVACY POLICY
Last Updated: ${new Date().toLocaleDateString()}

1. INTRODUCTION

This Privacy Policy describes how ${formData.companyName} ("we," "us," or "our") collects, uses, and shares personal information from California residents. This policy complies with the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA).

2. INFORMATION WE COLLECT

We collect the following categories of personal information:
- ${dataCategories}

3. HOW WE USE YOUR INFORMATION

We use your personal information for the following purposes:
- ${purposes}

4. INFORMATION SHARING

We may share your personal information with third parties for business purposes. ${formData.thirdPartyServices.length > 0 ? `We work with the following third-party services: ${formData.thirdPartyServices.join(', ')}.` : ''}

5. YOUR PRIVACY RIGHTS

Under the CCPA/CPRA, you have the following rights:
- ${rights}

To exercise these rights, please contact us at ${formData.contactEmail}.

6. DATA RETENTION

We retain your personal information for ${formData.retentionPeriod} or as required by law.

7. SECURITY

We implement reasonable security measures to protect your personal information, including ${formData.securityMeasures}.

8. DO NOT SELL MY PERSONAL INFORMATION

We do not sell your personal information. For more information, please contact us.

9. CHANGES TO THIS POLICY

We may update this privacy policy from time to time. We will notify you of any material changes.

10. CONTACT INFORMATION

If you have questions about this privacy policy, please contact us:
- Email: ${formData.contactEmail}
${formData.contactPhone ? `- Phone: ${formData.contactPhone}` : ''}
- Address: ${formData.companyAddress}

11. DISCLAIMER

This is an AI-generated template. Not legal advice. Consult a licensed California attorney.

---
FREE PREVIEW - NOT FOR LEGAL USE
Upgrade to Premium for the complete, legally-compliant privacy policy.`;
}
