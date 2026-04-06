import type { Metadata } from "next";
import { LegalQaModule } from "../../components/modules/LegalQaModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco Legal Assistant | AI Legal Q&A (Clear legal explanations)",
  description: "On-demand legal Q&A that classifies the issue, highlights legal risks, and suggests steps. Generates professional responses to help you understand the matter quickly.",
};

export default function LegalQaPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 01"
        title="AI legal Q&A"
        description="Structured Q&A to identify labor, contract, and consumer dispute types. Requires login and paid credits; each call deducts one credit."
        highlights={["Issue classification", "Risk alerts", "Suggested steps", "Human verification"]}
      />
      <LegalQaModule />
    </div>
  );
}
