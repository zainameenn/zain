import { lookup as dnsLookup, type LookupAddress } from "node:dns";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";

// Server only. Fetches one public URL for the canonical and redirect checkers without letting a
// visitor reach private networks:
// - http and https on ports 80 and 443 only, no credentials in the URL, no cookies sent;
// - every address a hostname resolves to is checked when the connection is made (so DNS rebinding
//   can't swap in a private address after the check), and IP literals are checked directly;
// - redirects are never followed here: the caller gets the Location and checks the next hop again;
// - short timeouts and a hard cap on the bytes read.

export class FetchBlocked extends Error {}

const v4 = (ip: string) => ip.split(".").map(Number);

/** True for loopback, private, link local, carrier grade NAT, multicast, reserved and cloud metadata addresses. */
export function isPrivateIp(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) {
    const [a, b, c] = v4(ip);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0 && (c === 0 || c === 2)) ||
      (a === 198 && (b === 18 || b === 19)) ||
      (a === 198 && b === 51 && c === 100) ||
      (a === 203 && b === 0 && c === 113)
    );
  }
  if (kind === 6) {
    const x = ip.toLowerCase().replace(/^\[|\]$/g, "");
    const mapped = x.match(/^(?:0*:)*:?ffff:(\d+\.\d+\.\d+\.\d+)$/) ?? x.match(/^::(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIp(mapped[1]);
    if (/^::ffff:[0-9a-f]{1,4}:[0-9a-f]{1,4}$/.test(x)) return true; // hex form of a mapped IPv4: refuse
    return x === "::" || x === "::1" || /^f[cd]/.test(x) || /^fe[89ab]/.test(x) || /^ff/.test(x) || x.startsWith("64:ff9b:") || x.startsWith("2001:db8") || x.startsWith("100::");
  }
  return true;
}

/** Checks a URL before any request is made. Returns a reason when it isn't allowed. */
export function urlProblem(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return "That isn't a valid URL. Include https://.";
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return "Only http and https URLs can be checked.";
  if (u.username || u.password) return "URLs with a username or password can't be checked.";
  if (u.port && u.port !== "80" && u.port !== "443") return "Only the standard ports (80 and 443) can be checked.";
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host) && isPrivateIp(host)) return "That address is on a private network, so it can't be checked.";
  if (/^(localhost|.*\.localhost|.*\.local|.*\.internal|.*\.home\.arpa|metadata\.google\.internal)$/i.test(host)) return "That host is on a private network, so it can't be checked.";
  if (!isIP(host) && !host.includes(".")) return "Use a full public domain name.";
  return null;
}

type Lookup = (hostname: string, options: object, cb: (err: NodeJS.ErrnoException | null, address: string | LookupAddress[], family?: number) => void) => void;

/** DNS lookup that refuses private addresses. Used by the socket itself, so the checked address is the one connected to. */
const guardedLookup: Lookup = (hostname, options, cb) => {
  dnsLookup(hostname, { all: true }, (err, addresses) => {
    if (err) return cb(err, "", 4);
    const list = addresses as LookupAddress[];
    if (!list.length || list.some((a) => isPrivateIp(a.address))) return cb(new FetchBlocked("That host resolves to a private network address, so it can't be checked."), "", 4);
    if ((options as { all?: boolean }).all) return cb(null, list);
    cb(null, list[0].address, list[0].family);
  });
};

export type Fetched = { status: number; location: string | null; headers: Record<string, string>; body: string; timeMs: number };

export function safeRequest(url: string, opts: { method?: "GET" | "HEAD"; maxBytes?: number; timeoutMs?: number } = {}): Promise<Fetched> {
  const problem = urlProblem(url);
  if (problem) return Promise.reject(new FetchBlocked(problem));
  const u = new URL(url);
  const lib = u.protocol === "https:" ? https : http;
  const maxBytes = opts.maxBytes ?? 1_000_000;
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const req = lib.request(
      u,
      {
        method: opts.method ?? "GET",
        lookup: guardedLookup as unknown as typeof dnsLookup,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ZainAmeenToolsChecker/1.0; +https://www.zainameen.com/tools)", Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5", "Accept-Encoding": "identity" },
        timeout: opts.timeoutMs ?? 8000,
        agent: false,
      },
      (res) => {
        const headers: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.headers)) if (v !== undefined) headers[k] = Array.isArray(v) ? v.join(", ") : v;
        const chunks: Buffer[] = [];
        let size = 0;
        const done = () => resolve({ status: res.statusCode ?? 0, location: headers.location ?? null, headers, body: Buffer.concat(chunks).toString("utf8"), timeMs: Date.now() - started });
        if (opts.method === "HEAD" || (res.statusCode ?? 0) >= 300) {
          res.resume();
          return done();
        }
        res.on("data", (c: Buffer) => {
          size += c.length;
          if (size > maxBytes) {
            chunks.push(c.subarray(0, Math.max(0, c.length - (size - maxBytes))));
            res.destroy();
            done();
            return;
          }
          chunks.push(c);
        });
        res.on("end", done);
        res.on("error", () => done());
      },
    );
    req.on("timeout", () => req.destroy(new Error("The site took too long to respond.")));
    req.on("error", reject);
    req.end();
  });
}

/** Human readable reason for a failed request, without leaking internals. */
export function fetchError(e: unknown): string {
  if (e instanceof FetchBlocked) return e.message;
  const code = (e as NodeJS.ErrnoException)?.code;
  if (code === "ENOTFOUND" || code === "EAI_AGAIN") return "The domain couldn't be found.";
  if (code === "ECONNREFUSED") return "The server refused the connection.";
  if (code === "ECONNRESET") return "The server closed the connection.";
  if (code && code.startsWith("ERR_TLS") || code === "CERT_HAS_EXPIRED" || code === "DEPTH_ZERO_SELF_SIGNED_CERT" || code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE") return "The site's HTTPS certificate couldn't be verified.";
  if (String((e as Error)?.message).includes("too long")) return "The site took too long to respond.";
  return "The site couldn't be reached.";
}
