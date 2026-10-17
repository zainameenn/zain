# Free tools: progress

## Phase 0 findings
- Next.js 16.3 App Router, React 19, TypeScript, pnpm. Deploys on Vercel from `master`. Branch: `tools`.
- Styling: inline styles + Tailwind v4 utilities; CSS modules for bigger pages. No UI library.
- Colors reused: bg #EEEDE7, text #1C1C1C, body #4E4C48 / #5A5854, muted #6F6B64, gold #C4A47C / #D3AE82 / #7D6039, border #D6CFC2 / #DDDAD3, card #F4F0E8, red #A4472A / #A23B2A, slate #4F5A59.
- Fonts: Geist (body), General Sans `var(--nf-general-sans)` (headings), Instrument Serif italic `var(--nf-serif)` (accents). Headings: `app/HomeComponents/heading.ts`.
- Metadata: `buildMetadata` in `lib/seo.ts`. JSON-LD via `JsonLd` + `breadcrumbList` in `app/blog/_components/JsonLd.tsx`. CTA: `BlogCta` in `app/blog/_components/parts.tsx`.
- Project rules (CLAUDE.md): no em/en dashes, never "freelance", branch only, IndexNow once after live.

## Architecture (built)
- Spec: `docs/tools-spec.md`.
- `lib/tools/types.ts` page/result shapes. `lib/tools/links.ts` every [link] as a constant (null = hidden TODO), FAIR_USE, BUSY_MESSAGE.
- `lib/tools/core.ts` shared core prompt. `lib/tools/blocks.ts` 13 prompt blocks + calendar slot logic. `lib/tools/validate.ts` grapheme counts, limits, retry text, near duplicates. `lib/tools/utm.ts` client side UTM logic.
- Families: `lib/tools/families/{bio,caption,title,common}.ts`. Singles: `lib/tools/pages/{planning,seo,ecommerce,linkedin}.ts`. `lib/tools/registry.ts` collects all 23 + hub groups.
- `app/tools/[slug]/page.tsx` one template (metadata, BreadcrumbList + WebApplication + FAQPage JSON-LD). `app/tools/page.tsx` hub. `app/api/tools/route.ts` one route for all AI tools.
- Client: `app/tools/_components/{ToolWorkspace,Results,CalendarResult,PlanResult,UtmBuilder,ui,fill}.tsx`; server helpers in `content.tsx`.
- Sitemap: /tools + every tool. "Free Tools" in Navbar NAV_LINKS and Footer "Explore".
- Models: claude-haiku-5-5 (fast) / claude-sonnet-5-5 (strong, calendar + plan). Temperatures kept as data only (current models reject them). effort "low". maxDuration 60.

