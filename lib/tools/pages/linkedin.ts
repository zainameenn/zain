import { FAIR_USE, LINK_CONTENT_SERVICE, LINK_POSITIONING, LINK_SERVICES } from "../links";
import type { ToolPage } from "../types";
import { ERROR_TEXT, dataNote, freeFaq } from "../families/common";

// LinkedIn Headline, About Section, Post and Comment generators (docs/tools-spec.md).

const headline = (role: string, audience: string, outcome: string, keywords: string, tone = "Clear") => ({ role, audience, outcome, proof: "", keywords, goal: "Get clients", tone });

export const HEADLINE: ToolPage = {
  slug: "linkedin-headline-generator",
  name: "LinkedIn Headline Generator",
  keyword: "linkedin headline generator",
  group: "LinkedIn",
  metaTitle: "LinkedIn Headline Generator: 5 Free Headlines That Click",
  metaDescription: "This free LinkedIn headline generator writes 5 headlines from your role, audience and real proof, each under 220 characters with the key words up front.",
  h1: { regular: "Free LinkedIn", accent: "Headline Generator" },
  heroDescription:
    "This LinkedIn headline generator writes a headline from your role, your audience and the proof you actually have. It fits LinkedIn's 220 characters and puts the important words in the part people really see.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "role", label: "What do you do?", type: "text", placeholder: "Growth marketer", required: true, maxLength: 150 },
      { name: "audience", label: "Who do you help?", type: "text", placeholder: "B2B SaaS startups", required: true, maxLength: 200 },
      { name: "outcome", label: "What do you help them get?", type: "text", placeholder: "More demo calls from SEO and Reddit", required: true, maxLength: 300 },
      { name: "proof", label: "Real proof (optional)", type: "text", placeholder: "Grew a SaaS from 0 to 2,000 signups", maxLength: 300 },
      { name: "keywords", label: "Words recruiters or clients search (optional)", type: "text", placeholder: "SaaS SEO, GTM", maxLength: 200 },
      { name: "goal", label: "Main goal", type: "select", options: ["Get clients", "Get hired", "Build an audience", "Raise money"] },
      { name: "tone", label: "Tone", type: "chips", options: ["Clear", "Bold", "Friendly", "Witty"] },
    ],
    button: "Write my LinkedIn headline",
    secondary: "Try an example",
    exampleInput: { role: "Growth marketer", audience: "B2B SaaS startups", outcome: "More demo calls from SEO and Reddit", proof: "Grew a SaaS from 0 to 2,000 signups", keywords: "SaaS SEO, GTM", goal: "Get clients", tone: "Clear" },
    resultsHeading: "Your LinkedIn headline",
    emptyState: "Your headline shows up here, with a counter and a marker where search and comments usually cut it off.",
    more: "Regenerate",
    dataNote: dataNote("headlines"),
    errorText: ERROR_TEXT,
    result: { kind: "options", limit: 220, fold: { chars: 65, label: "what shows in search and comments" } },
  },
  howTo: {
    heading: "How to use the LinkedIn headline generator",
    steps: [
      "**Fill in role, audience and outcome.** Those three make up 90% of a great headline.",
      "**Add proof only if it's real.** A real number beats a big adjective.",
      "**Check the first 65 characters.** That's often all people see in comments and search.",
    ],
  },
  examples: {
    heading: "LinkedIn headline examples for founders and service providers",
    layout: "table",
    columns: [
      { label: "Vague", value: "before" },
      { label: "Better", value: "output" },
    ],
    items: [
      { inputLabel: "Growth marketer", before: "Marketing Professional", output: "Growth marketer for B2B SaaS · SEO and Reddit that bring demo calls", input: headline("Growth marketer", "B2B SaaS", "Demo calls from SEO and Reddit", "SaaS SEO, Reddit marketing") },
      { inputLabel: "Founder", before: "Founder & CEO", output: "Founder of a scheduling app for dental clinics · Fewer no shows, fuller chairs", input: headline("Founder of a scheduling app", "Dental clinics", "Fewer no shows, fuller chairs", "dental scheduling software") },
      { inputLabel: "Brand designer", before: "Graphic designer", output: "Brand designer for coffee shops · Logos and menus people remember", input: headline("Brand designer", "Coffee shops", "Logos and menus people remember", "brand design, menu design", "Friendly") },
      { inputLabel: "Career coach", before: "Passionate about helping people", output: "Career coach for engineers moving into management", input: headline("Career coach", "Engineers moving into management", "A smooth move into their first management role", "engineering management coach") },
      { inputLabel: "Bookkeeper", before: "Consultant", output: "Bookkeeper for restaurants · Clean books in 48 hours a month", input: headline("Bookkeeper", "Restaurants", "Clean books in 48 hours a month", "restaurant bookkeeping") },
    ],
  },
  sections: [
    {
      heading: "Choose between role, audience and outcome headlines",
      blocks: [
        { p: "Your headline follows you everywhere on LinkedIn: comments, search, connection requests. It's your name tag at every party LinkedIn throws." },
        { p: "There are three ways to write it, and the tool can write any of them:" },
        {
          ol: [
            "**Role led:** \"Growth marketer for B2B SaaS\". Best if you're job hunting, because recruiters search titles.",
            "**Audience led:** \"Helping dental clinics fill their calendars\". Best if you sell to one clear group.",
            "**Outcome led:** \"SEO that brings demo calls, not just traffic\". Best if your result is your selling point.",
          ],
        },
        { p: "**THE FIRST 65 OR SO CHARACTERS DO MOST OF THE WORK.** Put the words that matter there." },
      ],
    },
    {
      heading: "Avoid claims you can't support",
      blocks: [
        { p: "\"Top 1% marketer.\" \"World class strategist.\" \"Visionary.\" People read those and quietly scroll past." },
        { p: "If you have a real number, use it. If you don't, describe the work clearly. Specific and modest beats huge and vague every time." },
        { p: "**Common mistake:** the hashtag headline, like \"#Marketing #Growth #Leadership #AI\". It says nothing about who you help." },
      ],
    },
  ],
  faqs: [
    freeFaq("LinkedIn headline generator"),
    { q: "How long can a LinkedIn headline be?", a: "220 characters. Only the first 60 to 70 usually show in comments and search." },
    { q: "What if I have no results yet?", a: "Leave proof empty. The tool focuses on who you help and how, without inventing achievements." },
    { q: "Can I include several services?", a: "You can, but one clear focus usually works better. Use your About section for the rest." },
    { q: "How many headlines do I get?", a: "One headline written for you. Click Regenerate for a fresh take, or use Refine to type a change or tap a chip like Shorter. Keep the one your ideal client would understand in two seconds." },
  ],
  ctas: [
    {
      heading: "Want help positioning your profile and content?",
      copy: "I help founders and service providers turn LinkedIn into a steady source of conversations, starting with a profile that says what you do in one look.",
      button: "See how I can help",
      href: LINK_SERVICES,
    },
  ],
  related: [{ slug: "linkedin-about-section-generator" }, { slug: "linkedin-post-generator" }, { slug: "linkedin-comment-generator" }],
  extraLinks: [],
  api: { block: "headline", vars: {} },
};

