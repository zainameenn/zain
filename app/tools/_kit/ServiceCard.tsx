import Link from "next/link";
import e from "@/app/_design/editorial.module.css";
import { SERVICES, formatPrice, startingPrice, type ServiceId } from "@/lib/pricing";
import k from "./kit.module.css";

// No server only imports, so a client component (the ad calculator's goal switch) can render it too.

/** "Need help with this instead?": one service, its real starting price from lib/pricing.ts. */
export function ServiceCard({ id, why }: { id: ServiceId; why: string }) {
  const s = SERVICES[id];
  const p = startingPrice(s);
  const price = formatPrice(p);
  return (
    <div className={k.service}>
      <div>
        <p className={e.eyebrow}>Need help with this instead?</p>
        <h2 className={e.h2}>{s.name}</h2>
        <p className={k.serviceWhy}>{why}</p>
        <p className={k.serviceNote}>The free tool stays free and fully usable. The paid work is me doing it with you, hands on: research, decisions and the follow through.</p>
      </div>
      <div className={k.serviceBox}>
        <p className={k.servicePrice}>
          {price.amount} <span>{price.note}</span>
        </p>
        <p className={k.servicePkg}>{p.name}: {p.forWho}</p>
        <ul className={k.serviceList}>
          {p.highlights.slice(0, 3).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className={k.serviceActions}>
          <Link href={`${s.href}#pricing`} className={`${e.btn} ${e.btnPrimary}`}>See {s.name.toLowerCase()} packages</Link>
          <Link href="/pricing" className={k.textLink}>Compare all pricing</Link>
        </div>
      </div>
    </div>
  );
}

