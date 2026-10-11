// Site-wide identity for search engines and AI agents: the website, Zain as a Person and
// the business as an Organization. Only facts already shown on the site go in here.

export const SITE = "https://www.zainameen.com";
export const PERSON_ID = `${SITE}/#person`;
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

// Social profiles linked in the site footer.
const SAME_AS = [
  "https://www.linkedin.com/in/zain-ameen/",
  "https://www.facebook.com/profile.php?id=61560222560607",
  "https://www.instagram.com/zainn.ms/",
  "https://x.com/zainnameen",
  "https://www.threads.com/@zainn.ms",
  "https://www.pinterest.com/zainameenn",
  "https://github.com/zainameenn",
  "https://www.upwork.com/freelancers/~0135cf0916aa8d26bf",
];

const ADDRESS = { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" };

export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Zain Ul Abdin",
      url: `${SITE}/`,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Zain Ul Abdin",
      alternateName: "Zain Ameen",
      jobTitle: "Growth Marketing Specialist",
      description: "Growth marketing specialist for SaaS and service businesses. Finds what's blocking growth, then fixes it himself: SEO, Reddit, social, content, design and ads.",
      url: `${SITE}/about`,
      email: "mailto:hello@zainameen.com",
      address: ADDRESS,
      worksFor: { "@id": ORG_ID },
      sameAs: SAME_AS,
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: "Zain Ul Abdin, Growth Marketing",
      url: `${SITE}/`,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
      image: `${SITE}/logo.png`,
      description: "Growth marketing for SaaS and service businesses: SEO, Reddit marketing, social media, content, design and Google and Meta ads, from one specialist instead of a team.",
      founder: { "@id": PERSON_ID },
      email: "hello@zainameen.com",
      address: ADDRESS,
      areaServed: ["US", "AE", "EU"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@zainameen.com",
        url: `${SITE}/contact`,
      },
      sameAs: SAME_AS,
    },
  ],
};
