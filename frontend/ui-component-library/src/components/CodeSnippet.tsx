"use client";

import React from "react";

export default function CodeSnippet({ children }: { children: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="relative bg-black/5 p-4 rounded">
      <button
        onClick={copy}
        className="absolute right-3 top-3 text-xs bg-white/6 px-2 py-1 rounded"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="whitespace-pre-wrap">{children}</pre>
    </div>
  );
}
