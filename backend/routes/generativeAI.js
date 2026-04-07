import { Router } from "express";

const router = Router();

const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are an agentic UI engineer for the "newgen-ui" React + Tailwind ecosystem.

Your job: fulfill the user's UI request by emitting ONE final React component.

## Sandpack / live preview contract (non-negotiable)
- Do NOT write import or export lines. The host injects React and the default export.
- Output ONLY the function component body as shown in GOLDEN OUTPUT below.
- Finish the entire component in one response: no "…", no cut-off strings, no half-open JSX tags.

## Code rules (must follow)
- One function: function MyName() { return ( ... ); }
- Tailwind via className only. type="button" on buttons. Close every tag.
- No HTML onclick=, no class=, no nil placeholders, no fake jsx: syntax.
- No import/export statements.

## GOLDEN OUTPUT (copy this shape exactly)

Your final code must:
- Be ONE React function component with a PascalCase name.
- NOT include any import or export lines (the app injects React and default export).
- Use only className= for styling (Tailwind). Close every tag. type="button" on buttons.
- Be syntactically complete: balanced parentheses and JSX tags, no truncated sentences inside text nodes.

### Example 1 — centered card + button
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

### Example 2 — compact pricing row
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
}`.trim();

function buildUserPrompt(userPrompt) {
  return `${userPrompt}

Output rules: Return ONLY one function component — no import lines, no export lines, no markdown prose outside a single optional fenced block. Complete all JSX tags and string literals.`;
}

async function groqChat(prompt, apiKey) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.25,
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(prompt) },
      ],
    }),
  });
  return res.json();
}

/**
 * POST /api/generate-component
 * Generate React component from prompt using Groq cloud API.
 */
router.post("/generate-component", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("📝 Prompt:", prompt);

    if (!prompt || typeof prompt !== "string") {
      console.error("❌ Invalid prompt");
      return res.status(400).json({
        error: "Prompt is required and must be a string",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("❌ GROQ_API_KEY not found in environment");
      return res.status(500).json({
        error: "API key not configured. Please add GROQ_API_KEY to .env file",
      });
    }

    const groqData = await groqChat(prompt, process.env.GROQ_API_KEY);

    if (!groqData.choices?.[0]?.message?.content) {
      const errorMsg = groqData.error?.message || "No code generated from AI";
      console.error("❌ Groq Error:", errorMsg);
      throw new Error(errorMsg);
    }

    let generatedCode = groqData.choices[0].message.content;

    generatedCode = generatedCode
      .replace(/```(?:jsx?|tsx?|typescript|javascript)\s*\n?/gi, "")
      .replace(/```\n?/g, "")
      .trim();

    console.log("   Code length:", generatedCode.length);

    return res.json({
      code: generatedCode,
      prompt: prompt,
      timestamp: new Date().toISOString(),
      provider: "groq",
    });
  } catch (error) {
    console.error("💥 Component generation error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate component",
      details: error.stack,
    });
  }
});

/**
 * POST /api/generate-component-agent
 * Alias of /generate-component using the Groq agent (no Ollama, no local model).
 */
router.post("/generate-component-agent", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt is required and must be a string",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "GROQ_API_KEY is not set. Set it in your environment or .env file.",
      });
    }

    const groqData = await groqChat(prompt, process.env.GROQ_API_KEY);

    if (!groqData.choices?.[0]?.message?.content) {
      const errorMsg = groqData.error?.message || "No code emitted by Groq.";
      throw new Error(errorMsg);
    }

    let generatedCode = groqData.choices[0].message.content;

    generatedCode = generatedCode
      .replace(/```(?:jsx?|tsx?|typescript|javascript)\s*\n?/gi, "")
      .replace(/```\n?/g, "")
      .trim();

    return res.json({
      code: generatedCode,
      prompt,
      timestamp: new Date().toISOString(),
      provider: "groq-agent",
    });
  } catch (error) {
    console.error("💥 Groq agent generation error:", error);
    return res.status(500).json({
      error: error.message || "Groq agent failed",
      details: error.stack,
    });
  }
});

export default router;
