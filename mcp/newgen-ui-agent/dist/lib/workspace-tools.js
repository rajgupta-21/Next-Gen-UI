import fs from "node:fs";
import path from "node:path";
import { getNewgenUiRoot } from "./paths.js";
const EXPORTED_COMPONENTS = [
    "Button",
    "Card",
    "Carousel",
    "Dialog",
    "Dropdown",
    "Input",
    "Navbar",
    "Pagination",
    "Progress",
    "Tabs",
    "ThemeProvider",
];
function safeComponentName(raw) {
    const cleaned = raw.replace(/\.tsx?$/i, "").replace(/[^a-zA-Z0-9]/g, "");
    if (!cleaned)
        return null;
    if (!EXPORTED_COMPONENTS.includes(cleaned)) {
        return null;
    }
    return cleaned;
}
export function toolLibraryList() {
    const packageRoot = getNewgenUiRoot();
    return { names: [...EXPORTED_COMPONENTS], packageRoot };
}
export function toolReadComponentSource(componentName) {
    const name = safeComponentName(componentName);
    if (!name) {
        return {
            ok: false,
            error: `Unknown component "${componentName}". Allowed: ${EXPORTED_COMPONENTS.join(", ")}`,
        };
    }
    const root = getNewgenUiRoot();
    const file = path.join(root, "src", "components", `${name}.tsx`);
    if (!fs.existsSync(file)) {
        return { ok: false, error: `File not found: ${file}` };
    }
    const content = fs.readFileSync(file, "utf8");
    const max = 12_000;
    return {
        ok: true,
        path: file,
        content: content.length > max
            ? `${content.slice(0, max)}\n\n/* …truncated… */`
            : content,
    };
}
export function toolConstraintsSummary() {
    return [
        "Emit ONE function component with a PascalCase name. No import lines. No export lines (preview injects them).",
        "Use className= only (never HTML class=). Complete every JSX tag; type=\"button\" on buttons.",
        "End with emit_component when possible; otherwise a fully closed markdown fence.",
        "Prefer semantic HTML and keyboard-accessible controls.",
        "Avoid eval, network I/O, and dangerouslySetInnerHTML unless required.",
    ].join("\n");
}
/** Sandpack injects React + default export — strip model-added import/export to avoid duplicate imports. */
function stripImportsAndExportsForSandbox(s) {
    let out = s.trimStart();
    for (let i = 0; i < 40; i++) {
        const before = out;
        out = out.replace(/^import\s[\s\S]*?;\s*\r?\n?/m, "");
        if (out === before)
            break;
    }
    out = out.replace(/^export\s+default\s+/gm, "");
    return out.trimStart();
}
/**
 * Llama 3.2 sometimes emits: function <nil> {jsx:<div ...> (invalid syntax).
 * Pull out the JSX and wrap it in a real component.
 */
