// Live check of the six AI tools: runs each example input through the model and the validators.
// Run: node --import tsx scripts/eval-tools-v3.ts [slug]   (reads OPENROUTER_API_KEY from .env.local)
import { readFileSync } from "node:fs";
import { V3_TOOLS } from "../lib/tools/v3/fields";
import { completeJson } from "../lib/tools/v3/openrouter";
import { SPECS, SYSTEM, cleanInput } from "../lib/tools/v3/specs";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

async function main() {
  for (const [slug, tool] of Object.entries(V3_TOOLS)) {
    if (process.argv[2] && slug !== process.argv[2]) continue;
    const c = cleanInput(slug, { ...Object.fromEntries(tool.fields.filter((f) => f.defaultValue).map((f) => [f.key, f.defaultValue!])), ...tool.example });
    if ("error" in c) throw new Error(c.error);
    const spec = SPECS[slug];
    const t0 = Date.now();
    try {
      const raw = await completeJson({ system: SYSTEM, user: `${spec.task}\n\n<user_input>\n${JSON.stringify(c.input)}\n</user_input>`, schemaName: slug.replace(/-/g, "_"), schema: spec.schema, maxTokens: spec.maxTokens });
      const v = spec.validate(raw, c.input);
      console.log(`\n== ${slug} (${Date.now() - t0} ms) ${v.ok ? "OK" : "INVALID " + v.reason}`);
      console.log(JSON.stringify(v.ok ? v.value : raw).slice(0, 900));
    } catch (e) {
      console.log(`\n== ${slug} ERROR`, e instanceof Error ? e.message : e);
    }
  }
}
main();
