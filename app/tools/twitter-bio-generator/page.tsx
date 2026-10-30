import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import t from "../_studio/edtool.module.css";
import f from "../facebook-bio-generator/fb.module.css";
import x from "./x.module.css";
import { XBioTool } from "./XBioTool";

// The Twitter (X) Bio Generator on its own route (it overrides app/tools/[slug] for this slug), built from
// the October 30, 2026 brief and page copy. Bios come from /api/tools/x-bio.

const PATH = "/tools/twitter-bio-generator";
const TITLE = "Free Twitter Bio Generator (AI) | 160-Character X Bios";
const DESCRIPTION = "Generate a Twitter (X) bio in seconds. Choose your style, add optional details, and get 5 editable bios under 160 characters. Free to copy and paste.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ART = "/assets/tools/twitter-bio";

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4V9.5Z" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", icon: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.84v2.36H8v3h2.5V21h3Z" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/", icon: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.44-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z" },
  { name: "X", href: "https://x.com/zainnameen", icon: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z" },
];

const FAQS: [string, string][] = [
  ["How many characters can a Twitter bio have?", "Up to 160 characters. That includes the text you type in the Bio field. Use the live count and check the saved result in X."],
  ["Is a Twitter bio the same as an X bio?", "Yes. Twitter is now called X, but \"Twitter bio\" and \"X bio\" mean the same profile description field."],
  ["How many characters can an X display name have?", "The display name has a 50 character limit. That's separate from your bio."],
  ["How long can a Twitter username be?", "X usernames are up to 15 characters, using letters, numbers and underscores. They can't contain spaces. This is your @handle, not your bio."],
  ["How many characters can a Twitter post have?", "A normal post allows 280 characters. Longer posts are available through certain subscription plans. Neither changes the 160 character bio limit."],
  ["Can a Twitter bio have emojis?", "Yes. Use them when they fit the tone. The tool offers optional emoji styles, and you can edit the result before copying it."],
  ["Can I use line breaks in my Twitter bio?", "You can try short line breaks to improve readability. Preview the bio on desktop and mobile, because the text wraps differently depending on screen width."],
  ["Can I put a website link in my bio?", "X provides a dedicated Website field, which is the best place for your main link. A URL inside the bio can waste characters or trigger X's URL safety checks."],
  ["Should I add hashtags to my Twitter bio?", "Only if one is genuinely useful to your identity, community, or campaign. Plain words usually communicate your topics more clearly."],
  ["Can an AI generator write a funny Twitter bio?", "Yes. Choose Funny and add a real interest or detail. A personal joke based on your life works better than a random one liner."],
  ["Can I generate an aesthetic Twitter bio?", "Yes. Choose Aesthetic or Minimal. The result prioritizes rhythm and readable language, not a wall of unusual Unicode characters."],
  ["Do I need to type anything to generate a bio?", "No. Choose an account type, topic and tone from the dropdowns. The optional description is there when you want something more personal."],
  ["Can I rewrite a bio I already have?", "Yes. Select Improve My Current Bio, paste your original bio, and choose what you'd like to change. The tool keeps your real facts and writes cleaner alternatives."],
  ["Can the generator write bios for businesses or creators?", "Yes. Select Business, Creator or Founder. The questions change to reflect that kind of account."],
  ["Can it write an X bio for gaming or K-pop accounts?", "Yes. Choose Fan / Community or Creator and pick a topic such as Gaming, Anime, K-pop or Music. Add the specific game or artist in the optional field if you want a more tailored bio. Don't impersonate an official account."],
  ["Can I get Twitter bios in other languages?", "Yes. Open \"Make it more personal\" and choose English, Spanish, Portuguese, French, German, Italian, Indonesian, Hindi, Urdu or Arabic. Read the result through, since a native speaker may still prefer a small change."],
  ["Is this Twitter bio generator free?", "Yes, the tool is free to use with fair use limits. You don't need an X account connection to generate or copy text."],
  ["Is it safe to use an AI Twitter bio generator?", "You don't need to share your X password. Don't paste private information into the tool. Your answers are sent to an AI provider to write the bios and aren't stored by this site. Review the generated text before placing it on your public profile."],
  ["Do I need to connect my Twitter account?", "No. Generate the bio here, copy it, and paste it into X yourself. The generator never asks for your X credentials."],
  ["Will a better bio get me more followers?", "A clearer bio may help visitors understand your account, but no generator can guarantee follows, reach or account search rankings. Your posts and the people you engage with matter too."],
  ["Can I create a stylish or cute Twitter bio for a girl or a guy?", "Yes. Choose your interests and style. We use your answers instead of assuming your personality based on gender."],
  ["Why is my Twitter bio not showing or not saving?", "Check that you saved your changes. If saving fails, remove unusual symbols, check the 160 character limit, and follow X's official troubleshooting guidance."],
];

