import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seo from "../Seo";
// Particles removed: too much ambient noise competed with the spotlight + grain.
// Audit feedback: "pick two motion layers, not four". Kept spotlight + grain.
import Github from "./Github";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.webp";
import Tilt from "react-parallax-tilt";

/**
 * About
 * ----------------------------------------------------------------------------
 * Information architecture of this page (top → bottom):
 *   1. Personal story  (AboutCard)             — WHO and WHY
 *   2. Technical Arsenal (Techstack)           — WHAT I can ship, with depth
 *   3. Tools I live in (Toolstack)             — HOW I work day-to-day
 *   4. Days I code (GitHub Calendar)           — PROOF I show up
 *
 * The order is deliberate: a recruiter who scrolls past the story has
 * already self-selected as a serious reader, so they get progressively more
 * technical evidence as they descend.
 */
function About() {
  return (
    <Container fluid className="about-section">
      <Seo
        title="About — Dhruv Rastogi"
        description="Dhruv Rastogi — Full Stack Engineer at MAQ Software. Backend & cloud-native systems, applied ML, and open-source work — the story, the stack, and live GitHub activity."
        path="/about"
      />

      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1
              style={{
                fontSize: "2.5em",
                paddingBottom: "20px",
                fontWeight: "800",
                letterSpacing: "2px",
              }}
            >
              The <strong className="purple">Short Version</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "80px", paddingBottom: "50px" }}
            className="about-img"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                {/* Conic-gradient halo — slow-moving, decorative, low-CPU. */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                      "conic-gradient(from 0deg, #00d4ff, #bf5af2, #ff6b9d, #00ff88, #00d4ff)",
                    animation: "rotate 6s linear infinite",
                    opacity: "0.25",
                  }}
                />
                <img
                  src={laptopImg}
                  alt="Workspace"
                  className="img-fluid"
                  loading="lazy"
                  decoding="async"
                  width="1852"
                  height="1826"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "20px",
                    border: "3px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            </Tilt>
          </Col>
        </Row>

        {/* ---------- Section: Technical Arsenal ---------- */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "20px",
          }}
        >
          <h1
            className="project-heading"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.8em",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            Technical <strong className="purple">Arsenal</strong>
            <div
              style={{
                position: "absolute",
                bottom: "-15px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "150px",
                height: "4px",
                background:
                  "linear-gradient(90deg, #00d4ff, #bf5af2, #ff6b9d)",
                borderRadius: "2px",
              }}
            />
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "1.1em",
              marginTop: "30px",
              maxWidth: "720px",
              margin: "30px auto 0",
              lineHeight: "1.7",
            }}
          >
            Backend-first, AI-fluent, cloud-native. Each skill below maps to
            something I've shipped to production, contributed to open source,
            or used to build a project on my GitHub —{" "}
            <span className="purple">hover</span> for proficiency.
          </p>
        </div>

        <Techstack />

        {/* ---------- Section: Tools I live in ---------- */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          <h2
            className="project-heading"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.2em",
              fontWeight: "800",
              letterSpacing: "1.5px",
            }}
          >
            Tools I <strong className="purple">Live In</strong>
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1em",
              marginTop: "16px",
              maxWidth: "600px",
              margin: "16px auto 30px",
            }}
          >
            The pinned tabs in my second monitor, every working day.
          </p>
        </div>

        <Toolstack />

        {/* ---------- Section: GitHub activity ---------- */}
        <Github />
      </Container>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default About;
