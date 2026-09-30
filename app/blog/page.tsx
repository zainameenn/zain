import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Growth Marketing Blog: SEO, Reddit & SaaS | Zain Ul Abdin",
  description:
    "Practical articles on SEO, Reddit marketing, social media and SaaS growth, written from real client work. What worked, what didn't, and why.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main
      id="top"
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "clamp(96px,14vw,160px) clamp(20px,4vw,48px) clamp(120px,14vw,180px)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Blog</div>
      <h1
        style={{
          margin: "16px 0 0",
          fontFamily: "'General Sans'",
          fontWeight: 600,
          fontSize: "clamp(36px,5vw,56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          color: "#1C1C1C",
        }}
      >
        Writing something worth reading.
      </h1>
      <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
        This page is coming soon. Check back for notes on growth, SEO, Reddit marketing and everything else that goes into doing this as one person.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 32,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          height: 48,
          padding: "0 22px",
          borderRadius: 12,
          background: "#1C1C1C",
          color: "#F8F6F4",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Back to home
      </Link>
    </main>
  );
}
