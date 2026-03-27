"use client";
import { Code2, Layout, Palette, Sparkles, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import { Button, Card } from "../lib/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section className="min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-start gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-900 dark:bg-gray-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
                AI-Powered Component Generation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white">
              Build Beautiful UIs at Lightning Speed
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
              NewGen UI combines a powerful React component library with
              AI-powered generation and visual website builder. Create
              production-ready components from natural language, customize with
              our theming system, and build entire websites with drag-and-drop.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/generative-ai"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Try AI Generator
              </Link>
              <Link
                href="/website-builder"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2"
              >
                <Layout className="w-5 h-5" />
                Website Builder
              </Link>
              <Link
                href="/components"
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold"
              >
                Browse Components
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  15+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Components
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  100%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customizable
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ∞
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Possibilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Three pillars */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            Complete Development Suite
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-12 text-lg text-center mx-auto">
            Everything you need to build modern, scalable design systems with
            minimal effort.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Component Library */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-900 dark:bg-gray-100">
                  <Code2 className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Component Library
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                15+ production-ready React components with full TypeScript
                support, extensive customization, and theme integration. All
                components follow accessibility best practices.
              </p>
              <Link
                href="/components"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-semibold inline-flex items-center gap-2"
              >
                Explore →
              </Link>
            </div>

            {/* AI Generator */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-900 dark:bg-gray-100">
                  <Wand2 className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    AI Generator
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Generate production-ready React components from natural language
                descriptions. Live preview with Sandpack, history tracking, and
                instant code export. Perfect for rapid prototyping.
              </p>
              <Link
                href="/generative-ai"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-semibold inline-flex items-center gap-2"
              >
                Generate →
              </Link>
            </div>

            {/* Website Builder */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-900 dark:bg-gray-100">
                  <Layout className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Website Builder
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Visual drag-and-drop editor for building responsive websites
                without code. Real-time preview, component customization, and
                export as React or HTML.
              </p>
              <Link
                href="/website-builder"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-semibold inline-flex items-center gap-2"
              >
                Build →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose NewGen UI?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-12 text-lg">
            Built for developers and designers who want speed without
            compromising quality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Themeable Design
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expose tokens and color pickers. Users control brand colors
                while components automatically adapt.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Type Safe
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full TypeScript support with comprehensive prop types. Better DX
                and fewer runtime errors.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Performance First
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Optimized with React.memo, lazy loading, and tree-shaking
                support for minimal bundle size.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Accessible
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All components follow WCAG 2.1 guidelines with keyboard
                navigation and screen reader support.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Wand2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  AI-Powered
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate components from descriptions, iterate quickly, and
                experiment with AI assistance.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Layout className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Visual Builder
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No-code website builder for non-developers. Drag, drop,
                customize, and export instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            See It In Action
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Fully customizable components that adapt to your design system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-6">
                Buttons
              </h4>
              <div className="flex flex-wrap gap-4 items-center mb-8">
                <Button variant="primary">Primary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Buttons respond to theme tokens automatically.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-6">
                Cards
              </h4>
              <Card title="Example Card" description="Adaptive Surface">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cards inherit background and foreground tokens for
                  consistency.
                </p>
              </Card>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-6">
                More Coming
              </h4>
              <div className="space-y-3 mb-8">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore 15+ components in our gallery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            Your Workflow, Reimagined
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-12 text-lg text-center mx-auto">
            From idea to production in minutes, not hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="relative">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Describe
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tell AI what you want to build in plain English.
                </p>
              </div>
              <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full items-center justify-center text-xs">
                →
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Generate
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI creates production-ready code instantly.
                </p>
              </div>
              <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full items-center justify-center text-xs">
                →
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Preview
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Live sandbox with Sandpack code editor.
                </p>
              </div>
              <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full items-center justify-center text-xs">
                →
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Deploy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Copy, download, or iterate further.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Start with AI generation, explore our component library, or build
            entire websites without code.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <Link
              href="/generative-ai"
              className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Wand2 className="w-5 h-5" />
              Start with AI
            </Link>
            <Link
              href="/website-builder"
              className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Layout className="w-5 h-5" />
              Build a Website
            </Link>
            <Link
              href="/components"
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Tools
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/components"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Component Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/generative-ai"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    AI Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/website-builder"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Website Builder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/documentation"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preview"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Live Preview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} NewGen UI — AI-powered component
            library, generator, and website builder.
          </div>
        </div>
      </footer>
    </div>
  );
}
