import { FAIR_USE } from "../links";
import type { DemoProfile, ToolExample, ToolInput, ToolPage } from "../types";

// Instagram Caption Generator copy v2 (docs/copy/instagram-caption-generator.md), merged over the caption family page.

const base = (input: ToolInput): ToolInput => ({ notes: "", audience: "", keyword: "", cta: "", hashtags: true, emoji: true, language: "English", ...input });

type Example = ToolExample & { profile: DemoProfile };

const EXAMPLES: Example[] = [
  {
    inputLabel: "Balcony makeover",
    inputText: "balcony garden makeover · $40, one weekend · renters · Saves · Friendly",
    input: base({ topic: "Before and after of a tiny balcony garden makeover", notes: "Cost $40, done in one weekend, plants from a local nursery", audience: "Renters with small apartments", goal: "Saves", keyword: "balcony garden ideas", cta: "Save this for spring", tone: "Friendly", length: "Short" }),
    output: "$40 and one weekend turned this sad balcony into my favorite room 🌿\n\nEvery plant came from a local nursery, so these balcony garden ideas work on a renter's budget.\n\nSave this for spring.\n\n#balconygarden #smallspaceliving #renterfriendly",
    why: "the price and the time sit in the first line, so the hook works before anyone taps more.",
    profile: { username: "tiny.green.flat", name: "Tiny Green Flat", text: "" },
  },
  {
    inputLabel: "Café opening",
    inputText: "café opening day · burned the first batch · locals · Comments · Funny",
    input: base({ topic: "Our café's opening day", notes: "Burned the first 200 croissants testing the new oven. Doors open tomorrow at 8am", audience: "Locals", goal: "Comments", cta: "Tell us your go to pastry order", tone: "Funny", length: "Short" }),
    output: "We burned the first 200 croissants. Batch 201 is out tomorrow at 8 🥐\n\nTell us your go to pastry order so we know what to bake more of.\n\n#neighbourhoodcafe #croissants",
    why: "it opens on a real mistake, which is far more interesting than \"we're open!\".",
    profile: { username: "corner.crumb", name: "Corner Crumb Café", text: "" },
  },
  {
    inputLabel: "Coach tip carousel",
    inputText: "core exercise carousel · home workouts · Saves · Bold",
    input: base({ topic: "Carousel: a core exercise that beats crunches", notes: "Dead bugs, 3 sets of 10, takes 5 minutes, no equipment", audience: "People training at home", goal: "Saves", keyword: "core workout at home", cta: "Save it for tomorrow's workout", tone: "Bold", length: "Medium" }),
    output: "Stop doing 100 crunches. Do this instead.\n\nDead bugs: 3 sets of 10, five minutes, zero equipment. Swipe for the form that actually works your core.\n\nSave it for tomorrow's workout 💪\n\n#coreworkout #homeworkout #fitnesstips",
    why: "a direct instruction that challenges a habit, then the exact sets and time in plain numbers.",
    profile: { username: "coach.ana.fit", name: "Coach Ana", text: "" },
  },
  {
    inputLabel: "Product launch",
    inputText: "new desk mat colour · people who work at a desk · Clicks · Professional",
    input: base({ topic: "Launching a new sage green desk mat", notes: "Large felt desk mat, 90 x 40 cm, printed to order", audience: "People who work long hours at a desk", goal: "Clicks", cta: "Link in bio to shop", tone: "Professional", length: "Short", emoji: false }),
    output: "New colour: sage green.\n\nSame large felt desk mat, 90 x 40 cm, printed to order. Your keyboard, mouse and coffee finally get the same calm corner.\n\nLink in bio to shop.\n\n#desksetup #workfromhome",
    why: "it leads with the news, then gives the specs buyers check, and ends with one clear ask.",
    profile: { username: "softdesk.mats", name: "Felt Desk Mats", text: "" },
  },
  {
    inputLabel: "Behind the scenes",
    inputText: "pottery studio reel · first wheel throw fail · Watch time · Calm",
    input: base({ topic: "Reel: my first time on the pottery wheel this year", notes: "Took 6 tries to centre the clay. Bowl number 6 survived", audience: "People curious about pottery", goal: "Watch time", tone: "Calm", length: "Short" }),
    output: "Six tries to centre the clay. Watch which bowl survived.\n\nPottery is mostly patience and wet sleeves.\n\n#potterystudio #wheelthrowing",
    why: "the number creates a tiny mystery, so people watch to the end to see the result.",
    profile: { username: "clay.and.quiet", name: "Clay & Quiet", text: "" },
  },
  {
    inputLabel: "Personal post",
    inputText: "first marathon finish · friends and family · Comments · Friendly",
    input: base({ topic: "Finished my first marathon", notes: "4 hours 52 minutes, walked mile 21, cried at the finish", audience: "Friends and family", goal: "Comments", tone: "Friendly", length: "Short", hashtags: false }),
    output: "4 hours, 52 minutes and one very emotional finish line 🏅\n\nI walked mile 21 and I'm not even sorry. Thank you for every message along the way.",
    why: "real numbers and an honest admission feel human, which is what friends want to comment on.",
    profile: { username: "nadia.runs", name: "Nadia", text: "" },
  },
].map((e) => ({ ...e, profile: { ...e.profile, text: e.output } }));

