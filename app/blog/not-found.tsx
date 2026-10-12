import Link from "next/link";
import { ArrowIcon } from "@/app/HomeComponents/icons";

// Shown (with a 404 status) when an article, category or author doesn't exist or isn't published.
export default function BlogNotFound() {
  return (
    <main id="top" style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(20px,2.5vw,32px)", textAlign: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>404</div>
      <h1 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(2rem, calc(2.6vw + 1.25rem), 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}>
        This article isn&apos;t here.{" "}
        <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>It may have moved.</em>
      </h1>
      <p style={{ margin: "20px auto 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#4E4C48" }}>The link might be old or mistyped. Everything that&apos;s published is on the blog.</p>
      <Link href="/blog" style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
        Go to the blog
        <ArrowIcon />
      </Link>
    </main>
  );
}
