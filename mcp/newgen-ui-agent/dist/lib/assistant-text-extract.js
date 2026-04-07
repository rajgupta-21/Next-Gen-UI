/** Models often use `component` or `source` instead of `code`. */
export function pickEmitSource(args) {
    const keys = ["code", "component", "source", "tsx", "jsx", "body"];
    for (const k of keys) {
        const v = args[k];
        if (typeof v === "string" && v.trim())
            return v.trim();
    }
    return "";
}
/**
 * Llama often returns ```typescript … ``` instead of calling emit_component.
 */
/**
 * Strip stray language identifier lines that LLMs sometimes emit inside code blocks.
 * e.g. ```javascript\njavascript\nfunction Foo() { ... } → function Foo() { ... }
 */
function stripStrayLanguageLines(s) {
    return s
        .replace(/^javascript\r?\n/gm, "")
        .replace(/^jsx?\r?\n/gm, "")
        .replace(/^typescript\r?\n/gm, "")
        .replace(/^tsx?\r?\n/gm, "")
        .replace(/^react\r?\n/gm, "");
}
export function extractCodeFromAssistantMarkdown(text) {
    if (!text || typeof text !== "string")
        return null;
    const fence = /```(?:tsx?|typescript|jsx?|javascript|react)\s*\r?\n([\s\S]*?)```/i.exec(text);
    if (fence?.[1]) {
        const raw = stripStrayLanguageLines(fence[1]);
        const inner = raw.trim();
        if (inner.length > 15)
            return inner;
    }
    const openOnly = /```(?:tsx?|typescript|jsx?|javascript|react)\s*\r?\n([\s\S]+)/i.exec(text);
    if (openOnly?.[1]) {
        const raw = stripStrayLanguageLines(openOnly[1]);
        const inner = raw.trim();
        const looksLikeCode = /^(import\s|export\s|function\s|const\s)/m.test(inner) ||
            (/function\s+\w+/m.test(inner) && inner.includes("return"));
        if (inner.length > 40 && looksLikeCode) {
            return inner;
        }
    }
    const t = text.trim();
    if (/^(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+\w+/m.test(t) ||
        /^const\s+\w+\s*=\s*(?:\([^)]*\)|)\s*=>/m.test(t) ||
        /^const\s+\w+\s*:\s*React\.FC/m.test(t)) {
        if (t.length > 40)
            return t;
    }
    return null;
}
/**
 * Pseudo-tool JSON in assistant text instead of real tool_calls.
 */
export function extractCodeFromPseudoToolJson(text) {
    if (!text || typeof text !== "string")
        return null;
    const trimmed = text.trim();
    if (!trimmed.includes("emit_component"))
        return null;
    const candidates = [trimmed];
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end > start) {
        candidates.push(trimmed.slice(start, end + 1));
    }
    const readEmit = (obj) => {
        const name = obj.name ?? obj.tool_name;
        if (name !== "emit_component")
            return null;
        const bag = obj.parameters ?? obj.arguments ?? obj.params ?? obj.input;
        if (!bag || typeof bag !== "object" || Array.isArray(bag))
            return null;
        const code = pickEmitSource(bag);
        return code || null;
    };
    for (const slice of candidates) {
        let parsed;
        try {
            parsed = JSON.parse(slice);
        }
        catch {
            continue;
        }
        if (Array.isArray(parsed)) {
            for (const item of parsed) {
                if (item && typeof item === "object" && !Array.isArray(item)) {
                    const code = readEmit(item);
                    if (code)
                        return code;
                }
            }
            continue;
        }
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            const code = readEmit(parsed);
            if (code)
                return code;
        }
    }
    return null;
}
export function extractCodeFromAssistantMessage(content) {
    return (extractCodeFromPseudoToolJson(content) ??
        extractCodeFromAssistantMarkdown(content));
}
