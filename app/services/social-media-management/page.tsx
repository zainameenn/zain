import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowIcon, Emphasis } from "../../HomeComponents/icons";
import { FAQAccordion } from "../../HomeComponents/FAQAccordion";

export const metadata = buildMetadata({
  title: "Hire a Social Media Manager for Your Business | Zain",
  description:
    "Looking for a social media manager? Strategy, 5 posts a week, graphics and community work on Facebook, Instagram and LinkedIn from $1,199/mo. Free check.",
  path: "/services/social-media-management",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 34, padding: "0 14px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <div className="max-md:!text-center" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "#9C978D" : "#8B877F" }}>{children}</div>;
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: React.ReactNode; sub: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ display: "grid", gap: "20px 64px", alignItems: "end", marginBottom: 40 }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
      <div>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className="max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: dark ? "#F2EFEA" : "#1C1C1C" }}>{title}</h2>
      </div>
      <div className="max-md:!mx-auto" style={{ paddingBottom: 4, maxWidth: 460 }}>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: dark ? "#B7B2A8" : "#5A5854" }}>{sub}</p>
      </div>
    </div>
  );
}

const PROOF = [
  { v: "3.95M", l: "Instagram", sub: "views in 90 days · Blainy" },
  { v: "160K+", l: "Facebook", sub: "page views in 28 days · Everdry" },
  { v: "338K", l: "Threads", sub: "views in 3 months · Blainy" },
  { v: "479K", l: "Pinterest", sub: "impressions in 90 days · Blainy" },
];

const PROBLEMS = [
  "Posting with no strategy behind it",
  "Generic tips everyone else already posted",
  "The same content copied across every platform",
  "No one engaging in the groups where buyers actually are",
  "No link between posts and the business",
  "Never checking what worked, so nothing improves",
];

const PARTS = [
  { n: "01", t: "Strategy", d: "Who you're talking to, which platforms matter, and what each post is supposed to do.", tags: ["Audience research", "Platform priorities", "Content pillars", "Monthly plans"], alt: "Illustration: audience, pillars and platforms connected into one content plan", img: "04-part-1__strategy.png", span: 2 },
  { n: "02", t: "Content", d: "Posts written for real people, not the algorithm. Each one teaches, shows, proves or starts a conversation.", tags: ["Copywriting", "Post ideas", "Platform native formats", "Captions and hooks"], alt: "Illustration: ideas moving through content pillars and drafts into a weekly content board", img: "04-part-2__content.png", span: 2 },
  { n: "03", t: "Creative", d: "Graphics people stop scrolling for, designed by the same person who writes the posts.", tags: ["Graphics", "Carousels", "Brand visuals"], alt: "Illustration: ideas edited into reels and carousels", img: "04-part-3__creative.png", span: 2 },
  { n: "04", t: "Distribution and community", d: "Posting is half the job. The other half is showing up in groups and communities where your buyers ask for recommendations.", tags: ["Group engagement", "Community monitoring", "Conversations", "Publishing"], alt: "Illustration: one post distributed across platforms and communities", img: "04-part-4__distribution-community.png", span: 3 },
  { n: "05", t: "Measurement and iteration", d: "What got seen, what got clicked, what brought leads. Then more of what worked.", tags: ["Reach and engagement", "Website visits", "Leads", "Monthly reporting"], alt: "Illustration: a social performance dashboard", img: "04-part-5__measurement.png", span: 3 },
];

const JOURNEY = [
  { n: "01", t: "Idea", d: "Something your buyers actually care about", gold: false },
  { n: "02", t: "Creative", d: "Words and visuals that stop the scroll", gold: false },
  { n: "03", t: "Post", d: "Published where your audience already is", gold: false },
  { n: "04", t: "Community", d: "Shared in the groups and conversations that matter", gold: false },
  { n: "05", t: "Engagement", d: "Comments, questions and shares", gold: false },
  { n: "06", t: "Visit", d: "Someone clicks through to learn more", gold: true },
  { n: "07", t: "Lead", d: "Someone reaches out", gold: true },
];

const PILLARS = [
  { t: "Teach", d: "Answer the questions your buyers keep asking." },
  { t: "Show", d: "Behind the scenes, the process, the people. Proof that real humans run this." },
  { t: "Prove", d: "Results, reviews, before and afters. Let the work do the talking." },
  { t: "Join", d: "Take part in the conversations already happening in your industry." },
  { t: "Sell", d: "Yes, sometimes you just say what you offer. Just not every day." },
];

const REPURPOSE = [
  { t: "Facebook post", d: "The story, written for groups and shares" },
  { t: "Instagram carousel", d: "The same idea, broken into swipeable steps" },
  { t: "LinkedIn post", d: "The lesson, framed for decision makers" },
  { t: "Graphic", d: "One visual that sums it up" },
  { t: "Article or Reddit post", d: "The deep version, for people who want more" },
];

const GET = [
  { t: "Strategy", d: "Audience, platforms, content pillars and a monthly plan." },
  { t: "Content", d: "Five posts a week, written for each platform." },
  { t: "Creative", d: "Graphics and carousels designed in house. Well, in me." },
  { t: "Publishing", d: "Scheduled and posted on Facebook, Instagram and LinkedIn." },
  { t: "Community", d: "Monitoring and engaging in the groups and communities where your buyers hang out." },
  { t: "Reporting", d: "Monthly report on reach, engagement, visits and leads, plus what changes next." },
];

