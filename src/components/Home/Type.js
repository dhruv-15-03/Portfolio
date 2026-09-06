import React from "react";
import Typewriter from "typewriter-effect";

/**
 * Type — hero role rotator
 * ----------------------------------------------------------------------------
 * Audit fix: dropped the unfalsifiable "AI-Driven SaaS Builder" line. Every
 * string here now maps to either (a) a job on the resume, (b) an artifact on
 * GitHub, or (c) a public profile. No claim that can't be checked.
 *
 * Order matters — first impression is the strongest. Backend leads because
 * every resume variant targets backend / SDE roles; full-stack stays in the
 * rotation as supporting context, not as the headline:
 *   1. Backend Engineer · Java · JVM  → the identity every resume sells
 *   2. Compiler & Systems Author      → DhrLang on GitHub
 *   3. ML Systems · RAG · MLOps       → AI-Court (real, deployed)
 *   4. Full Stack Engineer            → Vue at RecruitCRM, React on this site
 *   5. Open Source on GitHub          → DhrLang + boot-usage (verifiable)
 *   6. LeetCode Knight · top 1.7% · 1,211 solved
 */
function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Backend Engineer · Java · JVM",
          "Compiler & Systems Author",
          "ML Systems · RAG · MLOps",
          "Full Stack Engineer",
          "Open Source on GitHub",
          "LeetCode Knight · top 1.7% · 1,211 solved",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
        delay: 70,
      }}
    />
  );
}

export default Type;
