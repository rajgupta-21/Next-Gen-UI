// Preview Component with Examples
"use client";
import CodeBlock from "@/components/CodeBlock";
import Tabs, { TabItem } from "@/lib/ui/Tabs";
import { useState } from "react";
function TabsPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});

  const tabItems: TabItem[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Overview</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to the overview section. This is where you will find a summary
            of your dashboard and key metrics.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Total users: 1,234</li>
            <li>Active sessions: 567</li>
            <li>Revenue: $12,345</li>
          </ul>
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Analytics</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            View detailed analytics and insights about your application
            performance.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Page Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45.2K</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">32%</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3m 24s</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Reports</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Generate and download comprehensive reports for your data.
          </p>
          <button className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90">
            Download Report
          </button>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Settings</h4>
          <p className="text-gray-600 dark:text-gray-300">
            Configure your application settings and preferences.
          </p>
        </div>
      ),
    },
    {
      id: "disabled",
      label: "Disabled",
      content: <div className="text-gray-600 dark:text-gray-400">This tab is disabled</div>,
      disabled: true,
    },
  ];

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Tabs } from '@your-scope/newgen-ui';\n\nexport default function CustomTabs(){\n  const items = [\n    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },\n    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },\n  ];\n  return <div style=${toStyleObjectString(
    vars,
  )}><Tabs items={items} /></div>\n}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Tabs Component
        </h2>

        <div className="space-y-8">
          {/* Default Variant */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Default Variant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Classic tabs with default styling
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <Tabs items={tabItems} variant="default" />
            </div>
          </div>

          {/* Pills Variant */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pills Variant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Pill-shaped tab buttons
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <Tabs items={tabItems} variant="pills" />
            </div>
          </div>

          {/* Underline Variant */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Underline Variant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Minimalist underline style
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <Tabs items={tabItems} variant="underline" />
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Different Sizes
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Small, Medium, and Large tab sizes
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold">
                  Small
                </p>
                <Tabs items={tabItems.slice(0, 3)} variant="pills" size="sm" />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold">
                  Medium
                </p>
                <Tabs items={tabItems.slice(0, 3)} variant="pills" size="md" />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold">
                  Large
                </p>
                <Tabs items={tabItems.slice(0, 3)} variant="pills" size="lg" />
              </div>
            </div>
          </div>

          {/* Custom Theme */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Custom Theme</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Tabs with custom color theme
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <Tabs
                items={tabItems.slice(0, 3)}
                variant="default"
                theme={{
                  primary: "#10b981",
                  primary600: "#059669",
                }}
              />
            </div>
          </div>

          {/* Theme Customization */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-xl">
              Customize Theme
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                  Primary Color
                </label>
                <input
                  type="color"
                  defaultValue="#3b82f6"
                  onChange={(e) =>
                    setVars((prev) => ({
                      ...prev,
                      "--primary": e.target.value,
                    }))
                  }
                  className="w-full h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                  Primary 600
                </label>
                <input
                  type="color"
                  defaultValue="#2563eb"
                  onChange={(e) =>
                    setVars((prev) => ({
                      ...prev,
                      "--primary-600": e.target.value,
                    }))
                  }
                  className="w-full h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Usage</h3>
            <CodeBlock 
              code={`import { Tabs } from '@your-scope/newgen-ui';\n\nconst items = [\n  {\n    id: 'tab1',\n    label: 'Tab 1',\n    content: <div>Content for tab 1</div>\n  },\n  {\n    id: 'tab2',\n    label: 'Tab 2',\n    content: <div>Content for tab 2</div>\n  },\n  {\n    id: 'tab3',\n    label: 'Disabled',\n    content: <div>Content for tab 3</div>,\n    disabled: true\n  }\n];\n\n// Basic usage\n<Tabs items={items} />\n\n// With variant\n<Tabs items={items} variant="pills" />\n<Tabs items={items} variant="underline" />\n\n// With size\n<Tabs items={items} size="sm" />\n<Tabs items={items} size="lg" />\n\n// With custom theme\n<Tabs\n  items={items}\n  theme={{ primary: "#10b981", primary600: "#059669" }}\n/>\n\n// With onChange handler\n<Tabs\n  items={items}\n  onChange={(tabId) => console.log(tabId)}\n/>`} 
              language="jsx" 
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Export</h3>
          <CodeBlock code={exportCode} language="jsx" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                    Prop
                  </th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                    Default
                  </th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">items</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">TabItem[]</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">-</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Array of tab items
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                    defaultTab
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">string</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">first tab id</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Initially active tab
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                    variant
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    "default" | "pills" | "underline"
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">"default"</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Visual style variant
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">size</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    "sm" | "md" | "lg"
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">"md"</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of tabs</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                    onChange
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    (tabId: string) =&gt; void
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">-</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Callback when tab changes
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">theme</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">object</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">-</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Custom color theme
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">TabItem Interface</h4>
            <CodeBlock 
              code={`type TabItem = {\n  id: string;\n  label: string;\n  content: React.ReactNode;\n  disabled?: boolean;\n}`} 
              language="typescript" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabsPreview;
