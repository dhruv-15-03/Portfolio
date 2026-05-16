import React from "react";
import { Container } from "react-bootstrap";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import useReveal from "../hooks/useReveal";

/**
 * CTA — "Let's build something"
 * ----------------------------------------------------------------------------
 * Lives between the page content and the Footer on every route. Its single
 * job is to make sure that no matter where a recruiter lands and stops
 * scrolling, there is a *clear, unambiguous* next action.
 *
 * Design notes:
 *  - Dark glass card with a soft gradient ring — same visual language as the
 *    project cards & Hero, so it doesn't feel bolted on.
 *  - Email is the primary CTA (recruiters convert highest on direct email).
 *  - Reveal-on-scroll is hooked but degraded: if motion is reduced, the
 *    card is shown immediately (handled inside `useReveal`).
 */
function CTA() {
  const { ref, revealed } = useReveal();

  return (
    <section
      ref={ref}
      className={`cta-section reveal ${revealed ? "reveal-in" : ""}`}
      aria-labelledby="cta-heading"
    >
      <Container>
        <div className="cta-card">
          <div className="cta-glow" aria-hidden="true" />

          <div className="cta-content">
            <div className="cta-eyebrow">Let's talk</div>
            <h2 id="cta-heading" className="cta-heading">
              Building something <span className="purple">ambitious</span>?
            </h2>
            <p className="cta-sub">
              I'm open to <b>SDE-1 / SDE-2</b>, <b>Backend</b>, and{" "}
              <b>AI/ML Engineer</b> roles — fully remote, hybrid, or
              relocation. Backend depth + AI-fluent + ships fast.
            </p>

            <div className="cta-actions">
              <a
                href="mailto:dhruvrastogi2004@gmail.com"
                className="cta cta-primary"
              >
                <FaEnvelope />
                Email me
                <span className="cta-arrow" aria-hidden="true">→</span>
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
            </div>

            <div className="cta-meta">
              <span>Based in Meerut, India</span>
              <span className="cta-dot">·</span>
              <span>Replies in &lt; 24h</span>
              <span className="cta-dot">·</span>
              <span>+91 7417438179</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTA;
