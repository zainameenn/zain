// Page copy for the November 2026 marketing tools batch. One object per tool; app/tools/_kit/KitPage.tsx
// renders them all with the same section order. Examples are hypothetical and labelled that way on the page.

import type { ServiceId } from "@/lib/pricing";

export type KitSlug =
  | "reddit-post-formatter"
  | "reddit-title-analyzer"
  | "reddit-engagement-calculator"
  | "reddit-ad-cost-calculator"
  | "reddit-ban-appeal-generator"
  | "elevator-pitch-generator"
  | "pricing-page-analyzer"
  | "startup-launch-checklist-generator"
  | "marketing-roi-calculator"
  | "startup-runway-calculator";

export type KitCategory = { label: string; id: string };
export const KIT_CATEGORIES = {
  redditWriting: { label: "Reddit Writing & Formatting", id: "reddit-writing" },
  redditNumbers: { label: "Reddit Analytics & Calculators", id: "reddit-calculators" },
  startup: { label: "Startup & Growth Tools", id: "startup-growth" },
} satisfies Record<string, KitCategory>;

export type KitCopy = {
  slug: KitSlug;
  name: string;
  keyword: string;
  category: KitCategory;
  title: string;
  description: string;
  lede: string;
  sub: string;
  usage: string;
  /** "ai" when an external AI service processes text, "browser" when nothing leaves the page. */
  processing: "ai" | "browser";
  steps: [string, string][];
  examples: { title: string; input: string; result: string; note: string }[];
  guide: { h: string; p: string[] }[];
  faqs: [string, string][];
  /** null: no service card (the ban appeal page). Pick between two by the visitor's goal on the ad calculator. */
  service: ServiceId | null;
  serviceWhy: string;
  related: string[];
  sources?: { label: string; href: string }[];
};

const REDDIT_HELP = { label: "Reddit Help Center", href: "https://support.reddithelp.com/" };
const CONTENT_POLICY = { label: "Reddit Content Policy", href: "https://www.redditinc.com/policies/content-policy" };

