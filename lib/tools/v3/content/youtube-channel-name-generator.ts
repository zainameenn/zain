import type { NewToolContent } from "../content-types";

export default {
  slug: "youtube-channel-name-generator",
  name: "YouTube Channel Name Generator",
  keyword: "youtube channel name generator",
  metaTitle: "YouTube Channel Name Generator (100% FREE)",
  metaDescription: "YouTube channel name generator that suggests one channel name, a matching @handle idea and a short reason why it fits. Free, no signup needed.",
  lede: "This YouTube channel name generator suggests one name for your channel, plus an @handle idea to go with it. Tell it your topic, audience and style, and it explains why the name fits.",
  sub: "One channel name, one handle idea and a short reason. Regenerate for another take.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your channel", text: "Add your topic, who it's for, and whether it's a personal brand or a business." },
    { title: "Pick a style", text: "Choose a naming style and language. Add your name, words to include or words to avoid if you like." },
    { title: "Get one name", text: "You get one channel name, a suggested @handle and a reason. Check the handle on YouTube, or press Regenerate." },
  ],
  examples: {
    heading: "Example channel",
    accent: "names",
    items: [
      { title: "Budget cooking", input: "Cheap weeknight meals for students, friendly style, business brand", output: "Name: Pocket Kitchen. Handle idea: @pocketkitchen", why: "Says small budget and cooking in two simple words." },
      { title: "Personal fitness coach", input: "Home workouts for busy parents, personal brand, creator name Maya Ortiz", output: "Name: Maya Moves. Handle idea: @mayamoves", why: "Uses her name so the channel can grow with her." },
      { title: "Retro gaming", input: "Old console games and repairs, playful style, avoid the word gamer", output: "Name: Cartridge Club. Handle idea: @cartridgeclub", why: "Feels nostalgic and skips the word to avoid." },
    ],
  },
  guidance: {
    heading: "What makes a good channel",
    accent: "name",
    items: [
      { title: "Easy to say and search", text: "People will hear your name in videos and type it into search. Keep it short and spelled the way it sounds." },
      { title: "Fits your content", text: "Viewers should get a sense of what you make. It doesn't need to say everything, just point the right way." },
      { title: "Room to grow", text: "A very narrow name can feel limiting later. Your own name or a broader idea gives you more space." },
      { title: "Check the handle", text: "The @handle shown here is only a suggestion. YouTube tells you if it's free when you try to claim it." },
      { title: "Stay clear of other brands", text: "Avoid names that copy another channel or company. Search YouTube and the web before you settle." },
    ],
  },
  faqs: [
    { q: "How do I choose a YouTube channel name?", a: "Think about what you make and who it's for, then pick something short, easy to say and easy to spell. Search YouTube to make sure it doesn't clash with a similar channel." },
    { q: "Should my channel use my own name?", a: "If you're the face of the channel or might change topics later, your own name works well. If you plan a team or a business brand, a separate name can be better." },
    { q: "What makes a good channel name?", a: "It's memorable, fits your content, is simple to type, and isn't too close to another channel or brand." },
    { q: "Can two channels have the same name?", a: "Yes. Channel names don't have to be unique on YouTube. Handles do, which is why every channel has its own @handle." },
    { q: "What's the difference between a channel name and a handle?", a: "Your channel name is the display name people see. Your handle is the unique @name that also works as your channel URL. See [YouTube's help page on handles](https://support.google.com/youtube/answer/11585688)." },
    { q: "How do I check whether my name is available?", a: "Search YouTube for the name to see who else uses it. For the handle, try it in YouTube Studio, which tells you straight away if it's taken. It's also worth checking social sites and trademark records." },
    { q: "Can I change my channel name later?", a: "Yes, in YouTube Studio under Customization. YouTube limits how often you can change your name and handle in a short period, so check [YouTube's help page](https://support.google.com/youtube/answer/2657964) for the current limits." },
  ],
  related: [
    { slug: "youtube-title-generator", text: "Write titles for your first videos." },
    { slug: "youtube-description-generator", text: "Write video and channel descriptions." },
    { slug: "youtube-shorts-script-generator", text: "Script your first Shorts." },
    { slug: "instagram-bio-generator", text: "Set up a matching Instagram bio." },
  ],
  cta: {
    heading: "Want your channel to bring in",
    accent: "customers?",
    copy: "Zain helps businesses turn social media and video into steady leads.",
    button: "See social media marketing",
    href: "/services/social-media-marketing-specialist",
  },
  hubCard: { description: "Get one YouTube channel name, an @handle idea and a short reason.", cta: "Name my channel" },
  sources: [
    { label: "YouTube Help: Understand your channel's handle", url: "https://support.google.com/youtube/answer/11585688", checked: "October 2026" },
    { label: "YouTube Help: Manage your channel's name and picture", url: "https://support.google.com/youtube/answer/2657964", checked: "October 2026" },
  ],
} satisfies NewToolContent;
