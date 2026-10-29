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
import b3_instagram_username_generator from "./content/instagram-username-generator";
import b3_tiktok_username_generator from "./content/tiktok-username-generator";
import b3_business_name_generator from "./content/business-name-generator";
import b3_business_slogan_generator from "./content/business-slogan-generator";
import b3_blog_name_generator from "./content/blog-name-generator";
import b3_youtube_thumbnail_text_generator from "./content/youtube-thumbnail-text-generator";
import b3_youtube_chapters_generator from "./content/youtube-chapters-generator";
import b3_seo_content_brief_generator from "./content/seo-content-brief-generator";
import b3_robots_txt_generator from "./content/robots-txt-generator";
import b3_xml_sitemap_validator from "./content/xml-sitemap-validator";
import b3_local_business_schema_generator from "./content/local-business-schema-generator";
import b3_shopify_collection_description_generator from "./content/shopify-collection-description-generator";
import b3_etsy_shop_announcement_generator from "./content/etsy-shop-announcement-generator";
import b3_etsy_shop_about_section_generator from "./content/etsy-shop-about-section-generator";
import b3_break_even_roas_calculator from "./content/break-even-roas-calculator";
import b3_ltv_cac_ratio_calculator from "./content/ltv-cac-ratio-calculator";
import b3_email_preheader_generator from "./content/email-preheader-generator";
import b3_website_hero_headline_generator from "./content/website-hero-headline-generator";
import b3_saas_value_proposition_generator from "./content/saas-value-proposition-generator";
import b3_changelog_entry_generator from "./content/changelog-entry-generator";
import b4_xml_sitemap_generator from "./content/xml-sitemap-generator";
import b4_hreflang_tag_generator from "./content/hreflang-tag-generator";
import b4_canonical_url_checker from "./content/canonical-url-checker";
import seo_website_metadata_extractor from "./content/website-metadata-extractor";
import seo_website_seo_checker from "./content/website-seo-checker";
import seo_broken_link_checker from "./content/broken-link-checker";
import seo_sitemap_url_status_checker from "./content/sitemap-url-status-checker";
import seo_long_tail_keyword_generator from "./content/long-tail-keyword-generator";
import seo_seo_question_generator from "./content/seo-question-generator";
import seo_core_web_vitals_checker from "./content/core-web-vitals-checker";
import seo_serp_checker from "./content/serp-checker";
import seo_keyword_rank_checker from "./content/keyword-rank-checker";
import seo_people_also_ask_tool from "./content/people-also-ask-tool";
import seo_serp_features_checker from "./content/serp-features-checker";
import seo_local_serp_checker from "./content/local-serp-checker";
import seo_keyword_search_volume_checker from "./content/keyword-search-volume-checker";
import seo_keyword_difficulty_checker from "./content/keyword-difficulty-checker";
import seo_keyword_research_tool from "./content/keyword-research-tool";
import seo_organic_keywords_finder from "./content/organic-keywords-finder";
import seo_website_traffic_checker from "./content/website-traffic-checker";
import seo_seo_competitor_finder from "./content/seo-competitor-finder";
import seo_competitor_keyword_gap from "./content/competitor-keyword-gap";
import seo_ai_overview_checker from "./content/ai-overview-checker";
import seo_keyword_trends_tool from "./content/keyword-trends-tool";
import seo_bulk_keyword_rank_checker from "./content/bulk-keyword-rank-checker";
import seo_domain_comparison_tool from "./content/domain-comparison-tool";
import seo_website_audit_tool from "./content/website-audit-tool";
import b4_redirect_chain_checker from "./content/redirect-chain-checker";
import b4_json_ld_schema_validator from "./content/json-ld-schema-validator";
import b4_open_graph_tags_generator from "./content/open-graph-tags-generator";
import b4_product_schema_generator from "./content/product-schema-generator";
import b4_internal_link_opportunity_finder from "./content/internal-link-opportunity-finder";
import b4_keyword_to_page_mapper from "./content/keyword-to-page-mapper";
import b4_seo_content_gap_planner from "./content/seo-content-gap-planner";
import b4_saas_product_name_generator from "./content/saas-product-name-generator";
import b4_product_hunt_launch_copy_generator from "./content/product-hunt-launch-copy-generator";
import b4_shopify_sku_generator from "./content/shopify-sku-generator";
import b4_shopify_abandoned_checkout_email_generator from "./content/shopify-abandoned-checkout-email-generator";
import b4_local_service_page_outline_generator from "./content/local-service-page-outline-generator";
import b4_local_seo_keyword_modifier_generator from "./content/local-seo-keyword-modifier-generator";
import b4_landing_page_copy_generator from "./content/landing-page-copy-generator";
import b4_mrr_calculator from "./content/mrr-calculator";
import b4_customer_retention_rate_calculator from "./content/customer-retention-rate-calculator";
import b4_ab_test_sample_size_calculator from "./content/ab-test-sample-size-calculator";

