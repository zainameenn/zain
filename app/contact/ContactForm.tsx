"use client";

import { useRef, useState } from "react";
import { ArrowIcon } from "../HomeComponents/icons";

// Web3Forms access key. Web3Forms marks it as public and safe in browser code;
// it only lets someone send a message to the inbox set up for this form.
const WEB3FORMS_KEY = "f4dcf36a-96c0-409e-a150-212b775a919c";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ERROR_TEXT = "That didn't go through. Your message is still here, so please try again, or email hello@zainameen.com directly.";

type Status = "idle" | "sending" | "sent";

/** Checks the fields the browser can miss, like a name that's only spaces. Returns an error message or null. */
function validate(data: FormData): string | null {
  const get = (k: string) => data.get(k)?.toString().trim() ?? "";
  if (!get("name") || !get("need") || !get("message")) return "Please fill in your name, what you need help with and what's going on.";
  if (!EMAIL_RE.test(get("email"))) return "Please check your email address. It looks incomplete.";
  return null;
}

/** Builds the Web3Forms payload with readable field names, leaving out empty optional fields. */
function toPayload(data: FormData): FormData {
  const get = (k: string) => data.get(k)?.toString().trim() ?? "";
  const need = get("need");
  const out = new FormData();
  out.append("access_key", WEB3FORMS_KEY);
  out.append("subject", `New Portfolio Inquiry: ${need}`);
  out.append("from_name", "zainameen.com contact form");
  out.append("replyto", get("email"));
  out.append("Name", get("name"));
  out.append("Email", get("email"));
  if (get("website")) out.append("Company or website", get("website"));
  out.append("Needs help with", need);
  out.append("What's going on", get("message"));
  if (get("budget")) out.append("Monthly budget", get("budget"));
  out.append("Submitted at", new Date().toISOString());
  out.append("Source page", window.location.href);
  // Honeypot: hidden from people, so only bots tick it. Web3Forms rejects submissions where it's set.
  out.append("botcheck", data.get("botcheck") ? "true" : "");
  return out;
}

const fieldStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: 52,
  padding: "0 16px",
  borderRadius: 12,
  border: "1px solid #D6D1C7",
  background: "#FBFBF9",
  font: "inherit",
  fontSize: 16,
  color: "#1C1C1C",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...fieldStyle,
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage:
    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path d=%22M2 4.5L6 8.5L10 4.5%22 stroke=%22%231C1C1C%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
  paddingRight: 40,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: 13.5,
  fontWeight: 600,
  color: "#1C1C1C",
};

const focusClass =
  "focus:border-[#1C1C1C] focus:shadow-[0_0_0_3px_rgba(196,164,124,.35)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Blocks a second submit before React re-renders the disabled button (fast double clicks).
  const busy = useRef(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const invalid = validate(data);
    if (invalid) {
      setError(invalid);
      return;
    }

    busy.current = true;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: toPayload(data),
        signal: AbortSignal.timeout(20000),
      });
      const json = await res.json().catch(() => null);
      // Only count it as sent once Web3Forms confirms it accepted the message.
      if (res.ok && json?.success === true) {
        form.reset();
        setStatus("sent");
        return;
      }
      setStatus("idle");
      setError(ERROR_TEXT);
    } catch {
      setStatus("idle");
      setError(ERROR_TEXT);
    } finally {
      busy.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div role="status" style={{ padding: "40px 8px", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
          Got it, thanks.
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 16, color: "#5A5854" }}>
          Your message is with me. I usually reply within a couple of hours, straight to the email you gave. If it&apos;s urgent, email{" "}
          <a href="mailto:hello@zainameen.com" style={{ color: "#1C1C1C", fontWeight: 600, borderBottom: "1.5px solid #1C1C1C" }}>
            hello@zainameen.com
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={sending}
      style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}
      className="sm:!grid-cols-2"
    >
      {/* Spam honeypot: invisible and skipped by keyboard and screen readers, so only bots fill it. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <div>
        <label htmlFor="cf-name" style={labelStyle}>Name</label>
        <input id="cf-name" name="name" required autoComplete="name" style={fieldStyle} className={focusClass} />
      </div>
      <div>
        <label htmlFor="cf-email" style={labelStyle}>Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" style={fieldStyle} className={focusClass} />
      </div>
      <div>
        <label htmlFor="cf-site" style={labelStyle}>
          Company or website <span style={{ fontWeight: 400, color: "#6F6B64" }}>(optional)</span>
        </label>
        <input id="cf-site" name="website" autoComplete="url" style={fieldStyle} className={focusClass} />
      </div>
      <div>
        <label htmlFor="cf-need" style={labelStyle}>What do you need help with?</label>
        <select id="cf-need" name="need" required style={selectStyle} className={focusClass} defaultValue="">
          <option value="">Choose one</option>
          <option>Free social media check</option>
          <option>Growth strategy and GTM</option>
          <option>SEO</option>
          <option>Reddit marketing</option>
          <option>Social media management</option>
          <option>Content and design</option>
          <option>Google and Meta ads</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="cf-msg" style={labelStyle}>What&apos;s going on?</label>
        <textarea
          id="cf-msg"
          name="message"
          required
          rows={6}
          placeholder="Tell me what you're working on, what's stuck and what you've already tried. A few lines is plenty."
          style={{ ...fieldStyle, height: "auto", minHeight: 160, padding: "14px 16px", lineHeight: 1.55, resize: "vertical" }}
          className={focusClass}
        />
      </div>
      <div>
        <label htmlFor="cf-budget" style={labelStyle}>
          Monthly budget <span style={{ fontWeight: 400, color: "#6F6B64" }}>(optional)</span>
        </label>
        <select id="cf-budget" name="budget" style={selectStyle} className={focusClass} defaultValue="">
          <option value="">Choose one</option>
          <option>Under $500</option>
          <option>$500 to $1,500</option>
          <option>$1,500 to $3,000</option>
          <option>$3,000+</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 20px", paddingTop: 4 }}>
        <button
          type="submit"
          disabled={sending}
          className="max-md:!w-full max-md:!justify-center"
          style={{
            all: "unset",
            boxSizing: "border-box",
            cursor: sending ? "wait" : "pointer",
            opacity: sending ? 0.7 : 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            height: 56,
            padding: "0 26px",
            borderRadius: 12,
            background: "#1C1C1C",
            color: "#F8F6F4",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {sending ? "Sending..." : "Send it my way"}
          <ArrowIcon />
        </button>
        <p style={{ margin: 0, flex: "1 1 240px", fontSize: 13.5, lineHeight: 1.5, color: "#6E6B66" }}>
          I read every message myself and usually reply within a couple of hours. No mailing list surprises.
        </p>
      </div>
      {error && (
        <p role="alert" style={{ gridColumn: "1 / -1", margin: "-4px 0 0", fontSize: 14, lineHeight: 1.5, fontWeight: 500, color: "#A23B2A" }}>
          {error}
        </p>
      )}
    </form>
  );
}
