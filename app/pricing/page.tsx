import type { Metadata } from "next";
import { PricingContent } from "../../components/pricing/PricingContent";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "套餐购买｜Panco 法律助手",
  description: "无免费次数，支持按次与套餐付费，支付成功后自动增加调用次数。",
};

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Pricing"
        title="购买套餐 / 按次付费"
        description="0 免费次数。AI 问答、纠纷方案、文书与合同生成每次调用都会经由后端计费与扣费。"
        highlights={["按次", "套餐", "聚合支付"]}
      />
      <PricingContent />
    </div>
  );
}
