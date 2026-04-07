/**
 * Verifies the Groq agent returns structured output.
 * Usage (from mcp/newgen-ui-agent): npm run smoke
 */
import { runGroqAgent } from "../dist/agent/cloud-agent.js";

async function main() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("❌ GROQ_API_KEY is not set.");
    console.error("Set it: export GROQ_API_KEY=your_key");
    process.exit(1);
  }

  console.log("Provider: Groq (llama-3.3-70b-versatile)");

  const prompt =
    process.env.SMOKE_PROMPT ||
    "A minimal centered card with title 'Smoke test' and one primary button; Tailwind only.";

  console.log("\nRunning agent with prompt:", prompt.slice(0, 80) + "...\n");

  const out = await runGroqAgent(prompt);

  console.log("--- Steps ---");
  out.steps.forEach((s, i) =>
    console.log(`${i + 1}. [${s.role}] ${s.detail.slice(0, 200)}${s.detail.length > 200 ? "…" : ""}`),
  );

  if (out.code) {
    console.log("\n--- Emitted code (first 400 chars) ---\n");
    console.log(out.code.slice(0, 400) + (out.code.length > 400 ? "\n…" : ""));
    console.log("\n✅ Smoke test passed: emit_component produced code.");
    process.exit(0);
  }

  console.error("\n❌ No code emitted.");
  process.exit(1);
}

main().catch((e) => {
  console.error("\n❌ Smoke test failed:", e.message);
  process.exit(1);
});
