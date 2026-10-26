// Tool analytics through the site's existing Google Analytics tag. Only the tool slug and the event
// type are sent, never anything the visitor typed.

type Gtag = (cmd: "event", name: string, params: Record<string, string | number>) => void;

export function track(event: "tool_generate" | "tool_success" | "tool_error" | "tool_copy" | "tool_regenerate" | "tool_edit" | "tool_download" | "tool_calculate", slug: string, extra: Record<string, string | number> = {}) {
  try {
    (window as unknown as { gtag?: Gtag }).gtag?.("event", event, { tool: slug, ...extra });
  } catch {}
}

export function downloadFile(name: string, text: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** One CSV cell. Values that a spreadsheet would run as a formula get a leading apostrophe. */
export const csvCell = (v: unknown) => {
  const text = String(v ?? "");
  return `"${(/^[=+\-@\t\r]/.test(text) ? `'${text}` : text).replace(/"/g, '""')}"`;
};
