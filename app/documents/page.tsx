import type { Metadata } from "next";
import { DocumentModule } from "../../components/modules/DocumentModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco Legal Assistant | Auto-generate complaints, defenses, and demand letters",
  description: "Generate legal documents such as complaints, defenses, and demand letters. Enter dispute background and claims to receive a copy-ready draft that reduces legal prep time.",
};

export default function DocumentsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 03"
        title="Automated legal documents"
        description="Enter the dispute background and claims to auto-generate copyable drafts for complaints, defenses, or demand letters with key sections and evidence prompts."
        highlights={["Complaint", "Defense", "Demand letter", "Copyable draft"]}
      />
      <DocumentModule />
    </div>
  );
}
