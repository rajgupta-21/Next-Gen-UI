"use client";
import CodeBlock from "@/components/CodeBlock";
import Dropdown from "@/lib/ui/Dropdown";
import { useState } from "react";

export default function DropdownPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});

  const items = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Dropdown } from '@your-scope/newgen-ui';\n\nexport default function CustomDropdown(){\n  return <div style=${toStyleObjectString(
    vars
  )}><Dropdown label="Select an Option" items={items} /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Dropdown
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
            <Dropdown label="Select an Option" items={items} />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <Dropdown
              label="Select an Option"
              items={items}
              theme={{
                background: "#f8f9fa",
                text: "#495057",
                border: "#10b981",
                hover: "#d1ecf1",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dark Theme
            </p>
            <Dropdown
              label="Select an Option"
              items={items}
              theme={{
                background: "#343a40",
                text: "#ffffff",
                border: "#6c757d",
                hover: "#495057",
              }}
            />
          </div>
        </div>

        {/* <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Customize Theme
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Background Color
              </label>
              <input
                type="color"
                defaultValue="#ffffff"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--dropdown-bg": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Text Color
              </label>
              <input
                type="color"
                defaultValue="#111111"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--dropdown-text": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Border Color
              </label>
              <input
                type="color"
                defaultValue="#cccccc"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--dropdown-border": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Hover Color
              </label>
              <input
                type="color"
                defaultValue="#f0f0f0"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--dropdown-hover": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>
        </div> */}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Usage
        </h3>
        <CodeBlock 
          code={`import { Dropdown } from '@your-scope/newgen-ui';\n\nconst items = [\n  { label: "Option 1", value: "1" },\n  { label: "Option 2", value: "2" },\n  { label: "Option 3", value: "3" }\n];\n\n// Basic usage\n<Dropdown label="Select an Option" items={items} />\n\n// Custom theme\n<Dropdown \n  label="Select an Option" \n  items={items} \n  theme={{\n    background: "#f8f9fa",\n    text: "#495057",\n    border: "#10b981",\n    hover: "#d1ecf1"\n  }}\n/>\n\n// With onClick handlers\nconst itemsWithClick = [\n  { label: "Option 1", value: "1", onClick: () => console.log("Option 1 selected") },\n  { label: "Option 2", value: "2", onClick: () => console.log("Option 2 selected") },\n];\n\n<Dropdown label="Select an Option" items={itemsWithClick} />`} 
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
                <td className="px-4 py-2 font-mono">label</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  The label text for the dropdown button
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">items</td>
                <td className="px-4 py-2">DropdownItem[]</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Array of dropdown items</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Custom color theme with background, text, border, and hover
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">""</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
