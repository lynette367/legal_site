"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function WaitlistButton() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <button
      onClick={() => {
        if (!session) {
          // 🚨 Critical: after successful login, redirect back to the guide page
          signIn("email", { callbackUrl: "/guides/sb988-small-claims-guide" });
        } else {
          setIsModalOpen(true);
        }
      }}
      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3.5 rounded-lg shadow-lg transition"
    >
      {session ? "Unlock Complete Toolkit — $49" : "Sign In to Get Toolkit on Launch"}
    </button>
  );
}
