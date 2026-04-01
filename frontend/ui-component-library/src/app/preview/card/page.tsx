// Preview Component
"use client";
import CodeBlock from "@/components/CodeBlock";
import Card from "@/lib/ui/Card";
import React from "react";
function CardPreview() {
  const [vars, setVars] = React.useState<Record<string, string>>({});

  // Convert hex to RGB for CSS variables
  function hexToRgb(hex: string): string {
    const h = hex.replace(/^#/, "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const num = parseInt(full, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  }

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Card } from '@rajgupta2509/next-gen-builder';\n\nexport default function CustomCard(){\n  return <div style=${toStyleObjectString(
    vars,
  )}><Card title="Card Title">Card content here</Card></div>\n}`;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Card Component
      </h2>

      <div className="space-y-6">
        <div
          style={vars}
          className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6 bg-white dark:bg-gray-800"
        >
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Default Variant
            </p>
            <Card
              title="Default Card"
              description="This is a default card with a simple border"
            >
              <p>Card content goes here. This is the main body of the card.</p>
            </Card>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Bordered Variant (Changes with color picker)
            </p>
            <Card
              variant="bordered"
              title="Bordered Card"
              description="This card border color changes with the color picker"
            >
              <p>The border uses the primary color from customization.</p>
            </Card>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Elevated Variant (Changes with color picker)
            </p>
            <Card
              variant="elevated"
              title="Elevated Card"
              description="Shadow color adapts to your theme"
            >
              <p>Shadow uses the primary color for a cohesive look.</p>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Glass Variant (Changes with color picker)
            </p>
            <Card
              variant="glass"
              title="Glass Card"
              description="Background tint adapts to your theme"
            >
              <p>Best viewed over colorful backgrounds.</p>
            </Card>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              With Footer
            </p>
            <Card
              title="Card with Footer"
              description="This card includes a footer section"
              footer="Last updated: October 2025"
            >
              <p>The footer is useful for metadata or actions.</p>
            </Card>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Custom Theme (Fixed colors via theme prop)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                variant="elevated"
                title="Green Theme"
                description="Custom themed card"
                theme={{
                  primary: "#10b981",
                }}
              >
                <p>This card uses a fixed green theme.</p>
              </Card>
              <Card
                variant="bordered"
                title="Purple Theme"
                description="Another custom theme"
                theme={{
                  primary: "#8b5cf6",
                }}
              >
                <p>This card uses a fixed purple theme.</p>
              </Card>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Interactive Card
            </p>
            <Card
              variant="elevated"
              title="Clickable Card"
              description="Cards can be interactive"
              className="cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => alert("Card clicked!")}
            >
              <p>Click me to see an interaction!</p>
            </Card>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Complex Content
            </p>
            <Card
              title="Product Card"
              description="Example with structured content"
              footer={
                <div className="flex justify-between items-center">
                  <span>$99.99</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs">
                    Add to Cart
                  </button>
                </div>
              }
            >
              <div className="space-y-2">
                <p className="text-sm">
                  Premium quality product with excellent features.
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Feature one</li>
                  <li>Feature two</li>
                  <li>Feature three</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Customize Theme
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            These colors will affect bordered, elevated, and glass variants
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Primary Color
              </label>
              <input
                type="color"
                defaultValue="#3b82f6"
                onChange={(e) => {
                  const rgb = hexToRgb(e.target.value);
                  setVars((prev) => ({
                    ...prev,
                    "--primary": e.target.value,
                    "--primary-rgb": rgb,
                  }));
                }}
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
          code={`import { Card } from '@rajgupta2509/next-gen-builder';

// Basic usage
<Card title="Card Title">
  Card content here
</Card>

// With description
<Card
  title="Card Title"
  description="This is a description"
>
  Card content here
</Card>

// With footer
<Card
  title="Card Title"
  footer="Footer content"
>
  Card content here
</Card>

// Variants
<Card variant="default" title="Default">Content</Card>
<Card variant="bordered" title="Bordered">Content</Card>
<Card variant="elevated" title="Elevated">Content</Card>
<Card variant="glass" title="Glass">Content</Card>

// Custom theme (fixed colors)
<Card
  variant="elevated"
  title="Custom Theme"
  theme={{ primary: "#10b981" }}
>
  Content
</Card>

// With CSS variables (for dynamic theming)
<div style={{ "--primary": "#10b981", "--primary-rgb": "16, 185, 129" }}>
  <Card variant="bordered" title="Themed">Content</Card>
</div>

// Interactive
<Card
  title="Clickable"
  className="cursor-pointer hover:scale-[1.02]"
  onClick={() => console.log('Clicked')}
>
  Click me!
</Card>`}
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
                <td className="px-4 py-2 font-mono">title</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Card title/heading</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">description</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Card description/subtitle</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">footer</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Card footer content</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2">
                  "default" | "bordered" | "elevated" | "glass"
                </td>
                <td className="px-4 py-2">"default"</td>
                <td className="px-4 py-2">Visual style variant</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Custom fixed color theme</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">children</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Main card content</td>
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

export default CardPreview;
