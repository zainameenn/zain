import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/sanity/lib/fetch";

// Sanity calls this webhook whenever a post, author or category is published, changed or deleted.
// The request is signed with SANITY_REVALIDATE_SECRET, so nobody else can trigger it.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new NextResponse("Webhook secret is not configured", { status: 500 });
  }
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret, true);
    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    // The next visitor gets fresh content straight away (no stale copy is served).
    revalidateTag(SANITY_TAG, { expire: 0 });
    // Vercel caches the sitemap by its address rather than by tag, so refresh it by address too.
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (error) {
    console.error(error);
    return new NextResponse("Could not revalidate", { status: 500 });
  }
}
