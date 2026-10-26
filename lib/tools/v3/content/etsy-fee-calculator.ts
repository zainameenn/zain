import type { NewToolContent } from "../content-types";

export default {
  slug: "etsy-fee-calculator",
  name: "Etsy Fee Calculator",
  keyword: "etsy fee calculator",
  metaTitle: "Etsy Fee Calculator (100% FREE)",
  metaDescription: "Calculate Etsy listing, transaction, payment processing, and advertising fees. See estimated profit and margins with a clear per order breakdown.",
  lede: "This Etsy fee calculator estimates Etsy fees, take home profit and margin from your selling price and costs. Adjust payment processing and advertising settings for your shop.",
  sub: "Know what you actually keep after an Etsy sale.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere. Estimates depend on your country, currency, taxes and order details, so verify final charges in your Etsy Payment account.",
  steps: [
    { title: "Enter your price", text: "Add what the buyer pays for the item and shipping, and pick the country of your bank account." },
    { title: "Add the costs you know", text: "Include product costs, the shipping you pay, and whether the order came from Offsite Ads." },
    { title: "Review your profit", text: "See each estimated fee separately instead of guessing from the payout total." },
  ],
  examples: {
    heading: "Etsy fees,",
    accent: "worked through.",
    intro: "Illustrative orders for a US seller using Etsy's published US rates. Your numbers will differ.",
    items: [
      { title: "A $30 item with $5 shipping", input: "$30 item, $5 shipping charged, $9 product cost, $4 postage, no Offsite Ads.", output: "Transaction fee $2.28, processing $1.30, listing $0.20. Estimated profit $18.23 (52% margin).", why: "The 6.5% transaction fee applies to the $35 order total, shipping included." },
      { title: "The same order from Offsite Ads", input: "Same order, attributed to Offsite Ads at 15%.", output: "Offsite Ads fee $5.25. Estimated profit $12.98 (37% margin).", why: "One ad attributed order takes almost a third of the profit on this item." },
      { title: "A low price item", input: "$8 item, free shipping, $3.50 product cost, $3 postage.", output: "Fees $1.21. Estimated profit $0.29.", why: "Fixed fees and postage weigh much more on cheap items, so check them before you price." },
    ],
  },
  guidance: {
    heading: "What Etsy charges,",
    accent: "and what it doesn't show you.",
    items: [
      { title: "What fees does Etsy charge sellers?", text: "Etsy fees don't come from a single percentage. The standard listing fee is $0.20 and the transaction fee is 6.5% of the order amount, including buyer paid shipping and gift wrapping. Payment processing varies by country. Advertising, regulatory, tax and currency conversion charges can also apply, which is why two sellers charging the same price can take home different amounts." },
      { title: "Why your payout isn't your profit", text: "A deposit from Etsy is not your net profit. You still pay for production, packaging, postage, refunds, supplies and marketing. If you sell a product for $30 but spend $12 making and shipping it, those $12 are costs even when Etsy doesn't subtract them. For monthly profit, also count fixed costs like subscriptions, software and equipment." },
      { title: "Pricing with fees in mind", text: "Start with what your product costs to make and deliver, then add fees and the profit you want to keep. Try different prices here. Watch out for discounts, free shipping promotions and Offsite Ads orders: a price that works without advertising can look much worse after the ad fee." },
      { title: "Sources and assumptions", text: "Rates come from [Etsy's fees and taxes page](https://help.etsy.com/hc/en-us/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy) and [payment processing fees by country](https://help.etsy.com/hc/en-gb/articles/115015628847-What-are-Payment-Processing-Fees-for-Selling-on-Etsy), checked October 2026. The calculator assumes a single item order and leaves out sales tax, VAT on seller fees, regulatory fees and currency conversion." },
    ],
  },
  faqs: [
    { q: "How much does Etsy take from a $100 sale?", a: "There's no universal amount. The $6.50 standard transaction fee on a $100 order is only one part. Listing fees, country specific payment processing, taxes and optional advertising may also apply. Enter your country and order details to see an itemized estimate." },
    { q: "Is Etsy's 6.5% transaction fee the same as the payment processing fee?", a: "No. The 6.5% transaction fee is separate from Etsy Payments processing. The processing rate depends on your seller country and can include both a percentage and a fixed amount." },
    { q: "Does Etsy charge fees on shipping?", a: "Yes. Buyer paid shipping is included in Etsy's transaction fee, and payment processing applies to the payment amount too. The postage you pay for the label is a separate business cost." },
    { q: "How much is the Etsy listing fee?", a: "Etsy's standard listing fee is $0.20 per listing. Listings last four months, and renewals or extra quantities sold can add listing fees. You can choose whether to count it for this sale." },
    { q: "What happens if an order comes from Etsy Offsite Ads?", a: "An attributed order adds a separate advertising fee: 15% or 12% depending on your shop's sales, capped at $100 per order. Check the rate that applies to your shop before calculating." },
    { q: "Does this tool include taxes and currency conversion?", a: "No. Sales tax, VAT on seller fees, regulatory fees and currency conversion aren't included, and the page says so next to the result rather than assuming they're zero." },
    { q: "Why does my Etsy Payment account show a different amount?", a: "Your balance can include other orders, refunds, reserves, deposits, taxes, ad charges and account adjustments. This calculator estimates one order, not your whole account." },
    { q: "Can I calculate the minimum selling price I need?", a: "Yes. The result shows a break even item price based on your costs and fee settings, with shipping held at what you charge." },
  ],
  related: [
    { slug: "etsy-offsite-ads-calculator", text: "See exactly what an Offsite Ads order costs you." },
    { slug: "etsy-title-generator", text: "Write a clearer listing title." },
    { slug: "shopify-profit-margin-calculator", text: "Compare margins if you also sell on Shopify." },
    { slug: "etsy-shop-name-generator", text: "Name a new shop." },
  ],
  cta: { heading: "Want more profitable", accent: "Etsy listings?", copy: "See how I took my own Etsy store to 120 orders by fixing listings, not buying ads.", button: "Read the LoomPad case study", href: "/case-studies/loompad" },
  hubCard: { description: "Estimate Etsy listing, transaction, processing and Offsite Ads fees, and see what you keep from each order.", cta: "Calculate Etsy fees" },
  sources: [
    { label: "Etsy: fees and taxes for selling", url: "https://help.etsy.com/hc/en-us/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy", checked: "October 2026" },
    { label: "Etsy: payment processing fees by country", url: "https://help.etsy.com/hc/en-gb/articles/115015628847-What-are-Payment-Processing-Fees-for-Selling-on-Etsy", checked: "October 2026" },
  ],
} satisfies NewToolContent;
