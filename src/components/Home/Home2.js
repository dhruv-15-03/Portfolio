import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.jpeg";
import { AiFillGithub, AiFillYoutube } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
import { FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { SITE_URL } from "../../config/site";
import MaybeTilt from "../MaybeTilt";

/**
 * Home2 — "What I actually do"
 * ----------------------------------------------------------------------------
 * The hero answers WHO I am. This section answers WHAT I do, in plain English,
 * without the resume jargon. It is intentionally a *single, scannable* story —
 * not five paragraphs of buzzwords.
 *
 * Tone:
 *  - First-person, conversational, but every sentence carries proof
 *    (a stack name, a metric, an artifact).
 *  - Three short paragraphs map to the three things any senior engineer
 *    will probe for: BREADTH, DEPTH, OUTPUT.
 */
function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em", marginBottom: "30px" }}>
              A QUICK <span className="purple">INTRO</span>
            </h1>

            <div className="home-about-body">
              {/* PARAGRAPH 1 — breadth. Establishes the hybrid identity. */}
              <p style={{ marginBottom: "20px" }}>
                I'm a <b className="purple">Backend Engineer</b> who lives
                between the JVM, Python, and the cloud — and who ships the
                full stack when the product needs it (Vue at RecruitCRM,
                React here). I design{" "}
                <b className="purple">production backends</b> in{" "}
                <b className="purple">Java, Spring Boot and Python</b>, and ship
                <b className="purple"> ML &amp; LLM systems</b> on top of them —
                from a legal-outcome classifier with hybrid retrieval and
                citation checks to an internal{" "}
                <b className="purple">RAG-based multi-agent</b> application I
                own at MAQ Software.
              </p>

              {/* PARAGRAPH 2 — depth. Names artifacts, not adjectives. */}
              <p style={{ marginBottom: "20px" }}>
                Day-to-day I'm an{" "}
                <b className="purple">Associate Software Engineer at MAQ Software</b>{" "}
                (Nov 2025–present), after two internships (RecruitCRM, CEERAS). I
                build <b className="purple">Java / Spring Boot</b> functionality for
                an internal business application and own a RAG-based multi-agent
                slide-deck app (C#/.NET + React). Outside work, I maintain my
                Spring Boot Actuator starter <code>boot-usage</code>{" "}
                (Apache-2.0, distributed via <b className="purple">JitPack</b>), and I
                wrote <b className="purple">DhrLang</b> from lexer to bytecode — a
                statically-typed JVM language with generics, multi-dim arrays and
                three execution backends (AST · IR · bytecode), now at v4.0.2 across
                38 releases, with an experimental EVM backend and its own VS Code extension.
              </p>

              {/* PARAGRAPH 3 — output. The honest "why hire me" line. */}
              <p>
                What I care about: <b className="purple">shipping</b> things
                that survive Monday morning — clean APIs, sensible cost,
                tests that actually catch regressions, and AI features
                grounded in retrieved context.
              </p>
            </div>
          </Col>

          <Col md={4} className="myAvtar">
            <MaybeTilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1500}
              gyroscope={true}
            >
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden" }}>
                {/* Animated gradient ring — adds depth without a heavy drop-shadow. */}
                <div
                  style={{
                    position: "absolute",
                    top: "-3px",
                    left: "-3px",
                    right: "-3px",
                    bottom: "-3px",
                    background:
                      "linear-gradient(135deg, #00d4ff, #bf5af2, #ff6b9d, #00d4ff)",
                    backgroundSize: "400% 400%",
                    borderRadius: "26px",
                    animation: "gradientBorder 4s ease infinite",
                    zIndex: 0,
                  }}
                />
                <img
                  src={myImg}
                  className="img-fluid"
                  alt="Portrait of Dhruv Rastogi"
                  width="170"
                  height="148"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "24px",
                    border: "3px solid rgba(15, 15, 35, 1)",
                  }}
                />
              </div>
            </MaybeTilt>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1 style={{ fontSize: "2.2em", marginBottom: "10px" }}>
              FIND ME ONLINE
            </h1>
            <p style={{ fontSize: "1.05em", marginBottom: "20px", opacity: 0.85 }}>
              Always up to <span className="purple">talk shop</span> —
              backend architecture, LLM systems, JVM internals, or DSA over a
              cup of coffee.
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/dhruv-15-03"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="GitHub"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/dhruv-rastogi-3b744032b/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://leetcode.com/u/dhruv_1503/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="LeetCode (Knight, 1,200+ solved, rating ~2080, top ~1.7%)"
                >
                  <SiLeetcode />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="Personal site"
                >
                  <FaGlobe />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.youtube.com/@dhruvrastogi15"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="YouTube — teaching ML from scratch"
                >
                  <AiFillYoutube />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Container>
  );
}
export default Home2;
