/**
 * check-resume-pdf-drift.js — fails when a served resume PDF is not exactly
 * what we intend to serve.
 * ----------------------------------------------------------------------------
 * WHY THIS EXISTS
 * A recruiter who downloads the CV must read the same facts as the page linking
 * to it. That broke for real once: a CGPA correction landed in the React source
 * while the served PDFs kept the old value for days. This job is the guard.
 *
 * TWO KINDS OF PDF under public/resume/
 *
 *   1. PINNED (resume/pdf-manifest.json → "pinned"). An approved 1-page resume
 *      build copied in verbatim. Checked by SHA-256 and page count, because the
 *      file is never regenerated here: any byte change means someone replaced
 *      the CV without updating the manifest.
 *
 *   2. GENERATED (resume/<name>.md → public/resume/<name>.pdf via
 *      tools/build-resume-pdf.js). Checked by regenerating and comparing
 *      EXTRACTED TEXT, not bytes: headless Chrome embeds a fresh document ID per
 *      render, so two renders of identical input differ in SHA-256 every time,
 *      while pdftotext output measured identical. Whitespace is collapsed first,
 *      so line-wrap differences between machines are not reported as drift.
 *
 * It also fails when:
 *   - a served PDF is neither pinned nor generated (unknown provenance),
 *   - a PDF is both pinned and generated (ambiguous source of truth),
 *   - a pinned file is missing, or a resume/*.md has no committed PDF,
 *   - any served PDF contains a string from "bannedClaims" in the manifest
 *     (unverified metrics that were removed from the site and must not come
 *     back through the CV).
 *
 * Committed PDFs are restored before exit, so a local run never dirties the
 * working tree — including when the check fails.
 *
 * Usage:  node tools/check-resume-pdf-drift.js
 * Exit:   0 = every served PDF matches its source, 1 = drift (or setup failure)
 */
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "resume");
const RESUME_DIR = path.join(ROOT, "resume");
const MANIFEST = path.join(RESUME_DIR, "pdf-manifest.json");
const BUILDER = path.join(__dirname, "build-resume-pdf.js");

function fail(msg) {
  console.error(`\nFAIL  ${msg}`);
  process.exit(1);
}

/** Collapse every whitespace run to a single space. Layout-insensitive. */
function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function rawText(pdfPath, workDir, tag) {
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
  return fs.readFileSync(txtPath, "utf8");
}

