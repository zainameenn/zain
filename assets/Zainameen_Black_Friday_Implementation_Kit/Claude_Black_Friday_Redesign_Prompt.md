# Claude implementation brief: Redesign Black Friday marketing deals landing page

You are a senior frontend designer, accessibility engineer, conversion-copy editor and technical SEO specialist working inside the existing zainameen.com codebase.

## Inputs

- Read `Black_Friday_Landing_Page_Copy.md` supplied in this folder.
- Inspect `/assets` recursively for the new `BF01` to `BF07` SVG assets (they may be under an `assets/black-friday` or other nested folder).
- Inspect the existing Black Friday page, its current route, service package configuration and existing CTA destinations.
- Inspect the current global design system. Keep this task scoped to the Black Friday page and any necessary shared fixes, not the homepage redesign.

## Must-correct design issues

1. Hero spacing: The screenshot shows excessive whitespace between the navigation and heading. Make the start of the hero approximately 48 to 64px below the header on desktop, adjusting for actual header height. Do not use `min-height:100vh` or a large fixed empty spacer. On mobile use about 28 to 44px.
2. Global alignment: Use the SAME max-width container for every major section, approximately 1200 to 1240px, with responsive gutters 24px desktop and 16 to 20px mobile. All headings, pricing grids, media, and CTA elements should visibly share grid edges.
3. Hero: Use a balanced desktop grid, roughly 55% text and 45% illustration, with headline, paragraph, buttons and microcopy in the left column and BF01 in the right. Vertically center the two columns. Use natural height, no forced empty space.
4. Typography: Lora (regular/medium) for major editorial H1 and selected section headings, Figtree for UI and body. H1 `clamp(2.75rem,5vw,4.5rem)`, H2 `clamp(2rem,3vw,3rem)`, body 16 to 18px. No giant bold generic sans headlines. One green emphasized phrase per major title maximum.
5. Color: ivory #F8F5EE, forest #174B3A, ink #202821, sage #D8E4D7, gold #B38842, terracotta #C76D57. Use genuine white card backgrounds and subtle borders, not uniform gray-beige everywhere. Check AA contrast.
6. Service sections: Five consistent service blocks: SEO, Reddit, social media, paid ads, growth consulting. Use a 2-column intro with a relevant BF illustration. Beneath each, put the selected package comparison across the full container width rather than cramming miniature cards in the text column.
7. Pricing: Build accessible HTML cards from the canonical pricing configuration. Each card includes service tier, short promise, actual scope, normal price (if applicable), confirmed discounted price, billing type, and CTA. Only apply 10% to **eligible** packages, with correct rounding and billing-period rules after reviewing approved terms. Never hardcode guessed prices or imply a recurring discount when it is a one-off.
8. Remove the old glossy black-and-gold 3D artwork from this page only, replacing with new BF01 to BF07 illustrations. Maintain semantic text outside the SVGs. Do not duplicate illustration content as inaccessible images of text.
9. Mobile: Stack hero and service intro cleanly; render a single column of readable package cards at 360px to 390px. No tiny price tables. Avoid horizontal overflow and unexpected wrapping.
10. Section rhythm: Hero to offer strip 48 to 72px; between major sections 88 to 112px desktop and 56 to 72px mobile. Only use these as starting tokens, then inspect actual rendering. Content-driven heights, no arbitrary negative margins.

## Content and structure

Implement the page sections in this order:

1. Compact hero: copy and BF01.
2. Transparent offer details: dates/terms/eligibility.
3. Services intro.
4. SEO offer: BF02 + package grid.
5. Reddit offer: BF03 + package grid.
6. Social media offer: BF04 + package grid.
7. Paid advertising offer: BF05 + package grid.
8. Growth consulting offer: BF06 + package grid.
9. Service choice comparison: compact, semantic HTML.
10. Genuine evidence: select approved case studies only; screenshots or measured outcomes must be verifiable.
11. Black Friday marketing checklist: BF07 and useful article-style copy.
12. Three-step inquiry/kickoff process.
13. FAQ with clear policies and service differences.
14. Closing CTA.

Don't multiply the same 'Why work with me?' card grid with the same message repeated in other sections. Consolidate content where it helps the user decide.

## Search and URL rules

The provided reference image emphasizes consistency between title, URL slug, H1 and first sentence. Implement this naturally:

Title: `Black Friday Marketing Deals 2026 | SEO, Reddit & Social | Zain`
Proposed path only for a NEW page: `/black-friday-marketing-deals`
H1: `Black Friday marketing deals. Better growth, 10% less.`
First sentence: `These Black Friday marketing deals are for SaaS founders and service businesses that need more than another month of random marketing tasks.`

Important: if the current Black Friday page already has a live, indexable URL, preserve it and do not change the URL simply to fit the new proposal. Determine canonical and redirect needs based on the actual repository and live status, not a guess.

Use one H1, descriptive H2s, meaningful internal links, and matching metadata/OG tags. Avoid keyword stuffing and duplication of broad consumer retail keywords.

## Graphic mapping

- `BF01-black-friday-hero.svg`: Hero right column.
- `BF02-seo-service.svg`: SEO section intro.
- `BF03-reddit-service.svg`: Reddit section intro.
- `BF04-social-service.svg`: Social section intro.
- `BF05-paid-ads-service.svg`: Paid ads section intro.
- `BF06-growth-strategy-service.svg`: Consulting section intro.
- `BF07-seo-landing-page-checklist.svg`: Educational checklist.

All are 1200x800 standalone SVG with transparent outer background. Use `object-fit:contain` inside a deliberate aspect-ratio container. Do not rasterize or regenerate.

## Critical truthfulness checks

Before publication verify and complete:

- Actual discount eligibility for each package.
- Actual baseline prices, approved discounted prices and what the price is for.
- Valid promotional dates, timezone, and expiration.
- Whether setup, first month, future months, retainers, and ad spend are eligible.
- Service deliverables and exclusions.
- Actual case-study proof and attribution.
- Active CTAs, booking/contact routes, and form behavior.

Never invent countdowns, scarcity, guarantee language or client numbers. Displayed discounted price must match the calculation and billing rule, server and client.

## Final QA

Render screenshots at 1440, 1280, 1024, 768, 390 and 360px. Review actual alignment (not just successful build). Check hero top margin, image clipping, price comparability, CTA order, keyboard navigation, focus states, contrast and no overflow. Test all package buttons, contact routes and FAQ behaviors. Run build, lint, types and relevant tests. Report real results, including any unverified offer terms that block safe publication.

Do the implementation. Do not stop at a plan or static mockup. Do not alter the homepage layout.
