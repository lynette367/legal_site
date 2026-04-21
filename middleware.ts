import { NextRequest, NextResponse } from 'next/server';

// Define the redirect rules
const redirectRules = [
  // AI tools
  { source: '/tools/ai-copyright-filing', destination: '/tools/freelancer-contract-review' },
  { source: '/tools/ai-use-policy', destination: '/tools/freelancer-contract-review' },
  
  // CCPA tools
  { source: '/tools/ccpa-breach-letters', destination: '/tools/freelancer-contract-review' },
  { source: '/tools/ccpa-checker', destination: '/tools/freelancer-contract-review' },
  { source: '/tools/ccpa-generator', destination: '/tools/freelancer-contract-review' },
  
  // Other tools
  { source: '/tools/esg-compliance-checklist', destination: '/tools/freelancer-contract-review' },
  { source: '/tools/metaverse-ip-trademark', destination: '/tools/freelancer-contract-review' },
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if the current path matches any redirect rule
  for (const rule of redirectRules) {
    if (url.pathname === rule.source) {
      return NextResponse.redirect(new URL(rule.destination, request.url), { 
        status: 301 
      });
    }
  }
  
  // Continue with the request if no redirect is needed
  return NextResponse.next();
}

// Match all tool paths except the ones we want to keep
export const config = {
  matcher: [
    '/tools/ai-copyright-filing',
    '/tools/ai-use-policy',
    '/tools/ccpa-breach-letters',
    '/tools/ccpa-checker',
    '/tools/ccpa-generator',
    '/tools/esg-compliance-checklist',
    '/tools/metaverse-ip-trademark',
  ],
};