import type { Metadata } from "next";
import { LegalQaModule } from "../../components/modules/LegalQaModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco 法律助手｜AI 法律问答（输入问题即可获得清晰法律解释）",
  description: "AI 法律助手提供即时法律问答服务，输入问题即可获得清晰法律解释、问题类型识别、法律风险提示与建议步骤。自动生成专业回答，帮助快速理解法律问题。",
};

export default function LegalQaPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 01"
        title="AI 法律问答"
        description="通过结构化问答快速了解劳动、合同、消费等纠纷类型。必须登录并支付后才能被调用，每次扣除 1 次。"
        highlights={["问题类型识别", "风险提示", "建议步骤", "行为验证码"]}
      />
      <LegalQaModule />
    </div>
  );
}
