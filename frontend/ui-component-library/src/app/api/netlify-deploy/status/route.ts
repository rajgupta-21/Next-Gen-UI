import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const siteId = searchParams.get("siteId");
  const deployId = searchParams.get("deployId");
  const token = searchParams.get("token");

  if (!siteId || !deployId || !token) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.netlify.com/api/v1/sites/${siteId}/deploys/${deployId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (!res.ok) {
    return NextResponse.json({ state: "unknown" }, { status: 200 });
  }

  const data = await res.json();
  return NextResponse.json({
    state: data.state,
    error_message: data.error_message,
  });
}
