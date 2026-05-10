import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// Particles removed — see About.js for rationale.

import { AiOutlineDownload } from "react-icons/ai";
import { HiOutlineBriefcase, HiOutlineAcademicCap } from "react-icons/hi";
import {
  FaBrain,
  FaCode,
  FaCloud,
  FaAward,
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { SiApachemaven, SiLeetcode } from "react-icons/si";

/**
 * Resume — "Career Overview"
 * ----------------------------------------------------------------------------
 * The user explicitly asked: *"in resume section display on frontend whatever
 * I have done, not like able to download a copy or something just a complete
 * overview, and yeah if asked to download just give the resume for SDE 1"*.
 *
 * So this page is now a content-driven, scrollable career overview — no PDF
 * iframe (which was slow to load and felt like a fallback). The single
 * "Download CV" button still links to the original Google Drive PDF the
 * user already had configured.
 *
 * IA of this page:
 *   1. Identity strip + Download CV
 *   2. Experience timeline (MAQ → RecruitCRM → CEERAS)
 *   3. Open Source & Systems (boot-usage, DhrLang, AI-Court summary)
 *   4. Certifications grid
 *   5. Achievements (LeetCode Knight, SIH 2024 Top 50, ISC 96.75%)
 *   6. Education
 */

// Keep the original Drive PDF link the user already configured.
const RESUME_PDF =
  "https://drive.google.com/uc?export=view&id=1guFP3iu4OXYwPOdaXCAN5qy1OvnT7H7n";

// ---------- DATA ----------------------------------------------------------
// Pulled directly from the resume content the user shared. If a fact isn't
// in the resume, it's not on this page.

const EXPERIENCE = [
  {
    company: "MAQ Software",
    role: "Associate Software Engineer",
    location: "On-site · India",
    period: "Nov 2025 – Present",
    stack: [
      "Java",
      "Python",
      "Azure Fabric",
      "Databricks",
      "Azure Functions",
      "Terraform",
      "CI/CD",
    ],
    bullets: [
      "Built and maintained ETL data pipelines on Azure Fabric & Databricks processing 500K+ records/day at 99.5% accuracy; reduced manual effort by 60%.",
      "Deployed CI/CD pipelines (Azure DevOps + Terraform) for 10+ Azure Function Apps — zero-downtime releases, 40% faster cycle time.",
      "Owned production monitoring & reliability tuning for systems meeting a 99.9% uptime SLA.",
    ],
  },
  {
    company: "RecruitCRM",
    role: "Associate Software Engineer (Contract)",
    location: "Remote",
    period: "Aug 2025 – Oct 2025",
    stack: ["Java", "Spring Boot", "MySQL", "REST", "Vue.js", "RBAC"],
    bullets: [
      "Designed and shipped 8+ REST APIs powering CRM workflows, lead enrichment and real-time data access — with 85% test coverage.",
      "Implemented authentication and role-based access control (RBAC) across backend services.",
      "Optimized DB queries and API execution paths, reducing response times by 30%.",
    ],
  },
  {
    company: "CEERAS",
    role: "Software Engineer Intern",
    location: "Remote",
    period: "Feb 2025 – Jun 2025",
    stack: [
      "Java",
      "Microservices",
      "Docker",
      "Kubernetes",
      "Redis",
      "GitHub Actions",
    ],
    bullets: [
      "Engineered a distributed bidding system handling 10K+ transactions/day with sub-second latency.",
      "Implemented async processing and Redis caching to lift throughput and system responsiveness.",
      "Automated build and deployment pipelines using Docker, Kubernetes, and GitHub Actions.",
    ],
  },
];

const OPEN_SOURCE = [
  {
    title: "boot-usage-spring-boot-starter",
    tag: "Open Source · Maven Central",
    href: "https://github.com/dhruv-15-03/boot-usage",
    blurb:
      "Spring Boot Actuator library for runtime dependency analysis. Published on Maven Central; merged into the awesome-java registry (40K★) as entry #1173.",
    icon: SiApachemaven,
    color: "#c71a36",
  },
  {
    title: "DhrLang — Statically-Typed JVM Language",
    tag: "Personal · Compiler · v3.0.0",
    href: "https://github.com/dhruv-15-03/DhrLang",
    blurb:
      "JVM-hosted language built end-to-end with three execution backends (AST · IR · bytecode), generics, multi-dim arrays, JSON diagnostics, an LSP server, a VS Code extension, and an EVM compiler target for smart contracts. v3.0.0 with 14 releases, 1,000+ tests (Jacoco + PIT mutation testing in CI).",
    icon: FaCode,
    color: "#bf5af2",
  },
  {
    title: "AI-Court — Legal Prediction Platform",
    tag: "Academic · Java + Python + React",
    href: "https://github.com/dhruv-15-03/AI-CourtRoom",
    blurb:
      "Full-stack AI platform with NLP, embeddings & RAG over case law. ~87% prediction accuracy; multi-tenant Spring Boot backend serving 5K+ concurrent users; full MLOps pipeline.",
    icon: FaBrain,
    color: "#00d4ff",
  },
];

const CERTIFICATIONS = [
  "Oracle Cloud Infrastructure Certified Developer (2025)",
  "Oracle Cloud Infrastructure Certified DevOps Professional (2025)",
  "MongoDB Java Developer Certified",
  "GitHub Copilot Certified",
  "Microsoft DP-600 (Fabric Analytics Engineer)",
  "Machine Learning 1 — Columbia+",
  "AI Foundations — IBM & Infosys",
];

const ACHIEVEMENTS = [
  {
    label: "LeetCode Knight",
    detail: "1,000+ problems solved",
    icon: SiLeetcode,
    color: "#ffa116",
  },
  {
    label: "Smart India Hackathon 2024",
    detail: "Top 50 teams nationally",
    icon: FaAward,
    color: "#00d4ff",
  },
  {
    label: "ISC Class XII",
    detail: "96.75% — Rank 1 on Campus",
    icon: FaAward,
    color: "#bf5af2",
  },
  {
    label: "Open Source Impact",
    detail: "Merged into awesome-java (40K★)",
    icon: FaAward,
    color: "#ff6b9d",
  },
];

// ---------- HELPER COMPONENTS --------------------------------------------

const Pill = ({ icon: Icon, color, children }) => (
  <div className="resume-pill" style={{ borderColor: `${color}55`, color }}>
    {Icon && <Icon />}
    {children}
  </div>
);

const TimelineItem = ({ item, index }) => (
  <div className="timeline-item">
    <div className="timeline-dot" />
    <div className="timeline-card">
      <div className="timeline-period">{item.period}</div>
      <h3 className="timeline-role">
        {item.role}
        <span className="timeline-at"> · {item.company}</span>
      </h3>
      <div className="timeline-location">{item.location}</div>

      <div className="timeline-stack">
        {item.stack.map((s) => (
          <span className="project-tag" key={s}>
            {s}
          </span>
        ))}
      </div>

      <ul className="timeline-bullets">
        {item.bullets.map((b, i) => (
          <li key={i}>
            <FaCheckCircle className="bullet-icon" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ---------- PAGE ---------------------------------------------------------

function ResumeNew() {
  return (
    <div>
      <Container fluid className="resume-section">
        {/* Sticky right-rail TOC — minimal markup, big scannability win.
            Hidden < 1280px (handled in CSS) so it never crowds tablet/mobile. */}
        <nav className="resume-toc" aria-label="Career sections">
          <div className="resume-toc-label">On this page</div>
          <ul>
            {[
              ["experience", "Experience"],
              ["open-source", "Open Source"],
              ["certifications", "Certifications"],
              ["achievements", "Achievements"],
              ["education", "Education"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>


        {/* ===== HEADER ===== */}
        <Container>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div className="resume-eyebrow">Career Overview</div>
            <h1 className="resume-h1">
              The full <span className="purple">story</span>, on one page.
            </h1>
            <p className="resume-sub">
              Three production engineering roles, an open-source library on
              Maven Central, a JVM compiler, AI systems shipped to users —
              and the receipts for each.
            </p>

            {/* Identity strip */}
            <Row style={{ justifyContent: "center", marginTop: "32px" }}>
              <Col md={10} lg={9}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <Pill icon={FaCode} color="#bf5af2">
                    Backend & Cloud-Native
                  </Pill>
                  <Pill icon={FaBrain} color="#00d4ff">
                    AI / LLM Systems
                  </Pill>
                  <Pill icon={FaCloud} color="#ff6b9d">
                    Azure · AWS · K8s
                  </Pill>
                  <Pill icon={SiApachemaven} color="#00ff88">
                    Open Source @ Maven Central
                  </Pill>
                </div>
              </Col>
            </Row>

            {/* Single download CTA — keeps the user's existing PDF link */}
            <div style={{ marginTop: "36px" }}>
              <Button
                href={RESUME_PDF}
                target="_blank"
                rel="noreferrer"
                className="resume-download"
              >
                <AiOutlineDownload style={{ fontSize: "1.4em" }} />
                Download CV (PDF)
              </Button>
              <div className="resume-download-note">
                One-page PDF · synced to the SDE-1 version
              </div>
            </div>
          </div>
        </Container>

        {/* ===== EXPERIENCE ===== */}
        <Container id="experience" className="resume-block">
          <div className="resume-section-head">
            <HiOutlineBriefcase className="resume-section-icon" />
            <div>
              <h2 className="resume-section-title">Experience</h2>
              <p className="resume-section-sub">
                What I've shipped, where, and what it actually moved.
              </p>
            </div>
          </div>

          <div className="timeline">
            {EXPERIENCE.map((item, index) => (
              <TimelineItem key={item.company} item={item} index={index} />
            ))}
          </div>
        </Container>

        {/* ===== OPEN SOURCE & SYSTEMS ===== */}
        <Container id="open-source" className="resume-block">
          <div className="resume-section-head">
            <FaCode className="resume-section-icon" />
            <div>
              <h2 className="resume-section-title">Open Source & Systems</h2>
              <p className="resume-section-sub">
                The artifacts I'd point at in an interview.
              </p>
            </div>
          </div>

          <Row>
            {OPEN_SOURCE.map(({ title, tag, href, blurb, icon: Icon, color }) => (
              <Col md={4} key={title} style={{ marginBottom: "24px" }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="oss-card"
                  style={{ borderColor: `${color}33` }}
                >
                  <div className="oss-icon" style={{ color }}>
                    <Icon />
                  </div>
                  <div className="oss-tag">{tag}</div>
                  <h3 className="oss-title">{title}</h3>
                  <p className="oss-blurb">{blurb}</p>
                  <div className="oss-link">View on GitHub →</div>
                </a>
              </Col>
            ))}
          </Row>
        </Container>

        {/* ===== CERTIFICATIONS ===== */}
        <Container id="certifications" className="resume-block">
          <div className="resume-section-head">
            <FaAward className="resume-section-icon" />
            <div>
              <h2 className="resume-section-title">Certifications</h2>
              <p className="resume-section-sub">
                Formally validated — Cloud, Data, AI.
              </p>
            </div>
          </div>

          <Row>
            {CERTIFICATIONS.map((c) => (
              <Col md={6} lg={4} key={c} style={{ marginBottom: "16px" }}>
                <div className="cert-row">
                  <FaCheckCircle className="cert-check" />
                  <span>{c}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        {/* ===== ACHIEVEMENTS ===== */}
        <Container id="achievements" className="resume-block">
          <div className="resume-section-head">
            <FaAward className="resume-section-icon" />
            <div>
              <h2 className="resume-section-title">Achievements</h2>
              <p className="resume-section-sub">
                Things I'm honestly proud of.
              </p>
            </div>
          </div>

          <Row>
            {ACHIEVEMENTS.map(({ label, detail, icon: Icon, color }) => (
              <Col md={6} lg={3} key={label} style={{ marginBottom: "20px" }}>
                <div
                  className="achievement-card"
                  style={{ borderColor: `${color}40` }}
                >
                  <div className="achievement-icon" style={{ color }}>
                    <Icon />
                  </div>
                  <div className="achievement-label">{label}</div>
                  <div className="achievement-detail">{detail}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        {/* ===== EDUCATION ===== */}
        <Container id="education" className="resume-block">
          <div className="resume-section-head">
            <HiOutlineAcademicCap className="resume-section-icon" />
            <div>
              <h2 className="resume-section-title">Education</h2>
              <p className="resume-section-sub">Final semester · part-time alongside full-time work.</p>
            </div>
          </div>

          <div className="edu-card">
            <div>
              <h3 className="edu-degree">
                B.Tech, Computer Science & Engineering{" "}
                <span className="purple">(AI Specialization)</span>
              </h3>
              <div className="edu-school">AKTU, India · Expected July 2026</div>
            </div>
            <div className="edu-grade">CGPA 8.5 / 10</div>
          </div>
        </Container>

        {/* ===== CONTACT FOOTER ===== */}
        <Container id="contact" className="resume-block" style={{ paddingBottom: 60 }}>
          <div className="resume-cta">
            <h3>Ready to talk?</h3>
            <p>
              I'm open to <span className="purple">Founding / Senior IC</span>{" "}
              roles — fully remote, hybrid, or relocation.
            </p>
            <div className="resume-cta-actions">
              <a
                href="mailto:dhruvrastogi2004@gmail.com"
                className="cta cta-primary"
              >
                <FaEnvelope /> Email me
              </a>
              <a
                href="https://www.linkedin.com/in/dhruv-rastogi-3b744032b/"
                target="_blank"
                rel="noreferrer"
                className="cta cta-ghost"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://github.com/dhruv-15-03"
                target="_blank"
                rel="noreferrer"
                className="cta cta-ghost"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noreferrer"
                className="cta cta-ghost"
              >
                <AiOutlineDownload /> Download CV
              </a>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;
