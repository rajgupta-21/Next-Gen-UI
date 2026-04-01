"use client";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";
import LibNavbar from "../../../lib/ui/Navbar";

export default function NavbarPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});
  const [navLinks, setNavLinks] = useState([
    { id: "1", label: "Home", href: "#" },
    { id: "2", label: "About", href: "#about" },
    { id: "3", label: "Services", href: "#services" },
  ]);
  const [newLink, setNewLink] = useState({ label: "", href: "" });

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React from 'react';\nimport { Navbar } from '@rajgupta2509/next-gen-builder';\n\nexport default function CustomNavbar(){\n  return <div style=${toStyleObjectString(
    vars,
  )}><Navbar /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Navbar
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
            <LibNavbar />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <LibNavbar
              theme={{
                primary: "#10b981",
                primary600: "#059669",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Brand
            </p>
            <LibNavbar
              brand={
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <div>
                    <div className="font-semibold">Custom Brand</div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Usage
        </h3>
        <CodeBlock
          code={`import { Navbar } from '@rajgupta2509/next-gen-builder';\n\n// Basic usage\n<Navbar />\n\n// Custom theme\n<Navbar \n  theme={{ primary: "#10b981", primary600: "#059669" }}\n/>\n\n// Custom brand\n<Navbar \n  brand={\n    <div className="flex items-center gap-3">\n      <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center text-white font-bold">\n        C\n      </div>\n      <div>\n        <div className="font-semibold">Custom Brand</div>\n      </div>\n    </div>\n  }\n/>\n\n// Custom links\n<Navbar \n  links={[\n    { href: "/", label: "Home" },\n    { href: "/about", label: "About" },\n  ]}\n/>`}
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
                <td className="px-4 py-2 font-mono">brand</td>
                <td className="px-4 py-2">React.ReactNode</td>
                <td className="px-4 py-2">Default brand element</td>
                <td className="px-4 py-2">Custom brand/logo component</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">links</td>
                <td className="px-4 py-2">
                  Array of {`{ href: string; label: string }`}
                </td>
                <td className="px-4 py-2">Default links array</td>
                <td className="px-4 py-2">Navigation links</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">theme</td>
                <td className="px-4 py-2">object</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Custom color theme with primary and primary600
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
