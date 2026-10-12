// Shapes shared by the page template, the client workspace and the API route.
// Everything here is plain data, so it can cross from server to client as props.

export type ToolGroup = "Social" | "SEO" | "Ecommerce" | "LinkedIn";

/** `when`: the field only shows (and only counts) while another field has this value. `hint`: small text under the label. */
type Base = { name: string; label: string; hint?: string; when?: { field: string; equals: string } };
export type ToolField =
  | (Base & { type: "text" | "textarea"; placeholder?: string; required?: boolean; maxLength: number })
  | (Base & { type: "select"; options: string[]; required?: boolean; defaultValue?: string; placeholder?: string })
  | (Base & { type: "chips"; options: string[]; defaultValue?: string; required?: boolean })
  | (Base & { type: "multi"; options: string[]; max: number; required?: boolean })
  | (Base & { type: "toggle"; defaultOn: boolean })
  | (Base & { type: "date"; required?: boolean })
  /** Tabs above the form that switch the form between modes (e.g. new or improve). */
  | (Base & { type: "mode"; options: { value: string; label: string }[]; defaultValue: string });

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
};
