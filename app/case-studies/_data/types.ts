// Shape of one case study page. Each case study is one data file in this folder,
// rendered by the shared components in ../_components.

/** Text with optional inline styling: bold, gold (on dark backgrounds) or italic serif accent. */
export type RichText = string | (string | { bold: string } | { gold: string } | { accent: string })[];

/** A heading with a regular part and an italic serif accent part on its own line. */
export type AccentHeading = { text: string; accent: string };

export type LinkItem = { label: string; href: string };

export type ImageAsset = { src: string; width: number; height: number; alt: string };

export type Screenshot = ImageAsset & {
  caption: string;
  /** Spans both columns on desktop. */
  wide?: boolean;
  /** Frame background shown behind transparent edges. */
  background?: string;
  /** Gold boxes drawn over the image, as percentages of its size. */
  highlights?: { left: string; top: string; width: string; height: string }[];
};

/** Icons available to the "how it compounded" flow. */
export type FlowIcon = "reddit" | "instagram" | "pinterest" | "facebook" | "search" | "trend" | "award" | "sprout" | "book";

/** One step in a "how it compounded" chain. When a chain has descriptions, it shows as stacked cards. */
export type FlowStep = { label: string; icons: FlowIcon[]; description?: string };

export type Phase = {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Shows the intro in the darker body color. */
  introStrong?: boolean;
  body?: string;
  bullets?: RichText[];
  /** Shows the body after the bullets instead of before them. */
  bodyAfterBullets?: boolean;
  /** Hidden while href is empty. */
  link?: LinkItem;
  screenshots: Screenshot[];
  /** "single" shows the screenshots in one narrow column instead of the two column grid. */
  screenshotsLayout?: "grid" | "single";
  screenshotsNote?: string;
  /** Hidden while href is empty. */
  driveLink?: LinkItem;
  /** Hidden while title or url is empty. */
  articleExample?: { title: string; url: string; result: string };
  /** Example post or answer card. Hidden while title or views is empty. */
  example?: { heading: string; label?: string; title: string; views: string };
  callout?: { title: string; text: RichText };
  attribution?: { title: string; text: RichText; tracked: [string, string]; untracked: [string, string]; ratio: [number, number] };
};

export type CaseStudy = {
  slug: string;
  name: string;
  seo: { title: string; description: string; ogImage: ImageAsset };
  /** "On this page" links, shown in a side rail on wide screens. Ids must match section ids. */
  toc: { id: string; label: string }[];
  tags: string[];
  logo: ImageAsset;
  hero: { title: string; accent: string; intro: string; primaryCta: LinkItem; secondaryCta: LinkItem };
  quickFacts: { label: string; value?: string; links?: LinkItem[]; large?: boolean }[];
  keyResults: { value: string; label: string }[];
  keyResultsSource: string;
  /** Section id for the key results strip, e.g. "results" when there's no separate results section. */
  keyResultsId?: string;
  /** Without an avatar photo, the initials show in a dark circle. */
  testimonial?: { /** Section label, "From the founder" when empty. */ heading?: string; label: string; quote: string; name: string; role: string; avatar?: ImageAsset; initials?: string; originalHref: string };
  summary: { heading: string; items: { title: string; text: string; emphasis?: boolean }[] };
  /** lead shows large above the body; closing shows large below it. */
  product: { eyebrow: string; heading: string; lead?: string; body: string; closing?: string };
  problem: { eyebrow: string; heading: AccentHeading; paragraphs: RichText[]; closing?: RichText };
  phases: { eyebrow: string; heading: AccentHeading; items: Phase[] };
  compounding: { eyebrow: string; heading: AccentHeading; intro?: string; flows: FlowStep[][]; footnote?: string };
  effort: { heading: string; items: { value: string; label: string }[] };
  /** Optional separate results section. */
  results?: {
    eyebrow: string;
    heading: AccentHeading;
    items: { value: string; label: string; note?: string }[];
    privateNote: { title: string; text: string };
    /** Entries with an empty src are hidden. */
    gallery: Screenshot[];
  };
  /** Hidden while link.href is empty. */
  drive: { heading: string; text: string; link: LinkItem };
  lessons: { eyebrow: string; heading: AccentHeading; items: { title: string; text: string }[]; /** Hidden while href is empty. */ articleLink: LinkItem };
  servicesUsed: { heading: string; items: LinkItem[] };
  related: {
    eyebrow: string;
    heading: string;
    items: { tags: string; logo: ImageAsset; stat: string; statLabel: string; text: string; link: LinkItem }[];
    allLink: LinkItem;
  };
  cta: { heading: AccentHeading; text: string; link: LinkItem };
};
