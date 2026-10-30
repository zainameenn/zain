import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import t from "../_studio/edtool.module.css";
import f from "../facebook-bio-generator/fb.module.css";
import c from "./fbc.module.css";
import { FacebookCaptionTool } from "./FacebookCaptionTool";

// The Facebook Caption Generator on its own route (it overrides app/tools/[slug] for this slug), built
// from the October 31, 2026 brief and page copy. Captions come from /api/tools/fb-caption.

const PATH = "/tools/facebook-caption-generator";
const TITLE = "Free Facebook Caption Generator (AI) | Photo & Post Captions";
const DESCRIPTION = "Write Facebook captions for photos, Reels, business Pages and personal posts. Upload a photo or describe your post, choose a style and copy editable ideas.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ART = "/assets/tools/facebook-caption";

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4V9.5Z" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", icon: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.84v2.36H8v3h2.5V21h3Z" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/", icon: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.44-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z" },
  { name: "X", href: "https://x.com/zainnameen", icon: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z" },
];

const FAQS: [string, string][] = [
  ["Is this Facebook Caption Generator free?", "Yes. It's free to use with fair use limits that keep it running for everyone. There are no paid tiers."],
  ["Do I need to sign up to generate captions?", "No. There's no account, no login and no Facebook connection."],
  ["Can I write captions for Facebook photos with AI?", "Yes. Upload a photo and the tool describes what's visible. Add any important details that aren't visible, such as a location, event date or product information, and review the result before posting."],
  ["Can I generate captions without uploading a photo?", "Yes. Choose a post idea from the dropdowns, add a short topic if you like, and generate. A picture is optional."],
  ["Can I make funny Facebook captions?", "Yes. Select Funny under Tone. The result works from the actual situation rather than reusing the same joke every time."],
  ["Can I make professional captions for my business Page?", "Yes. Choose Business Page, select your category and goal, and add confirmed details about the product, service or update under Add more details."],
  ["Does it work for Facebook Groups?", "Yes. The Group setting uses community language, and it doesn't assume the post is a sales pitch or an advertisement."],
  ["Can I use the captions for Facebook Reels?", "Yes, for the written text accompanying a Reel. That is different from subtitles displayed inside the video."],
  ["Can it make subtitles or automatically transcribe videos?", "No. It writes social post text, not timed video subtitles, speech transcription or SRT files."],
  ["What's the Facebook caption character limit?", "Facebook's commonly documented post text limit is 63,206 characters. That doesn't mean you should write that many. A good caption is as long as its message needs to be."],
  ["How many words should a Facebook caption have?", "There's no universal best word count. Try a short version first for everyday updates, then add context only when the story needs it."],
  ["What does \"See more\" mean on a Facebook post?", "Facebook may collapse longer post text. People can expand it by selecting \"See more.\" The cutoff varies, so put the key information in the first line."],
  ["Can I copy and paste generated captions into Facebook?", "Yes. Copy the result and paste it into your post editor. Check it for accidental line breaks, unsupported claims or unusual formatting."],
  ["Can I rewrite a caption I've already written?", "Yes. Paste your draft into \"Existing caption to rewrite\" under Add more details. The tool keeps your facts and writes clearer versions. Each result also has Make shorter, More natural and Rewrite buttons."],
  ["Can I generate captions from a link?", "Not at the moment. The tool doesn't open web pages. Add a short description of the page instead. If you want a link in the caption, turn on the call to action and paste it in, and it's used exactly as given."],
  ["Are hashtags necessary on Facebook?", "No. You can post without them. The tool leaves them out unless you turn them on, and then suggests two at most."],
  ["Will a generated caption help my post go viral?", "No generator can guarantee views, comments, shares or distribution. Clear, relevant writing helps people understand the post, but results depend on many factors."],
  ["Can AI captions hurt Facebook reach?", "Meta focuses on spam, relevance and engagement manipulation, not a simple rule that AI written content is rewarded or penalized. Review generic copy, repetitive templates and unsupported claims before posting."],
  ["Is it safe to use? Do you keep my photo?", "Your photo and answers are sent to an AI provider (Google Gemini) to write the captions. This site doesn't store them. The photo is resized in your browser first, which also removes location data. Don't upload passwords, private customer details or confidential documents."],
  ["Can it write captions in other languages?", "Yes: English, Spanish, Hindi and Urdu. We tested each with the AI model behind the tool. Read the result through, since a native speaker may still prefer a small change."],
  ["Can it produce captions for giveaways?", "Yes, if you provide the real prize, eligibility conditions, dates and rules. The tool doesn't invent giveaway terms or imply Meta sponsorship."],
  ["Can it write Facebook ad copy?", "It can suggest promotional wording, but ads have their own placement, policy and character rules. Check those separately before running an ad."],
  ["Can it write captions for Instagram and TikTok too?", "Those platforms have different writing habits. Use the Instagram Caption Generator or TikTok Caption Generator for platform specific drafts."],
  ["Can it publish directly to Facebook?", "No. This generator creates draft text for you to copy. It never posts or schedules anything."],
  ["Why are the results generic sometimes?", "The tool can only work with the context it receives. Upload the right image, add one real detail, or paste an example of how you normally write."],
  ["Why doesn't the caption match my image?", "Image analysis can miss details. Check that you uploaded the intended image, add a description, and regenerate. Never post guessed product information."],
  ["Does the generator automatically add a question at the end?", "No. It only adds a question when the goal and post make one useful. Most results don't need a comment prompt."],
  ["Can I create a Facebook caption for a cover photo?", "You can write introductory copy for a cover photo post, but that's different from designing or resizing the cover image itself."],
  ["Can I post links in a Facebook caption?", "Yes, links can go in Facebook post text. Only include a real URL you supplied. The tool never invents a website address."],
];

