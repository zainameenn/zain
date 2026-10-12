import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// "Exit preview": turns draft mode off and returns to the page.
export async function POST(request: NextRequest) {
  (await draftMode()).disable();
  const back = request.nextUrl.searchParams.get("redirect") ?? "/insights";
  // Only allow same-site paths, never an outside URL.
  const safe = back.startsWith("/") && !back.startsWith("//") ? back : "/insights";
  return NextResponse.redirect(new URL(safe, request.url), 303);
}
