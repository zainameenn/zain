import type { ProfileSkin, StudioContent, ToolField, ToolInput, ToolPage } from "../types";
import { INSTAGRAM_CATEGORIES } from "./bio-instagram";
import { BIO_LANGUAGES } from "./common";

// The studio bio form for TikTok, X, Threads and Facebook: the Instagram v3 form with each platform's goals and copy.
// Every platform shares the "studio-bio" prompt block; only the vars below change.

const NEW = { field: "mode", equals: "new" };
const IMPROVE = { field: "mode", equals: "improve" };

export type StudioBioPlatform = {
  platform: string;
  skin: ProfileSkin;
  limit: number;
  target: [number, number];
  /** Upper bound for the "Short & Minimal" bio. */
  shortMax: number;
  /** Platform facts for the prompt. */
  facts: string;
  goals: string[];
  defaultFormat: "Single line" | "Multiple lines";
  /** Searchable name field the tool also suggests ideas for, with its limit and copy. */
  nameIdeas?: { limit: number; heading: string; helper: string };
  copy: { about: string; currentBio: string; name: string; nameHint: string; audience: string; proof: string; keywords: string; location: string };
  example: ToolInput;
};

export function studioBioFields(p: StudioBioPlatform): ToolField[] {
  return [
    {
      name: "mode",
      label: "What do you want to do?",
      type: "mode",
      options: [
        { value: "new", label: "Create a bio" },
        { value: "improve", label: "Improve my bio" },
      ],
      defaultValue: "new",
    },
    { name: "account_type", label: "What type of account is this?", type: "segmented", options: ["Personal", "Creator", "Business"], defaultValue: "Business", required: true, when: NEW, group: "essentials" },
    { name: "category", label: "What is your account about?", type: "combobox", options: INSTAGRAM_CATEGORIES, placeholder: "Search or type your niche", required: true, maxLength: 80, otherLabel: "Other", when: NEW, group: "essentials" },
    { name: "about", label: "Tell us a little about your account", type: "text", placeholder: p.copy.about, hint: "Optional, but a few specific words make your bios much more personal.", maxLength: 160, when: NEW, group: "essentials" },
    {
      name: "current_bio",
      label: `Paste your current ${p.platform} bio`,
      type: "textarea",
      placeholder: p.copy.currentBio,
      hint: "We'll keep your information and rewrite it in five different styles.",
      required: true,
      maxLength: 500,
      when: IMPROVE,
      group: "essentials",
    },
    { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Professional", "Minimal", "Funny", "Bold", "Aesthetic"], defaultValue: "Friendly", group: "style" },
    { name: "goal", label: "Main goal", type: "select", options: p.goals, defaultValue: p.goals[0], group: "style" },
    { name: "emoji", label: "Emojis", type: "segmented", options: ["None", "Subtle", "Expressive"], defaultValue: "Subtle", group: "format" },
    { name: "format", label: "Formatting", type: "segmented", options: ["Single line", "Multiple lines"], defaultValue: p.defaultFormat, group: "format" },
    { name: "name", label: "Name or brand", type: "text", placeholder: p.copy.name, hint: p.copy.nameHint, maxLength: 60, group: "advanced" },
    { name: "location", label: "Location", type: "text", placeholder: p.copy.location, maxLength: 80, group: "advanced" },
    { name: "keywords", label: "Keywords people search for", type: "text", placeholder: p.copy.keywords, maxLength: 120, group: "advanced" },
    { name: "audience", label: "Who is it for?", type: "text", placeholder: p.copy.audience, maxLength: 160, group: "advanced" },
    { name: "proof", label: "Real achievements or credentials", type: "text", placeholder: p.copy.proof, hint: "Only add things that are true. The tool never makes them up.", maxLength: 160, group: "advanced" },
    { name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English", group: "advanced" },
  ];
}

const nameTask = (p: StudioBioPlatform) =>
  p.nameIdeas
    ? `\nAlso write 2 name field ideas, each under ${p.nameIdeas.limit} characters: the brand or name plus one plain keyword, separated by " · " (like "Maya · Strength Coach"). If no name or brand was given, use the category and the location instead (like "Sourdough Bakery Austin").`
    : `\nReturn "name_ideas" as an empty list.`;

/** Turns a platform's family page into a studio page: the new form, workspace and prompt, plus the page's studio content. */
export function studioBioPage(page: ToolPage, p: StudioBioPlatform, studio: StudioContent): ToolPage {
  const defaults: ToolInput = { mode: "new", current_bio: "", name: "", location: "", keywords: "", audience: "", proof: "", language: "English" };
  return {
    ...page,
    workspace: {
      ...page.workspace,
      fields: studioBioFields(p),
      button: "Generate 5 bios",
      secondary: "Try an example",
      exampleInput: { ...defaults, ...p.example },
      more: "Try another style",
      dataNote: "AI can get things wrong. Read your bio before you post it, because it goes out under your name.",
      result: {
        kind: "options",
        limit: p.limit,
        shorter: "Make them shorter",
        ideas: p.nameIdeas ? { key: "name_ideas", limit: p.nameIdeas.limit, heading: p.nameIdeas.heading, helper: p.nameIdeas.helper } : undefined,
      },
      preview: undefined,
    },
    api: {
      block: "studio-bio",
      vars: {
        platform: p.platform,
        limit: String(p.limit),
        target_min: String(p.target[0]),
        target_max: String(p.target[1]),
        short_max: String(p.shortMax),
        platform_facts: p.facts,
        name_task: nameTask(p),
        name_field_limit: p.nameIdeas ? String(p.nameIdeas.limit) : "",
      },
    },
    studio: { skin: p.skin, label: `${p.platform} bio generator`, platform: p.platform, ...studio },
  };
}
