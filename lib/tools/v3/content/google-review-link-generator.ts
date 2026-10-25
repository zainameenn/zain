import type { NewToolContent } from "../content-types";

export default {
  slug: "google-review-link-generator",
  name: "Google Review Link Generator",
  keyword: "google review link generator",
  metaTitle: "Google Review Link Generator (100% FREE)",
  metaDescription: "Google review link generator that turns your Place ID or review link into a direct review link and QR code you can test, copy and download.",
  lede: "This Google review link generator turns your Place ID or official review link into a link that opens the review box for your business. Test it, copy it, and download a QR code.",
  sub: "A direct review link and a QR code, ready to share.",
  trust: "Free, no signup, no AI. Everything runs in your browser and nothing is sent anywhere.",
  steps: [
    { title: "Paste your link or Place ID", text: "Use the review link from your Google Business Profile, or paste your Place ID." },
    { title: "Test it", text: "Open the link to make sure it shows your business and the review box." },
    { title: "Copy or download", text: "Copy the link for emails and messages, or download the QR code for print." },
  ],
  examples: {
    heading: "How it",
    accent: "works",
    items: [
      { title: "From a Place ID", input: "Place ID: ChIJN1t_tDeuEmsRUsoyG83frY4", output: "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4", why: "The Place ID points straight to your business listing." },
      { title: "From your profile's review link", input: "A g.page/r/... short link copied from Ask for reviews", output: "The same official link, ready to test, copy and turn into a QR code", why: "The link Google gives you already works, so the tool keeps it." },
      { title: "Business name only", input: "Rosa's Bakery, Austin", output: "No link. The tool asks for your review link or Place ID instead.", why: "Guessing from a name could send customers to the wrong business." },
    ],
  },
  guidance: {
    heading: "Getting more honest",
    accent: "reviews",
    items: [
      { title: "Use the official link", text: "The link from your Business Profile is the safest starting point. Always test it before you share it." },
      { title: "Ask at the right moment", text: "Ask soon after a good experience, while it's fresh. A short, friendly request works best." },
      { title: "Never pay for reviews", text: "Don't offer discounts, gifts or money in exchange for reviews. Google doesn't allow it and may remove them." },
      { title: "Ask everyone the same way", text: "Asking only the customers you expect to be happy also goes against Google's policy. Send the same request to all of them." },
      { title: "Reply to reviews", text: "Thank people for good reviews and answer problems calmly. Future customers read the replies too." },
    ],
  },
  faqs: [
    { q: "How do I get my Google review link?", a: "Sign in to your Google Business Profile and choose Ask for reviews or Get more reviews. Google gives you a short link you can copy. See [Google's help page on getting reviews](https://support.google.com/business/answer/3474122)." },
    { q: "How can customers leave a Google review?", a: "They open your review link, sign in with a Google account, choose a star rating and write a few words. They can also find your business on Google Search or Maps and choose Write a review." },
    { q: "How do I create a QR code?", a: "Paste your review link or Place ID into this tool and download the QR code. Test it with your phone camera before you print it." },
    { q: "Where can I share the review link?", a: "On receipts, invoices, follow up emails, text messages, your website, social profiles, and printed cards or signs at your counter." },
    { q: "Can I use the link in emails?", a: "Yes. Add it to a thank you or follow up email with a short, polite request. Send the same request to every customer, not only those you expect to be happy." },
    { q: "Can I offer discounts in exchange for reviews?", a: "No. Google's fake engagement rules prohibit offering incentives such as discounts, free goods or money for reviews, and those reviews can be removed. See [Google's prohibited and restricted content policy](https://support.google.com/contributionpolicy/answer/7400114)." },
    { q: "How do I find my business Place ID?", a: "Use Google's [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id). Search for your business on the map and copy the ID it shows. Make sure the result is your exact business and address." },
  ],
  related: [
    { slug: "utm-link-builder", text: "Track which review requests get clicks." },
    { slug: "facebook-bio-generator", text: "Write a clear bio for your business page." },
    { slug: "meta-description-generator", text: "Write meta descriptions for your website." },
    { slug: "marketing-plan-generator", text: "Plan how you'll bring in more local customers." },
  ],
  cta: {
    heading: "Want more customers to find you on",
    accent: "Google?",
    copy: "Zain helps businesses show up in search and turn that visibility into leads.",
    button: "Talk to Zain",
    href: "/contact",
  },
  hubCard: { description: "Turn your Place ID or review link into a direct Google review link and QR code.", cta: "Make my link" },
  sources: [
    { label: "Google Business Profile Help: Get more reviews", url: "https://support.google.com/business/answer/3474122", checked: "October 2026" },
    { label: "Google Maps user contributed content policy: Prohibited and restricted content", url: "https://support.google.com/contributionpolicy/answer/7400114", checked: "October 2026" },
    { label: "Google Maps Platform: Place IDs and Place ID Finder", url: "https://developers.google.com/maps/documentation/places/web-service/place-id", checked: "October 2026" },
  ],
} satisfies NewToolContent;
