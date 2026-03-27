// Preview Component
"use client";
import CodeBlock from "@/components/CodeBlock";
import Progress from "@/lib/ui/Progress";
import React from "react";
function ProgressPreview() {
  const [value, setValue] = React.useState(65);
  const [vars, setVars] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Progress } from '@your-scope/newgen-ui';\n\nexport default function CustomProgress(){\n  return <div style=${toStyleObjectString(
    vars
  )}><Progress value={65} showLabel /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Progress Bar
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
            <Progress value={value} showLabel />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Gradient
            </p>
            <Progress value={value} variant="gradient" showLabel />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Striped Animated
            </p>
            <Progress value={value} variant="striped" animated showLabel />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Sizes
            </p>
            <div className="space-y-3">
              <Progress value={value} size="sm" />
              <Progress value={value} size="md" />
              <Progress value={value} size="lg" />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <Progress
              value={value}
              variant="gradient"
              showLabel
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
          code={`import { Progress } from '@your-scope/newgen-ui';\n\n// Basic usage\n<Progress value={65} />\n\n// With label\n<Progress value={65} showLabel />\n\n// Gradient variant\n<Progress value={65} variant="gradient" showLabel />\n\n// Striped and animated\n<Progress value={65} variant="striped" animated showLabel />\n\n// Different sizes\n<Progress value={65} size="sm" />\n<Progress value={65} size="md" />\n<Progress value={65} size="lg" />\n\n// Custom theme\n<Progress \n  value={65} \n  variant="gradient"\n  theme={{ primary: "#10b981", primary600: "#059669" }}\n  showLabel \n/>`} 
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
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Current progress value</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">max</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">Maximum value</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">size</td>
                <td className="px-4 py-2">"sm" | "md" | "lg"</td>
                <td className="px-4 py-2">"md"</td>
                <td className="px-4 py-2">Size of the progress bar</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2">
                  "default" | "gradient" | "striped"
                </td>
                <td className="px-4 py-2">"default"</td>
                <td className="px-4 py-2">Visual style variant</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">showLabel</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Show percentage label</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">animated</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Animate striped variant</td>
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

export default ProgressPreview;
