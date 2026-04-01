import { saveAs } from "file-saver";
import JSZip from "jszip";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function generateZip(htmlCode: string): Promise<Blob> {
  const zip = new JSZip();
  zip.file("index.html", htmlCode);
  // Netlify can sometimes infer content-type differently from the browser cache.
  // Add recommended SPA support and explicit header file as a protective measure.
  zip.file("_redirects", "/* /index.html 200\n");
  zip.file(
    "_headers",
    "/index.html\n  Content-Type: text/html; charset=utf-8\n",
  );
  return zip.generateAsync({ type: "blob" });
}

// ─── Method 1: Download as ZIP ────────────────────────────────────────────────

export async function downloadAsZip(htmlCode: string): Promise<void> {
  const blob = await generateZip(htmlCode);
  saveAs(blob, "my-website.zip");
}

// ─── Method 2: Netlify Anonymous Drop ─────────────────────────────────────────
// Works directly from the browser — the anonymous endpoint does NOT have the
// double CORS header bug that the authenticated /deploys endpoint has.

export async function deployToNetlifyAnon(htmlCode: string): Promise<string> {
  const blob = await generateZip(htmlCode);

  const response = await fetch("https://api.netlify.com/api/v1/sites", {
    method: "POST",
    headers: { "Content-Type": "application/zip" },
    body: blob,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Netlify anonymous deploy failed: ${text}`);
  }

  const data = await response.json();
  return data.ssl_url || data.url;
}

// ─── Method 3: Netlify Authenticated (via server-side proxy) ──────────────────
//
// ROOT CAUSE OF CORS ERROR:
// Netlify's authenticated POST /api/v1/sites/:id/deploys endpoint sends back:
//   Access-Control-Allow-Origin: *, *
// Two wildcard values in that header is invalid per the CORS spec, and browsers
// hard-block the request with ERR_FAILED even when the HTTP status is 200.
//
// FIX:
// Route through our own Next.js API route (/api/netlify-deploy) which runs
// server-side. Server-to-server calls are not subject to browser CORS policy,
// so Netlify's malformed header is irrelevant.

export async function deployToNetlifyAuth(
  htmlCode: string,
  token: string,
  siteId?: string,
): Promise<string> {
  const blob = await generateZip(htmlCode);

  const formData = new FormData();
  formData.append("token", token);
  if (siteId) {
    formData.append("siteId", siteId);
  }
  formData.append(
    "file",
    new File([blob], "site.zip", { type: "application/zip" }),
  );

  const response = await fetch("/api/netlify-deploy", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.error || `Deploy failed with status ${response.status}`,
    );
  }

  const result = await response.json();

  if (result.deployId && result.siteId) {
    await waitForDeploy(result.siteId, result.deployId, token);
  }

  return result.url;
}

// ─── Poll via status proxy ────────────────────────────────────────────────────

async function waitForDeploy(
  siteId: string,
  deployId: string,
  token: string,
  maxAttempts = 20,
  intervalMs = 2500,
): Promise<void> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await sleep(intervalMs);

    const res = await fetch(
      `/api/netlify-deploy/status?siteId=${siteId}&deployId=${deployId}&token=${encodeURIComponent(token)}`,
    );

    if (!res.ok) break;

    const data = await res.json();

    if (data.state === "ready") return;
    if (data.state === "error") {
      throw new Error(
        `Netlify deploy failed: ${data.error_message || "unknown error"}`,
      );
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
