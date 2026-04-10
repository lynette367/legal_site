'use client';

import React, { useState } from 'react';

export default function ClientComponent() {
  const [templateType, setTemplateType] = useState('independent-contractor');
  const [formData, setFormData] = useState({
    businessName: '',
    freelancerName: '',
    projectDescription: '',
    paymentAmount: '',
    paymentTerms: '',
    projectDeadline: '',
  });
  const [previewCount, setPreviewCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateTypeChange = (type: string) => {
    setTemplateType(type);
  };

  const handleGenerate = async () => {
    if (previewCount >= 3) {
      alert('You have used all 3 free previews. Please upgrade to unlock more.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const template = generateTemplate(templateType, formData);
      setGeneratedTemplate(template);
      setPreviewCount(prev => prev + 1);
      setIsGenerating(false);
    }, 1500);
  };

  const generateTemplate = (type: string, data: {[key: string]: string}) => {
    switch (type) {
      case 'independent-contractor':
        return `INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement ("Agreement") is entered into between ${data.businessName} ("Client") and ${data.freelancerName} ("Contractor"), collectively referred to as the "Parties."

1. SERVICES
Contractor agrees to provide the following services: ${data.projectDescription}

2. COMPENSATION
Client shall pay Contractor the amount of $${data.paymentAmount} for the services rendered. Payment shall be made according to the following terms: ${data.paymentTerms}

3. TERM
This Agreement shall begin on the date of execution and shall continue until ${data.projectDeadline} or until the services are completed, whichever comes first.

4. INDEPENDENT CONTRACTOR STATUS
Contractor is an independent contractor, not an employee. Contractor shall be responsible for all taxes, insurance, and other obligations associated with being an independent contractor.

5. CONFIDENTIALITY
Contractor shall not disclose any confidential information obtained during the course of providing services to Client.

6. INTELLECTUAL PROPERTY
All work product created by Contractor shall be the property of Client.

7. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.

8. SIGNATURES

_________________________
${data.freelancerName}
Date: _______________

_________________________
${data.businessName}
Date: _______________`;
      
      case 'privacy-policy':
        return `PRIVACY POLICY

${data.businessName} ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose personal information when you use our services.

1. INFORMATION WE COLLECT
We may collect the following personal information:
- Contact information (name, email address, phone number)
- Business information
- Payment information

2. HOW WE USE YOUR INFORMATION
We use your information to:
- Provide and improve our services
- Process payments
- Communicate with you
- Comply with legal obligations

3. SHARING YOUR INFORMATION
We may share your information with:
- Service providers who help us deliver our services
- Legal authorities when required by law

4. YOUR RIGHTS
Under the California Consumer Privacy Act (CCPA), you have the right to:
- Know what personal information we collect
- Request deletion of your personal information
- Opt out of the sale of your personal information

5. SECURITY
We implement reasonable security measures to protect your personal information.

6. CHANGES TO THIS POLICY
We may update this Privacy Policy from time to time. We will notify you of any changes.

7. CONTACT US
If you have any questions about this Privacy Policy, please contact us at: [Your Contact Information]`;
      
      case 'terms-service':
        return `TERMS OF SERVICE

Welcome to ${data.businessName} ("we", "us", or "our"). These Terms of Service ("Terms") govern your use of our services.

1. ACCEPTANCE OF TERMS
By using our services, you agree to be bound by these Terms.

2. SERVICES
We provide freelance services as described on our website.

3. PAYMENT
You agree to pay the agreed-upon amount for our services. Payment terms are as follows: ${data.paymentTerms}

4. INTELLECTUAL PROPERTY
All content provided by us is protected by copyright and other intellectual property laws.

5. LIMITATION OF LIABILITY
We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.

6. GOVERNING LAW
These Terms shall be governed by the laws of the State of California.

7. DISPUTE RESOLUTION
Any disputes arising from these Terms shall be resolved through arbitration in California.

8. CHANGES TO THESE TERMS
We may update these Terms from time to time. We will notify you of any changes.

9. CONTACT US
If you have any questions about these Terms, please contact us at: [Your Contact Information]`;
      
      default:
        return 'Please select a template type and fill in the form.';
    }
  };

  return (
    <div className="space-y-8">
      {/* Template Type Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">Select Template Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            className={`p-4 rounded-xl border ${templateType === 'independent-contractor' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-border-lavender'} transition-all`}
            onClick={() => handleTemplateTypeChange('independent-contractor')}
          >
            <p className="font-medium">Independent Contractor Agreement</p>
          </button>
          <button
            type="button"
            className={`p-4 rounded-xl border ${templateType === 'privacy-policy' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-border-lavender'} transition-all`}
            onClick={() => handleTemplateTypeChange('privacy-policy')}
          >
            <p className="font-medium">Privacy Policy</p>
          </button>
          <button
            type="button"
            className={`p-4 rounded-xl border ${templateType === 'terms-service' ? 'border-primary-lavender bg-primary-lavender/5' : 'border-border-lavender'} transition-all`}
            onClick={() => handleTemplateTypeChange('terms-service')}
          >
            <p className="font-medium">Terms of Service</p>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-text-primary">Template Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                placeholder="Your business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Freelancer Name</label>
              <input
                type="text"
                name="freelancerName"
                value={formData.freelancerName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Project Description</label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                placeholder="Describe the services to be provided"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Payment Amount</label>
              <input
                type="text"
                name="paymentAmount"
                value={formData.paymentAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                placeholder="$0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Payment Terms</label>
              <input
                type="text"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                placeholder="e.g., 50% upfront, 50% upon completion"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Project Deadline</label>
              <input
                type="text"
                name="projectDeadline"
                value={formData.projectDeadline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                placeholder="e.g., June 30, 2026"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Template'}
        </button>
        <p className="text-center text-sm text-text-primary/60 mt-2">
          Free preview: {3 - previewCount} left | No credit card required
        </p>
      </div>

      {/* Generated Template */}
      {generatedTemplate && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-text-primary">Generated Template</h3>
          <div className="bg-white p-6 rounded-xl border border-border-lavender shadow-soft">
            <pre className="whitespace-pre-wrap text-sm text-text-primary/80 font-mono">
              {generatedTemplate}
            </pre>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 py-3 px-6 border border-primary-lavender text-primary-lavender font-bold rounded-xl transition-all hover:bg-primary-lavender/5"
            >
              Download Template
            </button>
            <button
              type="button"
              className="flex-1 py-3 px-6 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold rounded-xl transition-all"
            >
              Unlock Full Features
            </button>
          </div>
        </div>
      )}
    </div>
  );
}