// Shapes shared by the page template, the client workspace and the API route.
// Everything here is plain data, so it can cross from server to client as props.

export type ToolGroup = "Social" | "SEO" | "Ecommerce" | "LinkedIn" | "Naming" | "Utilities" | "Copy";

/** `when`: the field only shows (and only counts) while another field has this value. `hint`: small text under the label. */
/**
 * `when`: the field only shows (and only counts) while another field has this value. `hint`: small text under the label.
 * `group`: where a studio form places the field (essentials, style, format, advanced). Older forms ignore it.
 */
type Base = { name: string; label: string; hint?: string; when?: { field: string; equals: string }; group?: "essentials" | "style" | "format" | "advanced" };
export type ToolField =
  | (Base & { type: "text" | "textarea"; placeholder?: string; required?: boolean; maxLength: number })
  | (Base & { type: "select"; options: string[]; required?: boolean; defaultValue?: string; placeholder?: string })
  | (Base & { type: "chips"; options: string[]; defaultValue?: string; required?: boolean })
  | (Base & { type: "multi"; options: string[]; max: number; required?: boolean })
  | (Base & { type: "toggle"; defaultOn: boolean })
  | (Base & { type: "date"; required?: boolean })
  /** Tabs above the form that switch the form between modes (e.g. new or improve). */
  | (Base & { type: "mode"; options: { value: string; label: string }[]; defaultValue: string })
  /** One choice from a few options, shown as a segmented control. */
  | (Base & { type: "segmented"; options: string[]; defaultValue: string; required?: boolean })
  /** Searchable list of suggestions that also accepts the visitor's own wording. */
  | (Base & { type: "combobox"; options: string[]; placeholder?: string; required?: boolean; maxLength: number; otherLabel?: string });

export type ToolInput = Record<string, string | boolean>;

/** Rich text: **bold** and [text](https://link) are the only markup. */
export type Rich = string;

export type Table = { head: string[]; rows: Rich[][] };

export type SectionBlock = { p: Rich } | { ol: Rich[] } | { ul: Rich[] } | { h3: string } | { table: Table };

/** A character limit, either fixed or picked by a form answer (e.g. comment length). */
export type Limit = number | { field: string; map: Record<string, number>; fallback: number };

export type ResultView =
  | {
      kind: "options";
      limit: Limit;
      /** Highlights the part people see first: the first line, or the first N characters. */
      fold?: { chars?: number; firstLine?: boolean; label?: string };
      hashtags?: boolean;
      /** Approximate Google result preview. */
      serp?: "title" | "description";
      /** Pixel width bar for title tags (canvas, Arial 20px). */
      widthBar?: boolean;
      words?: boolean;
      /** Counter turns amber outside this range. */
      target?: [number, number];
      /** Field holding the visitor's current title: shows the before and after panel. */
      beforeAfter?: string;
      shorter?: string;
      punchier?: string;
      funnier?: string;
      /** Extra short ideas under the cards (e.g. Instagram name field ideas), each checked against its own limit. */
      ideas?: { key: string; limit: number; heading: string; helper: string };
    }
  | { kind: "calendar" }
  | { kind: "plan" }
  | { kind: "product" }
  | { kind: "about"; limit: number; fold: number; foldLabel: string; tabs: [string, string] }
  | { kind: "post"; limit: number; fold: number; foldLabel: string }
  | { kind: "utm" };

export type Workspace = {
  fields: ToolField[];
  button: string;
  secondary: string;
  /** Values the secondary button fills in. */
  exampleInput: ToolInput;
  resultsHeading: string;
  emptyState: string;
  more: string;
  dataNote: string;
  /** Shown under the results instead of under the button. */
  resultsNote?: string;
  /** Small print under previews. */
  smallPrint?: string;
  errorText: string;
  result: ResultView;
  /** Results take the full width below the form. */
  wide?: boolean;
  /** A live profile mockup beside the results (bio tools). */
  preview?: PreviewConfig;
};

/** One illustrative profile or post for the preview and the example cards. `text` is the bio or the caption. */
export type DemoProfile = { username: string; name: string; text: string; link?: string; badge?: string };

/** Platform skins for the live preview. Profiles for bio tools, posts for caption tools. */
export type PreviewSkin = "instagram" | "tiktok" | "x" | "threads" | "facebook" | "instagram-post";

export type PreviewConfig = {
  /** Platform skin. Each platform gets its own look; the component is shared. */
  skin: PreviewSkin;
  limit: number;
  /** Profiles the demo cycles through before the visitor generates anything. */
  demo: DemoProfile[];
  /** Labels: pill, caption under the phone, mobile disclosure, Preview button, theme toggle. */
  labels: { pill: string; caption: string; disclosure: string; previewButton: string; theme: string };
  /** Username and link shown on the visitor's own profile. */
  live: { username: string; link: string };
};

export type ToolExample = {
  inputLabel: string;
  input: ToolInput;
  output?: string;
  /** The weaker version this example replaces. */
  before?: string;
  why?: Rich;
  table?: Table;
  /** Small input summary shown instead of the field list. */
  inputText?: string;
  /** Shows the output on a mini profile. */
  profile?: DemoProfile;
};

export type ExampleColumn = { label: string; value: "inputLabel" | "before" | "output" | "why" | `input.${string}` };

