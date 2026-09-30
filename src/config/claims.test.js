/**
 * claims.test.js — keeps unproven claims out of the shipped site copy.
 * ----------------------------------------------------------------------------
 * resume/pdf-manifest.json "bannedClaims" is already enforced on every served
 * PDF by tools/check-resume-pdf-drift.js. This applies the same list to the
 * site's own copy, plus a pattern for absolute LLM outcome claims such as
 * "LLM systems that don't hallucinate", which no evidence supports.
 *
 * Fix the copy when this fails; do not edit the banned list to make it pass.
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const { bannedClaims } = JSON.parse(read("resume/pdf-manifest.json"));

const APOS = "(?:'|\u2019|&apos;|&#39;|&rsquo;)?";
const ABSOLUTE_LLM_CLAIMS = [
  new RegExp(`\\b(?:don${APOS}t|do\\s+not|never|won${APOS}t|can${APOS}t|cannot)\\s+hallucinat`, "i"),
  /\b(?:zero|no)[\s-]+hallucinations?\b/i,
  /hallucination[\s-]+free/i,
];

const listJs = (dir) =>
  fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) return listJs(rel);
    return /\.jsx?$/.test(entry.name) && !/\.test\.jsx?$/.test(entry.name) ? [rel] : [];
  });

const SHIPPED_COPY = [
  ...listJs("src"),
  "public/index.html",
  "public/manifest.json",
  "tools/og-card.html",
  "README.md",
];

describe("shipped copy carries no unproven claims", () => {
  test("the banned list still covers the absolute LLM claim", () => {
    expect(bannedClaims).toEqual(expect.arrayContaining(["don't hallucinate"]));
  });

  test.each(SHIPPED_COPY)("%s", (rel) => {
    const contents = read(rel);

    expect(bannedClaims.filter((claim) => contents.includes(claim))).toEqual([]);
    expect(
      ABSOLUTE_LLM_CLAIMS.filter((re) => re.test(contents)).map(String)
    ).toEqual([]);
  });
});
