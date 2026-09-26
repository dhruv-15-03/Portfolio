import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seo from "../Seo";
import ProjectCard from "./ProjectCards";
// Particles removed — see About.js for rationale.
import verimed from "../../Assets/Projects/verimed-ai.jpeg";
import secure from "../../Assets/Projects/secure-step.jpeg";
import tax from "../../Assets/Projects/tax.jpeg";
import dhrLang from "../../Assets/Projects/DhrLang.webp";
import court from "../../Assets/Projects/court.jpeg";
import thoughts from "../../Assets/Projects/thoughts.webp";
import aisum from "../../Assets/Projects/AI-summ.webp";

/**
 * Projects
 * ----------------------------------------------------------------------------
 * The page is split into two intentional bands:
 *
 *   1. FEATURED  → the artifacts with the strongest social proof:
 *                  - boot-usage (Spring Boot starter, Apache-2.0)
 *                  - DhrLang (compiler from scratch, VS Code extension)
 *                  - AI-Court (production ML classifier + MLOps, full-stack)
 *                  - AlgoVisualizer (18 ML algos in-browser via WebAssembly)
 *      These are *what would be talked about in an interview*.
 *
 *   2. MORE      → everything else, still with problem→approach→impact
 *                  framing, but rendered in a denser grid.
 *
 * WHY this order? When a recruiter clicks "Projects" they have ~30 seconds.
 * Lead with the most defensible, hardest-to-fake work first.
 */
