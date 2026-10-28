# Claude implementation brief: Black Friday page final polish, new cards, and original SVGs V3

## Scope and constraints

The Black Friday page layout, general copy direction, palette, and five service groups are approved. Do not restart the entire redesign. Fix the layout defects shown in the screenshots, rebuild the weak explanatory sections as premium HTML cards, and replace all earlier Black Friday illustrations with the **BFV3** SVG assets provided in `Assets/black-friday-v3/` (the actual folder can be nested, search recursively).

**The previous BF01 through BF07 and BFV2 illustration sets are rejected for this page.** Do not mix those images into the redesigned page. Leave the homepage and unrelated pages alone. Preserve real prices, offer rules, packages, user flows, routes, metadata, case study evidence, and functional CTAs. New HTML card designs are provided in `Black_Friday_Card_Layouts.html`, with desktop and mobile screenshots. Adapt those examples to the existing design system rather than pasting the whole HTML document into production.

## 1. Visual direction

Use the user-approved color family: forest green #174B3A, ink #202821, sage #D8E4D7, ivory #F8F5EE, muted gold #B38842, terracotta #C76D57 sparingly. Keep white and off-white dominant. Continue using Lora and Figtree where already configured. Use calm, readable cards and a strong, well-sized illustration for each major service intro. Artwork should feel like an illustrated editorial story, not a tiny screenshot of an imaginary app. No glassmorphism, glossy gold 3D, generic marketing dashboards or stock illustration replacements.

## 2. Exact SVG file mapping

| SVG file | Page section | Direction |
|---|---|---|
| BFV3-01-gift-and-growth.svg | Hero | Main hero image, significantly larger, fills allocated column without huge blank vertical space |
| BFV3-02-search-story.svg | SEO intro | Accompanies headline and short copy; not inside package cards |
| BFV3-03-community-voices.svg | Reddit intro | Relevant conversation artwork opposite the text |
| BFV3-04-content-storyboard.svg | Social media intro | Supports written service explanation |
| BFV3-05-campaign-megaphone.svg | Google and Meta Ads intro | Place near service summary, not alongside prices |
| BFV3-06-growing-steps.svg | Growth consulting intro | Illustration of progressive work |
| BFV3-07-choosing-the-way.svg | 'Not sure which package fits?' | Optional visual beside heading, not an obstacle to cards |
| BFV3-08-evidence-notes.svg | Proof / case study intro | Keep real screenshots and results in focus |
| BFV3-09-preparation-list.svg | Black Friday readiness checklist | One illustration, checklist content remains accessible HTML |
| BFV3-10-offer-ticket.svg | How to claim | Optional visual, process steps must remain HTML |
| BFV3-11-questions-answered.svg | FAQ | Small intro visual only if it improves composition |
| BFV3-12-real-conversation.svg | Closing CTA | Artwork must not crowd the contact button or heading |

All 12 are separate, transparent-background SVGs with 1200 x 800 viewBoxes. Use actual vector files, not screenshots or PNG conversions. Do not necessarily place all 12 if some sections are better without decoration, but do not use any of the rejected old Black Friday graphics.

## 3. Fix the hero, not just its image width

The current screenshot shows a tiny illustration floating in a huge right-hand blank rectangle. This is a layout architecture problem.

- Immediately after the site header, aim for about 40 to 56px of effective top spacing on desktop and about 24 to 36px on mobile. Do not double-count the sticky header offset.
- Use one shared max-width container of roughly 1200 to 1280px with aligned text and illustration edges.
- At desktop widths, use a two-column grid of roughly 52% copy / 48% illustration, `align-items:center` and gap around 32 to 52px.
- Remove height forcing like `min-height: 750px`, fixed aspect ratio wrapper boxes, massive padding, or absolute alignment that creates a lot of empty whitespace.
- Put the illustration at `width:100%`, `height:auto`, `object-fit:contain`, suitable max width around 600px. Ensure the SVG drawing occupies a visible portion of that column.
- Keep the hero CTAs together under the copy. Other section CTA groups are center aligned, but the hero's actions should relate to its text column.
- On mobile, use one column, reduced font sizes and no artificial gap between copy and illustration.

## 4. Center all pricing content except feature lists

For **every** package in SEO, Reddit, Social, Ads and Growth consulting:

**Center align** the plan name, short description, regular struck-through price, sale price, discount label, and card action button. Make the sale price the strongest element in the card.

**Keep left aligned** each included-feature list, terms that need careful reading, and any long explanatory content. Lists with centered bullets are hard to scan.

Use the same padding, border, radius, title width, discount placement, divider placement and feature rhythm across cards. Keep card buttons aligned at the bottom without adding excessive empty height. Ensure four-column SEO cards remain readable, switch to two columns where appropriate, and stack at mobile widths. Preserve package amounts and billing descriptors exactly from existing approved pricing data. Do not conflate one-time discounts and first-month discounts.

Suggested CSS structure:

```css
.bf-price-grid { display:grid; grid-template-columns:repeat(var(--cols,3),minmax(0,1fr)); gap:20px; align-items:stretch; }
.bf-price-card { display:flex; flex-direction:column; min-width:0; padding:clamp(20px,2vw,32px); border:1px solid var(--border); border-radius:20px; background:#fff; }
.bf-price-card__heading, .bf-price-card__regular, .bf-price-card__discounted, .bf-price-card__note { text-align:center; }
.bf-price-card__features { flex:1; text-align:left; margin:24px 0; padding-left:1.3rem; }
.bf-price-card__button { margin-top:auto; width:100%; text-align:center; }
```