// The ten tools added in October 2026, turned into regular registry pages on the studio layout.
// Copy lives in lib/tools/v3/content/<slug>.ts; the generators in app/tools/_studio/V3Generator.tsx.

const ICON: Record<ToolGroup, RelatedIcon> = { Social: "caption", SEO: "chat", Ecommerce: "caption", LinkedIn: "bio", Naming: "bio", Utilities: "x", Copy: "chat" };

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
  // Tools 21 to 40 (October 26, 2026).
  page(b3_instagram_username_generator, "Naming", true),
  page(b3_tiktok_username_generator, "Naming", true),
  page(b3_business_name_generator, "Naming", true),
  page(b3_business_slogan_generator, "Naming", true),
  page(b3_blog_name_generator, "Naming", true),
  page(b3_youtube_thumbnail_text_generator, "Social", true),
  page(b3_youtube_chapters_generator, "Social", true),
  page(b3_seo_content_brief_generator, "SEO", true),
  page(b3_robots_txt_generator, "SEO", false),
  page(b3_xml_sitemap_validator, "SEO", false),
  page(b3_local_business_schema_generator, "SEO", false),
  page(b3_shopify_collection_description_generator, "Ecommerce", true),
  page(b3_etsy_shop_announcement_generator, "Ecommerce", true),
  page(b3_etsy_shop_about_section_generator, "Ecommerce", true),
  page(b3_break_even_roas_calculator, "Utilities", false),
  page(b3_ltv_cac_ratio_calculator, "Utilities", false),
  page(b3_email_preheader_generator, "Copy", true),
  page(b3_website_hero_headline_generator, "Copy", true),
  page(b3_saas_value_proposition_generator, "Copy", true),
  page(b3_changelog_entry_generator, "Copy", true),
  // Tools 41 to 60 (October 26, 2026).
  page(b4_xml_sitemap_generator, "SEO", false),
  page(b4_hreflang_tag_generator, "SEO", false),
  page(b4_canonical_url_checker, "SEO", false),
  page(b4_redirect_chain_checker, "SEO", false),
  page(b4_json_ld_schema_validator, "SEO", false),
  page(b4_open_graph_tags_generator, "SEO", false),
  page(b4_product_schema_generator, "SEO", false),
  page(b4_internal_link_opportunity_finder, "SEO", false),
  page(b4_keyword_to_page_mapper, "SEO", true),
  page(b4_seo_content_gap_planner, "SEO", true),
  page(b4_saas_product_name_generator, "Naming", true),
  page(b4_product_hunt_launch_copy_generator, "Copy", true),
  page(b4_shopify_sku_generator, "Ecommerce", false),
  page(b4_shopify_abandoned_checkout_email_generator, "Ecommerce", true),
  page(b4_local_service_page_outline_generator, "SEO", true),
  page(b4_local_seo_keyword_modifier_generator, "SEO", false),
  page(b4_landing_page_copy_generator, "Copy", true),
  page(b4_mrr_calculator, "Utilities", false),
  page(b4_customer_retention_rate_calculator, "Utilities", false),
  page(b4_ab_test_sample_size_calculator, "Utilities", false),
  // SEO tools wave 1 (October 29, 2026): real data only, see lib/tools/seo.
  page(seo_website_metadata_extractor, "SEO", false),
  page(seo_website_seo_checker, "SEO", false),
  page(seo_broken_link_checker, "SEO", false),
  page(seo_sitemap_url_status_checker, "SEO", false),
  page(seo_long_tail_keyword_generator, "SEO", false),
  page(seo_seo_question_generator, "SEO", false),
  page(seo_core_web_vitals_checker, "SEO", false),
  // SEO tools wave 2 (October 29, 2026): paid data under monthly caps, see lib/tools/seo/paid.ts.
  page(seo_serp_checker, "SEO", false),
  page(seo_keyword_rank_checker, "SEO", false),
  page(seo_people_also_ask_tool, "SEO", false),
  page(seo_serp_features_checker, "SEO", false),
  page(seo_local_serp_checker, "SEO", false),
  page(seo_keyword_search_volume_checker, "SEO", false),
  page(seo_keyword_difficulty_checker, "SEO", false),
  page(seo_keyword_research_tool, "SEO", false),
  page(seo_organic_keywords_finder, "SEO", false),
  page(seo_website_traffic_checker, "SEO", false),
  page(seo_seo_competitor_finder, "SEO", false),
  page(seo_competitor_keyword_gap, "SEO", false),
  page(seo_ai_overview_checker, "SEO", false),
  page(seo_keyword_trends_tool, "SEO", false),
  page(seo_bulk_keyword_rank_checker, "SEO", false),
  page(seo_domain_comparison_tool, "SEO", false),
  page(seo_website_audit_tool, "SEO", false),
];