const EXAMPLES: [string, string[]][] = [
  ["Professional Twitter bios", ["SEO writer for SaaS teams. I share useful research, clearer copy and the occasional spreadsheet.", "Product designer working on simpler apps. Sharing prototypes, lessons and small wins.", "Freelance photographer capturing people as they are, not as a pose tells them to be."]],
  ["Twitter bios for founders and businesses", ["Building a scheduling app for small studios. Sharing product decisions and the mistakes along the way.", "Independent bookshop. New reads, old favorites and very strong opinions about endings.", "Local bakery making good bread and keeping the weekends interesting. Check our latest posts for specials."]],
  ["Funny Twitter bio ideas", ["Here for the football opinions. My own are usually worse.", "I make lists for fun. This is apparently the one about me.", "Learning to cook one questionable dinner at a time."]],
  ["Short and aesthetic X bios", ["Late nights. Good books. Better questions.", "Little projects, quiet mornings, big playlists.", "Making things, changing my mind, making them again."]],
  ["Gaming, fandom and creator bios", ["Games, lore and boss fights. Currently pretending I don't need another playthrough.", "Anime, playlists and long conversations about fictional characters.", "Sharing gaming clips, useful guides and the occasional terrible decision.", "Artist drawing strange little worlds. New sketches whenever I finish one."]],
  ["Cute and friendly Twitter bios", ["Mostly here to share things that made my day better.", "Books, coffee and being excited about small wins.", "Trying new things and telling you how they went."]],
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
  <img className={wide ? x.wide : f.figure} src={`${ART}/${name}.svg`} alt={alt} width={1200} height={680} loading="lazy" decoding="async" />
);

