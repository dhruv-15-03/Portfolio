import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
// Particles removed — see About.js for rationale.
import verimed from "../../Assets/Projects/verimed-ai.jpeg";
import secure from "../../Assets/Projects/secure-step.jpeg";
import tax from "../../Assets/Projects/tax.jpeg";
import dhrLang from "../../Assets/Projects/DhrLang.webp";
import court from "../../Assets/Projects/court.jpeg";
import thoughts from "../../Assets/Projects/thoughts.png";
import aisum from "../../Assets/Projects/AI-summ.png";

/**
 * Projects
 * ----------------------------------------------------------------------------
 * The page is split into two intentional bands:
 *
 *   1. FEATURED  → the two artifacts with the strongest social proof:
 *                  - boot-usage (Maven Central + awesome-java merge)
 *                  - DhrLang (compiler from scratch, VS Code extension)
 *                  - AI-Court (full-stack AI w/ LangChain + RAG)
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
      <Container>
        {/* ------------------ Section header ------------------ */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            className="project-heading"
            style={{
              display: "inline-block",
              position: "relative",
              marginBottom: "20px",
            }}
          >
            What I've <strong className="purple">Built</strong>
            <div
              style={{
                position: "absolute",
                bottom: "-15px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "4px",
                background:
                  "linear-gradient(90deg, #00d4ff, #bf5af2, #ff6b9d)",
                borderRadius: "2px",
              }}
            />
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
          {/* boot-usage — the OSS card. Uses the no-thumbnail fallback because
              published libraries don't have a "screenshot" — the proof is the
              Maven Central listing + awesome-java merge. */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={null}
              isBlog={false}
              badge="Open Source · Maven Central"
              title="boot-usage"
              tags={["Java", "Spring Boot", "Actuator", "Maven"]}
              problem="Spring Boot teams rarely have a runtime view of which beans / endpoints are actually used in production — leading to dead code and bloated images."
              approach="Built a Spring Boot starter that hooks into Actuator + the application context to surface live usage data, packaged as a drop-in dependency and published to Maven Central."
              impact="Merged into the awesome-java registry (40K★) at entry #1173. Used by JVM developers worldwide as a zero-config diagnostic library."
              ghLink="https://github.com/dhruv-15-03/boot-usage"
              demoLink="https://central.sonatype.com/search?q=boot-usage"
              demoLabel="Maven Central"
              caseLink="/work/boot-usage"
            />
          </Col>

          {/* DhrLang — the systems-engineer signal. */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dhrLang}
              isBlog={false}
              badge="Compiler · JVM · v3.0.0"
              title="DhrLang"
              tags={["Java", "Compiler Design", "LSP", "VS Code Ext", "EVM"]}
              problem="Wanted to internalize how statically-typed languages actually work — not learn it from a textbook, but build one end to end."
              approach="JVM-hosted, class-based language with Hindi-rooted English keywords (num/duo/sab/kya/ek/kaam). Three execution backends (AST · IR · bytecode), generics, multi-dim arrays, JSON diagnostics, an LSP server, and an EVM compiler target for smart contracts."
              impact="v3.0.0 with 14 GitHub releases, 1,000+ tests (Jacoco + PIT mutation testing in CI), VS Code extension, and a live in-browser playground above showing the same parser shape running on every keystroke."
              ghLink="https://github.com/dhruv-15-03/DhrLang"
              demoLink="https://github.com/dhruv-15-03/DhrLang/releases"
              demoLabel="v3.0.0 Releases"
            />
          </Col>

          {/* AI-Court — the AI/full-stack signal. */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={court}
              isBlog={false}
              badge="AI · Full Stack"
              title="AI Legal Assistant"
              tags={["Python", "LangChain", "RAG", "Spring Boot", "React"]}
              problem="Lawyers and clients spend hours scanning unstructured legal documents to predict case outcomes and find precedent."
              approach="Built an end-to-end LLM pipeline: vector embeddings over case law, semantic retrieval (RAG), LangChain orchestration for multi-step reasoning, and a Spring Boot + React front for multi-tenant access."
              impact="~87% case-outcome prediction on the held-out evaluation set; backend designed to scale to 5K+ concurrent users with a CI/CD-deployed inference REST API."
              ghLink="https://github.com/dhruv-15-03/AI-CourtRoom"
              demoLink="https://ai-court-room-iota.vercel.app/"
              demoLabel="Live Demo"
              caseLink="/work/ai-court"
            />
          </Col>
        </Row>

        {/* ------------------ MORE band ------------------ */}
        <div className="projects-band-label" style={{ marginTop: "50px" }}>
          <span>More work</span>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aisum}
              isBlog={false}
              badge="NLP"
              title="Smart AI Summarizer"
              tags={["Python", "Transformers", "Embeddings"]}
              problem="Long-form documents (meeting notes, research, reports) take hours to digest manually."
              approach="Combined extractive + abstractive transformer pipelines with a customizable output length and a collaborative sharing layer."
              impact="Turns 10K-word documents into actionable, share-ready summaries in seconds."
              ghLink="https://github.com/dhruv-15-03/AI-Summarizer"
              demoLink="https://ai-summarizer-three-gold.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={verimed}
              isBlog={false}
              badge="Healthcare AI"
              title="VeriMed"
              tags={["Python", "Scikit-Learn", "Spring Boot", "Ensembles"]}
              problem="Patients lack a fast, structured way to understand their disease-risk profile from raw symptoms."
              approach="Trained ensemble models for disease-risk prediction, exposed them via a Spring Boot REST API, and built a clean clinical UI on top."
              impact="Personalized risk assessments delivered through a secure backend; engineered for clinic-grade reliability."
              ghLink="https://github.com/dhruv-15-03/VeriMed-backend"
              demoLink="https://veri-med.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
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

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={secure}
              isBlog={false}
              badge="Distributed Systems"
              title="SecureStep"
              tags={["Java", "Spring Boot", "Microservices", "Redis"]}
              problem="Travellers in unfamiliar cities need real-time, trusted help when something goes wrong."
              approach="Architected a microservice backend with live GPS tracking, an alert fan-out service, and a trusted-network graph — Redis-cached for sub-second responses."
              impact="Backend designed to scale to 10K+ concurrent users with sub-second emergency-alert latency."
              ghLink="https://github.com/dhruv-15-03/SecureStep-Backend"
              demoLink="https://secure-step-nu.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
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
                <p>Production roles shipped from</p>
              </div>
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-purple">40K★</h2>
                <p>OSS registry entry (awesome-java)</p>
              </div>
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-pink">1,000+</h2>
                <p>DSA problems solved (LeetCode Knight)</p>
              </div>
              <div className="projects-stat">
                <h2 className="projects-stat-value gradient-green">8</h2>
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
