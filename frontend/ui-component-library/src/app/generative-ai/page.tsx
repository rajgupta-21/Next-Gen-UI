"use client";
import CodeBlock from "@/components/CodeBlock";
import Featuresec from "@/Genai-comp/feature-sec";
import { Infosec } from "@/Genai-comp/infosec";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Code2,
    Copy,
    Download,
    Eye,
    Loader2,
    Sparkles,
    XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5004";

// NEW: Import Sandpack components
import {
    SandpackCodeEditor,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider,
} from "@codesandbox/sandpack-react";

// NEW: Sandpack-based Component Preview
function ComponentPreview({ code }: { code: string }) {
  const [previewError, setPreviewError] = useState<string | null>(null);

  const prepareCodeForSandpack = useCallback(() => {
    try {
      let cleanCode = code;

      // Remove 'use client' directives
      cleanCode = cleanCode
        .replace(/"use client";\s*/g, "")
        .replace(/'use client';\s*/g, "")
        .replace(/use client;\s*/g, "");

      // AI often adds import React; Sandpack template already imports React (duplicate = error)
      for (let i = 0; i < 40; i++) {
        const before = cleanCode;
        cleanCode = cleanCode.replace(/^import\s[\s\S]*?;\s*\r?\n?/m, "");
        if (cleanCode === before) break;
      }

      // Remove export statements
      cleanCode = cleanCode.replace(/export\s+default\s+/g, "");
      cleanCode = cleanCode.replace(/export\s+/g, "");

      // Extract component name
      const nameMatch = cleanCode.match(/(?:function|const)\s+(\w+)/);
      const componentName = nameMatch ? nameMatch[1] : "GeneratedComponent";

      // Wrap component for Sandpack
      const wrappedCode = `import React, { useState, useEffect, useRef, useCallback } from 'react';

${cleanCode}

export default ${componentName};`;

      return wrappedCode;
    } catch (error) {
      setPreviewError((error as Error).message);
      return "";
    }
  }, [code]);

  if (previewError) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="text-center p-8 max-w-2xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-900 mb-2">Preview Error</h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-sm text-red-700 font-mono text-left">
              {previewError}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            The AI generated code with syntax errors. Try:
          </p>
          <ul className="text-sm text-gray-700 text-left mb-4 space-y-2">
            <li>• Regenerating with a simpler, clearer prompt</li>
            <li>
              • Describing one specific component instead of multiple features
            </li>
            <li>• Using the example prompts provided</li>
          </ul>
        </div>
      </div>
    );
  }

  const sandpackCode = prepareCodeForSandpack();

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ minHeight: "500px" }}
    >
      {/* NEW: Sandpack Provider with React template */}
      <SandpackProvider
        template="react"
        theme="dark"
        files={{
          "/App.js": sandpackCode,
          "/styles.css": `/* Tailwind CSS via CDN */
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/base.min.css');

body {
  margin: 0;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#root {
  width: 100%;
  max-width: 1200px;
}`,
        }}
        customSetup={{
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          autorun: true,
          autoReload: true,
          recompileMode: "immediate",
          recompileDelay: 300,
        }}
      >
        <SandpackLayout>
          {/* Preview only - no code editor visible */}
          <SandpackPreview
            showOpenInCodeSandbox={true}
            showRefreshButton={true}
            showNavigator={false}
            style={{ height: "500px" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}


// ─── Language Converters ───────────────────────────────────────────────────

/**
 * Best-effort conversion of React JSX → plain HTML.
 * Handles the most common patterns an AI component generator would produce.
 */
function convertJSXtoHTML(jsxCode: string): string {
  let html = jsxCode;

  // Remove React/TS boilerplate
  html = html.replace(/^"use client";?\s*/m, '');
  html = html.replace(/^import\s+.*?;\s*$/gm, '');
  html = html.replace(/export\s+default\s+/g, '');
  html = html.replace(/export\s+/g, '');

  // Convert className → class
  html = html.replace(/className=/g, 'class=');

  // Remove TypeScript annotations: : Type, <Type>, as Type
  html = html.replace(/:\s*\w+(<[^>]+>)?/g, '');
  html = html.replace(/<[A-Z][\w.]*>/g, '');

  // Convert JSX self-closing to HTML void elements
  html = html.replace(/<(input|img|hr|br|meta|link)([^>]*?)\s*\/>/gi, '<$1$2>');

  // Convert {` template literals `} style expressions – strip braces around strings
  html = html.replace(/\{`([^`]*)`\}/g, '$1');

  // Convert simple {variable} / {"string"} expressions
  html = html.replace(/\{"([^"]*?)"\}/g, '$1');
  html = html.replace(/\{'([^']*?)'\}/g, '$1');

  // Convert {props.xxx} and {xxx} to placeholder text
  html = html.replace(/\{[^{}\n]+\}/g, '<!-- dynamic -->');

  // Remove arrow function components, keep JSX return body
  html = html.replace(/(?:const|function)\s+\w+[^{]*\{[\s\S]*?return\s*\(([\s\S]*?)\);?\s*\};?/g, '$1');

  // Trim and wrap
  html = html.trim();

  // Extract style tags from JSX style objects (basic)
  // Already handles inline style="" strings from the AI output

  const css = `/* Paste your Tailwind / component CSS here */`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generated Component</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    ${css}
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-8 bg-gray-50">

${html}

</body>
</html>`;
}

/**
 * Best-effort conversion of React JSX → AngularJS 1.x component.
 */
function convertJSXtoAngular(jsxCode: string): string {
  let html = jsxCode;

  // Remove boilerplate
  html = html.replace(/^"use client";?\s*/m, '');
  html = html.replace(/^import\s+.*?;\s*$/gm, '');
  html = html.replace(/export\s+default\s+/g, '');
  html = html.replace(/export\s+/g, '');

  // className → class
  html = html.replace(/className=/g, 'class=');

  // Remove TS annotations
  html = html.replace(/:\s*\w+(<[^>]+>)?/g, '');

  // Convert JSX self-closing void elements
  html = html.replace(/<(input|img|hr|br|meta|link)([^>]*?)\s*\/>/gi, '<$1$2>');

  // Convert {`...`} template expressions
  html = html.replace(/\{`([^`]*)`\}/g, '$1');
  html = html.replace(/\{"([^"]*?)"\}/g, '$1');
  html = html.replace(/\{'([^']*?)'\}/g, '$1');

  // Simple {variable} → Angular expression {{variable}}
  html = html.replace(/\{([a-zA-Z_$][a-zA-Z0-9_$.]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$.]*)*?)\}/g, '{{$1}}');

  // Strip remaining JSX-only expressions
  html = html.replace(/\{[^{}\n]+\}/g, '');

  // Convert onClick → ng-click, onChange → ng-change, onSubmit → ng-submit
  html = html.replace(/onClick=\{[^}]+\}/g, 'ng-click="ctrl.handleClick()"');
  html = html.replace(/onChange=\{[^}]+\}/g, 'ng-change="ctrl.handleChange()"');
  html = html.replace(/onSubmit=\{[^}]+\}/g, 'ng-submit="ctrl.handleSubmit()"');

  // Remove remaining {…} blocks
  html = html.replace(/\{[^{}\n]+\}/g, '');

  // Extract JSX return body
  html = html.replace(/(?:const|function)\s+\w+[^{]*\{[\s\S]*?return\s*\(([\s\S]*?)\);?\s*\};?/g, '$1');

  html = html.trim();

  return `<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generated Component</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"><\/script>
  <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body class="min-h-screen flex items-center justify-center p-8 bg-gray-50"
      ng-controller="MainCtrl as ctrl">

${html}

  <script>
    angular.module('myApp', [])
      .controller('MainCtrl', function() {
        var self = this;
        // Add your controller logic here
        self.handleClick = function() {};
        self.handleChange = function() {};
        self.handleSubmit = function() {};
      });
  <\/script>
</body>
</html>`;
}

// ─── Code display component with Sandpack code editor ────────────────────────
function CodeDisplay({ code, lang }: { code: string; lang: 'react' | 'html' | 'angularjs' }) {
  const [copied, setCopied] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const getDisplayCode = () => {
    if (lang === 'html') return convertJSXtoHTML(code);
    if (lang === 'angularjs') return convertJSXtoAngular(code);
    return code;
  };

  const displayCode = getDisplayCode();

  const copyCode = () => {
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prepareCodeForSandpack = () => {
    let cleanCode = code;
    cleanCode = cleanCode
      .replace(/"use client";\s*/g, "")
      .replace(/'use client';\s*/g, "");
    cleanCode = cleanCode.replace(/export\s+default\s+/g, "");
    cleanCode = cleanCode.replace(/export\s+/g, "");

    const nameMatch = cleanCode.match(/(?:function|const)\s+(\w+)/);
    const componentName = nameMatch ? nameMatch[1] : "GeneratedComponent";

    return `import React, { useState, useEffect, useRef, useCallback } from 'react';

${cleanCode}

export default ${componentName};`;
  };

  return (
    <div className="relative">
      <div className="flex gap-2 absolute top-3 right-3 z-10">
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-md flex items-center gap-1 transition-colors"
        >
          <Code2 className="w-3 h-3" />
          {showEditor ? "Show Raw" : "Live Editor"}
        </button>
        <button
          onClick={copyCode}
          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-md flex items-center gap-1 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="w-3 h-3" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>

      {showEditor ? (
        // NEW: Sandpack live code editor
        <div
          className="rounded-lg overflow-hidden"
          style={{ minHeight: "400px" }}
        >
          <SandpackProvider
            template="react"
            theme="dark"
            files={{
              "/App.js": prepareCodeForSandpack(),
            }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
          >
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              showInlineErrors
              wrapContent
              style={{ height: "400px" }}
            />
          </SandpackProvider>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
          <CodeBlock 
            code={displayCode} 
            language={lang === 'angularjs' ? 'angular' : lang} 
            className="border-none shadow-none bg-transparent"
          />
        </div>
      )}
    </div>
  );
}

// Toast notification component
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white animate-slide-in`}
    >
      {type === "success" ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        ✕
      </button>
    </div>
  );
}

