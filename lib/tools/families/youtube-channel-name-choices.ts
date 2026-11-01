// Choices for the YouTube Channel Name Generator (app/tools/youtube-channel-name-generator), shared by the
// form and its API route (/api/tools/yt-channel-name) so both validate against the same lists.

export const YT_NAME_KINDS = ["Gaming", "Tech", "Fitness", "Beauty", "Food", "Education", "Travel", "Music", "Personal Vlogs", "Kids", "Business", "Other"];
export const YT_NAME_AUDIENCES = ["General audience", "Beginners", "Fans", "Professionals", "Students", "Families", "Other"];
export const YT_NAME_STYLES = ["Simple", "Personal brand", "Clever", "Playful", "Professional", "Invented word", "Other"];
// Bangla and other languages are left out until their results are reliable, as on the other tools.
export const YT_NAME_LANGUAGES = ["English", "Spanish", "Hindi", "Urdu"];
export const YT_NAME_LENGTHS = ["Any length", "One word", "Two words", "Up to three words"];

/** The five angles, in the order the model writes them. */
export const YT_NAME_ANGLES = ["Clear and descriptive", "Personal touch", "Short and brandable", "Playful", "Room to grow"];

/** Character caps for every free text field. */
export const YT_NAME_TEXT = { about: 300, kindOther: 60, audienceOther: 60, styleOther: 60, include: 80, avoid: 80, person: 50 } as const;

export const YT_NAME_MAX = 50;

/**
 * YouTube's published handle rules (support.google.com/youtube/answer/11585688): 3 to 30 characters,
 * letters and numbers plus underscores, hyphens and periods, and not URL or phone number like.
 * Generated handles are Latin only, so the simple ASCII check is enough here.
 */
export function handleProblem(h: string): string | null {
  if (h.length < 3 || h.length > 30) return "must be 3 to 30 characters";
  if (!/^[a-z0-9._-]+$/i.test(h)) return "can only use letters, numbers, periods, underscores and hyphens";
  if (/^[._-]|[._-]$/.test(h)) return "shouldn't start or end with a symbol";
  if (/\.(com|net|org|io|co|tv|me)$/i.test(h) || /^\+?\d{7,}$/.test(h)) return "looks like a web address or phone number";
  return null;
}