function Projects() {
  return (
    <Container fluid className="project-section">
      <Seo
        title="Projects — Dhruv Rastogi"
        description="Open-source libraries and applied-ML systems by Dhruv Rastogi: the DhrLang JVM language, the boot-usage Spring Boot starter, AI-Court legal outcome ML, and AlgoVisualizer in-browser ML education."
        path="/project"
      />
      <Container>
        {/* ------------------ Section header ------------------ */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            className="project-heading"
            data-num="02"
            style={{
              display: "inline-block",
              position: "relative",
              marginBottom: "20px",
            }}
          >
            <span className="mark-underline is-shown">What I&apos;ve <strong className="purple">Built</strong></span>
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.15em",
              marginTop: "30px",
              maxWidth: "740px",
              margin: "30px auto 0",
              lineHeight: "1.7",
            }}
          >
            Open-source libraries, a JVM compiler, an AI legal platform,
            production-grade backends. Each card uses the same{" "}
            <span className="purple">Problem → Approach → Impact</span> shape
            so you can scan in seconds.
          </p>
        </div>

        {/* ------------------ FEATURED band ------------------ */}
        <div className="projects-band-label">
          <span>Featured</span>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* Upstream contributions lead the band: merged PRs in repos owned by
              other people are the hardest signal on this site to fake, because
              every one of them was reviewed and merged by that project's own
              maintainers. Full annotated list lives on /resume#upstream.

              PHRASING RULE: Ubuntu is described as a fact about uutils/coreutils
              only. None of these patches are in the release Ubuntu ships today,
              so the distro name must never share a sentence with a PR count or
              a first-person claim. */}
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={null}
              isBlog={false}
              badge="Open Source · 7 merged PRs"
              title="Upstream Contributions"
              tags={["Rust", "Java", "Spring Boot", "GNU compatibility", "Code Review"]}
              problem="A drop-in replacement only earns trust when it matches the original's behaviour exactly, and the remaining gaps are edge cases nobody has hit yet — wrong exit statuses, spurious warnings, silently skipped fields."
              approach="uutils/coreutils is the Rust rewrite of GNU coreutils that Ubuntu ships by default. The work there was behavioural: matching GNU's exact output, exit status and edge-case handling, verified command-by-command against the GNU reference. Also fixed an install/uninstall asymmetry in Spring Boot's JUL bridge handling, and added configurable Conventional Commit support to github/spec-kit's git extension (#3413)."
              impact="Seven pull requests merged across four repositories owned by other people — three in uutils/coreutils, one in spring-projects/spring-boot, two in github/spec-kit, one in qdrant/java-client. One closed a coreutils issue that had been open since February 2022."
              ghLink="https://github.com/uutils/coreutils/pulls?q=is%3Apr+author%3Adhruv-15-03+is%3Amerged"
              demoLink="https://github.com/spring-projects/spring-boot/pull/50779"
              demoLabel="Spring Boot PR"
            />
          </Col>

          {/* boot-usage — the OSS card. Uses the no-thumbnail fallback because
              published libraries don't have a "screenshot" — the proof is the
              GitHub repo, the Apache-2.0 license, and the JitPack build. */}
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={null}
              isBlog={false}
              badge="Open Source · Apache-2.0"
              title="boot-usage"
              tags={["Java 21", "Spring Boot 3", "Actuator", "Spring Boot Starter", "JitPack"]}
              problem="Spring Boot apps accumulate starters on the classpath, and it is hard to tell which ones actually contribute auto-configuration at runtime."
              approach="An opt-in starter (spring.boot.usage.report.enabled=true) that reads classpath starter metadata and the auto-configuration condition report to classify each starter as used, unused or indeterminate, tracks which jar each application bean came from, and exposes the report at /actuator/bootusage with JSON/Markdown output and pluggable policies that can fail startup."
              impact="Apache-2.0 library at v1.0.3, distributed via JitPack, with integration tests for the endpoint, policies and report persistence running on GitHub Actions."
              ghLink="https://github.com/dhruv-15-03/boot-usage"
              demoLink="https://jitpack.io/#dhruv-15-03/boot-usage"
              demoLabel="JitPack"
              caseLink="/work/boot-usage"
            />
          </Col>

          {/* DhrLang — the systems-engineer signal. */}
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={dhrLang}
              isBlog={false}
              badge="Compiler · JVM · v4.0.2"
              title="DhrLang"
              tags={["Java", "Compiler Design", "LSP", "EVM (experimental)", "VS Code Ext"]}
              problem="Wanted to internalize how statically-typed languages actually work — not learn it from a textbook, but build one end to end."
              approach="JVM-hosted, class-based language with Hindi-rooted English keywords (num/duo/sab/kya/ek/kaam). Three execution backends (AST · IR · bytecode), generics, multi-dim arrays, JSON diagnostics, an LSP server, and an experimental EVM backend for smart contracts."
              impact="38 GitHub releases (latest v4.0.2); 1,491 tests, 0 failures (CI, 7 Sep 2026), with JaCoCo coverage and PIT mutation testing in CI; VS Code extension, and a live in-browser playground above showing the same parser shape running on every keystroke."
              ghLink="https://github.com/dhruv-15-03/DhrLang"
              demoLink="https://github.com/dhruv-15-03/DhrLang/releases"
              demoLabel="v4.0.2 Releases"
            />
          </Col>

          {/* AI-Court — the AI/full-stack signal. Two real repos behind it:
              AI-court-AI (Python ML core + MLOps) + AI-CourtRoom (Java/React app shell). */}
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={court}
              isBlog={false}
              badge="AI · ML + MLOps · Full Stack"
              title="AI Legal Assistant"
              tags={["Python", "scikit-learn", "Flask", "Java · Spring", "React"]}
              problem="Lawyers and clients spend hours scanning unstructured judgments to find precedent, and outcome estimates are pure intuition."
              approach="A Python ML service (AI-court-AI) predicts case outcomes with a TF-IDF + boosted random-forest classifier and retrieves precedent — with confidence-based abstention and explainable features — fronted by a Java/Spring + React app (AI-CourtRoom)."
              impact="91.8% test accuracy / 0.83 macro-F1 on 10,838 cases, served at $0 API cost inside a 512MB box with Prometheus metrics and data-drift monitoring. Live demo on Vercel."
              ghLink="https://github.com/dhruv-15-03/AI-CourtRoom"
              demoLink="https://ai-court-room-iota.vercel.app/"
              demoLabel="Live Demo"
              caseLink="/work/ai-court"
            />
          </Col>

          {/* AlgoVisualizer — the ML-education / systems-in-the-browser signal.
              18 ML algorithms running entirely client-side via Pyodide/WASM. */}
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={null}
              isBlog={false}
              badge="ML · WebAssembly · 18 algorithms"
              title="AlgoVisualizer"
              tags={["TypeScript", "React", "Vite", "Pyodide · WASM", "D3"]}
              problem="ML algorithms are taught as equations and black-box library calls — learners rarely see what actually happens inside training, step by step."
              approach="18 ML algorithms (regression, clustering, trees, neural nets) running fully in the browser via Pyodide — real CPython + NumPy compiled to WebAssembly in a Web Worker — streaming trace events to D3/SVG visualizers. No backend."
              impact="A zero-install ML playground: 12 datasets, step playback, Algorithm Race and Quiz modes. ~115KB gzipped home via route-split vendor chunks. MIT, live on Vercel."
              ghLink="https://github.com/dhruv-15-03/AlgoVisualizer"
              demoLink="https://algo-visualizer-beige.vercel.app"
              demoLabel="Live Demo"
              caseLink="/work/algovisualizer"
            />
          </Col>
        </Row>

        {/* ------------------ MORE band ------------------ */}
        <div className="projects-band-label" style={{ marginTop: "50px" }}>
          <span>More work</span>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* spec-kit EARS — current catalog listing and v1.0.0 release. */}
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={null}
              isBlog={false}
              badge="Open Source · community catalog"
              title="EARS for Spec Kit"
              tags={["Spec Kit", "Dev Tooling", "Extensions", "Requirements", "EARS"]}
              problem="Requirements written as prose can be ambiguous and difficult to validate consistently across a specification workflow."
              approach="Built and released a v1.0.0 extension with three opt-in commands (author, lint, convert) that write EARS artifacts under .specify/ears/ without changing core templates or default behavior."
              impact="Author of spec-kit-ears v1.0.0, listed under dhruv-15-03 in github/spec-kit's community catalog."
              ghLink="https://github.com/github/spec-kit/blob/main/docs/community/extensions.md"
              demoLink="https://github.com/dhruv-15-03/spec-kit-ears/releases/tag/v1.0.0"
              demoLabel="v1.0.0 release"
            />
          </Col>

          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={aisum}
              isBlog={false}
              badge="NLP"
              title="Smart AI Summarizer"
              tags={["Python", "Transformers", "Embeddings"]}
              problem="Long-form documents (meeting notes, research, reports) take hours to digest manually."
              approach="Combined extractive + abstractive transformer pipelines with a customizable output length and a collaborative sharing layer."
              impact="Turns long-form documents into share-ready summaries with an adjustable output length."
              ghLink="https://github.com/dhruv-15-03/AI-Summarizer"
              demoLink="https://ai-summarizer-three-gold.vercel.app/"
            />
          </Col>

          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={verimed}
              isBlog={false}
              badge="Healthcare AI"
              title="VeriMed"
              tags={["Python", "Scikit-Learn", "Spring Boot", "Ensembles"]}
              problem="Patients lack a fast, structured way to understand their disease-risk profile from raw symptoms."
              approach="Trained ensemble models for disease-risk prediction, exposed them via a Spring Boot REST API, and built a clean clinical UI on top."
              impact="Personalized risk assessments delivered through a Spring Boot REST backend."
              ghLink="https://github.com/dhruv-15-03/VeriMed-backend"
              demoLink="https://veri-med.vercel.app/"
            />
          </Col>

          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={tax}
              isBlog={false}
              badge="Fin-ML"
              title="TaxView"
              tags={["Python", "Random Forest", "XGBoost"]}
              problem="Individual taxpayers leave money on the table because they can't model the impact of every deduction option."
              approach="Trained Random Forest + XGBoost models on income / deduction patterns and surfaced them through a step-by-step planner UI."
              impact="~95% prediction accuracy on optimal deduction strategy in the validation set."
              ghLink="https://github.com/dhruv-15-03/Tax"
              demoLink="https://tax-puce.vercel.app/"
            />
          </Col>

          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={secure}
              isBlog={false}
              badge="Distributed Systems"
              title="SecureStep"
              tags={["Java", "Spring Boot", "Microservices", "Redis"]}
              problem="Travellers in unfamiliar cities need real-time, trusted help when something goes wrong."
              approach="Architected a microservice backend with live GPS tracking, an alert fan-out service, and a trusted-network graph, with Redis caching on the hot paths."
              impact="Spring Boot microservices backend for real-time location sharing and emergency alerts to a trusted network."
              ghLink="https://github.com/dhruv-15-03/SecureStep-Backend"
              demoLink="https://secure-step-nu.vercel.app/"
            />
          </Col>

          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={thoughts}
              isBlog={false}
              badge="Full Stack"
              title="Thoughts — Social Hub"
              tags={["React", "Spring Boot", "MySQL"]}
              problem="Most social products optimize for noise, not conversation."
              approach="Built a focused social platform around posts + threaded discussion + trending discovery, with a clean Spring Boot REST backend and a React UI."
              impact="End-to-end full-stack project that exercises the same patterns I use at work — auth, feeds, real-time updates."
              ghLink="https://github.com/dhruv-15-03/social"
              demoLink="https://dhr-social.vercel.app/"
            />
          </Col>
        </Row>

        {/* ------------------ Stats ------------------ */}
        <Row
          style={{
            justifyContent: "center",
            marginTop: "50px",
            paddingBottom: "30px",
          }}
        >
          <Col md={10}>
            <div className="projects-stats">
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-aqua">3</h2>
                <p>Engineering roles (1 full-time, 2 internships)</p>
              </div>
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-purple">2</h2>
                <p>OSS packages shipped (DhrLang · boot-usage)</p>
              </div>
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-pink">1,200+</h2>
                <p>LeetCode solved · Knight · rating ~2080 (top ~1.7%)</p>
              </div>
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-green">9</h2>
                <p>End-to-end shipped projects</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
