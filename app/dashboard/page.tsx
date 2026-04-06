import type { Metadata } from "next";
import { UserCenterPanel } from "../../components/common/UserCenterPanel";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Dashboard | Panco Legal Assistant",
  description: "Review remaining credits, recharge options, and safety notices. Calls require paid credits.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Account"
        title="User dashboard"
        description="Centralized account info, remaining credits, and safety notices. Calls are blocked when credits run out."
        highlights={["Credits left", "Recharge", "Verification"]}
      />
      <UserCenterPanel />
    </div>
  );
}
