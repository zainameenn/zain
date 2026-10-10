# Growth Marketing Portfolio Website, Built with Next.js

**The source code behind [zainameen.com](https://www.zainameen.com): a marketing portfolio built to rank on Google, get cited by AI search, load fast on a slow phone, and turn visitors into conversations.**

Yes, a marketer built this. Designed, written and directed by me, built with Claude Code and an unreasonable number of PageSpeed runs. Turns out the person who fixes your growth problems can also ship a website. Mostly on purpose.

[**See it live**](https://www.zainameen.com) | [Services](https://www.zainameen.com/services) | [About](https://www.zainameen.com/about) | [Contact](https://www.zainameen.com/contact)

---

## Who built this

I'm **Zain Ul Abdin**, a growth marketing specialist for SaaS and service businesses, based in Lahore and working with teams in the US, UAE and Europe.

I find what's actually blocking growth, then fix it myself: SEO, Reddit, social media, content, design and ads. One person instead of five.

**Results across clients:**

- **100K+ users** brought in
- **85K+ users for one SaaS (Blainy)** with no paid ads
- **~30M search impressions in 12 months** for Blainy
- **50M+ search impressions** and **100M+ total impressions** across all clients

**Brands and products I've worked with:** Amoxt, Blainy, Hify, Everdry Waterproofing of Michiana, Virtarix, LoomPad, Eplie, TechEon, NeonRev and Commenty.

If you're looking for a growth marketing specialist, the fastest way to see how I think is to read this README. The second fastest is to [tell me what's stuck](https://www.zainameen.com/contact).

---

## What makes a good marketing portfolio

Most marketing portfolios look nice and say nothing. This one was built around a few rules I'd give any client:

1. **Say what you sell in the first line.** The homepage H1 is the keyword and the offer, not a clever slogan with nothing behind it.
2. **Put proof above the fold.** Real numbers, real client names, real screenshots. No "increased engagement by 400%" that turns out to be 3 likes becoming 12.
3. **Show the price.** Every service has a public monthly price. Nobody has to "hop on a call" to find out.
4. **Position against the alternative.** The buyer is choosing between hiring five specialists, an agency, or one person. The site says that out loud.
5. **Make the next step easy.** One clear call to action on every page. Messy briefs welcome.
6. **Sound like a person.** Short sentences, plain English, a little dry humor. Corporate copy gets skimmed.

If you're building your own marketing portfolio website, steal the structure. Not the copy. I'll know.

---

## The SEO behind it

This site is the case study. Here's what's built in.

### On page SEO

- **Keyword in five places on every page:** title tag, meta description, URL, H1 and the start of the first sentence (Edward Sturm's method).
- **One H1 per page**, written to rank and still read well.
- **One keyword per page**, so pages don't compete with each other.
- **Internal links use the target keyword as anchor text**, so the homepage passes authority to each service page.
- **Descriptive alt text** on every image.

### Keyword map

| Page | Target keyword |
|---|---|
| `/` | growth marketing specialist for SaaS |
| `/services` | growth marketing services for SaaS |
| `/services/seo-specialist-for-saas` | SEO specialist for SaaS |
| `/services/reddit-marketing-specialist` | Reddit marketing specialist |
| `/services/social-media-marketing-specialist` | social media marketing specialist |
| `/services/google-and-meta-ads-specialist` | Google and Meta ads specialist |
| `/services/saas-growth-consultant` | SaaS growth consultant |
| `/case-studies/blainy` | Blainy case study |

### Technical SEO

- **Unique title, description, canonical and Open Graph tags** on every page, so shared links show the right preview.
- **Permanent redirects** from every old URL straight to the new one. No redirect chains.
- **XML sitemap** submitted to Google Search Console and Bing Webmaster Tools.
- **IndexNow** to notify Bing and other engines the moment pages change.
- **Structured data** describing the person, the business and the website.

### AI search (GEO)

- **robots.txt welcomes AI crawlers by name:** OpenAI, Anthropic, Perplexity, Google, Apple and more, including their search and user agents, not just training bots.
- **`llms.txt`** gives AI tools a clean summary of who I am, what I do and where each page lives.
- **Answer style copy and FAQs**, written so a sentence can be lifted straight into an AI answer.

---

## Performance and accessibility

Speed is an SEO factor and a conversion factor. Here's what changed during optimization:

- **Page weight cut by about 90%:** the homepage went from roughly 8.2 MB to about 0.7 MB.
- **Images served as AVIF and WebP**, sized to the screen, and lazy loaded below the fold.
- **Fonts loaded without blocking the first paint**, with sized fallbacks so nothing jumps.
- **Icons self hosted** instead of 20+ requests to an outside CDN.
- **Analytics deferred** so tracking never slows down the page.
- **Contact calendar loads on click**, cutting the contact page from 3.7 MB to about 0.7 MB.
- **Zero layout shift** across pages.
- **Accessibility score of 100**, with contrast fixed and headings in order.

Test it yourself on [PageSpeed Insights](https://pagespeed.web.dev/). Scores move a little between runs, so test two or three times.

---

## Tech stack

- **[Next.js](https://nextjs.org/)** (App Router) and **React**
- **TypeScript**
- **`next/image`** for responsive, modern format images
- **`next/font`** for self hosted fonts
- **[Vercel](https://vercel.com/)** for hosting and preview deployments
- **Google Analytics** and **Microsoft Clarity** for measurement

---

## Run it locally

You'll need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/zainameenn/zain.git
cd zain
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

**Useful scripts:**

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local dev server |
| `npm run build` | Builds the production site |
| `npm start` | Runs the production build locally |
| `npm run lint` | Checks the code for problems |
| `npm run indexnow` | Tells search engines the live pages changed. Only for the live site, after a deploy. |

---

## Using this as a portfolio template

You're welcome to learn from the code and use the structure for your own portfolio website. A few rules:

- **The code** is free to use under the license in this repo.
- **The content is not.** My copy, case studies, client names, logos, screenshots, testimonials, illustrations and branding belong to me or my clients. Replace all of it with your own.
- **Fonts:** General Sans loads from [Fontshare](https://www.fontshare.com/) and isn't included here. Get it from Fontshare under their license if you want it.
- **IndexNow:** generate your own key. Don't reuse mine.
- **Analytics:** swap in your own Google Analytics and Clarity IDs, or remove them.

If you use it, a star on the repo is appreciated. A link back is appreciated even more.

---

## FAQ

**What should a marketing portfolio include?**
A clear line about what you do and who it's for, real results with numbers, a few case studies that show the problem and what you changed, your services and prices, testimonials, and one obvious way to contact you.

**How do I make my portfolio website rank on Google?**
Pick one keyword per page and put it in the title, meta description, URL, H1 and first sentence. Make the site fast on mobile, submit a sitemap in Google Search Console, and get a few real sites linking to you.

**How do I get my portfolio cited by ChatGPT or other AI tools?**
Allow AI search crawlers in robots.txt, add an llms.txt file, and write clear answer style sentences that can be quoted on their own.

**Is this Next.js portfolio free to use?**
The code is, under the repo license. The content and branding aren't. See [Using this as a portfolio template](#using-this-as-a-portfolio-template).

**Can you build or fix a marketing portfolio for me?**
I'm a growth marketing specialist, not a web agency. But if your site has a growth problem, like no traffic, no leads or no rankings, [that's exactly my job](https://www.zainameen.com/contact).

---

## Work with me

I take two clients at a time, so you get my full attention.

- **Website:** [zainameen.com](https://www.zainameen.com)
- **Services:** [zainameen.com/services](https://www.zainameen.com/services)
- **Contact:** [Tell me what's stuck](https://www.zainameen.com/contact)

Bring the problem. I'll bring the coffee.
