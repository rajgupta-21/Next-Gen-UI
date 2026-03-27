import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 500 },
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // Call Groq API to generate component code
    // NOTE: Code execution now happens client-side via Sandpack
    // This endpoint only generates the raw component code
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert React component developer. Generate a production-ready React component in TypeScript based on the user's request.

CRITICAL REQUIREMENTS:
1. Return ONLY valid TypeScript/JSX code - no explanations or markdown wrappers
2. Use React hooks (useState, useEffect, etc.) with DEFAULT STATE INITIALIZED
3. Components MUST WORK WITHOUT PROPS - initialize all state with sensible defaults
4. Use Tailwind CSS for styling (class names like 'w-full', 'bg-blue-500', etc.)
5. Make components interactive and visually complete
6. Include proper TypeScript interfaces for any props (optional, with defaults)
7. Component must be self-contained and fully runnable
8. Export as default export (Sandpack will handle this)
9. DO NOT include 'use client' directive (not needed for Sandpack)
10. For complex components (tabs, accordion, modal, etc.), include state management and handlers

SANDPACK COMPATIBILITY:
- Sandpack will automatically import React and common hooks
- Focus on clean, standalone functional components
- Avoid external dependencies beyond React basics
- All styling should use Tailwind CSS classes
- Components will run in a secure sandbox environment

IMPORTANT FOR COMPLEX COMPONENTS:
- Tabs: Initialize with a default selected tab
- Input fields: Provide sample placeholder text and initialize state
- Cards: Include sample content
- Lists: Include sample data in component
- Forms: Make all fields functional with default values

EXAMPLES:
For Tabs:
\`\`\`tsx
import React, { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div className="w-full max-w-2xl">
      <div className="flex border-b">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={\`\${activeTab === i ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'} px-4 py-2 font-medium transition-colors hover:text-blue-500\`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">
        <p className="text-gray-700">Content for {tabs[activeTab]}</p>
      </div>
    </div>
  );
}
\`\`\`

For Input:
\`\`\`tsx
import React, { useState } from 'react';

export default function InputField() {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text..."
        className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <p className="mt-2 text-sm text-gray-600">You typed: {value}</p>
      )}
    </div>
  );
}
\`\`\``,
          },
          {
            role: "user",
            content: `Generate a React component for: ${prompt}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API Error:", error);
      return NextResponse.json(
        { error: "Failed to generate component" },
        { status: 500 },
      );
    }

    const data = await response.json();
    const generatedCode =
      data.choices[0]?.message?.content || "Failed to generate code";

    // Extract code from markdown if wrapped in backticks
    let cleanCode = generatedCode;
    const codeMatch = generatedCode.match(
      /```(?:tsx?|jsx?)?\n?([\s\S]*?)\n?```/,
    );
    if (codeMatch) {
      cleanCode = codeMatch[1];
    }

    // Additional cleanup for Sandpack compatibility
    // Remove any 'use client' directives if present
    cleanCode = cleanCode
      .replace(/"use client";\s*/g, "")
      .replace(/'use client';\s*/g, "")
      .replace(/use client;\s*/g, "");

    return NextResponse.json({
      success: true,
      code: cleanCode,
      prompt,
      timestamp: new Date().toISOString(),
      // Metadata for client-side handling
      execution: {
        method: "sandpack", // Client knows to use Sandpack
        secure: true,
        sandbox: true,
      },
    });

    /*
    ============================================================================
    COMMENTED OUT: Previous execution method using iframe + Babel + eval()
    ============================================================================

    The old approach had several issues:
    1. Security risks with eval() execution
    2. Required Babel transpilation in browser (heavy, slow)
    3. Complex error handling and debugging
    4. CORS and CSP issues with external scripts
    5. No proper TypeScript support
    6. Difficult to maintain and extend

    OLD CODE (for reference):

    const createPreviewHTML = () => {
      return `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${wrappedCode}
    ReactDOM.createRoot(document.getElementById('root')).render(<Component />);
  </script>
</body>
</html>
      `;
    };

    This would then be injected into an iframe with sandbox="allow-scripts"

    ============================================================================
    NEW APPROACH: Sandpack (CodeSandbox)
    ============================================================================

    Benefits:
    1. Secure sandbox environment (no eval needed)
    2. Real bundler (webpack/vite) running in browser
    3. Proper module resolution and hot reloading
    4. Better error messages and debugging
    5. TypeScript support out of the box
    6. Extensible with npm packages
    7. Industry-standard solution (used by CodeSandbox)

    Implementation on client side:

    <SandpackProvider
      template="react"
      files={{
        "/App.js": generatedCode
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"]
      }}
    >
      <SandpackPreview />
    </SandpackProvider>

    ============================================================================
    */
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// export async function POST(req: NextRequest) {
//   try {
//     if (!OPENAI_API_KEY) {
//       return NextResponse.json(
//         { error: "OPENAI_API_KEY not configured" },
//         { status: 500 },
//       );
//     }

//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "Prompt is required" },
//         { status: 400 },
//       );
//     }

//     const response = await fetch(OPENAI_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         temperature: 0.7,
//         max_tokens: 2000,
//         messages: [
//           {
//             role: "system",
//             content: `You are an expert React component developer. Generate a production-ready React component in TypeScript based on the user's request.

// CRITICAL REQUIREMENTS:
// 1. Return ONLY valid TypeScript/JSX code - no explanations or markdown wrappers
// 2. Use React hooks (useState, useEffect, etc.) with DEFAULT STATE INITIALIZED
// 3. Components MUST WORK WITHOUT PROPS - initialize all state with sensible defaults
// 4. Use Tailwind CSS for styling
// 5. Make components interactive and visually complete
// 6. Include proper TypeScript interfaces for any props (optional, with defaults)
// 7. Component must be self-contained and fully runnable
// 8. Export as default export
// 9. DO NOT include 'use client'
// 10. For complex components, include full state management and handlers

// SANDPACK COMPATIBILITY:
// - React and hooks are auto-imported
// - Avoid external dependencies
// - Tailwind CSS only
// - Clean functional components

// IMPORTANT DEFAULTS:
// - Tabs → default selected tab
// - Inputs → placeholder + state
// - Lists → sample data
// - Forms → all fields controlled`,
//           },
//           {
//             role: "user",
//             content: `Generate a React component for: ${prompt}`,
//           },
//         ],
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("OpenAI API Error:", errorText);
//       return NextResponse.json(
//         { error: "Failed to generate component" },
//         { status: 500 },
//       );
//     }

//     const data = await response.json();
//     let generatedCode =
//       data.choices?.[0]?.message?.content ?? "Failed to generate code";

//     // Extract code if wrapped in markdown (safety)
//     const codeMatch = generatedCode.match(
//       /```(?:tsx?|jsx?)?\n?([\s\S]*?)\n?```/,
//     );
//     if (codeMatch) {
//       generatedCode = codeMatch[1];
//     }

//     // Sandpack cleanup
//     generatedCode = generatedCode
//       .replace(/"use client";\s*/g, "")
//       .replace(/'use client';\s*/g, "")
//       .replace(/use client;\s*/g, "")
//       .trim();

//     return NextResponse.json({
//       success: true,
//       code: generatedCode,
//       prompt,
//       timestamp: new Date().toISOString(),
//       execution: {
//         method: "sandpack",
//         secure: true,
//         sandbox: true,
//       },
//     });
//   } catch (error) {
//     console.error("Generation error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
