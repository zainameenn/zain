import { FAIR_USE, GUIDE_LEAD_TRACKING, GUIDE_SEO_AUDIT, LINK_SEO_SERVICE, LINK_TRACKING_AUDIT } from "../links";
import type { ToolField, ToolPage } from "../types";
import { UTM_MEDIUMS } from "../utm";
import { ERROR_TEXT, dataNote, freeFaq } from "../families/common";

// SEO Title Generator, Meta Description Generator and UTM Link Builder (docs/tools-spec.md).

const PAGE_TYPES = ["Blog post", "Service page", "Product", "Homepage", "Tool", "Category"];

const seoService = { summary: "Service page for SaaS SEO consulting for B2B startups", keyword: "saas seo consultant", page_type: "Service page", brand: "Zain", intent: "Hire" };

export const SEO_TITLE: ToolPage = {
  slug: "seo-title-generator",
  name: "SEO Title Generator",
  keyword: "seo title generator",
  group: "SEO",
  metaTitle: "SEO Title Generator: Free Title Tags With a Google Preview",
  metaDescription: "This free SEO title generator writes 5 title tags from your page and keyword, with a pixel width check and an approximate Google preview.",
  h1: { regular: "Free SEO", accent: "Title Generator" },
  heroDescription:
    "This SEO title generator writes five title tags from your page summary and target keyword. Each one gets a width check and a rough Google preview, so you see what gets cut off before Google does.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "summary", label: "What's on the page?", type: "textarea", placeholder: "A guide to fixing slow WordPress sites without plugins", required: true, maxLength: 1500 },
      { name: "keyword", label: "Target keyword", type: "text", placeholder: "speed up wordpress", required: true, maxLength: 150 },
      { name: "page_type", label: "Page type", type: "select", options: PAGE_TYPES },
      { name: "brand", label: "Brand name (optional)", type: "text", placeholder: "Zain", maxLength: 60 },
      { name: "intent", label: "What does the searcher want?", type: "select", options: ["Learn", "Compare", "Buy", "Hire", "Use a tool"] },
    ],
    button: "Write my SEO titles",
    secondary: "Try an example",
    exampleInput: seoService,
    resultsHeading: "Your SEO titles",
    emptyState: "Five title tags show up here, each with a character count, a width bar and an approximate Google preview.",
    more: "Write 5 more",
    dataNote: dataNote("titles"),
    smallPrint: "Approximate. Google may show a different title.",
    errorText: ERROR_TEXT,
    result: { kind: "options", limit: 65, target: [45, 60], widthBar: true, serp: "title" },
  },
  howTo: {
    heading: "How to use the SEO title generator",
    steps: [
      "**Describe the page honestly.** The title has to match what's actually on it, or Google is more likely to rewrite it.",
      "**Add the keyword people search.** One keyword, not five.",
      "**Pick the title that's both accurate and clickable,** then check the width bar.",
    ],
  },
  examples: {
    heading: "SEO title examples",
    items: [
      { inputLabel: "Service page", input: seoService, output: "SaaS SEO Consultant for B2B Startups | Zain", why: "Keyword first, audience clear, brand last." },
      {
        inputLabel: "Product page",
        input: { summary: "Product page for a large felt desk mat, 90 x 40 cm, with a non slip base", keyword: "large felt desk mat", page_type: "Product", brand: "", intent: "Buy" },
        output: "Large Felt Desk Mat, 90 x 40 cm, Non Slip Base",
        why: "Specs searchers filter by.",
      },
      {
        inputLabel: "Blog post",
        input: { summary: "A guide to fixing slow WordPress sites without plugins, with 7 fixes", keyword: "speed up wordpress", page_type: "Blog post", brand: "", intent: "Learn" },
        output: "How to Speed Up WordPress Without Plugins (7 Fixes)",
        why: "Keyword, method and a count the post delivers.",
      },
    ],
  },
  sections: [
    {
      heading: "How to choose an accurate SEO title",
      blocks: [
        { p: "An SEO title has two jobs: tell Google what the page is about, and make a human click. **ACCURACY COMES FIRST,** because a clickbait title that doesn't match the page gets rewritten, or worse, gets clicked and abandoned." },
        {
          ol: [
            "**Front load the keyword.** Put it in the first few words when it reads naturally.",
            "**Keep it around 50 to 60 characters.** Google doesn't publish a limit, but longer titles often get cut off.",
            "**Make every page's title unique.** Ten pages called \"Home | Brand\" is a titlesplosion Google has to clean up.",
            "**Brand at the end, once.** Short.",
          ],
        },
      ],
    },
    {
      heading: "Why Google may show a different title",
      blocks: [
        { p: "Google builds its title link from your title tag, your main heading, other prominent text and even anchor text from other sites. It rewrites when your title is stuffed, vague, too long, or doesn't match the page. Write a title that matches your H1 closely and you'll usually see it used as is." },
        { p: "**Common mistake:** keyword stuffing, like \"SEO Services, SEO Agency, Best SEO Company, SEO Experts\". It reads like a ransom note and Google will probably replace it." },
      ],
    },
  ],
  faqs: [
    freeFaq("SEO title generator"),
    { q: "Will Google show my exact title?", a: "Not guaranteed. Google decides what to show, but accurate, unique, focused titles are rewritten less often." },
    { q: "Is 60 characters a strict limit?", a: "No. Google truncates by width on screen, not a fixed count. 50 to 60 characters is a safe range for most titles." },
    { q: "Should my title match my H1?", a: "Close, but they don't need to be identical. Same topic, same keyword." },
    { q: "Can I use this for product pages?", a: "Yes. Pick \"Product\" and add the specs buyers search for." },
  ],
  ctas: [
    {
      heading: "Need help improving the rest of the page?",
      copy: "A title gets the click. The page has to earn the ranking. I do SEO for SaaS and service businesses, from page audits to content that brings in leads.",
      button: "Get a free SEO audit",
      href: LINK_SEO_SERVICE,
    },
  ],
  related: [{ slug: "meta-description-generator" }, { slug: "product-description-generator" }, { slug: "utm-link-builder" }],
  extraLinks: [GUIDE_SEO_AUDIT],
  api: { block: "seo-title", vars: {} },
};

