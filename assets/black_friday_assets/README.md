# Zainameen Black Friday SVG asset kit

All images are **native SVG vectors** and are editable in Figma, Illustrator, Inkscape, or by opening the text file directly. None of the SVGs embeds a PNG/JPEG, external image, remote font, or script.

## Files and intended placement

| File | Canvas | Intended placement |
|---|---:|---|
| `hero/black-friday-growth-hero.svg` | 1440 × 900 | Hero illustration; transparent background, with empty left for the HTML heading |
| `services/seo-research.svg` | 800 × 640 | SEO pricing/service section |
| `services/reddit-community.svg` | 800 × 640 | Reddit marketing section |
| `services/social-content.svg` | 800 × 640 | Social media management section |
| `services/paid-ads.svg` | 800 × 640 | Ads management section |
| `services/growth-strategy.svg` | 800 × 640 | Growth strategy section |
| `banners/black-friday-wide.svg` | 1600 × 440 | Wide announcement or dedicated campaign banner |
| `banners/black-friday-announcement-strip.svg` | 1600 × 220 | Homepage/pricing banner |
| `social/black-friday-open-graph.svg` | 1200 × 630 | Open Graph social preview |
| `social/black-friday-square-social.svg` | 1080 × 1080 | Optional social promotion |
| `badges/10-percent-off-seal.svg` | 640 × 640 | Reusable decorative discount seal |

## Brand colors
* Deep green `#0F3F32`
* Ivory `#F5F1E8`
* Warm gold `#B88A45`
* Light sage `#BCD3C2`

## Implementation notes
* Keep the SEO heading as HTML text, not just part of the SVG.
* SVG text is kept editable with declared font fallbacks (Inter/Arial and Lora/Georgia). If an editor does not have Inter/Lora it will show the fallback font.
* Illustrations in hero/services are intended to sit on pale backgrounds and have transparent SVG canvas.
* SVG `filter` drop shadows may render slightly differently in some SVG editors. All underlying shapes remain vector.
* There are no fixed promotion dates or prices on the graphics; update them in your HTML so changing the sale later is easy.
* The 10% discount itself is hard-coded in the assets; edit the `<text>` elements if the offer changes.
* Add descriptive HTML alt text when using `<img>` tags. For purely decorative assets, use empty alt and aria-hidden.
* The OG file is a vector source. For broad social network preview compatibility export it as 1200 × 630 PNG when attaching to `og:image`; don't rely on SVG being supported by every crawler.
