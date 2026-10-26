import { visitorId } from "@/lib/tools/ai/gateway";
import { counterStore } from "@/lib/tools/ai/store";
import { checkCanonical, summariseChain, type Hop } from "@/lib/tools/v3/batch4";
import { fetchError, safeRequest, urlProblem } from "@/lib/tools/v3/safe-fetch";

// Public URL checks for the Canonical URL Checker and Redirect Chain Checker. Every hop goes through
// lib/tools/v3/safe-fetch.ts (no private networks, no rebinding, capped time and size). Page content is
// never sent back to the visitor, only the facts the tools need. Nothing is logged or stored.

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_HOPS = 8;
const MAX_URLS = 5;
const VISITOR_DAILY = Number(process.env.CHECK_VISITOR_DAILY ?? 60);
const GLOBAL_MINUTE = Number(process.env.CHECK_GLOBAL_MINUTE ?? 60);

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

async function allowed(visitor: string, cost: number): Promise<string | null> {
  const store = counterStore();
  const day = new Date().toISOString().slice(0, 10);
  const [mine, minute] = await Promise.all([store.incr(`chk:v:${visitor}:${day}`, 90_000, cost), store.incr(`chk:m:${new Date().toISOString().slice(0, 16)}`, 120, cost)]);
  if (mine > VISITOR_DAILY) return "You've reached today's free checks. Come back tomorrow.";
  if (minute > GLOBAL_MINUTE) return "The checker is busy right now. Try again in a minute.";
  return null;
}

async function trace(start: string, method: "HEAD" | "GET"): Promise<Hop[]> {
  const hops: Hop[] = [];
  let url = start;
  for (let i = 0; i <= MAX_HOPS; i++) {
    const problem = urlProblem(url);
    if (problem) {
      hops.push({ url, status: null, location: null, timeMs: 0, error: problem });
      break;
    }
    try {
      // One retry for a temporary DNS failure, which happens now and then on serverless hosts.
      let r = await safeRequest(url, { method, maxBytes: 1 }).catch((e) => ((e as NodeJS.ErrnoException)?.code === "EAI_AGAIN" ? safeRequest(url, { method, maxBytes: 1 }) : Promise.reject(e)));
      // Some servers reject HEAD; ask again with GET before calling it an error.
      if (method === "HEAD" && (r.status === 405 || r.status === 501 || r.status === 403)) r = await safeRequest(url, { method: "GET", maxBytes: 1 });
      hops.push({ url, status: r.status, location: r.location, timeMs: r.timeMs });
      if (r.status < 300 || r.status >= 400 || !r.location) break;
      const next = new URL(r.location, url).href;
      if (hops.some((h) => h.url === next)) {
        hops.push({ url: next, status: null, location: null, timeMs: 0, error: "Loop: this URL was already visited." });
        break;
      }
      if (i === MAX_HOPS) hops.push({ url: next, status: null, location: null, timeMs: 0, error: `Stopped after ${MAX_HOPS} redirects.` });
      url = next;
    } catch (e) {
      hops.push({ url, status: null, location: null, timeMs: 0, error: fetchError(e) });
      break;
    }
  }
  return hops;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send a URL to check." }, 400);
  }
  const visitor = visitorId(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown");
  const action = body.action;

  if (action === "redirects") {
    const urls = (Array.isArray(body.urls) ? body.urls : [body.url]).map((u) => String(u ?? "").trim()).filter(Boolean).slice(0, MAX_URLS);
    if (!urls.length) return json({ error: "Enter a URL to check." }, 400);
    for (const u of urls) {
      const p = urlProblem(/^https?:\/\//i.test(u) ? u : `https://${u}`);
      if (p) return json({ error: `${u}: ${p}` }, 400);
    }
    const limited = await allowed(visitor, urls.length);
    if (limited) return json({ error: limited }, 429);
    const results = [];
    for (const u of urls) {
      const hops = await trace(/^https?:\/\//i.test(u) ? u : `https://${u}`, body.method === "GET" ? "GET" : "HEAD");
      results.push({ url: u, hops, ...summariseChain(hops) });
    }
    return json({ results });
  }

  if (action === "canonical") {
    const raw = String(body.url ?? "").trim();
    const start = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const p = urlProblem(start);
    if (p) return json({ error: p }, 400);
    const limited = await allowed(visitor, 1);
    if (limited) return json({ error: limited }, 429);
    const hops = body.follow === false ? [] : await trace(start, "GET");
    const last = hops[hops.length - 1];
    if (last?.error) return json({ error: last.error, hops }, 200);
    const finalUrl = last?.url ?? start;
    try {
      const page = await safeRequest(finalUrl, { method: "GET", maxBytes: 1_500_000 });
      const type = page.headers["content-type"] ?? "";
      if (type && !/html|xml/i.test(type)) return json({ error: `That URL returned ${type.split(";")[0]}, not an HTML page.`, hops }, 200);
      const report = checkCanonical({ html: page.body, pageUrl: finalUrl, expected: typeof body.expected === "string" ? body.expected : undefined, linkHeader: page.headers.link ?? null, status: page.status, live: true });
      return json({ requestedUrl: start, finalUrl, httpStatus: page.status, redirects: Math.max(0, hops.length - 1), linkHeader: page.headers.link ?? null, ...report });
    } catch (e) {
      return json({ error: fetchError(e), hops }, 200);
    }
  }

  return json({ error: "Unknown check." }, 400);
}