const aboutFounder = {
  background: "Ran the front desk at a dental clinic for 6 years, then built scheduling software to fix the no shows I dealt with every day",
  audience: "Dental clinic managers, investors",
  services: "Scheduling software for dental clinics",
  approach: "I still spend one day a month at a clinic front desk to see how the product holds up",
  wins: "",
  personal: "Coffee snob, terrible at chess",
  cta: "Book a call",
  tone: "Warm",
};

export const ABOUT: ToolPage = {
  slug: "linkedin-about-section-generator",
  name: "LinkedIn About Section Generator",
  keyword: "linkedin about section generator",
  group: "LinkedIn",
  metaTitle: "LinkedIn About Section Generator: Free, Sounds Like You",
  metaDescription: "This free LinkedIn About section generator turns your real experience into a short and a full About section. No invented wins, no corporate fluff.",
  h1: { regular: "Free LinkedIn About", accent: "Section Generator" },
  heroDescription:
    "This LinkedIn About section generator turns your real experience into a first person summary that reads like you. It keeps your actual wins and never invents the ones you don't have.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "background", label: "Your background, in a few lines", type: "textarea", placeholder: "Started in content writing, moved to SEO, now run growth for SaaS", required: true, maxLength: 1500 },
      { name: "audience", label: "Who do you want reading this?", type: "text", placeholder: "SaaS founders, hiring managers", required: true, maxLength: 300 },
      { name: "services", label: "What do you offer or do?", type: "text", placeholder: "SEO, Reddit marketing, content", required: true, maxLength: 300 },
      { name: "approach", label: "How do you work, or what makes you different?", type: "textarea", placeholder: "I start with what's already working before adding new channels", maxLength: 1000 },
      { name: "wins", label: "Real achievements (optional)", type: "textarea", placeholder: "Built marketing from scratch as the first marketing hire", maxLength: 1000 },
      { name: "personal", label: "A personal detail (optional)", type: "text", placeholder: "Big Elden Ring fan", maxLength: 200 },
      { name: "cta", label: "What should readers do?", type: "select", options: ["Message me", "Book a call", "Visit my site", "Follow"] },
      { name: "tone", label: "Tone", type: "chips", options: ["Warm", "Direct", "Witty", "Formal"] },
    ],
    button: "Write my About section",
    secondary: "Try an example",
    exampleInput: aboutFounder,
    resultsHeading: "Your About section",
    emptyState: "Your About section shows up here, with the lines people see before \"See more\" highlighted.",
    more: "Write it again",
    dataNote: dataNote("About section"),
    errorText: ERROR_TEXT,
    result: { kind: "about", limit: 2600, fold: 220, foldLabel: "what people see before See more", tabs: ["Short", "Full"] },
  },
  howTo: {
    heading: "How to use the LinkedIn About section generator",
    steps: [
      "**Type your story like you'd tell a friend.** Rough is fine. Where you started, what you do now, who you do it for.",
      "**Add only real wins.** Leave it blank if you're early. The tool won't fill the gap with fiction.",
      "**Read it out loud.** If it doesn't sound like you, change the tone and run it again.",
    ],
  },
  examples: {
    heading: "LinkedIn About section examples",
    layout: "wide",
    items: [
      {
        inputLabel: "Founder (short version)",
        input: aboutFounder,
        output:
          "I help dental clinics stop losing chairs to no shows.\n\nI ran a clinic front desk for six years, so I built the scheduling tool I wished I'd had. I still spend one day a month behind a front desk to see how it holds up.\n\nIf no shows are eating your week, book a call and I'll show you how it works.",
        why: "Who it helps comes first, the story earns trust, and there's one clear ask.",
      },
      {
        inputLabel: "Consultant (short version)",
        input: {
          background: "Started in restaurant kitchens, trained as an accountant, now do bookkeeping for restaurants",
          audience: "Restaurant owners with 1 to 3 locations",
          services: "Monthly bookkeeping, payroll and P and L reports for restaurants",
          approach: "I send a plain English summary with every report, so owners know what changed and why",
          wins: "Kept the books for 14 restaurants, 3 years running",
          personal: "Still make a decent omelette under pressure",
          cta: "Message me",
          tone: "Direct",
        },
        output:
          "I keep the books for restaurants with 1 to 3 locations, so owners know their numbers without decoding a spreadsheet.\n\nI started in kitchens before I trained as an accountant. Every report I send comes with a plain English summary of what changed and why. I've kept the books for 14 restaurants, 3 years running.\n\nMessage me if your P and L still feels like a mystery.",
        why: "Real wins only, in first person, with a direct tone that matches the work.",
      },
    ],
  },
  sections: [
    {
      heading: "Write an About section using your actual experience",
      blocks: [
        { p: "Your About section is the one place on LinkedIn where you get more than a sentence. Most people waste it on a CV in paragraph form." },
        { p: "A good one answers three questions, in order:" },
        {
          ol: [
            "**Who do you help, and with what?** First two lines. This is all most people see before \"See more\".",
            "**Why should they believe you?** Your path, your approach, a real result or two.",
            "**What should they do next?** One clear ask.",
          ],
        },
        { p: "**WRITE IT IN FIRST PERSON.** \"Zain is a results driven professional\" sounds like you hired a narrator. \"I help SaaS teams get demo calls from SEO\" sounds like a human." },
      ],
    },
    {
      heading: "What to include when you're starting out",
      blocks: [
        { p: "No big wins yet? Fine. Write about how you work, what you're learning and who you want to help. Honest and early beats impressive and fake. Readers can smell the second one from a mile away." },
        { p: "**Common mistake:** the buzzword bingo card. Dynamic, strategic, innovative, synergy. Swap every one of those for a real example." },
      ],
    },
    {
      heading: "Make the final version sound like you",
      blocks: [{ p: "The tool gives you a strong draft. You make it yours. Swap one sentence for something only you would say, a weird detail, a strong opinion, a line from your actual life. That's the bit people remember." }],
    },
  ],
  faqs: [
    freeFaq("LinkedIn About section generator"),
    { q: "How long can a LinkedIn About section be?", a: "2,600 characters. Only the first few lines show before \"See more\", so those matter most." },
    { q: "Should I write in first or third person?", a: "First person. It's friendlier and it's how almost everyone writes theirs now." },
    { q: "Will it invent achievements?", a: "No. It only uses what you type. If it would be stronger with a real number, it tells you." },
    { q: "Is this the same as a LinkedIn bio?", a: "Yes. People call it the About section, the summary or the bio. Same box." },
  ],
  ctas: [
    {
      heading: "Need help turning your experience into clear positioning?",
      copy: "I help founders and consultants figure out what to say, then say it everywhere: profile, posts and site.",
      button: "Let's talk positioning",
      href: LINK_POSITIONING,
    },
  ],
  related: [{ slug: "linkedin-headline-generator" }, { slug: "linkedin-post-generator" }, { slug: "instagram-bio-generator" }],
  extraLinks: [],
  api: { block: "about", vars: {} },
};

