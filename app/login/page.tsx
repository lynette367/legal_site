import type { Metadata } from "next";
import { LoginPageContent } from "../../components/common/LoginPageContent";

export const metadata: Metadata = {
  title: "Log In | Panco Legal Assistant",
  description: "Sign in to use Panco Legal Assistant. All calls are billed with no free quota.",
};

export default function LoginPage() {
  return (
    <div className="space-y-10">
      <LoginPageContent />
    </div>
  );
}
