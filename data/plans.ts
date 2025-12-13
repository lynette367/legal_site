export interface Plan {
  id: string;
  name: string;
  description: string;
  credits: number;
  price: string;
  recommended?: boolean;
}

export type PaymentMethod = "paypal" | "wechat" | "alipay";

export interface PaymentChannel {
  label: string;
  value: Exclude<PaymentMethod, "paypal">;
}

// Credit cost per feature
export const creditsCost = {
  legalQa: 1,      // AI legal Q&A
  explain: 1,      // Clause explanation
  dispute: 2,      // Dispute plan generation
  document: 3,     // Document drafting
  contract: 3,     // Contract generation
};

export const singleUse = [
  { label: "AI Q&A", detail: "Each call deducts 1 credit", cost: 1 },
  { label: "Clause explanation", detail: "Each call deducts 1 credit", cost: 1 },
  { label: "Dispute plan", detail: "Each call deducts 2 credits", cost: 2 },
  { label: "Document drafting", detail: "Each call deducts 3 credits", cost: 3 },
  { label: "Contract generation", detail: "Each call deducts 3 credits", cost: 3 },
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Starter credits pack",
    description: "For ad-hoc legal questions. About 12 Q&A calls or 6 dispute plans or 4 document drafts.",
    credits: 12,
    price: "¥9.9",
  },
  {
    id: "standard",
    name: "Popular credits pack",
    description: "Best value for individuals and small teams: about 45 Q&A calls or 22 dispute plans or 15 document drafts.",
    credits: 45,
    price: "¥29.9",
    recommended: true,
  },
  {
    id: "pro",
    name: "Pro credits pack",
    description: "For heavy users like lawyers, legal ops, or HR: about 120 Q&A calls, 60 dispute plans, or 40 document/contract drafts.",
    credits: 120,
    price: "¥59.9",
  },
];

export const paymentChannels: PaymentChannel[] = [
  { label: "WeChat H5 Pay", value: "wechat" },
  { label: "Alipay H5 Pay", value: "alipay" },
];

// Credit usage notes
export const creditsNote = "Credits work across all features; each call deducts 1-3 credits based on complexity.";
