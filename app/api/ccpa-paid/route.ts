import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { callDeepSeek } from '@/lib/ai/deepseek';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const CCPA_SYSTEM_PROMPT = `You are a specialized AI privacy policy generator focused exclusively on California's CCPA and CPRA regulations. Your role is to create comprehensive, legally-compliant privacy policies for California businesses.

STRICT REQUIREMENTS:
1. Generate ONLY privacy policies that comply with CCPA (California Consumer Privacy Act) and CPRA (California Privacy Rights Act)
2. Include ALL 13 mandatory disclosure sections as required by California law
3. Use professional, clear business language appropriate for California small and medium businesses
4. Structure the policy with clear numbered sections and subsections
5. Include specific California legal references where appropriate

MANDATORY SECTIONS (must include all 13):
1. Introduction & Effective Date
2. Definitions (clearly define key terms)
3. Categories of Personal Information Collected (detailed list)
4. Purposes of Collection (specific business purposes)
5. Information Sharing & Third Parties (disclosure practices)
6. Consumer Rights (detailed explanation of all CCPA/CPRA rights)
7. Right to Know (Access rights)
8. Right to Delete (Deletion rights)
9. Right to Opt-Out (Do Not Sell My Personal Information)
10. Right to Non-Discrimination
11. Right to Limit Sensitive Data Use
12. Data Retention & Security
13. Contact Information & Verification Process

ADDITIONAL REQUIREMENTS:
- Include specific contact information placeholders
- Add verification process details for consumer requests
- Include financial incentives disclosure if applicable
- Add minors protection provisions if applicable
- Include non-discrimination clause
- Add data security measures description
- Include policy update notification procedures
- Add dispute resolution process
- Include California-specific legal references

MANDATORY DISCLAIMER:
At the end of every policy, include: "This is an AI-generated template. Not legal advice. Consult a licensed California attorney."

PROHIBITED CONTENT:
- Do NOT provide legal advice
- Do NOT suggest litigation strategies
- Do NOT provide attorney-client privileged information
- Do NOT guarantee legal compliance
- Do NOT create policies for illegal activities

OUTPUT FORMAT:
- Use clear section headers (1., 2., 3., etc.)
- Use professional business language
- Keep sentences clear and concise
- Use bullet points for lists where appropriate
- Include all required legal disclosures`;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to access premium features.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { formData } = body;

    if (!formData) {
      return NextResponse.json(
        { error: 'Form data is required' },
        { status: 400 }
      );
    }

    const userPrompt = buildPrompt(formData);

    const policy = await callDeepSeek(
      userPrompt,
      CCPA_SYSTEM_PROMPT,
      0.1
    );

    return NextResponse.json({
      success: true,
      policy
    });

  } catch (error) {
    console.error('CCPA Policy Generation Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate policy';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function buildPrompt(formData: { companyName?: string; companyAddress?: string; website?: string; contactEmail?: string; contactPhone?: string; dataCategories?: string[]; collectionPurposes?: string[]; thirdPartyServices?: string[]; userRights?: string[]; financialIncentives?: boolean; minors?: boolean; retentionPeriod?: string; securityMeasures?: string }): string {
  const dataCategories = formData.dataCategories && formData.dataCategories.length > 0 
    ? formData.dataCategories.join(', ')
    : 'personal information including identifiers, contact details, and online activity';

  const purposes = formData.collectionPurposes && formData.collectionPurposes.length > 0
    ? formData.collectionPurposes.join(', ')
    : 'account management, service delivery, and business operations';

  const thirdParties = formData.thirdPartyServices && formData.thirdPartyServices.length > 0
    ? formData.thirdPartyServices.join(', ')
    : 'service providers and business partners';

  const rights = formData.userRights && formData.userRights.length > 0
    ? formData.userRights.join(', ')
    : 'right to know, right to delete, right to opt-out of sale';

  return `Generate a comprehensive CCPA/CPRA-compliant privacy policy for the following business:

BUSINESS INFORMATION:
- Company Name: ${formData.companyName || '[Company Name]'}
- Company Address: ${formData.companyAddress || '[Company Address]'}
- Website: ${formData.website || '[Website URL]'}
- Contact Email: ${formData.contactEmail || '[privacy@company.com]'}
- Contact Phone: ${formData.contactPhone || '[Phone Number]'}

DATA COLLECTION:
- Categories of Personal Information Collected: ${dataCategories}
- Purposes of Collection: ${purposes}

THIRD-PARTY SERVICES:
- Third-party services used: ${thirdParties}

CONSUMER RIGHTS:
- Rights implemented: ${rights}
- Financial incentives program: ${formData.financialIncentives ? 'Yes' : 'No'}
- Minors under 16: ${formData.minors ? 'Yes - special protections apply' : 'No'}

DATA MANAGEMENT:
- Data retention period: ${formData.retentionPeriod || 'as required by law'}
- Security measures: ${formData.securityMeasures || 'industry-standard security practices'}

REQUIREMENTS:
1. Create a complete, legally-compliant privacy policy following California CCPA/CPRA requirements
2. Include all 13 mandatory disclosure sections
3. Use the specific business information provided above
4. Include detailed consumer rights explanations
5. Add verification process for consumer requests
6. Include contact information and request procedures
7. Add appropriate California legal references
8. Include the mandatory disclaimer at the end

Generate the complete privacy policy now.`;
}
