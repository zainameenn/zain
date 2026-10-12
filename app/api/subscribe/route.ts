import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Newsletter signups from the blog. Each email is saved once in Sanity as a "subscriber".
// The document ID contains a dot, which Sanity treats as private: it is never returned by the public API.
// SANITY_API_WRITE_TOKEN only exists on the server (no NEXT_PUBLIC_ prefix).
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "error", message: "Something went wrong. Please try again." }, { status: 400 });
  }

  // Hidden "company" field: people never see it, bots fill it in. Pretend it worked and save nothing.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ status: "subscribed" });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json({ status: "invalid", message: "That email doesn't look right. Mind checking it?" }, { status: 400 });
  }

  if (!writeToken) {
    console.error("Newsletter: SANITY_API_WRITE_TOKEN is not set, so the signup was not saved.");
    return NextResponse.json({ status: "unavailable", message: "Signups aren't switched on yet. Email hello@zainameen.com and I'll add you by hand." }, { status: 503 });
  }

  const writer = client.withConfig({ token: writeToken, useCdn: false, perspective: "raw" });
  const id = `subscriber.${createHash("sha256").update(email).digest("hex").slice(0, 32)}`;
  const source = typeof body.source === "string" ? body.source.slice(0, 100) : "blog";

  try {
    const existing = await writer.getDocument(id);
    if (existing) return NextResponse.json({ status: "duplicate" });
    await writer.createIfNotExists({ _id: id, _type: "subscriber", email, subscribedAt: new Date().toISOString(), source });
    return NextResponse.json({ status: "subscribed" });
  } catch (error) {
    console.error("Newsletter: could not save the signup.", error);
    return NextResponse.json({ status: "error", message: "Something went wrong on my side. Please try again in a minute." }, { status: 500 });
  }
}
