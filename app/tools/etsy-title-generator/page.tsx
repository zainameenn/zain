import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import t from "../_studio/edtool.module.css";
import f from "../facebook-bio-generator/fb.module.css";
import { EtsyTitleTool } from "./EtsyTitleTool";
import s from "./etsy.module.css";

// The Etsy Title Generator on its own route (it overrides app/tools/[slug] for this slug), built from the
// October 30, 2026 brief. Same page pattern as the Facebook Bio Generator; titles come from /api/tools/etsy-title.

const PATH = "/tools/etsy-title-generator";
const TITLE = "Free Etsy Title Generator (AI + Photo Upload) | Zain Ul Abdin";
const DESCRIPTION = "Upload a product photo or describe what you sell. Get three clear Etsy title ideas, edit the wording, and copy one in seconds. Free, with no sign in.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ART = "/assets/tools/etsy-title";

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4V9.5Z" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", icon: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.84v2.36H8v3h2.5V21h3Z" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/", icon: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.44-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z" },
  { name: "X", href: "https://x.com/zainnameen", icon: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z" },
];

const FAQS: [string, string][] = [
  ["What is an Etsy title generator?", "It's a tool that turns a product photo or a short description into title ideas for an Etsy listing. This one gives you three different wordings that you can edit, check against Etsy's 140 character limit and copy."],
  ["How long can an Etsy title be?", "Etsy allows up to 140 characters. You don't have to use all of them. A shorter title that says clearly what the item is usually reads better, especially on a phone."],
  ["What should come first in an Etsy title?", "What the item is, in the words a buyer would search. Search results and phones often cut titles short, so the first few words should make sense on their own."],
  ["Can I generate a title from a product photo?", "Yes. Upload a JPG, PNG or WebP photo and the tool describes what it can clearly see, such as the type of item, colors and style. Add anything a photo can't show, like the material or size, in the optional details."],
  ["Will the tool guess the material or size from my photo?", "No. A photo can't confirm whether a ring is solid gold or how big a print is. The tool only uses materials, sizes, personalization and similar facts when you type them in."],
  ["Should I repeat keywords in my Etsy title?", "No. Repeating the same phrase makes a title harder to read and doesn't help buyers. Use each phrase once and put the extra phrases in your 13 tags and your listing attributes."],
  ["What's the difference between Etsy titles and tags?", "The title is what buyers read in search results, so it should be a clear description. Tags are 13 short phrases of up to 20 characters each that help Etsy match your listing to searches. Attributes, like color and material, are chosen from Etsy's own lists."],
  ["Does this tool show search volume or guarantee rankings?", "No. It doesn't claim search volumes or promise rankings. It helps you write a clear, accurate title. How a listing performs also depends on photos, price, reviews and many other things."],
  ["Can I write titles in other languages?", "Yes. Open the optional details and choose Spanish, French, German, Italian, Dutch or Portuguese before you generate. Read the result through, since a native speaker may still prefer a small change."],
  ["Is the Etsy Title Generator free? Is my photo stored?", "It's free and there's no sign in. Your photo and details are sent to an AI provider to write the titles and aren't stored by this site. Don't upload photos with personal information in them."],
];

const SECTION = ({ id, band, children }: { id?: string; band?: boolean; children: React.ReactNode }) => {
  const inner = (
    <section id={id} className={t.sec}>
      <div className={e.container}>{children}</div>
    </section>
  );
  return band ? <div className={t.band}>{inner}</div> : inner;
};

const Head = ({ kicker, title, intro }: { kicker: string; title: React.ReactNode; intro?: string }) => (
  <div className={t.center}>
    <p className={e.eyebrow}>{kicker}</p>
    <h2 className={e.h2} style={{ maxWidth: 820 }}>{title}</h2>
    {intro ? <p className={e.body} style={{ marginTop: 14 }}>{intro}</p> : null}
  </div>
);

