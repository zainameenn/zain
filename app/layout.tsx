import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";

export const metadata: Metadata = {
  title: "Growth Marketing Specialist for SaaS | Zain Ul Abdin",
  description:
    "Growth marketing specialist for SaaS and service businesses. SEO, Reddit, social media and ads, planned and done by one person. 100K+ users brought in.",
  authors: [{ name: "Zain Ul Abdin", url: "https://www.zainameen.com" }],
  creator: "Zain Ul Abdin",
  publisher: "Zain Ul Abdin",
  metadataBase: new URL("https://www.zainameen.com"),
  openGraph: {
    title: "Growth Marketing Specialist for SaaS | Zain Ul Abdin",
    description:
      "Growth marketing specialist for SaaS and service businesses. SEO, Reddit, social media and ads, planned and done by one person. 100K+ users brought in.",
    url: "https://www.zainameen.com",
    siteName: "Zain Ul Abdin",
    images: [
      {
        url: "/assets/v9/g07.png",
        width: 1448,
        height: 1086,
        alt: "Zain Ul Abdin, Growth Marketing Specialist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Marketing Specialist for SaaS | Zain Ul Abdin",
    description:
      "Growth marketing specialist for SaaS and service businesses. SEO, Reddit, social media and ads, planned and done by one person. 100K+ users brought in.",
    images: ["/assets/v9/g07.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap"
        />

        {/* ✅ Structured Data (Person + Contact Info) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: "Zain Ul Abdin",
                  jobTitle: "Growth Marketing Specialist",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressCountry: "PK",
                  },
                  email: "hello@zainameen.com",
                  sameAs: ["https://www.linkedin.com/"],
                },
                {
                  "@type": "ProfessionalService",
                  name: "Zain Ul Abdin, Growth Marketing",
                  areaServed: ["US", "AE", "EU"],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressCountry: "PK",
                  },
                  serviceType: [
                    "Growth strategy and GTM",
                    "SEO",
                    "Reddit marketing",
                    "Social media management",
                    "Google and Meta ads",
                    "Content and design",
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />

        {/* ✅ Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-T3ZK018Y8C"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3ZK018Y8C');
          `}
        </Script>
      </body>
    </html>
  );
}
