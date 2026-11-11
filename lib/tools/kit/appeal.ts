// Reddit ban appeal drafts, built from a template in the browser. Appeals hold account details and private
// moderator messages, so nothing here is sent to an AI service or to this site's server.

export type AppealAction = "subreddit" | "suspension" | "sitewide" | "removal";
export type AppealTone = "neutral" | "apologetic" | "clarifying";
export type AppealIn = { action: AppealAction; what: string; subreddit?: string; rule?: string; why?: string; facts?: string; tone: AppealTone };

export const ACTION_LABELS: Record<AppealAction, string> = {
  subreddit: "Banned from a subreddit",
  suspension: "Reddit account suspended",
  sitewide: "Sitewide (permanent) ban",
  removal: "Post or comment removed",
};

const sub = (s?: string) => (s ?? "").trim().replace(/^\/?r\//i, "").replace(/[^A-Za-z0-9_]/g, "");

/** Where the appeal goes. Subreddit decisions belong to that community's moderators; account actions to Reddit. */
export function appealDestination(action: AppealAction, subreddit?: string): { label: string; href: string; how: string } {
  const name = sub(subreddit);
  if (action === "subreddit" || action === "removal") {
    return {
      label: name ? `Message the r/${name} moderators` : "Message the subreddit's moderators",
      href: name ? `https://www.reddit.com/message/compose?to=${encodeURIComponent(`/r/${name}`)}` : "https://www.reddit.com/message/compose",
      how: "Moderators make subreddit decisions, so send this through modmail: the community's sidebar has a Message the mods link, or use the link here. Reddit's own staff don't review individual subreddit bans.",
    };
  }
  return {
    label: "Open Reddit's appeal form",
    href: "https://www.reddit.com/appeals",
    how: "Account suspensions and sitewide bans are reviewed by Reddit, not moderators. Use Reddit's official appeal form while signed in to the affected account. Reddit's form has its own length limit, so keep it short.",
  };
}

const clean = (s?: string) => (s ?? "").trim().replace(/\s+/g, " ").replace(/!{2,}/g, "!").replace(/\?{2,}/g, "?");
const sentence = (s: string) => (s && !/[.!?]$/.test(s) ? `${s}.` : s);
const lowerFirst = (s: string) => (s ? s[0].toLowerCase() + s.slice(1) : s);

/** One concise appeal, under 200 words. Uses only what the visitor typed; no promises they didn't make. */
export function appealDraft(i: AppealIn): string {
  const name = sub(i.subreddit);
  const where = i.action === "subreddit" || i.action === "removal" ? (name ? `r/${name}` : "your community") : "Reddit";
  const what = sentence(clean(i.what));
  const rule = clean(i.rule);
  const why = sentence(clean(i.why));
  const facts = sentence(clean(i.facts));
  const greeting = i.action === "subreddit" || i.action === "removal" ? (name ? `Hi r/${name} mods,` : "Hi mods,") : "Hello,";
  const subject = { subreddit: `my ban from ${where}`, removal: `the removal of my post in ${where}`, suspension: "the suspension on my account", sitewide: "the ban on my account" }[i.action];
  const parts: string[] = [greeting, `I'm writing to ask you to review ${subject}.`];
  if (what) parts.push(`What happened: ${what}`);
  if (rule) parts.push(`I understand the action was taken under: ${rule}${/[.!?]$/.test(rule) ? "" : "."}`);
  if (i.tone === "apologetic") parts.push(why ? `I see now how this broke the rules. ${why} I'm sorry for the trouble it caused.` : "I see now how this broke the rules, and I'm sorry for the trouble it caused.");
  else if (i.tone === "clarifying") parts.push(why ? `I think there may have been a misunderstanding. ${why}` : "I think there may have been a misunderstanding, and I'd be grateful if you could take another look.");
  else if (why) parts.push(`Why I'm asking for a review: ${lowerFirst(why)}`);
  if (facts) parts.push(facts);
  parts.push(i.action === "removal" ? "If it can't be restored, I'd appreciate knowing what to change so I can post within the rules." : "I've read the rules again and will follow them. If there's anything you'd like me to change, please let me know.");
  parts.push("Thank you for your time.");
  let text = `${parts[0]}\n\n${parts.slice(1, -1).join(" ")}\n\n${parts[parts.length - 1]}`;
  // Hard cap at 200 words: trim the optional detail first.
  const words = text.split(/\s+/);
  if (words.length > 200) text = `${words.slice(0, 190).join(" ")}...\n\nThank you for your time.`;
  return text;
}