const metaService = {
  summary: "Service page for bookkeeping for restaurants, monthly packages, free review call",
  keyword: "restaurant bookkeeping",
  page_type: "Service page",
  facts: "Starts at $299/month, 48 hour turnaround",
  title: "Restaurant Bookkeeping Services by Ledgerly",
};

export const META_DESCRIPTION: ToolPage = {
  slug: "meta-description-generator",
  name: "Meta Description Generator",
  keyword: "meta description generator",
  group: "SEO",
  metaTitle: "Meta Description Generator: Free, Accurate and Click Worthy",
  metaDescription: "This free meta description generator writes 3 descriptions from your page and keyword, sized to show in full on Google, with a live preview.",
  h1: { regular: "Free Meta", accent: "Description Generator" },
  heroDescription:
    "This meta description generator writes three descriptions from your page summary and keyword, each sized to show in full on Google. Pick one, check the preview, paste it into your SEO plugin.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "summary", label: "What's on the page?", type: "textarea", placeholder: "Service page for bookkeeping for restaurants, monthly packages, free review call", required: true, maxLength: 1500 },
      { name: "keyword", label: "Target keyword", type: "text", placeholder: "restaurant bookkeeping", required: true, maxLength: 150 },
      { name: "page_type", label: "Page type", type: "select", options: PAGE_TYPES },
      { name: "facts", label: "Key facts worth showing (optional)", type: "text", placeholder: "Starts at $299/month, 48 hour turnaround", maxLength: 300 },
      { name: "title", label: "Your SEO title (optional)", type: "text", placeholder: "Restaurant Bookkeeping Services by Ledgerly", maxLength: 120 },
    ],
    button: "Write my meta descriptions",
    secondary: "Try an example",
    exampleInput: metaService,
    resultsHeading: "Your meta descriptions",
    emptyState: "Three descriptions show up here, each with a counter and a Google style preview.",
    more: "Write 3 more",
    dataNote: dataNote("descriptions"),
    smallPrint: "Preview is approximate. Google may show different text.",
    errorText: ERROR_TEXT,
    result: { kind: "options", limit: 160, target: [120, 155], serp: "description" },
  },
  howTo: {
    heading: "How to use the meta description generator",
    steps: [
      "**Summarize the page.** What's on it, who it's for, what they can do there.",
      "**Add one keyword and any hard facts.** Prices, timeframes and specs make descriptions specific.",
      "**Pick, preview, paste.** Drop it into Yoast, Rank Math, Webflow or your page's meta tag.",
    ],
  },
  examples: {
    heading: "Meta description examples",
    items: [
      { inputLabel: "Service page", input: metaService, output: "Restaurant bookkeeping from $299 a month. Clean books every month, reports in 48 hours and a free review call to start.", why: "The keyword, a price and a timeframe, all from the page." },
      {
        inputLabel: "Blog post",
        input: { summary: "Blog post on speeding up WordPress without plugins: image sizes, hosting settings, before and after load times", keyword: "speed up wordpress", page_type: "Blog post", facts: "Seven fixes", title: "How to Speed Up WordPress Without Plugins (7 Fixes)" },
        output: "Speed up WordPress without plugins. Seven fixes, from image sizes to hosting settings, with before and after load times.",
        why: "Says exactly what the post covers, with a count it delivers.",
      },
      {
        inputLabel: "Product",
        input: { summary: "Product page for a large felt desk mat with a non slip base", keyword: "large felt desk mat", page_type: "Product", facts: "90 x 40 cm, non slip base, fits a keyboard, mouse and laptop", title: "Large Felt Desk Mat, 90 x 40 cm, Non Slip Base" },
        output: "Large felt desk mat, 90 x 40 cm, with a non slip base. Fits a keyboard, mouse and laptop with room to spare.",
        why: "Size and fit, the two things a buyer checks first.",
      },
    ],
  },
  sections: [
    {
      heading: "How to write a meta description Google actually uses",
      blocks: [
        { p: "Google only shows your meta description when it describes the page better than the page's own text does. So the trick isn't persuasion. It's **SUMMARY.**" },
        {
          ol: [
            "**Say what's on the page.** Specific beats salesy every time.",
            "**Include the keyword once.** Google bolds words that match the search, which catches the eye.",
            "**Add a hard fact.** A price, a number, a timeframe.",
            "**Keep it around 120 to 155 characters,** so it rarely gets cut off.",
            "**Write a unique one for every important page.** Duplicates are snoozeworthy for searchers and useless for Google.",
          ],
        },
        { p: "**Common mistake:** the keyword pile. Google's own example of a bad description is basically a list of products separated by commas. Write a sentence instead." },
      ],
    },
    {
      heading: "Does a meta description help rankings?",
      blocks: [{ p: "Not directly. It's widely accepted that Google doesn't use it as a ranking signal. What it can do is make your result more clickable when Google shows it, and more clicks from the right people is the whole point." }],
    },
  ],
  faqs: [
    freeFaq("meta description generator"),
    { q: "What's the best meta description length?", a: "Google doesn't set a limit, but around 120 to 155 characters usually shows in full on desktop." },
    { q: "Why does Google ignore my meta description?", a: "Usually because it doesn't match what the searcher typed, or the page text answers the search better. Accurate descriptions get used more often." },
    { q: "Should every page have a meta description?", a: "Google recommends one for every page, and at the very least your homepage and most important pages." },
  ],
  ctas: [
    {
      heading: "Good meta tags won't save a weak page.",
      copy: "I audit and fix SEO for SaaS and service businesses, from titles and descriptions to the content that actually ranks.",
      button: "Get a free SEO audit",
      href: LINK_SEO_SERVICE,
    },
  ],
  related: [{ slug: "seo-title-generator" }, { slug: "product-description-generator" }, { slug: "etsy-title-generator" }],
  extraLinks: [],
  api: { block: "meta-description", vars: {} },
};


