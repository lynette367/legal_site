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

// 各功能扣费规则
export const creditsCost = {
  legalQa: 1,      // AI 法律问答
  explain: 1,      // 条款解释
  dispute: 2,      // 纠纷方案生成
  document: 3,     // 文书生成
  contract: 3,     // 合同生成
};

export const singleUse = [
  { label: "AI 问答", detail: "每次调用扣 1 点", cost: 1 },
  { label: "条款解释", detail: "每次调用扣 1 点", cost: 1 },
  { label: "纠纷方案", detail: "每次调用扣 2 点", cost: 2 },
  { label: "文书生成", detail: "每次调用扣 3 点", cost: 3 },
  { label: "合同生成", detail: "每次调用扣 3 点", cost: 3 },
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "基础点数包",
    description: "适合临时法律咨询用户。可完成约 12 次问答或 6 次纠纷方案或 4 次文书生成。",
    credits: 12,
    price: "¥9.9",
  },
  {
    id: "standard",
    name: "常用点数包",
    description: "最推荐：适合个人、小微企业用户，可完成约 45 次问答或 22 次纠纷方案或 15 次文书生成。",
    credits: 45,
    price: "¥29.9",
    recommended: true,
  },
  {
    id: "pro",
    name: "专业点数包",
    description: "适合律师、法务、HR 等高频使用者，可完成约 120 次问答或 60 次纠纷方案或 40 次文书/合同生成。",
    credits: 120,
    price: "¥59.9",
  },
];

export const paymentChannels: PaymentChannel[] = [
  { label: "微信 H5 支付", value: "wechat" },
  { label: "支付宝 H5 支付", value: "alipay" },
];

// 点数适用说明
export const creditsNote = "点数适用所有功能，不同功能按复杂度扣除 1-3 点";
