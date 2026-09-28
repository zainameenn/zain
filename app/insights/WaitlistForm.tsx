"use client";

import { useState } from "react";
import { ArrowIcon } from "../HomeComponents/icons";

export function WaitlistForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p
        role="status"
        style={{
          margin: "32px 0 0",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          height: 56,
          padding: "0 22px",
          borderRadius: 12,
          border: "1px solid #C4A47C",
          fontSize: 16,
          fontWeight: 600,
          color: "#F2EFEA",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C" }} />
        Your email app should have opened — just hit send and you&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = new FormData(form).get("email")?.toString().trim() ?? "";
        const subject = "Add me to the waitlist";
        const body = `Please add this email to the waitlist: ${email}`;
        window.location.href = `mailto:hello@zainameen.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setDone(true);
      }}
      style={{ marginTop: 32, width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 10 }}
      className="sm:!flex-row"
    >
      <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} htmlFor="wl-email">
        Email address
      </label>
      <input
        id="wl-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        style={{
          flex: 1,
          minWidth: 0,
          height: 56,
          padding: "0 18px",
          borderRadius: 12,
          border: "1px solid #3A3935",
          background: "#262523",
          color: "#F2EFEA",
          fontSize: 16,
          fontFamily: "inherit",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          height: 56,
          padding: "0 24px",
          borderRadius: 12,
          border: 0,
          background: "#F2EFEA",
          color: "#1C1C1C",
          fontSize: 16,
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          whiteSpace: "nowrap",
        }}
      >
        Put me on the list
        <ArrowIcon />
      </button>
    </form>
  );
}