export const V3_CONTENT: NewToolContent[] = [etsyShopName, shopifyName, channelName, shortsScript, negativeKeywords, searchIntent, llmsTxt, etsyOffsite, shopifyMargin, reviewLink, etsyFee, newsletterName, productTitle, cacCalc, podcastName, keywordCluster, robotsTester, domainIdeas, videoScript, localFaq, b3_instagram_username_generator, b3_tiktok_username_generator, b3_business_name_generator, b3_business_slogan_generator, b3_blog_name_generator, b3_youtube_thumbnail_text_generator, b3_youtube_chapters_generator, b3_seo_content_brief_generator, b3_robots_txt_generator, b3_xml_sitemap_validator, b3_local_business_schema_generator, b3_shopify_collection_description_generator, b3_etsy_shop_announcement_generator, b3_etsy_shop_about_section_generator, b3_break_even_roas_calculator, b3_ltv_cac_ratio_calculator, b3_email_preheader_generator, b3_website_hero_headline_generator, b3_saas_value_proposition_generator, b3_changelog_entry_generator, b4_xml_sitemap_generator, b4_hreflang_tag_generator, b4_canonical_url_checker, b4_redirect_chain_checker, b4_json_ld_schema_validator, b4_open_graph_tags_generator, b4_product_schema_generator, b4_internal_link_opportunity_finder, b4_keyword_to_page_mapper, b4_seo_content_gap_planner, b4_saas_product_name_generator, b4_product_hunt_launch_copy_generator, b4_shopify_sku_generator, b4_shopify_abandoned_checkout_email_generator, b4_local_service_page_outline_generator, b4_local_seo_keyword_modifier_generator, b4_landing_page_copy_generator, b4_mrr_calculator, b4_customer_retention_rate_calculator, b4_ab_test_sample_size_calculator, seo_website_metadata_extractor, seo_website_seo_checker, seo_broken_link_checker, seo_sitemap_url_status_checker, seo_long_tail_keyword_generator, seo_seo_question_generator, seo_core_web_vitals_checker, seo_serp_checker, seo_keyword_rank_checker, seo_people_also_ask_tool, seo_serp_features_checker, seo_local_serp_checker, seo_keyword_search_volume_checker, seo_keyword_difficulty_checker, seo_keyword_research_tool, seo_organic_keywords_finder, seo_website_traffic_checker, seo_seo_competitor_finder, seo_competitor_keyword_gap, seo_ai_overview_checker, seo_keyword_trends_tool, seo_bulk_keyword_rank_checker, seo_domain_comparison_tool, seo_website_audit_tool];
