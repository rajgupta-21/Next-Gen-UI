"use client";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";

export default function FooterPreview() {
  const [bgColor, setBgColor] = useState("#1F2937");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [copyright, setCopyright] = useState(
    "© 2024 Your Company. All rights reserved.",
  );

  const exportCode = `import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: "${bgColor}", color: "${textColor}" }} className="footer">
      <div className="footer-content" style={{ padding: "2rem" }}>
        <p>${copyright}</p>
      </div>
    </footer>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Footer Component
        </h2>

        <div className="space-y-8">
          {/* Default Footer */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">
              Default Footer
            </h3>
            <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
              <footer
                style={{ background: bgColor, color: textColor }}
                className="p-8 rounded-lg text-center"
              >
                <p className="mb-2">{copyright}</p>
                <p className="text-sm opacity-75">
                  Built with NewGen UI Component Library
                </p>
              </footer>
            </div>
          </div>

          {/* Customization */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">🎨 Customize</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Background Color
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer border border-indigo-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer border border-indigo-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Copyright Text
                </label>
                <textarea
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-lg text-gray-300 text-sm"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">💻 Usage</h3>
            <CodeBlock
              code={`import { Footer } from '@rajgupta2509/next-gen-builder';\n\n// Basic usage\n<Footer />\n\n// Custom footer\n<Footer \n  bgColor="#1F2937"\n  textColor="#FFFFFF"\n  copyright="© 2024 Your Company"\n/>\n\n// With multiple columns\n<Footer>\n  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>\n    <div>\n      <h4>Product</h4>\n      <ul>\n        <li><a href="#">Features</a></li>\n        <li><a href="#">Pricing</a></li>\n      </ul>\n    </div>\n    <div>\n      <h4>Company</h4>\n      <ul>\n        <li><a href="#">About</a></li>\n        <li><a href="#">Blog</a></li>\n      </ul>\n    </div>\n    <div>\n      <h4>Legal</h4>\n      <ul>\n        <li><a href="#">Privacy</a></li>\n        <li><a href="#">Terms</a></li>\n      </ul>\n    </div>\n  </div>\n</Footer>`}
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
                      bgColor
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">#1F2937</td>
                    <td className="px-4 py-3 text-gray-300">
                      Background color
                    </td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      textColor
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">#FFFFFF</td>
                    <td className="px-4 py-3 text-gray-300">Text color</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      copyright
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">© 2024</td>
                    <td className="px-4 py-3 text-gray-300">Copyright text</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      children
                    </td>
                    <td className="px-4 py-3 text-gray-300">React.ReactNode</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">
                      Custom footer content
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Export */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-green-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">
              📤 Export Code
            </h3>
            <CodeBlock code={exportCode} language="jsx" />
          </div>
        </div>
      </div>
    </div>
  );
}
