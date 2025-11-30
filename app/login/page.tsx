import type { Metadata } from "next";
import { LoginPageContent } from "../../components/common/LoginPageContent";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "登录｜Panco 法律助手",
  description: "登录后才能使用 Panco 法律助手，所有调用需扣费且无免费次数。",
};

export default function LoginPage() {
  return (
    <div className="space-y-10">
      <LoginPageContent />
    </div>
  );
}
