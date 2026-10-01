function CaseStudy({
  id,
  index,
  top,
  bg,
  border,
  dark,
  reverse,
  eyebrow,
  logo,
  logoAlt,
  logoHeight = 34,
  name,
  headline,
  paragraphs,
  stats,
  visual,
}: {
  id: string;
  index: number;
  top: number;
  bg: string;
  border: string;
  dark?: boolean;
  reverse?: boolean;
  eyebrow: string;
  logo: string;
  logoAlt: string;
  logoHeight?: number;
  name: string;
  headline: React.ReactNode;
  paragraphs: React.ReactNode;
  stats: { v: string; l: string }[];
  visual: React.ReactNode;
}) {
  const textColor = dark ? "#EEF0F8" : "#4F5A59";
  const mutedColor = dark ? "#A3A8BD" : "#4F5A59";

  const content = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32, minWidth: 0, padding: "8px 0" }}>
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: mutedColor }}>
            <span>{String(index).padStart(2, "0")}</span>
            <span style={{ width: 24, height: 1, background: dark ? "#3A3F55" : "#9FB2B0" }} />
            <span>{eyebrow}</span>
          </div>
          <span className="max-md:!shrink" style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
            <img loading="lazy" src={logo} alt={logoAlt} className="max-md:!h-auto max-md:!max-w-[120px]" style={{ display: "block", height: logoHeight, width: "auto", maxWidth: 150, mixBlendMode: dark ? "normal" : "multiply" }} />
          </span>
        </div>
        <div style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,36px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{name}</div>
        <h3 style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(24px,2.2vw,30px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.12 }}>{headline}</h3>
        <div style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: textColor, maxWidth: 440 }}>{paragraphs}</div>
      </div>
      <div>
        <div className="max-sm:!grid-cols-2" style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length},minmax(0,1fr))`, borderTop: `1px solid ${dark ? "#2C3042" : "#C9D6D5"}` }}>
          {stats.map((s, i) => (
            <div key={s.l} className={`max-md:!text-center max-sm:!px-2 max-sm:!pb-4 ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? (dark ? "max-sm:!border-t max-sm:!border-t-[#2C3042]" : "max-sm:!border-t max-sm:!border-t-[#C9D6D5]") : ""} ${stats.length === 3 && i === 2 ? "max-sm:!col-span-2" : ""}`} style={{ padding: `16px ${i === stats.length - 1 ? 0 : 12}px 0 ${i ? 14 : 0}px`, borderLeft: i ? `1px solid ${dark ? "#2C3042" : "#C9D6D5"}` : "none" }}>
              <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 600, letterSpacing: "-0.03em" }}>{s.v}</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.35, color: mutedColor }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <article id={id} style={{ position: "sticky", top, zIndex: index, marginBottom: 24 }}>
      <div
        style={{
          borderRadius: 28,
          background: bg,
          color: dark ? "#EEF0F8" : "inherit",
          border: `1px solid ${border}`,
          padding: "clamp(20px,2.4vw,32px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(24px,3vw,48px)",
        }}
        className={reverse ? "md:!grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)]" : "md:!grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)]"}
      >
        {reverse ? (
          <>
            <div style={{ order: 2 }} className="md:!order-none">{visual}</div>
            {content}
          </>
        ) : (
          <>
            {content}
            {visual}
          </>
        )}
      </div>
    </article>
  );
}

function Frame({ children, bg }: { children: React.ReactNode; bg: string }) {
  return <div style={{ position: "relative", minWidth: 0, aspectRatio: "1/0.8", borderRadius: 20, overflow: "hidden", background: bg }}>{children}</div>;
}

export default function Work() {
  return (
    <section id="work" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(32px,4vw,48px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Selected work</div>
          <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(36px,3.6vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Growth work that had to
            <br />
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.12em" }}>earn its place.</em>
          </h2>
        </div>
        <p className="max-md:!mx-auto" style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "#5A5854", maxWidth: 360 }}>No vanity metrics. Just the numbers that actually moved something.</p>
      </div>

      <CaseStudy
        id="case-blainy"
        index={1}
        top={96}
        bg="#EEF3F2"
        border="#D5E1DF"
        eyebrow="AI SaaS / SEO / Reddit / Content"
        logo="/assets/site/logo-blainy.png"
        logoAlt="Blainy logo"
        name="Blainy"
        headline={<>Zero to 85K+ users.<br />No paid ads.</>}
        paragraphs={
          <>
            <p style={{ margin: 0 }}>Blainy needed users without an ad budget. I built growth around search, Reddit and content so each channel fed the next one.</p>
            <p className="max-md:!text-base" style={{ margin: "12px 0 0", paddingLeft: 12, borderLeft: "2px solid #9FB2B0", fontSize: 14.5, color: "#1C1C1C", fontWeight: 500, maxWidth: 420 }}>
              That brought in 85K+ users and ~30M search impressions in 12 months.
            </p>
          </>
        }
        stats={[
          { v: "85K+", l: "users" },
          { v: "~30M", l: "search impressions" },
          { v: "Thousands", l: "Reddit-driven conversions" },
        ]}
        visual={
          <Frame bg="#DCE8E6">
            <div style={{ position: "absolute", left: 24, top: 24, width: "calc(86% - 24px)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(20,40,40,.1)", background: "#fff", boxShadow: "0 20px 40px -30px rgba(20,40,40,.5)" }}>
              <img loading="lazy" src="/assets/site/blainy-gsc-full.jpg" alt="Blainy Google Search Console: 297K clicks, 25.3M impressions" style={{ display: "block", width: "100%" }} />
            </div>
            <div style={{ position: "absolute", right: 24, bottom: 24, width: "56%", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(20,40,40,.12)", background: "#fff", boxShadow: "0 28px 56px -28px rgba(20,40,40,.55)" }}>
              <img loading="lazy" src="/assets/site/blainy-bing-full.jpg" alt="Blainy Bing Webmaster Tools search performance" style={{ display: "block", width: "100%" }} />
            </div>
            <div style={{ position: "absolute", left: 24, bottom: 24, padding: "16px 20px", borderRadius: 16, background: "#1C1C1C", color: "#F2EFEA", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(30px,3.2vw,48px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>85K+</span>
              <span style={{ fontSize: 12.5, color: "#B7B2A8" }}>users, organically</span>
            </div>
          </Frame>
        }
      />

      <CaseStudy
        id="case-everdry"
        index={2}
        top={112}
        bg="#F8F6F4"
        border="#E1DCD2"
        reverse
        eyebrow="Home Services / Social / Local SEO"
        logo="/assets/v8/logo-everdry.gif"
        logoAlt="Everdry Waterproofing logo"
        logoHeight={38}
        name="Everdry Waterproofing"
        headline={
          <>
            Home service marketing that isn&apos;t{" "}
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.12em" }}>
              &quot;post and hope.&quot;
            </em>
          </>
        }
        paragraphs={<p style={{ margin: 0 }}>Their social pages weren&apos;t reaching anyone. I rebuilt the content around visuals people stop for and turned the Google Business Profile into a lead source.</p>}
        stats={[
          { v: "160K+", l: "Facebook views in 28 days" },
          { v: "12,462", l: "Business Profile views" },
          { v: "603", l: "calls from Business Profile, Jun–Nov" },
        ]}
        visual={
          <Frame bg="#E9E4DA">
            <div style={{ position: "absolute", left: 24, top: 24, width: "calc(80% - 24px)", borderRadius: 12, overflow: "hidden", border: "1px solid #2F3033", background: "#18191A", boxShadow: "0 20px 40px -28px rgba(20,20,20,.5)" }}>
              <div role="img" aria-label="Everdry Waterproofing Facebook page overview: 160,235 views in the last 28 days" style={{ aspectRatio: "1500/870", background: "#242526 url('/assets/v8/ed-160k.png') 76.5% 50.3%/168% auto no-repeat" }} />
            </div>
            <div style={{ position: "absolute", right: 24, top: "45%", width: "58%", borderRadius: 12, overflow: "hidden", border: "1px solid #2F3033", background: "#202124", boxShadow: "0 28px 56px -26px rgba(20,20,20,.55)" }}>
              <img loading="lazy" src="/assets/v7/everdry-gbp.png" alt="Everdry Google Business Profile: 12,462 profile views" style={{ display: "block", width: "100%" }} />
            </div>
            <div style={{ position: "absolute", right: 24, top: 24, padding: "16px 20px", borderRadius: 16, background: "#1C1C1C", color: "#F2EFEA", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 20px 40px -24px rgba(20,20,20,.5)" }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(40px,4vw,60px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>160K+</span>
              <span style={{ fontSize: 12.5, color: "#B7B2A8" }}>Facebook views in 28 days</span>
            </div>
            <div style={{ position: "absolute", left: 24, bottom: 24, width: "34%", aspectRatio: "4/3", border: "6px solid #fff", boxShadow: "0 24px 44px -24px rgba(20,20,20,.5)", transform: "rotate(-2deg)", borderRadius: 12, overflow: "hidden" }}>
              <div role="img" aria-label="Everdry social content creative" style={{ width: "100%", height: "100%", background: "#fff url('/assets/v8/ed-design.png') center/cover no-repeat" }} />
            </div>
          </Frame>
        }
      />

      <CaseStudy
        id="case-virtarix"
        index={3}
        top={128}
        bg="#15171F"
        border="#15171F"
        dark
        eyebrow="Content / Community / Reddit"
        logo="/assets/v8/logos/virtarix.png"
        logoAlt="Virtarix logo"
        logoHeight={28}
        name="Virtarix"
        headline={<>A new Facebook page to<br /><strong style={{ fontWeight: 700 }}>70K+ views</strong> in 3 months.</>}
        paragraphs={
          <>
            <p style={{ margin: 0, color: "#A3A8BD" }}>Virtarix had solid technical knowledge and almost no distribution.</p>
            <p style={{ margin: "10px 0 0", color: "#EEF0F8" }}>I turned that into technical content, community activity and Reddit conversations people could actually find.</p>
          </>
        }
        stats={[
          { v: "70K+", l: "Facebook views" },
          { v: "34K", l: "views in one month (Dec)" },
          { v: "5", l: "Reddit Answers results recommending Virtarix" },
        ]}
        visual={
          <div style={{ position: "relative", minWidth: 0, aspectRatio: "1/0.86", borderRadius: 20, overflow: "hidden", background: "#1E2130" }}>
            <div style={{ position: "absolute", left: "3.5%", top: "4%", width: "70%", zIndex: 3, borderRadius: 12, overflow: "hidden", border: "1px solid #2C3042", boxShadow: "0 24px 48px -24px rgba(0,0,0,.75)" }}>
              <img loading="lazy" src="/assets/v8/vx-70k.png" alt="Virtarix Facebook page insights, 4 Oct to 23 Jan: 71,459 views, 3,395 interactions" style={{ display: "block", width: "100%" }} />
            </div>
            <span style={{ position: "absolute", left: "calc(3.5% + 12px)", top: "calc(4% + 12px)", zIndex: 6, padding: "5px 9px", borderRadius: 7, background: "#EEF0F8", color: "#15171F", border: "1px solid #EEF0F8", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", whiteSpace: "nowrap" }}>AFTER · 71,459 VIEWS</span>
            <div style={{ position: "absolute", right: "3%", top: "30%", width: "42%", zIndex: 4, borderRadius: 12, overflow: "hidden", border: "1px solid #2C3042", boxShadow: "0 24px 48px -24px rgba(0,0,0,.75)" }}>
              <img loading="lazy" src="/assets/v12/vx-before.png" alt="Virtarix Facebook dashboard: views flat at zero through September, then rising from October" style={{ display: "block", width: "100%" }} />
            </div>
            <span style={{ position: "absolute", right: "calc(3% + 10px)", top: "calc(30% - 12px)", zIndex: 6, padding: "5px 9px", borderRadius: 7, background: "#15171F", color: "#EEF0F8", border: "1px solid #3A3F55", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", whiteSpace: "nowrap" }}>BEFORE · FLAT UNTIL OCT</span>
            <div style={{ position: "absolute", left: "3.5%", bottom: "4%", width: "48%", zIndex: 5, borderRadius: 12, overflow: "hidden", border: "1px solid #2C3042", boxShadow: "0 24px 48px -24px rgba(0,0,0,.75)" }}>
              <img loading="lazy" src="/assets/v7/virtarix-reddit-good.jpg" alt="Reddit Answers for 'good vps' listing Virtarix" style={{ display: "block", width: "100%" }} />
            </div>
            <span style={{ position: "absolute", left: "calc(3.5% + 10px)", bottom: "calc(4% + 48% * 0.729 - 10px)", zIndex: 6, padding: "5px 9px", borderRadius: 7, background: "#EEF0F8", color: "#15171F", border: "1px solid #EEF0F8", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", whiteSpace: "nowrap" }}>REDDIT</span>
            <div style={{ position: "absolute", right: "3%", bottom: "4%", width: "40%", zIndex: 4, borderRadius: 12, overflow: "hidden", border: "1px solid #2C3042", boxShadow: "0 24px 48px -24px rgba(0,0,0,.75)" }}>
              <img loading="lazy" src="/assets/v12/vx-month.png" alt="Meta insights, 1 Dec 2025 to 8 Jan 2026: 34.0K views" style={{ display: "block", width: "100%" }} />
            </div>
            <span style={{ position: "absolute", right: "calc(3% + 10px)", bottom: "calc(4% + 40% * 0.671 - 10px)", zIndex: 6, padding: "5px 9px", borderRadius: 7, background: "#15171F", color: "#EEF0F8", border: "1px solid #3A3F55", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", whiteSpace: "nowrap" }}>ONE MONTH · 34K</span>
          </div>
        }
      />

      <CaseStudy
        id="case-loompad"
        index={4}
        top={144}
        bg="#F3ECE3"
        border="#E3D8C8"
        reverse
        eyebrow="Etsy / Ecommerce / Listings"
        logo="/assets/v8/logos/loompad.png"
        logoAlt="LoomPad"
        logoHeight={38}
        name="LoomPad"
        headline={<><strong style={{ fontWeight: 700 }}>$3,401</strong> in sales from a store nobody could find.</>}
        paragraphs={<p style={{ margin: 0, color: "#5E5142" }}>I reworked listings and distribution so people searching could actually find the products.</p>}
        stats={[
          { v: "93", l: "orders" },
          { v: "$3,401", l: "sales" },
          { v: "10,777", l: "shop views" },
          { v: "5,492", l: "visits" },
        ]}
        visual={
          <Frame bg="#E6DACA">
            <div style={{ position: "absolute", left: 24, top: "13%", width: "calc(90% - 24px)", borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid #D8CAB5", boxShadow: "0 24px 48px -30px rgba(60,40,20,.5)" }}>
              <div style={{ height: 24, display: "flex", alignItems: "center", gap: 5, padding: "0 10px", background: "#F4F1EC", borderBottom: "1px solid #E5DED2" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#D6CFC3" }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#D6CFC3" }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#D6CFC3" }} />
                <span style={{ marginLeft: 10, height: 14, padding: "0 10px", borderRadius: 7, background: "#fff", fontSize: 9.5, color: "#8B877F", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>etsy.com/shop/Loompad</span>
              </div>
              <img loading="lazy" src="/assets/v9/loom-store.png" alt="LoomPad Etsy storefront: desk-mat banner, 5.0 rating, 93 sales, featured listings" style={{ display: "block", width: "100%" }} />
            </div>
            <div style={{ position: "absolute", right: 24, bottom: 24, width: "27%", borderRadius: 18, overflow: "hidden", border: "4px solid #1C1C1C", background: "#1C1B20", boxShadow: "0 28px 48px -22px rgba(20,10,0,.6)" }}>
              <img loading="lazy" src="/assets/v9/m46.png" alt="LoomPad Etsy shop stats, all time: 10,777 views, 93 orders, 5,492 visits, $3,401.81 revenue" style={{ display: "block", width: "100%" }} />
            </div>
          </Frame>
        }
      />

    </section>
  );
}
