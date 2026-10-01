export default function WhatIDo() {
  return (
    <section className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "20px 64px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <h2 className="max-md:!text-center" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em", textWrap: "balance" }}>
          What a freelance growth marketer for SaaS actually does
        </h2>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#4E4C48", maxWidth: 560 }} className="max-md:!mx-auto">
          Most SaaS teams don&apos;t have a marketing problem. They have one bottleneck hiding behind ten tasks. My job is to find it, fix it, then build the channel that brings users in. Usually that&apos;s SEO, Reddit, social or ads. Sometimes it&apos;s the landing page nobody wanted to touch.
        </p>
      </div>
    </section>
  );
}
