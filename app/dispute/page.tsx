import type { Metadata } from "next";
import { DisputeModule } from "../../components/modules/DisputeModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco Legal Assistant | AI Dispute Plans (Action steps and evidence lists)",
  description: "Generate dispute solutions with structured action plans, evidence checklists, and legal risk analysis. Suitable for consumer protection, employment issues, and commercial disputes.",
};

export default function DisputePage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 02"
        title="AI dispute plan generator"
        description="Describe the dispute to receive an actionable plan covering steps, evidence prep, and risk points. Works for consumer and contract disputes."
        highlights={["Action path", "Evidence list", "Risk alerts", "Billed usage"]}
      />
      <DisputeModule />
    </div>
  );
}
