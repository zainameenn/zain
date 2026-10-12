import { VisualEditing } from "next-sanity/visual-editing";
import { isPreviewing } from "@/sanity/lib/fetch";

/** Only renders while previewing drafts from the Studio. Visitors never get this code or the banner. */
export async function PreviewBanner() {
  if (!(await isPreviewing())) return null;
  return (
    <>
      <div
        className="preview-banner"
        role="status"
        style={{ position: "fixed", left: 16, bottom: 16, zIndex: 90, display: "flex", alignItems: "center", gap: 12, padding: "10px 12px 10px 16px", borderRadius: 12, background: "#1C1C1C", color: "#F2EFEA", fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,.18)" }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E0673F" }} />
        Preview: you are seeing drafts
        <form action="/api/draft-mode/disable" method="post">
          <button type="submit" style={{ height: 32, padding: "0 12px", borderRadius: 8, border: "1px solid #3A3935", background: "transparent", color: "#F2EFEA", fontSize: 13.5, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
            Exit preview
          </button>
        </form>
      </div>
      <VisualEditing />
    </>
  );
}