export type Examples = {
  heading: string;
  intro?: SectionBlock[];
  outro?: SectionBlock[];
  /** cards: grid. wide: one per row, for long outputs. table: a table with a "Use this example" column. */
  layout?: "cards" | "wide" | "table";
  /** Small label under the heading. Defaults to "Examples (illustrative)". */
  label?: string;
  columns?: ExampleColumn[];
  beforeLabel?: string;
  afterLabel?: string;
  items: ToolExample[];
};

export type Cta = { heading: string; copy?: string; button: string; href: string | null };

export type ToolPage = {
  slug: string;
  name: string;
  keyword: string;
  group: ToolGroup;
  metaTitle: string;
  metaDescription: string;
  h1: { regular: string; accent: string };
  heroDescription: string;
  accessNote: string;
  workspace: Workspace;
  howTo: { heading: string; intro?: Rich; steps: Rich[]; outro?: Rich };
  examples: Examples;
  sections: { heading: string; blocks: SectionBlock[] }[];
  faqs: { q: string; a: Rich }[];
  ctas: Cta[];
  related: { slug: string; text?: string }[];
  /** Guides and case studies after the related tools. Hidden while href is null. */
  extraLinks: { text: string; href: string | null }[];
  /** Server side: which prompt block runs and the fixed values it is filled with. null for tools with no AI. */
  api: { block: string; vars: Record<string, string> } | null;
  /** Pages on the redesigned studio layout. The [slug] template renders StudioPage when this is set. */
  studio?: StudioContent;
};

// ---------- Studio pages: the redesigned tool layout (first used by the Instagram bio generator) ----------

export type StudioImage = { src: string; alt: string; width: number; height: number };

/** A real account, quoted only when its bio was checked against the live profile. */
export type BrandExample = {
  brand: string;
  handle: string;
  url: string;
  logo: StudioImage | null;
  /** The bio as seen on the profile, or null when it could not be verified (then `illustrative` is shown instead). */
  bio: string | null;
  illustrative?: string;
  /** When the bio was checked, e.g. "October 2026". */
  checked?: string;
  style: "Minimal" | "Brand-focused" | "Personality" | "Action-focused";
  why: Rich;
  lesson: Rich;
  /** Footer link text. Defaults to "View <platform> profile"; caption examples use "View post". */
  linkLabel?: string;
};

export type RelatedIcon = "caption" | "bio" | "chat" | "x";

/** Every studio section opens the same way as the service pages: eyebrow, H2 with an italic accent line, short sub. */
export type StudioHead = { eyebrow?: string; heading: string; accent?: string; intro?: Rich };

/** Settings a "Use this style" button sends to the generator. */
export type StyleSettings = { tone?: string; emoji?: string; format?: string; goal?: string; account_type?: string; category?: string; post_type?: string; length?: string; style?: string };

export type StudioSection = StudioHead &
  (
    | { kind: "steps"; steps: { title: string; text: Rich; visual: "account" | "style" | "copy" }[] }
    | { kind: "gallery"; note?: Rich; items: BrandExample[] }
    | {
        kind: "creator";
        profile: { handle: string; name: string; url: string; checked: string; photo: StudioImage & { credit: Rich }; link?: string; category?: string; location?: string; postType?: string };
        /** The real bio, line by line. `mark` numbers the line to match a point. */
        lines: { text: string; mark?: number }[];
        nameMark?: number;
        /** Numbers the profile link to match a point. */
        linkMark?: number;
        categoryMark?: number;
        /** What sits between lines. Line breaks by default; " | " for a one line bio split into marked parts. */
        join?: string;
        points: { title: string; text: Rich }[];
        note?: Rich;
      }
    | { kind: "compare"; image?: StudioImage; before: string; after: string; changes: Rich[] }
    | {
        kind: "styles";
        styles: { name: string; when: string; bio: string; why: Rich; settings: StyleSettings; dark?: boolean }[];
        formats?: { label: string; bio: string }[];
        image?: StudioImage;
      }
    | {
        kind: "practices";
        items: { title: string; text: Rich; featured?: boolean; example?: { good: string; bad?: string; goodLabel?: string } | { count: number } }[];
      }
    | { kind: "faq" }
    | { kind: "related"; tools: { slug: string; text: string; icon: RelatedIcon }[] }
    | { kind: "cta"; copy: string; button: string; href: string }
  );

/** Which profile the phone mockups show. */
export type ProfileSkin = "instagram" | "tiktok" | "x" | "threads" | "facebook" | "youtube" | "pinterest" | "youtube-watch" | "google-title" | "google-description" | "pinterest-title" | "pinterest-description" | "etsy" | "product" | "linkedin-headline" | "linkedin-about" | "linkedin-post" | "linkedin-comment";


export type StudioContent = {
  /** Phone skin for the generator and the creator breakdown. Defaults to Instagram. */
  skin?: ProfileSkin;
  /** Which generator the page runs. Bio by default; caption pages use the post preview studio. */
  tool?: "bio" | "caption" | "legacy" | "v3";
  /** What the caption studio calls its results ("caption", "title", "description"). */
  noun?: string;
  /** Accessible name for the generator, e.g. "TikTok bio generator". */
  label?: string;
  /** Platform name in section labels, e.g. "View X profile". Defaults to Instagram. */
  platform?: string;
  lede: Rich;
  sub: string;
  trust: string;
  sections: StudioSection[];
};
