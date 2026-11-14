import { HomeArt } from "./HomeArt";
export default function Philosophy() {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "40px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)]">
        <div>
          <h2 className="max-md:!text-balance" style={{ textAlign: "center", margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(36px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            More Marketing Won&apos;t Fix a Growth Problem{" "}
            <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>You Haven&apos;t Identified.</em>
          </h2>
          <ul className="max-md:!mx-auto" style={{ margin: "24px 0 0", padding: 0, listStyle: "none", maxWidth: 480, borderTop: "1px solid #E4E0D6" }}>
            {[
              "Sometimes a business has traffic but no signups.",
              "Sometimes people visit the website but don't understand the product.",
              "Sometimes the content is good, but it's reaching the wrong audience.",
              "And sometimes the team is doing a lot of marketing without knowing which activity is bringing customers.",
            ].map((t) => (
              <li key={t} style={{ padding: "12px 0", borderBottom: "1px solid #E4E0D6", fontSize: 16.5, lineHeight: 1.5, color: "#202821", fontWeight: 500 }}>{t}</li>
            ))}
          </ul>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4A524B" }}>
            I start by figuring out where things are going wrong.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4A524B" }}>
            That could be your search visibility, positioning, content, conversion rate or customer acquisition strategy.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#202821", fontWeight: 500 }}>
            Once the problem is clear, we can stop guessing and work on what matters.
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <HomeArt
            src="/assets/home/03-bottleneck-before-after.svg"
            width={730}
            height={430}
            alt="Before: scattered channels pour into a cracked funnel with weak results. After: connected channels feed a working funnel and growing results."
            maxWidth={560}
          />
          <figcaption
            className="max-md:!text-center"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 8,
              paddingTop: 14,
              borderTop: "1px solid #E4E0D6",
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#687068",
            }}
          >
            <span>More activity, same leaks</span>
            <span style={{ color: "#7F5F26" }}>Constraint fixed, growth compounds</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
