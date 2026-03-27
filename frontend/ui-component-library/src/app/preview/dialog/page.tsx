"use client";
import CodeBlock from "@/components/CodeBlock";
import Dialog from "@/lib/ui/Dialog";
import { useState } from "react";

export default function DialogPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [openDark, setOpenDark] = useState(false);

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React, { useState } from 'react';\nimport { Dialog } from '@your-scope/newgen-ui';\n\nexport default function CustomDialog(){\n  const [open, setOpen] = useState(false);\n  return (\n    <div style=${toStyleObjectString(
    vars
  )}>\n      <button onClick={() => setOpen(true)}>Open Dialog</button>\n      <Dialog open={open} onClose={() => setOpen(false)} title="Custom Dialog">\n        <p>Your dialog content here.</p>\n      </Dialog>\n    </div>\n  );\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Dialog
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
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Open Dialog
            </button>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              title="Dialog Title"
            >
              <p className="text-gray-700 dark:text-gray-300">
                This is a default dialog. You can customize its appearance using
                the theme options below.
              </p>
            </Dialog>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <button
              onClick={() => setOpenCustom(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Open Custom Dialog
            </button>
            <Dialog
              open={openCustom}
              onClose={() => setOpenCustom(false)}
              title="Custom Dialog"
              theme={{
                primary: "#10b981",
                primary600: "#059669",
                background: "#f0fdf4",
              }}
            >
              <p className="text-gray-700 dark:text-gray-300">
                This dialog uses a custom green theme.
              </p>
            </Dialog>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dark Theme
            </p>
            <button
              onClick={() => setOpenDark(true)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Open Dark Dialog
            </button>
            <Dialog
              open={openDark}
              onClose={() => setOpenDark(false)}
              title="Dark Dialog"
              theme={{
                primary: "#374151",
                primary600: "#1f2937",
                background: "#1f2937",
              }}
            >
              <p className="text-white">This dialog uses a dark theme.</p>
            </Dialog>
          </div>
        </div>

        {/* <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Customize Theme
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Primary Color
              </label>
              <input
                type="color"
                defaultValue="#3b82f6"
                onChange={(e) =>
                  setVars((prev) => ({ ...prev, "--primary": e.target.value }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
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
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
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
                    "--dialog-bg": e.target.value,
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
                    "--dialog-text": e.target.value,
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
          code={`import { Dialog } from '@your-scope/newgen-ui';\n\n// Basic usage\n<Dialog open={isOpen} onClose={() => setIsOpen(false)} title="Dialog Title">\n  <p>Your content here.</p>\n</Dialog>\n\n// Custom theme\n<Dialog \n  open={isOpen} \n  onClose={() => setIsOpen(false)} \n  title="Custom Dialog"\n  theme={{\n    primary: "#10b981",\n    primary600: "#059669",\n    background: "#f0fdf4"\n  }}\n>\n  <p>Custom themed content.</p>\n</Dialog>\n\n// Without title\n<Dialog open={isOpen} onClose={() => setIsOpen(false)}>\n  <p>Content without a title.</p>\n</Dialog>`} 
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
                <td className="px-4 py-2 font-mono">open</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Controls whether the dialog is visible
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onClose</td>
                <td className="px-4 py-2">() void</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Function called when the dialog should close
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">title</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Optional title for the dialog</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">children</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Content to display inside the dialog
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Custom color theme with primary, primary600, accent, and
                  background
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
