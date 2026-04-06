import type { OutputBlock } from "../components/ui/ExampleShowcase";

interface ModuleExample {
  input: string;
  output: OutputBlock[];
}

export const moduleExamples: Record<
  "legalQa" | "dispute" | "documents" | "contracts" | "explain",
  ModuleExample
> = {
  legalQa: {
    input: "Example: The company forces me to extend my probation. Is that lawful?",
    output: [
      { label: "Issue type", value: "Labor contract dispute" },
      { label: "Risk points", items: ["Extending probation requires mutual consent", "Probation cannot be reset repeatedly"] },
      {
        label: "Suggested steps",
        items: ["Ask the company to state its reasons in writing", "Confirm whether you consent", "Keep all written evidence"],
      },
      { label: "Notes", value: "Total probation length cannot exceed 6 months" },
    ],
  },
  dispute: {
    input: "Example: Bought a phone online and it was refurbished; the seller refuses a refund.",
    output: [
      { label: "Dispute type", value: "Consumer protection" },
      { label: "Potential violations", items: ["Breach of warranty obligations", "Goods do not match description"] },
      { label: "Action plan", items: ["Contact customer support", "Submit purchase and defect evidence", "If unresolved → escalate to consumer regulator"] },
      { label: "Notes", value: "Maintain a clear evidence trail" },
    ],
  },
  documents: {
    input: "Example: Bought an e-bike that turned out to be refurbished; the seller refuses a refund.",
    output: [
      { label: "Document type", value: "Complaint" },
      { label: "Key sections", items: ["Party information", "Facts and reasoning", "Claims for relief", "Evidence list"] },
    ],
  },
  contracts: {
    input: "Example: Residential lease; I am the landlord; deposit of three months, one month rent upfront.",
    output: [
      { label: "Contract type", value: "Residential lease" },
      { label: "Auto-generated clauses", items: ["Term", "Deposit", "Payment schedule", "Breach provisions", "Dispute resolution"] },
    ],
  },
  explain: {
    input: "Example: Party B shall bear all legal liability arising therefrom.",
    output: [
      { label: "Clause meaning", value: "Party B assumes full liability" },
      { label: "Risk points", value: "Liability scope is overly broad" },
      { label: "Recommendation", value: "Clarify liability boundaries and carve-outs" },
    ],
  },
};
