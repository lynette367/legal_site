import type { Metadata } from "next";
import { PaymentSuccessPanel } from "../../../components/pricing/PaymentSuccessPanel";
import { PageHero } from "../../../components/ui/PageHero";
import { plans } from "../../../data/plans";

export const metadata: Metadata = {
  title: "Payment Success | Panco Legal Assistant",
  description: "Successful payments automatically add credits and remind users to complete verification in modules.",
};

interface SuccessPageProps {
  searchParams: { plan?: string; credits?: string };
}

export default function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const planName = plans.find((plan) => plan.id === searchParams.plan)?.name ?? "Plan";
  const credits = Number(searchParams.credits ?? 0);

  return (
    <div className="space-y-10">
      <PageHero
        overline="Payment"
        title="Payment successful"
        description="Funds cleared through the payment channel have been recorded and credits have been added."
        highlights={["Credited", "Auto top-up", "Usage reminder"]}
      />
      <PaymentSuccessPanel planName={planName} credits={credits} />
    </div>
  );
}
