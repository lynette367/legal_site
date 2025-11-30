import type { Metadata } from "next";
import { DisputeModule } from "../../components/modules/DisputeModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco 法律助手｜AI 纠纷方案生成（结构化行动计划与证据清单）",
  description: "AI 法律助手自动生成纠纷解决方案，提供结构化行动计划、证据清单与法律风险分析。适用于消费维权、劳动纠纷、商事争议等各类法律纠纷解决。",
};

export default function DisputePage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 02"
        title="AI 纠纷方案生成"
        description="输入纠纷经过即可获得可执行的行动计划，包括行动路径、证据准备与风险点，适合消费维权和合同争议。"
        highlights={["行动路径", "证据列表", "风险提示", "扣费后调用"]}
      />
      <DisputeModule />
    </div>
  );
}
