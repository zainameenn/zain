import { CASE_STUDY_LOOMPAD, FAIR_USE, GUIDE_ETSY_TITLES, LINK_ECOMMERCE_SERVICE, LINK_LOOMPAD_CASE_STUDY } from "../links";
import type { ToolPage } from "../types";
import { ERROR_TEXT, dataNote, freeFaq } from "../families/common";

// Etsy Title Generator and Product Description Generator (docs/tools-spec.md).

const deskMat = {
  item: "Desk mat",
  traits: "Black felt, 90 x 40 cm, large",
  design: "Minimal mountain line art",
  occasion: "",
  current: "Desk Mat Large Mouse Pad Gaming Desk Mat Office Gift Desk Pad XXL Desk Mat",
  keyword: "large desk mat",
};

export const ETSY_TITLE: ToolPage = {
  slug: "etsy-title-generator",
  name: "Etsy Title Generator",
  keyword: "etsy title generator",
  group: "Ecommerce",
  metaTitle: "Etsy Title Generator: Free Titles for Etsy's New Rules",
  metaDescription: "This free Etsy title generator rewrites your listing title the way Etsy now recommends: item first, key traits up front, under 15 words, no fluff.",
  h1: { regular: "Free Etsy", accent: "Title Generator" },
  heroDescription:
    "This Etsy title generator rewrites your listing title the way Etsy now recommends: the item first, the traits buyers care about up front, and no keyword soup. Paste your old title to see a before and after.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "item", label: "What is it, in plain words?", type: "text", placeholder: "Desk mat", required: true, maxLength: 150 },
      { name: "traits", label: "Key traits (color, material, size, style)", type: "textarea", placeholder: "Black felt, 90 x 40 cm, non slip rubber base", required: true, maxLength: 1000 },
      { name: "design", label: "Design or theme", type: "text", placeholder: "Minimal mountain line art", maxLength: 200 },
      { name: "occasion", label: "Occasion or recipient (only if it's part of the product)", type: "text", placeholder: "Christmas ornament, Teacher gift", maxLength: 200 },
      { name: "current", label: "Your current title (optional, for before and after)", type: "textarea", placeholder: "Desk Mat Large Mouse Pad Gaming Desk Mat Office Gift Desk Pad XXL", maxLength: 300 },
      { name: "keyword", label: "Main phrase buyers search (optional)", type: "text", placeholder: "large desk mat", maxLength: 150 },
    ],
    button: "Write my Etsy title",
    secondary: "Try an example",
    exampleInput: deskMat,
    resultsHeading: "Your Etsy title",
    emptyState: "Your title shows up here, with a word count, a character count and a line on why it works.",
    more: "Regenerate",
    dataNote: dataNote("titles"),
    errorText: ERROR_TEXT,
    result: { kind: "options", limit: 140, words: true, beforeAfter: "current" },
  },
  howTo: {
    heading: "How to use the Etsy title generator",
    steps: [
      "**Name the item like a buyer would.** \"Desk mat\", not \"workspace enhancement solution\".",
      "**List the real traits.** Color, material, size, style. These are what buyers filter and search by.",
      "**Paste your old title, compare, then test.** Change a few listings first and watch your stats for a few weeks before you redo the whole shop.",
    ],
  },
  examples: {
    heading: "Before and after Etsy title examples",
    beforeLabel: "Before",
    afterLabel: "After",
    items: [
      { inputLabel: "Desk mat", input: deskMat, before: deskMat.current, output: "Large black felt desk mat, 90 x 40 cm, minimal mountain line art", why: "Repeats gone, traits up front." },
      {
        inputLabel: "Name necklace",
        input: { item: "Name necklace", traits: "Gold, dainty, 18 inch chain, personalized", design: "Name in script", occasion: "", current: "Beautiful Perfect Gift Personalized Necklace For Her Mom Wife Girlfriend", keyword: "personalized name necklace" },
        before: "Beautiful Perfect Gift Personalized Necklace For Her Mom Wife Girlfriend",
        output: "Personalized gold name necklace, dainty 18 inch chain",
        why: "\"Beautiful\" and \"perfect\" moved to the description.",
      },
      {
        inputLabel: "Coffee mug",
        input: { item: "Coffee mug", traits: "White ceramic, 11 oz", design: "Funny cat illustration", occasion: "", current: "Mug Coffee Mug Funny Mug Gift Mug Cat Mug", keyword: "funny cat mug" },
        before: "Mug Coffee Mug Funny Mug Gift Mug Cat Mug",
        output: "Funny cat coffee mug, 11 oz white ceramic",
        why: "One \"mug\", real details.",
      },
    ],
  },
  sections: [
    {
      heading: "Which product details belong in your Etsy title?",
      blocks: [
        { p: "Think of your title as the label on the shelf, not the sales pitch. Buyers scan, then click." },
        {
          ol: [
            "**The item.** Always first or close to it.",
            "**Two or three traits buyers filter by:** color, material, size, style.",
            "**The occasion or recipient only when it IS the product,** like a birthday candle or a Halloween costume.",
          ],
        },
        { p: "What doesn't belong: \"perfect\", \"beautiful\", \"best\", free shipping, sale info, or the same word four times. Etsy handles price and shipping badges itself." },
        { p: "Old school Etsy titles were keyword piñatas: whack them and 40 search terms fall out. **ETSY'S CURRENT ADVICE IS THE OPPOSITE.** Clear and short wins." },
      ],
    },
    {
      heading: "Review the title alongside the rest of your listing",
      blocks: [
        { p: "The title is one piece. Tags, attributes, photos and the description all help buyers find and choose you. Fill in every relevant attribute, since those power Etsy's search filters, and keep the title consistent with your first photo." },
        { p: "**One limit to know:** this tool doesn't use live Etsy search data. It writes clear titles from your details. Check your Etsy stats after changing titles." },
      ],
    },
  ],
  faqs: [
    freeFaq("Etsy title generator"),
    { q: "Should I use all 140 characters?", a: "No. Etsy's recent guidance suggests under 15 words. Clear beats long." },
    { q: "Does this tool research search volume?", a: "No. It writes titles from the details you give it. Use the optional search phrase field if you already know what buyers type." },
    { q: "Can it rewrite my existing title?", a: "Yes. Paste it in the \"current title\" field for a before and after." },
    { q: "Will changing my titles hurt my rankings?", a: "It can shift things for a while. Change a few listings first, compare after a few weeks, then roll out." },
  ],
  ctas: [
    {
      heading: "Want help reviewing the complete listing?",
      copy: "I run marketing for my own Etsy store, so I know where listings leak sales. I'll review your titles, photos, tags and descriptions.",
      button: "Get a listing review",
      href: LINK_LOOMPAD_CASE_STUDY,
    },
  ],
  related: [{ slug: "product-description-generator" }, { slug: "pinterest-title-generator" }, { slug: "pinterest-description-generator" }],
  extraLinks: [GUIDE_ETSY_TITLES],
  api: { block: "etsy-title", vars: {} },
};

