"use client";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";

export default function TestimonialPreview() {
  const [name, setName] = useState("Sarah Johnson");
  const [title, setTitle] = useState("Product Manager at Tech Corp");
  const [content, setContent] = useState(
    "This product has completely transformed how we manage our projects. Highly recommend!",
  );
  const [bgColor, setBgColor] = useState("#F9FAFB");

  const exportCode = `import React from 'react';

export default function Testimonial() {
  return (
    <div style={{ background: "${bgColor}" }} className="testimonial p-6 rounded-lg border-l-4 border-blue-500">
      <p className="text-gray-700 italic mb-4">
        "${content}"
      </p>
      <p className="font-semibold text-gray-900">${name}</p>
      <p className="text-sm text-gray-500">${title}</p>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Testimonial Component
        </h2>

        <div className="space-y-8">
          {/* Preview */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Preview</h3>
            <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
              <div
                style={{ background: bgColor }}
                className="p-6 rounded-lg border-l-4 border-blue-500"
              >
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{content}"
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {title}
                </p>
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">🎨 Customize</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Testimonial Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-lg text-gray-300 text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-lg text-gray-300 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Title/Role
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
                  Background Color
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer border border-indigo-500/30"
                />
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">💻 Usage</h3>
            <CodeBlock 
              code={`import { Testimonial } from '@your-scope/newgen-ui';\n\n// Basic usage\n<Testimonial \n  name="John Doe"\n  title="CEO at Company"\n  content="Great product!"\n/>\n\n// With custom background\n<Testimonial \n  name="Sarah Johnson"\n  title="Product Manager"\n  content="This transformed our workflow"\n  bgColor="#F9FAFB"\n/>\n\n// Multiple testimonials in grid\n<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>\n  <Testimonial name="User 1" title="Role 1" content="Feedback 1" />\n  <Testimonial name="User 2" title="Role 2" content="Feedback 2" />\n  <Testimonial name="User 3" title="Role 3" content="Feedback 3" />\n</div>`} 
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
                      name
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">Customer name</td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      title
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">
                      Customer role/title
                    </td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      content
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-gray-300">
                      Testimonial text
                    </td>
                  </tr>
                  <tr className="hover:bg-cyan-600/20">
                    <td className="px-4 py-3 font-mono text-purple-300">
                      bgColor
                    </td>
                    <td className="px-4 py-3 text-gray-300">string</td>
                    <td className="px-4 py-3 text-gray-400">#F9FAFB</td>
                    <td className="px-4 py-3 text-gray-300">
                      Background color
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
