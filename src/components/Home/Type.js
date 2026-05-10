import React from "react";
import Typewriter from "typewriter-effect";

/**
 * Type — hero role rotator
 * ----------------------------------------------------------------------------
 * Audit fix: dropped the unfalsifiable "AI-Driven SaaS Builder" line. Every
 * string here now maps to either (a) a job on the resume, (b) an artifact on
 * GitHub, or (c) a public profile. No claim that can't be checked.
 *
 * Order matters — first impression is the strongest:
 *   1. Full Stack Engineer            → dominant identity from the resume
 *   2. Backend Engineer · Java · JVM  → seniority signal for backend roles
 *   3. Compiler & Systems Author      → DhrLang on GitHub
 *   4. LLM Systems · RAG · LangChain  → AI-Court (real, deployed)
 *   5. Open Source @ Maven Central    → boot-usage starter (verifiable)
 *   6. LeetCode Knight · 1,000+ solved
 */
function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full Stack Engineer",
          "Backend Engineer · Java · JVM",
          "Compiler & Systems Author",
          "LLM Systems · RAG · LangChain",
          "Open Source @ Maven Central",
          "LeetCode Knight · 1,000+ solved",
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