const deskMatProduct = {
  name: "Large felt desk mat",
  specs: "90 x 40 cm\n4 mm felt\nNon slip rubber base\nPrinted design",
  audience: "People working long hours at a desk",
  uses: "Keyboard and mouse surface, protecting the desk",
  selling_points: "Printed to order, ships in 3 to 5 days",
  care: "Spot clean with a damp cloth",
  channel: "Etsy",
  tone: "Playful",
};

export const PRODUCT_DESCRIPTION: ToolPage = {
  slug: "product-description-generator",
  name: "Product Description Generator",
  keyword: "product description generator",
  group: "Ecommerce",
  metaTitle: "Product Description Generator: Free, No Made Up Specs",
  metaDescription: "This free product description generator turns your real specs into a description, feature bullets and buyer FAQs. Missing details get flagged, not invented.",
  h1: { regular: "Free Product", accent: "Description Generator" },
  heroDescription:
    "This product description generator turns your real specs into a description, feature bullets and buyer FAQs. Anything it would need to guess, it flags for you instead, so you never publish a size you don't sell.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "name", label: "Product name", type: "text", placeholder: "Large felt desk mat", required: true, maxLength: 200 },
      { name: "specs", label: "Specs (one per line)", type: "textarea", placeholder: "90 x 40 cm\n4 mm felt\nnon slip rubber base\nprinted design", required: true, maxLength: 1500 },
      { name: "audience", label: "Who buys it?", type: "text", placeholder: "People working long hours at a desk", maxLength: 300 },
      { name: "uses", label: "What do they use it for?", type: "text", placeholder: "Keyboard and mouse surface, protecting the desk", maxLength: 300 },
      { name: "selling_points", label: "Confirmed selling points", type: "textarea", placeholder: "Printed to order, ships in 3 to 5 days", maxLength: 1000 },
      { name: "care", label: "Care instructions (optional)", type: "text", placeholder: "Spot clean with a damp cloth", maxLength: 300 },
      { name: "channel", label: "Where will it go?", type: "select", options: ["Etsy", "Shopify", "Amazon", "My website"] },
      { name: "tone", label: "Tone", type: "chips", options: ["Friendly", "Premium", "Playful", "Straightforward"] },
    ],
    button: "Write my product description",
    secondary: "Try an example",
    exampleInput: deskMatProduct,
    resultsHeading: "Your product description",
    emptyState: "Your description, feature bullets and buyer FAQs show up here, plus a list of any details to confirm.",
    more: "Write it again",
    dataNote: dataNote("product description"),
    errorText: ERROR_TEXT,
    result: { kind: "product" },
  },
  howTo: {
    heading: "How to use the product description generator",
    steps: [
      "**Paste the specs, one per line.** Sizes, materials, what's included. The boring stuff sells.",
      "**Say who buys it and why.** That's what turns specs into benefits.",
      "**Check the \"details to confirm\" box before you publish.** Fill any gaps, then copy.",
    ],
  },
  examples: {
    heading: "Product description examples",
    layout: "wide",
    items: [
      {
        inputLabel: "Desk mat",
        input: deskMatProduct,
        output: "A big, soft landing spot for your keyboard and mouse. This 90 x 40 cm felt desk mat covers most of a standard desk, and the non slip rubber base keeps it from wandering mid game or mid spreadsheet.",
        why: "Each spec comes with what it means at the desk.",
      },
      {
        inputLabel: "Skincare",
        input: {
          name: "Daily hydrating face serum",
          specs: "30 ml glass dropper bottle\nHyaluronic acid\nFragrance free",
          audience: "People whose skin feels dry or tight",
          uses: "Morning and evening, before moisturizer",
          selling_points: "Made in small batches",
          care: "Store away from direct sunlight",
          channel: "Shopify",
          tone: "Premium",
        },
        output: "A light serum for skin that feels tight by lunch. Each 30 ml dropper bottle holds a fragrance free hyaluronic acid formula, made in small batches. Press it in morning and evening, before your moisturizer. Store it away from direct sunlight.",
        why: "Fewer, sharper words for a premium tone, and no skin claims the seller didn't make.",
      },
      {
        inputLabel: "Handmade candle",
        input: {
          name: "Cedar and orange soy candle",
          specs: "8 oz amber glass jar\nSoy wax\nCotton wick\nCedar and orange scent",
          audience: "People who like a calm, cozy home",
          uses: "Slow evenings and reading time",
          selling_points: "Hand poured in small batches",
          care: "Trim the wick to 5 mm before each burn",
          channel: "Etsy",
          tone: "Friendly",
        },
        output: "Cedar and orange in an amber glass jar, hand poured in small batches. The 8 oz soy candle burns on a cotton wick, made for slow evenings and reading time. Trim the wick to 5 mm before each burn.",
        why: "Scent and size first, then the moment it's for, then the care step.",
      },
    ],
  },
  sections: [
    {
      heading: "Explain benefits without losing the specs",
      blocks: [
        { p: "Buyers want two things from a description: why should I care, and will it fit my life? Most descriptions answer one and forget the other." },
        { p: "The fix is simple. Pair every spec with what it means. \"90 x 40 cm\" becomes \"fits a full keyboard, mouse and a coffee cup\". \"Non slip base\" becomes \"stays put when you're actually using it\"." },
        { p: "**SPECS BUILD TRUST. BENEFITS BUILD DESIRE.** You need both, in that order on the page: the benefit hooks them, the spec closes them." },
      ],
    },
    {
      heading: "What to check before you publish",
      blocks: [
        {
          ol: [
            "**Every number matches the real product.** Sizes, weights, capacities.",
            "**No claims you can't back up.** \"Eco friendly\", \"waterproof\", \"best selling\" need proof.",
            "**Care and safety info is accurate.** Especially for skincare, kids' products and anything electric.",
            "**Marketplace rules.** Etsy, Amazon and Shopify themes each format text differently, so preview it live.",
          ],
        },
        { p: "**Common mistake:** the adjective avalanche. \"Stunning, premium, luxurious, high quality\". That's four words saying nothing. One real detail, like \"4 mm thick felt\", beats all four." },
      ],
    },
  ],
  faqs: [
    freeFaq("product description generator"),
    { q: "Can I use it for Etsy or Shopify?", a: "Yes. Pick the channel and it formats the description to suit." },
    { q: "Will it invent product features?", a: "No. It only uses what you type. If something's missing, it lists it under \"details to confirm\"." },
    { q: "Can I include care instructions?", a: "Yes. Add them in the care field and they go into the description and FAQs exactly as written." },
    { q: "How long should a product description be?", a: "Long enough to answer a buyer's questions. Usually a short intro, 4 to 6 bullets and a few FAQs." },
  ],
  ctas: [
    {
      heading: "Need product copy that sounds like your brand?",
      copy: "I write product pages and listings for ecommerce brands, and I run the marketing for my own Etsy store. Copy that sells without overselling.",
      button: "See ecommerce copy help",
      href: LINK_ECOMMERCE_SERVICE,
    },
  ],
  related: [{ slug: "etsy-title-generator" }, { slug: "meta-description-generator" }, { slug: "pinterest-description-generator" }],
  extraLinks: [CASE_STUDY_LOOMPAD],
  api: { block: "product", vars: {} },
};
