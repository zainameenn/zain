// Live draft for the Instagram bio preview. Runs in the browser on every keystroke, no AI involved.
// It's a quick, clearly labeled sketch of where the visitor's answers go, not a generated bio:
// it only rearranges what they typed plus neutral category wording, and never invents facts about them.

import { graphemes } from "./validate";

type Niche = { emoji: string; line: string; highlights: string[] };

const NICHES: Record<string, Niche> = {
  "Personal / Lifestyle": { emoji: "🌿", line: "Everyday life, shared honestly", highlights: ["Daily", "Travel", "Food", "Friends"] },
  "Digital Creator": { emoji: "🎬", line: "Making things for the internet", highlights: ["New", "Series", "BTS", "Q&A"] },
  "Small Business": { emoji: "🛍️", line: "A small business with big care", highlights: ["Shop", "Reviews", "Team", "FAQ"] },
  "Ecommerce Store": { emoji: "📦", line: "Online store, shipped to your door", highlights: ["New in", "Best", "Reviews", "Shipping"] },
  "Fashion & Beauty": { emoji: "💄", line: "Style and beauty, worn for real life", highlights: ["Looks", "Beauty", "Hauls", "Tips"] },
  "Fitness & Wellness": { emoji: "💪", line: "Training you can actually keep up with", highlights: ["Workouts", "Meals", "Tips", "Q&A"] },
  "Food & Restaurants": { emoji: "🍽️", line: "Good food, made with care", highlights: ["Menu", "Specials", "Reviews", "Hours"] },
  Photography: { emoji: "📷", line: "Photos with a story behind them", highlights: ["Work", "Weddings", "BTS", "Book"] },
  Travel: { emoji: "✈️", line: "Places worth the trip", highlights: ["Asia", "Europe", "Tips", "Packing"] },
  Technology: { emoji: "💻", line: "Tech, explained without the jargon", highlights: ["Reviews", "Setups", "Tips", "News"] },
  Gaming: { emoji: "🎮", line: "Gaming clips, reviews and the odd rage quit", highlights: ["Clips", "Reviews", "Setup", "Live"] },
  Education: { emoji: "📚", line: "Learning, made simple", highlights: ["Lessons", "Tips", "Resources", "Q&A"] },
  Marketing: { emoji: "📈", line: "Marketing that brings real customers", highlights: ["Tips", "Cases", "Tools", "About"] },
  "Independent Professional": { emoji: "🧑‍💻", line: "Independent work, done properly", highlights: ["Work", "Services", "Clients", "About"] },
  "Coach / Consultant": { emoji: "🎯", line: "Helping you get unstuck", highlights: ["Tips", "Programs", "Stories", "Book"] },
  "Real Estate": { emoji: "🏡", line: "Homes, and the help to find yours", highlights: ["Listings", "Sold", "Tips", "Area"] },
};
const FALLBACK: Niche = { emoji: "✨", line: "What you do, said in one clear line", highlights: ["About", "Work", "Tips", "Contact"] };

/** Calls to action for each goal, plus the emoji that fits each one. */
const CTAS: Record<string, { text: string; emoji: string }> = {
  "Get more followers": { text: "Follow for more", emoji: "➕" },
  "Visit my website": { text: "Visit the link below", emoji: "👇" },
  "Shop my products": { text: "Shop the collection below", emoji: "🛍️" },
  "Send me a DM": { text: "DM me to get started", emoji: "💬" },
  "Book a service": { text: "Book through the link below", emoji: "📅" },
  "View my portfolio": { text: "See my work below", emoji: "👇" },
  "Contact me": { text: "Get in touch below", emoji: "✉️" },
};

/** Goals whose call to action points at the profile link, so the preview shows a link. */
export const LINK_GOALS = ["Visit my website", "Shop my products", "Book a service", "View my portfolio", "Contact me"];

export const nicheFor = (category: string): Niche => NICHES[category] ?? FALLBACK;

const sentence = (s: string) => {
  const t = s.trim().replace(/[.!\s]+$/, "");
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
};

export type DraftInput = {
  mode: string;
  accountType: string;
  category: string;
  about: string;
  currentBio: string;
  tone: string;
  goal: string;
  emoji: string;
  format: string;
  location: string;
  audience: string;
};

/** Builds the draft bio shown on the phone before anything is generated. Always fits 150 characters. */
export function draftBio(d: DraftInput): string {
  if (d.mode === "improve") return d.currentBio.trim();
  const niche = nicheFor(d.category);
  const main = sentence(d.about) || niche.line;
  const cta = CTAS[d.goal];
  const lines: { text: string; emoji?: string }[] = [{ text: main, emoji: niche.emoji }];

  // The second line only uses what the visitor typed: their audience or their city.
  const audience = d.audience.trim();
  const place = d.location.trim();
  if (d.tone !== "Minimal") {
    if (audience) lines.push({ text: d.tone === "Friendly" ? `Made for ${audience}` : `For ${audience}` });
    else if (place) lines.push({ text: `Based in ${place}`, emoji: "📍" });
  }
  if (cta) lines.push({ text: cta.text, emoji: cta.emoji });

  let out = lines.map((l, i) => {
    let text = l.text;
    if (d.tone === "Aesthetic") text = text.toLowerCase();
    if (d.tone === "Bold" && i === 0) text = `${text}. No fluff`;
    if (d.tone === "Funny" && i === 0 && d.accountType !== "Business") text = `${text} (mostly on purpose)`;
    if (d.emoji === "Expressive" && l.emoji) return `${l.emoji} ${text}`;
    if (d.emoji === "Subtle" && i === 0 && l.emoji) return `${text} ${l.emoji}`;
    return text;
  });

  if (d.format === "Single line") out = [out.join(d.tone === "Aesthetic" ? " · " : ". ")];
  let bio = out.join("\n");
  // Stays inside Instagram's 150 characters, cutting at a word so nothing ends mid word.
  if (graphemes(bio).length > 150) {
    const cut = graphemes(bio).slice(0, 150).join("");
    bio = cut.slice(0, cut.lastIndexOf(" ")).trim();
  }
  return bio;
}

/** A plausible username from the visitor's name or category, only for the preview. */
export function usernameFrom(name: string, category: string): string {
  const base = (name || category || "your name")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .slice(0, 24);
  return base || "yourusername";
}