## 5. Center all section-level CTAs, including 'See eligible packages'

These controls are currently pushed to the far right and must be centered **under their own section**:

- See eligible packages
- Compare Black Friday SEO packages
- Compare Black Friday Reddit packages
- The social package comparison action
- Compare Black Friday ads packages
- Growth Strategy package comparison
- The readiness checklist CTA
- The how-to-claim section CTA, if present

The primary and secondary buttons should be grouped together, horizontally centered, with a 12 to 16px gap. Remove `margin-left:auto`, `float:right`, `justify-content:flex-end`, `ml-auto`, `text-align:right` and positioning overrides in the relevant action wrappers. Important: centering the **text inside a button** is not the same as centering the **button group within the section**. Fix both.

```css
.bf-section-actions {
 display:flex; justify-content:center; align-items:center;
 flex-wrap:wrap; gap:14px; width:100%; margin:26px auto 0;
}
.bf-section-actions > * { flex:0 0 auto; }
@media (max-width:640px) {
 .bf-section-actions { flex-direction:column; }
 .bf-section-actions > * { width:min(100%,420px); }
}
```

Do not append these classes to the wrong parent when a parent grid cell is right-justified. Put the actions in a full-width row beneath the service cards.

## 6. Build actual HTML cards for the sections shown in the screenshots

Use `Black_Friday_Card_Layouts.html` as the approved structural direction (not as an exact pixel-by-pixel theme replacement). All text, links and prices must remain editable and accessible HTML.

### A. 'Not sure which package fits?' section

Create three compact, consistent decision cards:

1. **People can't find you**: SEO and discoverability.
2. **You're missing conversations**: Reddit community and visibility.
3. **Content is inconsistent**: Social media and publishing support.

Each card needs one small meaningful icon, a short title, two or three short lines of context, and a text link to the relevant existing package section. Do not fill the cards with giant SVGs or fake claims. On desktop show three columns with equal visual weight; on mobile stack. Center the **See eligible packages** button below the whole grid, not floated to the right. Include a quieter 'Help me choose' link when it has a real destination.

### B. Pricing cards

Use the polished two-card Ads preview pattern and apply its alignment rules across every service. Feature lists remain left aligned. Avoid unnecessary 'Most popular' badges unless supported by actual user data. A colored border on one plan is acceptable only if it marks a genuine curated recommendation.

### C. 'How to claim' section

Use three compact numbered cards: share your goals; confirm scope and eligibility; begin the agreed work. Keep concise copy and center the CTA underneath. Avoid giant empty cards.

### D. Proof / client examples

Show genuine screenshots or verified client results in consistent evidence cards. Never replace real proof with decorative SVGs. Each card should contain one clear result or artifact, exact scope and attribution where available, and a link to further detail if it exists. If no evidence is approved for a claim, leave it out.

### E. FAQ

Keep semantic accordion functionality. Group question title, answer spacing and dividers consistently. A decorative SVG is optional; do not interrupt the FAQ reading flow.

## 7. Spacing and responsive rules

- One shared horizontal container for hero, section titles, service intros, cards, and action groups.
- Major section gap around 80 to 104px on desktop, around 48 to 64px on mobile.
- H2 to paragraph around 12 to 16px; paragraph to card grid around 24 to 32px; card grid to CTAs around 24 to 28px.
- Cards use reasonable padding and content-driven height. No fake tall minimum heights to line up visual assets.
- Typography: Lora for display headings, Figtree for other elements if available. Brand accents only for key phrases.
- Illustrations must remain proportional and large enough to be recognizable, but never push the whole section into unnecessary whitespace.
- Check horizontal overflow and long comparison button labels at 360px and 390px. Responsive button labels can shorten if their meaning is preserved.

## 8. Validation

Before reporting completion, actually render and inspect:

- Hero at 1440px and 390px (no giant blank half).
- SEO price cards including all four plans.
- Reddit three-card pricing grid and centered footer actions.
- Social, Ads and Growth section price cards.
- The 'Not sure which package fits?' three-card block.
- The 'See eligible packages' button in its final centered position.
- The how-to-claim cards.
- FAQ and closing CTA.

Test 1440, 1280, 1024, 768, 390 and 360px widths. Confirm assets load, no clipping, price values unchanged, CTA destinations correct, SEO URL and metadata intact, form or contact actions still work, and no extra home-page changes. Run build, lint and relevant tests, and report only results actually observed.

## Final deliverables

1. Updated Black Friday page using the V3 illustration set, with all rejected old graphics removed from this page.
2. New HTML decision cards, refined pricing cards, and clean process cards.
3. Centered section-level CTA groups, specifically 'See eligible packages'.
4. Correct centered pricing hierarchy, with left-aligned feature lists.
5. Hero without the current large blank area.
6. Actual desktop and mobile screenshots.
7. Changed file list, checks run, unresolved issues and any recommended final polish.

Do not stop after writing a plan. Modify the actual page and inspect its rendered output.