export const KIT: Record<KitSlug, KitCopy> = {
  "reddit-post-formatter": {
    slug: "reddit-post-formatter",
    name: "Reddit Post Formatter",
    keyword: "Reddit post formatter",
    category: KIT_CATEGORIES.redditWriting,
    title: "Reddit Post Formatter: Free Markdown Preview",
    description: "Reddit post formatter with a live Markdown preview. Fix bold, links, lists, spoilers, code and tables before you post. Free, no signup.",
    lede: "This Reddit post formatter shows how your Markdown will look before you publish. Write or paste your post, fix the spacing, links and lists, then copy it straight into Reddit.",
    sub: "Format your Reddit posts before publishing.",
    usage: "Free and unlimited. Everything runs in your browser, nothing is sent anywhere, and it never posts to Reddit.",
    processing: "browser",
    steps: [
      ["Write or paste your post", "Type in the editor, or paste a draft. Use the toolbar if you don't remember the Markdown symbols."],
      ["Check the preview", "The preview updates as you type. Look for lines that ran together, links that didn't turn into links, and lists that broke."],
      ["Copy and post", "Copy the Markdown, open Reddit on desktop, switch the composer to the Markdown Editor and paste it in."],
    ],
    examples: [
      { title: "A tips post with a list and a link", input: "**Three things that fixed my sourdough**\n\n1. Feed the starter twice a day\n2. Use a warmer spot\n3. Weigh, don't measure\n\nFull write up [on my blog](https://example.com/sourdough).", result: "A bold heading line, a numbered list and a working link, each on its own block.", note: "Hypothetical example. The blank line before the list matters: without it, Reddit can join the list onto the line above." },
      { title: "A review with a spoiler", input: "The ending surprised me. >!The narrator was the detective all along.!<", result: "The spoiler shows as a covered block that readers tap or click to reveal.", note: "Hypothetical example. Spoilers use >! at the start and !< at the end, with no spaces inside the markers." },
    ],
    guide: [
      { h: "How Reddit formatting works", p: ["Reddit formats posts with a version of Markdown: plain symbols that turn into formatting when the post is shown. Two asterisks on each side make text bold, a hash at the start of a line makes a heading, and a dash with a space starts a bullet point.", "The symbols stay invisible to readers as long as the post is written in the Markdown editor. Typed into the rich text composer instead, they show up as literal asterisks and hashes."] },
      { h: "Markdown versus rich text", p: ["Reddit has two ways to write. The rich text composer works like a word processor: you select text and press a Bold button. The Markdown editor takes the symbols directly. On desktop you can switch between them with the link under the text box.", "The Reddit mobile apps lean on the rich text composer, so pasting Markdown there often shows the raw symbols. If your formatting matters, post from a desktop browser in Markdown mode. Old Reddit only ever uses Markdown."] },
      { h: "How to format Reddit posts and comments", p: ["Posts and comments use the same Markdown. Leave a blank line between paragraphs: Reddit joins two lines into one paragraph unless there's an empty line between them, or two spaces at the end of the first line.", "Keep headings for longer posts. A short comment rarely needs one, and a wall of headings reads like a document rather than a conversation."] },
      { h: "How spoilers and code blocks work", p: ["A spoiler starts with >! and ends with !<. Everything between them stays hidden until a reader taps it. Don't put a space after >! or before !<, or some clients won't hide it.", "For code, wrap a short piece in backticks. For a block, either indent every line by four spaces or put three backticks on the line above and below. Code blocks keep your spacing exactly, which is why people use them for logs and config files."] },
      { h: "Common formatting mistakes", p: ["The most common problem is a list that runs into the paragraph above it. Add a blank line before the first item. The next is a link with a space between the brackets and the parentheses: [text] (url) won't work, [text](url) will.", "Headings need a space after the hash. #Heading stays as plain text, # Heading becomes a heading. A line of three dashes makes a divider, but only with a blank line above it, otherwise it can turn the line above into a heading."] },
      { h: "What to check before submitting", p: ["Read the preview once from top to bottom. Click each link. Check that spoilers hide what they should, and that tables still line up.", "Then check the subreddit's rules. Some communities don't allow links, images or certain flair, and formatting can't fix a post that breaks a rule."] },
    ],
    faqs: [
      ["How do I format a Reddit post?", "Write it in Reddit's Markdown editor using symbols: **bold**, *italics*, # for headings, - for bullets and [text](link) for links. This formatter shows the result as you type, so you can fix problems before you paste it into Reddit."],
      ["Does Reddit support Markdown?", "Yes. Reddit's Markdown editor on desktop and old Reddit both use it. The mobile apps mostly use the rich text composer, where typed Markdown can appear as raw symbols."],
      ["How do I make text bold?", "Put two asterisks on each side: **like this**. Or select the text in the editor here and press B."],
      ["How do I add a link?", "Write the visible text in square brackets and the address in round brackets straight after, with no space: [my guide](https://example.com). Full addresses starting with https:// also become links on their own."],
      ["How do I add spoilers?", "Wrap the text in >! and !<, like this: >!the twist!<. Readers tap it to reveal what's inside."],
      ["Why does my formatting look different on mobile?", "The mobile apps use a rich text composer and render some Markdown differently. Tables and some spacing may look different there. This preview approximates new Reddit on desktop, so check the post once it's live."],
      ["Can I format comments too?", "Yes. Comments use the same Markdown as posts."],
      ["Does this tool publish to Reddit?", "No. It never connects to your Reddit account and never posts anything. You copy the text and post it yourself."],
    ],
    service: "reddit",
    serviceWhy: "Formatting makes a post readable. Knowing where to post it, what each community allows and how to take part without looking like an ad is the harder part, and that's what the Reddit work covers.",
    related: ["reddit-title-analyzer", "reddit-engagement-calculator", "reddit-ad-cost-calculator"],
    sources: [REDDIT_HELP],
  },

  "reddit-title-analyzer": {
    slug: "reddit-title-analyzer",
    name: "Reddit Title Analyzer",
    keyword: "Reddit title analyzer",
    category: KIT_CATEGORIES.redditWriting,
    title: "Reddit Title Analyzer: Check Your Post Title Free",
    description: "Reddit title analyzer that checks length, clarity, caps, clickbait and specificity, then suggests one clearer title. Free writing feedback, not a virality score.",
    lede: "This Reddit title analyzer finds the weak spots in your post title. Paste it in and see what's unclear, too long or likely to read as clickbait, with one clearer version if you want it.",
    sub: "Find the weak spots in your Reddit post title.",
    usage: "The checks run in your browser and are free and unlimited. The optional rewrite uses a free AI service with a fair use limit.",
    processing: "ai",
    steps: [
      ["Paste your title", "Add the title exactly as you plan to post it."],
      ["Add context if you have it", "The subreddit, a short summary of the post and any rules you've copied from the community make the feedback more specific."],
      ["Read the checks", "Each check says what it found and why it matters. Fix the ones marked Fix first."],
      ["Get a rewrite if you want one", "Ask for one clearer title. It keeps your facts and doesn't add any."],
    ],
    examples: [
      { title: "A vague question", input: "Help with my starter??", result: "Flags repeated punctuation and missing detail. A clearer version: \"My sourdough starter smells like nail polish after 5 days. Is it safe to keep feeding?\" (only if the post says 5 days).", note: "Hypothetical example. The rewrite can only use details from your title or summary." },
      { title: "A hyped story", input: "You won't believe what happened when I emailed 100 recruiters", result: "Flags \"you won't believe\" as clickbait. Suggests saying what happened instead, such as \"I emailed 100 recruiters with a two line message. Here's what came back.\"", note: "Hypothetical example." },
    ],
    guide: [
      { h: "What makes a useful Reddit title?", p: ["A useful title tells the right reader what they'll get before they click. It names the subject, includes the detail that makes your situation specific, and sounds like a person talking to the community.", "Reddit allows up to 300 characters, but feeds cut long titles short. Put the main point in the first 80 or so characters."] },
      { h: "How subreddit context changes a title", p: ["Every community has its own habits and rules. Some want tags like [Question] or a location at the start. Some ban questions in titles, or titles that are only a link description. Paste the rules into the optional field and the rewrite will follow them.", "The same post can need different titles in different places. A beginner community wants plain language; an expert one wants precise terms."] },
      { h: "Questions versus personal stories", p: ["A question title works when you want answers: say what you've already tried, so people don't repeat it. A story title works when you're sharing an experience: say what happened, not how surprising it was.", "Neither format is better by default. Match the title to what the post actually is."] },
      { h: "How to avoid clickbait", p: ["Clickbait promises a reaction instead of describing the content: \"you won't believe\", \"this changes everything\", \"the secret nobody tells you\". Many subreddits remove these, and readers who do click feel tricked.", "Replace the promise with the fact. If the result was surprising, say what the result was."] },
      { h: "How to make titles more specific", p: ["Add one concrete detail you actually know: a number, a place, a timeframe, a constraint. \"Budget meal prep\" becomes \"Meal prep for two on $40 a week, no microwave\".", "Specific doesn't mean long. One good detail beats five vague ones."] },
      { h: "Why a well-written title can still perform poorly", p: ["Timing, the subreddit's size and mood, what else was posted that hour and the post itself all matter more than wording. A clear title helps the right people find your post. It can't guarantee they will.", "That's why this tool scores writing quality only. It does not, and can't, predict votes or reach."] },
    ],
    faqs: [
      ["How long can a Reddit title be?", "Reddit post titles can be up to 300 characters. Shorter usually reads better, because feeds and notifications cut long titles off."],
      ["What makes a good Reddit post title?", "It says what the post is about, includes a specific detail, follows the subreddit's rules and avoids hype. It should make sense to someone who hasn't read the post yet."],
      ["Should I ask a question in my title?", "If your post is a question, yes. Put the actual question in the title rather than \"Need help\". If you're sharing something, describe it instead."],
      ["Do numbers make titles better?", "Real numbers you know can make a title clearer, like a budget, a timeframe or a size. Invented or rounded up numbers make it less trustworthy. The rewrite here never adds numbers you didn't give."],
      ["Can I change a Reddit post title after publishing?", "No. Reddit doesn't let you edit a post title once it's submitted. You'd have to delete the post and post it again, which some subreddits don't allow. That's why it's worth checking first."],
      ["Can this tool predict engagement?", "No. The quality number is a writing heuristic based on the checks shown, such as length, capitals and clarity. It doesn't predict votes, comments or reach."],
      ["Why do subreddits have different title rules?", "Each community is run by its own moderators, who set rules for what fits their space. Some require tags or formats; others ban certain words. Always check the sidebar or rules page."],
    ],
    service: "reddit",
    serviceWhy: "A clear title helps one post. Finding the communities where your buyers actually talk, and showing up there consistently within the rules, is ongoing work.",
    related: ["reddit-post-formatter", "reddit-engagement-calculator", "reddit-ban-appeal-generator"],
    sources: [REDDIT_HELP, CONTENT_POLICY],
  },

  "reddit-engagement-calculator": {
    slug: "reddit-engagement-calculator",
    name: "Reddit Engagement Calculator",
    keyword: "Reddit engagement calculator",
    category: KIT_CATEGORIES.redditNumbers,
    title: "Reddit Engagement Calculator: Score, Comments & Views",
    description: "Reddit engagement calculator for score to comment ratio, interactions per 1,000 views and score relative to subreddit size. Honest labels, no made up benchmarks.",
    lede: "This Reddit engagement calculator turns your post's score, comments and views into ratios you can compare. Each result explains what it does and doesn't tell you.",
    sub: "Understand how people interacted with your Reddit post.",
    usage: "Free and unlimited. The maths runs in your browser.",
    processing: "browser",
    steps: [
      ["Enter the score and comments", "Use the numbers shown on the post."],
      ["Add views if you have them", "Reddit shows view counts to the person who posted, in the post's insights. Without views, the per 1,000 views results can't be calculated."],
      ["Add the subreddit size if useful", "The member count from the community's sidebar lets you compare score against community size."],
      ["Compare with your own posts", "The numbers mean most next to your other posts in the same subreddit."],
    ],
    examples: [
      { title: "A question post that started a discussion", input: "Score 85, 64 comments, 9,200 views", result: "Score to comment ratio 1.3. Interaction proxy 16.2 per 1,000 views. Lots of discussion compared to votes.", note: "Hypothetical numbers." },
      { title: "A popular image post", input: "Score 2,400, 38 comments, 140,000 views", result: "Score to comment ratio 63. Interaction proxy 17.4 per 1,000 views. People liked it but had little to say.", note: "Hypothetical numbers." },
    ],
    guide: [
      { h: "What Reddit engagement means", p: ["Engagement is how people responded once they saw your post: voting and commenting. It says nothing about how many people saw it unless you also have views.", "The useful question is rarely \"was it high?\" but \"compared to what?\". Compare a post with your other posts in the same subreddit."] },
      { h: "Score versus upvotes", p: ["The number on a post is its score: roughly upvotes minus downvotes, and Reddit adjusts the displayed number. A score of 100 doesn't mean 100 people upvoted. It could be more upvotes offset by downvotes.", "This calculator always says score, never upvotes, because the exact vote counts aren't public."] },
      { h: "Views versus subreddit subscribers", p: ["Subscribers is how many people joined the community. Views is how many times your post was seen. Most members never see a given post, and people who aren't members see posts through search, the home feed and other sites.", "So score per 1,000 subscribers is a rough size adjustment, not a reach measure."] },
      { h: "Why comments matter", p: ["A comment takes more effort than a vote. A high comment to score ratio usually means the post started a conversation, though a heated argument looks the same in the numbers. Read the comments before deciding it went well."] },
      { h: "Why a large subreddit doesn't guarantee reach", p: ["Big communities move fast. A post can sink in minutes if it doesn't get early votes, while a small, active community might show it to most of its members.", "That's why the calculator doesn't compare your post to benchmark numbers by subreddit size. Those averages would be made up."] },
      { h: "How to interpret low engagement", p: ["Low numbers have many causes: posting at a quiet hour, a title that didn't say what the post was, a topic the community has seen many times, or a post the rules filtered. Check whether the post is visible when you're logged out before drawing conclusions."] },
    ],
    faqs: [
      ["How do I calculate Reddit engagement?", "Divide interactions by how many people saw the post. Score plus comments, per 1,000 views, is a common proxy. Without views, compare score to comments, or score to subreddit size."],
      ["Can I see Reddit post views?", "The person who posted can usually see a view count in the post's insights. Other people can't see views on someone else's post."],
      ["Are score and upvotes the same?", "No. Score is roughly upvotes minus downvotes, and Reddit adjusts the number it shows. Treat it as a score, not a count of people."],
      ["What does a high comment-to-score ratio mean?", "The post got people talking relative to how much it was voted on. Questions and debates usually have more comments per point of score than images or links."],
      ["Should I compare posts across different subreddits?", "Carefully. Communities vote and comment very differently. Comparisons are most useful between your own posts in the same subreddit."],
      ["Can this calculator predict viral performance?", "No. It describes what already happened to one post. It doesn't predict future posts."],
    ],
    service: "reddit",
    serviceWhy: "Numbers tell you what happened. Turning them into a plan for which communities to focus on, and what to post there, is part of the Reddit strategy work.",
    related: ["reddit-title-analyzer", "reddit-post-formatter", "reddit-ad-cost-calculator"],
    sources: [REDDIT_HELP],
  },

  "reddit-ad-cost-calculator": {
    slug: "reddit-ad-cost-calculator",
    name: "Reddit Ad Cost Calculator",
    keyword: "Reddit ad cost calculator",
    category: KIT_CATEGORIES.redditNumbers,
    title: "Reddit Ad Cost Calculator: Clicks, CPA & ROAS",
    description: "Reddit ad cost calculator. Enter your budget and CPC or CPM to estimate impressions, clicks, conversions, cost per acquisition and ROAS. Your assumptions, no invented averages.",
    lede: "This Reddit ad cost calculator estimates what your budget could buy before you launch. Enter your budget and your own CPC or CPM assumption to see impressions, clicks, conversions and ROAS.",
    sub: "Estimate your Reddit advertising costs before launching a campaign.",
    usage: "Free and unlimited. The maths runs in your browser.",
    processing: "browser",
    steps: [
      ["Set your budget", "Enter a total budget, or a daily budget and the number of days."],
      ["Choose CPC or CPM", "Pick the pricing that matches how you'll bid, and enter your own assumption for it."],
      ["Add funnel assumptions", "CTR, conversion rate and revenue per conversion turn clicks into results."],
      ["Try a range", "Use the scenario rows to see a cautious, expected and good case side by side."],
    ],
    examples: [
      { title: "A two week CPC test", input: "$50 a day for 14 days, $0.70 CPC, 2.5% conversion, $80 per sale", result: "$700 spend, 1,000 clicks, 25 sales, $28 cost per sale, $2,000 revenue, ROAS 2.86.", note: "Hypothetical assumptions, not Reddit averages." },
      { title: "A CPM awareness campaign", input: "$1,000 total, $4 CPM, 0.4% CTR", result: "250,000 impressions and 1,000 clicks. Without a conversion rate, no sales estimate is shown.", note: "Hypothetical assumptions." },
    ],
    guide: [
      { h: "How Reddit advertising costs work", p: ["Reddit ads run on an auction. You set a budget and a bid, and what you actually pay depends on the audience, the competition for it and how people respond to your ad. That's why any calculator can only work with assumptions: yours, or numbers from your own past campaigns.", "Reddit's own ads manager shows estimated reach once you set up a campaign. Use it to sanity check the assumptions you enter here."] },
      { h: "CPC versus CPM", p: ["CPC is cost per click: you pay when someone clicks. CPM is cost per thousand impressions: you pay for the ad being shown. With CPC, spend divided by CPC gives clicks. With CPM, spend divided by CPM, times 1,000, gives impressions, and your click through rate turns impressions into clicks.", "The calculator uses one of them to drive the estimate and says which, so the numbers never mix two pricing models."] },
      { h: "How to estimate clicks", p: ["Use your own data first: a past campaign on Reddit or a similar platform. If you have none, run a small test and replace the assumption with real numbers after a week."] },
      { h: "How to calculate ROAS", p: ["ROAS is revenue divided by ad spend. A ROAS of 3 means $3 of revenue for every $1 spent on ads. It isn't profit: product costs, fees and fulfilment still come out of that revenue.", "To see profit, add your gross margin. The calculator then shows gross profit after ads: revenue times margin, minus ad spend."] },
      { h: "How conversion rate changes a campaign", p: ["Conversion rate is usually the biggest lever. At the same CPC, going from 1% to 2% halves your cost per acquisition. That's why the landing page often matters as much as the ad."] },
      { h: "Paid Reddit ads versus organic community participation", p: ["Ads buy placement quickly and can be targeted and measured. Organic participation means posting and commenting in communities as yourself, within their rules. It costs time instead of ad spend, takes longer and can't be switched on and off, but it builds trust ads can't.", "Many businesses use both: organic to learn what the community cares about, ads to reach more of the people who'd care."] },
    ],
    faqs: [
      ["How much do Reddit ads cost?", "It depends on your audience, bid, ad and the competition when it runs. Reddit doesn't publish a fixed price. Your own test campaign is the most reliable source for your CPC or CPM."],
      ["What is CPC?", "Cost per click: the average you pay each time someone clicks your ad."],
      ["What is CPM?", "Cost per mille: the average you pay for 1,000 impressions of your ad, whether or not anyone clicks."],
      ["How much should I spend to test Reddit ads?", "Enough to get a meaningful number of clicks, so you can judge the click and conversion rates. Use this calculator backwards: decide how many clicks you need, then see what that costs at your assumed CPC. Check Reddit's current minimum budget in the ads manager."],
      ["What is a good ROAS?", "One where gross profit covers the ad spend and your other costs. A ROAS of 2 can be profitable for a high margin product and lose money for a low margin one. Add your margin to see which."],
      ["Can I run Reddit ads with a small budget?", "Yes, small tests are possible. Expect fewer clicks and noisier numbers, so judge results over a long enough period."],
      ["How accurate are advertising estimates?", "Only as accurate as the assumptions. Treat the result as a planning range, then replace each assumption with real data once the campaign runs."],
      ["Are Reddit ads better than organic Reddit marketing?", "They do different jobs. Ads are fast and scalable; organic participation is slower but builds trust in the community. Neither is free: one costs ad spend, the other costs time."],
    ],
    service: "ads",
    serviceWhy: "Estimates help you plan. Running the campaign, tracking it properly and adjusting it week by week is the hands on part.",
    related: ["marketing-roi-calculator", "break-even-roas-calculator", "customer-acquisition-cost-calculator", "reddit-engagement-calculator"],
    sources: [{ label: "Reddit Ads Help Center", href: "https://business.reddithelp.com/" }],
  },

  "reddit-ban-appeal-generator": {
    slug: "reddit-ban-appeal-generator",
    name: "Reddit Ban Appeal Generator",
    keyword: "Reddit ban appeal generator",
    category: KIT_CATEGORIES.redditWriting,
    title: "Reddit Ban Appeal Generator: Write a Respectful Appeal",
    description: "Reddit ban appeal generator for subreddit bans, suspensions and removals. Get a short, respectful draft and the right place to send it. Runs in your browser, nothing is uploaded.",
    lede: "This Reddit ban appeal generator helps you write a short, respectful appeal. Explain what happened and get a draft to review, plus where to send it: the subreddit's moderators or Reddit itself.",
    sub: "Write a clear, respectful Reddit ban appeal.",
    usage: "Free and private. The draft is built in your browser from a template. Nothing you type is uploaded or sent to an AI service.",
    processing: "browser",
    steps: [
      ["Choose what happened", "A subreddit ban, an account suspension, a sitewide ban or a removed post. They go to different places."],
      ["Describe it honestly", "Say what you posted and, if you know it, the rule they gave. Add why you're asking for a review."],
      ["Edit the draft", "Read it as the moderator would. Remove anything that isn't true or that sounds like an argument."],
      ["Send it to the right place", "Use the link shown for your situation, once, and wait for a reply."],
    ],
    examples: [
      { title: "A subreddit ban for self promotion", input: "Banned from r/AskBaking for linking my own blog. Rule 4: no self promotion. I didn't know blog links counted.", result: "A short note to the r/AskBaking mods that names the rule, explains the mistake and asks for a review, under 120 words.", note: "Hypothetical example." },
      { title: "An account suspension", input: "Suspended for spam after posting the same question in five subreddits.", result: "A draft for Reddit's appeal form that explains what happened and asks for a review, without promising anything the user can't keep.", note: "Hypothetical example." },
    ],
    guide: [
      { h: "The difference between a subreddit ban and a sitewide ban", p: ["A subreddit ban is a decision by one community's volunteer moderators. You can still use the rest of Reddit. A suspension or sitewide ban is a decision by Reddit's own staff and affects your whole account.", "That decides who reads your appeal. Moderators can't lift an account suspension, and Reddit staff don't review individual subreddit bans."] },
      { h: "How to contact moderators", p: ["Use modmail: the \"Message the mods\" link in the community's sidebar or about page. Messages there reach the whole moderator team, so don't message individual moderators directly.", "Send one message and give them time. Moderators are volunteers, and repeated messages can lead to a mute."] },
      { h: "How to appeal an account action", p: ["Reddit has an official appeal form for suspensions and account actions, reached while signed in to the affected account. Keep it short and factual: what happened, and why you think it should be reviewed."] },
      { h: "What to include in an appeal", p: ["The specific post or action, the rule if you were given one, an honest account of what happened and a clear request. If you made a mistake, say so plainly. If you think the action was a mistake, explain why calmly with facts."] },
      { h: "Common mistakes", p: ["Arguing, insulting the moderators, sending several messages, or claiming you did nothing when the post is still visible. All of these make reinstatement less likely. So does promising never to post again when you plan to keep posting."] },
      { h: "What to do after an appeal is rejected", p: ["Accept the decision for that community. Don't create a new account to get back in: that's ban evasion, it breaks Reddit's rules, and it can get every account you use suspended. Spend your time in communities where you're welcome."] },
    ],
    faqs: [
      ["How do I appeal a Reddit ban?", "For a subreddit ban, message the community's moderators through modmail. For an account suspension or sitewide ban, use Reddit's official appeal form while signed in."],
      ["Where should I send my appeal?", "Subreddit bans and removed posts: that subreddit's modmail. Account suspensions and sitewide bans: Reddit's appeal form. This page shows the right link for the option you pick."],
      ["Can I appeal a subreddit ban?", "Yes, by messaging the moderators. They aren't required to reverse it, and some communities say bans are final."],
      ["How long should an appeal be?", "Short. A few sentences up to about 200 words is plenty. Reddit's appeal form also has its own character limit."],
      ["What if I was banned without an explanation?", "Ask politely which rule the action was taken under, then respond to that. You can still send a short appeal without knowing the rule."],
      ["Does apologizing guarantee unbanning?", "No. An honest apology helps when you did break a rule, but the decision is the moderators' or Reddit's. Nothing guarantees reinstatement."],
      ["Can I use a new account after being banned?", "No. Using another account to get around a ban is ban evasion under Reddit's rules and can lead to all your accounts being suspended."],
      ["What happens if my appeal is rejected?", "The decision stands. Respect it, follow the rules elsewhere, and avoid repeated appeals."],
    ],
    service: null,
    serviceWhy: "",
    related: ["reddit-post-formatter", "reddit-title-analyzer"],
    sources: [CONTENT_POLICY, { label: "Reddit appeal form", href: "https://www.reddit.com/appeals" }],
  },

  "elevator-pitch-generator": {
    slug: "elevator-pitch-generator",
    name: "Elevator Pitch Generator",
    keyword: "elevator pitch generator",
    category: KIT_CATEGORIES.startup,
    title: "Elevator Pitch Generator: One Clear 30 to 90 Second Pitch",
    description: "Elevator pitch generator that writes one clear pitch from your problem, customer and product. Pick 30, 60 or 90 seconds. No invented traction or buzzwords.",
    lede: "This elevator pitch generator turns what you're building into one pitch you can say out loud. Describe the problem, who has it and what you do, and get a pitch timed for 30, 60 or 90 seconds.",
    sub: "Explain your business in a way people actually understand.",
    usage: "Free with a fair use limit. Your description is sent to a free AI service, so leave out anything confidential.",
    processing: "ai",
    steps: [
      ["Describe the business", "What it is, who it's for, the problem and why your way is useful. A sentence each is enough."],
      ["Pick the listener and length", "A customer, investor or interviewer needs a different emphasis. Choose 30, 60 or 90 seconds."],
      ["Add proof only if it's real", "Customers, revenue or results you can stand behind. Leave it blank otherwise: the pitch won't invent any."],
      ["Say it out loud and edit", "Read it aloud once. Change any phrase you wouldn't say naturally."],
    ],
    examples: [
      { title: "A bookkeeping service, 30 seconds", input: "Bookkeeping for independent restaurants; owners do books at midnight; we reconcile daily from the POS", result: "A pitch of about 70 words that opens with the late night bookkeeping problem, names restaurant owners, explains the daily reconciliation and closes with an offer to talk.", note: "Hypothetical business." },
      { title: "A SaaS tool for an investor, 60 seconds", input: "Scheduling for home care agencies; proof: 12 agencies in pilot", result: "A pitch of about 140 words that includes the 12 agency pilot exactly as given and nothing more.", note: "Hypothetical business." },
    ],
    guide: [
      { h: "What an elevator pitch is", p: ["A short spoken explanation of what you do, for whom and why it matters, said in the time a short conversation allows. Its job isn't to close a deal. It's to make the listener understand you and want to ask the next question."] },
      { h: "How long a pitch should be", p: ["Thirty seconds is about 70 spoken words: enough for the problem, who it's for and what you do. Sixty seconds lets you add why your approach works and some proof. Ninety seconds suits a scheduled intro or the start of a meeting.", "Shorter is usually better. You can always say more when they ask."] },
      { h: "What investors want to hear", p: ["A real problem, a clear customer, why now and why you, and honest evidence of progress. Investors hear many pitches: specific numbers you can defend beat big claims you can't."] },
      { h: "How customer pitches differ from investor pitches", p: ["A customer cares about their problem and whether you solve it. An investor cares about the business: the market, the traction, the team. Same product, different emphasis. Pick the listener in the tool and the pitch adjusts."] },
      { h: "How to make a pitch sound natural", p: ["Use words you'd use in conversation. Cut phrases like \"leveraging synergies\" and \"revolutionary platform\". Start with the problem rather than your company name. Practise it until you can say it without reading, then let it change slightly each time."] },
    ],
    faqs: [
      ["How do I write an elevator pitch?", "Start with the problem, say who has it, explain what you do about it and why it works, then close with a natural next step. Keep it to what you'd say in a short conversation."],
      ["What should a 30-second pitch include?", "The problem, the customer and what you do. That's about 70 words, so leave the details for the follow up questions."],
      ["What's the difference between an elevator pitch and a sales pitch?", "An elevator pitch opens a conversation. A sales pitch aims to get a decision. The elevator pitch should leave the listener curious, not pressured."],
      ["Should I include revenue?", "Only if it's real, relevant to the listener and you're comfortable sharing it. Investors may want it; most customers don't need it."],
      ["Can I use this for interviews?", "Yes. Choose Job interview as the listener and describe your work as the product: what you do, for whom and what's different about how you do it."],
      ["How do I make my pitch less generic?", "Add one specific detail: a real customer type, a concrete problem, a number you know. Specifics are what people remember."],
    ],
    service: "growth",
    serviceWhy: "A pitch explains your business. If you're still working out who it's for and why they'd choose you, the growth diagnosis looks at positioning and channels together.",
    related: ["pricing-page-analyzer", "startup-launch-checklist-generator", "saas-value-proposition-generator", "website-hero-headline-generator"],
  },

  "pricing-page-analyzer": {
    slug: "pricing-page-analyzer",
    name: "Pricing Page Analyzer",
    keyword: "pricing page analyzer",
    category: KIT_CATEGORIES.startup,
    title: "Pricing Page Analyzer: Find What Confuses Buyers",
    description: "Pricing page analyzer that reviews your pasted pricing text for clarity, package differences, billing terms, hidden costs and CTAs. Clear priorities, nothing assumed.",
    lede: "This pricing page analyzer reviews your pricing text and shows what's clear, what's confusing and what's missing. Paste your packages and terms, and get a prioritised list of fixes.",
    sub: "Find what's confusing customers on your pricing page.",
    usage: "Free with a fair use limit. The text you paste is sent to a free AI service, so only paste public page content.",
    processing: "ai",
    steps: [
      ["Paste your pricing text", "Copy the text from your pricing page: package names, prices, what's included, billing terms and the FAQ."],
      ["Add context", "Your business type, customer and sales process help the review judge fit."],
      ["Read the checks", "Each of the 12 checks says clear, unclear, missing or not verified. Not verified means the text couldn't show it."],
      ["Fix the top priorities", "Start with the first two priorities, then check the page on a phone yourself."],
    ],
    examples: [
      { title: "Three SaaS tiers without billing terms", input: "Starter $19, Pro $49, Team $99, feature lists only", result: "Flags missing billing period and renewal terms, unclear differences between Pro and Team, and no FAQ about cancellation.", note: "Hypothetical example." },
      { title: "A service business with custom pricing", input: "\"Contact us for a quote\" on every package", result: "Notes that custom pricing is a valid choice, then flags that buyers can't tell which package fits them and suggests what to include in each description.", note: "Hypothetical example." },
    ],
    guide: [
      { h: "What makes a clear pricing page?", p: ["A buyer should be able to answer four questions quickly: which option is for me, what do I get, what will I actually pay and what happens next. Most pricing pages fail on one of these, not on the price itself."] },
      { h: "How to describe packages", p: ["Lead each package with who it's for, then the few things that make it different from the one below. Long feature lists repeated across every tier make buyers compare line by line. Show what changes, not everything that stays the same."] },
      { h: "How to explain billing", p: ["Say how often you charge, whether prices include tax, what happens at renewal and how cancellation works. If annual billing is cheaper, show both the per month and the total figure, so nobody is surprised by the charge."] },
      { h: "How to build comparison tables", p: ["Use rows for the things buyers actually decide on. Group them, keep the wording short and use the same terms as the package cards. A table helps when packages differ in many ways; with two or three differences, plain text is enough."] },
      { h: "How to handle custom pricing", p: ["Custom pricing is fine when the work genuinely varies. Help buyers anyway: give a starting point or a typical range if you can, explain what affects the price and say what happens after they get in touch."] },
      { h: "Common pricing page mistakes", p: ["Hidden setup fees, unclear limits (\"fair use\" without saying what's fair), buttons that all say the same thing, and packages named so vaguely that nobody knows which to pick. None of these need a pricing change to fix, only clearer words."] },
    ],
    faqs: [
      ["How do I improve a pricing page?", "Make it easy to see which option fits, what's included, the full cost and the next step. Fix confusing wording first; that's often more useful than changing prices."],
      ["Should I show prices publicly?", "It depends on your sales process. Public prices help buyers who self serve. Custom quotes fit complex work. Either way, explain what drives the price."],
      ["How many pricing plans should I offer?", "As many as you have genuinely different buyers. One clear plan can work as well as three. There's no required number."],
      ["Do comparison tables help?", "When packages differ in several ways, yes. When they differ in one or two, a short sentence on each card is easier to read."],
      ["Should I offer monthly and annual plans?", "It's a business decision about cash flow and commitment, not a requirement. If you offer both, show the real total for each."],
      ["What should a pricing FAQ contain?", "Billing, renewal, cancellation, refunds if you offer them, what happens at limits, and how to upgrade or downgrade. Answer what buyers ask your sales team."],
      ["Can this analyzer improve conversion rates?", "It can point out unclear wording and missing information. It can't measure or predict conversion. Test changes with your own analytics."],
      ["How do I test changes?", "Change one thing at a time, and compare against the same period before. With enough traffic an A/B test is more reliable."],
    ],
    service: "growth",
    serviceWhy: "Clear wording fixes part of a pricing page. Whether the packages fit the right buyers, and how they find you in the first place, is what the growth diagnosis covers.",
    related: ["elevator-pitch-generator", "saas-value-proposition-generator", "landing-page-copy-generator", "marketing-roi-calculator"],
  },

  "startup-launch-checklist-generator": {
    slug: "startup-launch-checklist-generator",
    name: "Startup Launch Checklist Generator",
    keyword: "startup launch checklist generator",
    category: KIT_CATEGORIES.startup,
    title: "Startup Launch Checklist Generator: Plan Your Launch",
    description: "Startup launch checklist generator that builds one prioritised plan for before, during and after launch. Check off tasks, add your own and export to Markdown or CSV.",
    lede: "This startup launch checklist generator builds a plan around what you're actually launching. Describe your product, audience and stage, and get one prioritised checklist for before, on and after launch day.",
    sub: "Build a launch checklist around what you're actually launching.",
    usage: "Free with a fair use limit. Your description is sent to a free AI service, so leave out confidential plans. Your ticks and edits stay in this browser.",
    processing: "ai",
    steps: [
      ["Describe the launch", "Product type, audience and stage are enough. Add channels, team size and existing audience for a better fit."],
      ["Review the checklist", "Every task has a priority, an expected output, an owner role and, where relevant, what it depends on."],
      ["Make it yours", "Edit task names, remove what doesn't apply and add your own."],
      ["Track and export", "Tick tasks off as you go. Export to Markdown or CSV for your project tool."],
    ],
    examples: [
      { title: "A B2B SaaS in private beta", input: "Scheduling tool for physiotherapy clinics, private beta, two founders, channels: email and LinkedIn", result: "Before launch: onboarding checklist for beta clinics, pricing page, analytics on signup. Launch day: email to the waitlist, LinkedIn post. After: activation review and follow up calls.", note: "Hypothetical example." },
      { title: "A consumer app with no audience yet", input: "Habit tracker app, ready to launch, solo founder, no existing audience", result: "Puts early user research and a small launch list first, and suggests one community channel that fits the audience instead of every platform.", note: "Hypothetical example." },
    ],
    guide: [
      { h: "How to prepare for launch", p: ["Decide what launch means for you: opening signups, a public announcement or a press moment. Then work backwards. The product needs to work for the first user, the offer needs to be clear and you need a way to know whether anyone used it."] },
      { h: "What to check before going public", p: ["Sign up as a new user on a phone and a laptop. Check that payments, emails and password resets work, that analytics records a signup, and that someone can reach you with a problem."] },
      { h: "What to do on launch day", p: ["Announce it where your audience already is: your list, your network and any communities where you've taken part and self promotion is allowed. Then stay available. Answering questions quickly matters more than posting in more places."] },
      { h: "How to find early users", p: ["Talk to people with the problem before launch and invite them personally. Early users usually come from direct conversations, small communities and your own network, not from one big announcement."] },
      { h: "What to measure after launch", p: ["How many people signed up, how many reached the moment where the product was useful, and how many came back. Those three numbers tell you more than total visits."] },
      { h: "Common launch mistakes", p: ["Launching everywhere at once, treating launch day as the finish line, and not following up with the people who signed up. A launch is the start of learning, not the result."] },
    ],
    faqs: [
      ["What should a startup launch checklist include?", "Product readiness, a clear offer and landing page, analytics, the channels you'll use, launch day communication and a plan to learn from the first users afterwards."],
      ["How early should I start planning?", "Start once the product works for a first user. A few weeks of preparation is typical, but it depends on the size of the launch."],
      ["Do I need a launch budget?", "No. Many launches rely on your own network and communities. A budget helps if paid channels fit your audience."],
      ["Should I launch on Product Hunt?", "Only if your audience is there, which is often true for tools for makers and tech teams and often not for others. The checklist only suggests it when it fits."],
      ["How do I find my first users?", "Direct conversations with people who have the problem, your own network and small communities where you already take part."],
      ["What if my launch gets little attention?", "That's common. Talk to the people who did sign up, improve what they struggled with and keep reaching out. Launch day is one day."],
      ["What should I measure after launch?", "Signups, activation (reaching the useful moment) and return visits or retention. Add revenue once you charge."],
    ],
    service: "growth",
    serviceWhy: "A checklist keeps launch week organised. Choosing the right channels and turning early interest into steady growth is what the growth strategy work is for.",
    related: ["elevator-pitch-generator", "pricing-page-analyzer", "product-hunt-launch-copy-generator", "startup-runway-calculator"],
  },

  "marketing-roi-calculator": {
    slug: "marketing-roi-calculator",
    name: "Marketing ROI Calculator",
    keyword: "marketing ROI calculator",
    category: KIT_CATEGORIES.startup,
    title: "Marketing ROI Calculator: ROI, ROAS, CAC & Break Even",
    description: "Marketing ROI calculator that uses gross profit, not revenue. See ROI, ROAS, cost per lead, CAC and break even revenue, with every formula shown.",
    lede: "This marketing ROI calculator shows what your marketing spend actually returned. Enter your costs and the revenue or gross profit it brought in to see ROI, ROAS, cost per lead and CAC.",
    sub: "See what your marketing spend is actually returning.",
    usage: "Free and unlimited. The maths runs in your browser.",
    processing: "browser",
    steps: [
      ["Enter your marketing spend", "Everything you spent on the campaign or period: ads, tools, content, agency fees."],
      ["Enter what it brought in", "Revenue you can attribute to it, and your gross margin or gross profit."],
      ["Add leads and customers", "For cost per lead and customer acquisition cost."],
      ["Read the formulas", "Every result shows how it was worked out, so you can check it."],
    ],
    examples: [
      { title: "A profitable campaign", input: "$2,000 spend, $500 other costs, $10,000 revenue, 40% margin, 100 leads, 20 customers", result: "Gross profit $4,000, ROI 60%, ROAS 5.0, cost per lead $25, CAC $125, break even at $6,250 revenue.", note: "Hypothetical numbers." },
      { title: "A high ROAS that still loses money", input: "$1,000 spend, $3,000 revenue, 25% margin", result: "ROAS 3.0, but gross profit is $750, so ROI is minus 25%.", note: "Hypothetical numbers. ROAS looked fine; profit didn't." },
    ],
    guide: [
      { h: "What marketing ROI means", p: ["Return on investment compares what marketing earned with what it cost. Here it's (gross profit minus marketing cost) divided by marketing cost. A result of 50% means every $1 spent came back as $1.50 of gross profit."] },
      { h: "ROI versus ROAS", p: ["ROAS is revenue divided by ad spend. ROI uses profit and all marketing costs. ROAS can look healthy while ROI is negative, because revenue isn't what you keep. Use ROAS to compare ads and ROI to decide whether the marketing paid off."] },
      { h: "What costs to include", p: ["Every cost the marketing caused: ad spend, tools, freelancers or agencies, content production and sales commission. Include staff time if you want a full picture and can estimate it fairly; leave it out if you're comparing channels on spend alone. Be consistent."] },
      { h: "How to attribute results", p: ["Attribution is deciding which revenue came from which marketing. Use tracked links, your ad platform's conversions and your CRM. Some customers will touch several channels, so any attribution is an estimate. Note your method and keep it the same over time."] },
      { h: "How to interpret negative ROI", p: ["Negative ROI means the gross profit didn't cover the cost in this period. It isn't automatically a failure: customers who buy again later, or brand campaigns that pay off slowly, can still be worth it. Compare against customer lifetime value before cutting a channel."] },
      { h: "Why campaign revenue is not profit", p: ["Revenue still has to pay for the product, delivery, payment fees and more. That's why this calculator won't show ROI from revenue alone. Add your gross margin or gross profit to see it."] },
    ],
    faqs: [
      ["How do I calculate marketing ROI?", "Subtract marketing cost from the gross profit it generated, divide by marketing cost and multiply by 100. For example, $4,000 gross profit on $2,500 cost is 60%."],
      ["What's the difference between ROI and ROAS?", "ROAS is revenue per dollar of ad spend. ROI is profit after all marketing costs, as a percentage of those costs. ROI is the one that tells you if it paid off."],
      ["What is a good marketing ROI?", "Any positive ROI means the marketing more than paid for itself in the period you measured. What's good depends on your margins, how long customers stay and your other options for the money."],
      ["Should I include employee costs?", "If you want the full cost, yes, as long as you estimate them consistently. For comparing channels, many people use direct costs only. Choose one approach and stick with it."],
      ["How should I count recurring revenue?", "Count the gross profit from the period you're measuring, or use customer lifetime value if you're judging acquisition. Say which, because they give very different answers."],
      ["Can ROI be negative?", "Yes. It means gross profit was less than the marketing cost in that period."],
      ["Why might ROI be misleading?", "Short time frames, attribution guesses and leaving out costs all distort it. Treat it as one view of performance, alongside CAC and lifetime value."],
    ],
    service: "growth",
    serviceWhy: "The calculator shows whether marketing paid off. Working out which channels to keep, cut or scale is part of the growth diagnosis.",
    related: ["customer-acquisition-cost-calculator", "break-even-roas-calculator", "ltv-cac-ratio-calculator", "reddit-ad-cost-calculator"],
  },

  "startup-runway-calculator": {
    slug: "startup-runway-calculator",
    name: "Startup Runway Calculator",
    keyword: "startup runway calculator",
    category: KIT_CATEGORIES.startup,
    title: "Startup Runway Calculator: Burn Rate & Months Left",
    description: "Startup runway calculator for gross burn, net burn and months of cash left, with scenarios for cutting costs or growing revenue. Honest when cash is stable.",
    lede: "This startup runway calculator shows how long your cash could last. Enter your cash, monthly spending and monthly income to see your burn rate, runway and how changes would extend it.",
    sub: "Find out how long your startup's cash could last.",
    usage: "Free and unlimited. The maths runs in your browser and nothing is saved.",
    processing: "browser",
    steps: [
      ["Enter your cash", "The cash you can actually spend today, across your accounts."],
      ["Enter monthly spending and income", "Average monthly cash out and cash in. Use cash, not invoices you haven't been paid for."],
      ["Add planned costs if any", "A new hire or a tool you've committed to adds to the monthly burn."],
      ["Compare the scenarios", "See what cutting costs, growing income or a one off cash event would change."],
    ],
    examples: [
      { title: "A seed stage startup", input: "$120,000 cash, $25,000 monthly expenses, $10,000 monthly income", result: "Net burn $15,000 a month, about 8 months of runway.", note: "Hypothetical numbers." },
      { title: "A business that covers its costs", input: "$50,000 cash, $10,000 expenses, $12,000 income", result: "Cash grows by $2,000 a month, so there's no run out date under these assumptions.", note: "Hypothetical numbers." },
    ],
    guide: [
      { h: "What startup runway means", p: ["Runway is how many months your current cash would last at your current rate of spending, if nothing changed. It's a planning number: it tells you how long you have to reach the next milestone, raise money or become profitable."] },
      { h: "Gross burn versus net burn", p: ["Gross burn is everything you spend in a month. Net burn is gross burn minus the cash that comes in. Runway uses net burn: a company spending $25,000 and collecting $10,000 is really burning $15,000."] },
      { h: "How to calculate runway", p: ["Divide your cash by your net monthly burn. $120,000 divided by $15,000 is 8 months. If income covers spending, there's no burn and no run out date under those assumptions."] },
      { h: "How revenue affects runway", p: ["Every dollar of monthly income reduces net burn by a dollar, which is why small, steady revenue can extend runway a lot. The scenarios show the effect of growing income alongside cutting costs."] },
      { h: "When to reduce expenses", p: ["Many founders aim to start fundraising or cutting costs with plenty of runway left, because raising money and changing course both take months. Look at the largest costs first; small cuts rarely move runway much."] },
      { h: "Why forecasts can be wrong", p: ["Spending creeps up, income arrives late and one off costs appear. Treat the result as the best case under your assumptions and update it every month with real numbers."] },
    ],
    faqs: [
      ["How do I calculate startup runway?", "Divide the cash you have by your net monthly burn: monthly cash out minus monthly cash in."],
      ["What is burn rate?", "How much cash you use each month. Gross burn is total spending; net burn is spending minus income."],
      ["What's the difference between gross burn and net burn?", "Gross burn counts all spending. Net burn subtracts the cash coming in. Net burn is what reduces your bank balance."],
      ["What if my startup is profitable?", "If cash in is equal to or more than cash out, your cash is stable or growing, so there's no run out date under those assumptions."],
      ["Should I include future fundraising?", "Not in your main number. Money that hasn't arrived can be delayed or not happen. Use the cash event scenario to see the effect separately."],
      ["How can I extend runway?", "Reduce the largest monthly costs, grow monthly income, collect payments sooner or raise more money. The scenarios show the size of each effect."],
      ["Is 12 months of runway enough?", "Many founders treat 12 months or more as a comfortable position because fundraising can take several months, but it depends on your plans and how predictable your income is."],
    ],
    service: "growth",
    serviceWhy: "Runway tells you how much time you have. Using that time to find the growth channels that work is what the growth strategy work is for.",
    related: ["marketing-roi-calculator", "customer-acquisition-cost-calculator", "mrr-calculator", "startup-launch-checklist-generator"],
  },
};

export const KIT_SLUGS = Object.keys(KIT) as KitSlug[];