export function instagramCaptionPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "Instagram Caption Generator: Free AI Captions From Notes",
    metaDescription: "Use this free Instagram caption generator to turn your notes into 3 captions with a strong first line, up to 5 hashtags, and a live post preview.",
    h1: { regular: "Free AI Instagram", accent: "Caption Generator" },
    heroDescription:
      "This Instagram caption generator turns a few rough notes into three captions you can post today, then shows them on a live post preview. Each one opens with a line worth reading, uses no more than 5 hashtags, and sticks to the details you give it.",
    accessNote: `${FAIR_USE} Nothing posts automatically.`,
    workspace: {
      ...page.workspace,
      exampleInput: EXAMPLES[0].input,
      emptyState: "",
      dataNote: "AI can get things wrong. Read your caption before you post it, because it goes out under your name.",
      preview: {
        skin: "instagram-post",
        limit: 2200,
        demo: EXAMPLES.map((e) => e.profile),
        labels: { pill: "Live preview", caption: "Illustrative posts. Yours shows up here.", disclosure: "See it on a post", previewButton: "Preview", theme: "Dark background" },
        live: { username: "your.username", link: "" },
      },
    },
    howTo: {
      heading: "How to use the Instagram caption generator",
      intro: "Bring the messy notes. The tool brings the structure, the hook and the hashtags.",
      steps: [
        "**Say what the post is.** A photo, a carousel or a Reel, and what's in it. \"Before and after of a tiny balcony\" gives the tool far more to work with than \"new post\".",
        "**Dump the details.** Prices, times, mistakes, numbers. Real details are what make a caption worth reading.",
        "**Pick the goal and the vibe.** A caption built for saves reads differently from one built for comments. Add a search phrase if people would look for this topic.",
        "**Preview, copy, post.** Click Preview to see each caption under a post, with the first lines showing the way they do before \"more\". Copy your favorite and paste it into Instagram.",
      ],
      outro: "Want a different take? Use **Make it shorter** or **Make it punchier** on the results, or change the vibe and run it again.",
    },
    examples: {
      heading: "Instagram caption examples for every kind of post",
      label: "Illustrative examples",
      intro: [{ p: "Six captions the tool wrote from the notes shown. Click \"Use this example\" to load the notes, then swap in your own." }],
      items: EXAMPLES,
    },
    sections: [
      {
        heading: "What makes a good Instagram caption",
        blocks: [
          { p: "Most people see your first line, then decide in about a second whether to tap \"more\" or keep scrolling. So the first line carries the post." },
          { p: "Breaking Bad didn't open with Walter White filling in a tax form. It opened with a pair of trousers flying across the desert. Your first line needs the same energy: the surprising detail, the number, the result. Then:" },
          {
            ol: [
              "**Add what the photo can't show.** The price, the time it took, the mistake, the reason.",
              "**Use the words people search for,** naturally, in the first sentence or two.",
              "**End with one ask.** Save, comment, tap the link. Pick one.",
            ],
          },
          { p: "\"New post! ✨\" is a caption in the same way a blank postcard is a letter." },
        ],
      },
      {
        heading: "How long should an Instagram caption be?",
        blocks: [
          { p: "As long as it stays interesting, and no longer. Different posts need different lengths:" },
          {
            table: {
              head: ["Post type", "Good length", "What the caption does"],
              rows: [
                ["Photo that speaks for itself", "One or two lines", "Adds the one detail the photo can't show"],
                ["Carousel or tutorial", "A short paragraph plus steps", "Tells people why to swipe and what they'll learn"],
                ["Reel", "One to three lines", "Hooks the watch and adds a search phrase"],
                ["Story behind the post", "Several short paragraphs", "Keeps people reading, line by line"],
                ["Announcement or launch", "Three to five short lines", "What's new, why it matters, what to do"],
              ],
            },
          },
          { p: "Pick Short, Medium or Long in the tool and it writes to that range. Whatever the length, **THE FIRST LINE STILL HAS TO EARN THE TAP.**" },
        ],
      },
      {
        heading: "Hashtags on Instagram: why 5 is now the limit",
        blocks: [
          { p: "Instagram's help center now says you can use [up to 5 hashtags on a post](https://help.instagram.com/351460621611097). Any tool still handing you 30 tags is working from an old rulebook." },
          { p: "Five is plenty if you choose well:" },
          {
            ol: [
              "**Go specific.** #balconygarden tells Instagram more than #nature or #love.",
              "**Match the post, not the trend.** A tag only helps if your post is what people expect to find there.",
              "**Put them in the caption.** Instagram's own advice on search is to put keywords and hashtags in the caption, not the comments.",
            ],
          },
          { p: "The tool returns hashtags as separate chips under each caption, so you can remove any you don't like before you copy." },
        ],
      },
      {
        heading: "Keywords in captions and Instagram search",
        blocks: [
          { p: "Instagram has explained that search matches what people type with usernames, bios, captions, hashtags and places, and its advice was blunt: [\"put keywords and hashtags in the caption, not the comments\"](https://about.instagram.com/blog/announcements/break-down-how-instagram-search-works)." },
          { p: "So if your post is about balcony garden ideas, say \"balcony garden ideas\" somewhere natural in the first couple of sentences. Add a search phrase in the tool and it does exactly that, once or twice, without stuffing." },
          { p: "Write for the person first. A caption that reads like a keyword list gets scrolled past, and that hurts more than a missing keyword." },
        ],
      },
      {
        heading: "Instagram caption limits and formatting",
        blocks: [
          { p: "Instagram's developer documentation lists a maximum of **2,200 characters** for a caption, so every caption this tool writes stays under that, hashtags included. The counter on each result shows the exact total." },
          { p: "A few formatting habits worth keeping:" },
          {
            ol: [
              "**Use short paragraphs with a blank line between them.** The tool keeps those line breaks when you copy.",
              "**Front load the good stuff.** Only the first lines show before \"more\", so don't bury the point.",
              "**Add alt text separately.** Instagram lets you [write your own alt text](https://help.instagram.com/503708446705527) for screen readers. It's a separate field, so describe the image there rather than in the caption.",
              "**You can edit after posting.** Instagram lets you [edit or add a caption](https://help.instagram.com/1490745927855762) to a post you've already shared, so a typo isn't the end of the world.",
            ],
          },
        ],
      },
      {
        heading: "Instagram caption mistakes that kill engagement",
        blocks: [
          {
            ol: [
              "**Opening with \"Hey guys\" or \"New post\".** The first line is your hook. Don't spend it on a greeting.",
              "**Describing what's already in the photo.** \"Here's a picture of my coffee\" adds nothing. Tell people what they can't see.",
              "**Asking for four things at once.** Like, comment, share and save is three asks too many.",
              "**A wall of generic hashtags.** Five specific tags beat twenty vague ones, and five is now the limit anyway.",
              "**Copying a caption template word for word.** If it worked for a million accounts, it's invisible on yours.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is this Instagram caption generator free?", a: `Yes. ${FAIR_USE}` },
      { q: "How long can an Instagram caption be?", a: "Instagram's developer documentation lists 2,200 characters. Every caption this tool writes stays under that, and the counter shows the exact total." },
      { q: "How many hashtags can I use on Instagram?", a: "Instagram's help center says up to 5 per post. The tool never suggests more than 5, and you can remove any of them before copying." },
      { q: "Should hashtags go in the caption or the first comment?", a: "In the caption. Instagram's own advice for search is to put keywords and hashtags in the caption, not the comments." },
      { q: "Do keywords in captions help on Instagram?", a: "They can help people find your post in search, because Instagram matches searches against captions. Add a search phrase in the tool and it works it in naturally." },
      { q: "Can I edit my Instagram caption after posting?", a: "Yes. Instagram lets you edit, add or delete a caption on a post you've already shared." },
      { q: "Does the tool see my photo or video?", a: "No. It only uses the notes you type, so describe what's in the post and make sure the caption matches it." },
      { q: "Will it make things up?", a: "No. It only uses what you type. If a stronger caption needs a number or a detail, it tells you what to add." },
      { q: "Can it write captions in other languages?", a: "Yes. Pick a language from the dropdown and all three captions come out in it." },
    ],
    ctas: page.ctas,
    related: [
      { slug: "instagram-bio-generator", text: "a bio that matches your posts." },
      { slug: "tiktok-caption-generator", text: "the same post, written for TikTok." },
      { slug: "facebook-caption-generator", text: "a version for Facebook." },
      { slug: "social-media-content-calendar-generator", text: "plan a month of posts in one go." },
      { slug: "linkedin-post-generator", text: "turn your notes into a LinkedIn post." },
    ],
    extraLinks: [...page.extraLinks, { text: "See all free marketing tools", href: "/tools" }],
  };
}
