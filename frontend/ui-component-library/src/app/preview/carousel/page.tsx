"use client";
import CodeBlock from "@/components/CodeBlock";
import Carousel from "@/lib/ui/Carousel";
import { useState } from "react";

export default function CarouselPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});

  const slides = [
    <div className="h-48 flex items-center justify-center bg-red-300 text-white text-2xl rounded-xl">
      Slide 1
    </div>,
    <div className="h-48 flex items-center justify-center bg-green-300 text-white text-2xl rounded-xl">
      Slide 2
    </div>,
    <div className="h-48 flex items-center justify-center bg-blue-300 text-white text-2xl rounded-xl">
      Slide 3
    </div>,
  ];

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Carousel } from '@your-scope/newgen-ui';\n\nexport default function CustomCarousel(){\n  const slides = [\n    <div>Slide 1</div>,\n    <div>Slide 2</div>,\n    <div>Slide 3</div>\n  ];\n  return <div style=${toStyleObjectString(
    vars
  )}><Carousel slides={slides} /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Carousel
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
            <Carousel slides={slides} />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <Carousel
              slides={slides}
              theme={{
                background: "#f0f9ff",
                indicator: "#10b981",
                inactiveIndicator: "#d1d5db",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dark Theme
            </p>
            <Carousel
              slides={slides}
              theme={{
                background: "#1f2937",
                indicator: "#f59e0b",
                inactiveIndicator: "#6b7280",
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
                defaultValue="#f3f3f3"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--carousel-bg": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Active Indicator Color
              </label>
              <input
                type="color"
                defaultValue="#7C3AED"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--carousel-indicator": e.target.value,
                  }))
                }
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Inactive Indicator Color
              </label>
              <input
                type="color"
                defaultValue="#999999"
                onChange={(e) =>
                  setVars((prev) => ({
                    ...prev,
                    "--carousel-inactive-indicator": e.target.value,
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
          code={`import { Carousel } from '@your-scope/newgen-ui';\n\nconst slides = [\n  <div className="h-48 flex items-center justify-center bg-red-300">Slide 1</div>,\n  <div className="h-48 flex items-center justify-center bg-green-300">Slide 2</div>,\n  <div className="h-48 flex items-center justify-center bg-blue-300">Slide 3</div>\n];\n\n// Basic usage\n<Carousel slides={slides} />\n\n// Custom theme\n<Carousel \n  slides={slides} \n  theme={{\n    background: "#f0f9ff",\n    indicator: "#10b981",\n    inactiveIndicator: "#d1d5db"\n  }}\n/>\n\n// With custom slides\nconst customSlides = [\n  <img src="image1.jpg" alt="Slide 1" />,\n  <img src="image2.jpg" alt="Slide 2" />,\n  <img src="image3.jpg" alt="Slide 3" />\n];\n\n<Carousel slides={customSlides} />`} 
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
                <td className="px-4 py-2 font-mono">slides</td>
                <td className="px-4 py-2">React.ReactNode[]</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Array of slide components</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Custom color theme with background, indicator, and
                  inactiveIndicator
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
