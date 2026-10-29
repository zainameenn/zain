import type { NewToolContent } from "../content-types";

export default {
  slug: "core-web-vitals-checker",
  name: "Core Web Vitals Checker",
  keyword: "core web vitals checker",
  metaTitle: "Core Web Vitals Checker (100% FREE)",
  metaDescription: "Core Web Vitals checker that shows real user LCP, INP and CLS for a URL from the Chrome UX Report, and says plainly when there isn't enough data.",
  lede: "This Core Web Vitals checker shows how real Chrome users experience a page. See loading, responsiveness and layout stability for mobile or desktop, wherever Google has enough real visits.",
  sub: "Check how real visitors experience your page.",
  trust: "Free, no signup. The URL is sent to Google's Chrome UX Report API. Nothing is stored.",
  steps: [
    { title: "Choose what to check", text: "Enter a URL and choose mobile or desktop." },
    { title: "Read the returned information", text: "Review the 75th percentile values and how visits split across good, needs improvement and poor." },
    { title: "Use the result", text: "Investigate the metric that's struggling, then check again after the next data window." },
  ],
  examples: {
    heading: "Field data,",
    accent: "and what it means.",
    items: [
      { title: "A slow hero image", input: "A product page with a large hero photo.", output: "LCP 3.4 s at p75, needs improvement.", why: "Look at how the main image loads first." },
      { title: "Buttons that feel laggy", input: "A page with heavy scripts.", output: "INP 380 ms, needs improvement.", why: "Long tasks on the main thread are the usual cause." },
      { title: "A small site", input: "A new page with few visits.", output: "No field data available.", why: "Not fast or slow, just not enough Chrome data. Use a lab test instead." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Field data is real visits", text: "The Chrome UX Report aggregates eligible real experiences over a rolling 28 day window. It's a different thing from a lab test such as Lighthouse, which runs one controlled load." },
      { title: "Page or whole site", text: "If a URL has too little data on its own, the checker shows the figures for the whole site and labels them clearly." },
      { title: "The three metrics", text: "Largest Contentful Paint (good at 2.5 s or less), Interaction to Next Paint (200 ms or less) and Cumulative Layout Shift (0.1 or less), each measured at the 75th percentile." },
      { title: "What this tool can't tell you", text: "No data doesn't mean a perfect or failing score. It means the dataset doesn't have enough visits. Lab diagnostics aren't included here yet." },
    ],
  },
  faqs: [
    { q: "What are the three Core Web Vitals?", a: "Largest Contentful Paint (LCP), Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS)." },
    { q: "What's the difference between field and lab data?", a: "Field data summarises real visits. Lab data comes from a controlled test designed to diagnose issues." },
    { q: "Why does my URL have no data?", a: "The Chrome UX Report doesn't have enough eligible visits for that URL, site or device." },
    { q: "Do good Core Web Vitals guarantee higher rankings?", a: "No. They describe page experience, but they can't replace useful, relevant content." },
    { q: "Why do mobile and desktop differ?", a: "Different devices, networks and layouts give different experiences, so the Chrome UX Report measures them separately." },
    { q: "How often does the data change?", a: "The Chrome UX Report covers a rolling 28 day window, so changes you make take a few weeks to show fully." },
  ],
  related: [
    { slug: "website-seo-checker", text: "Check the same page's SEO basics." },
    { slug: "website-metadata-extractor", text: "See the page's metadata." },
    { slug: "redirect-chain-checker", text: "Cut redirect hops that slow the first load." },
  ],
  cta: { heading: "Slow pages costing you?", accent: "Let's find out why.", copy: "I look at what's slowing real visitors down and fix what matters most.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See real user LCP, INP and CLS for a page from Google's Chrome UX Report.", cta: "Check Core Web Vitals" },
  sources: [{ label: "Chrome UX Report API", url: "https://developer.chrome.com/docs/crux/api", checked: "October 2026" }, { label: "web.dev: Web Vitals", url: "https://web.dev/articles/vitals", checked: "October 2026" }],
} satisfies NewToolContent;
