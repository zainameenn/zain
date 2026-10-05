import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import Link from "next/link";
import { ArrowIcon, Emphasis, UpArrowIcon } from "../../HomeComponents/icons";
import { FAQAccordion } from "../../HomeComponents/FAQAccordion";
import { Img } from "../../HomeComponents/Img";

export const metadata = buildMetadata({
  title: "Reddit Marketing Specialist for SaaS | No Ad Spend | Zain",
  description:
    "Reddit marketing specialist for SaaS and service brands. Subreddit research, real accounts and useful posts that keep ranking on Google. $1,199/mo.",
  path: "/services/reddit-marketing-specialist",
});

const MAX = 1360;
const PAD = "clamp(20px,4vw,48px)";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 34, padding: "0 14px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="max-md:!text-center" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>{children}</div>;
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: React.ReactNode; sub: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(28px,3vw,40px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "#D3AE82" : "#6F6B64" }}>{eyebrow}</div>
        <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em", color: dark ? "#F2EFEA" : "#1C1C1C" }}>{title}</h2>
      </div>
      <div>
        <p style={{ margin: 0, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(24px,2.2vw,30px)", lineHeight: 1.15, color: dark ? "#F2EFEA" : "#6B6862", maxWidth: 440 }} className="max-md:!mx-auto">{sub}</p>
      </div>
    </div>
  );
}

const PROOF = [
  { v: "Thousands", l: "Reddit-driven conversions" },
  { v: "$0", l: "ad spend behind them" },
  { v: "44K", l: "views on a single post" },
];

const PROBLEM_LIST = [
  "Posting in the wrong communities",
  "Promoting before anyone knows who you are",
  "Accounts with no history",
  "Ignoring each subreddit's rules",
  "Talking like a brand instead of a person",
  "Chasing upvotes instead of users",
];

const LAYERS = [
  {
    n: "01",
    t: "Community research",
    d: "Find the subreddits where your buyers actually ask questions, not just the biggest ones.",
    tags: ["Subreddit research", "Community rules", "Recurring questions", "Competitor mentions", "Audience language"],
    alt: "Subreddits mapped to the people and interests inside them",
    img: "04-layer-1__community-mapping.png",
  },
  {
    n: "02",
    t: "Account and reputation",
    d: "Real accounts with real history. Karma and context come before any product mention.",
    tags: ["Account building", "Beginner-friendly communities", "Karma history", "Transparent identity"],
    alt: "Searching and filtering communities to find the threads worth joining",
    img: "04-layer-2__research-filtering.png",
  },
  {
    n: "03",
    t: "Content",
    d: "Posts people would still care about if your product name disappeared.",
    tags: ["Useful posts", "Side-project shares", "Feedback requests", "Lessons and results"],
    alt: "An idea turned into a structured post that earns upvotes",
    img: "04-layer-3__structured-post.png",
  },
  {
    n: "04",
    t: "Conversation",
    d: "Replies, answers and follow ups. Most of the trust gets built in the comments, not the post.",
    tags: ["Helpful comments", "Answering questions", "Recommendation threads", "Community monitoring"],
    alt: "One post branching into replies, shares and saves",
    img: "04-layer-4__replies-and-shares.png",
  },
];

const JOURNEY_STAGES = [
  { n: "01", t: "Community", d: "Where your buyers already hang out." },
  { n: "02", t: "Question", d: "The problem they keep asking about." },
  { n: "03", t: "Useful content", d: "A post or answer worth reading." },
  { n: "04", t: "Conversation", d: "Replies that build trust." },
  { n: "05", t: "Discovery", d: "Google, AI answers and new readers." },
  { n: "06", t: "Users", d: "People who click through, try the product and, when the fit is right, convert." },
];

const DELIVERABLES = [
  { n: "01", t: "Research", d: "Subreddit research, community rules, recurring questions and competitor mentions." },
  { n: "02", t: "Strategy", d: "Which communities to prioritize, what to post, and when a product mention actually fits." },
  { n: "03", t: "Execution", d: "Posts, helpful comments and ongoing replies from real accounts." },
  { n: "04", t: "Monitoring", d: "Community discussions, recommendation threads and mentions of your brand." },
  { n: "05", t: "Measurement", d: "Views, traffic, users and conversions, reported monthly." },
];

