import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Fetches a page for the SEO title and meta description tools. Server only.
// SSRF guard: only http and https, every hop must resolve to a public address, at most 3 redirects,
// an 8 second timeout, a 1.5 MB cap, and HTML only.

function isPrivate(ip: string): boolean {
  if (isIP(ip) === 6) {
    const v = ip.toLowerCase();
    if (v === "::1" || v === "::" || v.startsWith("fe80") || v.startsWith("fc") || v.startsWith("fd")) return true;
    const mapped = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    return mapped ? isPrivate(mapped[1]) : false;
  }
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

async function assertPublic(url: URL) {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only http and https.");
  if (url.username || url.password) throw new Error("No credentials in URLs.");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (!addrs.length || addrs.some((a) => isPrivate(a.address))) throw new Error("Blocked host.");
}

export async function fetchPageContent(rawUrl: string): Promise<string> {
  let url = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
  let res: Response | null = null;
  for (let hop = 0; hop <= 3; hop++) {
    await assertPublic(url);
    res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(8000), headers: { "user-agent": "zainameen-tools/1.0 (+https://www.zainameen.com/tools)" } });
    const next = res.status >= 300 && res.status < 400 ? res.headers.get("location") : null;
    if (!next) break;
    if (hop === 3) throw new Error("Too many redirects.");
    url = new URL(next, url);
  }
  if (!res || !res.ok || !(res.headers.get("content-type") ?? "").includes("text/html")) throw new Error("Not an HTML page.");
  let html = "";
  const reader = res.body?.getReader();
  if (reader) {
    const dec = new TextDecoder();
    for (let size = 0; size < 1_500_000; ) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      html += dec.decode(value, { stream: true });
    }
    await reader.cancel().catch(() => undefined);
  }
  const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const title = strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const h1 = strip(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const body = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<nav[\s\S]*?<\/nav>|<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return `Current title: ${title}\nH1: ${h1}\nPage text: ${body.slice(0, 15000)}`;
}
