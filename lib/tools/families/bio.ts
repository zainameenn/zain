import { FAIR_USE, GUIDE_SOCIAL_MEDIA, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { Rich, ToolExample, ToolField, ToolPage } from "../types";
import { FACEBOOK_FIELD_COPY, facebookPage } from "./bio-facebook";
import { instagramPage } from "./bio-instagram";
import { THREADS_FIELD_COPY, threadsPage } from "./bio-threads";
import { TIKTOK_FIELD_COPY, tiktokPage } from "./bio-tiktok";
import { X_FIELD_COPY, xPage } from "./bio-x";
import { BIO_LANGUAGES, ERROR_TEXT, dataNote, freeFaq } from "./common";

// Family 1 in docs/tools-spec.md: one shared bio page plus a small block per platform.

export type BioOverride = {
  /** Name used in the copy, e.g. "X". */
  platform: string;
  /** Name used in the URL, meta title, H1 and keyword spots, when it differs (X keeps "Twitter"). */
  seoPlatform?: string;
  /** Page name in the hub and breadcrumb, when it differs. */
  name?: string;
  limit: number;
  target: [number, number];
  notes: string;
  tips: Rich;
  examples: ToolExample[];
  faqs: { q: string; a: Rich }[];
  /** Related tool slugs for this platform. */
  related: string[];
  /** Platforms with a separate searchable name field (Instagram: 30). The tool then also suggests name ideas. */
  nameFieldLimit?: number;
  /** Copy for the shared bio fields on this platform (labels, placeholders, hints, options, defaults). */
  fieldCopy?: Record<string, FieldCopy>;
  /** Page level override, merged over the family page at build time. */
  page?: (base: ToolPage) => ToolPage;
};

type FieldCopy = { label?: string; placeholder?: string; hint?: string; options?: string[]; defaultValue?: string };

export { BIO_LANGUAGES } from "./common";

/** The bio form every platform shares. Platforms only change copy, never the fields themselves. */
function bioFields(copy: Record<string, FieldCopy> = {}): ToolField[] {
  const fields: ToolField[] = [
    {
      name: "mode",
      label: "Mode",
      type: "mode",
      options: [
        { value: "new", label: "Write a new bio" },
        { value: "improve", label: "Improve my current bio" },
      ],
      defaultValue: "new",
    },
    { name: "account_type", label: "Account type", type: "chips", options: ["Creator", "Business", "Personal"], defaultValue: "Business", required: true },
    { name: "who", label: "What do you do or sell?", type: "text", placeholder: "Wedding photographer for outdoor weddings", required: true, maxLength: 300 },
    { name: "audience", label: "Who is it for?", type: "text", placeholder: "Couples planning small, relaxed weddings", maxLength: 300 },
    { name: "current_bio", label: "Paste your current bio", type: "textarea", required: true, maxLength: 500, when: { field: "mode", equals: "improve" } },
    { name: "keywords", label: "Words people search to find you (optional)", type: "text", placeholder: "sourdough, bakery", maxLength: 200 },
    { name: "location", label: "Location (optional, great for local businesses)", type: "text", placeholder: "Austin, TX", maxLength: 100 },
    { name: "proof", label: "Anything real worth bragging about? (optional)", type: "text", placeholder: "Shot 120 weddings since 2019", maxLength: 300 },
    { name: "action", label: "What should people do next?", type: "select", options: ["Follow", "DM me", "Click my link", "Book", "Shop", "Nothing"], required: true },
    { name: "tone", label: "Tone", type: "chips", options: ["Friendly", "Funny", "Bold", "Professional", "Minimal", "Aesthetic"], defaultValue: "Friendly" },
    { name: "emoji", label: "Use emoji", type: "toggle", defaultOn: true },
    { name: "line_breaks", label: "Use line breaks", type: "toggle", defaultOn: true },
    { name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English" },
  ];
  return fields.map((f) => (copy[f.name] ? ({ ...f, ...copy[f.name] } as ToolField) : f));
}

export function bioPage(o: BioOverride): ToolPage {
  const base = bioBase(o);
  return o.page ? o.page(base) : base;
}

function bioBase(o: BioOverride): ToolPage {
  const P = o.platform;
  const S = o.seoPlatform ?? P;
  const L = o.limit;
  return {
    slug: `${S.toLowerCase()}-bio-generator`,
    name: o.name ?? `${S} Bio Generator`,
    keyword: `${S.toLowerCase()} bio generator`,
    group: "Social",
    metaTitle: `${S} Bio Generator: Free Bios That Fit ${L} Characters`,
    metaDescription: `Use this free ${S} bio generator to write 5 bios from your real details. Each one fits the ${L} character limit and tells people why to follow.`,
    h1: { regular: `Free ${S}`, accent: "Bio Generator" },
    heroDescription: `This ${S} bio generator turns three quick answers into a bio that fits the ${L} character limit. Change a word, paste it in. No invented achievements, no robot voice.`,
    accessNote: `${FAIR_USE} Don't type anything private.`,
    workspace: {
      fields: bioFields(o.fieldCopy),
      button: `Write my ${P} bio`,
      secondary: "Try an example",
      exampleInput: {
        who: "Wedding photographer for outdoor weddings",
        audience: "Couples planning small, relaxed weddings",
        action: "Book",
        proof: "Shot 120 weddings since 2019",
        tone: "Friendly",
        emoji: true,
        line_breaks: true,
      },
      resultsHeading: `Your ${P} bio`,
      emptyState: "Your bio lands here. It shows its character count, so you know it fits before you paste it.",
      more: "Regenerate",
      dataNote: dataNote("bios"),
      errorText: ERROR_TEXT,
      result: { kind: "options", limit: L },
    },
    howTo: {
      heading: `How to use the ${S} bio generator`,
      steps: [
        `**Tell it what you do and who it's for.** Use the words your audience would use. "Help small businesses grow" gets you mush. "Get roofers more calls from Google" gets you a bio.`,
        "**Pick the next step.** A bio without an action is a shop window with the door painted shut.",
        "**Copy, tweak, paste.** Read it out loud. If it sounds like you, ship it. If not, change one word, refine it or regenerate.",
      ],
    },
    examples: { heading: `${P} bio examples`, items: o.examples },
    sections: [
      {
        heading: `What makes a good ${P} bio?`,
        blocks: [
          { p: `A good ${P} bio answers one question in about two seconds: why should I follow you?` },
          { p: `Most bios miss because they describe the person instead of the reason. "Coffee lover. Dreamer. Dog mom." Lovely. Also useless. A stranger still has no idea what they get by following.` },
          { p: "Here's the formula that works for almost everyone:" },
          {
            ol: [
              "**What you do or sell,** in your audience's words.",
              "**Who it's for,** as specific as you can stand.",
              "**One real proof point,** if you have one.",
              "**One action:** follow, DM, click, book.",
            ],
          },
          { p: `**YOU DON'T NEED ALL FOUR.** Two done well beats four crammed into ${L} characters like clothes in a carry on.` },
          { p: o.tips },
          { p: `**Common mistake:** the title stack. "Entrepreneur | Creator | Visionary" tells people about as much as Jon Snow knew. Swap titles for a result: "I help bakeries sell out before noon."` },
          { p: "**One limit to know:** this tool can't see your live profile, highlights or pinned posts. Read your new bio next to them before you save. They should all tell the same story." },
        ],
      },
    ],
    faqs: [
      freeFaq(`${P} bio generator`),
      { q: "Will it make up stuff about me?", a: "No. It only uses what you type. If a bio would be stronger with a number or a result, it tells you what to add instead of inventing one." },
      { q: `Do emoji count toward the ${L} characters?`, a: "Yes. Most count as one character, but some count as two. The counter on each result shows the real total." },
      { q: "Can I edit the bios?", a: "Yes. Click any bio to edit it, and the counter updates as you type." },
      ...o.faqs,
    ],
    ctas: [
      {
        heading: "Your bio gets the click. Your content has to keep them.",
        copy: "I help SaaS and service businesses turn social profiles into a steady source of leads. Bio, content plan and posting, handled.",
        button: "See how I run social media",
        href: LINK_SOCIAL_MEDIA_SERVICE,
      },
    ],
    related: [
      ...o.related.map((slug) => ({ slug, text: "write captions that match your new bio." })),
      { slug: "linkedin-headline-generator", text: "the bio's grown up cousin." },
      { slug: "social-media-content-calendar-generator", text: "plan a month of posts in one go." },
    ],
    extraLinks: [GUIDE_SOCIAL_MEDIA],
    api: {
      block: "bio",
      vars: { platform: P, limit: String(L), target_min: String(o.target[0]), target_max: String(o.target[1]), platform_notes: o.notes, name_field_limit: o.nameFieldLimit ? String(o.nameFieldLimit) : "" },
    },
  };
}

// Each platform's copy v2 lives in its own file (bio-<platform>.ts) and replaces the family copy via `page`.
// The family still supplies the shared fields, prompt vars, CTA and guide link.
const v2 = { tips: "", examples: [] as ToolExample[], faqs: [] };

export const BIO_PLATFORMS: BioOverride[] = [
  {
    platform: "Instagram",
    limit: 150,
    target: [90, 140],
    notes: "The profile name sits above the bio and up to 5 links sit below it. Line breaks read well here.",
    ...v2,
    related: ["instagram-caption-generator"],
    nameFieldLimit: 30,
    page: instagramPage,
  },
  {
    platform: "TikTok",
    limit: 80,
    target: [40, 75],
    notes: "Tiny space: prefer one line. URLs typed into the bio are not clickable, so never include one. Casual tone works.",
    ...v2,
    related: ["tiktok-caption-generator"],
    fieldCopy: TIKTOK_FIELD_COPY,
    page: tiktokPage,
  },
  {
    platform: "X",
    seoPlatform: "Twitter",
    name: "X (Twitter) Bio Generator",
    limit: 160,
    target: [100, 155],
    notes: "Location and website have their own fields, so never repeat them. @handles in the bio point people to other accounts. One or two lines. The display name allows 50 characters.",
    ...v2,
    related: [],
    nameFieldLimit: 50,
    fieldCopy: X_FIELD_COPY,
    page: xPage,
  },
  {
    platform: "Threads",
    limit: 150,
    target: [80, 140],
    notes: "A conversation platform. The bio can be warmer and more personal than Instagram. Say what they post about. Topics belong in the separate Interests field and links in the separate links field, so never list them in the bio.",
    ...v2,
    related: [],
    fieldCopy: THREADS_FIELD_COPY,
    page: threadsPage,
  },
  {
    platform: "Facebook",
    limit: 101,
    target: [50, 95],
    notes: "Shows in the always public Intro section. Plain, trustworthy, one or two short lines. Local businesses should name the area if given. Links, phone numbers and hours have their own fields, so never put them in the bio.",
    ...v2,
    related: ["facebook-caption-generator"],
    fieldCopy: FACEBOOK_FIELD_COPY,
    page: facebookPage,
  },
];
