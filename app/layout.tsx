import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";

export const metadata: Metadata = {
  authors: [{ name: "Zain Ul Abdin", url: "https://www.zainameen.com" }],
  creator: "Zain Ul Abdin",
  publisher: "Zain Ul Abdin",
  metadataBase: new URL("https://www.zainameen.com"),
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
                  "@type": "WebSite",
                  name: "Zain Ul Abdin",
                  url: "https://www.zainameen.com",
                },
                {
                  "@type": "Person",
                  name: "Zain Ul Abdin",
                  url: "https://www.zainameen.com",
                  alternateName: ["Zain Ameen"],
                  jobTitle: "Freelance Growth Marketer",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressCountry: "Pakistan",
                  },
                  email: "hello@zainameen.com",
                  sameAs: [
                    "https://www.linkedin.com/in/zain-ameen/",
                    "https://github.com/zainameenn",
                    "https://x.com/zainnameen",
                    "https://www.instagram.com/zainn.ms/",
                    "https://www.pinterest.com/zainameenn",
                    "https://www.threads.com/@zainn.ms",
                    "https://www.upwork.com/freelancers/~0135cf0916aa8d26bf",
                    "https://www.facebook.com/profile.php?id=61560222560607",
                  ],
                },
                {
                  "@type": "ProfessionalService",
                  name: "Zain Ul Abdin, Growth Marketing",
                  description: "Growth marketing for SaaS and service businesses: SEO, Reddit marketing, social media, content, design and Google and Meta ads.",
                  url: "https://www.zainameen.com",
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

        {/* ✅ Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yp1n9hbiei");
          `}
        </Script>
      </body>
    </html>
  );
}
