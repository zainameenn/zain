import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { LINK_SOCIAL_MEDIA_SERVICE } from "@/lib/tools/links";
import t from "../_studio/edtool.module.css";
import { ART as SECTION_ART } from "@/lib/tools/art";
import { Explainer } from "../_components/Explainer";
import f from "../facebook-bio-generator/fb.module.css";
import y from "./ytname.module.css";
import { ChannelNameTool } from "./ChannelNameTool";

// The YouTube Channel Name Generator on its own route (it overrides app/tools/[slug] for this slug), built
// from the November 1, 2026 brief and page copy. Names come from /api/tools/yt-channel-name.

const PATH = "/tools/youtube-channel-name-generator";
const TITLE = "Free YouTube Channel Name Generator | AI Name Ideas";
const DESCRIPTION = "Free YouTube channel name generator for gaming, lifestyle, education or business channels. Get 5 names with handle ideas, save favorites and check before using.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ART = "/assets/tools/youtube-channel-name";

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4V9.5Z" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", icon: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.84v2.36H8v3h2.5V21h3Z" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/", icon: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.44-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z" },
  { name: "X", href: "https://x.com/zainnameen", icon: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z" },
];

const FAQS: [string, string][] = [
  ["Is this YouTube channel name generator free?", "Yes. It's free to use with no signup, with fair use limits to keep it running for everyone."],
  ["Can two channels share the same display name?", "Yes. Display names are not unique on YouTube. The @handle is designed to be unique, which is why every channel has its own."],
  ["What is the YouTube handle character limit?", "Normally 3 to 30 characters, with different limits for some writing systems. Handles can use letters, numbers, underscores, hyphens and periods. Check YouTube's current handle rules in its help article on handles."],
  ["Does the generator check handle availability?", "No. Treat every handle suggestion as unverified until you check it on YouTube. Each handle in your results links to its youtube.com address, so you can see whether a channel already uses it, and YouTube Studio tells you for certain when you try to claim it."],
  ["Can a name guarantee subscribers?", "No. A useful name helps people understand the channel, but your videos and how well they fit your audience matter far more."],
  ["Can I generate gaming or kids channel names?", "Yes. Select the topic and audience. Avoid confusing names or anything that suggests an official connection to a game, studio or brand. Kids channel names are kept friendly and simple."],
  ["Is there a free way to start a YouTube channel?", "Yes. Creating a standard YouTube channel doesn't require a paid plan. This generator creates name ideas, not the channel itself."],
  ["Can I use an existing company name?", "Only if you have the right to use it. Avoid names that are confusingly similar to another brand or channel."],
  ["Do I need the exact keyword in my channel name?", "No. Clarity matters, but keyword stuffing often makes a name awkward. Your video titles and channel description are better places for search terms."],
  ["How do I change my YouTube channel name?", "Open YouTube Studio, go to Customization, then Profile, edit the name and publish the change. YouTube limits how often you can change it, so pick carefully."],
  ["Can I get names in Urdu, Hindi or Spanish?", "Yes. Choose the name language before you generate. Hindi and Urdu names are written in Roman script, the way most creators write them, so they also work as handles."],
  ["What about logos, banners and descriptions?", "Those are separate tasks. This is a text name generator, so it doesn't make graphics. For the written parts, try the YouTube Description Generator."],
  ["Is my information stored?", "No. What you type is sent to an AI provider (Google Gemini) to write the names and isn't stored by this site. Don't enter private information."],
];

const EXAMPLES: [string, string, string, string][] = [
  ["Gaming channel", "Retro console repairs and forgotten games", "Cartridge Club", "@cartridgeclub (check availability)"],
  ["Creator-led fitness", "Short home workouts with trainer Maya", "Maya Moves", "@mayamoves (check availability)"],
  ["Student cooking", "Budget recipes for small kitchens", "Pocket Kitchen", "@pocketkitchen (check availability)"],
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
  <img className={y.wide} src={`${ART}/${name}.svg`} alt={alt} width={1200} height={700} loading="lazy" decoding="async" />
);

