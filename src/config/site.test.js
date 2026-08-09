/**
 * site.test.js — drift guard for the site's canonical origin.
 * ----------------------------------------------------------------------------
 * The static files under /public are copied verbatim by CRA, so they cannot
 * import src/config/site.js and must repeat the origin literally. This test is
 * the thing that keeps those copies honest.
 *
 * It exists because the previous origin (dhruvrastogi.me) lapsed and was
 * re-registered as a parked "domain for sale" lander. The literal was scattered
 * across index.html, sitemap.xml, robots.txt and the SEO component, so every
 * canonical tag, sitemap entry and social unfurl pointed search engines and
 * recruiters at a domain resale page — with nothing failing to signal it.
 *
 * Runs in CI via `npm test -- --watchAll=false`.
 */
import fs from "fs";
import path from "path";

import { SITE_URL, OG_IMAGE, SITE_HOST, siteUrl } from "./site";

const ROOT = path.resolve(__dirname, "..", "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const INDEX_HTML = "public/index.html";
const ROBOTS = "public/robots.txt";
const SITEMAP = "public/sitemap.xml";

// Origins that must never reappear. dhruvrastogi.me is dead and now resolves to
// a domain-for-sale lander; anything pointing there leaks SEO and link previews.
const DEAD_ORIGINS = ["dhruvrastogi.me"];

// Everything that is served, indexed, or rendered into a shared artifact.
// src/config/site.js is deliberately excluded: it documents the dead origin on
// purpose, and comments are stripped from the production bundle. Its own value
// is covered structurally by the SITE_URL assertions below.
const PUBLIC_SURFACE = [
  INDEX_HTML,
  ROBOTS,
  SITEMAP,
  "README.md",
  "tools/og-card.html",
  "src/components/Seo.js",
  "src/components/Home/Home2.js",
];

describe("canonical site origin", () => {
  test("SITE_URL is an absolute https origin with no trailing slash", () => {
    expect(SITE_URL).toMatch(/^https:\/\/[^/]+$/);
    expect(SITE_HOST).toBe(SITE_URL.replace(/^https:\/\//, ""));
    expect(OG_IMAGE).toBe(`${SITE_URL}/og.png`);
    expect(siteUrl("/")).toBe(SITE_URL);
    expect(siteUrl("/about")).toBe(`${SITE_URL}/about`);
  });

  test.each(PUBLIC_SURFACE)("%s references no dead origin", (rel) => {
    const contents = read(rel);
    DEAD_ORIGINS.forEach((dead) => {
      expect(contents).not.toContain(dead);
    });
  });

  test("index.html canonical, og:url and JSON-LD all resolve to SITE_URL", () => {
    const html = read(INDEX_HTML);

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/);
    const jsonLdUrl = html.match(/"url":\s*"([^"]+)"/);

    expect(canonical).not.toBeNull();
    expect(ogUrl).not.toBeNull();
    expect(jsonLdUrl).not.toBeNull();

    expect(canonical[1]).toBe(SITE_URL);
    expect(ogUrl[1]).toBe(SITE_URL);
    expect(jsonLdUrl[1]).toBe(SITE_URL);
  });

  test("index.html card images are absolute, not %PUBLIC_URL%-relative", () => {
    const html = read(INDEX_HTML);

    // %PUBLIC_URL% resolves to "" (package.json declares no "homepage"), so a
    // %PUBLIC_URL%-prefixed image ships as "/og.png". Social crawlers do not
    // resolve relative image paths — that renders a blank unfurl everywhere.
    const imageTags = [
      /<meta itemprop="image" content="([^"]+)"/,
      /<meta property="og:image" content="([^"]+)"/,
      /<meta name="twitter:image" content="([^"]+)"/,
    ].map((re) => html.match(re));

    imageTags.forEach((match) => {
      expect(match).not.toBeNull();
      expect(match[1]).toBe(OG_IMAGE);
      expect(match[1]).toMatch(/^https:\/\//);
      expect(match[1]).not.toContain("%PUBLIC_URL%");
    });
  });

  test("robots.txt advertises the sitemap on SITE_URL", () => {
    const sitemapLine = read(ROBOTS).match(/^Sitemap:\s*(\S+)$/m);

    expect(sitemapLine).not.toBeNull();
    expect(sitemapLine[1]).toBe(`${SITE_URL}/sitemap.xml`);
  });

  test("every sitemap <loc> is absolute against SITE_URL", () => {
    const locs = [...read(SITEMAP).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1]
    );

    expect(locs.length).toBeGreaterThan(0);
    locs.forEach((loc) => {
      expect(loc.startsWith(`${SITE_URL}/`) || loc === SITE_URL).toBe(true);
    });
  });

  test("no CNAME file pins the build to a stale custom domain", () => {
    // A stale CNAME silently hijacks the Vercel/Pages domain binding back to a
    // domain that is no longer ours.
    ["CNAME", "public/CNAME"].forEach((rel) => {
      expect(fs.existsSync(path.join(ROOT, rel))).toBe(false);
    });
  });
});
