import OpenAI from "openai";

/**
 * Get DeepSeek API client (lazy init)
 * Uses OpenAI SDK compatibility mode
 * Lazy init avoids reading env vars during build
 */
function getDeepSeekClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseURL = process.env.DEEPSEEK_API_BASE || "https://api.deepseek.com";
  
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY environment variable is not set");
  }
  
  return new OpenAI({
    apiKey,
    baseURL,
  });
}

/**
 * General DeepSeek API caller
 * @param prompt - User prompt
 * @param systemPrompt - System prompt (optional)
 * @param temperature - Sampling temperature, defaults to 0.3
 * @returns AI generated content
 */
export async function callDeepSeek(
  prompt: string,
  systemPrompt?: string,
  temperature: number = 0.3
): Promise<string> {
  try {
    // Lazy init client; only create on invocation
    const deepseekClient = getDeepSeekClient();
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    // Add system prompt
    if (systemPrompt) {
      messages.push({
        role: "system",
        content: systemPrompt,
      });
    }

    // Add user message
    messages.push({
      role: "user",
      content: prompt,
    });

    const response = await deepseekClient.chat.completions.create({
      model: "deepseek-chat",
      messages,
      temperature,
      max_tokens: 4000,
    });

    return response.choices[0]?.message?.content || "Unable to generate a response.";
  } catch (error: unknown) {
    console.error("DeepSeek API Error:", error);
    const message =
      error instanceof Error ? error.message : "DeepSeek API request failed. Please try again.";
    throw new Error(message);
  }
}

/**
 * Prompt templates
 */
export const PROMPTS = {
  LEGAL_QA: `You are a professional legal advisor. For each user question, provide:
1) Issue classification (e.g., labor, contract, consumer)
2) Key risk points
3) Recommended steps to resolve
4) Practical cautions
Respond in a structured, clear format with minimal legal jargon.`,

  DISPUTE: `You are a legal expert skilled at dispute analysis. For the described dispute, provide:
1) Dispute type
2) Rights and obligations of each party
3) Practical resolution paths (negotiation, mediation, arbitration, litigation, etc.)
4) Evidence checklist to prepare
5) Potential legal risks
6) Next-step recommendations
Return a structured plan that is easy to follow.`,

  DOCUMENT: `You are a legal drafting specialist. Generate a formal legal document draft based on the provided details.
Requirements:
1) Use a standard legal document format and clear section headers
2) Include necessary legal references when appropriate
3) Present facts and reasoning clearly and logically
4) State claims or requests precisely
5) Maintain professional tone and formatting
Remind the user that this is a draft and should be reviewed and finalized with a licensed attorney.`,

  CONTRACT: `You are a contract drafting expert. Generate a contract draft that includes:
1) Contract title and optional numbering
2) Placeholders for party information
3) Core clauses (rights and obligations, subject matter, price/payment, term, confidentiality, etc.)
4) Breach and remedies
5) Dispute resolution mechanism
6) Any other essential provisions for the contract type
Use precise, professional language in a standard contract structure. Remind the user to adapt the draft to the actual deal and have counsel review before signing.`,

  EXPLAIN: `You are a contract lawyer. Provide a detailed explanation of the clause:
1) Plain-language meaning
2) Legal effect
3) Impact on each party's rights and obligations
4) Potential risks or unfair terms
5) Recommended negotiation or mitigation steps
Keep the explanation clear and practical.`,

  LAWSUIT: `You are a litigation assistant. Assess the feasibility of litigation based on the facts provided:
1) Case type and likely jurisdiction
2) Statute of limitations considerations
3) Probability of success (qualitative)
4) Evidence required
5) Estimated cost and timeline
6) Key risks
7) Whether litigation is advisable versus alternatives
Provide an objective analysis to support a rational decision.`,
};
