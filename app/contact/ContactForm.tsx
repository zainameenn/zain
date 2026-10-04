"use client";

import { useState } from "react";
import { ArrowIcon } from "../HomeComponents/icons";

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
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" style={{ padding: "40px 8px", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
          Almost there.
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 16, color: "#5A5854" }}>
          Your email app should have opened with everything filled in. Just hit send. If nothing opened, email{" "}
          <a href="mailto:hello@zainameen.com" style={{ color: "#1C1C1C", fontWeight: 600, borderBottom: "1.5px solid #1C1C1C" }}>
            hello@zainameen.com
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = data.get("name")?.toString().trim() ?? "";
        const email = data.get("email")?.toString().trim() ?? "";
        const website = data.get("website")?.toString().trim() ?? "";
        const need = data.get("need")?.toString().trim() ?? "";
        const message = data.get("message")?.toString().trim() ?? "";
        const budget = data.get("budget")?.toString().trim() ?? "";

        const subject = `New enquiry: ${need || "General"}, from ${name || "website contact form"}`;
        const body = [
          `Name: ${name}`,
          `Email: ${email}`,
          website && `Company/website: ${website}`,
          `Need: ${need}`,
          budget && `Monthly budget: ${budget}`,
          "",
          "Message:",
          message,
        ]
          .filter(Boolean)
          .join("\n");

        window.location.href = `mailto:hello@zainameen.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
      style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}
      className="sm:!grid-cols-2"
    >
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
          className="max-md:!w-full max-md:!justify-center"
          style={{
            all: "unset",
            boxSizing: "border-box",
            cursor: "pointer",
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
          Send it my way
          <ArrowIcon />
        </button>
        <p style={{ margin: 0, flex: "1 1 240px", fontSize: 13.5, lineHeight: 1.5, color: "#6E6B66" }}>
          I read every message myself and usually reply within a couple of hours. No mailing list surprises.
        </p>
      </div>
    </form>
  );
}
