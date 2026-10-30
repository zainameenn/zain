import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { LINK_SOCIAL_MEDIA_SERVICE } from "@/lib/tools/links";
import t from "../_studio/edtool.module.css";
import f from "../facebook-bio-generator/fb.module.css";
import k from "./tiktok.module.css";
import { TikTokBioTool } from "./TikTokBioTool";

// The TikTok Bio Generator on its own route (it overrides app/tools/[slug] for this slug), built from the
// October 31, 2026 brief and page copy. Bios come from /api/tools/tiktok-bio.

const PATH = "/tools/tiktok-bio-generator";
const TITLE = "Free TikTok Bio Generator (AI) | Funny, Aesthetic & Business Bios";
const DESCRIPTION = "Create a TikTok bio in a few clicks. Get 5 funny, aesthetic, personal, creator or business bios with a live preview and an 80-character counter.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ART = "/assets/tools/tiktok-bio";

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4V9.5Z" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", icon: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.84v2.36H8v3h2.5V21h3Z" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/", icon: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.44-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z" },
  { name: "X", href: "https://x.com/zainnameen", icon: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z" },
];

const FAQS: [string, string][] = [
  ["Is this TikTok bio generator free?", "Yes. The generator is free to use, with fair use limits to keep it running for everyone. There's no signup."],
  ["Can I create a bio without typing anything?", "Yes. Choose your account type, niche, audience and tone using the dropdowns. The optional description makes your results more personal."],
  ["Can this tool rewrite my existing TikTok bio?", "Yes. Select \"Improve My Current Bio\", paste your existing one, and generate shorter or clearer alternatives without adding facts you didn't provide."],
  ["Is the TikTok bio character limit 80 or 160?", "TikTok's published limit is 80 characters. Some users report seeing a higher counter in their app. This tool uses 80 by default, and your actual TikTok editor should be the final check."],
  ["Do spaces, emojis and line breaks count toward the limit?", "Yes, those characters use space. Emoji sequences are complicated, and different counters may treat them differently. Our counter counts emoji generously, but verify the final text in TikTok after copying."],
  ["What is a good simple bio for TikTok?", "Try a short description of your main topic: \"Easy meals for busy students\" or \"Cozy gaming clips after work.\" Specific beats generic."],
  ["What are funny things to put in a TikTok bio?", "Try a joke related to what you post, such as \"Cooking without setting off the alarm. Mostly.\" Avoid jokes that have nothing to do with your videos if you're trying to attract followers for a specific niche."],
  ["Can I use fancy fonts in my TikTok bio?", "You can paste many Unicode styled characters, but some display inconsistently or are harder for assistive technologies. Check legibility on a real phone."],
  ["Should I put hashtags in my TikTok bio?", "Only when a hashtag is genuinely useful to your identity or community. A short bio usually benefits more from understandable words than a row of generic tags."],
  ["Does a good TikTok bio make you go viral?", "No. A bio can explain your content to profile visitors, but it cannot guarantee views, search placement, followers or virality."],
  ["How do I add or change my TikTok bio?", "Open the TikTok app, visit Profile, choose Edit profile, open Bio, paste or type your text, and save. If the menu differs, use the controls currently visible in your app."],
  ["Why can't I change or save my TikTok bio?", "Check the character count first. Then remove unusual symbols, verify your app is updated, restart it and try again. If the app shows a moderation or account restriction message, follow the in-app instructions. A generator can't override TikTok's platform limits."],
  ["Why can't I add a website link to my TikTok profile?", "TikTok's link field has eligibility requirements, including at least 1,000 followers or a Verified Business Account. Feature availability can also depend on the account and region. An address typed into the bio is not a substitute for the clickable website field."],
  ["I have 1,000 followers. Why is the website link still missing?", "The published follower threshold is an eligibility condition, not a guarantee that the feature appears instantly on every account. Check Profile, Edit profile and Links, confirm account eligibility, update the app and follow the in-app help process if the field stays missing. Some creators report delayed or inconsistent access, but those reports are individual experiences, not proof of a universal rule."],
  ["Can I add my Instagram or YouTube link?", "Social linking options and website link eligibility can change. Check what TikTok currently offers under Edit profile and Links for your account. Do not assume every external link is supported."],
  ["Can I add my contact email to the bio?", "You can include an email address if you choose, but it uses limited characters and makes that address public. Use a dedicated business contact address rather than a private personal email."],
  ["Can I make a gaming or fan TikTok bio?", "Yes. Choose Gaming & Fan, your favorite content category, and the tone. You can make it funny, simple or fandom focused without pretending to be an official brand account."],
  ["Can the tool generate bios in Hindi, Urdu or Bangla?", "Hindi and Urdu, yes, along with English and Spanish. Choose the language before you generate. Bangla isn't offered yet because the results in our testing weren't reliable enough. Read any result through, since a native speaker may still prefer a small change."],
  ["Does the AI ever get details wrong?", "It can. The tool is told to use only the details you give it and checks each bio for things like links and messages you didn't confirm, but AI can still slip. Read every bio before you publish it under your name."],
  ["Is the generator safe to use?", "You don't need to give your TikTok password or connect your account. Your answers are sent to an AI provider (Google Gemini) to write the bios and aren't stored by this site. Don't enter private information you wouldn't put on a public profile."],
  ["Can I generate a TikTok bio from a photo?", "Not in this text first version. A profile picture doesn't reliably tell us what videos someone posts."],
  ["How many TikTok bios will I get?", "Five distinct options: clear, personality led, audience led, action led and short. You can regenerate all five, or just one, to get new suggestions."],
  ["What if my account does not fit the dropdown categories?", "Choose Other and type a short description. The form never forces an incorrect niche."],
  ["What if the generator is not working?", "Refresh the page, check your connection and try again. If the AI service fails, the tool shows an honest error and keeps your selections. It never shows template text as if it came from the AI."],
];

