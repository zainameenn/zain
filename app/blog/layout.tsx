import { PreviewBanner } from "./_components/PreviewBanner";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PreviewBanner />
    </>
  );
}
