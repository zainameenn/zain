"use client";

import { useState } from "react";

const MED = "clamp(300px,26vw,380px)";
const BIG = "clamp(340px,34vw,500px)";

const REVIEWS = [
  {
    name: "Khalid Bashir",
    role: "Founder, Blainy",
    src: "LinkedIn",
    img: "/assets/avatars/khalid.png",
    link: "/assets/reviews/linkedin-khalid-mirza.png",
    w: BIG,
    fs: "19px",
    q: "I can confidently say he played a key role in driving our product Blainy from 0 to 80,000 users organically. His ability to craft smart growth strategies and execute them effectively made a real difference in our journey.",
  },
  {
    name: "Cam",
    role: "Everdry Waterproofing",
    src: "Upwork",
    initials: "C",
    link: "/assets/reviews/upwork-virtarix-everdry.png",
    w: BIG,
    fs: "17.5px",
    q: "He came in, got up to speed quick, and delivered what we needed without me having to micromanage. His communication is clean, turnaround time is solid, and he takes feedback well. Critically, he suggested how to approach things I didn't know that we needed to approach and the results were phenomenal.",
  },
  {
    name: "Peter French",
    role: "Virtarix",
    src: "Upwork",
    initials: "PF",
    link: "/assets/reviews/upwork-virtarix-everdry.png",
    w: MED,
    fs: "16.5px",
    q: "Zain is an exceptionally skilled and professional freelancer. We hired him to optimize our online and social media presence, and his work directly addressed our goal of turning our growth plateau into predictable, scalable momentum.",
  },
  {
    name: "Muhammad Usman Bashir",
    role: "Marketing Manager, StartFleet.io",
    src: "LinkedIn",
    img: "/assets/avatars/usman.png",
    link: "/assets/reviews/linkedin-usman-faique.png",
    w: MED,
    fs: "16.5px",
    q: "He's completely changed how I think about social media marketing — especially Reddit marketing, which I honestly never saw as a marketing channel before!",
  },
  {
    name: "Muhammad Dawood Ahmad",
    role: "Founder & CEO, Elixs Bikes",
    src: "LinkedIn",
    img: "/assets/avatars/dawood.png",
    link: "/assets/reviews/linkedin-dawood-fahad.png",
    w: MED,
    fs: "16.5px",
    q: "He shared some of the smartest ideas I've ever come across after just hearing about my idea, with quick strategies and clear advice.",
  },
  {
    name: "Mirza Zain Ali Nasir",
    role: "AI Product Development, AEC Automations",
    src: "LinkedIn",
    img: "/assets/avatars/mirza.png",
    link: "/assets/reviews/linkedin-khalid-mirza.png",
    w: MED,
    fs: "16.5px",
    q: "Great Experience while Working with Zain ul Abidin, strong grasp on business flows, attention to details.",
  },
  {
    name: "Muhammad Faique Arshad",
    role: "GTME, managed Zain directly",
    src: "LinkedIn",
    img: "/assets/avatars/faique.png",
    link: "/assets/reviews/linkedin-usman-faique.png",
    w: MED,
    fs: "16.5px",
    q: "He consistently delivers high-quality work, driving tangible business growth. An outstanding professional with a strategic mindset.",
  },
];

export default function Reviews() {
  const [running, setRunning] = useState(true);
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" style={{ marginTop: "clamp(80px,9vw,128px)", background: "#171717", color: "#F2EFEA" }}>
      <div
        style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,8vw,112px) clamp(20px,4vw,48px) 0", display: "grid", gap: "16px 48px", alignItems: "end" }}
        className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center"
      >
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#C4A47C" }}>Client proof</div>
          <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            What people say after working with me.
          </h2>
        </div>
        <p style={{ margin: 0, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontSize: "clamp(22px,2vw,28px)", lineHeight: 1.25, color: "#B7B2A8" }}>
          Luckily, I don&apos;t have to write this part myself.
        </p>
      </div>
      <div
        onMouseEnter={() => setRunning(false)}
        onMouseLeave={() => setRunning(true)}
        className="max-md:![-webkit-mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] max-md:![mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)]"
        style={{
          marginTop: "clamp(40px,4vw,56px)",
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch", width: "max-content", padding: "0 0 8px", animation: "zmarqR 58s linear infinite", animationPlayState: running ? "running" : "paused" }}>
          {loop.map((r, i) => (
            <figure
              key={i}
              style={{
                flex: "0 0 auto",
                width: r.w,
                margin: "0 16px 0 0",
                borderRadius: 20,
                background: i % REVIEWS.length < 3 ? "#F2EFEA" : "#E6E2D9",
                color: "#1C1C1C",
                padding: "clamp(24px,2.2vw,32px)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9A7646" }}>
                  {r.src === "Upwork" ? "Upwork ★ 5.0" : "LinkedIn recommendation"}
                </span>
                <a href={r.link} target="_blank" rel="noreferrer" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ fontSize: 12.5, color: "#5A5854", borderBottom: "1px solid #CFCBC2" }}>
                  View original ↗
                </a>
              </div>
              <blockquote style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 500, fontSize: r.fs, lineHeight: 1.4, letterSpacing: "-0.01em", flex: 1 }}>&quot;{r.q}&quot;</blockquote>
              <figcaption className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #DAD6CC" }}>
                {r.img ? (
                  <span role="img" aria-label={r.name} style={{ width: 44, height: 44, borderRadius: "50%", flex: "0 0 auto", backgroundImage: `url("${r.img}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
                ) : (
                  <span style={{ width: 44, height: 44, borderRadius: "50%", flex: "0 0 auto", background: "#DDD7CB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{r.initials}</span>
                )}
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{r.name}</span>
                  <span style={{ display: "block", fontSize: 13, color: "#5A5854", lineHeight: 1.35 }}>{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div style={{ height: "clamp(80px,8vw,112px)" }} />
    </section>
  );
}
