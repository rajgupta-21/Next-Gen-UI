"use client";
import CodeBlock from "@/components/CodeBlock";
import Button from "@/lib/ui/Button";
import React from "react";
function ButtonPreview() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [vars, setVars] = React.useState<Record<string, string>>({});

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Button } from '@your-scope/newgen-ui';\n\nexport default function CustomButton(){\n  return <div style=${toStyleObjectString(
    vars,
  )}><Button variant="solid">Click me</Button></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-black dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Button Component
      </h2>

      <div className="space-y-6">
        <div
          style={vars}
          className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6"
        >
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Variants
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="gradient">Gradient</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Sizes
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              With Icons
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                leftIcon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                Add Item
              </Button>
              <Button
                variant="outline"
                rightIcon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                }
              >
                Next
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              States
            </p>
            <div className="flex flex-wrap gap-3">
              <Button isLoading={isLoading} onClick={handleLoadingClick}>
                {isLoading ? "Loading..." : "Click to Load"}
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Custom Theme
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="solid"
                theme={{
                  primary: "#10b981",
                  primary600: "#059669",
                }}
              >
                Green Solid
              </Button>
              <Button
                variant="gradient"
                theme={{
                  primary: "#f59e0b",
                  primary600: "#d97706",
                }}
              >
                Orange Gradient
              </Button>
              <Button
                variant="outline"
                theme={{
                  primary: "#8b5cf6",
                }}
              >
                Purple Outline
              </Button>
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
          </div>
        </div> */}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Usage
        </h3>
        <CodeBlock
          code={`import { Button } from '@your-scope/newgen-ui';\n\n// Basic usage\n<Button>Click me</Button>\n\n// Variants\n<Button variant="solid">Solid</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="gradient">Gradient</Button>\n\n// Sizes\n<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n\n// With icons\n<Button leftIcon={<Icon />}>Add Item</Button>\n<Button rightIcon={<Icon />}>Next</Button>\n\n// States\n<Button isLoading>Loading...</Button>\n<Button disabled>Disabled</Button>\n\n// Custom theme\n<Button \n  variant="gradient"\n  theme={{ primary: "#10b981", primary600: "#059669" }}\n>\n  Custom Color\n</Button>`}
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
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2">
                  "solid" | "outline" | "ghost" | "gradient"
                </td>
                <td className="px-4 py-2">"solid"</td>
                <td className="px-4 py-2">Visual style variant</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">size</td>
                <td className="px-4 py-2">"sm" | "md" | "lg"</td>
                <td className="px-4 py-2">"md"</td>
                <td className="px-4 py-2">Size of the button</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">isLoading</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Show loading spinner</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">leftIcon</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Icon on the left side</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">rightIcon</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Icon on the right side</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">disabled</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Disable the button</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Custom color theme</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ButtonPreview;
