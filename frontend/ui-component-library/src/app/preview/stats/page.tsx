"use client";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";

export default function StatsPreview() {
  const [stats, setStats] = useState([
    { id: 1, value: "150K", label: "Happy Users" },
    { id: 2, value: "98%", label: "Satisfaction" },
    { id: 3, value: "50M+", label: "Components Built" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Stats Display Component
        </h2>

        <div className="space-y-8">
          {/* Default Stats */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Stats Grid</h3>
            <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
                  >
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Different Layouts */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">
              Layout Variations
            </h3>
            <div className="space-y-6">
              {/* Row Layout */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Horizontal Layout</p>
                <div className="flex gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center"
                    >
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Display */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Large Display</p>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-lg text-center text-white">
                  <p className="text-5xl font-bold mb-2">150K+</p>
                  <p className="text-xl">Happy Users Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">🎨 Edit Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="p-4 bg-slate-900/50 border border-indigo-500/30 rounded-lg"
                >
                  <p className="text-xs text-gray-400 mb-2">Stat {idx + 1}</p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) =>
                        setStats(
                          stats.map((s) =>
                            s.id === stat.id
                              ? { ...s, value: e.target.value }
                              : s,
                          ),
                        )
                      }
                      placeholder="Value"
                      className="flex-1 px-2 py-1 bg-slate-800 border border-indigo-500/30 rounded text-gray-300 text-sm"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) =>
                        setStats(
                          stats.map((s) =>
                            s.id === stat.id
                              ? { ...s, label: e.target.value }
                              : s,
                          ),
                        )
                      }
                      placeholder="Label"
                      className="flex-1 px-2 py-1 bg-slate-800 border border-indigo-500/30 rounded text-gray-300 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">💻 Usage</h3>
            <CodeBlock
              code={`import { Stats } from '@rajgupta2509/next-gen-builder';\n\n// Single stat\n<Stats value="150K" label="Happy Users" />\n\n// Stats grid\n<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>\n  <Stats value="150K" label="Happy Users" />\n  <Stats value="98%" label="Satisfaction" />\n  <Stats value="50M+" label="Components Built" />\n</div>\n\n// Custom styling\n<Stats \n  value="150K+" \n  label="Happy Users"\n  style={{ padding: '2rem', backgroundColor: '#f0f9ff' }}\n/>`}
              language="jsx"
            />
          </div>

          {/* Props */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-cyan-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">⚙️ Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-cyan-500/30 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-cyan-600 to-blue-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-semibold">
                      Prop
                    </th>
                    <th className="px-4 py-3 text-left text-white font-semibold">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-white font-semibold">
                      Default
                    </th>
                    <th className="px-4 py-3 text-left text-white font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/20">
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      value
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">Metric value</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      label
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">Stat label</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      style
                    </td>
                    <td className="px-4 py-3 text-gray-300">CSSProperties</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">Custom styles</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      className
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">""</td>
                    <td className="px-4 py-3 text-gray-300">CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
