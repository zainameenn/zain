// Page copy for the ten tools added in October 2026. One file per tool in lib/tools/v3/content/<slug>.ts.
// Rich text: **bold** and [text](https://link) are the only markup. No em or en dashes anywhere.

export type NewToolContent = {
  slug: string;
  /** Visible tool name, e.g. "Etsy Shop Name Generator". The H1 is this plus an italic "(100% FREE)". */
  name: string;
  /** Main keyword, lower case, e.g. "etsy shop name generator". */
  keyword: string;
  /** "<Name> (100% FREE)". */
  metaTitle: string;
  /** 120 to 155 characters, starts with or leads with the keyword. */
  metaDescription: string;
  /** First sentence under the H1. Must start with "This <keyword>" or "<Keyword>". One or two sentences. */
  lede: string;
  /** One short line under the lede: what you get. */
  sub: string;
  /** Small trust line, e.g. "Free, no signup. Your inputs are sent to an AI provider to write the result and aren't stored." */
  trust: string;
  /** How to use it: exactly three steps. */
  steps: [{ title: string; text: string }, { title: string; text: string }, { title: string; text: string }];
  /** Realistic worked examples (3 or 4). `input` is a short summary of what was entered, `output` the result, `why` one line. */
  examples: { heading: string; accent?: string; intro?: string; items: { title: string; input: string; output: string; why: string }[] };
  /** Helpful guidance: what makes a good result, rules, common mistakes (4 to 6 items). */
  guidance: { heading: string; accent?: string; intro?: string; items: { title: string; text: string }[] };
  /** 7 or 8 FAQs that answer what searchers actually ask. Accurate, sourced where it matters. */
  faqs: { q: string; a: string }[];
  /** 3 or 4 related tool slugs with a short reason. Only slugs from the allowed list. */
  related: { slug: string; text: string }[];
  /** Closing CTA linking to one of Zain's services. */
  cta: { heading: string; accent?: string; copy: string; button: string; href: string };
  /** Directory card. */
  hubCard: { description: string; cta: string };
  /** Official pages the facts on this page came from (shown nowhere, kept for maintenance). */
  sources: { label: string; url: string; checked: string }[];
};
