import Hero from "./HomeComponents/Hero";
import Proof from "./HomeComponents/Proof";
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
