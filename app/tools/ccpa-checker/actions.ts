'use server';

import { callDeepSeek } from "@/lib/ai/deepseek";

export async function generateCCPAReport(answers: {
  dataType: string;
  userScale: string;
  encrypted: string;
}) {
  const { dataType, userScale, encrypted } = answers;

  const systemPrompt = `You are a CCPA compliance expert specializing in data breach notifications for California startups. 
Your goal is to generate a professional, legally-compliant data breach notification letter and a structured risk analysis based on user inputs.

Respond ONLY in a JSON format with two keys:
1. "letter": The full text of the notification letter (use [Consumer Name], [Company Name], and current date as placeholders).
2. "analysis": An array of risk points, each with a "title", "description", and "severity" (Low/Medium/High).

The response must adhere to 2026 CCPA requirements (Section 1798.82 and 1798.150).
Include specific citations where appropriate.`;

  const userPrompt = `A data breach occurred at a startup.
- Data Type Involved: ${dataType}
- Affected California Residents: ${userScale}
- Data Encrypted: ${encrypted}

Please generate the CCPA-compliant notification letter and risk analysis.`;

  try {
    const aiResponse = await callDeepSeek(userPrompt, systemPrompt);
    
    // Attempt to parse JSON from AI response
    // Sometimes AI wraps JSON in backticks, so we clean it.
    const cleanJson = aiResponse.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleanJson);
    
    return {
      success: true,
      data: result
    };
  } catch (error: any) {
    console.error("CCPA Report Generation Error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate AI report. Please check your API key."
    };
  }
}
