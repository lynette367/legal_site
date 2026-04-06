import type { Metadata } from "next";
import { ContractModule } from "../../components/modules/ContractModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco Legal Assistant | AI Contract Generator (Lease, partnership, labor)",
  description: "Automatically generate contracts including leases, partnership agreements, labor contracts, and NDAs. Produce professional drafts that flag legal risks and protect your interests.",
};

export default function ContractsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 04"
        title="Contract auto-generation"
        description="Select a contract type and enter key terms to generate reusable drafts for leases, labor agreements, partnerships, and NDAs."
        highlights={["Lease", "Labor", "Partnership", "NDA"]}
      />
      <ContractModule />
    </div>
  );
}
