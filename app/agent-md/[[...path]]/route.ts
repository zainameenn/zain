import { notFoundMarkdown, pageToMarkdown } from "@/lib/markdown";

// Serves the Markdown version of a page. proxy.ts rewrites here only when a request
// sends "Accept: text/markdown", so browsers always get the normal HTML page.

const MD_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
  // Search engines should index the HTML pages, not this alternate view.
  "X-Robots-Tag": "noindex",
};

export async function GET(request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path: parts = [] } = await params;
  const path = "/" + parts.map(encodeURIComponent).join("/");
  const origin = new URL(request.url).origin;

  // Fetch the page's own HTML from this deployment. The internal header stops proxy.ts
  // from rewriting this request again; cookies are passed on so protected previews work.
  let res: Response;
  try {
    res = await fetch(origin + path, {
      headers: { accept: "text/html", "x-agent-md-internal": "1", cookie: request.headers.get("cookie") ?? "" },
      redirect: "follow",
      cache: "no-store",
    });
  } catch {
    return new Response("# Temporarily unavailable\n\nPlease try again in a moment.\n", { status: 503, headers: MD_HEADERS });
  }

  const html = res.ok ? await res.text() : "";
  if (!res.ok || !/<main\b/i.test(html)) {
    return new Response(notFoundMarkdown(path), { status: 404, headers: MD_HEADERS });
  }

  return new Response(pageToMarkdown(html, path), {
    status: 200,
    headers: { ...MD_HEADERS, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
