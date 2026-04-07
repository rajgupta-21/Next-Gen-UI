import { extractCodeFromAssistantMessage } from "../lib/assistant-text-extract.js";
import { sanitizeEmittedCode } from "../lib/workspace-tools.js";
import { buildAgentSystemPrompt } from "../prompts/system.js";

export type AgentStep = {
  role: string;
  detail: string;
};

export type AgentResult = {
  code: string | null;
  notes: string | null;
  steps: AgentStep[];
  rawMessages: unknown[];
};

const GROQ_MODEL = "llama-3.3-70b-versatile";

/**
 * Single-shot Groq cloud agent.
 * Uses the existing system prompt + golden examples for consistent output.
 * Env: GROQ_API_KEY (required).
 */
export async function runGroqAgent(
  userPrompt: string,
  options?: { style?: string; quality?: string },
): Promise<AgentResult> {
  const steps: AgentStep[] = [];
  const rawMessages: unknown[] = [];

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey?.trim()) {
    steps.push({
      role: "error",
      detail:
        "GROQ_API_KEY is not set. Set it in your environment or .env file.",
    });
    return { code: null, notes: null, steps, rawMessages };
  }

  const system = buildAgentSystemPrompt();
  const hints = [
    options?.style ? `Style: ${options.style}` : null,
    options?.quality ? `Quality: ${options.quality}` : null,
  ].filter(Boolean);

  const user =
    `${hints.join("\n")}${hints.length ? "\n\n" : ""}${userPrompt}\n\n` +
    `Output rules: Return ONLY one function component as specified in the system prompt — no import lines, no export lines, no markdown prose outside a single optional fenced block. Complete all JSX tags and string literals. Prefer modern responsive layout and production-ready Tailwind structure when requested.`;

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
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
    error?: { message?: string };
  };
  rawMessages.push(data);

  if (!res.ok) {
    const msg = data.error?.message || `Groq HTTP ${res.status}`;
    steps.push({ role: "error", detail: msg });
    return { code: null, notes: null, steps, rawMessages };
  }

  const content = data.choices?.[0]?.message?.content || "";
  steps.push({
    role: "assistant_text",
    detail: content.slice(0, 2000) || "(empty)",
  });

  const extracted = extractCodeFromAssistantMessage(content);
  const raw =
    extracted ??
    (/^\s*(?:export\s+)?(?:default\s+)?function\s+\w/m.test(content)
      ? content.trim()
      : "");
  const code = sanitizeEmittedCode(raw);

  if (code.length > 25) {
    return {
      code,
      notes: `Groq model ${GROQ_MODEL} (single completion).`,
      steps,
      rawMessages,
    };
  }

  steps.push({
    role: "error",
    detail: "Could not extract component from Groq response.",
  });
  return { code: null, notes: null, steps, rawMessages };
}
