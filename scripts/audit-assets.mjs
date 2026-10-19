// Lists files in public/ that are larger than they should be, and files with the same content.
// Run: npm run audit:assets. Images over 400 KB are almost always worth converting to WebP at quality 90 first.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 400 * 1024;
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const files = walk("public");
let total = 0;
const big = [];
const seen = new Map();
for (const f of files) {
  const size = statSync(f).size;
  total += size;
  if (size > LIMIT) big.push([size, f]);
  const hash = createHash("sha1").update(readFileSync(f)).digest("hex");
  seen.set(hash, [...(seen.get(hash) ?? []), f]);
}
console.log(`public/: ${files.length} files, ${(total / 1048576).toFixed(1)} MB`);
for (const [size, f] of big.sort((a, b) => b[0] - a[0])) console.log(`  large  ${(size / 1024).toFixed(0)} KB  ${f}`);
for (const group of seen.values()) if (group.length > 1) console.log(`  duplicate  ${group.join("  =  ")}`);
if (!big.length) console.log("  No files over 400 KB.");
