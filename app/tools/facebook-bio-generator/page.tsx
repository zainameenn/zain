import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import t from "../_studio/edtool.module.css";
import { BioExamples, FacebookBioTool } from "./FacebookBioTool";
import f from "./fb.module.css";

// The Facebook Bio Generator on its own route (it overrides app/tools/[slug] for this slug), built from
// the October 30, 2026 page design. Bios are written by the site's AI endpoint, like every bio tool.

const PATH = "/tools/facebook-bio-generator";
const TITLE = "Free Facebook Bio Generator (Copy & Paste Ideas) | Zain Ul Abdin";
const DESCRIPTION = "Free Facebook bio generator for a short profile, creator, business Page or group intro. Get editable bio ideas and copy your favorite.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ART = "/assets/tools/facebook-bio";

const FAQS: [string, string][] = [
  ["What is a good simple bio for Facebook?", "Something clear and specific about you. For example: \"Coffee, good books, and a camera roll full of small moments.\" If it's for a business Page, try to say what the business offers rather than writing a generic quote."],
  ["How can I create a Facebook bio?", "Start with one or two details about yourself, your work or your interests. Pick a tone, generate a few options, then edit the wording until it feels natural. You can use the tool at the top of this page to get started."],
  ["What should I write in my Facebook bio?", "Write who you are, what you enjoy or do, and one detail that matters to people viewing the profile. For a creator, mention what you post. For a business, say what you sell or offer. You don't need all three if the line already feels complete."],
  ["What is the best bio for yourself?", "The one that sounds like you. A short personal line is usually more believable than a long motivational quote. Try describing an interest, a goal or something you genuinely like spending time on."],
  ["Can AI create a Facebook bio for me?", "Yes. This generator uses an AI model to turn your details into three bio ideas. It only works with what you tell it, so read each one through and edit anything that doesn't sound like you before you publish."],
  ["How long can a Facebook bio be?", "Many current Facebook short Intro fields use a limit of around 101 characters, as documented by several social media tools and guides. Facebook's longer About fields are different. Check the limit displayed in the specific Facebook field you are editing."],
  ["Can I use this for a Facebook business Page?", "Yes. Choose Business Page and describe your business, audience and offer. Keep the final line focused on what visitors need to know. Phone, address and website details are often better placed in the dedicated Page fields."],
  ["Can I use it for a Facebook Group?", "Yes, as a starting point. Select Facebook Group and describe the community. A Group description is a different field from a personal profile bio and can contain more information, including who the Group is for and what members should expect."],
  ["Can I copy and paste the generated bio?", "Yes. Choose one of the generated suggestions, edit it if you want, and use the Copy button. Then open your Facebook profile or Page and paste it into the appropriate field."],
  ["Should I add emojis or stylish fonts?", "Only if they fit your personality or brand. Emojis can help, but too many make a short bio crowded. Fancy Unicode text may look different across devices or be harder to read, so we recommend keeping the core wording plain."],
  ["Is this Facebook Bio Generator free and safe to use?", "Yes. It's free, it never asks for your Facebook password and it doesn't post anything to Facebook. The details you type are sent to an AI provider to write the bios and aren't stored by this site."],
  ["Can it write a Facebook bio in Bangla or Hindi?", "It can write in Hindi, Urdu, Arabic, Spanish, Portuguese, French, German, Italian, Indonesian and English. Pick the language before you generate. Bangla isn't supported yet."],
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

export default function FacebookBioGeneratorPage() {
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
              { name: "Facebook Bio Generator", url },
            ]),
            { "@type": "WebApplication", name: "Facebook Bio Generator", url, description: DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
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
              <li aria-current="page">Facebook Bio Generator</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free social media tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            Free Facebook <span className={t.accent}>Bio Generator</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            This Facebook bio generator turns a few details about you, your business or what you create into short bio ideas you can edit, copy and use on your profile.
          </p>
          <p className={f.quote}>No need to spend 20 minutes trying to describe yourself in one sentence.</p>
          <FacebookBioTool />
        </div>
      </section>

      <SECTION id="how-it-works" band>
        <Head kicker="Three simple steps" title={<>How to use the Facebook Bio Generator</>} intro="You don't need to be a good writer. A few real details are enough to get started." />
        <ol className={t.steps}>
          {[
            ["Tell us about yourself", "Write what you do, what you're into, or what your Facebook Page is about. One or two sentences is plenty."],
            ["Choose how it should sound", "Pick a tone that feels right. Keep it natural, make it professional, or add a little personality."],
            ["Copy the one you like", "Go through your bio ideas, edit any wording, check the length, then paste your favorite into Facebook."],
          ].map(([h, p], i) => (
            <li key={h}>
              <span className={t.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </SECTION>

      <SECTION id="what-is">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>The basics</p>
            <h2 className={e.h2}>What is a Facebook <em className={e.emGreen}>Bio Generator?</em></h2>
            <p style={{ marginTop: 16 }}>A Facebook bio generator helps you turn a few details about yourself or your Page into a short introduction. Instead of staring at an empty box and wondering what to say, you start with a few ideas.</p>
            <p>Maybe you&apos;re a creator who shares recipes. A small business that delivers flowers. Or just someone who wants a simple bio without sounding like everyone else.</p>
            <p>The goal isn&apos;t to invent a new personality. It&apos;s to help you put your own into words.</p>
            <p className={f.focusLine}>A good bio should sound like a person wrote it, not like a list of inspirational quotes stuck together.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={f.figure} src={`${ART}/bio-question-map.svg`} alt="Facebook bio questions grouped into ideas, writing steps, examples and profile types" width={1380} height={610} loading="lazy" decoding="async" />
        </div>
      </SECTION>

      <SECTION id="what-to-write" band>
        <div className={f.split}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={f.figure} src={`${ART}/bio-formula.svg`} alt="Three parts of a clear bio: who you are, what you do, and why people should follow" width={1200} height={440} loading="lazy" decoding="async" />
          <div>
            <p className={e.eyebrow}>A formula that works</p>
            <h2 className={e.h2}>What should you write in your <em className={e.emGreen}>Facebook bio?</em></h2>
            <p style={{ marginTop: 16 }}>Keep it simple. Tell people who you are, what you enjoy or offer, and what they&apos;ll get from following you.</p>
            <p>For personal profiles, your interests or a small detail about your personality is often enough. For business Pages, be clearer about what you do and who you help. For creators, say what you share.</p>
            <p>You don&apos;t need to use all three pieces every time. Facebook&apos;s short intro has limited space, so leave out anything that doesn&apos;t help.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="examples">
        <Head kicker="Copy and paste inspiration" title={<>Facebook bio examples <em className={e.emGreen}>for different styles</em></>} intro="Need ideas before you write anything? These are original examples you can borrow, change, and make your own." />
        <BioExamples />
        <p className={e.small} style={{ textAlign: "center", marginTop: 20 }}>These are examples, not claims about real people or businesses. Adjust any line to fit your actual life or work.</p>
      </SECTION>

      <SECTION id="bio-vs-about" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>A small but important difference</p>
            <h2 className={e.h2}>Facebook bio vs. About section: <em className={e.emGreen}>what&apos;s the difference?</em></h2>
            <p style={{ marginTop: 16 }}>Your short Facebook bio appears near the top of your profile or Page. It&apos;s a quick introduction, not the place for your whole story.</p>
            <p>The About section gives you room for more detail. A business Page also has separate places for things like contact information, website, address, and opening hours.</p>
            <p><strong>For a short intro, we aim for 101 characters or fewer.</strong> Facebook interfaces and limits can change, so double check the field you&apos;re editing.</p>
            <p>A Facebook Group is a little different. Groups use a community description and related information, so group ideas from this generator are a starting point for that longer description.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={f.figure} src={`${ART}/bio-fields.svg`} alt="Side by side diagram of a short Facebook intro and the longer About section" width={1200} height={570} loading="lazy" decoding="async" />
        </div>
      </SECTION>

      <SECTION id="business-creators">
        <Head kicker="Match the profile" title={<>Different Facebook bios need <em className={e.emGreen}>different wording</em></>} intro="The same sentence won't work for a personal profile, a local shop, and a creator account. Start with why someone is visiting your profile." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["P", "Personal profile bios", "Talk about your interests, the things you love, or the kind of person you are. A simple bio can feel more personal than an overworked quote."],
            ["B", "Business Page bios", "Tell visitors what you sell or do, who it's for, and where you work if location matters. Give people a reason to message or follow the Page."],
            ["C", "Creator bios", "Say what kind of posts people can expect. Whether you're making videos, sharing travel stories or teaching a skill, be specific."],
          ].map(([i, h, p]) => (
            <li key={h} className={f.card}>
              <span className={f.icon} aria-hidden="true">{i}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <ul className={`${f.cards} ${f.cards2}`}>
          <li className={f.card}>
            <span className={f.label}>For businesses</span>
            <h3>How to write a Facebook business Page bio</h3>
            <p>Don&apos;t use vague lines such as &ldquo;quality service at the best price.&rdquo; Say what the business actually does. A bakery might mention fresh bread and custom cakes. A therapist might say what support they offer and who they work with.</p>
            <p style={{ marginTop: 10 }}>If you serve a particular city, mentioning it can help visitors immediately understand whether you&apos;re relevant to them.</p>
          </li>
          <li className={f.card}>
            <span className={f.label}>For creators</span>
            <h3>How to write a Facebook creator bio</h3>
            <p>Start with your content: photography, gaming, books, fitness, art, or something else. Then add a small detail that gives the line some personality. You don&apos;t need a separate formula for boys and girls. Choose wording that sounds like <em>you</em>.</p>
            <p style={{ marginTop: 10 }}>And if you want a playful bio, go playful. You don&apos;t have to pretend you&apos;re running a media company.</p>
          </li>
        </ul>
      </SECTION>

      <SECTION id="write-better" band>
        <Head kicker="Practical writing tips" title={<>How to write a better <em className={e.emGreen}>Facebook bio</em></>} intro="A bio doesn't need complicated wording. These small changes usually make the biggest difference." />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["01 / Be specific", "Replace generic words with something real", "“Dreamer. Hustler. Living my best life” could describe anyone. “Book collector, weekend baker, and permanently curious” tells us something about you."],
            ["02 / Write for the right person", "Think about who's reading", "A business customer wants to know what you offer. A future follower wants to know what you share. Friends may just want a little glimpse of your personality."],
            ["03 / Keep it short", "One good line is enough", "Cut extra adjectives, repeated claims, and filler words. If a word doesn't make the bio clearer or more interesting, you probably don't need it."],
            ["04 / Check how it looks", "Use emojis and fancy fonts carefully", "One relevant emoji can work. A full line of decorative Unicode letters can be hard to read, search, or copy across devices. Plain text is often the safer choice."],
          ].map(([l, h, p]) => (
            <li key={h} className={f.card}>
              <span className={f.label}>{l}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <p className={f.tip}><strong>One last check:</strong> Read your bio out loud. If you&apos;d never describe yourself that way in a normal conversation, change it.</p>
      </SECTION>

      <SECTION id="copy-paste">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>When you&apos;re ready</p>
            <h2 className={e.h2}>How to copy and paste <em className={e.emGreen}>your Facebook bio</em></h2>
            <p style={{ marginTop: 16 }}>Generate a few ideas at the top of this page and choose the one that feels closest to you. You can edit it directly in the results card before copying.</p>
            <ol className={f.steps}>
              <li>Copy your chosen bio.</li>
              <li>Open your Facebook profile or Page.</li>
              <li>Find the Intro or bio field and choose the edit option.</li>
              <li>Paste the line, check how it looks, and save.</li>
            </ol>
            <p>The exact menus can vary between mobile, desktop, personal profiles and Pages. If you&apos;re editing a Group, look for the Group description instead.</p>
          </div>
          <ul className={`${f.cards} ${f.compare}`} style={{ marginTop: 0 }}>
            <li className={f.card}>
              <span className={f.label}>Too generic</span>
              <blockquote>&ldquo;A person who loves life and wants to be successful.&rdquo;</blockquote>
              <p>It sounds nice, but tells visitors almost nothing.</p>
            </li>
            <li className={f.card}>
              <span className={f.label}>More personal</span>
              <blockquote>&ldquo;Learning photography, collecting stories, and taking the long way home.&rdquo;</blockquote>
              <p>Specific, natural, and easier to remember.</p>
            </li>
          </ul>
        </div>
      </SECTION>

      <SECTION id="language-styles" band>
        <Head kicker="Styles, languages and details" title={<>What about stylish bios, emojis, <em className={e.emGreen}>or other languages?</em></>} intro="You can keep the wording simple and still give it personality. A few choices matter more than decorative fonts." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["✦", "Stylish or aesthetic bios", "Use a clear phrase and maybe one symbol. A wall of unusual fonts can make an intro harder to read, especially with accessibility tools."],
            ["☺", "Bios with emojis", "Pick an emoji that matches what you're saying, not six that don't. You can switch on a single emoji in the generator above."],
            ["文", "Hindi, Urdu, Arabic and more", "Your bio should sound natural in the language you use. The generator writes in ten languages, including Hindi, Urdu and Arabic. Bangla isn't supported yet."],
          ].map(([i, h, p]) => (
            <li key={h} className={f.card}>
              <span className={f.icon} aria-hidden="true">{i}</span>
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
            <h2 className={e.h2}>Facebook Bio Generator <em className={e.emGreen}>FAQs</em></h2>
            <p className={e.body} style={{ marginTop: 14 }}>Still deciding what to write? These are some of the questions people ask most often about Facebook bios.</p>
          </div>
          <FAQAccordion faqs={FAQS.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <SECTION id="related-tools" band>
        <Head kicker="Keep creating" title={<>More free tools <em className={e.emGreen}>you might like</em></>} intro="Once your bio is sorted, there are a few other things worth fixing on your profile." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["Facebook", "Facebook Caption Generator", "Find better wording for your next photo, announcement or business post.", "/tools/facebook-caption-generator"],
            ["Instagram", "Instagram Bio Generator", "Build a short introduction that suits your Instagram profile too.", "/tools/instagram-bio-generator"],
            ["Business", "Business Name Generator", "Need a new brand or Page name? Start with ideas that match what you do.", "/tools/business-name-generator"],
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

      <section className={`${t.sec} ${t.last}`}>
        <div className={e.container}>
          <div className={e.cta} style={{ textAlign: "center", gridTemplateColumns: "1fr" }}>
            <div>
              <p className={e.eyebrow} style={{ color: "#b9cbb8" }}>One last thing</p>
              <h2 className={e.h2}>Your bio doesn&apos;t need to be perfect.</h2>
              <p className={e.body} style={{ margin: "14px auto 0" }}>It just needs to sound like you. Start with something simple. You can always change it later.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href="#top" className={`${e.btn} ${e.btnLight}`}>Create my Facebook bio ↑</a>
            </div>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
