import type { Metadata } from "next";
import { ExplainModule } from "../../components/modules/ExplainModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco Legal Assistant | Clause Explanation with Risk Notes",
  description: "Paste any contract clause to receive definitions, risk warnings, recommendations, and key considerations. Understand meaning, spot legal risk, and prepare for negotiations.",
};

export default function ExplainPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 05"
        title="Clause explanation"
        description="Paste the clause to get definitions, risk flags, and recommendations that clarify obligations and potential pitfalls."
        highlights={["Definition", "Risk alerts", "Revision tips", "Verification"]}
      />
      <ExplainModule />
    </div>
  );
}
