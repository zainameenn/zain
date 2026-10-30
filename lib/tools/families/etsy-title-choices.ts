// Shared by the Etsy Title Generator page (client) and its API route (server). Keep it data only.

export const ETSY_CATEGORIES = ["Jewelry", "Clothing", "Home & Living", "Art & Prints", "Digital Downloads", "Stickers & Stationery", "Wedding", "Bath & Beauty", "Toys & Games", "Craft Supplies", "Vintage", "Accessories", "Other"];
export const ETSY_FORMATS = ["Physical product", "Digital download", "Not sure"];
export const ETSY_STYLES = ["None", "Minimal", "Modern", "Rustic", "Gothic", "Boho", "Cute", "Vintage-inspired", "Elegant", "Other"];
export const ETSY_PERSONALIZATION = ["No", "Yes", "Optional"];
export const ETSY_LANGUAGES = ["English", "Spanish", "French", "German", "Italian", "Dutch", "Portuguese"];
export const ETSY_TITLE_LABELS = ["Clear & Direct", "Detail-led", "Alternative Wording"];

/** Etsy's title limit. */
export const ETSY_TITLE_LIMIT = 140;
/** The raw upload cap shown to visitors; the page shrinks the photo before sending it. */
export const ETSY_PHOTO_MAX_BYTES = 10 * 1024 * 1024;
export const ETSY_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Free text fields and their length caps. */
export const ETSY_TEXT_FIELDS = {
  item: 120,
  categoryOther: 60,
  styleOther: 60,
  color: 60,
  material: 80,
  size: 60,
  personalizationDetail: 120,
  phrase: 80,
  existing: 160,
  notes: 300,
  answer: 160,
} as const;

export type EtsyTitleInput = {
  image?: { mimeType: string; data: string };
  category: string;
  format: string;
  style: string;
  personalization: string;
  language: string;
} & { [K in keyof typeof ETSY_TEXT_FIELDS]: string };

export type EtsyTitle = { label: string; title: string; why: string };
export type EtsyTitleReply = { needsClarification: true; question: string } | { needsClarification: false; titles: EtsyTitle[] };
