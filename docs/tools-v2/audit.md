# Free tools v2: audit (Phase 0)

## What existed before v2
- 23 tools on the shared studio layout (`app/tools/_studio`): BioStudio (5 bio tools), CaptionStudio with skins (caption, title, description, LinkedIn, SEO, Etsy, product tools), and the legacy ToolWorkspace (marketing plan, content calendar, UTM builder).
- One API route, `app/api/tools/route.ts`, calling Gemini through `lib/tools/gemini.ts` (`generateWithFallback`) with per family prompts in `lib/tools/families/*`.
- Most tools returned several options per run (3 to 5). Forms came from per family field lists in `lib/tools/registry.ts`.
- No uploads, no refine, no custom instruction. UTM builder already ran in the browser.

## What v2 changes
- One registry, `lib/tools/v2/prompts.json` (copied from the Prompt Pack v2), drives prompts, fields, limits, chips and examples for all 23 tools.
- New endpoint `app/api/tools/v2/route.ts` plus `lib/tools/v2/generate.ts`: one result per generation, JSON schema output, one repair pass, model fallback chain with a 25s per call timeout.
- New client `app/tools/_studio/V2Tool.tsx`: form from registry fields (basic plus "More options"), accessible combobox, uploads (resized in the browser, never stored), one result card with counter, tip, Copy, Regenerate (last 3 outputs avoided) and Refine with chips.
- Calendar dates are computed in code (`computeCalendarSlots`) and merged with the model's posts by `slot_id`. CSV export.
- SEO tools can read a page URL through a hardened fetch (`lib/tools/v2/page-fetch.ts`).
- UTM builder is deterministic (`buildUtmUrl`), no AI call.

## Left in place
- The old route, families and studios stay in the repo (unused by the pages once v2 is wired) so a rollback is one line in `StudioPage.tsx`. They can be deleted after v2 has been live for a while.

## Risks found
- `gemini-3.8-flash` timed out (60 to 90s) in tests, so the chain falls back to `gemini-3.6-flash`. Set `TOOLS_MODELS` to change the order.
- `marketing-plan` and `social-calendar` have no example input in the registry, so "Try an example" is hidden on those two.
