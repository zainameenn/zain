import type { RelatedIcon, ToolGroup, ToolPage } from "../types";
import type { NewToolContent } from "./content-types";
import etsyShopName from "./content/etsy-shop-name-generator";
import shortsScript from "./content/youtube-shorts-script-generator";
import channelName from "./content/youtube-channel-name-generator";
import negativeKeywords from "./content/google-ads-negative-keyword-generator";
import etsyOffsite from "./content/etsy-offsite-ads-calculator";
import searchIntent from "./content/seo-search-intent-classifier";
import shopifyName from "./content/shopify-store-name-generator";
import shopifyMargin from "./content/shopify-profit-margin-calculator";
import reviewLink from "./content/google-review-link-generator";
import llmsTxt from "./content/llms-txt-generator";
import etsyFee from "./content/etsy-fee-calculator";
import newsletterName from "./content/newsletter-name-generator";
import productTitle from "./content/shopify-product-title-generator";
import cacCalc from "./content/customer-acquisition-cost-calculator";
import podcastName from "./content/podcast-name-generator";
import keywordCluster from "./content/seo-keyword-cluster-generator";
import robotsTester from "./content/robots-txt-tester";
import domainIdeas from "./content/domain-name-ideas-generator";
import videoScript from "./content/youtube-video-script-generator";
import localFaq from "./content/local-business-faq-generator";

// The ten tools added in October 2026, turned into regular registry pages on the studio layout.
// Copy lives in lib/tools/v3/content/<slug>.ts; the generators in app/tools/_studio/V3Generator.tsx.

const ICON: Record<ToolGroup, RelatedIcon> = { Social: "caption", SEO: "chat", Ecommerce: "caption", LinkedIn: "bio", Naming: "bio", Utilities: "x" };

function page(c: NewToolContent, group: ToolGroup, ai: boolean): ToolPage {
  return {
    slug: c.slug,
    name: c.name,
    keyword: c.keyword,
    group,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    h1: { regular: c.name, accent: "(100% FREE)" },
    heroDescription: c.lede,
    accessNote: c.trust,
    // The older workspace fields aren't used by v3 pages; the generator component owns its own form.
    workspace: { fields: [], button: "", secondary: "", exampleInput: {}, resultsHeading: "", emptyState: "", more: "", dataNote: "", errorText: "", result: { kind: "utm" } },
    howTo: { heading: `How to use the ${c.name}`, steps: c.steps.map((s) => `**${s.title}.** ${s.text}`) },
    examples: { heading: c.examples.heading, items: [] },
    sections: [],
    faqs: c.faqs,
    ctas: [],
    related: c.related,
    extraLinks: [],
    api: ai ? { block: "v3", vars: {} } : null,
    studio: {
      tool: "v3",
      label: c.name,
      lede: c.lede,
      sub: c.sub,
      trust: c.trust,
      sections: [
        { kind: "steps", eyebrow: "How it works", heading: `How to use the ${c.name}`, accent: "in three steps.", steps: c.steps.map((s, i) => ({ title: s.title, text: s.text, visual: (["account", "style", "copy"] as const)[i] })) },
        { kind: "practices", eyebrow: "Examples", heading: c.examples.heading, accent: c.examples.accent, intro: c.examples.intro, items: c.examples.items.map((x) => ({ title: x.title, text: `**Input:** ${x.input} ${x.why}`, example: { good: x.output, goodLabel: "Result" } })) },
        { kind: "practices", eyebrow: "Good to know", heading: c.guidance.heading, accent: c.guidance.accent, intro: c.guidance.intro, items: c.guidance.items },
        { kind: "faq", eyebrow: "FAQ", heading: "Questions,", accent: "answered." },
        { kind: "related", eyebrow: "Keep going", heading: "More free tools", accent: "for the next step.", tools: c.related.map((r) => ({ slug: r.slug, text: r.text, icon: ICON[group] })) },
        { kind: "cta", heading: c.cta.heading, accent: c.cta.accent, copy: c.cta.copy, button: c.cta.button, href: c.cta.href },
      ],
    },
  };
}

export const V3_PAGES: ToolPage[] = [
  page(etsyShopName, "Naming", true),
  page(shopifyName, "Naming", true),
  page(channelName, "Naming", true),
  page(shortsScript, "Social", true),
  page(negativeKeywords, "SEO", true),
  page(searchIntent, "SEO", true),
  page(llmsTxt, "SEO", false),
  page(etsyOffsite, "Utilities", false),
  page(shopifyMargin, "Utilities", false),
  page(reviewLink, "Utilities", false),
  // Tools 11 to 20 (October 26, 2026).
  page(etsyFee, "Utilities", false),
  page(newsletterName, "Naming", true),
  page(productTitle, "Ecommerce", true),
  page(cacCalc, "Utilities", false),
  page(podcastName, "Naming", true),
  page(keywordCluster, "SEO", true),
  page(robotsTester, "SEO", false),
  page(domainIdeas, "Naming", true),
  page(videoScript, "Social", true),
  page(localFaq, "SEO", true),
];

export const V3_CONTENT: NewToolContent[] = [etsyShopName, shopifyName, channelName, shortsScript, negativeKeywords, searchIntent, llmsTxt, etsyOffsite, shopifyMargin, reviewLink, etsyFee, newsletterName, productTitle, cacCalc, podcastName, keywordCluster, robotsTester, domainIdeas, videoScript, localFaq];
