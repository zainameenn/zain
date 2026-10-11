import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Markdown content negotiation for AI agents. Requests that send "Accept: text/markdown"
// are rewritten to /agent-md, which returns the same page as Markdown. The matcher only
// runs this for those requests, so normal page loads skip it and stay as fast as before.
// The Markdown lives at its own internal path, so caches never hand it to a browser.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/agent-md${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  matcher: [
    {
      // Pages only: skip Next.js internals, the API, the Markdown route itself and files with an extension.
      source: "/((?!_next|api|agent-md|.*\\..*).*)",
      has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
      missing: [{ type: "header", key: "x-agent-md-internal" }],
    },
  ],
};
