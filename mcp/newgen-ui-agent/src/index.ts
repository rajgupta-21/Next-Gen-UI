#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { runGroqAgent } from "./agent/cloud-agent.js";
import {
  toolConstraintsSummary,
  toolLibraryList,
  toolReadComponentSource,
  toolValidateSnippet,
} from "./lib/workspace-tools.js";
import { buildAgentSystemPrompt } from "./prompts/system.js";

const server = new McpServer(
  {
    name: "newgen-ui-agent",
    version: "1.0.0",
  },
  {
    instructions:
      "Tools and prompts for building React+Tailwind UI aligned with the newgen-ui package. Uses Groq cloud API (GROQ_API_KEY) for component codegen when you call newgen_agent_generate.",
  },
);

server.registerTool(
  "newgen_list_components",
  {
    description:
      "List exported components from the local newgen-ui package and the resolved filesystem root.",
  },
  async () => {
    const { names, packageRoot } = toolLibraryList();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ names, packageRoot }, null, 2),
        },
      ],
    };
  },
);

server.registerTool(
  "newgen_read_component_source",
  {
    description:
      "Read the TypeScript source of a design-system component (reference for props and patterns).",
    inputSchema: {
      componentName: z
        .string()
        .describe('PascalCase name, e.g. "Button", "Card"'),
    },
  },
  async ({ componentName }) => {
    const result = toolReadComponentSource(componentName);
    return {
      content: [
        {
          type: "text",
          text: result.ok
            ? result.content || ""
            : JSON.stringify(result, null, 2),
        },
      ],
      isError: !result.ok,
    };
  },
);

server.registerTool(
  "newgen_codegen_constraints",
  {
    description:
      "Return the hard constraints the AI agent and humans should follow when generating UI code.",
  },
  async () => ({
    content: [{ type: "text", text: toolConstraintsSummary() }],
  }),
);

server.registerTool(
  "newgen_validate_react_snippet",
  {
    description:
      "Lightweight static checks on a React+Tailwind code string (no AST).",
    inputSchema: {
      code: z.string().describe("Full or partial component source"),
    },
  },
  async ({ code }) => {
    const r = toolValidateSnippet(code);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(r, null, 2),
        },
      ],
    };
  },
);

server.registerTool(
  "newgen_agent_generate",
  {
    description:
      "Run the Groq-powered agent to generate a React+Tailwind UI component. Set GROQ_API_KEY to use this tool.",
    inputSchema: {
      prompt: z
        .string()
        .describe("What to build, e.g. pricing card with monthly toggle"),
      style: z
        .string()
        .optional()
        .describe(
          "Desired visual style, e.g. modern, polished, production-ready",
        ),
      quality: z
        .string()
        .optional()
        .describe("Quality expectation, e.g. high, polished"),
      includeDebugTrace: z
        .boolean()
        .optional()
        .describe("If true, append step trace JSON for debugging"),
    },
  },
  async ({ prompt, style, quality, includeDebugTrace }) => {
    try {
      const out = await runGroqAgent(prompt, { style, quality });
      const payload: Record<string, unknown> = {
        code: out.code,
        notes: out.notes,
        steps: out.steps,
      };
      if (includeDebugTrace) {
        payload.rawMessageCount = out.rawMessages.length;
      }
      const text =
        JSON.stringify(payload, null, 2) +
        (out.code
          ? `\n\n---\n\n\`\`\`tsx\n${out.code}\n\`\`\``
          : "\n\n(No code emitted — check GROQ_API_KEY is set and the model is available.)");
      return { content: [{ type: "text", text }] };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        content: [
          {
            type: "text",
            text: `Agent failed: ${msg}\nEnsure GROQ_API_KEY is set in your environment.`,
          },
        ],
        isError: true,
      };
    }
  },
);

server.registerPrompt(
  "newgen_component_request",
  {
    description:
      "Structured request template for generating a newgen-ui style component.",
    argsSchema: {
      goal: z.string().describe("What the component should do"),
      audience: z
        .string()
        .optional()
        .describe("Who uses it, e.g. marketing site visitors"),
      style: z
        .string()
        .optional()
        .describe("Design style, e.g. modern, polished, production-ready"),
      quality: z
        .string()
        .optional()
        .describe("Quality expectation, e.g. high, polished"),
      constraints: z
        .string()
        .optional()
        .describe("Extra constraints: dark mode, RTL, density, etc."),
    },
  },
  async ({ goal, audience, style, quality, constraints }) => {
    const system = buildAgentSystemPrompt();
    const user = [
      `Goal: ${goal}`,
      audience ? `Audience: ${audience}` : null,
      style ? `Style: ${style}` : null,
      quality ? `Quality: ${quality}` : null,
      constraints ? `Constraints: ${constraints}` : null,
      "",
      "Use tools as needed, then call emit_component with the final code.",
    ]
      .filter(Boolean)
      .join("\n");

    return {
      messages: [
        { role: "user", content: { type: "text", text: system } },
        {
          role: "user",
          content: {
            type: "text",
            text: `System rules above. Now execute for this task:\n\n${user}`,
          },
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
