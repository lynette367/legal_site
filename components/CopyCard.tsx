// components/CopyCard.tsx
"use client";

import React from "react";

interface CopyCardProps {
  contractSnippet: string;
}

export default function CopyCard({ contractSnippet }: CopyCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(contractSnippet).then(() => {
      alert("Template copied to clipboard!");
    });
  };

  return (
    <div className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <pre className="whitespace-pre-wrap break-words text-xs font-mono text-gray-800" id="template-text">
        {contractSnippet}
      </pre>
      <button
        type="button"
        className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none"
        onClick={handleCopy}
      >
        copy
      </button>
    </div>
  );
}