## Status
- [x] All 23 pages + hub written as configs (Phase 1 + 2).
- [ ] pnpm install blocked: committed lockfile has i18next@26.4.4 (published 2026-10-12 07:04 UTC) and pnpm's 1 day minimumReleaseAge. Clears 2026-10-13 07:04 UTC. Don't hand edit the lockfile or rebuild it.
- [ ] After 12:04 PKT: `pnpm install`, `pnpm add @anthropic-ai/sdk qrcode-generator`, start `pnpm dev`, send Zain localhost links to /tools/instagram-bio-generator, /tools and /tools/social-media-content-calendar-generator. Then STOP for design review.
- [ ] Design changes: shared template (`app/tools/[slug]/page.tsx`, `_components`) and `tools.module.css` only, never page configs.
- [ ] After Zain approves: `pnpm build`, `pnpm lint`, fix, test every page, commit + push `tools` (never merge).
- [ ] Vercel Firewall rule for /api/tools (10 req / 60 s / IP) and ANTHROPIC_API_KEY env var: Zain.
- i18next pin removed from pnpm-workspace.yaml. Install retried 2026-10-12 19:00 UTC: still blocked.
- TEMPORARY, DO NOT COMMIT: `i18next@26.4.4` added to `minimumReleaseAgeExclude` in pnpm-workspace.yaml so install could run early. Remove it after 12:04 PKT on Oct 13 (07:04 UTC), then run `pnpm install` once to confirm the age check passes without it. Leave pnpm-workspace.yaml out of the commit until then.
- Installed: `@anthropic-ai/sdk` 0.133.0 and `qrcode-generator` 2.0.4 (package.json + pnpm-lock.yaml changed; existing package versions unchanged, only peer suffixes moved). No other package blocked.
- Instagram bio v2 (docs/copy/instagram-bio-generator.md, saved from Zain's paste): copy + SEO + 6 profile examples + 9 FAQs in `lib/tools/families/bio-instagram.ts`, merged over the bio family via `page`. Shared bio fields now: mode tabs (new/improve), account type, keywords, location, current bio (Improve only), Aesthetic vibe, Nothing as next step, language. Other bio pages keep their copy but get these fields.
- New bio prompt block (section 10) with name_ideas checked against name_field_limit (Instagram 30, others empty) and the same single retry. Shorter and Funnier rewrites wired.
- `ProfilePreview` (client) + `ProfileMockup` (pure, also used in example cards). Demo cycle, typing, pause on hover/focus, reduced motion, sticky on desktop, collapsible on mobile, light/dark toggle. Skins via `skin_<platform>` CSS class.
- Design pass 1 (shared template + CSS only): 55/45 workspace from 1024px, preview centered (max 320px) above the results, FieldShell wrapper + automatic form groups (32px with divider), full width mode tabs, centered H2s (900px) and intros (680px), 96/64px section spacing, list markers restored. Checked with headless Edge at 1440/1024/768 (headless cannot go below about 500px wide).
- Known issue (not fixed, outside tools): header overflows at 768 to about 830px since adding the "Free Tools" link.
- tsc passes. Dev server running at http://localhost:3000. Local headings use the Arial fallback (no Blob token for General Sans). Waiting for Zain's design review.
- Nothing committed yet (commit only after build + lint pass).

## Round 3 edits (Zain, 2026-10-12)
- Eplie removed everywhere: comment page panel, optional post page panel, links.ts constants, docs/tools-spec.md. Comment page has one CTA ("Need help planning useful content and conversations?", button to /services).
- New meta titles: YouTube and Pinterest descriptions, marketing plan, UTM, Etsy, LinkedIn headline, LinkedIn comment.
- Caption/description family meta description no longer has the hashtag rule token.
- First H2s now "How to use the ...": calendar, marketing plan, UTM builder, Etsy.
- Slug: /tools/linkedin-about-section-generator.
- UTM access note: "Free and unlimited. Runs in your browser, nothing is sent to a server."
- CTA mappings approved: SEO buttons to the SEO service page, plan and About to /contact, headline and comment to /services, Etsy to the Loompad case study.

## SEO audit (rerun after round 3, node type stripping)
- All 23 pages pass: keyword in slug, front loaded meta title under 60, meta description first sentence and length under 160, H1, hero first sentence, first H2. One H1 each. No em/en dashes. No Eplie. "freelance" only inside two server side prompt bans. "unlimited" only on the UTM builder (true). All CTA links internal.
- Only note: calendar examples leave the start date empty on purpose (the form defaults it to next Monday).

## Rebuild to the Instagram standard (batches of 5)
- Batch 1 DONE (waiting for "next batch"): TikTok bio, X (Twitter) bio, Threads bio, Facebook bio, Instagram caption.
  - Copy lives in lib/tools/families/{bio-tiktok,bio-x,bio-threads,bio-facebook,caption-instagram}.ts; docs/copy/<slug>.md is generated from the config (scratchpad script copydoc.mjs) so file and page always match.
  - New preview skins in ProfileMockup: tiktok, x, threads, facebook, instagram-post. Caption family got language + emoji fields and prompt lines.
  - Unverified (flagged): TikTok 80 limit (creators report 160 on newer apps), Threads 150 limit, Facebook 101 limit, Instagram 2,200 (developer docs only), "before more" cutoffs.
- Next: Batch 2 = TikTok caption, Facebook caption, YouTube description, Pinterest description, YouTube title.

## Provider switch and first publish (2026-10-12)
- AI tools now run on Google Gemini via plain fetch (lib/tools/gemini.ts), no SDK. Env: GEMINI_API_KEY (required, set in Vercel and .env.local, never committed). Optional TOOLS_MODEL_FAST / TOOLS_MODEL_STRONG; defaults gemini-flash-latest / gemini-pro-latest. JSON mode on, default temperature.
- Only pages in LIVE (lib/tools/registry.ts) render in production: the 6 batch 1 pages. In dev, every page renders for review. Add each slug to LIVE when its batch is approved.
- Hub copy is generic (no tool count) and hides empty groups.

## Instagram bio v3 redesign (2026-10-17)
- New studio system: app/tools/_studio/ (StudioPage, BioStudio, controls, InstaPreview, studio.module.css, Lora font loaded only here). A page opts in with `studio` on its config; the [slug] template renders StudioPage. Only Instagram bio uses it so far.
- New field types: segmented, combobox; `group` places fields (essentials, style, format, advanced).
- Instagram has its own prompt block `instagram-bio`. TikTok, X, Threads and Facebook still use the shared `bio` block and old template.
- Fast model default switched to gemini-flash-lite-latest: gemini-flash-latest was taking 45s+ (timeouts) in testing on Oct 17. Lite answers in about 2s.
- Header: "Free Tools" hidden from the desktop bar between 768 and 1023px only (it overflowed). Still in the mobile menu, footer and desktop bar from 1024px.
- pnpm-workspace.yaml temporary i18next exclusion removed; install passes the age check now.

## Instagram bio second round design fixes (2026-10-17)
- Generator: CSS phone mockup (app/tools/_studio/Phone.tsx) with a live draft built in the browser from the form (lib/tools/draft.ts, no AI, clearly labeled "Live draft"). After generating: "All 5 bios" list and "Profile preview" tabs, a 1 to 5 picker on the phone, Copy and Back. Results survive view and mode changes. New optional "Name or brand" field feeds the preview and the prompt (`<name>` in the instagram-bio user template).
- Sections rebuilt to the service page pattern (eyebrow, H2 with italic serif accent line, sub on the right) on alternating cream and warm white bands. New kinds: steps with mini visuals, creator breakdown (real @khaby00 bio, checked Oct 17, 2026; photo by Sam Barnes / Web Summit, CC BY 4.0, via Wikimedia Commons), style cards with "Use this style" (StyleButton dispatches studio:style to BioStudio), practice cards with examples. InstaPreview.tsx removed.
- No longer shown on the page: how-it-works-steps.webp, bio-anatomy.webp, notes-to-profile.webp (files kept in public/ in case they're wanted back).
- Tested in headless Edge at 1440, 1024, 768, 390, 360: no horizontal overflow, one H1, no console errors; flow test covered live draft, Use this style, generate, preview, picker, back, edit, improve mode.

## TikTok, X, Threads and Facebook bios on the studio layout (2026-10-17)
- Shared studio bio system: lib/tools/families/studio-bio.ts (form, workspace, prompt vars) and the "studio-bio" prompt block in blocks.ts (Instagram keeps its own approved block). Phone skins in app/tools/_studio/Phone.tsx: TikTokScreen, XScreen, ThreadsScreen, FacebookScreen, chosen by `studio.skin`.
- Real examples, all checked October 17, 2026 from live profile data:
  - X: Nike, NASA, Wendy's, Ryanair, Airbnb, Canva (api.fxtwitter.com, cross checked with X syndication). Creator: @MKBHD, photo by Marques Brownlee, CC BY-SA 4.0.
  - TikTok: Nike, Duolingo, Ryanair, Canva, Gymshark, Netflix (empty bio), from the profile page JSON. Creator: @charlidamelio, photo by Brad Mondo, CC BY 3.0.
  - Threads: Duolingo, Canva, NASA, Wendy's, Sephora, Starbucks, from the profile JSON. Creator: @adamgrant, photo World Economic Forum / Jakob Polacsek, CC BY 2.0.
  - Facebook: Patagonia, Duolingo, Canva, Starbucks, Katz's Delicatessen, Stumptown Coffee (Intro card bio field). Creator: Gordon Ramsay, photo by Dave Pullig, CC BY 2.0.
- Unconfirmed limits, said honestly in the copy: Threads publishes no bio limit (tool keeps 150), Facebook publishes no limit (tool keeps 101, "about 101"). TikTok 80 and X 160 are confirmed on their help pages.
- New public domain logos: public/assets/tools/brands/nasa.svg, airbnb.svg. Brands without a free logo get a monogram.