const EXAMPLES: [string, string[]][] = [
  ["Short captions for Facebook photos", ["One of those afternoons I wish came with a replay button.", "The coffee was average. The company was not.", "Still finding sand in my shoes. Worth it.", "Nothing on the calendar, which was exactly the plan.", "An ordinary Tuesday that turned out pretty well."]],
  ["Funny Facebook captions", ["Went out for one thing. Returned with five things and no explanation.", "I have a plan. Whether I follow it is a separate issue.", "The camera roll says I had a good weekend. My laundry says otherwise.", "Trying to be spontaneous, but I'd like three days' notice.", "My most consistent hobby is starting another hobby."]],
  ["Facebook captions for small businesses", ["We added two new appointment times this week. If evenings work better for you, check the updated schedule on our Page.", "A new batch is on the counter today. Same recipe, just a little more cinnamon.", "We moved the fitting area to the front of the shop so there's more room to see what works.", "This week's workshop is about getting started with the basics, not buying another pile of equipment.", "A quick reminder: our hours change next Monday. The updated times are listed on the Page."]],
  ["Facebook captions for creators", ["This is the part of the project you don't usually see: the messy middle where nothing lines up yet.", "I tried the simpler version first. It turned out to be the one I liked most.", "Three things I learned making this, including one I probably should have known already.", "Behind this 30 second video was a very long afternoon.", "A small change to my process made the biggest difference this week."]],
  ["Facebook Group and community captions", ["The weekly discussion is open. Share one thing you're working on and one thing you've figured out.", "A reminder for new members: the resource list is pinned at the top of the Group.", "We've added a beginner thread so questions don't get lost between the longer discussions.", "Next week's topic is up for discussion. Tell us what would be genuinely helpful to cover.", "Thanks to everyone who shared examples this week. They made the guide much more practical."]],
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
  <img className={wide ? c.wideFig : f.figure} src={`${ART}/${name}.svg`} alt={alt} width={1200} height={680} loading="lazy" decoding="async" />
);