// Main App Component
export default function ComponentGeneratorApp() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<{
    code: string;
    prompt: string;
    timestamp: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<
    { code: string; prompt: string; timestamp: number }[]
  >([]);
  const [activeTab, setActiveTab] = useState("preview");
  const [codeLang, setCodeLang] = useState<'react' | 'html' | 'angularjs'>('react');
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  /** Groq cloud vs local Ollama agent (backend must reach Ollama on the server machine). */
  const [generateMode, setGenerateMode] = useState<"groq" | "ollama">("groq");

  const getConvertedCode = (rawCode: string) => {
    if (codeLang === 'html') return convertJSXtoHTML(rawCode);
    if (codeLang === 'angularjs') return convertJSXtoAngular(rawCode);
    return rawCode;
  };

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const examplePrompts = [
    "Modern pricing card with gradient background",
    "Animated button with ripple effect",
    "Product card with image and rating stars",
    "Newsletter signup with validation",
    "Loading skeleton component",
    "Alert notification with icons",
    "Dashboard stats card with icons",
    "Profile card with avatar and bio",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const path =
        generateMode === "ollama"
          ? "/api/generate-component-agent"
          : "/api/generate-component";
      const response = await fetch(`${BACKEND_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        console.error("❌ Response not OK");
        let errorMessage = `Failed to generate component (Status: ${response.status})`;

        const contentType = response.headers.get("content-type");

        try {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            console.error("📄 Error JSON:", errorData);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } else {
            const textError = await response.text();
            console.error("📄 Error Text:", textError);
            errorMessage = textError || errorMessage;
          }
        } catch (parseError) {
          console.error("❌ Parse Error:", parseError);
        }

        throw new Error(errorMessage);
      }

      const rawData = await response.text();

      let data;
      try {
        data = JSON.parse(rawData);
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
        throw new Error("Invalid JSON response from API");
      }

      if (!data.code) {
        throw new Error("Invalid response: missing code property");
      }

      if (typeof data.code !== "string") {
        console.error("❌ Code is not a string, type:", typeof data.code);
        throw new Error("Invalid response: code must be a string");
      }

      const generatedData = {
        code: data.code,
        prompt: data.prompt || prompt,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setGenerated(generatedData);
      setHistory([generatedData, ...history.slice(0, 9)]);
      setPrompt("");
      setActiveTab("preview");
      showToast("Component generated successfully!", "success");
    } catch (err) {
      console.error("💥 Generation error:", err);
      console.error("🔍 Error type:", (err as Error).constructor.name);
      console.error("📝 Error message:", (err as Error).message);
      console.error("📚 Error stack:", (err as Error).stack);

      const errorMsg = err instanceof Error ? err.message : "Generation failed";
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const downloadComponent = () => {
    if (!generated) return;
    const ext = codeLang === 'react' ? 'tsx' : 'html';
    const filename = codeLang === 'angularjs' ? 'Component.angular.html' : `Component.${ext}`;
    const blob = new Blob([getConvertedCode(generated.code)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Component downloaded as ${filename}!`, "success");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <div className="p-3 bg-gray-900 dark:bg-gray-100 rounded-xl">
              <Sparkles className="w-8 h-8 text-white dark:text-gray-900" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              AI Component Generator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into production-ready React components
            instantly with AI
          </p>
          <div className="mt-4 flex justify-center gap-2 flex-wrap text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full">
              Sandpack Live Preview
            </span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full">
              Production Ready
            </span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full">
              Copy & Use
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Section - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 sticky top-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-900 dark:bg-gray-100 rounded-lg">
                  <Code2 className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Model backend
                  </span>
                  <div className="flex flex-col gap-2 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        name="gen-mode"
                        checked={generateMode === "groq"}
                        onChange={() => setGenerateMode("groq")}
                        disabled={loading}
                        className="accent-gray-900 dark:accent-gray-100"
                      />
                      Groq (cloud) — needs{" "}
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                        GROQ_API_KEY
                      </code>{" "}
                      on the backend
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        name="gen-mode"
                        checked={generateMode === "ollama"}
                        onChange={() => setGenerateMode("ollama")}
                        disabled={loading}
                        className="accent-gray-900 dark:accent-gray-100"
                      />
                      Local Ollama (agent) — backend calls Ollama on the same machine; can take several minutes
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Describe Your Component
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) {
                        handleGenerate();
                      }
                    }}
                    placeholder="e.g., Create a modern card with header and call-to-action button"
                    className="w-full h-32 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none text-sm placeholder-gray-400 transition-all"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Tip: Press Ctrl+Enter to generate
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-800 dark:text-red-200">
                        Generation Error
                      </p>
                      <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 text-white dark:text-gray-900 font-bold py-3 px-4 rounded-xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 disabled:opacity-50 text-base md:text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {generateMode === "ollama"
                        ? "Generating (Ollama)…"
                        : "Generating…"}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Component
                    </>
                  )}
                </button>

                {toast && (
                  <div
                    className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${
                      toast.type === "success"
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {toast.type === "success" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    {toast.message}
                  </div>
                )}

                <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-sm flex items-center gap-2">
                    Quick Examples
                  </h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                    {examplePrompts.map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPrompt(example)}
                        disabled={loading}
                        className="w-full text-left text-xs p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview/Code Section */}
          <div className="lg:col-span-2 space-y-6">
            {generated ? (
              <>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="bg-gray-100 dark:bg-gray-800 px-6 md:px-8 py-4 md:py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-3">
                      {/* Row 1: View tabs + action buttons */}
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                          <button
                            onClick={() => setActiveTab("preview")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all ${
                              activeTab === "preview"
                                ? "bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-900"
                                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Preview</span>
                          </button>
                          <button
                            onClick={() => setActiveTab("code")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all ${
                              activeTab === "code"
                                ? "bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-900"
                                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            }`}
                          >
                            <Code2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Code</span>
                          </button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(getConvertedCode(generated.code));
                              showToast("Code copied to clipboard!", "success");
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg font-medium transition-all text-sm"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="hidden sm:inline">Copy</span>
                          </button>
                          <button
                            onClick={downloadComponent}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg font-medium transition-all text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download</span>
                          </button>
                        </div>
                      </div>

                      {/* Row 2: Language selector tabs */}
                      <div className="flex gap-2">
                        {(['react', 'html', 'angularjs'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setCodeLang(lang)}
                            className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                              codeLang === lang
                                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {lang === 'react' ? 'React JSX' : lang === 'html' ? 'HTML' : 'AngularJS'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    {activeTab === "preview" ? (
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <ComponentPreview code={generated.code} />
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <CodeDisplay code={generated.code} lang={codeLang} />
                      </div>
                    )}
                  </div>
                </div>

                {/* History Section */}
                {history.length > 1 && (
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                      <Clock className="w-5 h-5" />
                      Generation History
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                      {history.slice(1).map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setGenerated(item);
                            setActiveTab("preview");
                          }}
                          className="text-left p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
                        >
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 text-sm truncate">
                            {item.prompt.substring(0, 40)}...
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-gray-900 h-[100%] rounded-2xl p-12 md:p-16 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center min-h-96">
                <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                  <Sparkles className="w-12 h-12 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Ready to Create?
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mb-6">
                  Describe your component idea in the sidebar and let AI bring
                  it to life
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Waiting for your prompt...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <Infosec />

        {/* Features Section */}
        <Featuresec />
      </div>
    </div>
  );
}
