import type { NewToolContent } from "../content-types";

export default {
  slug: "local-business-faq-generator",
  name: "Local Business FAQ Generator",
  keyword: "local business faq generator",
  metaTitle: "Local Business FAQ Generator (100% FREE)",
  metaDescription: "Write clear FAQs for a local business website using real services, locations and policies. Get one useful question and answer set without invented promises.",
  lede: "This local business FAQ generator writes a clear FAQ section for your website from your real services and details, without made up prices, guarantees or policies.",
  sub: "Answer the questions customers ask before they contact you.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored. Don't include customer names or private details.",
  steps: [
    { title: "Explain your service", text: "Include the service and where the business operates." },
    { title: "Add facts customers need", text: "Share real booking steps, hours and policies, only if confirmed." },
    { title: "Review each answer", text: "Fix anything that doesn't match how the business works before publishing." },
  ],
  examples: {
    heading: "FAQs that build trust,",
    accent: "not promises.",
    intro: "Illustrative answers. Only publish them if they match the business's real process.",
    items: [
      { title: "Roof repair estimates", input: "Roof repair, Denver metro, inspections and written estimates, no guaranteed same day appointments.", output: "Q: Can I get a roof repair estimate before booking the work? A: We can talk through the issue and explain how our inspection and estimate process works. A final repair quote depends on what we find during the assessment.", why: "Answers directly without inventing a price." },
      { title: "A dental clinic", input: "Family dentist, accepts new patients, evening appointments on Thursdays.", output: "Q: Do you have evening appointments? A: Yes, on Thursdays. Call us to check the next available slot.", why: "Uses only the hours given and points to the next step." },
      { title: "When a fact is missing", input: "Electrician, no cancellation policy given.", output: "Q: What happens if I need to cancel? A: Please call us as soon as you can and we'll explain your options. (Flagged: cancellation policy)", why: "Doesn't invent terms, and flags the answer for you to fill in." },
    ],
  },
  guidance: {
    heading: "Writing FAQs",
    accent: "customers actually use.",
    items: [
      { title: "What a local business FAQ should cover", text: "The best FAQs remove doubt before a call or booking: areas served, what's included, how estimates work, how to book and what to prepare. Every business is different, so a restaurant, an electrician and an accountant shouldn't share answers. Start with questions customers actually ask in emails, calls and booking forms." },
      { title: "Answers that build trust", text: "Lead with a direct answer. If a job needs an assessment, say so instead of pretending to have a fixed price. If you're closed on weekends, don't say you're available 24/7. Keep one topic per question and give a next step when it helps. A clear, limited answer earns more trust than a confident claim you can't back up." },
      { title: "Where to put your FAQs", text: "Service specific FAQs belong on that service's page, where people are deciding. General booking, payment and coverage questions can go on a central FAQ page. Don't copy the same full set onto every page; the goal is helping visitors, not making repetitive pages." },
      { title: "About FAQ rich results", text: "Google [limited FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes) to well known government and health sites in 2023, so FAQ markup on an ordinary business site usually won't show special results. The FAQs still help visitors." },
    ],
  },
  faqs: [
    { q: "What questions should a small business FAQ answer?", a: "Start with what affects decisions: services, location, pricing approach, booking, timing, policies and what customers should prepare." },
    { q: "Should I include pricing in my FAQs?", a: "Yes, if you can answer accurately: starting prices, when a quote is needed, or what affects cost. Don't publish made up fixed prices." },
    { q: "How many FAQs should a service page have?", a: "Enough to answer the real questions visitors have. Five focused answers can beat twenty repetitive ones." },
    { q: "Can I use FAQs for local SEO?", a: "Useful, relevant answers make a page more complete and help visitors understand the service. They don't guarantee better rankings or special results." },
    { q: "Will Google show my FAQs as rich results?", a: "Usually not for ordinary business sites. Google limited FAQ rich results to well known government and health sites, and structured data never guarantees display." },
    { q: "Should I add the same FAQs to every service page?", a: "No. Keep general questions in one place and write service specific answers on the pages where they matter." },
    { q: "Can the generator write FAQs about refunds or cancellation?", a: "Only from policies you provide. It won't invent guarantees, cancellation windows, refunds or legal terms, and it flags answers that need a fact you didn't give." },
    { q: "Does this tool post FAQs to Google Business Profile?", a: "No. It writes FAQ copy for your website. Google discontinued the Business Profile Q&A API in November 2025." },
    { q: "Can I edit the questions after generation?", a: "Yes. Edit, remove or replace any question so it matches what customers ask and what the business can stand behind." },
  ],
  related: [
    { slug: "google-review-link-generator", text: "Make it easy to leave a review." },
    { slug: "meta-description-generator", text: "Write the page's meta description." },
    { slug: "facebook-bio-generator", text: "Write your Facebook Page bio." },
  ],
  cta: { heading: "Need more local customers", accent: "finding you?", copy: "I help local and service businesses get found and chosen.", button: "Tell me what's stuck", href: "/contact" },
  hubCard: { description: "Write a set of website FAQs from your real services and policies, with no invented promises.", cta: "Write business FAQs" },
  sources: [
    { label: "Google Search Central: changes to HowTo and FAQ rich results", url: "https://developers.google.com/search/blog/2023/08/howto-faq-changes", checked: "October 2026" },
    { label: "Google Business Profile Q&A API change log", url: "https://developers.google.com/my-business/content/qanda/change-log", checked: "October 2026" },
  ],
} satisfies NewToolContent;
