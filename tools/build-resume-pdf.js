/**
 * build-resume-pdf.js — Markdown → A4 PDF for the resume folder.
 * ----------------------------------------------------------------------------
 * Reads every `*.md` file in /resume, renders it through `marked`, wraps the
 * HTML in a print-grade A4 template, and prints to PDF using the locally
 * installed Chrome (no Puppeteer download). PDFs land in /public/resume/ so
 * the React site can serve them as static assets.
 *
 * Why this design:
 *   - Honest output: PDFs are bit-identical to what's served on the live site.
 *   - ATS-safe: single-column flow, real text (no images of text), system font
 *     fallback, semantic h1/h2/ul/li in source HTML.
 *   - Zero corp-firewall surface: PDFs are same-origin to dhruvrastogi.me so
 *     recruiters at companies that block Google Drive still get the file.
 *   - No Puppeteer / no extra ~150 MB Chromium download — we reuse the user's
 *     existing Chrome install on Windows.
 *
 * Usage:  node tools/build-resume-pdf.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { marked } = require("marked");

const ROOT = path.resolve(__dirname, "..");
const RESUME_DIR = path.join(ROOT, "resume");
const TMP_DIR = path.join(RESUME_DIR, ".tmp");
const OUT_DIR = path.join(ROOT, "public", "resume");

// Find a usable Chrome / Edge on Windows (works for most installs).
const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error("No Chrome / Edge found. Install Chrome or add a path above.");
  process.exit(1);
}

// Print-grade CSS — A4, modern editorial layout, single-page target.
// Design notes:
//   - Header band: name + tagline + contact, under a single full-width rule.
//   - Section heads (h2): uppercase small-caps with a hairline rule to the right.
//   - Role/project rows (h3): flex row with title on the left and date/repo on
//     the right, styled via a .when span the markdown emits inline.
//   - Skills/Education laid out as compact key-value tables (also ATS-readable).
const CSS = `
  @page { size: A4; margin: 9mm 11mm; }
  :root {
    --ink: #0a0e14;
    --ink2: #1f2937;
    --muted: #5b6471;
    --rule: #d8dee6;
    --accent: #0a4dd6;
  }
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    color: var(--ink);
    font: 9.2pt/1.34 "Inter","Segoe UI",-apple-system,system-ui,Arial,sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Header band */
  h1 {
    font-size: 20pt; line-height: 1.05; margin: 0;
    letter-spacing: -0.015em; font-weight: 700; color: var(--ink);
  }
  h1 + p {
    font-size: 9.5pt; color: var(--ink2); margin: 1pt 0 3pt;
    font-weight: 500; letter-spacing: -0.005em;
  }
  .contact {
    font-size: 8.3pt; color: var(--muted); margin: 0 0 2pt;
    padding-bottom: 4pt; border-bottom: 1pt solid var(--ink);
    line-height: 1.4;
  }
  .contact a { color: var(--muted); }

  /* Section heads */
  h2 {
    font-size: 8.5pt; margin: 6pt 0 2pt;
    text-transform: uppercase; letter-spacing: 0.14em;
    color: var(--ink); font-weight: 700;
    display: flex; align-items: center; gap: 8pt;
  }
  h2::after {
    content: ""; flex: 1; height: 0.5pt; background: var(--rule);
  }

  /* Role / project headers (h3) — flex row, date right-aligned */
  h3 {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: 10pt; font-size: 9.8pt; margin: 3pt 0 0;
    font-weight: 700; color: var(--ink);
  }
  h3 .when {
    color: var(--muted); font-size: 8.3pt; font-weight: 500;
    white-space: nowrap; letter-spacing: 0.01em;
  }
  /* Meta line directly under role header (tech stack, etc.) */
  h3 + p {
    margin: 0 0 1pt; color: var(--muted); font-size: 8.4pt; font-style: normal;
    line-height: 1.32;
  }

  /* Body */
  p { margin: 2pt 0; }
  ul { margin: 1pt 0 3pt 12pt; padding: 0; }
  li { margin: 0.3pt 0; line-height: 1.34; }
  strong { color: var(--ink); }
  em { color: var(--muted); font-style: italic; }
  a { color: var(--accent); text-decoration: none; }
  code { font: 8.4pt/1.4 "JetBrains Mono", Consolas, monospace; color: #1f2937; }
  hr { border: 0; border-top: 0.5pt solid var(--rule); margin: 5pt 0 3pt; }

  /* Compact key-value grids (skills, education, etc.) */
  table.kv {
    width: 100%; border-collapse: collapse;
    margin: 1pt 0 2pt; font-size: 8.8pt;
  }
  table.kv td {
    padding: 1pt 6pt 1pt 0; vertical-align: top; line-height: 1.34;
  }
  table.kv td.k {
    width: 22%; color: var(--ink); font-weight: 600;
    letter-spacing: 0.005em; white-space: nowrap;
  }
  table.kv td.v { color: var(--ink2); }

  /* Foot strip */
  .foot {
    margin-top: 4pt; padding-top: 3pt;
    font-size: 8.4pt; color: var(--muted);
    border-top: 0.5pt solid var(--rule);
  }
  .foot strong { color: var(--ink); }
`;

function wrap(html, title) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>${html}</body>
</html>`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function buildOne(mdFile) {
  const md = fs.readFileSync(path.join(RESUME_DIR, mdFile), "utf8");
  const html = wrap(marked.parse(md), mdFile.replace(/\.md$/, ""));
  const htmlPath = path.join(TMP_DIR, mdFile.replace(/\.md$/, ".html"));
  fs.writeFileSync(htmlPath, html);

  const pdfName = mdFile.replace(/\.md$/, ".pdf");
  const pdfPath = path.join(OUT_DIR, pdfName);

  // Chrome's headless PDF flow — handles fonts + CSS print rules correctly.
  // Using a URL form is the most reliable way to feed Chrome a local file.
  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--no-margins",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${pdfPath}`,
      fileUrl,
    ],
    { stdio: ["ignore", "ignore", "inherit"] }
  );

  const size = (fs.statSync(pdfPath).size / 1024).toFixed(1);
  console.log(`OK  ${pdfName.padEnd(36)} ${size} KB`);
}

function main() {
  ensureDir(TMP_DIR);
  ensureDir(OUT_DIR);
  const files = fs
    .readdirSync(RESUME_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("."));
  if (!files.length) {
    console.error("No *.md files found in /resume.");
    process.exit(1);
  }
  console.log(`Building ${files.length} PDF(s) using ${chrome}\n`);
  for (const f of files) buildOne(f);
  console.log(`\nPDFs written to ${path.relative(ROOT, OUT_DIR)}`);
}

main();