const PROCESS_STEPS = [
  { t: "Audit", d: "See what's working, what isn't and where your buyers actually are.", gold: false },
  { t: "Plan", d: "Pick the platforms, pillars and posting rhythm.", gold: false },
  { t: "Create", d: "Write and design the content.", gold: false },
  { t: "Distribute", d: "Post it, share it in the right communities and join the conversations.", gold: false },
  { t: "Learn", d: "Check what brought visits and leads, then adjust.", gold: true },
];

const BUSY = ["Posts every day, same format every time", "Likes from friends and employees", "Same post copied to every platform", "No one knows if it brings customers"];
const GOOD = ["Fewer posts, each with a clear job", "Comments and questions from real buyers", "Content rewritten for each platform", "Visits and leads tracked every month"];

const PRICING_ROWS = [
  { n: "01", t: "Social media check", d: "I'll look at why your posts aren't getting seen. ", em: "Coffee's on me.", price: "Free", per: null as string | null },
  { n: "02", t: "Social media management", d: "Facebook, Instagram and LinkedIn. Strategy, five posts a week, graphics, publishing, community monitoring and monthly reporting.", em: null as string | null, price: "$1,199", per: "per month" },
  { n: "03", t: "Expanded", d: "Adding video or more platforms like X, Threads or Pinterest. The price depends on how many platforms I'm handling. Bigger scopes get a custom quote.", em: null as string | null, price: "Up to $1,499", per: "per month" },
];

const FIT_GOOD = ["You have a real product or service people need", "Your buyers use Facebook, Instagram or LinkedIn", "You want posts that bring visits and leads, not just likes", "You'd rather run your business than write captions"];
const FIT_BAD = ["You want to go viral by Friday", "You want 3 posts a day just to look active", "You'd rather buy followers than earn them"];

const FAQS: [string, string[]][] = [
  ["How much should I pay someone to manage my social media?", [
    "Most businesses pay between $500 and $5,000 a month, with most landing between $1,000 and $3,000. My plan is $1,199 a month for Facebook, Instagram and LinkedIn: strategy, five posts a week, graphics and community monitoring. Adding video or more platforms takes it up to $1,499.",
    "You can find someone for $800. Just check what you're getting. If your buyers are in the US, a lot of the action happens in Facebook groups, where people ask for recommendations every day. Someone needs to show up there, not just schedule posts.",
  ]],
  ["Is it worth hiring a social media manager?", [
    "Fair question, even in 2026. If you know social media and have the time, do it yourself. But if you're a founder writing code, or running a service business with no spare hours, your time is worth more than what a good manager costs.",
    "That's not a sales line. I've worked inside a service business, and the owner's time was always the most expensive thing in the building.",
  ]],
  ["Can I pay someone to manage my social media?", [
    "Yes. That's exactly what a social media manager does: plan content, create it, post it, engage and track what works. Before hiring anyone, agree on which platforms, how many posts, and whether community engagement is included.",
  ]],
  ["How much does a social media manager charge per hour?", [
    "Entry level freelancers charge around $15 to $40 an hour, while expert strategists charge much more. I work on monthly plans instead of hourly, so you know the full cost upfront.",
  ]],
  ["Which platforms do you manage?", [
    "Facebook, Instagram and LinkedIn are included in the base plan. X, Threads and Pinterest can be added in the expanded plan.",
  ]],
  ["Do you create the graphics too?", [
    "Yes. Graphics and carousels are included. You don't need a separate designer.",
  ]],
  ["What is the 5 3 2 rule for social media?", [
    "For every 10 posts: 5 share useful content from others (with credit), 3 are your own original content, and 2 are personal posts that show the humans behind the brand. Nobody follows the guy at the party who only talks about his product.",
  ]],
];

const RELATED = [
  { t: "Reddit Marketing", d: "Where buyers ask for recommendations.", href: "/services/reddit-marketing" },
  { t: "SEO & Organic Growth", d: "Get found by people already searching.", href: "/services/seo" },
];

