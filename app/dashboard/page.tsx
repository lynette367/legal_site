import type { Metadata } from "next";
import { UserCenterPanel } from "../../components/common/UserCenterPanel";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "用户中心｜Panco 法律助手",
  description: "查看剩余次数、充值入口与安全策略，确保付费调用后才能发起 AI 请求。",
};

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Account"
        title="用户中心"
        description="集中展示账户信息、剩余调用次数与安全提示。没有可用次数时后端将阻止所有调用。"
        highlights={["剩余次数", "充值入口", "行为验证"]}
      />
      <UserCenterPanel />
    </div>
  );
}
