import type { ReactNode } from "react";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import { ONE_TIME, SEO_AUDIT, SERVICES, formatPrice, type CompareGroup, type Package, type Service, type ServiceId } from "@/lib/pricing";
import s from "./pricing.module.css";

// Shared pricing building blocks. Every heading here is centered; lists, table rows and answers stay left aligned.

const FREE_CHECK = ONE_TIME[0];
const ACCENT = { fontFamily: "var(--nf-serif),serif", fontStyle: "italic" as const, fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" };

export function PricingHeading({ eyebrow, regular, accent, intro, as: Tag = "h2", id }: { eyebrow?: string; regular: ReactNode; accent?: ReactNode; intro?: ReactNode; as?: "h1" | "h2"; id?: string }) {
  return (
    <div className={s.head}>
      {eyebrow ? <div className={s.eyebrow}>{eyebrow}</div> : null}
      <Tag id={id} className={Tag === "h1" ? s.h1 : s.h2}>
        {regular} {accent ? <em style={ACCENT}>{accent}</em> : null}
      </Tag>
      {intro ? <p className={s.intro}>{intro}</p> : null}
    </div>
  );
}

export function PackageCard({ pkg, href, compareHref }: { pkg: Package; href: string; compareHref?: string }) {
  const price = formatPrice(pkg);
  return (
    <article className={pkg.label ? `${s.card} ${s.cardLabeled}` : s.card} aria-labelledby={`pkg-${pkg.id}`}>
      <div className={s.cardLabel}>{pkg.label ?? ""}</div>
      <h3 id={`pkg-${pkg.id}`} className={s.cardName}>
        {pkg.name}
      </h3>
      <p className={s.cardFor}>{pkg.forWho}</p>
      <div className={s.price}>
        <span className={s.amount}>{price.amount}</span>
        <span className={s.per}>{price.note}</span>
      </div>
      <p className={s.benefit}>{pkg.benefit}</p>
      <ul className={s.list}>
        {pkg.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <p className={s.notIncluded}>{pkg.notIncluded?.length ? `Not included: ${pkg.notIncluded.join(", ").toLowerCase()}.` : ""}</p>
      <div className={s.cardFoot}>
        <a href={href} className={pkg.label ? `${s.btn} ${s.btnDark}` : s.btn}>
          {pkg.cta}
          <ArrowIcon />
        </a>
        {compareHref ? (
          <a href={compareHref} className={s.compareLink}>
            Compare everything included
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function PackageGrid({ packages, href, compareHref }: { packages: Package[]; href: string; compareHref?: string }) {
  return (
    <div className={s.grid}>
      {packages.map((p) => (
        <PackageCard key={p.id} pkg={p} href={href} compareHref={compareHref} />
      ))}
    </div>
  );
}

const cell = (v: string | boolean) =>
  v === true ? (
    <span className={s.yes}>
      <span aria-hidden>✓</span>
      <span className={s.sr}>Included</span>
    </span>
  ) : v === false ? (
    <span className={s.no}>
      <span aria-hidden className={s.dash} />
      <span className={s.sr}>Not included</span>
    </span>
  ) : (
    v
  );

export function ComparisonTable({ caption, columns, groups, id }: { caption: string; columns: string[]; groups: CompareGroup[]; id?: string }) {
  return (
    <div className={s.tableWrap} id={id} tabIndex={0} role="region" aria-label={caption}>
      <table className={s.table}>
        <caption className={s.sr}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={s.rowHead}>
              <span className={s.sr}>Feature</span>
            </th>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.group}>
            <tr className={s.groupRow}>
              <th scope="colgroup" colSpan={columns.length + 1}>
                {g.group}
              </th>
            </tr>
            {g.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className={s.rowHead}>
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i}>{cell(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export function PricingFaqs({ faqs }: { faqs: [string, string][] }) {
  return (
    <dl className={s.faqs}>
      {faqs.map(([q, a]) => (
        <div key={q}>
          <dt>{q}</dt>
          <dd>{a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PricingCTA({ heading, accent, text, href, label }: { heading: string; accent?: string; text: string; href: string; label: string }) {
  return (
    <div className={s.cta}>
      <h3 className={s.ctaHeading}>
        {heading} {accent ? <em style={ACCENT}>{accent}</em> : null}
      </h3>
      <p className={s.ctaText}>{text}</p>
      <a href={href} className={`${s.btn} ${s.btnLight}`}>
        {label}
        <ArrowIcon />
      </a>
    </div>
  );
}

/** The full pricing block for one service page: heading, cards, comparison, definitions, exclusions, FAQs and CTA. */
export function ServicePricing({ service: id, contactHref = "#contact" }: { service: ServiceId; contactHref?: string }) {
  const svc: Service = SERVICES[id];
  const compareId = `${id}-compare`;
  return (
    <section id="pricing" className={s.section} aria-labelledby={`${id}-pricing-heading`}>
      <PricingHeading id={`${id}-pricing-heading`} eyebrow="Pricing" regular={svc.heading.regular} accent={svc.heading.accent} intro={svc.intro} />
      <PackageGrid packages={svc.packages} href={contactHref} compareHref={`#${compareId}`} />

      {id === "seo" ? (
        <div className={s.extra}>
          <div className={s.extraText}>
            <h3 className={s.extraHeading}>Not ready for monthly? Start with the audit.</h3>
            <ul className={s.inlineList}>
              {SEO_AUDIT.covers.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className={s.extraPrice}>
            <span className={s.amount}>${SEO_AUDIT.price}</span>
            <span className={s.per}>one time</span>
            <a href={contactHref} className={s.textLink}>
              Start with the audit <ArrowIcon />
            </a>
          </div>
        </div>
      ) : null}

      {id === "social" ? (
        <div className={s.extra}>
          <div className={s.extraText}>
            <h3 className={s.extraHeading}>Not sure yet? Start with the free check.</h3>
            <p className={s.helpLine} style={{ margin: 0 }}>
              {FREE_CHECK.scope}
            </p>
          </div>
          <div className={s.extraPrice}>
            <span className={s.amount}>Free</span>
            <a href={contactHref} className={s.textLink}>
              Get the free check <ArrowIcon />
            </a>
          </div>
        </div>
      ) : null}

      <div className={s.block}>
        <PricingHeading regular="Compare" accent="every package." />
        <ComparisonTable id={compareId} caption={`${svc.name} packages compared`} columns={svc.packages.map((p) => p.name)} groups={svc.compare} />
      </div>

      <div className={`${s.block} ${s.twoCol}`}>
        {svc.definitions?.length ? (
          <div>
            <h3 className={s.smallHeading}>What counts as what</h3>
            <dl className={s.defs}>
              {svc.definitions.map((d) => (
                <div key={d.term}>
                  <dt>{d.term}</dt>
                  <dd>{d.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
        <div>
          <h3 className={s.smallHeading}>Not included in any plan</h3>
          <ul className={s.list}>
            {svc.excluded.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={s.smallHeading}>Quick answers</h3>
          <PricingFaqs faqs={svc.faqs} />
        </div>
      </div>

      <p className={s.helpLine}>
        Not sure which one fits?{" "}
        <a href={contactHref} className={s.textLink}>
          Tell me what&apos;s stuck <ArrowIcon />
        </a>
      </p>
    </section>
  );
}
