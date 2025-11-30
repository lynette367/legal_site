import type { Metadata } from "next";
import { ExplainModule } from "../../components/modules/ExplainModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco 法律助手｜法律条款解释工具（风险提示 / 注意事项）",
  description: "AI 法律助手提供法律条款解释功能，粘贴合同条款即可获得定义解析、风险提示、修改建议与注意事项。帮助理解法律条款含义，识别潜在法律风险，辅助合同谈判与签署。",
};

export default function ExplainPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 05"
        title="条款解释功能"
        description="粘贴条款后，由 AI 输出定义、风险点与建议，帮助看清责任范围与潜在陷阱。"
        highlights={["定义解析", "风险提示", "修改建议", "行为验证"]}
      />
      <ExplainModule />
    </div>
  );
}
