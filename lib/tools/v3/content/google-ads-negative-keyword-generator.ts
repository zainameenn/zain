import type { NewToolContent } from "../content-types";

export default {
  slug: "google-ads-negative-keyword-generator",
  name: "Negative Keyword Generator",
  keyword: "negative keyword generator",
  metaTitle: "Negative Keyword Generator (100% FREE)",
  metaDescription: "Negative keyword generator for Google Ads. Get one list of terms to exclude, with match types, reasons and risk levels to review. Free, no signup.",
  lede: "This negative keyword generator helps you find searches that waste your Google Ads budget. Describe your business, paste a few search terms, and get one candidate list to review before you add anything.",
  sub: "One list with keyword, suggested match type, reason and risk level, ready to export as CSV.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your business", text: "Add your business type, what you sell, who it's for and the keywords you target. Add a market if it matters." },
    { title: "Paste search terms", text: "Paste terms from your search terms report and list anything you never want excluded, like your brand or core products." },
    { title: "Review, then export", text: "Check every row, remove anything you aren't sure about, and download the CSV. Regenerate if you want a fresh list. Nothing is ever added to your Google Ads account." },
  ],
  examples: {
    heading: "Negative keyword",
    accent: "examples",
    intro: "Short examples of what the list looks like. Your result depends on what you enter.",
    items: [
      {
        title: "Paid accounting software",
        input: "Cloud accounting software for small businesses, paid plans only.",
        output: "free (broad, low risk): you don't offer a free plan. \"accounting jobs\" (phrase, low risk): job seekers, not buyers. [excel template] (exact, medium risk): people building their own.",
        why: "Each term comes with a clear reason, and the risk level tells you what to double check.",
      },
      {
        title: "Local plumbing company",
        input: "Emergency plumber in Leeds, homes only. Never exclude: boiler.",
        output: "\"plumbing course\" (phrase, low risk): training intent. diy (broad, medium risk): people fixing it themselves. \"commercial plumbing\" (phrase, medium risk): you only serve homes.",
        why: "Boiler searches stay untouched because they were listed as never exclude.",
      },
      {
        title: "Premium dog food store",
        input: "Online shop for grain free dog food. Pasted terms include \"dog food recall\" and \"cheap dog food\".",
        output: "recall (broad, medium risk): news and safety intent. \"cheap dog food\" (phrase, high risk): price shoppers who may still buy.",
        why: "High risk rows flag terms that could block real buyers, so the decision stays with you.",
      },
    ],
  },
  guidance: {
    heading: "Using negative keywords",
    accent: "safely",
    items: [
      { title: "Start from real search terms", text: "Your search terms report shows what people actually typed before clicking your ads. It's the best source for negatives." },
      { title: "Close variants aren't covered", text: "Negative keywords don't match close variants or synonyms. If you want to exclude plurals, misspellings or other wordings, add them yourself." },
      { title: "Keep risky terms narrow", text: "A broad negative blocks any search that contains all its words. Phrase or exact match keeps the exclusion tight." },
      { title: "Protect your core terms", text: "Use the never exclude field for your brand, products and best converting words, then check the list for conflicts anyway." },
      { title: "Use negative keyword lists", text: "Terms like jobs or free often apply to every campaign. A shared list saves you adding them one by one." },
    ],
  },
  faqs: [
    { q: "What are negative keywords?", a: "Negative keywords stop your ads showing for searches that include certain words. They help you avoid paying for clicks from people who were never going to buy, like job seekers or people looking for something free." },
    { q: "What is negative broad match?", a: "It's the default negative match type, written as a plain word or words. Your ad won't show if the search contains all of the negative terms, in any order. If only some of the words appear, your ad can still show." },
    { q: "What is negative phrase match?", a: "You write it in quotes, like \"running shoes\". Your ad won't show if the search contains those words in that order, even with other words before or after." },
    { q: "What is negative exact match?", a: "You write it in brackets, like [running shoes]. Your ad won't show only when the search is exactly those words in that order, with nothing extra." },
    { q: "How do I add negative keywords to Google Ads?", a: "You can add them to a campaign or ad group, straight from the search terms report, or through a negative keyword list that you apply to several campaigns. Google Ads Help has the current steps in [About negative keywords](https://support.google.com/google-ads/answer/2453972)." },
    { q: "Can negative keywords hurt performance?", a: "Yes, if they're too broad. A single word like cheap or near me can block searches that would have converted. That's why this tool gives each row a risk level and asks you to review before you import." },
    { q: "What should not be excluded?", a: "Your brand name, your product and service names, and the words that already bring you sales. Check your conversion data before excluding anything that has converted before." },
    { q: "How do I find irrelevant search terms?", a: "Open the search terms report in Google Ads and sort by cost or clicks. Look for terms with spend and no conversions that clearly don't match what you sell, then paste them here." },
  ],
  related: [
    { slug: "utm-link-builder", text: "Tag your ad landing pages so you can see what converts." },
    { slug: "seo-search-intent-classifier", text: "Check the intent behind the keywords you bid on." },
    { slug: "marketing-plan-generator", text: "Fit paid search into a simple plan with your other channels." },
  ],
  cta: {
    heading: "Want help with your",
    accent: "Google Ads?",
    copy: "If your budget keeps going to the wrong searches, I can look at your account and help you fix the targeting.",
    button: "See ads services",
    href: "/services/google-and-meta-ads-specialist",
  },
  hubCard: { description: "Find search terms worth excluding from Google Ads, with match types, reasons and risk levels to review.", cta: "Generate negative keywords" },
  sources: [
    { label: "Google Ads Help: About negative keywords", url: "https://support.google.com/google-ads/answer/2453972", checked: "October 2026" },
    { label: "Google Ads Help: About negative keyword lists", url: "https://support.google.com/google-ads/answer/2453983", checked: "October 2026" },
    { label: "Google Ads Help: About the search terms report", url: "https://support.google.com/google-ads/answer/2472708", checked: "October 2026" },
  ],
} satisfies NewToolContent;