const UTM_FIELDS: ToolField[] = [
  { name: "url", label: "Destination URL", type: "text", placeholder: "https://example.com/pricing", required: true, maxLength: 2000 },
  { name: "source", label: "Source (where the click comes from)", type: "text", placeholder: "linkedin", required: true, maxLength: 100 },
  { name: "medium", label: "Medium (the type of traffic)", type: "select", options: [...UTM_MEDIUMS, "Custom"], required: true },
  { name: "campaign", label: "Campaign name", type: "text", placeholder: "spring_sale", required: true, maxLength: 100 },
  { name: "content", label: "Content (optional, to tell links apart)", type: "text", placeholder: "banner_top", maxLength: 100 },
  { name: "term", label: "Term (optional, for paid keywords)", type: "text", placeholder: "crm_software", maxLength: 100 },
  { name: "id", label: "Campaign ID (optional)", type: "text", placeholder: "spring2026", maxLength: 100 },
];

const utm = (source: string, medium: string, content: string, term = "") => ({ url: "https://example.com/pricing", source, medium, campaign: "spring_sale", content, term, id: "spring2026" });

export const UTM_BUILDER: ToolPage = {
  slug: "utm-link-builder",
  name: "UTM Link Builder",
  keyword: "utm link builder",
  group: "SEO",
  metaTitle: "UTM Link Builder: Free Campaign URLs That Track in GA4",
  metaDescription: "This free UTM link builder creates clean campaign URLs, fixes capital letters and spaces, and warns you before GA4 files your traffic as Unassigned.",
  h1: { regular: "Free UTM", accent: "Link Builder" },
  heroDescription:
    "This UTM link builder turns any URL into a clean campaign link in seconds. It fixes capital letters and spaces, uses medium names GA4 understands, and warns you before your traffic ends up in \"Unassigned\".",
  accessNote: "Free and unlimited. Runs in your browser, nothing is sent to a server.",
  workspace: {
    fields: UTM_FIELDS,
    button: "Copy link",
    secondary: "Try an example",
    exampleInput: utm("linkedin", "social", "launch_post"),
    resultsHeading: "Your campaign link",
    emptyState: "Fill in the destination URL, source, medium and campaign. Your link builds as you type.",
    more: "",
    dataNote: "Your last 10 links are saved in this browser only, so you can reuse your naming.",
    errorText: "",
    result: { kind: "utm" },
  },
  howTo: {
    heading: "How to use the UTM link builder",
    steps: [
      "**Paste the page you're sending people to.**",
      "**Fill in source, medium and campaign.** Those three are the must haves.",
      "**Copy the link and use it everywhere for that campaign.** Same link, same names, every time.",
    ],
  },
  examples: {
    heading: "UTM examples for LinkedIn, email and social",
    layout: "table",
    columns: [
      { label: "Where you post", value: "inputLabel" },
      { label: "Source", value: "input.source" },
      { label: "Medium", value: "input.medium" },
      { label: "Campaign", value: "input.campaign" },
      { label: "Likely GA4 channel", value: "why" },
    ],
    items: [
      { inputLabel: "LinkedIn post", input: utm("linkedin", "social", "launch_post"), why: "Organic Social" },
      { inputLabel: "LinkedIn ad", input: utm("linkedin", "paid_social", "carousel_ad"), why: "Paid Social" },
      { inputLabel: "Newsletter", input: utm("newsletter", "email", "header_button"), why: "Email" },
      { inputLabel: "Google Ads", input: utm("google", "cpc", "search_ad", "crm_software"), why: "Paid Search" },
      { inputLabel: "Guest post link", input: utm("partner_blog", "referral", "author_bio"), why: "Referral" },
    ],
  },
  sections: [
    {
      heading: "Keep your UTM names consistent",
      blocks: [
        { p: "Here's the sneaky part. To GA4, \"LinkedIn\", \"linkedin\" and \"linked_in\" are three different sources. One campaign, three rows, zero clarity. It's the Spider-Man pointing at Spider-Man meme, live in your analytics." },
        { p: "**PICK ONE NAMING STYLE AND NEVER BREAK IT.** This builder forces lowercase and underscores so you can't break it by accident." },
        { p: "The second trap is the medium. Use the boring standard names: social, email, cpc, referral. Fancy ones like \"newsletter\" or \"ig_story\" belong in source or content, not medium." },
      ],
    },
    {
      heading: "Where to find campaign traffic in GA4",
      blocks: [
        { p: "In GA4, go to Reports, then Acquisition, then Traffic acquisition. Change the main dimension to Session campaign, or Session source / medium. Your tagged links show up there, usually within a day." },
        { p: "**One limit to know:** a UTM tells you where a visit came from. It doesn't tell you whether that visit became a lead or a sale. For that, you need conversions or key events set up in GA4." },
      ],
    },
  ],
  faqs: [
    { q: "Is this UTM link builder free?", a: "Yes, free and unlimited. It runs in your browser." },
    { q: "What should I put as source and medium?", a: "Source is the place (linkedin, newsletter, google). Medium is the type (social, email, cpc)." },
    { q: "Are UTM parameters case sensitive?", a: "Yes. Google treats \"Facebook\" and \"facebook\" as different values, which is why this tool lowercases everything." },
    { q: "Why is my traffic showing as Unassigned in GA4?", a: "Usually because the medium isn't one GA4 recognizes. Stick to the presets in the dropdown." },
    { q: "Will UTMs track sales?", a: "No. They track where visits come from. Pair them with conversion tracking to see sales." },
    { q: "Should I use UTMs on internal links?", a: "No. Tagging links between your own pages starts a new campaign attribution and messes up your data." },
  ],
  ctas: [
    {
      heading: "Want help connecting campaign traffic to enquiries?",
      copy: "I set up tracking for SaaS and service businesses so you can see which channel brings leads, not just clicks.",
      button: "Get a free tracking audit",
      href: LINK_TRACKING_AUDIT,
    },
  ],
  related: [{ slug: "marketing-plan-generator" }, { slug: "social-media-content-calendar-generator" }],
  extraLinks: [GUIDE_LEAD_TRACKING],
  api: null,
};