const PROCESS_STEPS = [
  { n: "01", t: "Listen", d: "Find the right communities before posting anything." },
  { n: "02", t: "Research", d: "Learn the rules, tone and what actually gets attention." },
  { n: "03", t: "Participate", d: "Build real history and help people first." },
  { n: "04", t: "Publish", d: "Posts and replies worth reading, with the product only where it genuinely fits." },
  { n: "05", t: "Measure", d: "Track what brings users, not just upvotes. Then do more of that." },
];

const PLAN_RESEARCH = ["Subreddit research", "Community rules", "Recurring questions", "Content opportunities", "Account / reputation strategy"];
const PLAN_EXECUTION = ["Posts", "Helpful comments", "Replies", "Community monitoring", "Opportunity tracking", "Monthly reporting"];

const FIT_GOOD = [
  "Your buyers already discuss the problem you solve.",
  "Your product genuinely helps those conversations.",
  "You're happy to share real expertise, not just links.",
  "You can wait a few weeks for accounts and trust to build.",
];
const FIT_BAD = [
  "You want guaranteed views.",
  "You want daily product promotion.",
  "You want to ignore subreddit rules.",
  "You'd rather not hear honest feedback about your product.",
];

const FAQS: [string, string[]][] = [
  [
    "How much does Reddit marketing cost, and what results can I expect?",
    [
      "Reddit marketing is $1,199 a month, billed weekly or every two weeks. It is organic only, so there is no ad budget on top.",
      "Results depend on the niche, the communities and the product. In my experience, a strong post in a focused subreddit can bring a steady stream of users while it is active and keep bringing some for weeks after. I will tell you up front if I do not think your audience is on Reddit.",
    ],
  ],
  [
    "How does Reddit marketing actually work?",
    [
      "I find the subreddits where your buyers ask for help, learn each community's rules and tone, and build real history by being useful first.",
      "Then I write posts and replies people would care about even without the product name in them, and mention the product only where it genuinely fits. Most of the trust gets built in the comments.",
    ],
  ],
  [
    "Will Reddit ban my account for marketing?",
    [
      "Reddit does not ban marketing. It bans spam and rule-breaking. The accounts that get removed are usually brand new, post only links, or ignore the subreddit's rules.",
      "I work from real accounts with real history, read each community's rules before posting, and stay transparent about who I am. As my own working rule, I like an account to have at least around 20 karma and some genuine participation before it shares anything of its own. That is my heuristic, not an official Reddit threshold, and some communities set their own.",
    ],
  ],
  [
    "How long does Reddit marketing take to work?",
    [
      "Usually a few weeks before the first meaningful results. Accounts need history and communities need to see you helping before anything you share gets traction.",
      "Once a few good threads are live, they tend to keep getting found through Reddit search, Google and AI answers.",
    ],
  ],
  [
    "Are Reddit ads worth it?",
    [
      "Sometimes, but I rarely start there. Reddit reviews every ad and can reject it, and each community has its own culture. Some product types get pushback almost everywhere.",
      "Ads can work when the product solves a very specific problem for a very specific community. Organic usually tells you first whether that is true.",
    ],
  ],
  [
    "Can Reddit help my SEO and Google rankings?",
    [
      "Indirectly, yes. Reddit threads show up heavily in Google results, so a useful thread that mentions you can be found by people searching, not just by Reddit users.",
      "It does not replace SEO on your own site, but the two support each other well.",
    ],
  ],
  [
    "Does Reddit show up in ChatGPT and AI answers?",
    [
      "Reddit content is widely used and referenced by AI answer tools, and Google has a data licensing agreement with Reddit. Useful threads can end up shaping the answers people get when they ask for recommendations.",
      "Virtarix is a good example: it shows up in Reddit Answers for hosting questions.",
    ],
  ],
  [
    "What kinds of businesses work best on Reddit?",
    [
      "Products and services whose buyers already discuss the problem online: SaaS, developer tools, hosting, AI tools, niche consumer products and many service businesses.",
      "It works less well when there is no community around the problem, or when the offer needs heavy promotion to make sense.",
    ],
  ],
];

const RELATED = [
  { t: "SEO & Organic Growth", d: "Good Reddit threads can support search visibility.", href: "/services/seo-specialist-for-saas" },
  { t: "Growth Strategy & GTM", d: "When Reddit is only one part of the acquisition problem.", href: "/services/saas-growth-consultant" },
];

