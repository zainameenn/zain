import { Img } from "./Img";
export default function Team() {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div
        style={{
          display: "grid",
          gap: "32px clamp(32px,4vw,56px)",
          alignItems: "center",
          padding: "clamp(32px,4vw,56px) clamp(16px,2vw,28px) clamp(32px,4vw,56px) clamp(28px,5.5vw,80px)",
          borderRadius: 28,
          background: "#F8F6F4",
          border: "1px solid #E4E0D6",
        }}
        className="md:!grid-cols-2 max-md:!px-6"
      >
        <div>
          <h2 className="max-md:!text-balance" style={{ textAlign: "center", margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            A Digital Marketing Specialist Who Can Handle{" "}
            <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>More Than One Channel.</em>
          </h2>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#202821", fontWeight: 500 }}>
            You don&apos;t always need a separate SEO consultant, content writer, social media manager, Reddit marketer and marketing strategist.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4A524B" }}>
            Especially when you&apos;re a small SaaS team or a growing service business.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4A524B" }}>
            I work across these areas because they affect each other.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4A524B" }}>
            Your SEO strategy influences what you write. Your content can become social media material. Reddit conversations can reveal what customers are searching for. Your landing page determines whether the resulting traffic converts.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4A524B" }}>
            When those activities are connected, you spend less time coordinating and more time learning what&apos;s actually working.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#202821", fontWeight: 500 }}>
            That&apos;s how I approach digital marketing.
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0, width: "100%" }}>
          <Img
            src="/assets/v12/art-a.webp"
            alt="Illustration: strategy, search, Reddit, social, design and ads cards all connecting to one marketer at a desk"
            width={1448}
            height={1086}
            loading="lazy"
            style={{ display: "block", width: "100%", height: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </figure>
      </div>
    </section>
  );
}
