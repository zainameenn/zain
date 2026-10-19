import type { BrandExample, RelatedIcon, StudioSection } from "../types";
import { FAIR_USE, LINK_SEO_SERVICE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { ProfileSkin, StudioContent, ToolField, ToolInput, ToolPage } from "../types";

// One helper for every writing tool on the caption studio that keeps its existing prompt (page.api):
// it swaps in studio fields, the results setup and the page content. Captions and titles have their own helpers.

export type WriterConfig = {
  platform: string;
  noun: string;
  skin: ProfileSkin;
  fields: ToolField[];
  button: string;
  limit: number;
  example: ToolInput;
  dataNote: string;
  shorter?: string;
  /** Extra prompt vars to merge over the page's existing ones. */
  vars?: Record<string, string>;
};

export function studioWriterPage(page: ToolPage, c: WriterConfig, studio: StudioContent): ToolPage {
  return {
    ...page,
    workspace: {
      ...page.workspace,
      fields: c.fields,
      button: c.button,
      secondary: "Try an example",
      exampleInput: c.example,
      more: "Try another angle",
      dataNote: c.dataNote,
      result: { kind: "options", limit: c.limit, shorter: c.shorter },
      preview: undefined,
    },
    api: page.api ? { ...page.api, vars: { ...page.api.vars, ...c.vars } } : page.api,
    studio: { tool: "caption", noun: c.noun, skin: c.skin, label: `${page.name}`, platform: c.platform, ...studio },
  };
}

// ---------- Shared page sections: same layouts as every studio page, filled with each tool's own copy ----------

export type WriterCopy = {
  tool: string;
  noun: string;
  steps: [string, string][];
  gallery?: { heading: string; intro: string; note: string; items: BrandExample[] };
  compare: { intro: string; before: string; after: string; changes: string[] };
  styles: { intro: string; items: { name: string; when: string; text: string; why: string; settings: Record<string, string> }[] };
  practices: { title: string; text: string; good?: string; bad?: string; count?: number }[];
  related: { slug: string; text: string; icon?: RelatedIcon }[];
  cta: "seo" | "social";
};

export function writerStudio(c: WriterCopy, lede: string, sub: string): StudioContent {
  const sections: StudioSection[] = [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: c.tool,
      intro: "Three steps, about thirty seconds. The preview updates while you go.",
      steps: c.steps.map(([title, text], i) => ({ title, text, visual: (["account", "style", "copy"] as const)[i] })),
    },
    ...(c.gallery ? [{ kind: "gallery" as const, eyebrow: "Real examples", heading: c.gallery.heading, accent: "worth learning from", intro: c.gallery.intro, note: c.gallery.note, items: c.gallery.items }] : []),
    { kind: "compare", eyebrow: "Before and after", heading: "Fixing a weak", accent: c.noun, intro: c.compare.intro, before: c.compare.before, after: c.compare.after, changes: c.compare.changes },
    {
      kind: "styles",
      eyebrow: "Ideas",
      heading: `${c.noun.charAt(0).toUpperCase() + c.noun.slice(1)} ideas`,
      accent: "for every kind of page",
      intro: c.styles.intro,
      styles: c.styles.items.map((s, i) => ({ name: s.name, when: s.when, bio: s.text, why: s.why, settings: s.settings, dark: i === 1 })),
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: c.noun.charAt(0).toUpperCase() + c.noun.slice(1),
      accent: "best practices",
      intro: "Six habits that make the biggest difference.",
      items: c.practices.map((p, i) => ({
        title: p.title,
        text: p.text,
        featured: i === 0,
        example: p.count ? { count: p.count } : p.good ? { good: p.good, bad: p.bad } : undefined,
      })),
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    { kind: "related", eyebrow: "Keep going", heading: "More free tools for", accent: "your content", tools: c.related.map((r) => ({ ...r, icon: r.icon ?? "caption" })) },
    c.cta === "seo"
      ? { kind: "cta", heading: "Better titles get the click.", accent: "Let's make the whole page rank.", copy: "I help SaaS and service businesses turn search into signups, with content and SEO that bring the right visitors.", button: "Explore SEO services", href: LINK_SEO_SERVICE ?? "/services" }
      : { kind: "cta", heading: "Better copy is a start.", accent: "Let's make the rest of your content work too.", copy: "I help SaaS and service businesses turn content, search and social into real growth.", button: "Explore social media marketing", href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services" },
  ];
  return { lede, sub, trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`, sections };
}

/** A real example card: a page, video or pin, checked on a given date. */
export const realExample = (brand: string, handle: string, url: string, text: string, style: BrandExample["style"], why: string, checked: string, linkLabel: string): BrandExample => ({
  brand,
  handle,
  url,
  logo: null,
  bio: text,
  checked,
  style,
  why,
  lesson: "",
  linkLabel,
});

/**
 * Moves an older tool form onto the studio: chips become segmented controls with a default,
 * required fields go first, choices next, and optional extras under "More ways to personalize".
 */
export function studioFields(fields: ToolField[], extras: ToolField[] = []): ToolField[] {
  const out = fields.map((f): ToolField => {
    if (f.type === "chips") return { name: f.name, label: f.label, type: f.options.length > 3 ? "select" : "segmented", options: f.options, defaultValue: f.defaultValue ?? f.options[0], group: "style" } as ToolField;
    if (f.type === "select") return { ...f, defaultValue: f.defaultValue ?? f.options[0], group: "style" };
    if (f.type === "text" || f.type === "textarea") return { ...f, label: f.label.replace(/ \(optional[^)]*\)/i, ""), group: f.required ? "essentials" : "advanced" };
    return f;
  });
  return [...out, ...extras];
}
