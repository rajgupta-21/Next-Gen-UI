/**
 * Short workflow hints (golden full code lives in golden-examples.ts).
 */
export const FEW_SHOT_EXAMPLES = `
## Tool workflow (when tools work)
read_component_source("Card") only if you need props/layout reference, then emit_component with code matching GOLDEN shape (no imports).

## Markdown fallback (only if tools fail)
Use a fenced block with BOTH opening and closing triple-backtick lines so extraction is not truncated.
`.trim();
