import {
  Code2,
  Heart,
  Layout,
  Lightbulb,
  Rocket,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-gray-900 dark:bg-gray-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-white dark:text-gray-900" />
            </div>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              Modern Development Tools
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            About NewGen UI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            An AI-powered component library and visual development suite
            designed to accelerate modern web development. Build beautiful,
            responsive applications faster than ever before.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Mission Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-4">
              <Heart className="w-8 h-8 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  NewGen UI exists to transform how developers build web
                  applications. We're combining three powerful tools into one
                  cohesive platform: a production-ready component library, an
                  AI-powered component generator, and a visual website builder.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our mission is simple: reduce boilerplate, eliminate
                  repetitive design decisions, and let developers focus on what
                  matters—building amazing products. Whether you're prototyping
                  rapidly with AI, customizing components with our theming
                  system, or building entire websites without code, NewGen UI is
                  built for modern development.
                </p>
              </div>
            </div>
          </div>

          {/* The Three Pillars */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              The NewGen UI Platform
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Component Library
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  15+ production-ready React components with full TypeScript
                  support, comprehensive theming, and accessibility built-in.
                </p>
                <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> Fully customizable
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> WCAG compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> Mobile-first design
                  </li>
                </ul>
              </div>

              {/* Pillar 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    AI Generator
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Generate production-ready components from natural language
                  descriptions using AI. Perfect for rapid prototyping.
                </p>
                <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> Live Sandpack preview
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> History tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> Instant code export
                  </li>
                </ul>
              </div>

              {/* Pillar 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Layout className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Website Builder
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Visual drag-and-drop editor for building responsive websites
                  without writing code.
                </p>
                <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> No coding required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> Real-time preview
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> Export as React/HTML
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <Lightbulb className="w-8 h-8 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Why Choose NewGen UI?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Fully Customizable
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every component can be styled to match your brand with
                  powerful theming options, CSS variables, and granular control
                  over appearance.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Production Ready
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Built with performance, accessibility, and best practices in
                  mind. All components are optimized and tested for production
                  use.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Responsive Design
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All components are built mobile-first and work seamlessly
                  across all devices. Responsive by default, not by luck.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  AI-Powered
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generate components from natural language descriptions.
                  Iterate quickly, experiment with ideas, and accelerate
                  development cycles.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  For Everyone
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Developers love our component API and TypeScript support.
                  Designers love our visual builder and theming system.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Well Documented
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comprehensive documentation, live examples, and detailed API
                  references help you get started quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <Rocket className="w-8 h-8 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Key Features
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg flex-shrink-0">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    15+ Ready-to-Use Components
                  </strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Button, Card, Input, Dialog, Navbar, Tabs, Pagination,
                    Progress, Carousel, Alert, Badge, and more.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg flex-shrink-0">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    Complete TypeScript Support
                  </strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Full type safety with comprehensive TypeScript definitions
                    for all components and props.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg flex-shrink-0">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Dark Mode & Theming</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built-in support for light and dark themes with CSS
                    variables for total customization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg flex-shrink-0">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    Accessibility First (WCAG 2.1)
                  </strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All components are WCAG compliant with proper ARIA labels,
                    keyboard navigation, and screen reader support.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg flex-shrink-0">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    AI Component Generation
                  </strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Describe what you want in plain English and let AI generate
                    production-ready component code instantly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg flex-shrink-0">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    Visual Website Builder
                  </strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No-code drag-and-drop editor for building responsive
                    websites. Export as React or HTML.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Built With Modern Technologies
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "React", name: "React 18+", desc: "Modern UI library" },
                { icon: "Tailwind", name: "Tailwind CSS", desc: "Utility-first CSS" },
                { icon: "TypeScript", name: "TypeScript", desc: "Type safety" },
                { icon: "Next.js", name: "Next.js 14+", desc: "React framework" },
                { icon: "Claude", name: "Claude AI", desc: "Component generation" },
                { icon: "Sandpack", name: "Sandpack", desc: "Code editor & preview" },
                { icon: "Lucide", name: "Lucide Icons", desc: "Beautiful icons" },
                { icon: "Headless", name: "Headless UI", desc: "Accessible components" },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <div className="text-2xl mb-2">{tech.icon}</div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {tech.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              We envision a future where building web applications is faster,
              more accessible, and more enjoyable. By combining traditional
              component libraries with AI-powered code generation and visual
              development tools, we're creating a platform that works for
              everyone—from professional developers to no-code creators.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              NewGen UI is constantly evolving. We're committed to staying at
              the forefront of modern web development, incorporating the latest
              technologies and best practices to ensure our users always have
              access to cutting-edge tools.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Development Workflow?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Start with our component library, experiment with AI generation,
              or build entire websites visually. NewGen UI has something for
              everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/generative-ai"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Try AI Generator
              </Link>
              <Link
                href="/website-builder"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Layout className="w-5 h-5" />
                Build a Website
              </Link>
              <Link
                href="/components"
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
              >
                Explore Components
              </Link>
              <Link
                href="/documentation"
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
              >
                Read Docs
              </Link>
            </div>
          </div>

          {/* Team/Credits */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Built by Developers, For Developers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              NewGen UI is a passion project created by developers who believe
              in the power of great tools. We're dedicated to building products
              that make development faster, easier, and more enjoyable.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} NewGen UI — Transforming modern web
              development with AI and visual tools.
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