const postCase = {
  topic: "Why we stopped running Facebook ads for a B2B client",
  notes: "Spent $3k in 2 months, 0 qualified leads. Moved budget to LinkedIn outreach, 6 calls in 3 weeks",
  point: "Pick the channel your buyers already use",
  format: "Case study",
  audience: "B2B founders",
  tone: "Conversational",
  length: "Short (under 600)",
  cta: "Question",
};

const postCtas = [
  {
    heading: "Want a content plan built around your business?",
    copy: "I build LinkedIn content plans for founders and service businesses, so every post moves someone closer to a call.",
    button: "See my content service",
    href: LINK_CONTENT_SERVICE,
  },
];
export const POST: ToolPage = {
  slug: "linkedin-post-generator",
  name: "LinkedIn Post Generator",
  keyword: "linkedin post generator",
  group: "LinkedIn",
  metaTitle: "LinkedIn Post Generator: Free Posts Written From Your Notes",
  metaDescription: "This free LinkedIn post generator turns your rough notes into 3 hooks and a full post that sounds like you. No fake stories, no cringe templates.",
  h1: { regular: "Free LinkedIn", accent: "Post Generator" },
  heroDescription:
    "This LinkedIn post generator turns your rough notes into one full post with a strong hook. It keeps your details, your opinions and your voice, and it never makes up a story you didn't live.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "topic", label: "What's the post about?", type: "text", placeholder: "Why we stopped running Facebook ads for a B2B client", required: true, maxLength: 300 },
      { name: "notes", label: "Your notes, messy is fine", type: "textarea", placeholder: "Spent $3k in 2 months, 0 qualified leads. Moved budget to LinkedIn outreach, 6 calls in 3 weeks", required: true, maxLength: 3000 },
      { name: "point", label: "The one thing readers should take away", type: "text", placeholder: "Pick the channel your buyers already use", maxLength: 300 },
      { name: "format", label: "Format", type: "select", options: ["Story", "Lesson list", "How to", "Opinion", "Case study", "Announcement"] },
      { name: "audience", label: "Who's reading?", type: "text", placeholder: "B2B founders", maxLength: 200 },
      { name: "tone", label: "Tone", type: "chips", options: ["Conversational", "Bold", "Thoughtful", "Funny"] },
      { name: "length", label: "Length", type: "chips", options: ["Short (under 600)", "Medium (600 to 1,300)", "Long (1,300 to 2,500)"], defaultValue: "Medium (600 to 1,300)" },
      { name: "cta", label: "How should it end?", type: "select", options: ["Question", "Soft CTA", "No CTA"] },
    ],
    button: "Write my LinkedIn post",
    secondary: "Try an example",
    exampleInput: postCase,
    resultsHeading: "Your LinkedIn post",
    emptyState: "Your post shows up here. Regenerate for a fresh take, or refine it with a change of your own.",
    more: "Write it again",
    dataNote: dataNote("post"),
    errorText: ERROR_TEXT,
    result: { kind: "post", limit: 3000, fold: 140, foldLabel: "what shows before See more" },
  },
  howTo: {
    heading: "How to use the LinkedIn post generator",
    steps: [
      "**Dump your notes.** Numbers, what happened, what you'd do differently. This is the part no generator can fake.",
      "**Say the one takeaway.** One post, one point.",
      "**Read it once, then post.** If a line doesn't sound like you, change it. Your followers know your voice better than any tool.",
    ],
  },
  examples: {
    heading: "LinkedIn post examples for lessons, case studies and updates",
    layout: "wide",
    items: [
      {
        inputLabel: "Case study",
        input: postCase,
        output: "$3k in 2 months. 0 qualified leads.\n\nThat was our Facebook ads test for a B2B client. So we moved the budget to LinkedIn outreach instead.\n\n6 calls in 3 weeks.\n\nThe lesson: pick the channel your buyers already use.\n\nWhat's a channel you dropped that everyone told you to keep?",
        why: "Every number came from the notes. The post adds structure, not new facts.",
      },
      {
        inputLabel: "Lesson list",
        input: {
          topic: "What I learned from my first 10 client projects",
          notes: "Underpriced the first 4. Two clients wanted weekly calls, which ate 5 hours a week. Started sending a written update every Friday instead, calls dropped to monthly",
          point: "Write things down before you add meetings",
          format: "Lesson list",
          audience: "New service business owners",
          tone: "Thoughtful",
          length: "Short (under 600)",
          cta: "Soft CTA",
        },
        output: "10 client projects in, here's what I'd tell my first year self.\n\n1. I underpriced the first 4.\n2. Weekly calls with two clients ate 5 hours a week.\n3. A written update every Friday replaced most of them. Calls dropped to monthly.\n\nWrite things down before you add meetings.\n\nFollow along if you're early in too.",
        why: "Short numbered lessons, each one a real detail from the notes.",
      },
      {
        inputLabel: "Announcement",
        input: {
          topic: "Launching online booking for our clinic software",
          notes: "Patients can now book online in two clicks. Took 4 months to build. Free for existing customers",
          point: "Patients book when it's easy",
          format: "Announcement",
          audience: "Dental clinic managers",
          tone: "Conversational",
          length: "Short (under 600)",
          cta: "No CTA",
        },
        output: "Patients can now book a dental appointment in two clicks.\n\nOur online booking page is live, and it's free for every existing customer. It took us 4 months to build.\n\nPatients book when it's easy.",
        why: "What changed, why it matters to the reader, and an ending on the takeaway.",
      },
    ],
  },
  sections: [
    {
      heading: "Add the details a generator can't know",
      blocks: [
        { p: "Here's the thing about AI LinkedIn posts: everyone can spot them now. The tell isn't the grammar. It's the emptiness. \"Consistency is key.\" \"Your network is your net worth.\" Cool. Says who?" },
        { p: "**THE DETAILS ARE THE POST.** \"$3k in 2 months, 0 qualified leads\" is interesting. \"Paid ads didn't work for us\" is wallpaper." },
        { p: "So before you hit the button, add at least one of these: a real number, a mistake you made, something you saw with your own eyes, or an opinion people might disagree with." },
      ],
    },
    {
      heading: "Review the draft before you post",
      blocks: [
        {
          ol: [
            "**Read the first two lines alone.** That's often all people see before \"See more\". Would you click?",
            "**Check every fact.** The tool only uses your notes, but you know what's true.",
            "**Cut one sentence.** There's always one.",
          ],
        },
        { p: "**Common mistake:** the broetry format, one word. Per line. For drama. Use short lines where they help, not everywhere." },
      ],
    },
  ],
  faqs: [
    freeFaq("LinkedIn post generator"),
    { q: "Can it rewrite a draft I already have?", a: "Yes. Paste your draft into the notes field and pick the format you want." },
    { q: "Will it invent personal stories?", a: "No. It only uses what's in your notes. If the post needs a detail, it asks for it instead." },
    { q: "Can I change the tone?", a: "Yes. Switch the tone and regenerate, or use Refine to tap a chip like Shorter or type your own change." },
    { q: "How long should a LinkedIn post be?", a: "LinkedIn allows 3,000 characters. Most good posts are a few hundred to about 1,500." },
  ],
  ctas: postCtas,
  related: [{ slug: "linkedin-comment-generator" }, { slug: "linkedin-headline-generator" }, { slug: "social-media-content-calendar-generator" }],
  extraLinks: [],
  api: { block: "post", vars: {} },
};

