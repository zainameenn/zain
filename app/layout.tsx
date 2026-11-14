import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import { bodyFont, displayFont } from "./_design/fonts";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";
import { identityGraph } from "@/lib/structuredData";

// Only the small mobile "Menu" label uses Inter, so it loads without a preload.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--nf-inter", preload: false });
// One type system for the whole site (November 2026): Lora for headings, Figtree for text, as on the tool pages.
// The older font names (--nf-general-sans, --nf-serif, --nf-geist) point at these in globals.css.

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
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${inter.variable}`}>
      <head>

        {/* Structured data: website, Person and Organization. A plain script so crawlers and agents see it without running JavaScript. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identityGraph) }} />
      </head>

      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />

        {/* ✅ Google Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-T3ZK018Y8C"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3ZK018Y8C');
          `}
        </Script>

        {/* ✅ Microsoft Clarity, loaded on the visitor's first scroll, tap, click or keypress.
            Clarity sets third party cookies, so loading it only once someone interacts keeps
            page load clean (Lighthouse Best Practices) while still recording real sessions. */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(){
              var events=["scroll","pointerdown","keydown","touchstart"],done=false;
              function load(){
                if(done)return;done=true;
                events.forEach(function(e){removeEventListener(e,load)});
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "yp1n9hbiei");
              }
              events.forEach(function(e){addEventListener(e,load,{once:true,passive:true})});
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
