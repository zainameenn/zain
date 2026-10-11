import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { ArrowIcon } from "../../HomeComponents/icons";
import { BODY, CARD, EYEBROW, GENERAL_SANS, LINE, MUTED } from "./styles";

const TEXT_LINK = "inline-flex items-center gap-[10px] min-h-[44px] font-semibold border-b-[1.5px] border-[#1C1C1C] hover:!text-[#7A5C33] hover:border-[#7A5C33]";

/** Logo, tags, headline result, one line on the work and a link to the case study. */
export function CaseStudyCard({ study, linkLabel }: { study: CaseStudy; linkLabel?: string }) {
  const { card, logo } = study;
  return (
    <li style={{ borderRadius: 20, border: `1px solid ${LINE}`, background: CARD, padding: "clamp(22px,2.4vw,28px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
      <div style={{ ...EYEBROW, fontSize: 11.5 }}>{card.tags}</div>
      <span style={{ width: "100%", height: 96, borderRadius: 14, background: "#FFFFFF", border: "1px solid #E4E0D7", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 24px" }}>
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} sizes="200px" style={{ display: "block", maxHeight: 56, maxWidth: "80%", width: "auto", height: "auto", objectFit: "contain" }} />
      </span>
      <div style={{ width: "100%", paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
        <div style={{ fontFamily: GENERAL_SANS, fontSize: "clamp(30px,2.8vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {card.stat}
        </div>
        <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.45, color: MUTED }}>{card.statLabel}</div>
      </div>
      <p style={{ margin: 0, flex: 1, fontSize: 15.5, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{card.text}</p>
      <Link href={`/case-studies/${study.slug}`} className={TEXT_LINK} style={{ fontSize: 15 }}>
        {linkLabel ?? `Read the ${study.name.split(" ")[0]} case study`}
        <ArrowIcon />
      </Link>
    </li>
  );
}
