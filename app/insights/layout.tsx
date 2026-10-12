import { PreviewBanner } from "./_components/PreviewBanner";

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PreviewBanner />
    </>
  );
}