export default function TwitterBioGeneratorPage() {
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
              { name: "Twitter Bio Generator", url },
            ]),
            { "@type": "WebApplication", name: "Twitter (X) Bio Generator", url, description: DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
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
              <li aria-current="page">Twitter Bio Generator</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free social media tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            Free Twitter <span className={t.accent}>Bio Generator</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            Free Twitter bio generator for when you need a bio for X but don&apos;t know what to say. Pick a few options, tell us about yourself if you want, and get five bios you can actually use. Short, natural, and ready to copy.
          </p>
          <XBioTool />
        </div>
      </section>

      <SECTION id="how-it-works" band>
        <Head kicker="Four quick steps" title={<>How to use our free <em className={e.emGreen}>Twitter Bio Generator</em></>} intro="You don't need a personal brand statement. Or a collection of buzzwords. Just a few details about what makes your account yours." />
        <ol className={t.steps}>
          {[
            ["Choose your account type", "Personal, creator, founder, professional, business, or fan account. Each needs a different kind of introduction."],
            ["Choose your topic and your goal", "Tell us what you post about and what you want people to do when they find you."],
            ["Add context if you want", "One sentence about yourself, your business, or an achievement can turn an okay bio into one that actually sounds like you."],
            ["Generate and edit", "Browse five styles, check the character counts, preview each bio, and copy your favorite into X."],
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
        <Head kicker="The basics" title={<>What is a Twitter (X) <em className={e.emGreen}>bio generator?</em></>} />
        <div style={{ maxWidth: 760, margin: "16px auto 0" }}>
          <p className={e.body}>A Twitter bio generator helps you describe your account without starting from a blank page. You pick your interests, work, audience, or tone. The tool turns those details into short suggestions that fit X&apos;s bio field.</p>
          <p className={e.body}>It&apos;s useful when you&apos;re setting up a new account, changing what you post about, launching a business, or looking at your current bio and realizing it says almost nothing.</p>
          <p className={e.body}>The goal isn&apos;t to make everybody sound like a brand. It&apos;s to make it easier to write one or two sentences that feel like you.</p>
        </div>
      </SECTION>

      <SECTION id="what-to-put" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Anatomy of a bio</p>
            <h2 className={e.h2}>What should you put in your <em className={e.emGreen}>Twitter bio?</em></h2>
            <p style={{ marginTop: 16 }}>Think about the last time you clicked someone&apos;s profile after reading a good reply. You probably wanted to know two things: <strong>Who is this? And what do they talk about?</strong></p>
            <p>A useful bio normally gives people some combination of:</p>
            <ul>
              <li><strong>An identity:</strong> Designer, student, game developer, baker, football fan, founder, or anything else that&apos;s actually true.</li>
              <li><strong>A topic:</strong> What your posts tend to cover. Recipes, startups, local news, gaming, books, or your everyday life.</li>
              <li><strong>A reason to follow:</strong> Useful tips, progress updates, opinions, jokes, or work worth seeing.</li>
              <li><strong>A next step, when appropriate:</strong> Follow for tutorials, check the website field, or DM for bookings if your messages are open.</li>
            </ul>
            <p>You don&apos;t need all four. A personal account can get away with an honest one liner. A small business may need a clearer explanation of what it sells.</p>
          </div>
          <Figure name="01-x-bio-profile-anatomy" alt="Annotated X profile bio showing identity, topic and reason to follow" />
        </div>
      </SECTION>

      <SECTION id="character-limit">
        <Head kicker="Limits" title={<>Twitter bio character limit: <em className={e.emGreen}>how long can your bio be?</em></>} intro="An X bio can contain up to 160 characters. That's the bio limit, not the post limit." />
        <Figure wide name="02-x-character-limits" alt="X bio 160, display name 50, username 15 and post 280 character limits" />
        <div className={x.tableWrap} style={{ maxWidth: 900, margin: "0 auto" }}>
          <table className={x.table}>
            <thead>
              <tr>
                <th scope="col">X profile field</th>
                <th scope="col">Limit</th>
                <th scope="col">What belongs there</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Bio", "160 characters", "A short introduction and reason to follow"],
                ["Display name", "50 characters", "Your name or brand name"],
                ["Username", "Up to 15 characters", "Your unique @handle"],
                ["Standard post", "280 characters", "The text of a regular post, not your bio"],
                ["Location", "Separate field", "Your city or location, if you want to share it"],
                ["Website", "Separate field", "Your website, newsletter, or landing page"],
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
        <div style={{ maxWidth: 760, margin: "24px auto 0" }}>
          <p className={e.body}>
            These limits are confirmed in X&apos;s published <a href="https://help.x.com/en/managing-your-account/how-to-customize-your-profile" target="_blank" rel="noopener noreferrer">Help Center</a>. X offers longer posts through some subscription plans, but that doesn&apos;t increase the bio field&apos;s 160 character limit.
          </p>
          <p className={e.body}>Spaces and line breaks take up room. Emoji and decorative Unicode symbols can be more complicated to count across apps, so our generator checks the result and leaves a little room when needed. <strong>Always check the final count when you paste it into X.</strong></p>
          <p className={e.body}>You don&apos;t have to use all 160 characters. Sometimes a short bio says more because it doesn&apos;t try to say everything.</p>
        </div>
      </SECTION>

      <SECTION id="formula" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>A simple formula</p>
            <h2 className={e.h2}>How to write a Twitter bio that <em className={e.emGreen}>sounds like you</em></h2>
            <p style={{ marginTop: 16 }}>You can use a simple formula instead of trying to be clever:</p>
            <p><strong>Who you are + what you share + why someone might follow.</strong></p>
            <p className={x.quoteBox}>Designer for small brands. Sharing practical visual tips and lessons from client work.</p>
            <p>You know who this person is, what kind of posts to expect, and why their account might be useful. No big claims needed.</p>
            <p>For a personal account, the formula can be much looser:</p>
            <p className={x.quoteBox}>Here for football, food and whatever I decide to learn next.</p>
            <p>For a business, be more specific:</p>
            <p className={x.quoteBox}>Independent bakery making sourdough and weekend pastries. See what&apos;s fresh in our latest posts.</p>
          </div>
          <Figure name="03-x-bio-formula" alt="Identity plus what you share plus why follow, with an example" />
        </div>
      </SECTION>

      <SECTION id="examples">
        <Head kicker="Copy and paste ideas" title={<>Twitter bio ideas you can copy <em className={e.emGreen}>and make your own</em></>} intro="These are original, illustrative ideas. Replace anything that doesn't match your life or work. The generator can write more specific versions from your selections." />
        <ul className={x.examples}>
          {EXAMPLES.map(([h, list]) => (
            <li key={h}>
              <h3>{h}</h3>
              <ul>
                {list.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div style={{ maxWidth: 760, margin: "28px auto 0", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, margin: 0 }}>Bios for women and men</h3>
          <p className={e.body} style={{ marginTop: 8 }}>You don&apos;t need a different formula because of gender. Start with what actually defines your account: your interests, personality, work, fandoms, or sense of humor. Choose a style that fits you, not a stereotype.</p>
        </div>
        <Figure wide name="05-x-bio-tone-examples" alt="Six styles of Twitter bio for the same profile" />
      </SECTION>

      <SECTION id="styles" band>
        <Head kicker="Choosing a voice" title={<>Aesthetic vs funny vs professional: <em className={e.emGreen}>which style should you choose?</em></>} />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["Professional", "Best when your profile helps people understand your work. Use clear terms such as \"UX designer\" or \"independent florist.\""],
            ["Funny", "Great for casual accounts. One good line is enough. The joke should still give a clue about who you are."],
            ["Aesthetic", "Works when mood and personality matter more than credentials. Keep it readable, even if you're using line breaks or symbols."],
            ["Minimal", "Useful when you're not trying to explain your entire career. A short role or a few honest interests can be enough."],
            ["Confident", "Say what you do without pretending you're number one in the world."],
            ["Not sure?", "Choose Simple & Natural. It's the easiest style to personalize afterward."],
          ].map(([h, p]) => (
            <li key={h} className={f.card}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <div className={f.split} style={{ marginTop: 56 }}>
          <div>
            <h2 className={e.h2}>Why some Twitter bios <em className={e.emGreen}>feel generic</em></h2>
            <p style={{ marginTop: 16 }}>Look at these two descriptions.</p>
            <p><strong>Too vague:</strong> Dreamer | Hustler | Visionary | Coffee lover | Big goals</p>
            <p><strong>Clearer:</strong> I help indie founders write clearer landing pages. Sharing copy tips and real examples each week.</p>
            <p>The first one could describe thousands of accounts. The second gives readers an actual reason to stick around.</p>
            <p>Try replacing &ldquo;passionate about marketing&rdquo; with what you actually do in marketing. Replace &ldquo;creative soul&rdquo; with the kind of things you make. The more real the input, the better the result.</p>
          </div>
          <Figure name="04-x-bio-before-after" alt="Vague bio compared with specific useful bio" />
        </div>
      </SECTION>

      <SECTION id="keywords">
        <div className={f.split}>
          <Figure name="06-x-bio-keywords-clarity" alt="Clear descriptive bio compared with keyword and hashtag stuffing" />
          <div>
            <p className={e.eyebrow}>Keywords and hashtags</p>
            <h2 className={e.h2}>Should you put keywords or hashtags <em className={e.emGreen}>in your X bio?</em></h2>
            <p style={{ marginTop: 16 }}>Use the words people would naturally use to describe your work or interests. &ldquo;Travel photographer&rdquo; is clearer than &ldquo;memory collector.&rdquo; &ldquo;Frontend developer&rdquo; tells readers more than &ldquo;building the future.&rdquo;</p>
            <p>That doesn&apos;t mean stuffing keywords into your bio will make the algorithm recommend your profile. X doesn&apos;t provide a simple public formula for account discovery, and this tool cannot predict ranking or follower growth.</p>
            <p>Hashtags are optional. For most people, plain language uses those 160 characters better. A relevant campaign or community hashtag can make sense, but a row of hashtags usually makes a bio harder to read.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="formatting" band>
        <Head kicker="Formatting" title={<>Can you use emojis, line breaks <em className={e.emGreen}>or stylish fonts?</em></>} intro="Yes, you can make your bio playful. Just keep it easy to read." />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["Emojis", "One can add character. Ten usually crowd out the words that explain who you are. Turn them off in the tool for a cleaner result."],
            ["Line breaks", "A short break can separate what you do from the reason to follow. Long lists with a new line for every word tend to feel cluttered."],
            ["Stylish fonts", "Most so called Twitter fonts are Unicode characters, not a font setting in X. Decorative text may be harder to read with assistive technology and may count differently from ordinary letters. Use it sparingly. Our tool writes plain, copyable text instead of decorative letter substitutions."],
            ["Links", "X has a separate website field. Use that for your main URL and save the bio for the message. An @mention can be useful for a related account, so the tool only adds one when you give it your real handle."],
          ].map(([h, p]) => (
            <li key={h} className={f.card}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </SECTION>

      <SECTION id="ai-accuracy">
        <Head kicker="Accuracy" title={<>Can AI write a Twitter bio <em className={e.emGreen}>without making up details?</em></>} />
        <div style={{ maxWidth: 760, margin: "16px auto 0" }}>
          <p className={e.body}>It should. A good generator doesn&apos;t invent your job, a revenue figure, follower count, degree or achievement just because that sounds impressive.</p>
          <p className={e.body}>If you select Business and Professional, we can make a useful general bio. If you also tell the tool you&apos;re a baker who sells cinnamon rolls on weekends, the result will be far more personal.</p>
          <p className={e.body}>That&apos;s why the tool has optional details. You can start with dropdowns, then add real context if you want. The difference should be better specificity, not imaginary accomplishments.</p>
        </div>
      </SECTION>

      <SECTION id="change-bio" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>On X</p>
            <h2 className={e.h2}>How to change your <em className={e.emGreen}>Twitter bio on X</em></h2>
            <ol className={f.steps}>
              <li>Open X and go to your profile.</li>
              <li>Select <strong>Edit profile</strong>.</li>
              <li>Paste your new text into <strong>Bio</strong>. Check the characters, especially if you use emojis or symbols.</li>
              <li>Select <strong>Save</strong>.</li>
            </ol>
            <p>Your profile photo, display name, location and website are separate fields. You can update them in the same editor, but changing them isn&apos;t required to update the bio.</p>
            <h3 style={{ marginTop: 28, fontSize: 20 }}>Why won&apos;t X save my new bio?</h3>
            <p>Start with the character limit. A bio over 160 characters can fail to save. X&apos;s Help Center also warns that some fake verification symbols, unsafe URLs, and special characters can interfere with saving changes.</p>
            <p>
              Try removing decorative symbols, shortening the text, or moving your URL to the dedicated website field. If it still doesn&apos;t save, use X&apos;s official <a href="https://help.x.com/en/managing-your-account/cant-save-changes-to-my-account" target="_blank" rel="noopener noreferrer">troubleshooting guide</a>.
            </p>
          </div>
          <Figure name="07-x-bio-update-steps" alt="Generate, copy, update X profile in three steps" />
        </div>
      </SECTION>

      <section id="faq" className={t.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>Questions, answered</p>
            <h2 className={e.h2}>Questions people ask about <em className={e.emGreen}>Twitter bios</em></h2>
          </div>
          <FAQAccordion faqs={FAQS.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <SECTION id="related-tools" band>
        <Head kicker="Keep creating" title={<>Related <em className={e.emGreen}>free tools</em></>} />
        <ul className={`${f.cards} ${f.cards3}`}>
          {[
            ["Instagram", "Instagram Bio Generator", "Write a short bio that suits your Instagram profile too.", "/tools/instagram-bio-generator"],
            ["Facebook", "Facebook Bio Generator", "Get bio ideas for a profile, Page, creator account or Group.", "/tools/facebook-bio-generator"],
            ["Threads", "Threads Bio Generator", "A matching introduction for your Threads profile.", "/tools/threads-bio-generator"],
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
          <h2 id="social-h" className={e.h2}>Your bio introduces you. <em className={e.emGreen}>Your posts make people stay.</em></h2>
          <p className={e.body} style={{ margin: "14px auto 0" }}>
            I share practical ideas on SEO, content and organic growth for people building things online. If you&apos;re working on your own audience, you&apos;ll probably find something useful. Follow me for more marketing tips.
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
