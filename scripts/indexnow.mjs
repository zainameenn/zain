// Submits every URL in the live sitemap to IndexNow in one request.
// Run by hand with `npm run indexnow`, only after changes are live.

const HOST = "www.zainameen.com";
const KEY = "a5ca31560734afab52b59f12df531343";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const MEANINGS = {
  200: "received, all good",
  202: "received, still checking your key, this is fine",
  400: "the request was formatted wrong",
  403: "the key file wasn't found or doesn't match",
  422: "a URL doesn't belong to the site or the key doesn't match",
  429: "too many submissions, wait and try later",
};

const sitemapRes = await fetch(SITEMAP_URL);
if (!sitemapRes.ok) {
  console.error(`Couldn't fetch the sitemap (${sitemapRes.status}). Nothing was sent.`);
  process.exit(1);
}

const xml = await sitemapRes.text();
const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error("The sitemap had no URLs. Nothing was sent.");
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`Sent ${urlList.length} URLs to IndexNow.`);
console.log(`Response ${res.status}: ${MEANINGS[res.status] ?? "unexpected response"}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
