"use client";

import { COMPONENT_DEFAULTS, ComponentName } from "@/contexts/ComponentCustomContext";
import { Format, generateCode } from "@/lib/code-gen";
import { Palette } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CodeBlock from "./CodeBlock";

interface ComponentSectionProps {
  id: ComponentName;
  label: string;
  children: React.ReactNode;
}

export default function ComponentSection({ id, label, children }: ComponentSectionProps) {
  const [activeTab, setActiveTab] = useState<Format>("react");

  const code = generateCode(id, COMPONENT_DEFAULTS[id], activeTab);

  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
              {label}
            </h3>
          </div>
          <Link
            href={`/personalization?c=${id}`}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <Palette className="w-4 h-4" />
            Customize Design
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[450px]">
          {/* Preview Area */}
          <div className="p-10 flex items-center justify-center bg-gray-50 dark:bg-gray-950/50 relative overflow-hidden group/preview">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.9))] -z-10" />
            <div className="relative transform group-hover/preview:scale-[1.02] transition-transform duration-500">
              {children}
            </div>
          </div>

          {/* Code Area */}
          <div className="flex flex-col border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            {/* Tabs */}
            <div className="flex items-center gap-6 px-8 h-14 border-b border-gray-100 dark:border-gray-800">
              {(["react", "html", "angular"] as Format[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-bold uppercase tracking-widest relative h-full transition-colors ${
                    activeTab === tab
                      ? "text-indigo-600"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Code Block Integration */}
            <div className="p-6 flex-1 bg-gray-50/30 dark:bg-gray-900/30">
              <CodeBlock 
                code={code} 
                language={activeTab} 
                className="h-full border-none shadow-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
