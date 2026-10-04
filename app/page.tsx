import Hero from "./HomeComponents/Hero";
import Proof from "./HomeComponents/Proof";
import WhatIDo from "./HomeComponents/WhatIDo";
import Compare from "./HomeComponents/Compare";
import Work from "./HomeComponents/Work";
import Companies from "./HomeComponents/Companies";
import Philosophy from "./HomeComponents/Philosophy";
import Team from "./HomeComponents/Team";
import Fit from "./HomeComponents/Fit";
import Reviews from "./HomeComponents/Reviews";
import Process from "./HomeComponents/Process";
import Services from "./HomeComponents/Services";
import Pricing from "./HomeComponents/Pricing";
import Skills from "./HomeComponents/Skills";
import Tools from "./HomeComponents/Tools";
import About from "./HomeComponents/About";
import FAQ from "./HomeComponents/FAQ";
import CTA from "./HomeComponents/CTA";
import { FAQS } from "./HomeComponents/faqData";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Growth Marketing Specialist for SaaS | Zain Ul Abdin",
  description:
    "Growth marketing specialist for SaaS and service businesses. SEO, Reddit, social, content and ads from one person. 100K+ users brought in.",
  path: "/",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, paras]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: paras.join(" "),
    },
  })),
};

export default function Home() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Proof />
      <WhatIDo />
      <Compare />
      <Work />
      <Companies />
      <Philosophy />
      <Team />
      <Fit />
      <Reviews />
      <Process />
      <Services />
      <Pricing />
      <Skills />
      <Tools />
      <About />
      <FAQ />
      <CTA />
    </main>
  );
}
