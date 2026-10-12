import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// The Studio is a single-page app: Next.js serves one static shell and the Studio handles its own routes.
export const dynamic = "force-static";

// noindex, plus the viewport settings the Studio needs.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Covers the site header and footer so the Studio gets the whole screen.
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#fff" }}>
      <NextStudio config={config} />
    </div>
  );
}
