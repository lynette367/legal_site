import type { Metadata } from "next";
import { PaymentSuccessPanel } from "../../../components/pricing/PaymentSuccessPanel";
import { PageHero } from "../../../components/ui/PageHero";
import { plans } from "../../../data/plans";

export const metadata: Metadata = {
  title: "支付成功｜Panco 法律助手",
  description: "支付成功后自动增加调用次数，并提醒用户在模块中完成行为验证后使用。",
};

interface SuccessPageProps {
  searchParams: { plan?: string; credits?: string };
}

export default function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const planName = plans.find((plan) => plan.id === searchParams.plan)?.name ?? "套餐";
  const credits = Number(searchParams.credits ?? 0);

  return (
    <div className="space-y-10">
      <PageHero
        overline="Payment"
        title="支付成功"
        description="资金通过聚合支付渠道完成，系统已记录交易并增加账户剩余次数。"
        highlights={["到账提醒", "自动加次", "行为提示"]}
      />
      <PaymentSuccessPanel planName={planName} credits={credits} />
    </div>
  );
}