const EXAMPLES: [string, string[], string?][] = [
  ["Funny TikTok bios", ["I test terrible snacks so you don't have to.", "Horror games. Excellent screams. Questionable decisions.", "Cooking without setting off the alarm. Mostly.", "A professional overthinker with a camera.", "Here for the plot. Still waiting for one."], "Humor works best when it says something real about the account. \"I test terrible snacks\" tells people what you actually post."],
  ["Aesthetic TikTok bios", ["little moments, film photos, slow mornings", "coffee stains & unfinished sketches", "soft light, loud playlists, quiet weekends", "collecting ordinary days on camera", "books, rainy windows & city walks"], "Short phrases, a consistent mood and a little space often do more than ornate fonts."],
  ["Creator TikTok bios", ["Five-minute workouts for people with desk jobs.", "I explain money stuff without the finance jargon.", "One-pan dinners for very tired people.", "Beginner photo tips, no expensive gear needed.", "Testing budget tech so you can skip the bad buys."]],
  ["TikTok bio ideas for businesses", ["Handmade bookmarks for big reading moods.", "Fresh bread, baked every morning in Austin.", "Simple skincare tips from a small local studio.", "Thoughtful gifts for people who already have everything.", "Custom desk mats, made for your setup."], "Only use a location, schedule, material, service or product claim if it is actually true for the business."],
  ["Personal, gamer and fan account ideas", ["books, rainy days and too much iced coffee", "playing horror games and regretting every doorway", "cozy games and cozy chaos", "anime theories I should probably keep to myself", "trying new hobbies until one sticks"]],
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

const Figure = ({ name, alt, wide }: { name: string; alt: string; wide?: boolean }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={wide ? k.wide : f.figure} src={`${ART}/${name}.svg`} alt={alt} width={1120} height={630} loading="lazy" decoding="async" />
);

export default function TikTokBioGeneratorPage() {
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
              { name: "TikTok Bio Generator", url },
            ]),
            { "@type": "SoftwareApplication", name: "TikTok Bio Generator", url, description: DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
          ],
        }}
      />

      <section className={f.hero} id="top">
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li aria-current="page">TikTok Bio Generator</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free social media tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            Free TikTok <span className={t.accent}>Bio Generator</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            Free TikTok bio generator for when your bio is tiny and writing one shouldn&apos;t be a whole project. Pick what your account is about, choose a style, and get five bios you can copy straight into TikTok. Want something more personal? Add a few details and we&apos;ll work them in.
          </p>
          <TikTokBioTool />
        </div>
      </section>

      <SECTION id="how-to-use" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Four quick steps</p>
            <h2 className={e.h2}>How to use the free <em className={e.emGreen}>TikTok bio generator</em></h2>
            <p style={{ marginTop: 16 }}>You don&apos;t need to introduce your whole life. You&apos;re writing a short reason for someone to care about your account.</p>
            <ol className={f.steps}>
              <li><strong>Choose your account type.</strong> Pick personal, creator, business, or gaming and fan. Someone selling handmade jewelry needs a different introduction from someone posting chaotic gaming clips.</li>
              <li><strong>Answer a few questions.</strong> Choose your topic, audience, goal and tone. There&apos;s an Other option if your niche isn&apos;t listed. You can also add a short note about yourself, but you don&apos;t have to.</li>
              <li><strong>Generate five bios.</strong> Compare a straightforward one with a funny, punchier or more audience focused version. The generator is told to use only details you gave it, not make up achievements or promises.</li>
              <li><strong>Preview, edit and copy.</strong> Check the live character count, then copy the one you like. Open TikTok, go to your profile, choose Edit profile and paste it into Bio.</li>
            </ol>
          </div>
          <Figure name="01-answers-to-bio" alt="Four answers about account, content, audience and vibe turning into a short TikTok bio" />
        </div>
      </SECTION>

      <SECTION id="what-is">
        <Head kicker="The basics" title={<>What is a TikTok <em className={e.emGreen}>bio generator?</em></>} />
        <div className={k.prose}>
          <p className={e.body}>It&apos;s a writing tool for the short description on your TikTok profile. You provide a topic or a few personal details, and it suggests ways to say them in less space.</p>
          <p className={e.body}>That sounds simple until you&apos;ve tried to explain your whole account in one line.</p>
          <p className={e.body}>A good generator shouldn&apos;t just swap a few emojis around. It should understand whether you&apos;re sharing workout advice, selling products, posting funny videos, or simply using TikTok for fun. Then it should give you different options that fit the same idea.</p>
          <p className={e.body}>Our approach is to keep the form simple and make the optional details useful. If you only select &ldquo;Gaming,&rdquo; &ldquo;Horror games,&rdquo; and &ldquo;Funny,&rdquo; you can get a broad starting point. If you add &ldquo;I play survival horror and show the mistakes I make,&rdquo; the bio can sound a lot more specific.</p>
        </div>
      </SECTION>

      <SECTION id="character-limit" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Length</p>
            <h2 className={e.h2}>How many characters can a <em className={e.emGreen}>TikTok bio have?</em></h2>
            <p style={{ marginTop: 16 }}><strong>TikTok&apos;s published bio limit is 80 characters.</strong> That includes spaces, punctuation and formatting characters. Some users have reported higher counters in certain versions of the app, so check the character counter in your own profile editor before saving a longer version.</p>
            <p>Eighty characters is not the same as eighty words. It can be one short sentence, two short lines, or a very tiny joke. For example:</p>
            <p className={k.quoteBox}>Easy recipes for people who hate doing dishes.</p>
            <p>That tells someone exactly what to expect, without turning the bio into a wall of keywords.</p>
            <p>Our generator keeps every result at or below 80 characters. Your in-app TikTok counter is the final check, especially with emoji, line breaks or unusual symbols.</p>
          </div>
          <Figure name="02-character-limit" alt="A TikTok bio example with a character bar showing the 80 character maximum" />
        </div>
      </SECTION>

      <SECTION id="profile-fields">
        <Head kicker="Profile fields" title={<>TikTok bio vs name <em className={e.emGreen}>vs username</em></>} intro="These aren't three names for the same thing." />
        <div className={k.tableWrap}>
          <table className={k.table}>
            <thead>
              <tr>
                <th scope="col">Field</th>
                <th scope="col">What it does</th>
                <th scope="col">What to know</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Name", "The name people see on your profile and elsewhere", "TikTok publishes a limit of 30 characters"],
                ["Username", "Your unique @handle and part of your profile link", "Separate rules and a 30 day change cooldown"],
                ["Bio", "Your short explanation of what you do or post", "TikTok publishes an 80 character limit"],
                ["Website link", "A separate clickable profile field", "Available only to eligible accounts"],
              ].map(([a, b, c]) => (
                <tr key={a}>
                  <td><strong>{a}</strong></td>
                  <td>{b}</td>
                  <td>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={e.body} style={{ maxWidth: 760, margin: "20px auto 0", textAlign: "center" }}>If your name already says &ldquo;Jamie | Budget Recipes,&rdquo; your bio doesn&apos;t need to repeat those words exactly. It can explain what makes the recipes useful.</p>
        <Figure wide name="03-profile-fields" alt="Illustrative TikTok profile labelling the name, username, bio and website link fields" />
      </SECTION>

      <SECTION id="what-to-put" band>
        <Head kicker="A simple formula" title={<>What should I put in my <em className={e.emGreen}>TikTok bio?</em></>} intro="Think about the person who just watched one of your videos and opened your profile. They want to know whether they'll like the next one." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["1", "What you post", "Quick desk workouts, horror game clips, café reviews, or easy dinner recipes. Choose one main idea."],
            ["2", "Who it's for", "Beginners, students, local shoppers, or anyone else who has a reason to follow. You don't always need to name the audience, but it can make the bio clearer."],
            ["3", "One reason to come back", "An honest posting schedule, a recurring series, a useful promise, or a little personality."],
          ].map(([i, h, p]) => (
            <li key={h} className={f.card}>
              <span className={f.icon} aria-hidden="true">{i}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <p className={f.tip}><strong>[What you post] + [who it helps] + [reason to follow].</strong> You don&apos;t have to fit all three. Often, two are enough. A personal profile can be more playful, while a business usually benefits from being specific.</p>
      </SECTION>

      <SECTION id="ideas">
        <Head kicker="Copy and paste ideas" title={<>Funny, aesthetic and simple <em className={e.emGreen}>TikTok bio ideas</em></>} intro="These are original examples written to be adapted. They are not quotes from real creators. Each fits the 80 character limit, but check the count after editing." />
        <ul className={k.examples}>
          {EXAMPLES.map(([h, list, note]) => (
            <li key={h}>
              <h3>{h}</h3>
              <ul>
                {list.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {note ? <p>{note}</p> : null}
            </li>
          ))}
        </ul>
        <Figure wide name="04-bio-styles" alt="The same budget recipe topic written in simple, funny, aesthetic and professional voices" />
        <Figure wide name="07-examples-by-account" alt="Example TikTok bios for a creator, a small business, a gamer and a personal account" />
      </SECTION>

      <SECTION id="aesthetic" band>
        <div className={k.prose}>
          <Head kicker="Style" title={<>How to make your TikTok bio aesthetic <em className={e.emGreen}>without making it unreadable</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>You can use lowercase words, thoughtful punctuation and a few well chosen details. Fancy Unicode fonts can look pretty, but they may be harder to read, copy, search or access with a screen reader.</p>
          <p className={e.body}>Choose a mood, then ground it in something specific. &ldquo;soft girl era&rdquo; describes a vibe. &ldquo;film photos, slow walks and secondhand books&rdquo; tells people more about the account.</p>
          <p className={e.body}>Use emojis if you like them, but don&apos;t force one between every word. A single emoji can add personality. Six emojis can make an 80 character bio difficult to scan.</p>
          <p className={e.body}>If you want the aesthetic style, choose it in the tool. You can still edit the final result before copying.</p>
        </div>
      </SECTION>

      <SECTION id="business">
        <div className={k.prose}>
          <Head kicker="For businesses" title={<>How to write a TikTok bio <em className={e.emGreen}>for a business</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>A business profile has a different job from a personal profile. People need to understand what you&apos;re offering and whether it&apos;s relevant to them.</p>
          <p className={e.body}>Start with what you sell or provide. Add the audience or location when it matters. End with a next step only if that next step is available. For example, a local salon might use:</p>
          <p className={k.quoteBox}>Haircuts and color for busy people in Austin.</p>
          <p className={e.body}>An online shop might use:</p>
          <p className={k.quoteBox}>Handmade gifts for readers. New designs every month.</p>
          <p className={e.body}>Don&apos;t write &ldquo;Shop our link below&rdquo; unless the profile really has a website link field. Don&apos;t invent &ldquo;award winning,&rdquo; &ldquo;handmade,&rdquo; &ldquo;free delivery&rdquo; or customer numbers to make the bio sound impressive. Accuracy matters more than hype.</p>
        </div>
      </SECTION>

      <SECTION id="website-link" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Links</p>
            <h2 className={e.h2}>Can you put a clickable link in <em className={e.emGreen}>your TikTok bio?</em></h2>
            <p style={{ marginTop: 16 }}>There is a difference between typing a website address into your bio and adding a website to TikTok&apos;s dedicated link field.</p>
            <p>
              TikTok&apos;s published eligibility rule allows a website link for accounts with <strong>at least 1,000 followers or a Verified Business Account</strong>, subject to the feature being available for the account and region. Other account types do not necessarily receive it automatically. See TikTok&apos;s <a href="https://support.tiktok.com/en/getting-started/setting-up-your-profile/link-a-website-or-social-media-account" target="_blank" rel="noopener noreferrer">help article on profile links</a>.
            </p>
            <p>If your profile already has a working website link, you can choose a short CTA such as &ldquo;Shop below&rdquo; or &ldquo;See my portfolio.&rdquo; If you don&apos;t, choose a CTA that works now, like &ldquo;Follow for more&rdquo; or, where messaging is available, &ldquo;DM for details.&rdquo; The generator only offers link and message CTAs when you tick those options.</p>
            <p>If the website link option is missing, don&apos;t try to force a URL into the bio and promise it will be clickable.</p>
          </div>
          <Figure name="06-website-link-rules" alt="Decision chart: use a short link CTA only if your profile can add a website, otherwise use follow, DM or content CTAs" />
        </div>
      </SECTION>

      <SECTION id="before-after">
        <div className={f.split}>
          <Figure name="05-before-and-after" alt="A vague bio, Just vibing, rewritten as Five-minute desk workouts for people who sit all day" />
          <div>
            <p className={e.eyebrow}>Before and after</p>
            <h2 className={e.h2}>Fixing a generic <em className={e.emGreen}>TikTok bio</em></h2>
            <p style={{ marginTop: 16 }}><strong>Before:</strong> Just vibing ✨</p>
            <p>That may fit your personality, but it doesn&apos;t tell a first time visitor what they&apos;ll get from following.</p>
            <p><strong>After:</strong> Five-minute desk workouts for people who sit all day.</p>
            <p>Now there&apos;s a topic, a specific audience and a useful reason to follow. You don&apos;t need to add a sentence about being passionate, hardworking or obsessed with creating value.</p>
            <p>Not every account needs that kind of bio. If you&apos;re just posting for your friends, something funny or personal is perfectly fine. The goal is to match the writing to what the account is actually for.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="bio-vs-caption" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Different jobs</p>
            <h2 className={e.h2}>TikTok bio vs video caption: <em className={e.emGreen}>what&apos;s the difference?</em></h2>
            <p style={{ marginTop: 16 }}>Your bio describes the account as a whole. A caption describes one specific post.</p>
            <p>If you post easy recipes, the bio might say &ldquo;Quick dinners for busy students.&rdquo; A video caption might say &ldquo;3 dinners you can make with one pan.&rdquo; They work together, but they are not interchangeable.</p>
            <p>The same goes for hashtags, video titles, usernames and profile pictures. This generator writes a <strong>bio</strong>, not a caption or a new TikTok account name. For captions, use the <Link href="/tools/tiktok-caption-generator">TikTok Caption Generator</Link>.</p>
          </div>
          <Figure name="08-bio-vs-caption" alt="A profile bio describes what you post and why to follow, a video caption describes one video" />
        </div>
      </SECTION>

      <SECTION id="mistakes">
        <Head kicker="Troubleshooting" title={<>Mistakes that make a TikTok bio <em className={e.emGreen}>harder to use</em></>} />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["Trying to cover five topics", "\"Travel, food, fitness, gaming and business\" makes it hard to understand what the account is about. Pick the topic you post about most."],
            ["Repeating your display name", "Your name is already visible on your profile. Use the bio to add something new."],
            ["Inventing credentials", "A generated bio should never turn \"learning design\" into \"award winning designer.\" If the tool does, change it."],
            ["Adding a broken CTA", "Don't write \"Tap the link\" when the profile has no clickable link."],
            ["Filling the space with hashtags", "Relevant words are fine. But the bio doesn't need to be a block of tags."],
            ["Using unreadable fonts", "A stylish symbol is only useful if people can understand it."],
            ["Not checking the result", "An AI generator is a writing assistant, not a biography checker. Read what it wrote before publishing under your name."],
          ].map(([h, p]) => (
            <li key={h} className={f.card}>
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
            <h2 className={e.h2}>Frequently asked questions <em className={e.emGreen}>about TikTok bios</em></h2>
          </div>
          <FAQAccordion faqs={FAQS.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <SECTION id="related-tools" band>
        <Head kicker="More free tools for your social profiles" title={<>Fix the rest of your profile <em className={e.emGreen}>while you&apos;re here.</em></>} intro="A bio is one small part of the picture. If you're also updating other accounts, these can help." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["TikTok", "TikTok Caption Generator", "Captions for the videos your bio promises.", "/tools/tiktok-caption-generator"],
            ["Instagram", "Instagram Bio Generator", "The same idea for your Instagram profile.", "/tools/instagram-bio-generator"],
            ["Facebook", "Facebook Bio Generator", "Bio ideas for a profile, Page, creator account or Group.", "/tools/facebook-bio-generator"],
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
          <Link href="/tools" className={`${e.btn} ${e.btnSecondary}`}>Explore free social media tools</Link>
        </p>
      </SECTION>

      <section className={t.sec}>
        <div className={e.container}>
          <div className={e.cta} style={{ textAlign: "center", gridTemplateColumns: "1fr" }}>
            <div>
              <p className={e.eyebrow} style={{ color: "#b9cbb8" }}>A better bio is a start</p>
              <h2 className={e.h2}>Let&apos;s fix the rest of your social presence.</h2>
              <p className={e.body} style={{ margin: "14px auto 0" }}>I help SaaS and service businesses turn content, profiles and organic social into real growth.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href={LINK_SOCIAL_MEDIA_SERVICE ?? "/services"} className={`${e.btn} ${e.btnLight}`}>Explore social media marketing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${f.social} ${t.last}`} aria-labelledby="social-h">
        <div className={e.container}>
          <h2 id="social-h" className={e.h2}>Want practical tips for <em className={e.emGreen}>growing on social media?</em></h2>
          <p className={e.body} style={{ margin: "14px auto 0" }}>
            I share what I&apos;m testing in SEO, content, Reddit and organic social. No complicated frameworks. Just useful ideas you can actually try.
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
