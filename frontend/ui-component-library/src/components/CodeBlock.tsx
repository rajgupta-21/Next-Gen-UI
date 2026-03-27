"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export default function CodeBlock({ code, language, className = "" }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function highlight() {
      try {
        let lang = language.toLowerCase();
        if (lang === "react" || lang === "jsx") lang = "tsx";
        if (lang === "angular") lang = "html"; // Or angular-html if available in shiki version
        if (lang === "javascript") lang = "js";
        
        const html = await codeToHtml(code, {
          lang: lang,
          theme: "github-dark-dimmed", // More premium look
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
    }
    highlight();
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#0d1117] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-all"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-auto max-h-[400px] text-[13px] font-mono leading-relaxed shiki-container">
        {highlightedCode ? (
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className="shiki-wrapper"
          />
        ) : (
          <pre className="text-gray-400">
            <code>{code}</code>
          </pre>
        )}
      </div>

      <style jsx global>{`
        .shiki-container pre {
          background-color: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .shiki-container code {
          font-family: inherit !important;
        }
      `}</style>
    </div>
  );
}
