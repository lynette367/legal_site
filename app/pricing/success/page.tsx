import type { Metadata } from "next";
import { PaymentSuccessPanel } from "../../../components/pricing/PaymentSuccessPanel";
import { PageHero } from "../../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Payment Success | Panco Legal Assistant",
  description: "Payment successful - your contract credits have been added.",
};

interface SuccessPageProps {
  searchParams: { contracts?: string };
}

export default function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const contracts = Number(searchParams.contracts ?? 1);

  return (
    <div className="space-y-10">
      <PageHero
        overline="Payment"
        title="Payment successful"
        description="Your payment has been confirmed and contract credits were added to your account."
        highlights={["Credited", "Instant use", "Secure payment"]}
      />
      <PaymentSuccessPanel contracts={contracts} />
    </div>
  );
}