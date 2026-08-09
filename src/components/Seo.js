import React from "react";
import { Helmet } from "react-helmet-async";
import { OG_IMAGE, siteUrl } from "../config/site";

// Per-route SEO. Overrides the global tags in public/index.html so each route
// ships a distinct <title>, description, canonical and Open Graph / Twitter
// card. Works for JS-rendering crawlers (Google) now, and becomes static HTML
// once react-snap prerenders the build.
//
// The origin comes from src/config/site.js — never hardcode it here. These tags
// define the site's canonical identity on every route, so a stale origin points
// all 8 routes at the wrong host at once.
const DEFAULT_DESCRIPTION =
  "Dhruv Rastogi — Full Stack Engineer. Backend & cloud-native systems, applied ML / LLM systems, and open source on GitHub. Currently @ MAQ Software.";

function Seo({ title, description, path = "/", image }) {
  const url = siteUrl(path);
  const desc = description || DEFAULT_DESCRIPTION;
  const img = image || OG_IMAGE;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}

export default Seo;
