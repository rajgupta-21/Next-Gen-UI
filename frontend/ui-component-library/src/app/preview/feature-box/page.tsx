"use client";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";

export default function FeatureBoxPreview() {
  const [icon, setIcon] = useState("✨");
  const [title, setTitle] = useState("Amazing Features");
  const [description, setDescription] = useState(
    "Build powerful websites with our intuitive drag-and-drop builder",
  );

  const exportCode = `import React from 'react';

export default function FeatureBox() {
  return (
    <div className="feature-box p-6 rounded-lg bg-gray-50 text-center">
      <div className="feature-icon text-4xl mb-3">${icon}</div>
      <h3 className="feature-title font-bold text-lg mb-2">${title}</h3>
      <p className="feature-description text-sm text-gray-600">${description}</p>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Feature Box Component
        </h2>

        <div className="space-y-8">
          {/* Preview */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Preview</h3>
            <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Multiple Examples Grid */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">
              Feature Boxes Grid
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🚀",
                  title: "Fast",
                  desc: "Lightning quick performance",
                },
                {
                  icon: "🎨",
                  title: "Design",
                  desc: "Beautiful UI components",
                },
                {
                  icon: "🔒",
                  title: "Secure",
                  desc: "Enterprise-grade security",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">🎨 Customize</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Icon/Emoji
                </label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  maxLength={2}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-lg text-gray-300 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Title
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
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              code={`import { FeatureBox } from '@your-scope/newgen-ui';\n\n// Single feature box\n<FeatureBox \n  icon="✨"\n  title="Amazing Features"\n  description="Build powerful websites"\n/>\n\n// Feature grid\n<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>\n  <FeatureBox icon="🚀" title="Fast" description="Quick performance" />\n  <FeatureBox icon="🎨" title="Design" description="Beautiful UI" />\n  <FeatureBox icon="🔒" title="Secure" description="Enterprise security" />\n</div>`} 
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
                      icon
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">✨</td>
                    <td className="px-4 py-3 text-gray-300">Icon or emoji</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      title
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">Feature</td>
                    <td className="px-4 py-3 text-gray-300">Feature title</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      description
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">
                      Feature description
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
