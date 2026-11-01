import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { LINKEDIN_TOOLS, type LinkedInKind } from "@/lib/tools/families/linkedin-choices";
import { ART, type ToolArt } from "@/lib/tools/art";
import t from "../_studio/edtool.module.css";
import { Explainer } from "../_components/Explainer";
import f from "../facebook-bio-generator/fb.module.css";
import l from "./linkedin.module.css";
import { LinkedInTool } from "./LinkedInTool";

// The page layout the six LinkedIn tools share (November 2026 package): tool first, then how it works,
// the practical guide with the four SVGs, examples, mistakes, FAQs, related tools and the social CTA.
// Each tool's copy lives in ./content.ts.

export type Figure = { name: string; alt: string };
export type LinkedInCopy = {
  kind: LinkedInKind;
  title: string;
  description: string;
  h1: [string, string];
  lede: string;
  steps: [string, string][];
  get: string[];
  guide: { h: string; p: string[]; fig?: Figure }[];
  examples: [string, string][];
  mistakes: [string, string][];
  faqs: [string, string][];
  figures: { workflow: Figure; examples: Figure };
};

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4V9.5Z" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", icon: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.84v2.36H8v3h2.5V21h3Z" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/", icon: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.44-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z" },
  { name: "X", href: "https://x.com/zainnameen", icon: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z" },
];

/** The illustration beside "What you get" on each tool. */
const RESULT_ART: Record<LinkedInKind, ToolArt> = {
  post: ART.linkedinPost,
  comment: ART.linkedinComment,
  headline: ART.linkedinHeadline,
  about: ART.linkedinAbout,
  experience: ART.linkedinExperience,
  skills: ART.linkedinSkills,
};

const RELATED: LinkedInKind[] =["post", "comment", "headline", "about", "experience", "skills"];
const RELATED_TEXT: Record<LinkedInKind, string> = {
  post: "Turn a real idea or lesson into a post.",
  comment: "Reply to a post with something useful.",
  headline: "Say what you do in 220 characters.",
  about: "Write a summary that sounds like you.",
  experience: "Describe a role without invented metrics.",
  skills: "Separate proven skills from ones to learn.",
};

export const linkedInMetadata = (c: LinkedInCopy): Metadata => buildMetadata({ title: c.title, description: c.description, path: `/tools/${LINKEDIN_TOOLS[c.kind].slug}` });

const Section = ({ id, band, children }: { id?: string; band?: boolean; children: React.ReactNode }) => {
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

/** "LinkedIn post" + accent split for H2s: the last two words go green. */
const accent = (s: string) => {
  const w = s.split(" ");
  return w.length < 3 ? <em className={e.emGreen}>{s}</em> : <>{w.slice(0, -2).join(" ")} <em className={e.emGreen}>{w.slice(-2).join(" ")}</em></>;
};

const Illustration = ({ kind, fig }: { kind: LinkedInKind; fig: Figure }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={l.figure} src={`/assets/tools/linkedin-${kind}/${fig.name}.svg`} alt={fig.alt} width={1200} height={700} loading="lazy" decoding="async" />
);

export function LinkedInPage({ c }: { c: LinkedInCopy }) {
  const tool = LINKEDIN_TOOLS[c.kind];
  const url = `${SITE_URL}/tools/${tool.slug}`;
  return (
    <EditorialPage>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Free Tools", url: `${SITE_URL}/tools` },
              { name: tool.name, url },
            ]),
            { "@type": "SoftwareApplication", name: tool.name, url, description: c.description, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
          ],
        }}
      />

      <section className={f.hero} id="top">
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li aria-current="page">{tool.name}</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free LinkedIn tools</p>
          <h1 className={`${e.h1} ${t.h1}`} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            {c.h1[0]} <span className={t.accent}>{c.h1[1]}</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>{c.lede}</p>
          <LinkedInTool kind={c.kind} />
        </div>
      </section>

      <Section id="how-to-use" band>
        <Head kicker="Three steps" title={<>How to use the free {accent(tool.name)}</>} />
        <ul className={`${f.cards} ${f.cards3}`}>
          {c.steps.map(([h, p], i) => (
            <li key={h} className={f.card}>
              <span className={t.num}>Step {i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <Illustration kind={c.kind} fig={c.figures.workflow} />
      </Section>

      <Section id="what-you-get">
        <Explainer art={RESULT_ART[c.kind]} flip>
          <p className={e.eyebrow}>Your result</p>
          <h2 className={e.h2}>What you get from {accent(`the ${tool.noun} tool`)}</h2>
          <ul className={l.getList}>
            {c.get.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Explainer>
      </Section>

      {c.guide.map((g, i) => (
        <Section key={g.h} id={`guide-${i + 1}`} band={i % 2 === 0}>
          <div className={l.prose}>
            <Head kicker={i === 0 ? "The practical guide" : "Guide"} title={accent(g.h)} />
            {g.p.map((p) => (
              <p key={p.slice(0, 40)} className={e.body} style={{ marginTop: 16 }}>{p}</p>
            ))}
          </div>
          {g.fig ? <Illustration kind={c.kind} fig={g.fig} /> : null}
        </Section>
      ))}

      <Section id="examples">
        <Head kicker="Examples to copy and adapt" title={<>Examples you can {accent("learn from")}</>} intro="These examples are illustrative, not claims about any real person." />
        <ul className={l.examples}>
          {c.examples.map(([h, q]) => (
            <li key={h}>
              <h3>{h}</h3>
              <blockquote>{q}</blockquote>
            </li>
          ))}
        </ul>
        <Illustration kind={c.kind} fig={c.figures.examples} />
      </Section>

      <Section id="mistakes" band>
        <Head kicker="Common mistakes" title={<>Mistakes to {accent("avoid")}</>} />
        <ul className={`${f.cards} ${f.cards2}`} style={{ textAlign: "left" }}>
          {c.mistakes.map(([h, p]) => (
            <li key={h} className={f.card}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section id="faq" className={t.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>Questions, answered</p>
            <h2 className={e.h2}>Frequently asked <em className={e.emGreen}>questions</em></h2>
          </div>
          <FAQAccordion faqs={c.faqs.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      <Section id="related-tools" band>
        <Head kicker="Related free tools" title={<>More free {accent("LinkedIn tools")}</>} intro="Each one does a separate job on your profile." />
        <ul className={`${f.cards} ${f.cards3}`}>
          {RELATED.filter((k) => k !== c.kind).map((k) => (
            <li key={k} className={`${f.card} ${t.card}`} style={{ display: "block" }}>
              <span className={f.label}>LinkedIn</span>
              <h3>{LINKEDIN_TOOLS[k].name}</h3>
              <p>{RELATED_TEXT[k]}</p>
              <Link href={`/tools/${LINKEDIN_TOOLS[k].slug}`} className={t.cardLink}>Open the tool <span aria-hidden="true">→</span></Link>
            </li>
          ))}
        </ul>
        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/tools" className={`${e.btn} ${e.btnSecondary}`}>Explore all free tools</Link>
        </p>
      </Section>

      <section className={`${f.social} ${t.last}`} aria-labelledby="social-h">
        <div className={e.container}>
          <h2 id="social-h" className={e.h2}>Want more useful <em className={e.emGreen}>growth tips?</em></h2>
          <p className={e.body} style={{ margin: "14px auto 0" }}>I share practical ideas about SEO, content, LinkedIn and growing a business online. Follow along if you are working on any of these.</p>
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
