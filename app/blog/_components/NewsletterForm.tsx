"use client";

import { useId, useState } from "react";
import { ArrowIcon } from "@/app/HomeComponents/icons";

type State = { kind: "idle" | "loading" | "success" | "error"; message?: string };

/** Newsletter signup. Posts to /api/subscribe and only shows success when the email was really saved. */
export function NewsletterForm({ source = "blog" }: { source?: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const id = useId();

  if (state.kind === "success") {
    return (
      <p
        role="status"
        style={{ margin: "32px 0 0", display: "inline-flex", alignItems: "center", gap: 10, minHeight: 56, padding: "12px 22px", borderRadius: 12, border: "1px solid #C4A47C", fontSize: 16, fontWeight: 600, color: "#F2EFEA", textAlign: "left" }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
        {state.message}
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = String(data.get("email") ?? "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          setState({ kind: "error", message: "That email doesn't look right. Mind checking it?" });
          return;
        }
        setState({ kind: "loading" });
        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, company: data.get("company"), source }),
          });
          const json = (await res.json().catch(() => ({}))) as { status?: string; message?: string };
          if (json.status === "subscribed") setState({ kind: "success", message: "You're on the list. I'll email you when there's something worth reading." });
          else if (json.status === "duplicate") setState({ kind: "success", message: "You're already on the list. Nice." });
          else setState({ kind: "error", message: json.message ?? "Something went wrong. Please try again." });
        } catch {
          setState({ kind: "error", message: "Couldn't reach the server. Check your connection and try again." });
        }
      }}
      style={{ marginTop: 32, width: "100%", maxWidth: 560 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="sm:!flex-row">
        <label htmlFor={`${id}-email`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          aria-invalid={state.kind === "error" || undefined}
          aria-describedby={state.kind === "error" ? `${id}-msg` : undefined}
          style={{ flex: 1, minWidth: 0, height: 56, padding: "0 18px", borderRadius: 12, border: `1px solid ${state.kind === "error" ? "#E0673F" : "#3A3935"}`, background: "#262523", color: "#F2EFEA", fontSize: 16, fontFamily: "inherit" }}
        />
        {/* Honeypot for bots. Hidden from people and screen readers. */}
        <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
        <button
          type="submit"
          disabled={state.kind === "loading"}
          style={{ height: 56, padding: "0 24px", borderRadius: 12, border: 0, background: "#F2EFEA", color: "#1C1C1C", fontSize: 16, fontWeight: 600, fontFamily: "inherit", cursor: state.kind === "loading" ? "wait" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, whiteSpace: "nowrap", opacity: state.kind === "loading" ? 0.7 : 1 }}
        >
          {state.kind === "loading" ? "Adding you..." : "Get the good stuff"}
          {state.kind === "loading" ? null : <ArrowIcon />}
        </button>
      </div>
      <p id={`${id}-msg`} role="alert" style={{ margin: state.kind === "error" ? "12px 0 0" : 0, fontSize: 14.5, lineHeight: 1.5, color: "#F0A58A", textAlign: "left" }}>
        {state.kind === "error" ? state.message : ""}
      </p>
    </form>
  );
}
