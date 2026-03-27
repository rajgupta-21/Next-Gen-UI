"use client";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";

export default function CTAPreview() {
  const [title, setTitle] = useState("Ready to Get Started?");
  const [subtitle, setSubtitle] = useState(
    "Join thousands of happy users building amazing websites",
  );
  const [bgColor, setBgColor] = useState("#007AFF");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const exportCode = `import React from 'react';

export default function CTA() {
  return (
    <div style={{ background: "${bgColor}", color: "${textColor}" }} className="cta p-8 rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-2">${title}</h2>
      <p className="mb-4 opacity-90">${subtitle}</p>
      <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
        Get Started Now
      </button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Call to Action Component
        </h2>

        <div className="space-y-8">
          {/* Preview */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Preview</h3>
            <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
              <div
                style={{ background: bgColor, color: textColor }}
                className="p-8 rounded-lg text-center"
              >
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="mb-4 opacity-90">{subtitle}</p>
                <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>

          {/* Different Styles */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">
              CTA Style Variations
            </h3>
            <div className="space-y-4">
              {[
                { bg: "#007AFF", text: "#FFFFFF", title: "Blue CTA" },
                { bg: "#10B981", text: "#FFFFFF", title: "Green CTA" },
                { bg: "#F59E0B", text: "#FFFFFF", title: "Amber CTA" },
              ].map((style, idx) => (
                <div
                  key={idx}
                  style={{ background: style.bg, color: style.text }}
                  className="p-6 rounded-lg text-center"
                >
                  <h3 className="text-lg font-bold mb-1">{style.title}</h3>
                  <p className="opacity-90 text-sm mb-3">
                    Start your journey today
                  </p>
                  <button
                    style={{ background: style.text, color: style.bg }}
                    className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Customization */}
          {/* <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">🎨 Customize</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Heading
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-lg text-gray-300 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Subtitle
                </label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-lg text-gray-300 text-sm"
                  rows={2}
                />
              </div>
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
            </div>
          </div> */}

          {/* Usage */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">💻 Usage</h3>
            <CodeBlock 
              code={`import { CTA } from '@your-scope/newgen-ui';\n\n// Basic CTA\n<CTA \n  title="Ready to Get Started?"\n  subtitle="Join our community"\n/>\n\n// Custom CTA with colors\n<CTA \n  title="Try for Free"\n  subtitle="No credit card required"\n  bgColor="#10B981"\n  textColor="#FFFFFF"\n/>\n\n// CTA with custom button\n<CTA title="Get Started" subtitle="Join us today">\n  <button>Start Free Trial</button>\n</CTA>`} 
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
                      title
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">Main heading</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      subtitle
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">Subtitle text</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      bgColor
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">#007AFF</td>
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
                      children
                    </td>
                    <td className="px-4 py-3 text-gray-300">React.ReactNode</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">
                      Custom content/button
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