const SHORT = "Short (1 to 2 lines)";
const MEDIUM = "Medium (3 to 4 lines)";

export const COMMENT: ToolPage = {
  slug: "linkedin-comment-generator",
  name: "LinkedIn Comment Generator",
  keyword: "linkedin comment generator",
  group: "LinkedIn",
  metaTitle: "LinkedIn Comment Generator: Free Comments That Add Value",
  metaDescription: "This free LinkedIn comment generator turns any post and your own take into 3 thoughtful comments. No \"Great post!\", no auto posting.",
  h1: { regular: "Free LinkedIn", accent: "Comment Generator" },
  heroDescription:
    "This LinkedIn comment generator turns any post plus your own take into a comment worth reading that adds an insight, asks a smart question or politely pushes back. You copy, tweak and post it yourself.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "post", label: "Paste the post", type: "textarea", placeholder: "(paste the LinkedIn post text)", required: true, maxLength: 3000 },
      { name: "view", label: "Your take, in one line", type: "text", placeholder: "I agree, but it only works once you have some brand awareness", required: true, maxLength: 300 },
      { name: "experience", label: "Related experience (optional)", type: "textarea", placeholder: "Tried this at a 5 person startup, it flopped until month 3", maxLength: 1000 },
      { name: "type", label: "What kind of comment?", type: "chips", options: ["All three", "Add insight", "Ask a question", "Respectful pushback"], defaultValue: "All three" },
      { name: "length", label: "Length", type: "chips", options: [SHORT, MEDIUM], defaultValue: SHORT },
    ],
    button: "Write my comment",
    secondary: "Try an example",
    exampleInput: {
      post: "Most SaaS pricing pages have too many plans. Every extra plan is one more decision a buyer has to make before they sign up. Fewer plans, faster yes.",
      view: "Agree, cutting plans helped us too",
      experience: "We cut our pricing from 4 plans to 2 and support tickets dropped",
      type: "All three",
      length: SHORT,
    },
    resultsHeading: "Your LinkedIn comment",
    emptyState: "Your comment shows up here, with its type and a counter.",
    more: "Regenerate",
    dataNote: dataNote("comments"),
    resultsNote: "We never post for you. Read it, tweak it, post it.",
    errorText: ERROR_TEXT,
    result: { kind: "options", limit: { field: "length", map: { [SHORT]: 250, [MEDIUM]: 600 }, fallback: 250 } },
  },
  howTo: {
    heading: "How to use the LinkedIn comment generator",
    steps: [
      "**Paste the post.** The whole thing, so the tool gets the context.",
      "**Add your take in one line.** Agree, disagree, add a twist. This is what makes the comment yours.",
      "**Make it sound like you, then post it.** Change at least one word. Seriously.",
    ],
  },
  examples: {
    heading: "Useful comments vs generic praise",
    layout: "table",
    columns: [
      { label: "Generic", value: "before" },
      { label: "Adds something", value: "output" },
    ],
    items: [
      {
        inputLabel: "Pricing page post",
        before: "Great post!",
        output: "The point about pricing pages hit home. We cut ours from 4 plans to 2 and support tickets dropped.",
        input: {
          post: "Most SaaS pricing pages have too many plans. Every extra plan is one more decision a buyer has to make before they sign up. Fewer plans, faster yes.",
          view: "Agree, cutting plans helped us too",
          experience: "We cut our pricing from 4 plans to 2 and support tickets dropped",
          type: "Add insight",
          length: SHORT,
        },
      },
      {
        inputLabel: "Sales speed post",
        before: "So true 🙌",
        output: "Curious how this changes for B2B. Do you see the same pattern with longer sales cycles?",
        input: {
          post: "Speed wins deals. Reply to every new lead within an hour and watch your close rate climb.",
          view: "Wondering if this holds for B2B, where sales cycles are long",
          experience: "We sell to mid size companies and deals take months",
          type: "Ask a question",
          length: SHORT,
        },
      },
      {
        inputLabel: "Free trial ads post",
        before: "Thanks for sharing",
        output: "I'd push back a little: this worked for us only after we had some reviews. Before that, nobody clicked.",
        input: {
          post: "Run free trial ads from day one. It's the fastest way to get your first users.",
          view: "Only works once you have some social proof",
          experience: "Our trial ads got no clicks until we had reviews",
          type: "Respectful pushback",
          length: SHORT,
        },
      },
    ],
    outro: [{ p: "A comment is a tiny post that borrows someone else's audience. Generic praise wastes it. **ONE REAL DETAIL TURNS A COMMENT INTO A CONVERSATION.**" }],
  },
  sections: [
    {
      heading: "Bring your own viewpoint into the response",
      blocks: [
        { p: "The tool needs your take because that's the bit nobody else can write. Even a short one works: \"agree, but only for B2B\", \"tried this, it failed\", \"wondering about X\". The tool turns it into a clear, friendly comment." },
        { p: "No experience to add? Ask a good question. Questions are underrated. They make the author look smart for answering and make you look curious." },
      ],
    },
    {
      heading: "Review and post the comment yourself",
      blocks: [
        { p: "This tool drafts, you decide. Read the comment against the post one more time, check it doesn't put words in your mouth, then post it from your own account." },
        { p: "**Common mistake:** commenting 50 times a day with the same template. People notice, and it reads like a robot with a LinkedIn premium account." },
      ],
    },
  ],
  faqs: [
    freeFaq("LinkedIn comment generator"),
    { q: "Will it post automatically?", a: "No. It only writes a draft. You copy and post it yourself." },
    { q: "Can it disagree respectfully?", a: "Yes. Pick \"Respectful pushback\" and it writes a polite counterpoint based on your take." },
    { q: "What if I have no experience to add?", a: "Pick \"Ask a question\". A sharp question is one of the best comments you can leave." },
    { q: "How long can a LinkedIn comment be?", a: "Up to 1,250 characters. Most good comments are 1 to 4 lines." },
  ],
  ctas: [{ heading: "Need help planning useful content and conversations?", button: "See how I can help", href: LINK_SERVICES }],
  related: [{ slug: "linkedin-post-generator" }, { slug: "linkedin-headline-generator" }, { slug: "linkedin-about-section-generator" }],
  extraLinks: [],
  api: { block: "comment", vars: {} },
};
