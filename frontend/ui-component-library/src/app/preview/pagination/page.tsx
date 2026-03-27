"use client";
import CodeBlock from "@/components/CodeBlock";
import Pagination from "@/lib/ui/Pagination";
import { useState } from "react";

export default function PaginationPreview() {
  const [vars, setVars] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  function toStyleObjectString(obj: Record<string, string>) {
    const entries = Object.entries(obj).map(([k, v]) => `"${k}": "${v}"`);
    return `{{ ${entries.join(", ")} } as React.CSSProperties}`;
  }

  const exportCode = `import React, { useState } from 'react';\nimport { Pagination } from '@your-scope/newgen-ui';\n\nexport default function CustomPagination(){\n  const [currentPage, setCurrentPage] = useState(1);\n  return <div style=${toStyleObjectString(
    vars
  )}><Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} /></div>\n}`;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Pagination
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Custom Theme
            </p>
            <Pagination
              currentPage={3}
              totalPages={8}
              onPageChange={() => {}}
              theme={{
                primary: "#10b981",
                primary600: "#059669",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dark Theme
            </p>
            <Pagination
              currentPage={5}
              totalPages={12}
              onPageChange={() => {}}
              theme={{
                primary: "#6b7280",
                primary600: "#4b5563",
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
          code={`import { Pagination } from '@your-scope/newgen-ui';\n\n// Basic usage\n<Pagination \n  currentPage={currentPage} \n    totalPages={10} \n  onPageChange={setCurrentPage} \n/>\n\n// Custom theme\n<Pagination \n  currentPage={currentPage} \n  totalPages={10} \n  onPageChange={setCurrentPage}\n  theme={{ primary: "#10b981", primary600: "#059669" }}\n/>\n\n// With state management\nconst [page, setPage] = useState(1);\n\n<Pagination \n  currentPage={page} \n  totalPages={totalPages} \n  onPageChange={(newPage) => {\n    setPage(newPage);\n    // Fetch new data based on page\n  }}\n/>`} 
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
                <td className="px-4 py-2 font-mono">currentPage</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">The current active page number</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">totalPages</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Total number of pages</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onPageChange</td>
                <td className="px-4 py-2">(page: number) void</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">
                  Callback function when page changes
                </td>
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
