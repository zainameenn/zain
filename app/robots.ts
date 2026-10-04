import type { MetadataRoute } from "next";

// Everything is crawlable, including /llms.txt and the IndexNow key file.
// Search engines and AI crawlers are also named explicitly so they're clearly welcome.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone
      { userAgent: "*", allow: "/" },
      // Search engines
      { userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot"], allow: "/" },
      // OpenAI (ChatGPT)
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "GPTBot"], allow: "/" },
      // Anthropic (Claude)
      { userAgent: ["Claude-SearchBot", "Claude-User", "ClaudeBot"], allow: "/" },
      // Perplexity
      { userAgent: ["PerplexityBot", "Perplexity-User"], allow: "/" },
      // Google Gemini and Apple Intelligence
      { userAgent: ["Google-Extended", "Applebot-Extended"], allow: "/" },
      // Others
      { userAgent: ["DuckAssistBot", "Amazonbot", "Meta-ExternalAgent", "MistralAI-User", "CCBot"], allow: "/" },
    ],
    sitemap: "https://www.zainameen.com/sitemap.xml",
  };
}
