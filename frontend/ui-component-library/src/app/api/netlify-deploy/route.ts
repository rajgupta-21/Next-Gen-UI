import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const token = formData.get("token") as string | null;
    const file = formData.get("file") as File | null;
    const siteId = formData.get("siteId") as string | null; // optional — for re-deploys

    if (!token) {
      return NextResponse.json(
        { error: "Missing Netlify token" },
        { status: 400 },
      );
    }
    if (!file) {
      return NextResponse.json({ error: "Missing zip file" }, { status: 400 });
    }

    const authHeaders = {
      Authorization: `Bearer ${token}`,
    };

    // ── Step 1: Create or reuse the site ──────────────────────────────────────
    let resolvedSiteId = siteId;

    if (!resolvedSiteId) {
      const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!siteRes.ok) {
        const text = await siteRes.text();
        const message =
          siteRes.status === 401
            ? "Access Denied: check your Netlify token, and ensure it has sites:read and sites:write scope. If you cannot create sites, provide an existing siteId."
            : `Failed to create site: ${text}`;
        return NextResponse.json(
          { error: message },
          { status: siteRes.status },
        );
      }

      const siteData = await siteRes.json();
      resolvedSiteId = siteData.id;
    }

    // ── Step 2: Upload the zip to trigger an actual deploy ────────────────────
    const zipArrayBuffer = await file.arrayBuffer();
    // Ensure server-side socket gets raw bytes, not possible text coercion
    const zipBuffer = Buffer.from(zipArrayBuffer);

    const deployRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${resolvedSiteId}/deploys`,
      {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/zip",
        },
        body: zipBuffer,
      },
    );

    if (!deployRes.ok) {
      const text = await deployRes.text();
      return NextResponse.json(
        { error: `Failed to deploy: ${text}` },
        { status: deployRes.status },
      );
    }

    const deployData = await deployRes.json();

    return NextResponse.json({
      siteId: resolvedSiteId,
      deployId: deployData.id,
      url: deployData.ssl_url || deployData.url,
      state: deployData.state,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 },
    );
  }
}