/** pdftotext terminates every page with a form feed. */
function pageCount(raw) {
  return (raw.match(/\f/g) || []).length;
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
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

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return { pinned: [], bannedClaims: [] };
  let data;
  try {
    data = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch (err) {
    fail(`${path.relative(ROOT, MANIFEST)} is not valid JSON: ${err.message}`);
  }
  const pinned = Array.isArray(data.pinned) ? data.pinned : [];
  for (const p of pinned) {
    if (!p.file || !/^[0-9a-f]{64}$/.test(p.sha256 || "")) {
      fail(`manifest entry ${JSON.stringify(p)} needs "file" and a lowercase hex "sha256"`);
    }
  }
  return { pinned, bannedClaims: Array.isArray(data.bannedClaims) ? data.bannedClaims : [] };
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fail(`missing output dir ${OUT_DIR}`);

  const { pinned, bannedClaims } = readManifest();
  const pinnedByFile = new Map(pinned.map((p) => [p.file, p]));

  const pdfs = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".pdf")).sort();
  if (!pdfs.length) fail(`no PDFs found in ${path.relative(ROOT, OUT_DIR)}`);

  const mdSources = fs.existsSync(RESUME_DIR)
    ? fs.readdirSync(RESUME_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("."))
    : [];
  const generatedNames = new Set(mdSources.map((f) => f.replace(/\.md$/, ".pdf")));

  // ---- provenance: every served PDF has exactly one source of truth ----
  const both = pdfs.filter((f) => pinnedByFile.has(f) && generatedNames.has(f));
  if (both.length) {
    fail(
      `PDF(s) are both pinned in the manifest and generated from resume/*.md: ${both.join(", ")}\n` +
        `      Pick one source of truth: remove the .md or remove the manifest entry.`
    );
  }
  const unknown = pdfs.filter((f) => !pinnedByFile.has(f) && !generatedNames.has(f));
  if (unknown.length) {
    fail(
      `PDF(s) in public/resume/ have no source: ${unknown.join(", ")}\n` +
        `      Pin them in resume/pdf-manifest.json or add a matching resume/*.md.`
    );
  }
  const missingPinned = pinned.map((p) => p.file).filter((f) => !pdfs.includes(f));
  if (missingPinned.length) {
    fail(`pinned PDF(s) listed in the manifest are missing: ${missingPinned.join(", ")}`);
  }
  const missingGenerated = [...generatedNames].filter((f) => !pdfs.includes(f));
  if (missingGenerated.length) {
    fail(
      `resume/*.md produces PDF(s) that are not committed: ${missingGenerated.join(", ")}\n` +
        `      Run "npm run build:resume" and commit public/resume/.`
    );
  }

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

  console.log(
    `Checking ${pdfs.length} committed PDF(s): ${pinned.length} pinned, ` +
      `${generatedNames.size} generated from resume/*.md\n`
  );

  const problems = [];
  const committedRaw = {};
  for (const f of pdfs) committedRaw[f] = rawText(path.join(backupDir, f), workDir, "committed");

  // ---- banned claims: applies to every served PDF ----
  for (const f of pdfs) {
    const text = normalize(committedRaw[f]);
    const hits = bannedClaims.filter((claim) => text.includes(claim));
    if (hits.length) {
      problems.push(f);
      console.error(`BANNED ${f}  contains: ${hits.map((h) => JSON.stringify(h)).join(", ")}`);
    }
  }

  // ---- pinned: exact bytes + page count ----
  for (const p of pinned) {
    const actual = sha256(path.join(backupDir, p.file));
    const pages = pageCount(committedRaw[p.file]);
    if (actual !== p.sha256) {
      problems.push(p.file);
      console.error(`DRIFT  ${p.file}`);
      console.error(`      manifest sha256 : ${p.sha256}`);
      console.error(`      committed sha256: ${actual}`);
    } else if (p.pages != null && pages !== p.pages) {
      problems.push(p.file);
      console.error(`DRIFT  ${p.file}  has ${pages} page(s), manifest says ${p.pages}`);
    } else {
      console.log(`OK     ${p.file}  (pinned: sha256 ${actual.slice(0, 12)}…, ${pages} page(s), ${p.source || "no source recorded"})`);
    }
  }

  // ---- generated: regenerate and compare extracted text ----
  if (generatedNames.size) {
    try {
      execFileSync(process.execPath, [BUILDER], { stdio: ["ignore", "inherit", "inherit"] });
    } catch (err) {
      fail(`the PDF generator itself failed to run: ${err.message}`);
    }
    for (const f of [...generatedNames].sort()) {
      const committed = normalize(committedRaw[f]);
      const rebuilt = normalize(rawText(path.join(OUT_DIR, f), workDir, "rebuilt"));
      if (rebuilt !== committed) {
        problems.push(f);
        console.error(`DRIFT  ${f}`);
        console.error(describeDiff(committed, rebuilt));
      } else {
        console.log(`OK     ${f}  (generated: ${rebuilt.length} chars of extracted text match)`);
      }
    }
  }

  if (problems.length) {
    fail(
      `${new Set(problems).size} committed PDF(s) do not match their source: ${[...new Set(problems)].join(", ")}\n` +
        `      Pinned PDF changed: update resume/pdf-manifest.json in the same commit.\n` +
        `      Generated PDF drifted: run "npm run build:resume" and commit public/resume/.\n` +
        `      Banned claim: fix the source resume, do NOT edit the banned list to pass.`
    );
  }

  console.log("\nAll served resume PDFs match their source of truth.");
}

main();