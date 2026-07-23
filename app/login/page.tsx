import type { Metadata } from "next";
import { LoginPageContent } from "../../components/common/LoginPageContent";

export const metadata: Metadata = {
  title: "Log In | Indie Legal Assistant",
  description: "Sign in to use Indie Legal Assistant. All calls are billed with no free quota.",
};

export default function LoginPage() {
  return (
    <div className="space-y-10">
      <LoginPageContent />
    </div>
  );
}