export default function YouTubeChannelNameGeneratorPage() {
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
              { name: "YouTube Channel Name Generator", url },
            ]),
            { "@type": "SoftwareApplication", name: "YouTube Channel Name Generator", url, description: DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
          ],
        }}
      />

      <section className={f.hero} id="top">
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li aria-current="page">YouTube Channel Name Generator</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free YouTube tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            Free YouTube Channel <span className={t.accent}>Name Generator</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            Free YouTube channel name generator for a name that&apos;s easy to remember and feels right for what you want to publish. It doesn&apos;t need to explain every video you&apos;ll ever make. Choose your niche and style, and get five channel name ideas with matching @handle suggestions and a short reason for each. Edit and copy the ones worth checking.
          </p>
          <ChannelNameTool />
        </div>
      </section>

      <SECTION id="how-it-works" band>
        <Head kicker="Three steps" title={<>How the free YouTube <em className={e.emGreen}>channel name generator</em> works</>} />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["Step 1", "Choose your channel topic", "Pick a niche, audience and naming style. You can leave personal details blank."],
            ["Step 2", "Explore five name ideas", "Review the names, their handle suggestions and why each one might work."],
            ["Step 3", "Check before you claim", "Search for similar channels and test your handle in YouTube Studio."],
          ].map(([i, h, p]) => (
            <li key={h} className={f.card}>
              <span className={t.num}>{i}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <Figure name="01-workflow" alt="Name idea to channel identity: choose your niche, generate name ideas, check the YouTube handle, and choose a name you can grow with." />
      </SECTION>

      <SECTION id="what-you-get">
        <Head kicker="Your results" title={<>What you get, and <em className={e.emGreen}>how to use it</em></>} />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["Five distinct names", "Clear, personal, short, playful and broad. Each comes with a short reason, so you can see why it might fit."],
            ["Two handle ideas per name", "Each handle follows YouTube's format rules and is clearly marked as unverified. Nobody has checked whether it's taken."],
            ["A shortlist to compare", "Save the names you like, compare them side by side, edit them, copy them or download the list."],
            ["An availability checklist", "A short list of what to check on YouTube, on other social sites and in a trademark search before you commit."],
          ].map(([h, p]) => (
            <li key={h} className={f.card}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </SECTION>

      <SECTION id="good-name" band>
        <Explainer art={SECTION_ART.youtubeChannelName}>
          <p className={e.eyebrow}>Practical guide</p>
          <h2 className={e.h2}>What makes a good <em className={e.emGreen}>YouTube channel name?</em></h2>
          <p className={e.body} style={{ marginTop: 16 }}>A good name is easy to hear, say and type. It gives viewers a clue about your content without boxing you into one tiny subject. For a channel about quick home meals, Pocket Kitchen is clearer than a string of unrelated words.</p>
        </Explainer>
      </SECTION>

      <SECTION id="name-vs-handle">
        <div className={y.prose}>
          <Head kicker="Two different things" title={<>Channel name vs <em className={e.emGreen}>YouTube handle</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>
            Your channel name is the display name. Your handle is a unique identifier beginning with @. A typical handle is 3 to 30 characters, with different limits for some writing systems (see YouTube&apos;s{" "}
            <a href="https://support.google.com/youtube/answer/11585688" target="_blank" rel="noopener noreferrer">help article on handles</a>). A generated handle is an idea, not proof that it is available.
          </p>
        </div>
        <Figure name="02-rules" alt="Name vs handle: the channel name is the visible display name, and the @handle is your unique profile identifier." />
      </SECTION>

      <SECTION id="own-name" band>
        <div className={y.prose}>
          <Head kicker="Personal or brand" title={<>Should you use <em className={e.emGreen}>your own name?</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>Use your own name when the channel is built around your expertise or personality. Use a separate brand name if several people will contribute or you want the project to stand on its own, independent of one creator.</p>
        </div>
      </SECTION>

      <SECTION id="check-availability">
        <div className={y.prose}>
          <Head kicker="Before you commit" title={<>How to check name and <em className={e.emGreen}>handle availability</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>Search YouTube for lookalike names, say the name aloud, check how it looks on a thumbnail, and try the exact handle in YouTube Studio. Check trademarks before treating a name as your brand.</p>
        </div>
        <Figure name="04-checklist" alt="The decision checklist: easy to say and spell, relevant but not restrictive, not confusingly similar, handle and trademarks checked." />
      </SECTION>

      <SECTION id="changing-names" band>
        <div className={y.prose}>
          <Head kicker="Changing later" title={<>How often can a <em className={e.emGreen}>YouTube name change?</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>
            YouTube currently allows channel name changes twice in 14 days, and handles have change limits too. An existing verification badge may be removed after you change the channel name (see YouTube&apos;s{" "}
            <a href="https://support.google.com/youtube/answer/2657964" target="_blank" rel="noopener noreferrer">help article on channel names</a>). Avoid changing just because a new suggestion sounds clever.
          </p>
        </div>
      </SECTION>

      <SECTION id="examples">
        <Head kicker="Examples you can learn from" title={<>Three example <em className={e.emGreen}>channel names</em></>} intro="Illustrative samples. Any name or handle must be checked before real use." />
        <ul className={y.examples}>
          {EXAMPLES.map(([h, input, name, note]) => (
            <li key={h}>
              <h3>{h}</h3>
              <p><strong>Input:</strong> {input}</p>
              <p className={y.exName}>{name}</p>
              <p>{note}</p>
            </li>
          ))}
        </ul>
        <Figure name="03-examples" alt="Three naming approaches: a personal name like Maya Moves, a descriptive name like Pocket Kitchen and a brandable name like Cartridge Club, all needing availability checks." />
      </SECTION>

      <SECTION id="tips" band>
        <Head kicker="Advanced tips" title={<>Practical decisions when <em className={e.emGreen}>naming a channel</em></>} />
        <ul className={`${f.cards} ${f.cards2}`} style={{ textAlign: "left" }}>
          {[
            ["A naming exercise you can do in two minutes", "Write down the three things a new viewer should understand about your channel. Then combine just one or two of them into a simple name. A gaming creator who restores old handhelds might start with “retro”, “repair” and “games”, but a name such as Cartridge Club may be more memorable than Retro Gaming Repairs And Reviews. Say each candidate out loud and ask whether someone could type it correctly after hearing it once."],
            ["Names for different kinds of channels", "Personal creators can lean on their own names. Educational channels benefit from a descriptive promise. Gaming, entertainment and comedy channels have more room for playful or invented words. Businesses should check consistency with their main brand, but the channel can still have its own series name. The best choice depends on who is speaking and whether the channel will cover new subjects later."],
            ["Handle ideas are not real availability checks", "The generator can turn a name into readable variations such as @cartridgeclub or @cartridgeclubtv. That doesn't mean either handle is free. Another creator may already own it, or it may break YouTube's rules. Try the actual handle in YouTube Studio and check for confusingly similar accounts before adding it to your website or packaging."],
            ["Avoid accidental brand confusion", "Don't put a celebrity, game publisher or well known company name into your channel name just to attract attention. It can confuse viewers about affiliation. You can describe what you cover in your video titles and About section without making the whole channel look official. If you plan to sell products or services under the name, a separate trademark review matters."],
            ["What to do after choosing a name", "Set a consistent profile picture, write a simple channel description and plan your first few uploads. The name should be a useful starting point, not an obstacle that delays publishing for weeks. Keep two backup names in case the handle you want is taken or a brand search turns up conflicts."],
          ].map(([h, p]) => (
            <li key={h} className={f.card}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </SECTION>

      <SECTION id="mistakes">
        <Head kicker="Common mistakes" title={<>Mistakes to avoid with a <em className={e.emGreen}>channel name</em></>} />
        <ul className={y.bullets}>
          <li><strong>Stuffing in keywords.</strong> &ldquo;Best Easy Cheap Recipes Channel&rdquo; is hard to remember. One clear idea beats a list of search terms.</li>
          <li><strong>Borrowing a famous name.</strong> Using a celebrity, game or brand name can confuse viewers and cause problems later.</li>
          <li><strong>Going too narrow.</strong> A name tied to one tiny topic can feel wrong once your videos branch out.</li>
          <li><strong>Making it hard to spell.</strong> If people can&apos;t type it after hearing it, they can&apos;t search for it.</li>
          <li><strong>Trusting a handle idea without checking.</strong> Every suggested handle is unverified until YouTube Studio accepts it.</li>
          <li><strong>Not reading the result.</strong> AI can still slip. Read every name before you build a channel around it.</li>
        </ul>
      </SECTION>

      <section id="faq" className={t.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>Questions, answered</p>
            <h2 className={e.h2}>Frequently asked questions <em className={e.emGreen}>about channel names</em></h2>
          </div>
          <FAQAccordion faqs={FAQS.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <SECTION id="related-tools" band>
        <Head kicker="Related free tools" title={<>Keep building <em className={e.emGreen}>your channel.</em></>} intro="Once you have a name, these help with the first videos." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["YouTube", "YouTube Title Generator", "Titles for your first uploads.", "/tools/youtube-title-generator"],
            ["YouTube", "YouTube Description Generator", "Video and channel descriptions.", "/tools/youtube-description-generator"],
            ["YouTube", "YouTube Video Script Generator", "A script to film your first video.", "/tools/youtube-video-script-generator"],
          ].map(([l, h, p, href]) => (
            <li key={h} className={`${f.card} ${t.card}`} style={{ display: "block" }}>
              <span className={f.label}>{l}</span>
              <h3>{h}</h3>
              <p>{p}</p>
              <Link href={href} className={t.cardLink}>Open the tool <span aria-hidden="true">→</span></Link>
            </li>
          ))}
        </ul>
        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/tools" className={`${e.btn} ${e.btnSecondary}`}>Explore all free tools</Link>
        </p>
      </SECTION>

      <section className={t.sec}>
        <div className={e.container}>
          <div className={e.cta} style={{ textAlign: "center", gridTemplateColumns: "1fr" }}>
            <div>
              <p className={e.eyebrow} style={{ color: "#b9cbb8" }}>A name is a start</p>
              <h2 className={e.h2}>Want your channel to bring in customers?</h2>
              <p className={e.body} style={{ margin: "14px auto 0" }}>I help businesses turn social media and video into steady leads.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href={LINK_SOCIAL_MEDIA_SERVICE ?? "/services"} className={`${e.btn} ${e.btnLight}`}>Explore social media marketing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${f.social} ${t.last}`} aria-labelledby="social-h">
        <div className={e.container}>
          <h2 id="social-h" className={e.h2}>Want more practical <em className={e.emGreen}>marketing ideas?</em></h2>
          <p className={e.body} style={{ margin: "14px auto 0" }}>
            I share what I learn about SEO, social media, Reddit and growing small businesses. Follow along if you are working on the same things.
          </p>
          <ul className={f.socialLinks}>
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={f.socialLink}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </EditorialPage>
  );
}
