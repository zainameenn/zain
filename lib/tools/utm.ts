// UTM Link Builder logic. Runs fully in the browser: no API, nothing sent anywhere.

export const UTM_KEYS = ["source", "medium", "campaign", "content", "term", "id"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmValues = Record<UtmKey, string>;

/** Lowercase, spaces to underscores, only letters, numbers, underscores and periods. */
export function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_.]/g, "");
}

/** Adds https:// when missing. Returns null for anything that isn't a valid web URL. */
export function parseUrl(raw: string): URL | null {
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    return url;
  } catch {
    return null;
  }
}

/** Replaces any existing utm_ parameters, keeps other query parameters and puts everything before the #fragment. */
export function buildUtmUrl(url: URL, values: UtmValues): string {
  const out = new URL(url.toString());
  for (const key of UTM_KEYS) out.searchParams.delete(`utm_${key}`);
  for (const key of UTM_KEYS) if (values[key]) out.searchParams.set(`utm_${key}`, values[key]);
  return out.toString();
}

const SEARCH = ["google", "bing", "yahoo", "duckduckgo", "baidu", "yandex", "ecosia"];
const SOCIAL = ["facebook", "fb", "instagram", "ig", "linkedin", "x", "twitter", "tiktok", "youtube", "reddit", "pinterest", "threads", "snapchat", "quora"];
const isOne = (value: string, list: string[]) => list.some((s) => value === s || value.startsWith(`${s}.`) || value.startsWith(`${s}_`));

/** Likely GA4 default channel for a source and medium. An estimate, never a guarantee. */
export function likelyChannel(source: string, medium: string): string {
  const m = medium;
  if (["cpc", "ppc", "paid_search", "paidsearch", "retargeting"].includes(m)) return isOne(source, SOCIAL) ? "Paid Social" : isOne(source, SEARCH) ? "Paid Search" : "Paid Other";
  if (["paid_social", "paidsocial", "social_paid"].includes(m)) return "Paid Social";
  if (["social", "social_network", "social_media", "sm", "social-network", "social-media"].includes(m)) return "Organic Social";
  if (["email", "e_mail", "e-mail", "e mail"].includes(m)) return "Email";
  if (m === "referral") return "Referral";
  if (m === "affiliate") return "Affiliates";
  if (["display", "banner", "cpm", "interstitial", "expandable"].includes(m)) return "Display";
  if (m === "organic") return isOne(source, SOCIAL) ? "Organic Social" : "Organic Search";
  return "Unassigned";
}

/** Minimal CSV parser: commas, quoted fields with "" escapes, CRLF or LF. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((f) => f.trim())) rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim())) rows.push(row);
  return rows;
}

const csvCell = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
export const toCsv = (rows: string[][]) => rows.map((r) => r.map(csvCell).join(",")).join("\r\n");

/** Starts a file download in the browser. */
export function download(name: string, content: string | Blob, type = "text/csv;charset=utf-8") {
  const blob = typeof content === "string" ? new Blob([content], { type }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** GA4 friendly medium presets. "Custom" shows a free text field and a warning. */
export const UTM_MEDIUMS = ["social", "paid_social", "cpc", "email", "referral", "affiliate", "display", "organic"];
/** Suggestions for the source field. */
export const UTM_SOURCES = ["linkedin", "facebook", "instagram", "x", "tiktok", "youtube", "reddit", "pinterest", "google", "bing", "newsletter"];
