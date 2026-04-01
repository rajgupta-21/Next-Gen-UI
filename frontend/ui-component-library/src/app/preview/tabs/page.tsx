"use client";
import CodeBlock from "@/components/CodeBlock";
import Tabs from "@/lib/ui/Tabs";
import { useState } from "react";

export default function TabsPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});

  const tabs = [
    { id: "tab1", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { id: "tab2", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { id: "tab3", label: "Tab 3", content: <p>Content for Tab 3</p> },
  ];

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Tabs } from '@rajgupta2509/next-gen-builder';\n\nexport default function CustomTabs(){\n  return <div style=${toStyleObjectString(
    vars,
  )}><Tabs items={tabs} /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Tabs
      </h2>

      <div className="space-y-6">
        <div
          style={vars}
          className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6"
        >
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Default
            </p>
            <Tabs items={tabs} />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Pills Variant
            </p>
            <Tabs items={tabs} variant="pills" />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Underline Variant
            </p>
            <Tabs items={tabs} variant="underline" />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Sizes
            </p>
            <div className="space-y-3">
              <Tabs items={tabs} size="sm" />
              <Tabs items={tabs} size="md" />
              <Tabs items={tabs} size="lg" />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <Tabs
              items={tabs}
              theme={{
                primary: "#10b981",
                primary600: "#059669",
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Usage
        </h3>
        <CodeBlock
          code={`import { Tabs } from '@rajgupta2509/next-gen-builder';\n\nconst tabs = [\n  { id: "tab1", label: "Tab 1", content: <p>Content 1</p> },\n  { id: "tab2", label: "Tab 2", content: <p>Content 2</p> },\n];\n\n// Basic usage\n<Tabs items={tabs} />\n\n// Pills variant\n<Tabs items={tabs} variant="pills" />\n\n// Underline variant\n<Tabs items={tabs} variant="underline" />\n\n// Different sizes\n<Tabs items={tabs} size="sm" />\n<Tabs items={tabs} size="md" />\n<Tabs items={tabs} size="lg" />\n\n// Custom theme\n<Tabs \n  items={tabs} \n  theme={{ primary: "#10b981", primary600: "#059669" }}\n/>\n\n// With default tab and onChange\n<Tabs \n  items={tabs} \n  defaultTab="tab2"\n  onChange={(tabId) => console.log(tabId)}\n/>`}
          language="jsx"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Export
        </h3>
        <CodeBlock code={exportCode} language="jsx" />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Props
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Prop</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Default</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 font-mono">items</td>
                <td className="px-4 py-2">TabItem[]</td>
                <td className="px-4 py-2">[]</td>
                <td className="px-4 py-2">Array of tab items</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">defaultTab</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">items[0]?.id</td>
                <td className="px-4 py-2">ID of the default active tab</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2">"default" | "pills" | "underline"</td>
                <td className="px-4 py-2">"default"</td>
                <td className="px-4 py-2">Visual style variant</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">size</td>
                <td className="px-4 py-2">"sm" | "md" | "lg"</td>
                <td className="px-4 py-2">"md"</td>
                <td className="px-4 py-2">Size of the tabs</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onChange</td>
                <td className="px-4 py-2">(tabId: string) void</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Callback when tab changes</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">""</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Custom color theme with primary and primary600
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
