import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
/**
 * Root of the published `newgen-ui` package (contains `src/components`).
 * Override with NEWGEN_UI_ROOT when the MCP server runs outside this repo layout.
 */
export function getNewgenUiRoot() {
    const env = process.env.NEWGEN_UI_ROOT?.trim();
    if (env && fs.existsSync(env)) {
        return path.resolve(env);
    }
    const here = path.dirname(fileURLToPath(import.meta.url));
    const fromLib = path.resolve(here, "../../../../frontend/ui-component-library/packages/newgen-ui");
    if (fs.existsSync(fromLib)) {
        return fromLib;
    }
    return fromLib;
}
