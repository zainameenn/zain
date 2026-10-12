// Server only: the one place the tools talk to Google's Gemini API.
// Plain fetch to the REST endpoint, so there's no SDK, no extra dependencies and no install scripts.
// The key comes from GEMINI_API_KEY and is never sent to the browser.

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const TIMEOUT_MS = 55_000;
/** Finish reasons that mean Google's safety filters stopped the reply. */
const BLOCKED = new Set(["SAFETY", "PROHIBITED_CONTENT", "BLOCKLIST", "SPII", "RECITATION", "IMAGE_SAFETY"]);

export type Turn = { role: "user" | "model"; text: string };

/** A failed call. `status` is the HTTP status (429 means Google's own quota or rate limit). */
export class ModelError extends Error {
  constructor(public status: number) {
    super(`Gemini request failed with status ${status}`);
  }
}

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
};

/** One generateContent call. Returns the reply text, or blocked: true when a safety filter stopped it. */
export async function generate({ model, system, turns, maxOutputTokens }: { model: string; system: string; turns: Turn[]; maxOutputTokens: number }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ModelError(500);
  const res = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
      // JSON mode: the core prompt already asks for JSON only; this makes Gemini hold to it.
      generationConfig: { maxOutputTokens, responseMimeType: "application/json" },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new ModelError(res.status);
  const data = (await res.json()) as GeminiResponse;
  const candidate = data.candidates?.[0];
  const blocked = !!data.promptFeedback?.blockReason || BLOCKED.has(candidate?.finishReason ?? "");
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought)
    .map((p) => p.text ?? "")
    .join("");
  return { text, blocked };
}