export default function RedditMarketingPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(40px,5vw,72px) ${PAD} clamp(48px,5vw,72px)`, display: "grid", gap: "48px clamp(32px,4vw,64px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div style={{ minWidth: 0 }} className="max-md:!text-center">
          <h1 className="max-md:!mx-auto" style={{ ...HERO_H1_STYLE, maxWidth: 680 }}>
            Reddit marketing specialist for SaaS brands that{" "}
            <em style={H1_ACCENT_STYLE}>
              don&apos;t want to smell <Emphasis>like an ad.</Emphasis>
            </em>
          </h1>
          <p className="max-md:!mx-auto" style={{ margin: "30px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#1C1C1C" }}>
            As a Reddit marketing specialist, I find the communities where your buyers ask for help, build real accounts with real history, and write posts and replies people actually want to read.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "10px 0 0", maxWidth: 520, fontSize: 16.5, lineHeight: 1.55, color: "#5A5854" }}>The kind that keep bringing users long after they&apos;re posted.</p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 20px" }} className="max-md:!mx-auto max-md:!max-w-[400px] max-md:!flex-col max-md:!items-stretch">
            <a href="#contact" className="max-md:!justify-center max-md:!whitespace-normal max-md:!text-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", whiteSpace: "nowrap", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
              Show me my Reddit opportunity
              <ArrowIcon />
            </a>
            <a href="#results" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 4px", fontSize: 16, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid transparent" }}>
              See Reddit results
              <UpArrowIcon />
            </a>
          </div>
          <p className="max-md:!block" style={{ margin: "14px 0 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#6E6B66" }}>
            <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
            Organic first. No ad spend. No shortcuts.
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0, width: "100%", maxWidth: 680 }}>
          <Img loading="eager" fetchPriority="high" src="/assets/pages/reddit/01-hero__threads-to-engaged-users.png" alt="Reddit threads flowing through search into engaged users" style={{ display: "block", width: "100%", height: "auto" }} />
        </figure>
      </section>

      {/* PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD}` }}>
        <Eyebrow>Reddit proof</Eyebrow>
        <div style={{ marginTop: 14, display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }} className="!grid-cols-1 sm:!grid-cols-3">
          {PROOF.map((s, i) => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 12, padding: "28px 24px", borderLeft: i ? "1px solid #DDDAD3" : "0", borderTop: i ? "1px solid #DDDAD3" : "0" }} className="sm:!border-t-0 max-sm:!border-l-0 max-md:!items-center max-md:!text-center">
              <div className="max-md:!justify-center" style={{ height: 56, display: "flex", alignItems: "flex-end", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(40px,4vw,56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 14, lineHeight: 1.4, color: "#5A5854" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <p className="max-md:!pl-0 max-md:!text-center" style={{ margin: "12px 0 0", paddingLeft: 24, fontSize: 13, color: "#6F6B64" }}>Across SaaS and service clients.</p>
      </section>

      {/* PROBLEM */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "32px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Reddit doesn&apos;t hate marketing.</h2>
            <p className="max-md:!text-center" style={{ margin: "10px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.5vw,34px)", lineHeight: 1.12, color: "#6B6862" }}>
              It hates <Emphasis>bad marketing.</Emphasis>
            </p>
            <div style={{ marginTop: "clamp(28px,3vw,40px)" }}>
              <Img loading="lazy" src="/assets/pages/reddit/03-problem__promo-blocked-vs-helpful.png" alt="Promotional posts getting blocked versus helpful posts gaining upvotes" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          </div>
          <div style={{ maxWidth: 560 }}>
            <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.5, fontWeight: 500, color: "#1C1C1C" }}>Most brands show up on Reddit the same way: a brand new account, a link, and a post that reads like a press release.</p>
            <p style={{ margin: "10px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>Then it gets removed, downvoted, or roasted in the comments. Usually all three.</p>
            <p className="max-md:!text-base" style={{ margin: "24px 0 0", fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>The problem is rarely Reddit. It&apos;s usually one of these:</p>
            <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", borderTop: "1px solid #DDDAD3" }}>
              {PROBLEM_LIST.map((it) => (
                <li key={it} style={{ padding: "11px 0", borderBottom: "1px solid #DDDAD3", fontSize: 16.5, color: "#4E4C48" }}>
                  {it}
                </li>
              ))}
            </ul>
            <p style={{ margin: "22px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
              Help first. Mention the product second. <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.12em", color: "#6B6862" }}>Maybe.</em>
            </p>
          </div>
        </div>
      </section>

      {/* LAYERS / THE WORK */}
      <section id="the-work" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(28px,3vw,40px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
          <div>
            <Eyebrow>The work</Eyebrow>
            <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Reddit marketing has five layers.</h2>
          </div>
          <p style={{ margin: 0, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(24px,2.2vw,30px)", lineHeight: 1.15, color: "#6B6862", maxWidth: 440 }} className="max-md:!mx-auto">Skip one and the rest usually fall apart.</p>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          {LAYERS.map((l) => (
            <div key={l.n} style={{ borderRadius: 28, background: "#FBFBF9", border: "1px solid #C9B9A2", boxShadow: "0 0 0 4px rgba(196,164,124,.12)", padding: "clamp(22px,2.6vw,34px)", display: "grid", gap: "24px 32px", alignItems: "center" }} className="md:!grid-cols-2">
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{l.n}</div>
                <h3 style={{ margin: "10px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(24px,2.2vw,30px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1 }}>{l.t}</h3>
                <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>{l.d}</p>
                <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {l.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </div>
              <Img loading="lazy" src={`/assets/pages/reddit/${l.img}`} alt={l.alt} style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          ))}
          <div style={{ borderRadius: 28, background: "#FBFBF9", border: "1px solid #C9B9A2", boxShadow: "0 0 0 4px rgba(196,164,124,.12)", padding: "clamp(24px,3vw,44px)", display: "grid", gap: "28px clamp(32px,4vw,56px)", alignItems: "center" }} className="md:!grid-cols-2">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#7D6039" }}>05</div>
              <h3 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(28px,2.8vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                Distribution and <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em" }}>discovery</em>
              </h3>
              <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.55, color: "#1C1C1C", fontWeight: 500, maxWidth: 460 }}>A good thread doesn&apos;t stay on Reddit.</p>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.6, color: "#5A5854", maxWidth: 460 }}>It shows up in Google and in AI answers for months.</p>
              <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Google visibility", "AI answer visibility", "Long-tail discovery", "Referral tracking"].map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
            <Img loading="lazy" src="/assets/pages/reddit/04-layer-5__thread-to-page-to-user.png" alt="A thread leading to a page, a signup and revenue" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>

      {/* JOURNEY (dark) */}
      <section className="max-md:!mt-20" style={{ marginTop: "clamp(96px,9vw,128px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,5vw,80px) ${PAD} clamp(48px,4.5vw,64px)` }}>
          <div style={{ display: "grid", gap: "16px 48px", alignItems: "end" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#D3AE82" }}>How Reddit turns into users</div>
              <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
                From a thread
                <span style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.02em", lineHeight: 1.08, color: "#D3AE82" }}>
                  <Emphasis>to hundreds of users.</Emphasis>
                </span>
              </h2>
            </div>
            <div className="max-md:!mx-auto" style={{ maxWidth: 480 }}>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "#F2EFEA" }}>Reddit works when useful participation comes first.</p>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.6, color: "#B7B2A8" }}>The product becomes part of the conversation because it answers the problem, not because someone forced it into the thread.</p>
            </div>
          </div>
          <div style={{ marginTop: "clamp(20px,2.4vw,32px)" }}>
            <Img loading="lazy" src="/assets/pages/reddit/05-thread-to-users__dark-journey.png" alt="Reddit threads turning into clicks, visits, signups and growth" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <ol style={{ margin: "clamp(20px,2.4vw,32px) 0 0", padding: 0, listStyle: "none", display: "grid", gap: "20px 16px" }} className="grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6">
            {JOURNEY_STAGES.map((s, i) => (
              <li key={s.n} style={{ minWidth: 0, paddingTop: 14, borderTop: `1px solid ${i === JOURNEY_STAGES.length - 1 ? "#C4A47C" : "#3A3935"}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#D3AE82", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
                <div style={{ marginTop: 6, fontFamily: "var(--nf-general-sans)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{s.t}</div>
                <div className="max-md:!text-base" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.45, color: "#B7B2A8" }}>{s.d}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY REDDIT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "32px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div>
            <Eyebrow>Why Reddit matters</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Most people on Reddit never comment.</h2>
            <p className="max-md:!text-center" style={{ margin: "10px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.5vw,34px)", lineHeight: 1.12, color: "#6B6862" }}>They&apos;re still reading.</p>
            <p style={{ margin: "24px 0 0", maxWidth: 500, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>
              A common rule of thumb for online communities: out of every 100 people, roughly 90 only read, around 9 occasionally join in, and a small minority creates most of the content.
            </p>
            <p style={{ margin: "12px 0 0", maxWidth: 500, fontSize: 17, lineHeight: 1.55, color: "#1C1C1C", fontWeight: 500 }}>So a thread with 20 comments may still be read by thousands.</p>
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #DDDAD3", maxWidth: 500 }}>
              <p style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>Reddit also travels.</p>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48" }}>Useful Reddit threads can surface in Google and be referenced by AI answer tools long after the original posting window.</p>
            </div>
          </div>
          <Img loading="lazy" src="/assets/pages/reddit/06-why-reddit__few-posts-large-audience.png" alt="A few posts read by a large crowd of silent readers" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="max-md:!pt-12" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <SectionHead eyebrow="Reddit results" title="Threads that turned into users." sub="Results, not just upvotes." />

        {/* Blainy */}
        <article style={{ borderRadius: 28, background: "#FBFBF9", border: "1px solid #C9B9A2", boxShadow: "0 0 0 4px rgba(196,164,124,.12)", padding: "clamp(24px,3vw,44px)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Blainy · AI SaaS · Reddit</div>
          <div style={{ marginTop: 14, display: "grid", gap: "28px clamp(32px,4vw,56px)", alignItems: "start" }} className="md:!grid-cols-2">
            <div>
              <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(30px,3vw,42px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.06 }}>
                6,089 clicks from Reddit to one tracked link.
                <span style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.02em", color: "#6B6862" }}>$0 on ads.</span>
              </h3>
              <p style={{ margin: "18px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#1C1C1C", fontWeight: 500, maxWidth: 480 }}>The linked posts were only part of the strategy.</p>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48", maxWidth: 480 }}>
                For every post built to send traffic, I published roughly three to four pieces designed simply to be useful inside the community. That&apos;s why it never felt like constant promotion.
              </p>
              <p className="max-md:!text-base" style={{ margin: "14px 0 0", paddingTop: 14, borderTop: "1px solid #DDDAD3", fontSize: 15, lineHeight: 1.6, color: "#5A5854", maxWidth: 480 }}>
                The work didn&apos;t stop the day a post fell off the feed. Older threads kept sending clicks for months afterwards.
              </p>
            </div>
            <figure style={{ margin: 0, minWidth: 0 }}>
              <Img loading="lazy" src="/assets/pages/reddit/07-results-blainy__subreddit-map.png" alt="Illustration: Blainy Reddit posts across subreddits feeding one tracked link, 6,089 clicks with $0 on ads" style={{ display: "block", width: "100%", height: "auto" }} />
            </figure>
          </div>
          <div style={{ marginTop: "clamp(24px,3vw,36px)", display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }} className="grid-cols-1 sm:!grid-cols-3">
            {[
              { v: "6,089", l: "link clicks (hits) from linked Reddit posts" },
              { v: "3,715", l: "of those came through referrers" },
              { v: "165", l: "clicks on the best day, June 10, 2024" },
            ].map((s, i) => (
              <div key={s.l} className={`max-sm:!border-l-0 max-md:!text-center ${i ? "max-sm:!border-t max-sm:!border-t-[#DDDAD3]" : ""}`} style={{ padding: "22px 20px", borderLeft: i ? "1px solid #DDDAD3" : "0" }}>
                <div style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(32px,3vw,44px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>{s.v}</div>
                <div className="max-md:!mx-auto" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.4, color: "#5A5854", maxWidth: 240 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, display: "grid", gap: 16, alignItems: "start" }} className="sm:!grid-cols-2">
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/pages/reddit/07-results-blainy__link-analytics-6089-hits.jpg" alt="Link analytics: 6,089 all-time hits since March 5, 2024; best day 165 hits on June 10, 2024" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/pages/reddit/07-results-blainy__traffic-sources-3715-referrers.jpg" alt="Link analytics traffic sources: 3,715 referrer hits, 2,374 direct" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: "#6F6B64" }}>View counts from Reddit&apos;s post insights. Click data from the link tracker, March to December 2024.</p>
        </article>

        {/* Virtarix */}
        <article style={{ marginTop: 20, borderRadius: 28, background: "#FBFBF9", border: "1px solid #C9B9A2", boxShadow: "0 0 0 4px rgba(196,164,124,.12)", padding: "clamp(24px,3vw,44px)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Tech · Community · Reddit</div>
          <div style={{ marginTop: 14, display: "grid", gap: "24px clamp(32px,4vw,56px)", alignItems: "center" }} className="md:!grid-cols-2">
            <div>
              <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(32px,3.2vw,44px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05 }}>Virtarix</h3>
              <p style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.3 }}>Recommended by name in Reddit Answers for hosting questions.</p>
              <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48", maxWidth: 480 }}>Technical content, community engagement and useful replies, so Virtarix shows up when people ask Reddit which host to use.</p>
            </div>
            <div className="max-md:[&>div]:!px-2 max-md:[&>div]:!text-center" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }}>
              <div style={{ padding: "18px 12px 18px 0" }}>
                <div style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(30px,2.8vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>3</div>
                <div style={{ marginTop: 8, fontSize: 13.5, color: "#5A5854" }}>Reddit Answers queries shown below</div>
              </div>
              <div style={{ padding: "18px 0 18px 18px", borderLeft: "1px solid #DDDAD3" }}>
                <div style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(30px,2.8vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>$0</div>
                <div style={{ marginTop: 8, fontSize: 13.5, color: "#5A5854" }}>ad spend</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "clamp(24px,3vw,36px)", display: "grid", gap: 16, alignItems: "start" }} className="sm:!grid-cols-3">
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/v7/virtarix-reddit-good.jpg" alt="Reddit Answers for 'good vps' listing Virtarix" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/pages/reddit/07-results-virtarix__reddit-answers-mention.jpg" alt="Reddit Answers result mentioning Virtarix" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/pages/reddit/07-results-virtarix__reddit-answers-south-africa-vps.jpg" alt="Reddit Answers result mentioning Virtarix" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          </div>
        </article>

        {/* Post performance */}
        <article style={{ marginTop: 20, borderRadius: 28, background: "#F3F0EA", border: "1px solid #E2DBCD", padding: "clamp(24px,3vw,44px)", display: "grid", gap: "clamp(24px,3vw,36px)" }}>
          <div className="max-md:!mx-auto max-md:!text-center" style={{ maxWidth: 640 }}>
            <Eyebrow>Post performance</Eyebrow>
            <h3 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}>What a single useful post can reach.</h3>
            <p className="max-md:!mx-auto" style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48", maxWidth: 520 }}>
              These are examples, not ceilings. I&apos;ve had posts go past 100K views, while plenty of niche posts stay much smaller and still bring better users.
            </p>
            <p style={{ margin: "12px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 22, lineHeight: 1.2, color: "#6B6862" }}>The goal is the right community, not the biggest number.</p>
          </div>
          <div style={{ display: "grid", gap: 20, alignItems: "start" }} className="sm:!grid-cols-2">
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/pages/reddit/08-post-reach__reddit-post-44k-views.png" alt="Reddit post insights: 44K views" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff" }}>
              <Img loading="lazy" src="/assets/pages/reddit/08-post-reach__reddit-post-36k-views.png" alt="Reddit post insights: 36K views" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          </div>
        </article>
      </section>

      {/* DELIVERABLES */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
          <div className="max-md:!text-center">
            <Eyebrow>Deliverables</Eyebrow>
            <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Reddit marketing</h2>
            <p style={{ margin: "10px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.5vw,34px)", lineHeight: 1.12, color: "#6B6862" }}>without the spammy part.</p>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C" }}>
            {DELIVERABLES.map((d) => (
              <li key={d.n} style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: "6px 24px", alignItems: "baseline", padding: "20px 0", borderBottom: "1px solid #DDDAD3" }} className="sm:!grid-cols-[64px_minmax(0,220px)_minmax(0,1fr)]">
                <span style={{ fontSize: 13, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{d.n}</span>
                <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>{d.t}</h3>
                <p style={{ gridColumn: "1 / -1", margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }} className="sm:!col-auto">
                  {d.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(28px,3vw,40px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Five steps.</h2>
          </div>
          <p style={{ margin: 0, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(24px,2.2vw,30px)", lineHeight: 1.15, color: "#6B6862", maxWidth: 440 }} className="max-md:!mx-auto">
            No &ldquo;blast it everywhere&rdquo; strategy.
          </p>
        </div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-5">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.n} className="max-sm:!border-l-0 max-sm:!pr-0" style={{ padding: `24px ${i ? 24 : 0}px 28px 0`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{s.n}</span>
              <h3 style={{ margin: "14px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "#4E4C48", maxWidth: 260 }}>{s.d}</p>
            </li>
          ))}
        </ol>
        <figure style={{ margin: "clamp(28px,3vw,40px) 0 0" }}>
          <Img loading="lazy" src="/assets/pages/reddit/09-process__five-steps.png" alt="Five steps: listen, research, participate, publish, measure" style={{ display: "block", width: "100%", height: "auto" }} />
        </figure>
      </section>

      {/* ONE GOOD POST */}
      <section className="max-md:!pt-12" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ borderRadius: 28, background: "#FBFBF9", border: "1px solid #DAD8D1", padding: "clamp(28px,4vw,56px)", display: "grid", gap: "32px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div className="max-md:!text-center">
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#7D6039" }}>From experience</div>
            <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.4vw,48px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              What can one good
              <br />
              <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Reddit post</em> do?
            </h2>
            <p style={{ margin: "18px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.4vw,34px)", lineHeight: 1.12, color: "#6B6862" }}>Pick the room, not the crowd size.</p>
          </div>
          <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 12, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>
            <p style={{ margin: 0 }}>In my experience, a post reaching 100K views in a focused subreddit can bring around 100 to 200 users a day while it&apos;s active.</p>
            <p style={{ margin: 0 }}>Reddit threads keep getting found, so one useful thread can keep sending users afterwards.</p>
            <p style={{ margin: 0, color: "#1C1C1C", fontWeight: 500 }}>A smaller post in the right community can outperform a bigger post in the wrong one.</p>
            <p style={{ margin: "6px 0 0", paddingTop: 14, borderTop: "1px solid #DDDAD3", fontSize: 13.5, color: "#6E6B66" }}>What I&apos;ve seen, not a guarantee. Results depend on niche, community, content and product.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(32px,3vw,44px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Reddit marketing,</h2>
            <p style={{ margin: "10px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.5vw,34px)", lineHeight: 1.12, color: "#6B6862" }}>without getting banned.</p>
          </div>
          <p className="max-md:!mx-auto" style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "#5A5854", maxWidth: 420 }}>Organic only. No ad spend needed. Billed weekly or every two weeks.</p>
        </div>
        <div style={{ borderRadius: 28, background: "#171717", color: "#F2EFEA", padding: "clamp(32px,4vw,56px)", display: "grid", gap: "40px clamp(32px,5vw,72px)" }} className="md:!grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] max-md:!px-6">
          <div>
            <p className="max-md:!mx-auto max-md:!text-center" style={{ margin: 0, maxWidth: 520, fontSize: 17, lineHeight: 1.55, color: "#E6E1D8" }}>Subreddit research, account building, posts, helpful comments, community monitoring and monthly reporting.</p>
            <div style={{ marginTop: 28, display: "grid", gap: "28px 32px" }} className="sm:!grid-cols-2">
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D3AE82" }}>Research &amp; strategy</div>
                <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", borderTop: "1px solid #33322F" }}>
                  {PLAN_RESEARCH.map((it) => (
                    <li key={it} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid #33322F", fontSize: 15.5, color: "#E6E1D8" }}>
                      <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#C4A47C" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D3AE82" }}>Execution &amp; monitoring</div>
                <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", borderTop: "1px solid #33322F" }}>
                  {PLAN_EXECUTION.map((it) => (
                    <li key={it} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid #33322F", fontSize: 15.5, color: "#E6E1D8" }}>
                      <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#C4A47C" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="md:!pl-12 md:!border-l md:!border-[#33322F] max-md:!text-center">
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>Reddit marketing</div>
              <div className="max-md:!justify-center" style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(52px,5.4vw,72px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>$1,199</span>
                <span style={{ fontSize: 15, color: "#9C978D" }}>per month</span>
              </div>
            </div>
            <a href="#contact" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center max-md:!mx-auto max-md:!whitespace-normal max-md:!text-center max-md:!px-4 max-lg:!whitespace-normal max-lg:!text-center" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 52, padding: "0 24px", whiteSpace: "nowrap", borderRadius: 12, background: "#F2EFEA", color: "#171717", fontSize: 15.5, fontWeight: 600 }}>
              Show me my Reddit opportunity
              <ArrowIcon />
            </a>
            <div style={{ paddingTop: 18, borderTop: "1px solid #33322F" }}>
              <p className="max-md:!text-base" style={{ margin: 0, fontSize: 14.5, color: "#E6E1D8" }}>Want Reddit, SEO and social together?</p>
              <p className="max-md:!text-base" style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "#9C978D" }}>
                <Link href="/pricing" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ color: "#D3AE82", borderBottom: "1px solid #6B5A40" }}>
                  Everything, handled
                </Link>{" "}
                is $3,999/month. Separately, <span style={{ textDecoration: "line-through" }}>$4,397/month</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(96px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
          <div className="max-md:!text-center">
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Who it&apos;s for</div>
            <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.2vw,46px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Reddit works
              <br />
              best when&hellip;
            </h2>
          </div>
          <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="sm:!grid-cols-2">
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#7D6039" }}>Good fit</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
                {FIT_GOOD.map((t) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45 }}>
                    <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#7D6039" }}>✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#6F6B64" }}>Not the right fit</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
                {FIT_BAD.map((t) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#5A5854" }}>
                    <span aria-hidden="true" style={{ fontSize: 14 }}><span style={{ display: "inline-block", width: "0.91em", height: 2, verticalAlign: "0.214em", background: "#706B61" }} /></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(80px,9vw,128px) ${PAD} 0`, display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]">
        <div className="max-md:!text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            Reddit questions,
            <br />
            <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em" }}>answered straight.</em>
          </h2>
          <div className="max-md:!mx-auto" style={{ marginTop: "clamp(24px,3vw,36px)", width: "100%", maxWidth: 420 }}>
            <Img loading="lazy" src="/assets/pages/reddit/12-faq__reddit-questions.png" alt="Reddit questions flowing through search into clear answers" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
        <FAQAccordion faqs={FAQS} />
      </section>

      {/* CTA */}
      <section id="contact" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(80px,9vw,128px) ${PAD} clamp(24px,3vw,40px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div className="max-md:!text-center">
            <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>Your buyers are probably already talking.</h2>
            <p style={{ margin: "14px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.6vw,36px)", lineHeight: 1.1, color: "#D3AE82" }}>
              <Emphasis>Let&apos;s find the right thread.</Emphasis>
            </p>
            <p className="max-md:!mx-auto" style={{ margin: "22px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
              Send me your product and who you sell to. I&apos;ll look at where the conversations are happening and tell you honestly whether Reddit is worth it for you.
            </p>
          </div>
          <div className="max-md:!mx-auto max-md:!w-full max-md:!max-w-[400px]" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600 }}>
              Show me my Reddit opportunity
              <ArrowIcon size={16} />
            </a>
            <div className="max-md:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Link href="/#contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
                Tell me what&apos;s stuck
              </Link>
              <a href="mailto:hello@zainameen.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
                Email me
              </a>
            </div>
            <span className="max-md:!text-center" style={{ paddingTop: 8, fontSize: 13.5, color: "#8B877F" }}>I usually reply within a couple of hours.</span>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,6vw,80px) ${PAD} clamp(64px,7vw,96px)` }}>
        <h2 className="max-md:!text-center" style={{ margin: "0 0 20px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Reddit rarely works alone</h2>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-3">
          {RELATED.map((r, i) => (
            <a key={r.t} href={r.href} className="max-sm:!border-l-0 max-sm:!px-0" style={{ display: "flex", flexDirection: "column", gap: 8, padding: `22px ${i ? 24 : 0}px 22px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontFamily: "var(--nf-general-sans)", fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em" }}>
                {r.t}
                <ArrowIcon />
              </span>
              <span className="max-md:!text-base" style={{ fontSize: 15, lineHeight: 1.5, color: "#5A5854" }}>{r.d}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
