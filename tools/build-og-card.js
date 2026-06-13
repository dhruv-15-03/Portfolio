/**
 * build-og-card.js — Render the 1200×630 social card to /public/og.png.
 *
 * The HTML at tools/og-card.html is the editable source; this script uses the
 * locally installed Chrome to screenshot it at 2× device-pixel-ratio so the
 * resulting PNG looks crisp on LinkedIn / Twitter / Slack retina previews.
 *
 * Usage:  node tools/build-og-card.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(__dirname, "og-card.html");
const OUT = path.join(ROOT, "public", "og.png");

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error("No Chrome / Edge found.");
  process.exit(1);
}
if (!fs.existsSync(SRC)) {
  console.error(`Missing source: ${SRC}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });

const fileUrl = "file:///" + SRC.replace(/\\/g, "/");
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--default-background-color=00000000",
    "--window-size=1200,630",
    "--virtual-time-budget=10000",
    `--screenshot=${OUT}`,
    fileUrl,
  ],
  { stdio: ["ignore", "ignore", "inherit"] }
);

const size = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`OK  og.png ${size} KB → ${path.relative(ROOT, OUT)}`);
