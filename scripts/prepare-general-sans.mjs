import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatedDir = path.join(root, ".generated");
const fontDir = path.join(root, "public", "fonts", "general-sans");
const generatedModule = path.join(generatedDir, "general-sans.ts");

// Vercel supplies this variable during builds. Local CLI pulls stay in .env.local.
if (!process.env.BLOB_READ_WRITE_TOKEN && existsSync(path.join(root, ".env.local"))) {
  const env = await readFile(path.join(root, ".env.local"), "utf8");
  const match = env.match(/^BLOB_READ_WRITE_TOKEN=(.*)$/m);
  if (match) {
    const value = match[1].trim();
    try {
      process.env.BLOB_READ_WRITE_TOKEN = value.startsWith('"') ? JSON.parse(value) : value.replace(/^'|'$/g, "");
    } catch {
      throw new Error("General Sans: unable to read the Blob token from the ignored local env file.");
    }
  }
}

await mkdir(generatedDir, { recursive: true });
const generate = async (css, preloads) => writeFile(generatedModule,
  `// Generated during dev/build. Font files and credentials are never committed.\nexport const generalSansCss = ${JSON.stringify(css)};\nexport const generalSansPreloads: string[] = ${JSON.stringify(preloads)};\n`);

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  await generate("", []);
  console.log("General Sans: private Blob token absent; using the sized fallback.");
} else {
  const manifest = JSON.parse(await readFile(path.join(root, "scripts", "general-sans-assets.json"), "utf8"));
  if (manifest.fonts.length !== 4 || [400, 500, 600, 700].some((weight) => !manifest.fonts.some((font) => font.weight === weight)) || !manifest.license) {
    throw new Error("General Sans: configure the four original font files and license in the asset manifest.");
  }
  await mkdir(fontDir, { recursive: true });
  for (const asset of [...manifest.fonts, manifest.license]) {
    const source = new URL(asset.url);
    if (source.protocol !== "https:" || !source.hostname.endsWith(".private.blob.vercel-storage.com") || path.basename(asset.filename) !== asset.filename) {
      throw new Error("General Sans: invalid private Blob asset configuration.");
    }
    const response = await fetch(source, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`General Sans: asset download failed (HTTP ${response.status}).`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (asset.weight && bytes.subarray(0, 4).toString("ascii") !== "wOF2") throw new Error("General Sans: expected an unmodified WOFF2 font.");
    if (createHash("sha256").update(bytes).digest("hex") !== asset.sha256) throw new Error("General Sans: downloaded asset does not match the original file.");
    await writeFile(path.join(fontDir, asset.filename), bytes);
  }
  const urlFor = (font) => `/fonts/general-sans/${encodeURIComponent(font.filename)}`;
  const css = manifest.fonts.map((font) => `@font-face{font-family:'General Sans';font-style:normal;font-weight:${font.weight};font-display:swap;src:url('${urlFor(font)}') format('woff2');}`).join("\n");
  // The mobile hero uses General Sans 600. Its paragraph uses Geist; its accent uses Instrument Serif.
  await generate(css, manifest.fonts.filter((font) => font.weight === 600).map(urlFor));
  console.log("General Sans: verified four original WOFF2 files and the license from private Blob.");
}