function repairNilJsxGarbage(s) {
    if (!/<nil>/i.test(s) && !/\bfunction\s+nil\b/i.test(s))
        return null;
    const patterns = [
        /function\s+<nil>\s*\{\s*jsx:\s*(<\s*[\s\S]+)/i,
        /function\s+nil\s*\{\s*jsx:\s*(<\s*[\s\S]+)/i,
        /\{\s*function\s+<nil>\s*\{\s*jsx:\s*(<\s*[\s\S]+)/i,
    ];
    let body = null;
    for (const re of patterns) {
        const m = re.exec(s);
        if (m?.[1]) {
            body = m[1].trim();
            break;
        }
    }
    if (!body) {
        const loose = /jsx:\s*(<\s*[\s\S]+)/i.exec(s);
        if (loose?.[1] && /<nil>|function\s+nil\b/i.test(s)) {
            body = loose[1].trim();
        }
    }
    if (!body || !body.startsWith("<"))
        return null;
    if (body.endsWith("}")) {
        body = body.slice(0, -1).trim();
    }
    return `export default function GeneratedComponent() {\n  return (\n    ${body}\n  );\n}`;
}
/** Model often returns the two-char sequence \\n instead of real newlines inside strings. */
function unescapeModelStringLiterals(s) {
    return s
        .replace(/\\n/g, "\n")
        .replace(/\\r\n?/g, "\n")
        .replace(/\\t/g, "\t");
}
/** Raw <div>...</div> with no function wrapper — wrap for Sandpack. */
function wrapBareJsxIfNeeded(s) {
    const t = s.trim();
    if (!/^<[A-Za-z!?]/.test(t))
        return s;
    if (/^(export\s+)?(default\s+)?function\s+\w/m.test(t))
        return s;
    if (/^const\s+\w+\s*[:=]/m.test(t))
        return s;
    if (/^import\s+/m.test(t))
        return s;
    return `export default function GeneratedComponent() {\n  return (\n    ${t}\n  );\n}`;
}
/**
 * HTML-style onclick=... breaks JSX (invalid quotes, wrong casing). Strip lowercase on*=
 * in opening tags; valid React onClick is not matched ([a-z]+ only after "on").
 */
function stripLowercaseHtmlHandlersFromTags(s) {
    return s.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)(\/?>)/g, (full, tag, attrs, closer) => {
        let a = String(attrs);
        a = a.replace(/\s+on[a-z]+\s*=\s*\{[^}]*\}/gi, "");
        a = a.replace(/\s+on[a-z]+\s*=\s*"(?:[^"\\]|\\.)*"/gi, "");
        a = a.replace(/\s+on[a-z]+\s*=\s*'(?:[^'\\]|\\.)*'/gi, "");
        if (/\bon[a-z]+\s*=/i.test(a)) {
            a = a.replace(/\s+on[a-z]+\s*=\s*[\s\S]*/, "");
        }
        return `<${tag}${a}${closer}`;
    });
}
/**
 * Truncated LLM output: opening <button> ends after className="..." with no `>`, then `}` or </div>.
 */
function repairTruncatedOpeningTags(s) {
    let out = s;
    out = out.replace(/<button\b([^>]*className="[^"]*")\s*\r?\n\s*\}\s*\r?\n/gi, '<button$1 type="button">Click</button>\n');
    out = out.replace(/<button\b([^>]*className="[^"]*")\s*\r?\n\s*(\s*)<\/div>/gi, '<button$1 type="button">Click</button>\n$2</div>');
    return out;
}
/** Fix common local-LLM mistakes so Sandpack/React are more likely to run. */
export function sanitizeEmittedCode(raw) {
    let s = unescapeModelStringLiterals(raw.trim());
    if (/^\{function\b/.test(s)) {
        s = s.slice(1);
    }
    while (/^\{\s*(export|const)\b/.test(s)) {
        s = s.replace(/^\{\s*/, "");
    }
    const nilFixed = repairNilJsxGarbage(s);
    if (nilFixed) {
        s = nilFixed;
    }
    s = wrapBareJsxIfNeeded(s);
    s = s.replace(/\sclass="/gi, ' className="');
    s = s.replace(/\sclass='/gi, " className='");
    s = s.replace(/\s+xmlns="http:\/\/www\.w3\.org\/1999\/xul"/gi, "");
    s = s.replace(/\s+xmlns='http:\/\/www\.w3\.org\/1999\/xul'/gi, "");
    s = stripLowercaseHtmlHandlersFromTags(s);
    s = repairTruncatedOpeningTags(s);
    s = stripImportsAndExportsForSandbox(s);
    return s.trim();
}
export function toolValidateSnippet(code) {
    const issues = [];
    if (!code || code.trim().length < 20) {
        issues.push("Code is too short to be a real component.");
    }
    if (code.includes("dangerouslySetInnerHTML")) {
        issues.push("dangerouslySetInnerHTML is disallowed unless user explicitly requested rich HTML.");
    }
    if (/\beval\s*\(/.test(code) || /\bFunction\s*\(/.test(code)) {
        issues.push("Dynamic code execution patterns detected.");
    }
    if (!/function\s+\w+\s*\(/.test(code) && !/const\s+\w+\s*=\s*\(/.test(code)) {
        issues.push("Could not find a React function component pattern.");
    }
    return { ok: issues.length === 0, issues };
}
export { EXPORTED_COMPONENTS };
