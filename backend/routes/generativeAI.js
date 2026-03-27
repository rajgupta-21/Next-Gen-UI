import { Router } from "express";

const router = Router();

/**
 * POST /api/generate-component
 * Generate React component from prompt using AI
 *
 * NOTE: Code execution has been disabled.
 * Transitioning to open-source React Sandbox (CodeSandbox) for component execution.
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

    // COMMENTED OUT: Old code execution flow
    // This endpoint was previously responsible for both:
    // 1. Generating code via Groq API
    // 2. Providing execution support info
    //
    // Now focuses only on code generation.
    // Code execution is handled by React Sandbox (CodeSandbox) on the frontend.

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are an expert React developer. Generate clean, production-ready React functional components.

CRITICAL RULES:
1. Output ONLY the component code - no explanations, no markdown blocks
2. Use function declarations: "function ComponentName() { ... }"
3. Use Tailwind CSS for all styling
4. Make components interactive with React hooks (useState, useEffect)
5. NO imports, NO exports, NO TypeScript types
6. Component must be standalone and ready to render
7. Make it visually appealing with gradients, shadows, and animations
8. Include interactive elements (buttons, hover effects, etc.)`,
            },
            {
              role: "user",
              content: `Create a React component: ${prompt}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2500,
        }),
      },
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("❌ Groq API Error:", errorText);
      throw new Error(`Groq API failed with status ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    let generatedCode = groqData.choices[0]?.message?.content || "";

    if (!generatedCode) {
      throw new Error("No code generated from AI");
    }

    generatedCode = generatedCode
      .replace(/```jsx?\n?/g, "")
      .replace(/```typescript?\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    console.log("   Code length:", generatedCode.length);

    const response = {
      code: generatedCode,
      prompt: prompt,
      timestamp: new Date().toISOString(),
      // FUTURE: Sandbox information will be handled on frontend
      // sandboxInfo: { type: "codesandbox", status: "ready" }
    };

    return res.json(response);
  } catch (error) {
    console.error("💥 Component generation error:", error);

    return res.status(500).json({
      error: error.message || "Failed to generate component",
      details: error.stack,
    });
  }
});

export default router;
