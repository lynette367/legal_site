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
    description: "For occasional legal questions or quick clause explanations.\nAbout 40 Q&A calls, 20 dispute plans, or 13 document drafts.",
    credits: 40,
    price: "$9.99",
  },
  {
    id: "standard",
    name: "Popular credits pack",
    description: "Best value for individuals and small teams.\nAbout 150 Q&A calls, 75 dispute plans, or 50 document drafts.",
    credits: 150,
    price: "$29.99",
    recommended: true,
  },
  {
    id: "pro",
    name: "Pro credits pack",
    description: "Designed for heavy users such as lawyers, founders, or HR teams.\nAbout 360 Q&A calls, 180 dispute plans, or 120 document/contract drafts.",
    credits: 360,
    price: "$59.99",
  },
];

export const paymentChannels: PaymentChannel[] = [
  { label: "WeChat H5 Pay", value: "wechat" },
  { label: "Alipay H5 Pay", value: "alipay" },
];

// Credit usage notes
export const creditsNote = "Credits work across all features; each call deducts 1-3 credits based on complexity.";
