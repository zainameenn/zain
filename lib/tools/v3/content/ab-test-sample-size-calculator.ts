import type { NewToolContent } from "../content-types";

export default {
  slug: "ab-test-sample-size-calculator",
  name: "A/B Test Sample Size Calculator",
  keyword: "a/b test sample size calculator",
  metaTitle: "A/B Test Sample Size Calculator (100% FREE)",
  metaDescription: "A/B test sample size calculator that estimates visitors needed for a conversion test from baseline rate, minimum detectable effect, confidence and power.",
  lede: "This a/b test sample size calculator shows roughly how much traffic your experiment needs. Enter your current conversion rate and the smallest improvement worth detecting to get an estimated sample size for each variation, with the assumptions shown.",
  sub: "Know roughly how much traffic your experiment needs.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter your conversion rate", text: "Enter the conversion rate you see today." },
    { title: "Set the smallest lift", text: "Set the smallest relative uplift worth finding." },
    { title: "Review the estimate", text: "Check the visitor estimate before you launch the test." },
  ],
  examples: {
    heading: "Sample sizes,",
    accent: "set up properly.",
    intro: "Illustrative inputs. The calculator works out the actual numbers when you enter them.",
    items: [
      { title: "A typical signup page", input: "Baseline 5%, relative MDE 10%, power 80%, two sided alpha 0.05.", output: "Target variant rate 5.5%, with the visitors needed per variant calculated for you.", why: "A 10% relative lift on 5% is half a percentage point." },
      { title: "Bigger effect, smaller test", input: "Baseline 5%, relative MDE 30%.", output: "Far fewer visitors per variant than at 10%.", why: "Bigger effects are easier to detect." },
      { title: "How long it will run", input: "The same test with 2,000 eligible visitors a day.", output: "An estimate of days needed, based on the total sample.", why: "Helps decide if the test is realistic." },
    ],
  },
  guidance: {
    heading: "Planning",
    accent: "a test.",
    items: [
      { title: "What is minimum detectable effect?", text: "MDE is the smallest difference a test is planned to detect with the chosen confidence and power. At a 5% baseline, a 10% **relative** lift means 5.5% conversion, which is 0.5 percentage points." },
      { title: "Sample size is a planning estimate", text: "The calculation assumes independent visitors and a simple two arm test. Visitor quality, repeated tests, traffic changes, multiple comparisons and poor tracking can make real tests harder than the estimate suggests." },
      { title: "Method", text: "Uses the standard two sided z test approximation for two independent proportions, solved for the sample per variant and rounded up." },
    ],
  },
  faqs: [
    { q: "What is an A/B test sample size?", a: "The approximate number of visitors needed in each variant to detect a planned difference in conversion under your chosen assumptions." },
    { q: "What is statistical power?", a: "The chance the test detects the effect if it really exists. 80% is a common planning setting." },
    { q: "What does 95% confidence mean here?", a: "A two sided significance level of 0.05. It isn't a 95% chance that your idea is right." },
    { q: "What is relative versus absolute MDE?", a: "At a 5% baseline, a 10% relative lift is 5.5%. A 10 percentage point absolute lift would be 15%." },
    { q: "Can I stop as soon as the result looks significant?", a: "Checking repeatedly and stopping early can invalidate standard significance results unless you use a method built for it." },
    { q: "Can this guarantee I'll see an improvement?", a: "No. It estimates how big a test needs to be, not whether the effect exists." },
  ],
  related: [
    { slug: "landing-page-copy-generator", text: "Draft the variant to test." },
    { slug: "customer-acquisition-cost-calculator", text: "See what each conversion costs." },
    { slug: "break-even-roas-calculator", text: "Check what your ads need to return." },
  ],
  cta: { heading: "Want tests", accent: "that move numbers?", copy: "I help SaaS teams run experiments that lead to real growth.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Estimate visitors needed per variant from baseline rate, MDE, power and confidence.", cta: "Estimate sample size" },
  sources: [{ label: "statsmodels: power for two independent proportions", url: "https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.power_proportions_2indep.html", checked: "October 2026" }],
} satisfies NewToolContent;
