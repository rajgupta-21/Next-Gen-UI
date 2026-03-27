import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            NewGen UI Documentation
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete guide to installing, using, and customizing our
            comprehensive React component library and AI-powered development
            tools.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          <Link
            href="/components"
            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold text-sm sm:text-base"
          >
            Browse Components
          </Link>
          <Link
            href="/generative-ai"
            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold text-sm sm:text-base"
          >
            AI Component Generator
          </Link>
          <Link
            href="/website-builder"
            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all font-semibold text-sm sm:text-base"
          >
            Website Builder
          </Link>
        </div>

        {/* Main Documentation Content */}
        <div className="space-y-8">
          {/* Installation Section */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              Installation
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Install NewGen UI components in your React/Next.js project:
              </p>
              <div className="space-y-4">
                <CodeBlock code="npm install @your-scope/newgen-ui" language="bash" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">Or with yarn:</p>
                <CodeBlock code="yarn add @your-scope/newgen-ui" language="bash" />
              </div>
            </div>
          </section>

          {/* Core Features Section */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              Core Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Component Library
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  15+ production-ready, fully customizable React components with
                  TypeScript support
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Theming System
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Powerful theme customization with CSS variables and color
                  pickers
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  AI Component Generator
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instantly generate production-ready React components from
                  natural language descriptions
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Website Builder
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag-and-drop visual editor to build responsive websites
                  without code
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              Quick Start
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  Basic Component Usage
                </h3>
                <CodeBlock 
                  code={`import { Button, Card, Tabs } from '@your-scope/newgen-ui';\n\nexport default function MyApp() {\n  return (\n    <Card title="Welcome">\n      <Button variant="primary">Click Me</Button>\n      <Tabs\n        items={[\n          { id: '1', label: 'Tab 1', content: <div>Content 1</div> },\n          { id: '2', label: 'Tab 2', content: <div>Content 2</div> }\n        ]}\n      />\n    </Card>\n  );\n}`}
                  language="tsx"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  Using the AI Component Generator
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Navigate to the{" "}
                  <Link
                    href="/generative-ai"
                    className="text-gray-900 dark:text-white underline font-semibold"
                  >
                    AI Component Generator
                  </Link>{" "}
                  and:
                </p>
                <ol className="text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-gray-900 dark:text-white">1.</span>
                    <span>
                      Describe your component in natural language (e.g., "Create
                      a modern pricing card")
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gray-900 dark:text-white">2.</span>
                    <span>
                      Click "Generate Component" and watch AI create the code
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gray-900 dark:text-white">3.</span>
                    <span>Preview the live component with Sandpack</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gray-900 dark:text-white">4.</span>
                    <span>Copy or download the generated code</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Component Documentation */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              Available Components
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              NewGen UI provides 15+ carefully crafted components:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Button",
                "Card",
                "Input",
                "Dialog",
                "Dropdown",
                "Tabs",
                "Pagination",
                "Progress",
                "Carousel",
                "Navbar",
                "Alert",
                "Badge",
              ].map((comp) => (
                <div
                  key={comp}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer text-center font-medium"
                >
                  {comp}
                </div>
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
              View detailed documentation for each component on the{" "}
              <Link
                href="/components"
                className="text-gray-900 dark:text-white underline font-semibold"
              >
                Components
              </Link>{" "}
              page.
            </p>
          </section>

          {/* Theming Section */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              Theming & Customization
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Customize component appearance with theme props:
              </p>
                <CodeBlock 
                  code={`<Tabs\n  items={items}\n  theme={{\n    primary: "#10b981",\n    primary600: "#059669"\n  }}\n  variant="pills"\n  size="lg"\n/>`}
                  language="tsx"
                />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Each component supports customizable theme tokens and CSS
                variables for seamless integration with your design system.
              </p>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              Best Practices
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-gray-900 dark:text-white font-bold">1.</span>
                <span>
                  <strong>Use TypeScript:</strong> All components are fully
                  typed for better DX
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900 dark:text-white font-bold">2.</span>
                <span>
                  <strong>Leverage Theming:</strong> Use theme props for
                  consistent styling across your app
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900 dark:text-white font-bold">3.</span>
                <span>
                  <strong>Check Accessibility:</strong> All components follow
                  WCAG guidelines
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900 dark:text-white font-bold">4.</span>
                <span>
                  <strong>Experiment with AI:</strong> Use the generator for
                  rapid prototyping
                </span>
              </li>
            </ul>
          </section>

          {/* API Reference Quick Links */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              More Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/components"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all group"
              >
                <div className="text-2xl">🧩</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    Component Gallery
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Browse all 15+ components
                  </p>
                </div>
              </Link>
              <Link
                href="/generative-ai"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all group"
              >
                <div className="text-2xl">🤖</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    AI Generator
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Create components with AI
                  </p>
                </div>
              </Link>
              <Link
                href="/website-builder"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all group"
              >
                <div className="text-2xl">🎨</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    Website Builder
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Drag-and-drop site builder
                  </p>
                </div>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all group"
              >
                <div className="text-2xl">ℹ️</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    About NewGen UI
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Learn about the project
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Need help? Check out the{" "}
            <Link
              href="/preview"
              className="text-gray-900 dark:text-white hover:underline font-bold"
            >
              Component Previews
            </Link>{" "}
            or explore the{" "}
            <Link
              href="/generative-ai"
              className="text-gray-900 dark:text-white hover:underline font-bold"
            >
              AI Component Generator
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