export default function SocialMediaManagementPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(40px,5vw,64px) ${PAD} 48px`, display: "grid", gap: "40px 56px", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
        <div style={{ minWidth: 0 }} className="max-md:!text-center">
          <h1 className="max-md:!block max-md:!text-balance" style={{ margin: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#5A5854" }}>
            <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
            Social media manager for SaaS and service businesses
          </h1>
          <p className="max-md:!mx-auto max-md:!text-[clamp(40px,12.5vw,52px)]" style={{ margin: "20px 0 0", maxWidth: 600, fontFamily: "'General Sans'", fontWeight: 500, fontSize: "clamp(52px,5vw,74px)", lineHeight: 1.01, letterSpacing: "-0.035em" }}>
            Stop filling a
            <br />
            content calendar.
            <span style={{ display: "block", marginTop: ".06em", fontSize: "1.08em" }}>
              <Emphasis>Start getting seen.</Emphasis>
            </span>
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "28px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#4E4C48" }}>
            I plan, write, design and post your content on Facebook, Instagram and LinkedIn, then show up in the groups and communities where your buyers actually ask questions.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#1C1C1C", fontWeight: 500 }}>You get attention that turns into visits, not just likes.</p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }} className="max-md:!mx-auto max-md:!max-w-[400px] max-md:!flex-col">
            <a href="#contact" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
              Get a free social check
              <ArrowIcon />
            </a>
            <a href="#results" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 22px", borderRadius: 12, border: "1px solid #CFCBC2", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
              See social results
            </a>
          </div>
          <p className="max-md:!block" style={{ margin: "16px 0 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#77746E" }}>
            <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
            Free, no strings. <Emphasis style={{ fontSize: 16 }}>Coffee&apos;s on me.</Emphasis>
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <img loading="lazy" src="/assets/pages/social/01-hero__calendar-to-posts.png" alt="Illustration: a content calendar turning into posts published across Instagram, TikTok, LinkedIn, YouTube, X, Pinterest and Threads, feeding a growth dashboard" style={{ display: "block", width: "100%", height: "auto" }} />
        </figure>
      </section>

      {/* PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD}` }}>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }} className="!grid-cols-2 sm:!grid-cols-4">
          {PROOF.map((s, i) => (
            <div key={s.l} className={`max-md:!text-center max-sm:!px-2 ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? "max-sm:!border-t max-sm:!border-t-[#DDDAD3]" : ""}`} style={{ padding: `28px 24px 28px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0" }}>
              <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(40px,3.8vw,56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
              <div style={{ marginTop: 14, fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>{s.l}</div>
              <div style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.4, color: "#77746E" }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <p className="max-md:!text-center" style={{ margin: "12px 0 0", fontSize: 13, color: "#8B877F", textAlign: "right" }}>Each number is one platform, one client. Screenshots below.</p>
      </section>

      {/* PROBLEM */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "40px 64px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "#1C1C1C" }}>
              More posts aren&apos;t
              <br />
              always the answer.
            </h2>
            <p className="max-md:!text-center" style={{ margin: "6px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.6vw,36px)", lineHeight: 1.05, color: "#6B6862" }}>
              Sometimes they&apos;re just more posts.
            </p>
            <p style={{ margin: "24px 0 0", maxWidth: 440, fontSize: 18, lineHeight: 1.5, color: "#1C1C1C", fontWeight: 500 }}>Most business accounts look busy and go nowhere.</p>
            <p style={{ margin: "10px 0 0", maxWidth: 440, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>Something goes out every day, a few people like it, and nobody visits the website. The problem is usually one of these:</p>
          </div>
          <div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C" }}>
              {PROBLEMS.map((p, i) => (
                <li key={p} style={{ display: "grid", gridTemplateColumns: "48px minmax(0,1fr)", alignItems: "baseline", padding: "18px 0", borderBottom: "1px solid #DDDAD3" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 17.5, lineHeight: 1.4 }}>{p}</span>
                </li>
              ))}
            </ol>
            <p style={{ margin: "24px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
              Fewer, better posts. <Emphasis style={{ fontSize: "1.12em", color: "#9A7646" }}>More of the right conversations.</Emphasis>
            </p>
          </div>
        </div>
      </section>

      {/* FIVE PARTS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="What social media involves" title={<>Social media has<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1 }}>five parts.</em></>} sub="Most accounts only do one of them: posting." />
        <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-6">
          {PARTS.map((p) => (
            <div key={p.n} style={{ minWidth: 0, borderRadius: 22, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: 28, display: "grid", gridTemplateRows: "auto auto auto 1fr" }} className={p.span === 2 ? "lg:!col-span-2" : "lg:!col-span-3"}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{p.n}</span>
              <div>
                <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,1.9vw,26px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{p.t}</h3>
                <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "#4E4C48", maxWidth: 460, minHeight: "4.65em" }}>{p.d}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                {p.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
              <div style={{ marginTop: 24, height: "clamp(180px,15vw,220px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img loading="lazy" src={`/assets/pages/social/${p.img}`} alt={p.alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY (dark) */}
      <section className="max-md:!mt-20" style={{ marginTop: "clamp(88px,8vw,112px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,6vw,88px) ${PAD} clamp(56px,5vw,72px)` }}>
          <SectionHead
            dark
            eyebrow="How attention is built"
            title={<>From an idea<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1, color: "#D3AE82" }}>to actual attention.</em></>}
            sub="Good social isn't about posting more. It's about making each post do a job, then putting it where the right people see it."
          />
          <img loading="lazy" src="/assets/pages/social/05-idea-to-attention__dark-journey.png" alt="Illustration: idea, plan, create, distribute, engage and attention as one connected path" style={{ display: "block", width: "100%", height: "auto" }} />
          <ol style={{ margin: "32px 0 0", padding: "24px 0 0", listStyle: "none", display: "grid", gap: "28px 20px", borderTop: "1px solid #33322F" }} className="grid-cols-2 sm:!grid-cols-4 lg:!grid-cols-7">
            {JOURNEY.map((j) => (
              <li key={j.n} style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: j.gold ? "#D3AE82" : "#F2EFEA", flex: "0 0 auto" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#8B877F", fontVariantNumeric: "tabular-nums" }}>{j.n}</span>
                </div>
                <h3 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontSize: 19, fontWeight: 600, letterSpacing: "-0.015em", color: j.gold ? "#D3AE82" : "#F2EFEA" }}>{j.t}</h3>
                <p className="max-md:!text-base" style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "#9C978D" }}>{j.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTENT PILLARS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="Content pillars" title={<>Five kinds of posts.<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1 }}>All of them useful.</em></>} sub="A good feed isn't random. Every post falls into one of these." />
        <img loading="lazy" src="/assets/pages/social/06-content-pillars__teach-show-prove-join-sell.png" alt="Illustration: five post types, Teach, Show, Prove, Join and Sell, on one timeline" style={{ display: "block", width: "100%", height: "auto" }} />
        <div style={{ marginTop: 24, display: "grid", gap: "24px 20px" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-5">
          {PILLARS.map((p) => (
            <div key={p.t} style={{ minWidth: 0, minHeight: 96, paddingTop: 16, borderTop: "1px solid #DDDAD3" }}>
              <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>{p.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.5, color: "#4E4C48" }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="max-md:!pt-20 max-md:[&_.grid-cols-2>div]:!text-center max-md:[&_.grid-cols-1>div]:!text-center max-sm:[&_.grid-cols-2>div]:!px-2 max-sm:[&_.grid-cols-2>div:nth-child(odd)]:!border-l-0 max-sm:[&_.grid-cols-2>div:nth-child(n+3)]:![border-top:1px_solid_rgba(128,128,128,.3)] max-sm:[&_.grid-cols-1>div]:!border-l-0 max-sm:[&_.grid-cols-1>div]:!px-0 max-sm:[&_.grid-cols-1>div+div]:![border-top:1px_solid_rgba(128,128,128,.3)] max-md:[&_p[style*='font-size:14.5px']]:!text-base" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="Social media results" title={<>Social results,<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1 }}>not just likes.</em></>} sub="Different platforms. Different jobs. Results shown separately." />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* 01 Everdry */}
          <article style={{ borderRadius: 28, background: "#F4EFE8", color: "#1C1C1C", border: "1px solid #E2D8CA", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#6A5C4B" }}>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>01</span>
                  <span style={{ width: 24, height: 1, background: "#DDD5C8" }} />
                  <span>Home services · Facebook · Local</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <img loading="lazy" src="/assets/v8/logo-everdry.gif" alt="Everdry Waterproofing logo" style={{ display: "block", height: 52, width: "auto", mixBlendMode: "multiply" }} />
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Everdry Waterproofing: </span>
                  160K+ Facebook views
                  <br />
                  in 28 days.
                  <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em", lineHeight: 1 }}>No &quot;post and hope.&quot;</em>
                </h3>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48", maxWidth: 480 }}>
                  Their page wasn&apos;t reaching anyone. I rebuilt the content around visuals homeowners stop for, shared it into local groups, and turned the Google Business Profile into a lead source.
                </p>
              </div>
            </div>
            <div style={{ margin: "32px 0 36px", display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDD5C8" }} className="grid-cols-2 sm:!grid-cols-4">
              {[
                { v: "160,235", l: "Facebook views, last 28 days" },
                { v: "40,153", l: "accounts reached" },
                { v: "12,462", l: "Business Profile views" },
                { v: "603", l: "calls from the profile" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid #DDD5C8" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#5A5854" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>FACEBOOK</span>
                    <span style={{ fontSize: 12.5, color: "#8B877F" }}>Page overview · last 28 days</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>160,235</b> <span style={{ fontSize: 13, color: "#5A5854" }}>views</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>40,153</b> <span style={{ fontSize: 13, color: "#5A5854" }}>reach</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#4E4C48", maxWidth: 640 }}>Before-and-after visuals and seasonal problem posts, shared into local community groups.</p>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                  <img loading="lazy" src="/assets/pages/social/07-results-everdry__facebook-160k-views.png" alt="Everdry Facebook dashboard, last 28 days: 160,235 views, 40,153 reach" style={{ display: "block", width: "100%", height: "auto" }} />
                </div>
              </div>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>GOOGLE BUSINESS PROFILE</span>
                    <span style={{ fontSize: 12.5, color: "#8B877F" }}>Local search</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>12,462</b> <span style={{ fontSize: 13, color: "#5A5854" }}>profile views</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>603</b> <span style={{ fontSize: 13, color: "#5A5854" }}>calls</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#4E4C48", maxWidth: 640 }}>Photos, services and regular updates so local searches turned into calls.</p>
                <div style={{ display: "grid", gap: 14, alignItems: "start" }} className="sm:!grid-cols-2">
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/v7/everdry-gbp.png" alt="Everdry Google Business Profile: 12,462 profile views" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-everdry__603-calls.png" alt="Everdry: 603 calls from the Business Profile" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* 02 Virtarix */}
          <article style={{ borderRadius: 28, background: "#15171F", color: "#F2EFEA", border: "1px solid #15171F", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>02</span>
                  <span style={{ width: 24, height: 1, background: "rgba(255,255,255,.14)" }} />
                  <span>AI and tech · Facebook · Pinterest</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "10px 14px", borderRadius: 12, background: "#F2EFEA", display: "inline-flex", alignItems: "center" }}>
                    <img loading="lazy" src="/assets/v8/logos/virtarix.png" alt="Virtarix logo" style={{ display: "block", height: 30, width: "auto" }} />
                  </span>
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Virtarix: </span>
                  A new Facebook page to
                  <br />
                  <strong style={{ fontWeight: 700 }}>70K+ views</strong> in 3 months.
                </h3>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#C9C4BA", maxWidth: 480 }}>
                  A brand new page with no audience and technical topics most people scroll past. I turned the knowledge into simple visual posts on a steady weekly rhythm, then gave each guide a second life on Pinterest.
                </p>
              </div>
            </div>
            <div style={{ margin: "32px 0 36px", display: "grid", borderTop: "1px solid rgba(255,255,255,.28)", borderBottom: "1px solid rgba(255,255,255,.14)" }} className="grid-cols-1 sm:!grid-cols-3">
              {[
                { v: "71,459", l: "Facebook views, Oct – Jan" },
                { v: "34K", l: "views in December alone" },
                { v: "1.2K+", l: "Pinterest visits in 7 days" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid rgba(255,255,255,.14)" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(34px,3.2vw,46px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#B7B2A8" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>FACEBOOK</span>
                    <span style={{ fontSize: 12.5, color: "#9C978D" }}>4 Oct – 23 Jan</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>71,459</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>views</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>3,395</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>interactions</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>Views flat until October, then climbing as the posting rhythm and formats settled.</p>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                  <img loading="lazy" src="/assets/v8/vx-70k.png" alt="Virtarix Facebook insights, 4 Oct to 23 Jan: 71,459 views, 3,395 interactions" style={{ display: "block", width: "100%", height: "auto" }} />
                </div>
              </div>
              <div style={{ display: "grid", gap: "40px 32px" }} className="md:!grid-cols-2">
                <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>FACEBOOK · ONE MONTH</span>
                      <span style={{ fontSize: 12.5, color: "#9C978D" }}>1 Dec – 8 Jan</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                      <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>34K</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>views</span></span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>December alone brought nearly half the total.</p>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#FFFFFF", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/v12/vx-month.png" alt="Virtarix Meta insights, December: 34.0K views" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>BEFORE</span>
                      <span style={{ fontSize: 12.5, color: "#9C978D" }}>Last 60 days view</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                      <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>0</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>views until October</span></span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>The same dashboard before the new content started.</p>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/v12/vx-before.png" alt="Virtarix Facebook dashboard: views flat through September, rising from October" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* 03 Blainy */}
          <article style={{ borderRadius: 28, background: "#111616", color: "#F2EFEA", border: "1px solid #111616", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>03</span>
                  <span style={{ width: 24, height: 1, background: "rgba(255,255,255,.14)" }} />
                  <span>AI SaaS · Social · Multi-platform growth</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "10px 14px", borderRadius: 12, background: "#F2EFEA", display: "inline-flex", alignItems: "center" }}>
                    <img loading="lazy" src="/assets/site/logo-blainy.png" alt="Blainy logo" style={{ display: "block", height: 40, width: "auto" }} />
                  </span>
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Blainy: </span>
                  <strong style={{ fontWeight: 700 }}>3.95M Instagram views</strong>
                  <br />
                  in 90 days. Four platforms growing at once.
                </h3>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#C9C4BA", maxWidth: 480 }}>
                  Student-focused reels, pins, Threads posts and Shorts built around what students already joke and worry about, with the product in the background.
                </p>
              </div>
            </div>
            <div style={{ margin: "32px 0 36px", display: "grid", borderTop: "1px solid rgba(255,255,255,.28)", borderBottom: "1px solid rgba(255,255,255,.14)" }} className="grid-cols-2 sm:!grid-cols-4">
              {[
                { v: "3.95M", l: "Instagram views, 90 days" },
                { v: "479K", l: "Pinterest impressions, 90 days" },
                { v: "338K", l: "Threads views, 3 months" },
                { v: "78K", l: "YouTube views, 28 days" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid rgba(255,255,255,.14)" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,36px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#B7B2A8" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>01 · INSTAGRAM</span>
                    <span style={{ fontSize: 12.5, color: "#9C978D" }}>Last 90 days</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>3,952,443</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>views</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>2.14M</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>reached</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>612K</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>interactions</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>Relatable student reels. 98% of views came from non-followers, so the content did the finding.</p>
                <div style={{ display: "grid", gap: 14, alignItems: "start" }} className="sm:!grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-blainy__instagram-90-days.png" alt="Blainy Instagram, last 90 days: 3,952,443 views, 2,139,992 accounts reached" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-blainy__instagram-top-reels.png" alt="Blainy Instagram top reels: 53.9K, 24.9K, 21.8K views" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>02 · PINTEREST</span>
                    <span style={{ fontSize: 12.5, color: "#9C978D" }}>Last 90 days</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>479K</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>impressions</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>+410%</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>vs previous 90 days</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>Video pins and study-tip pins. 600K+ impressions overall.</p>
                <div style={{ display: "grid", gap: 14, alignItems: "start" }} className="sm:!grid-cols-2">
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-blainy__pinterest-90-days.png" alt="Blainy Pinterest, last 90 days: 479k impressions, up 410%" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-blainy__pinterest-top-video-pin.png" alt="Blainy top Pinterest video pin: 225.75k impressions, 8.41k pin clicks" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gap: "40px 32px" }} className="md:!grid-cols-2">
                <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>03 · THREADS</span>
                      <span style={{ fontSize: 12.5, color: "#9C978D" }}>Feb 21 – May 21</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                      <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>338K</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>views</span></span>
                      <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>11.9K</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>interactions</span></span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>Short, dry student humour posted daily.</p>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-blainy__threads-338k-views.png" alt="Blainy Threads insights: 338K views, 11.9K interactions" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>04 · YOUTUBE SHORTS</span>
                      <span style={{ fontSize: 12.5, color: "#9C978D" }}>Last 28 days</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                      <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>78,267</b> <span style={{ fontSize: 13, color: "#B7B2A8" }}>views</span></span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#C9C4BA", maxWidth: 640 }}>The best reels re-cut as Shorts, so each idea earned views twice.</p>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-blainy__youtube-analytics.png" alt="Blainy YouTube channel analytics: 78,267 views in the last 28 days" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* 04 LoomPad */}
          <article style={{ borderRadius: 28, background: "#F3ECE3", color: "#1C1C1C", border: "1px solid #E3D8C8", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#6A5C4B" }}>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>04</span>
                  <span style={{ width: 24, height: 1, background: "#DDD5C8" }} />
                  <span>Ecommerce · Facebook · Pinterest</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <img loading="lazy" src="/assets/v8/logos/loompad.png" alt="LoomPad" style={{ display: "block", height: 44, width: "auto", mixBlendMode: "multiply" }} />
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>LoomPad: </span>
                  <strong style={{ fontWeight: 700 }}>32,759 Facebook views</strong>
                  <br />
                  in a single week.
                </h3>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48", maxWidth: 480 }}>
                  Desk mat visuals and product posts built to be shared, plus pins that put the products in front of people searching for desk setup ideas.
                </p>
              </div>
            </div>
            <div style={{ margin: "32px 0 36px", display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDD5C8" }} className="grid-cols-1 sm:!grid-cols-3">
              {[
                { v: "32,759", l: "Facebook views in one week" },
                { v: "132", l: "shares" },
                { v: "7.88K", l: "Pinterest impressions" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid #DDD5C8" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(34px,3.2vw,46px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#5A5854" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>FACEBOOK</span>
                    <span style={{ fontSize: 12.5, color: "#8B877F" }}>7 – 14 Sep</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>32,759</b> <span style={{ fontSize: 13, color: "#5A5854" }}>views</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>653</b> <span style={{ fontSize: 13, color: "#5A5854" }}>engagements</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#4E4C48", maxWidth: 640 }}>Product and setup photos made to be shared. 96% of engagement came from non-followers.</p>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                  <img loading="lazy" src="/assets/pages/social/07-results-loompad__facebook-views-chart.png" alt="LoomPad Facebook views chart, 7 to 14 Sep" style={{ display: "block", width: "100%", height: "auto" }} />
                </div>
              </div>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>FACEBOOK · DETAIL</span>
                    <span style={{ fontSize: 12.5, color: "#8B877F" }}>Same week</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>448</b> <span style={{ fontSize: 13, color: "#5A5854" }}>reactions</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>132</b> <span style={{ fontSize: 13, color: "#5A5854" }}>shares</span></span>
                  </div>
                </div>
                <div style={{ display: "grid", gap: 14, alignItems: "start" }} className="sm:!grid-cols-2">
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-loompad__facebook-insights-32k.png" alt="LoomPad Facebook insights: 32,759 views, 653 engagement" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-loompad__engagement-overview.png" alt="LoomPad engagement overview: 448 reactions, 132 shares" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px", paddingTop: 16, borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>PINTEREST</span>
                    <span style={{ fontSize: 12.5, color: "#8B877F" }}>25 Jul – 14 Sep</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>7.88K</b> <span style={{ fontSize: 13, color: "#5A5854" }}>impressions</span></span>
                    <span style={{ whiteSpace: "nowrap" }}><b style={{ fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>5.37K</b> <span style={{ fontSize: 13, color: "#5A5854" }}>audience</span></span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#4E4C48", maxWidth: 640 }}>Product and setup pins; the logo and setup pins led impressions.</p>
                <div style={{ display: "grid", gap: 14, alignItems: "start" }} className="sm:!grid-cols-2">
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-loompad__pinterest-analytics.png" alt="LoomPad Pinterest analytics: 7.88k impressions, 5.37k total audience" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#1F2022", border: "1px solid rgba(128,128,128,.22)", boxShadow: "0 18px 40px -30px rgba(0,0,0,.45)" }}>
                    <img loading="lazy" src="/assets/pages/social/07-results-loompad__pinterest-top-pins.png" alt="LoomPad top pins by impressions" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <p style={{ margin: "14px 0 0", fontSize: 13, color: "#8B877F" }}>Screenshots from Meta Business Suite, Instagram, Threads, Pinterest, YouTube Studio and Google Business Profile.</p>
      </section>

      {/* ONE IDEA / REPURPOSING */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "40px 64px", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <div>
            <Eyebrow>Repurposing</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "#1C1C1C" }}>
              One idea.
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1 }}>Five places to use it.</em>
            </h2>
            <p style={{ margin: "24px 0 0", maxWidth: 440, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>
              A single good idea shouldn&apos;t live and die in one post. I turn it into formats that fit each platform, so you get more reach from the same thinking.
            </p>
            <ol style={{ margin: "28px 0 0", padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C", maxWidth: 460 }}>
              {REPURPOSE.map((r, i) => (
                <li key={r.t} style={{ display: "grid", gridTemplateColumns: "36px minmax(0,1fr)", alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid #DDDAD3" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#9A7646" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <h3 style={{ display: "inline", margin: 0, fontSize: 15.5, fontWeight: 600 }}>{r.t}</h3>
                    <span style={{ fontSize: 15, color: "#5A5854" }}> · {r.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="max-md:!text-base" style={{ margin: "16px 0 0", maxWidth: 460, fontSize: 14, lineHeight: 1.5, color: "#77746E" }}>Not copy and paste. Each version is rewritten for how people use that platform.</p>
          </div>
          <figure style={{ margin: 0, minWidth: 0 }}>
            <img loading="lazy" src="/assets/pages/social/08-one-idea__many-formats.png" alt="Illustration: one idea branching into a carousel, a feed post, an X thread, a short video, a story and an email" style={{ display: "block", width: "100%", height: "auto" }} />
          </figure>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="max-md:!pt-10" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "32px 64px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "#1C1C1C" }}>
              Everything
              <br />
              your social needs.
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1 }}>From one person.</em>
            </h2>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C" }}>
            {GET.map((g, i) => (
              <li key={g.t} style={{ display: "grid", gap: "6px 24px", alignItems: "baseline", padding: "20px 0", borderBottom: "1px solid #DDDAD3" }} className="sm:!grid-cols-[40px_150px_minmax(0,1fr)]">
                <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>{g.t}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>{g.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "20px 64px", alignItems: "end", marginBottom: 28 }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "#1C1C1C" }}>
              Five steps.
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1 }}>No &quot;just post more&quot; strategy.</em>
            </h2>
          </div>
        </div>
        <img loading="lazy" src="/assets/pages/social/10-process__five-steps.png" alt="Illustration: five steps, audit, plan, create, distribute and learn, connected by one path" style={{ display: "block", width: "100%", height: "auto" }} />
        <ol style={{ margin: "28px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "24px" }} className="grid-cols-1 sm:!grid-cols-3 lg:!grid-cols-5">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.t} style={{ minWidth: 0, padding: "20px 0 0", borderTop: `2px solid ${s.gold ? "#C4A47C" : "#1C1C1C"}` }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "#4E4C48" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* GOOD SOCIAL GUT CHECK */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="A gut check" title={<>What good social<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1 }}>actually looks like.</em></>} sub="A quick gut check for your current account." />
        <div style={{ display: "grid", gap: 24, alignItems: "stretch" }} className="grid-cols-1 md:!grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <div style={{ borderRadius: 22, border: "1px solid #DDDAD3", padding: 28 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F" }}>Busy social</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {BUSY.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 16.5, lineHeight: 1.45, color: "#77746E" }}>
                  <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#A09B91" }}>—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure style={{ margin: 0, minWidth: 0, display: "flex", alignItems: "center" }}>
            <img loading="lazy" src="/assets/pages/social/11-good-social__filtered-posts.png" alt="Illustration: a pile of scattered posts filtered into a few strong posts that feed growth" style={{ display: "block", width: "100%", height: "auto" }} />
          </figure>
          <div style={{ borderRadius: 22, background: "#F4EFE8", border: "1px solid #C9B9A2", padding: 28 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9A7646" }}>Good social</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {GOOD.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDD0BE", fontSize: 16.5, lineHeight: 1.45, color: "#1C1C1C" }}>
                  <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#9A7646" }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 24, display: "grid", gap: "16px 32px", alignItems: "center", padding: "20px 0", borderTop: "1px solid #DDDAD3", borderBottom: "1px solid #DDDAD3" }} className="sm:!grid-cols-[auto_minmax(0,1fr)]">
          <div className="max-sm:!justify-center" style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "'General Sans'", fontWeight: 600, letterSpacing: "-0.03em" }}>
            <span style={{ fontSize: 40, lineHeight: 1 }}>5</span>
            <span style={{ color: "#C4A47C", fontSize: 24 }}>·</span>
            <span style={{ fontSize: 40, lineHeight: 1 }}>3</span>
            <span style={{ color: "#C4A47C", fontSize: 24 }}>·</span>
            <span style={{ fontSize: 40, lineHeight: 1, color: "#9A7646" }}>2</span>
          </div>
          <p className="max-md:!text-base" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48", maxWidth: 720 }}>
            A useful rule of thumb is the 5 3 2 rule: for every 10 posts, 5 share useful content from others, 3 are your own, and 2 are personal. It&apos;s a reminder to stop talking about yourself all the time.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(28px,3vw,40px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="max-md:!text-balance max-md:[&_em]:!block" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Three platforms.
              <br />
              <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>One person handling all of it.</em>
            </h2>
          </div>
          <p className="max-md:!mx-auto" style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "#5A5854", maxWidth: 420 }}>No long contracts. Billed weekly or every two weeks.</p>
        </div>
        <div style={{ borderBottom: "1px solid #DDDAD3" }}>
          {PRICING_ROWS.map((r) => (
            <div key={r.n} style={{ display: "grid", gap: "10px 24px", alignItems: "center", padding: "clamp(24px,3vw,38px) clamp(8px,1vw,16px)", borderTop: "1px solid #DDDAD3" }} className="sm:!grid-cols-[48px_minmax(0,1.3fr)_minmax(0,2.6fr)_minmax(0,0.9fr)] max-sm:!justify-items-center max-sm:!text-center">
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646" }}>{r.n}</span>
              <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(20px,1.7vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{r.t}</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48", maxWidth: 540 }}>
                {r.d}
                {r.em && <Emphasis style={{ fontSize: 18, color: "#77746E" }}>{r.em}</Emphasis>}
              </p>
              <div className="sm:!justify-self-end sm:!text-right">
                <p style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(24px,2.2vw,32px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, whiteSpace: "nowrap" }}>{r.price}</p>
                {r.per && <span style={{ display: "block", marginTop: 4, fontSize: 13, fontWeight: 500, color: "#77746E" }}>{r.per}</span>}
              </div>
            </div>
          ))}
        </div>
        <p className="max-md:!mx-auto max-md:!text-center max-md:!text-base" style={{ margin: "14px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#8B877F", maxWidth: 640 }}>Most businesses pay between $500 and $5,000 a month for social media management, with most landing in the $1,000 to $3,000 range.</p>
        <div style={{ marginTop: "clamp(32px,4vw,48px)", borderRadius: 28, background: "#171717", color: "#F2EFEA", padding: "clamp(28px,3.5vw,48px)", display: "grid", gap: "28px clamp(32px,5vw,72px)", alignItems: "center" }} className="sm:!grid-cols-2 max-sm:!text-center">
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D3AE82" }}>Want social, SEO and Reddit together?</div>
            <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(28px,2.8vw,40px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
              Everything, <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em", color: "#D3AE82" }}>handled.</em>
            </h3>
            <p className="max-sm:!mx-auto" style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.55, color: "#C9C4BA", maxWidth: 460 }}>SEO, Reddit, social media, content and design. One person, one plan, one invoice.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="max-sm:!justify-center" style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(40px,4vw,56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>$3,999</span>
              <span style={{ fontSize: 14, color: "#9C978D" }}>per month · <span style={{ textDecoration: "line-through" }}>$4,397</span> separately</span>
            </div>
            <a href="#contact" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center max-md:!mx-auto" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 52, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#171717", fontSize: 15.5, fontWeight: 600 }}>
              Get a free social check
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
          <div className="max-md:!text-center">
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Who it&apos;s for</div>
            <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.2vw,46px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Social works
              <br />
              best when...
            </h2>
          </div>
          <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="sm:!grid-cols-2">
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9A7646" }}>Good fit</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
                {FIT_GOOD.map((t) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#1C1C1C" }}>
                    <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#9A7646" }}>✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F" }}>Not the right fit</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
                {FIT_BAD.map((t) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#5A5854" }}>
                    <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#A09B91" }}>—</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0`, display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] max-md:!pt-20">
        <div className="max-md:!text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            Social media questions,
            <br />
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em" }}>answered straight.</em>
          </h2>
          <div className="max-md:!mx-auto" style={{ marginTop: 32, width: "100%", maxWidth: 420 }}>
            <img loading="lazy" src="/assets/pages/social/14-faq__social-questions.png" alt="Illustration: questions from Instagram, TikTok, YouTube, X, Facebook and LinkedIn answered by one marketer and turned into scheduled posts, community replies and analytics" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
        <FAQAccordion faqs={FAQS} />
      </section>

      {/* CTA */}
      <section id="contact" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(24px,3vw,40px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div className="max-md:!text-center">
            <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>Posting a lot and still invisible?</h2>
            <p style={{ margin: "14px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.6vw,36px)", lineHeight: 1.1, color: "#D3AE82" }}>
              <Emphasis>Let&apos;s find out why.</Emphasis>
            </p>
            <p className="max-md:!mx-auto" style={{ margin: "22px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
              Send me your accounts and tell me who you&apos;re trying to reach. I&apos;ll tell you what&apos;s working, what isn&apos;t and what I&apos;d change first. Free.
            </p>
          </div>
          <div className="max-md:!mx-auto max-md:!w-full max-md:!max-w-[400px]" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600 }}>
              Get a free social check
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
        <h2 className="max-md:!text-center" style={{ margin: "0 0 20px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Social works better with</h2>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-3">
          {RELATED.map((r, i) => (
            <a key={r.t} href={r.href} className="max-sm:!border-l-0 max-sm:!px-0" style={{ display: "flex", flexDirection: "column", gap: 8, padding: `22px ${i ? 24 : 0}px 22px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontFamily: "'General Sans'", fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em" }}>
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
