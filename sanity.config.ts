"use client";

// Sanity Studio, embedded in the site at /studio (see app/studio/[[...tool]]/page.tsx).
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { table } from "@sanity/table";
import { apiVersion, dataset, projectId, studioUrl } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { resolve } from "./sanity/presentation/resolve";

export default defineConfig({
  name: "default",
  title: "Zain Ul Abdin",
  basePath: studioUrl,
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // "Presentation" shows drafts on the real site layout before publishing.
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    table(),
    // Query playground for troubleshooting. Harmless for editors.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
