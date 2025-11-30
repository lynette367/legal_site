import type { Metadata } from "next";
import { DocumentModule } from "../../components/modules/DocumentModule";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Panco 法律助手｜自动生成起诉状/答辩状/投诉书",
  description: "AI 法律助手自动生成法律文书，包括起诉状、答辩状、投诉书等。输入纠纷背景与诉求，自动生成可复制草稿，帮助快速准备法律文件，降低法律风险。",
};

export default function DocumentsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Module 03"
        title="法律文书自动生成"
        description="输入纠纷背景与诉求后，自动生成可复制的起诉状、答辩状或投诉书草稿，包含关键段落与证据提示。"
        highlights={["起诉状", "答辩状", "投诉书", "复制草稿"]}
      />
      <DocumentModule />
    </div>
  );
}