const Figure = ({ name, alt }: { name: string; alt: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={f.figure} src={`${ART}/${name}.svg`} alt={alt} width={1200} height={650} loading="lazy" decoding="async" />
);

export default function EtsyTitleGeneratorPage() {
  const url = `${SITE_URL}${PATH}`;
  return (
    <EditorialPage>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Free Tools", url: `${SITE_URL}/tools` },
              { name: "Etsy Title Generator", url },
            ]),
            { "@type": "WebApplication", name: "Etsy Title Generator", url, description: DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
            { "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          ],
        }}
      />

      <section className={f.hero} id="top">
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li aria-current="page">Etsy Title Generator</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free ecommerce tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            Free Etsy <span className={t.accent}>Title Generator</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            This free Etsy title generator turns a product photo or a short description into three clear listing titles. Add any details you know, edit the wording, then copy the one you like.
          </p>
          <p className={f.quote}>A clear title tells buyers what you sell before they even click.</p>
          <EtsyTitleTool />
        </div>
      </section>

      <SECTION id="how-it-works" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Three simple steps</p>
            <h2 className={e.h2}>How to use the <em className={e.emGreen}>Etsy Title Generator</em></h2>
            <ol className={f.steps}>
              <li><strong>Add a photo or describe the item.</strong> Upload a product photo, type what the item is, or do both.</li>
              <li><strong>Add the details you know.</strong> Material, size, color and personalization only go into a title when you give them.</li>
              <li><strong>Edit and copy.</strong> Compare three titles, check the character count, tweak any word and copy your favorite into Etsy.</li>
            </ol>
          </div>
          <Figure name="01-photo-to-title" alt="A product photo and a few details turning into three Etsy title options" />
        </div>
      </SECTION>

      <SECTION id="what-is">
        <Head
          kicker="The basics"
          title={<>What is an Etsy <em className={e.emGreen}>title generator?</em></>}
          intro="An Etsy title generator helps you describe a product in the words buyers use when they search. Instead of staring at an empty title box, you start with three accurate options and make them yours."
        />
        <p className={e.body} style={{ maxWidth: 760, margin: "16px auto 0", textAlign: "center" }}>
          It doesn&apos;t replace knowing your product. You know the material, the size and who it&apos;s for. The tool helps you put those facts in a clear order, so the most important words come first.
        </p>
      </SECTION>

      <SECTION id="how-long" band>
        <div className={f.split}>
          <Figure name="02-title-anatomy" alt="An Etsy title broken into parts: the item, key details, and optional extras, within 140 characters" />
          <div>
            <p className={e.eyebrow}>Length</p>
            <h2 className={e.h2}>How long should an <em className={e.emGreen}>Etsy title be?</em></h2>
            <p style={{ marginTop: 16 }}>Etsy allows up to <strong>140 characters</strong>. That&apos;s a limit, not a target.</p>
            <p>A title that reads like a short description usually works better than one that fills every character. Start with the item, add the two or three details buyers check most, and stop when the title is clear.</p>
            <p>The generator counts characters and words for each title. If a title reaches 15 words, you&apos;ll see a gentle note to consider trimming it.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="photo">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Photo upload</p>
            <h2 className={e.h2}>What a photo can and <em className={e.emGreen}>can&apos;t tell us</em></h2>
            <p style={{ marginTop: 16 }}>A photo shows the type of item, its colors, its shape and its style. That&apos;s often enough for a good starting title.</p>
            <p>It can&apos;t confirm the material, the exact size, whether something is handmade or what buyers can personalize. A brass ring and a gold ring can look the same on screen.</p>
            <p className={f.focusLine}>So the tool only uses those facts when you type them in. Anything you add in the optional details takes priority over the photo.</p>
          </div>
          <Figure name="05-photo-vs-confirmed-facts" alt="What a product photo shows, such as color and shape, compared with facts the seller must confirm, such as material and size" />
        </div>
      </SECTION>

      <SECTION id="good-title" band>
        <Head
          kicker="Before and after"
          title={<>What makes a <em className={e.emGreen}>good Etsy title?</em></>}
          intro="Most weak titles are a pile of repeated keywords. A good one reads like a clear description a buyer can understand at a glance."
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.wide} src={`${ART}/03-before-and-after.svg`} alt="A keyword stuffed Etsy title rewritten into a short, clear title" width={1200} height={650} loading="lazy" decoding="async" />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["1", "Say what it is", "Name the item the way a buyer would search for it, in plain words."],
            ["2", "Use real details", "Color, material, size and personalization help buyers pick the right listing, as long as they're true."],
            ["3", "Each phrase once", "Repeating a phrase doesn't help buyers. Put extra phrases in your tags instead."],
          ].map(([i, h, p]) => (
            <li key={h} className={f.card}>
              <span className={f.icon} aria-hidden="true">{i}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </SECTION>

      <SECTION id="first-words">
        <div className={f.split}>
          <Figure name="04-search-result-preview" alt="An Etsy style search result where only the first words of a long title are visible" />
          <div>
            <p className={e.eyebrow}>The first few words</p>
            <h2 className={e.h2}>Why the first words <em className={e.emGreen}>matter most</em></h2>
            <p style={{ marginTop: 16 }}>In search results, and especially on phones, buyers often see only the start of a title before it&apos;s cut short.</p>
            <p>If those first words say &ldquo;Gorgeous Unique Must Have Gift&rdquo;, nobody knows what you&apos;re selling. If they say &ldquo;Gold Hoop Earrings&rdquo;, they know straight away.</p>
            <p>That&apos;s why every title from this generator starts with the item itself. The preview under your results shows roughly how much of each title fits.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="examples" band>
        <Head kicker="Examples" title={<>Etsy title examples <em className={e.emGreen}>by product type</em></>} intro="Original examples to show the pattern. Use the details of your own product, not these." />
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Weak title</th>
                <th scope="col">Clearer title</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Jewelry", "Earrings Gold Earrings Hoop Earrings Gift for Her Earrings", "Small Gold Hoop Earrings, Lightweight Everyday Hoops"],
                ["Art print", "Beautiful Wall Art Print Poster Art Decor Print", "Botanical Line Art Print, Sage Green Wall Art, 8x10"],
                ["Digital download", "Planner Printable Planner Digital Planner PDF", "Printable Weekly Planner, Minimal Undated Planner PDF"],
                ["Home and living", "Candle Soy Candle Candles Gift Candle Best Candle", "Lavender Soy Candle in Amber Jar, 8 oz"],
                ["Personalized gift", "Custom Gift Personalized Gift Name Gift Mug", "Personalized Name Mug, Custom Coffee Mug for Teachers"],
              ].map(([p, bad, good]) => (
                <tr key={p}>
                  <td>{p}</td>
                  <td>{bad}</td>
                  <td><strong>{good}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={e.small} style={{ textAlign: "center", marginTop: 16 }}>Only add a size, material or occasion when it&apos;s true for your item.</p>
      </SECTION>

      <SECTION id="titles-tags">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Three different jobs</p>
            <h2 className={e.h2}>Etsy titles vs. tags vs. <em className={e.emGreen}>descriptions</em></h2>
            <p style={{ marginTop: 16 }}><strong>Your title</strong> is what buyers read in search results. Keep it clear and descriptive.</p>
            <p><strong>Your tags</strong> are 13 short phrases, up to 20 characters each. They&apos;re the right place for the extra ways people search: synonyms, occasions and styles.</p>
            <p><strong>Your attributes</strong>, like color and material, are chosen from Etsy&apos;s own lists, so you don&apos;t need to squeeze them all into the title.</p>
            <p><strong>Your description</strong> gives the full detail: sizes, care, what&apos;s included and how personalization works.</p>
          </div>
          <Figure name="06-title-tags-attributes" alt="How an Etsy title, 13 tags and listing attributes each do a different job" />
        </div>
      </SECTION>

      <SECTION id="mistakes" band>
        <Head kicker="Easy to fix" title={<>Common Etsy title <em className={e.emGreen}>mistakes</em></>} intro="A few small changes usually make the biggest difference." />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["01", "Repeating the same keyword", "\"Desk Mat Desk Pad Desk Mat\" reads like spam. Say it once and use tags for the rest."],
            ["02", "Starting with filler words", "\"Gorgeous Unique Must Have\" tells buyers nothing. Start with the item."],
            ["03", "Claiming things that aren't true", "Don't write \"solid gold\" or \"handmade\" unless it is. Wrong details lead to returns and bad reviews."],
            ["04", "Using every character", "140 is the limit, not the goal. A shorter title is easier to read on a phone."],
            ["05", "ALL CAPS and symbols", "Capitals, stars and lines between words make a title harder to read."],
            ["06", "Brand names you don't own", "Using another brand's name to borrow its searches can get a listing removed."],
          ].map(([l, h, p]) => (
            <li key={h} className={f.card}>
              <span className={f.label}>{l}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </SECTION>

      <section id="faq" className={t.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>Questions, answered</p>
            <h2 className={e.h2}>Etsy Title Generator <em className={e.emGreen}>FAQs</em></h2>
            <p className={e.body} style={{ marginTop: 14 }}>The questions sellers ask most often about Etsy titles and this tool.</p>
          </div>
          <FAQAccordion faqs={FAQS.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <SECTION id="related-tools" band>
        <Head kicker="Keep building your shop" title={<>More free tools <em className={e.emGreen}>for Etsy sellers</em></>} intro="Once your title is sorted, these can help with the rest of your listing and shop." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["Etsy", "Etsy Shop Name Generator", "Find a shop name that fits what you make and is easy to remember.", "/tools/etsy-shop-name-generator"],
            ["Listings", "Product Description Generator", "Write a clear description to go with your new title.", "/tools/product-description-generator"],
            ["Pricing", "Etsy Fee Calculator", "See what Etsy fees take from each sale before you set a price.", "/tools/etsy-fee-calculator"],
          ].map(([l, h, p, href]) => (
            <li key={h} className={`${f.card} ${t.card}`} style={{ display: "block" }}>
              <span className={f.label}>{l}</span>
              <h3>{h}</h3>
              <p>{p}</p>
              <Link href={href} className={t.cardLink}>Open the tool <span aria-hidden="true">→</span></Link>
            </li>
          ))}
        </ul>
      </SECTION>

      <section className={`${f.social} ${t.last}`} aria-labelledby="social-h">
        <div className={e.container}>
          <h2 id="social-h" className={e.h2}>Want more practical tips <em className={e.emGreen}>for your Etsy shop?</em></h2>
          <p className={e.body} style={{ margin: "14px auto 0" }}>
            I share simple ideas on SEO, product listings and organic marketing. Follow along if you&apos;re building a shop and figuring things out as you go.
          </p>
          <ul className={f.socialLinks}>
            {SOCIALS.map((x) => (
              <li key={x.name}>
                <a href={x.href} target="_blank" rel="noopener noreferrer" className={f.socialLink}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                    <path d={x.icon} />
                  </svg>
                  {x.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </EditorialPage>
  );
}
