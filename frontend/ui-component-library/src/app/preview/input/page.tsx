"use client";
import CodeBlock from "@/components/CodeBlock";
import Input from "@/lib/ui/Input";
import { useState } from "react";

export default function InputPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});
  const [value, setValue] = useState("");

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React, { useState } from 'react';\nimport { Input } from '@your-scope/newgen-ui';\n\nexport default function CustomInput(){\n  const [value, setValue] = useState('');\n  return <div style=${toStyleObjectString(
    vars
  )}><Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter text..." /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Input
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
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter text..."
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Custom themed input..."
              theme={{
                background: "#f8f9fa",
                text: "#495057",
                border: "#10b981",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dark Theme
            </p>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Dark themed input..."
              theme={{
                background: "#1f2937",
                text: "#ffffff",
                border: "#6b7280",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Different Types
            </p>
            <div className="space-y-2 ">
              <Input type="email" placeholder="Email" />
            </div>
            <div className="space-y-2">
              {" "}
              <Input type="password" placeholder="Password" />
              <Input type="number" placeholder="Number" />
            </div>
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
                  setVars((prev) => ({ ...prev, "--input-bg": e.target.value }))
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
                    "--input-text": e.target.value,
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
                defaultValue="#d1d5db"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--input-border": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Primary Color (Focus)
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
          code={`import { Input } from '@your-scope/newgen-ui';\n\n// Basic usage\n<Input \n  value={value} \n  onChange={(e) => setValue(e.target.value)} \n  placeholder="Enter text..." \n/>\n\n// Custom theme\n<Input \n  value={value} \n  onChange={(e) => setValue(e.target.value)} \n  placeholder="Custom input..."\n  theme={{\n    background: "#f8f9fa",\n    text: "#495057",\n    border: "#10b981"\n  }}\n/>\n\n// Different types\n<Input type="email" placeholder="Email" />\n<Input type="password" placeholder="Password" />\n<Input type="number" placeholder="Number" />\n\n// With validation\n<Input \n  type="email" \n  required \n  placeholder="Email" \n  className="w-full" \n/>`} 
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
                <td className="px-4 py-2 font-mono">value</td>
                <td className="px-4 py-2">string | number</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">The value of the input</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onChange</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Callback when input value changes</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">placeholder</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Placeholder text</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">type</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">"text"</td>
                <td className="px-4 py-2">
                  Input type (text, email, password, etc.)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Custom color theme with background, text, border, and primary
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">""</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">...rest</td>
                <td className="px-4 py-2">InputHTMLAttributes</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Other standard input attributes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
