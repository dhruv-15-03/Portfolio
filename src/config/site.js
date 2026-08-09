/**
 * site.js — single source of truth for this site's public origin.
 * ----------------------------------------------------------------------------
 * Every absolute URL the site emits (canonical, og:url, og:image, JSON-LD) must
 * derive from SITE_URL.
 *
 * Why this file exists: the previous origin (dhruvrastogi.me) lapsed and was
 * re-registered as a parked "domain for sale" lander. Because the origin was
 * copy-pasted across index.html, sitemap.xml, robots.txt and the SEO component,
 * every canonical tag and every social unfurl kept pointing search engines and
 * recruiters at a domain resale page. One constant means the next migration is
 * a one-line change instead of an archaeology exercise.
 *
 * Deliberately a plain constant, not a REACT_APP_* env var: the static files
 * under /public are copied verbatim by CRA and cannot read env at runtime, so an
 * env var would let the JS routes and the static files silently disagree about
 * the canonical origin — the exact failure mode this file is meant to remove.
 *
 * The static files hardcode this same origin, and src/config/site.test.js fails
 * the build if they ever drift.
 */
export const SITE_URL = "https://portfolio-omega-nine-dwo58j18qa.vercel.app";

/** Bare hostname, for display (e.g. the generated OG card footer). */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

/** Absolute OG/Twitter card image. Social crawlers do not resolve relative paths. */
export const OG_IMAGE = `${SITE_URL}/og.png`;

/** Absolute URL for a route path, e.g. siteUrl("/about"). */
export function siteUrl(path = "/") {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
