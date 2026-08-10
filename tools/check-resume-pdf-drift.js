/**
 * check-resume-pdf-drift.js — fails when the committed resume PDFs no longer
 * match their markdown sources.
 * ----------------------------------------------------------------------------
 * WHY THIS EXISTS
 * `npm run build:resume` is wired into neither `npm run build` nor Vercel, so a
 * change to resume/*.md ships with the PDFs under public/resume/ left stale.
 * That happened for real: a CGPA correction landed in the React source while the
 * served PDFs kept the old value for days, so a recruiter downloading the PDF
 * read different facts from the page linking to it. This job is the guard.
 *
 * HOW IT COMPARES — and why not bytes
 * Headless Chrome embeds a fresh document ID / timestamp in every render, so two
 * renders of byte-identical input produce different files. Measured on a clean
 * tree: same input, same 264973-byte length, different SHA256 on every run.
 * A byte check would therefore fail ~100% of the time and teach everyone to
 * ignore it. So we compare EXTRACTED TEXT (pdftotext) instead, which measured
 * hash-identical across renders.
 *
 * Whitespace is collapsed before comparing. Line-break positions depend on font
 * metrics, and the CI runner may resolve the webfont differently from a dev
 * laptop; that is layout noise, not content drift. Collapsing whitespace keeps
 * the check sensitive to what matters (a changed CGPA, a reworded bullet, a
 * dropped role) while immune to where a line happens to wrap.
 *
 * The committed PDFs are restored before exit, so a local run never dirties the
 * working tree — including when the check fails.
 *
 * Usage:  node tools/check-resume-pdf-drift.js
 * Exit:   0 = committed PDFs match their sources, 1 = drift (or setup failure)
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "resume");
const BUILDER = path.join(__dirname, "build-resume-pdf.js");

function fail(msg) {
  console.error(`\nFAIL  ${msg}`);
  process.exit(1);
}

/** Collapse every whitespace run to a single space. Layout-insensitive. */
function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function extractText(pdfPath, workDir, tag) {
  const txtPath = path.join(workDir, `${path.basename(pdfPath, ".pdf")}.${tag}.txt`);
  try {
    execFileSync("pdftotext", ["-enc", "UTF-8", pdfPath, txtPath], {
      stdio: ["ignore", "ignore", "pipe"],
    });
  } catch (err) {
    fail(
      "pdftotext is required but could not be run. Install poppler-utils " +
        `(Linux: sudo apt-get install -y poppler-utils).\n      ${err.message}`
    );
  }
  return normalize(fs.readFileSync(txtPath, "utf8"));
}

/** First point of divergence, with surrounding context, so the log is actionable. */
function describeDiff(committed, rebuilt) {
  let i = 0;
  while (i < committed.length && i < rebuilt.length && committed[i] === rebuilt[i]) i++;
  const from = Math.max(0, i - 60);
  const slice = (s) => JSON.stringify(s.slice(from, i + 60));
  return [
    `      first difference at character ${i}`,
    `      committed PDF : ...${slice(committed)}...`,
    `      rebuilt  PDF : ...${slice(rebuilt)}...`,
  ].join("\n");
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fail(`missing output dir ${OUT_DIR}`);

  const pdfs = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".pdf")).sort();
  if (!pdfs.length) fail(`no PDFs found in ${path.relative(ROOT, OUT_DIR)}`);

  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "resume-drift-"));
  const backupDir = path.join(workDir, "committed");
  fs.mkdirSync(backupDir);

  // Snapshot the committed PDFs, then restore them no matter how we exit.
  for (const f of pdfs) fs.copyFileSync(path.join(OUT_DIR, f), path.join(backupDir, f));
  const restore = () => {
    for (const f of pdfs) {
      try {
        fs.copyFileSync(path.join(backupDir, f), path.join(OUT_DIR, f));
      } catch (_) {
        /* best effort */
      }
    }
  };
  process.on("exit", restore);

  console.log(`Checking ${pdfs.length} committed PDF(s) against resume/*.md\n`);

  const committedText = {};
  for (const f of pdfs) {
    committedText[f] = extractText(path.join(backupDir, f), workDir, "committed");
  }

  try {
    execFileSync(process.execPath, [BUILDER], { stdio: ["ignore", "inherit", "inherit"] });
  } catch (err) {
    fail(`the PDF generator itself failed to run: ${err.message}`);
  }

  // A source file added or removed without regenerating is drift too.
  const after = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".pdf")).sort();
  const missing = after.filter((f) => !pdfs.includes(f));
  if (missing.length) {
    fail(
      `resume/*.md produces PDF(s) that are not committed: ${missing.join(", ")}\n` +
        `      Run "npm run build:resume" and commit public/resume/.`
    );
  }

  const drifted = [];
  for (const f of pdfs) {
    const rebuilt = extractText(path.join(OUT_DIR, f), workDir, "rebuilt");
    if (rebuilt !== committedText[f]) {
      drifted.push(f);
      console.error(`DRIFT  ${f}`);
      console.error(describeDiff(committedText[f], rebuilt));
    } else {
      console.log(`OK     ${f}  (${rebuilt.length} chars of extracted text match)`);
    }
  }

  if (drifted.length) {
    fail(
      `${drifted.length} committed PDF(s) do not match resume/*.md: ${drifted.join(", ")}\n` +
        `      The markdown was edited without regenerating the PDFs.\n` +
        `      Fix: run "npm run build:resume" and commit public/resume/.\n` +
        `      Do NOT "fix" this by editing resume content to match a stale PDF.`
    );
  }

  console.log("\nAll committed resume PDFs match their markdown sources.");
}

main();
