import type { Metadata } from "next";
import { ContractModule } from "../../components/modules/ContractModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco 法律助手｜AI 合同生成器（租房合同、合作协议、劳务合同）",
  description: "AI 法律助手提供合同自动生成服务，支持租房合同、合作协议、劳务合同、NDA 等多种合同类型。自动生成专业合同模板，帮助识别法律风险，保护合法权益。",
};

export default function ContractsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 04"
        title="合同自动生成"
        description="通过选择合同类型与输入核心条款，一键生成可复用合同草稿，覆盖租房、劳务、合作与 NDA。"
        highlights={["租房", "劳务", "合作", "NDA"]}
      />
      <ContractModule />
    </div>
  );
}
