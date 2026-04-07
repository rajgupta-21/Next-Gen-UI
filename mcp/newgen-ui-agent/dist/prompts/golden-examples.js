/**
 * Full reference components for the system prompt (no imports — preview supplies React).
 * Keep ASCII-only inside strings to avoid template issues.
 */
export const GOLDEN_SMOKE_CARD = `
function SmokeTestCard() {
  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl bg-white shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Smoke test</h2>
      <p className="text-gray-600 text-sm mb-6">Minimal card with a primary action.</p>
      <button
        type="button"
        className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Primary
      </button>
    </div>
  );
}
`.trim();
export const GOLDEN_PRICING_STRIP = `
function PricingStrip() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div>
        <p className="text-sm opacity-80">Pro plan</p>
        <p className="text-3xl font-bold">$12<span className="text-lg font-normal">/mo</span></p>
      </div>
      <button
        type="button"
        className="shrink-0 py-2 px-6 rounded-lg bg-white text-slate-900 font-semibold hover:bg-gray-100"
      >
        Start trial
      </button>
    </div>
  );
}
`.trim();
export const GOLDEN_MODERN_FEATURE_CARD = `
function ModernFeatureCard() {
  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-10">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Product launch
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Build a modern dashboard experience
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Showcase data, actions, and metrics with a clean card layout that works beautifully on mobile and desktop.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
              Get started
            </button>
            <button type="button" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
              Learn more
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Live metric</p>
          <p className="mt-6 text-4xl font-bold">82%</p>
          <p className="mt-2 text-sm text-slate-300">Conversion rate across the latest campaign</p>
        </div>
      </div>
    </section>
  );
}
`.trim();
export function buildGoldenExamplesBlock() {
    return `
## GOLDEN OUTPUT (copy this shape exactly)

Your final code must:
- Be ONE React function component with a PascalCase name.
- NOT include any import or export lines (the app injects React and default export).
- Use only className= for styling (Tailwind). Close every tag. type="button" on buttons.
- Be syntactically complete: balanced parentheses and JSX tags, no truncated sentences inside text nodes.
- Use modern spacing, responsive layout, subtle elevation, and accessible controls.

### Example 1 — centered card + button (matches smoke test prompts)
${GOLDEN_SMOKE_CARD}

### Example 2 — compact pricing row
${GOLDEN_PRICING_STRIP}

### Example 3 — modern feature card
${GOLDEN_MODERN_FEATURE_CARD}
`.trim();
}