export default function FacebookCaptionGeneratorPage() {
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
              { name: "Facebook Caption Generator", url },
            ]),
            { "@type": "WebApplication", name: "Facebook Caption Generator", url, description: DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
          ],
        }}
      />

      <section className={f.hero} id="top">
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li aria-current="page">Facebook Caption Generator</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free social media tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            Free Facebook <span className={t.accent}>Caption Generator</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            Free Facebook caption generator for posts that don&apos;t need to sound clever, just worth reading. Upload a photo or tell us what you&apos;re posting about, choose the kind of post you want, and get five caption ideas you can edit and copy.
          </p>
          <p className={f.quote}>Personal photos, small businesses, Reels, group updates. Start with a caption that actually fits.</p>
          <FacebookCaptionTool />
        </div>
      </section>

      <SECTION id="how-to-use" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Three simple steps</p>
            <h2 className={e.h2}>How to use the <em className={e.emGreen}>Facebook Caption Generator</em></h2>
            <p style={{ marginTop: 16 }}>You don&apos;t need to know exactly what to write before you start.</p>
            <ol className={f.steps}>
              <li><strong>Show us the post.</strong> Upload a photo or choose what you&apos;re posting about. A picture of your new products is a useful start. A sentence like &ldquo;we&apos;re opening one hour earlier this Friday&rdquo; is even better because it gives the caption a real detail.</li>
              <li><strong>Pick your style.</strong> Choose where you&apos;re posting, who will read it, and the kind of message you want. Keep it simple, funny, informative or somewhere in between. You can ask for a short line or a longer story.</li>
              <li><strong>Edit and copy your favorite.</strong> Compare five approaches. Edit anything that doesn&apos;t sound like you. Check the facts, copy the one you like and paste it into your Facebook post.</li>
            </ol>
          </div>
          <Figure name="01-photo-to-caption" alt="A photo and the owner's details turning into a caption ready to copy" />
        </div>
      </SECTION>

      <SECTION id="what-is">
        <Head kicker="The basics" title={<>What is a Facebook <em className={e.emGreen}>caption generator?</em></>} />
        <div className={c.prose}>
          <p className={e.body}>A Facebook caption generator writes the text that goes with a Facebook photo, video, Reel or regular post. Instead of starting with a blank box, you give it a topic, a few options or a picture and it suggests what to say.</p>
          <p className={e.body}>For a personal post, that might be one funny line under a holiday photo. For a business Page, it might be a clear announcement about a new service. For a community Group, it might be a friendly update explaining what members need to know.</p>
          <p className={e.body}>It&apos;s a writing helper, not an automatic publishing tool. You still decide what to post, and the final caption should reflect something real.</p>
        </div>
      </SECTION>

      <SECTION id="good-caption" band>
        <Head kicker="The craft" title={<>What makes a good <em className={e.emGreen}>Facebook caption?</em></>} />
        <div className={f.split} style={{ marginTop: 32 }}>
          <div>
            <h3>Start with the useful part</h3>
            <p>The first sentence should tell people why the post matters. It might be a detail, a little story, a helpful tip or a specific announcement. &ldquo;We&apos;re opening at 8 on Friday&rdquo; says more than &ldquo;Something exciting is coming!&rdquo;</p>
            <p>Longer Facebook posts may collapse behind <strong>See more</strong>, and the point where that happens depends on the device and layout. There&apos;s no universal number of characters that everyone sees first. That&apos;s why we preview the opening line without pretending to know the exact cutoff.</p>
            <h3 style={{ marginTop: 24 }}>Write like you normally talk</h3>
            <p>Your caption doesn&apos;t need a marketing voice. &ldquo;We made another batch of the chocolate cookies because you kept asking&rdquo; sounds more like a real business than &ldquo;We are absolutely thrilled to unveil our premium range.&rdquo;</p>
          </div>
          <Figure name="02-first-line-preview" alt="A Facebook style post where the first line carries the point before See more" />
        </div>
        <div className={f.split} style={{ marginTop: 40 }}>
          <Figure name="09-caption-framework" alt="A useful caption in four parts: the point, a useful detail, a natural voice and an optional next action" />
          <div>
            <h3>Add a detail the picture doesn&apos;t show</h3>
            <p>A photo shows the product. The caption can explain what changed, why it matters or what happens next. For a local business, that may be opening hours or availability. For a creator, it may be the story behind the clip. For a personal post, it might be the memory you&apos;re trying to capture.</p>
            <h3 style={{ marginTop: 24 }}>Ask a question only when it fits</h3>
            <p>A good question comes naturally from the post. A bad question is added only to collect comments. Not every update needs a call to action. Sometimes a clear sentence is enough.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="length">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Length</p>
            <h2 className={e.h2}>How long should a <em className={e.emGreen}>Facebook caption be?</em></h2>
            <p style={{ marginTop: 16 }}>
              Facebook posts allow up to <strong>63,206 characters</strong>, according to <a href="https://hootsuite.my.site.com/hootsuite/s/article/create-fb" target="_blank" rel="noopener noreferrer">Hootsuite&apos;s October 2026 publishing documentation</a>. That is a technical maximum, not a writing target. Most everyday updates are much shorter.
            </p>
            <p><strong>Short:</strong> One or two sentences. Good for a photo, quick update, simple joke or Reel.</p>
            <p><strong>Medium:</strong> Two to four sentences. Helpful for new products, events, local businesses and tips that need some context.</p>
            <p><strong>Story:</strong> Several short paragraphs. Useful when the real story is the point, such as a personal milestone, behind the scenes experience or founder update.</p>
            <p>Our length setting shapes the draft but never adds filler just to hit a number. Every result shows its character, word and hashtag count as you edit.</p>
          </div>
          <Figure name="03-caption-lengths" alt="Short, medium and story length caption examples side by side" />
        </div>
      </SECTION>

      <SECTION id="examples" band>
        <Head kicker="Copy and paste ideas" title={<>Facebook caption examples <em className={e.emGreen}>you can actually use</em></>} intro="These are original sample captions. The businesses and updates are hypothetical. Change the details before posting." />
        <ul className={c.examples}>
          {EXAMPLES.map(([h, list]) => (
            <li key={h}>
              <h3>{h}</h3>
              <ol>
                {list.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </li>
          ))}
          <li>
            <h3>Captions for products, events and announcements</h3>
            <p><strong>Product:</strong> The new notebook cover is here. Same simple layout inside, with a softer cover and two additional colors.</p>
            <p><strong>Event:</strong> The neighborhood craft session is happening Saturday afternoon. We&apos;ll cover the basics, and you can bring questions.</p>
            <p><strong>Offer:</strong> There&apos;s a weekend promotion on selected items. Check the product pages for the exact prices and terms before ordering.</p>
            <p><strong>Announcement:</strong> We&apos;re testing a new opening schedule next month. We&apos;ll share the confirmed hours once they&apos;re finalized.</p>
            <p><strong>Reel:</strong> Three small fixes that made the workspace feel twice as usable.</p>
          </li>
        </ul>
        <p className={e.small} style={{ textAlign: "center", marginTop: 16 }}>The generator never invents specific dates, prices or other claims you haven&apos;t given it.</p>
        <Figure wide name="07-caption-types" alt="Different post types, personal, business, creator, group and event, each with its own example caption" />
      </SECTION>

      <SECTION id="before-after">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Before and after</p>
            <h2 className={e.h2}>Fixing a generic <em className={e.emGreen}>Facebook caption</em></h2>
            <p style={{ marginTop: 16 }}><strong>Before:</strong></p>
            <p className={c.quoteBox}>We&apos;re so excited to share some amazing news with you! Stay tuned for more updates. Don&apos;t forget to like and share!</p>
            <p><strong>After, when the real detail is known:</strong></p>
            <p className={c.quoteBox}>The second studio room opens on Monday. More space for evening classes, and a little less waiting for everyone who asked about them.</p>
            <p>The second caption says what changed and why people might care. There&apos;s no need to pretend every post is a major announcement.</p>
          </div>
          <Figure name="04-before-after-caption" alt="A vague promotional caption rewritten as a specific, useful update" />
        </div>
      </SECTION>

      <SECTION id="from-photo" band>
        <div className={f.split}>
          <Figure name="06-photo-facts-check" alt="What a photo shows, like two mugs on a wooden table, compared with facts the owner must confirm, like price and shipping" />
          <div>
            <p className={e.eyebrow}>Photo captions</p>
            <h2 className={e.h2}>How to generate Facebook captions <em className={e.emGreen}>from a photo</em></h2>
            <p style={{ marginTop: 16 }}>Upload a product photo, event image or everyday snapshot. An image capable AI can identify visible objects, colors and scenes, then suggest caption ideas that match the post.</p>
            <p>But a photo can&apos;t reliably tell the model the price of a product, the name of a location, whether something was handmade, whether a store is open or how a customer feels. Those details need to come from you.</p>
            <p>For example, the tool may recognize two mugs on a wooden table. It won&apos;t say &ldquo;handmade ceramic mugs, now 30% off with free shipping&rdquo; unless you supplied those facts.</p>
            <p className={f.focusLine}>Tip: add one sentence about why you&apos;re sharing the photo. That&apos;s usually more useful than a long list of adjectives.</p>
          </div>
        </div>
      </SECTION>

      <SECTION id="natural">
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Genuine conversations</p>
            <h2 className={e.h2}>Facebook captions that feel <em className={e.emGreen}>natural, not forced</em></h2>
            <p style={{ marginTop: 16 }}>Facebook is built around people sharing things with other people. A caption doesn&apos;t have to push every reader to comment, click or buy.</p>
            <p>
              Meta warns against <a href="https://about.fb.com/news/2017/12/news-feed-fyi-fighting-engagement-bait-on-facebook/" target="_blank" rel="noopener noreferrer">engagement bait</a> and against <a href="https://about.fb.com/news/2025/04/cracking-down-spammy-content-facebook/" target="_blank" rel="noopener noreferrer">irrelevant captions and excessive hashtags</a>. Instead of &ldquo;LIKE if you agree,&rdquo; say something real. You can still ask a genuine question when it helps your audience, such as asking members which workshop topic would be useful next month.
            </p>
          </div>
          <Figure name="05-genuine-conversation" alt="Engagement bait like LIKE if you agree, compared with a specific post that asks a relevant question" />
        </div>
      </SECTION>

      <SECTION id="business" band>
        <div className={c.prose}>
          <Head kicker="For business Pages" title={<>How to write a Facebook caption <em className={e.emGreen}>for a business Page</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>Start with what the customer needs to know. If it&apos;s a local business, focus on a clear update, an answer to a common question, an available service or a specific event. Don&apos;t make up urgency or claim a product is selling out.</p>
          <p className={e.body}>For a salon, that might mean a new booking time. For a bakery, it might be which loaf is back. For a service business, it might be one useful tip and an invitation to learn more.</p>
          <p className={e.body}>When asking the generator to write promotional copy, add the exact offer, date, price and conditions under Add more details. If you don&apos;t know them yet, the tool keeps the wording general.</p>
        </div>
      </SECTION>

      <SECTION id="hashtags-emojis">
        <div className={c.prose}>
          <Head kicker="Optional extras" title={<>Should you use hashtags and <em className={e.emGreen}>emojis on Facebook?</em></>} />
          <p className={e.body} style={{ marginTop: 16 }}>Both are optional. A relevant hashtag can label a topic or campaign, but a long chain of unrelated tags makes a caption harder to read. Meta has specifically warned about posts with excessive hashtags.</p>
          <p className={e.body}>Our tool defaults to <strong>no hashtags</strong> and <strong>no emojis</strong>. Turn them on when they genuinely suit the post. With hashtags on, you get at most two relevant ones; remove anything that feels forced.</p>
          <p className={e.body}>There isn&apos;t a proven universal hashtag count that guarantees reach. The same is true for emojis: one that supports your tone is useful; ten that make the post harder to read are not.</p>
        </div>
      </SECTION>

      <SECTION id="captions-vs-subtitles" band>
        <div className={f.split}>
          <div>
            <p className={e.eyebrow}>Two different tasks</p>
            <h2 className={e.h2}>Facebook caption vs <em className={e.emGreen}>Facebook video subtitles</em></h2>
            <p style={{ marginTop: 16 }}>A <em>post caption</em> is the writing above or alongside a photo, video or Reel. It explains the post, introduces a topic or adds context.</p>
            <p><em>Video subtitles</em> (also called closed captions) are timed words associated with the spoken audio in a video. They serve accessibility and viewing purposes and may be generated through Facebook or video editing tools. They are not created by this caption generator.</p>
            <p>If you need video transcription, timestamped text or SRT subtitles, use a dedicated subtitle tool. The tools solve different tasks.</p>
          </div>
          <Figure name="08-caption-vs-subtitles" alt="A written post caption compared with timed video subtitles" />
        </div>
      </SECTION>

      <SECTION id="mistakes">
        <Head kicker="Easy to fix" title={<>Common mistakes <em className={e.emGreen}>to avoid</em></>} />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["Starting with \"We're thrilled to announce\"", "Say the actual announcement instead."],
            ["Writing the same caption for every photo", "Match the content to the specific image."],
            ["Inventing proof", "Avoid made up customer quotes, numbers, prices, dates and promises."],
            ["Turning every ending into a question", "Ask only when you want a real answer."],
            ["Adding five unrelated hashtags", "Describe the post, don't decorate it with tags."],
            ["Posting something longer than the message needs", "Long stories can work, but long introductions rarely help."],
            ["Treating AI output as final", "Edit for your facts and your voice before publishing."],
          ].map(([h, p], i) => (
            <li key={h} className={f.card}>
              <span className={f.label}>{String(i + 1).padStart(2, "0")}</span>
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
            <h2 className={e.h2}>Frequently asked <em className={e.emGreen}>questions</em></h2>
          </div>
          <FAQAccordion faqs={FAQS.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <SECTION id="related-tools" band>
        <Head kicker="Keep creating" title={<>More free tools <em className={e.emGreen}>for your next post</em></>} />
        <ul className={`${f.cards} ${f.cards2}`}>
          {[
            ["Instagram", "Instagram Caption Generator", "Write a caption that matches an Instagram post or carousel.", "/tools/instagram-caption-generator"],
            ["TikTok", "TikTok Caption Generator", "Add context to a short video without filling it with generic hashtags.", "/tools/tiktok-caption-generator"],
            ["Facebook", "Facebook Bio Generator", "Introduce yourself or your Page in a few words.", "/tools/facebook-bio-generator"],
            ["Planning", "Social Media Content Calendar Generator", "Turn several post ideas into a plan.", "/tools/social-media-content-calendar-generator"],
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
          <h2 id="social-h" className={e.h2}>Want more practical <em className={e.emGreen}>marketing tips?</em></h2>
          <p className={e.body} style={{ margin: "14px auto 0" }}>
            I share simple, useful ideas about SEO, social media, content and growing businesses online. Follow along if you&apos;re working on any of those things.
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
