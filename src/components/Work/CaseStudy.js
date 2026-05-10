import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

/**
 * CaseStudy — shared frame for /work/* routes
 * ----------------------------------------------------------------------------
 * Top-1% portfolios (Brittany Chiang, Lee Robinson, Hassan El Mghari) treat
 * each major project as its own page with a consistent rhythm:
 *
 *   ← Back · eyebrow · title · one-line subtitle · meta strip
 *   [body composed of named sections: Problem, Architecture, Trade-offs,
 *    Outcomes, Postmortem, Stack, Links]
 *
 * Why a shared frame instead of bespoke pages? Because consistency *is* the
 * design. A reader who scans one case study learns the rhythm and can scan
 * the next one in half the time. That is the difference between "portfolio"
 * and "engineering body of work".
 */

export function CaseStudyHero({
  eyebrow,
  title,
  subtitle,
  meta = [], // [{ label, value }]
  primaryLink, // { href, label }
  secondaryLink,
}) {
  return (
    <header className="case-hero">
      <Link to="/project" className="case-back">
        <FiArrowLeft /> All work
      </Link>
      <div className="case-eyebrow">{eyebrow}</div>
      <h1 className="case-title">{title}</h1>
      <p className="case-subtitle">{subtitle}</p>

      {meta.length > 0 && (
        <ul className="case-meta">
          {meta.map((m) => (
            <li key={m.label}>
              <span className="case-meta-label">{m.label}</span>
              <span className="case-meta-value">{m.value}</span>
            </li>
          ))}
        </ul>
      )}

      {(primaryLink || secondaryLink) && (
        <div className="case-actions">
          {primaryLink && (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noreferrer"
              className="cta cta-primary"
            >
              {primaryLink.label}
              <FiExternalLink />
            </a>
          )}
          {secondaryLink && (
            <a
              href={secondaryLink.href}
              target="_blank"
              rel="noreferrer"
              className="cta cta-ghost"
            >
              {secondaryLink.label}
              <FiExternalLink />
            </a>
          )}
        </div>
      )}
    </header>
  );
}

export function CaseSection({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="case-section">
      <div className="case-section-head">
        {eyebrow && <div className="case-section-eyebrow">{eyebrow}</div>}
        {title && <h2 className="case-section-title">{title}</h2>}
      </div>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

/**
 * Decision — a single architectural decision rendered as a "card with a
 * verdict" pattern (we considered X, picked Y, here's why).
 */
export function Decision({ name, picked, rejected, why }) {
  return (
    <div className="decision-card">
      <div className="decision-name">{name}</div>
      <div className="decision-row">
        <span className="decision-pill decision-pill--picked">Picked</span>
        <span>{picked}</span>
      </div>
      {rejected && (
        <div className="decision-row">
          <span className="decision-pill decision-pill--rejected">Rejected</span>
          <span>{rejected}</span>
        </div>
      )}
      <p className="decision-why">{why}</p>
    </div>
  );
}

/**
 * Number — large quantified outcome card. Used in the Outcomes section.
 */
export function Number({ value, label, sub }) {
  return (
    <div className="number-card">
      <div className="number-value">{value}</div>
      <div className="number-label">{label}</div>
      {sub && <div className="number-sub">{sub}</div>}
    </div>
  );
}

function CaseStudy({ children }) {
  return (
    <Container fluid className="case-study">
      <Container className="case-study-inner">{children}</Container>
    </Container>
  );
}

export default CaseStudy;
