// Google AdSense runs on the free tools only (/tools and every tool page), not the rest of the site.
// A plain async script: React places it in the server rendered <head>, where AdSense looks for it.
export default function ToolsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9252697472717831" crossOrigin="anonymous" />
      {children}
    </>
  );
}
