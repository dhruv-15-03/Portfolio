import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiFillHeart } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import SiteStats from "./SiteStats";

/**
 * Footer
 * ----------------------------------------------------------------------------
 * Intentionally small. The big "let's work together" CTA lives in <CTA />
 * just above this — the Footer is for legal / signature / proof links only.
 *
 * Why I removed Instagram / YouTube from here? Recruiters don't click them
 * from a portfolio footer. They click GitHub, LinkedIn, LeetCode. Keeping
 * the surface area focused makes the proof-links denser per cm².
 */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container fluid className="footer">
      {/* Live "site stats" pill — real visitor count from CounterAPI, count-up
          animated, hides itself if the upstream is unreachable so we never
          show a fake number. */}
      <Row className="justify-content-center" style={{ marginBottom: 18 }}>
        <Col xs="auto">
          <SiteStats />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md="4" className="footer-copywright">
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            Designed &amp; built with
            <AiFillHeart
              style={{ color: "#ff6b9d", animation: "heartBeat 1.5s infinite" }}
            />
            by{" "}
            <span style={{ color: "#00d4ff", fontWeight: 600 }}>
              Dhruv Rastogi
            </span>
          </h3>
        </Col>

        <Col md="4" className="footer-copywright">
          <h3
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            © {year}
            <span
              style={{
                color: "#00d4ff",
                WebkitTextFillColor: "#00d4ff",
                marginLeft: "6px",
                fontWeight: 700,
              }}
            >
              DR
            </span>
            <span style={{ opacity: 0.6, marginLeft: 8, fontSize: "0.9em" }}>
              · Currently @ MAQ Software
            </span>
          </h3>
        </Col>

        <Col md="4" className="footer-body">
          <ul
            className="footer-icons"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li className="social-icons">
              <a
                href="https://github.com/dhruv-15-03"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease",
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/dhruv-rastogi-3b744032b/"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease",
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://leetcode.com/u/dhruv_1503/"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease",
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
              >
                <SiLeetcode />
              </a>
            </li>
          </ul>
        </Col>
      </Row>

      <style>{`
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </Container>
  );
}

export default Footer;
