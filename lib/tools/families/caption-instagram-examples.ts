import type { BrandExample, StudioSection } from "../types";

// Real Instagram captions for the caption page. Each one was read from the post page and the brand's profile data
// on the date in CHECKED. Captions are copied exactly (zero width spaces removed). Recheck before relying on them.

const CHECKED = "October 18, 2026";
const IG = "/assets/tools/instagram-bio/brands";
const logo = (file: string, alt: string) => ({ src: `${IG}/${file}.svg`, alt, width: 64, height: 64 });

const CAPTIONS: BrandExample[] = [
  {
    brand: "Nike",
    handle: "nike",
    url: "https://www.instagram.com/nike/reel/DePzV26vLFB/",
    logo: logo("nike", "Nike logo"),
    bio: "Five MVPs.\nAt some point, it stops being a debate and starts being a pattern.\nCongrats, @aja22wilson",
    checked: CHECKED,
    style: "Minimal",
    why: "A bare number as the hook, one line of opinion, then a tag. Three short lines and no hashtags.",
    lesson: "Lead with the one fact that matters.",
    linkLabel: "View post",
  },
  {
    brand: "Duolingo",
    handle: "duolingo",
    url: "https://www.instagram.com/duolingo/p/DehxeLplO9s/",
    logo: logo("duolingo", "Duolingo logo"),
    bio: "Meet Daryl and Alexa, who just got married thanks to Duolingo! 💍\n\nThey matched on a dating app in 2022, but decided to just stay friends… until Alexa’s Spanish streak got Daryl back on Duolingo. One long Friend Streak and a lot of Friends Quests later, the spark was back. 💘\n\nFast forward through an 800+ day Friend Streak, a trip to Barcelona, and now… they’re esposos! 💌\n\n¡Felicidades, @darylblanco y @likeflamingo! Here’s to a lifelong streak together.",
    checked: CHECKED,
    style: "Personality",
    why: "The whole story fits in the first line, then the middle tells it in order, with product features worked in naturally.",
    lesson: "A real story beats a feature list, even for a product post.",
    linkLabel: "View post",
  },
  {
    brand: "Canva",
    handle: "canva",
    url: "https://www.instagram.com/canva/p/DeR2k3ZmwjS/",
    logo: logo("canva", "Canva logo"),
    bio: "Still manually resizing your posts? Not after this quick tip from #DesignSchool. Learn more on our link in bio.\n\n#CanvaWorldTour",
    checked: CHECKED,
    style: "Action-focused",
    why: "Opens on a pain people recognize, promises a quick fix, and points to the link in bio. Two branded hashtags.",
    lesson: "Name the annoying task, then the shortcut.",
    linkLabel: "View post",
  },
  {
    brand: "LEGO",
    handle: "lego",
    url: "https://www.instagram.com/lego/p/DeT7XqWDLtW/",
    logo: null,
    bio: "Who else is already in full holiday mode?",
    checked: CHECKED,
    style: "Personality",
    why: "The whole caption is one easy question anyone can answer in a word. That's the point: comments.",
    lesson: "For comments, ask something people can answer without thinking.",
    linkLabel: "View post",
  },
  {
    brand: "Glossier",
    handle: "glossier",
    url: "https://www.instagram.com/glossier/p/DeUaVodkQ5P/",
    logo: null,
    bio: "The cherry on top 🍒\n\nOur limited-edition Black Cherry Duo is all dressed up for the holidays: lip-enhancing Lip Line and nourishing, Black Cherry Balm Dotcom in mosaic-inspired packaging. The season’s perfect pair for a juicy, just-bitten look.\n\nShop now at Glossier, @sephora, @sephoracanada, Sephora at @kohls, and @spacenk.",
    checked: CHECKED,
    style: "Action-focused",
    why: "A short hook, then exactly what's in the set, then where to buy it. Every retailer is tagged so people can tap through.",
    lesson: "A launch caption should answer what it is, why now and where to get it.",
    linkLabel: "View post",
  },
  {
    brand: "Patagonia",
    handle: "patagonia",
    url: "https://www.instagram.com/patagonia/reel/DedHZIauyz7/",
    logo: null,
    bio: "It’s not pink, it’s shrimp. Exceptional gear for uncommon pursuits since\n1973.\n\nLink in bio.",
    checked: CHECKED,
    style: "Personality",
    why: "A joke first, the brand line second, and a three word call to action. Under 100 characters.",
    lesson: "One good joke can carry a whole caption.",
    linkLabel: "View post",
  },
];

export const IG_CAPTION_GALLERY: StudioSection[] = [
  {
    kind: "gallery",
    eyebrow: "Real examples",
    heading: "6 Instagram captions",
    accent: "worth learning from",
    intro: "How well known brands write captions, from one question to a full love story.",
    note: `Captions as posted on each brand's official Instagram account, checked on ${CHECKED}. Big brands can lean on name recognition, so copy the habits, not the length. Logos are trademarks of their owners, shown only to identify each account.`,
    items: CAPTIONS,
  },
  {
    kind: "creator",
    eyebrow: "Caption breakdown",
    heading: "What makes a good",
    accent: "Instagram caption",
    intro: "A good caption adds what the picture can't say, in a voice people recognize. Here's a real creator caption, taken apart line by line.",
    profile: {
      handle: "mkbhd",
      name: "Marques Brownlee",
      url: "https://www.instagram.com/mkbhd/p/DbEWLzCvM-9/",
      checked: CHECKED,
      postType: "Photo",
      photo: {
        src: "/assets/tools/twitter-bio/marques-brownlee.webp",
        alt: "Marques Brownlee",
        width: 256,
        height: 256,
        credit: "Photo: Marques Brownlee, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons, cropped and resized, shared under the same license.",
      },
    },
    lines: [
      { text: "dbrand made a Steam machine skin.", mark: 1 },
      { text: "Trying to resist the urge to dribble it", mark: 2 },
    ],
    join: " ",
    points: [
      { title: "Say what's in the post", text: "The first sentence tells you exactly what you're looking at, and who made it, in plain words. No \"new post\", no build up." },
      { title: "One human aside", text: "The second line is a joke only a person would write. It's what makes people smile, comment, or keep scrolling his feed." },
      { title: "What's missing", text: "No call to action and no hashtags. With his audience he doesn't need them. A smaller account usually does: add one ask and a few specific tags." },
    ],
    note: `Caption as posted on @mkbhd on July 21, 2026, checked on ${CHECKED}. The post's photo isn't shown here.`,
  },
];
