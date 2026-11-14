import { Mark } from "./Mark";
const PARAS = [
  "A growth marketing specialist helps businesses find customers, turn visitors into users and figure out which marketing channels are worth investing in.",
  "For SaaS companies, that could mean improving search visibility, building content around what customers are looking for, reaching potential users through Reddit, or fixing a landing page that's getting traffic but not signups.",
  "That's the work I do.",
  "I research the market, find the opportunities, build the strategy and execute it. Then I look at the numbers and figure out what needs to change.",
  "I work across SEO, organic social media, content marketing, Reddit, community growth and paid advertising. But I don't recommend every channel just because I know how to use it.",
  <>The goal is to find <Mark>what actually works for your business</Mark>.</>,
];

export default function WhatIDo() {
  return (
    <section className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em", textWrap: "balance" }}>
          What Does a Growth Marketing Specialist{" "}
          <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Actually Do?</em>
        </h2>
        <div style={{ textAlign: "left" }}>
          {PARAS.map((p, i) => (
            <p key={i} style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.6, color: "#4A524B" }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
