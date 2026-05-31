import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FiTarget, FiZap, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import useTilt from "../../hooks/useTilt";

/**
 * ProjectCards — v2 (audit-driven rewrite)
 * ----------------------------------------------------------------------------
 * Audit feedback addressed:
 *   - Story is now ordered IMPACT → PROBLEM → APPROACH (was the reverse).
 *     Recruiters scan top-down; the punchline goes first.
 *   - Premium hover state: image slow-zooms, a gradient overlay slides in,
 *     and a "View case study →" affordance reveals on cards that have a
 *     long-form route. This is the missing micro-interaction the audit
 *     called out.
 *   - Images lazy-load + carry intrinsic dimensions so we don't churn CLS.
 *   - New `caseLink` prop wires a card directly to its long-form /work/*
 *     case study (currently boot-usage and AI-Court).
 *
 * Backwards compatible: cards that pass `description` (the legacy prop) still
 * render as a single paragraph below the title.
 */
function ProjectCards(props) {
  const {
    imgPath,
    title,
    description,
    badge,
    tags = [],
    problem,
    approach,
    impact,
    ghLink,
    demoLink,
    demoLabel,
    caseLink, // NEW — internal /work/* path for long-form case study
    isBlog,
  } = props;

  const hasStory = problem || approach || impact;
  const tiltRef = useTilt({ max: 6, scale: 1.012, perspective: 1100 });

  return (
    <div className="project-card-tilt" ref={tiltRef}>
    <Card className={`project-card-view ${caseLink ? "has-case" : ""}`}>
      <div className="project-card-sheen" aria-hidden="true" />
      {/* ------- THUMBNAIL with hover overlay ------- */}
      <div className="project-thumb">
        {imgPath ? (
          <Card.Img
            variant="top"
            src={imgPath}
            alt={`${title} preview`}
            loading="lazy"
            decoding="async"
            width="640"
            height="360"
            className="project-thumb-img"
          />
        ) : (
          <div
            className="project-thumb-fallback"
            role="img"
            aria-label={`${title} project artwork`}
          >
            <div className="project-thumb-glyph">{"</>"}</div>
            <div className="project-thumb-tag">{badge || "Open Source"}</div>
          </div>
        )}

        {/* Hover overlay — gradient veil + reveal CTA. Pure CSS, no JS.
            Only shows the "View case study" pill on cards that actually have one. */}
        <div className="project-thumb-overlay" aria-hidden="true">
          {caseLink && (
            <span className="project-thumb-cta">
              View case study <FiArrowRight />
            </span>
          )}
        </div>
      </div>

      <Card.Body className="project-card-body">
        {badge && <div className="project-badge">{badge}</div>}

        <Card.Title className="project-card-title">{title}</Card.Title>

        {hasStory ? (
          // IMPACT-FIRST ordering. Lead with the outcome — that is what the
          // hiring panel scans for. Problem and approach support it.
          <ul className="project-story" aria-label="Project story">
            {impact && (
              <li>
                <FiTrendingUp className="story-icon icon-green" aria-hidden="true" />
                <div>
                  <span className="story-label">Impact</span>
                  <span className="story-text">{impact}</span>
                </div>
              </li>
            )}
            {problem && (
              <li>
                <FiTarget className="story-icon icon-blue" aria-hidden="true" />
                <div>
                  <span className="story-label">Problem</span>
                  <span className="story-text">{problem}</span>
                </div>
              </li>
            )}
            {approach && (
              <li>
                <FiZap className="story-icon icon-purple" aria-hidden="true" />
                <div>
                  <span className="story-label">Approach</span>
                  <span className="story-text">{approach}</span>
                </div>
              </li>
            )}
          </ul>
        ) : (
          <Card.Text className="project-card-desc">{description}</Card.Text>
        )}

        {tags.length > 0 && (
          <div className="project-tags" aria-label="Tech stack">
            {tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-card-actions">
          {/* Long-form case study link — visually the primary action when present. */}
          {caseLink && (
            <Link to={caseLink} className="cta cta-primary cta--card">
              Read case study
              <FiArrowRight />
            </Link>
          )}

          <Button
            variant="primary"
            href={ghLink}
            target="_blank"
            rel="noreferrer"
            className="card-btn card-btn--ghost"
          >
            <BsGithub style={{ fontSize: "1.1em" }} />
            {isBlog ? "Blog" : "Code"}
          </Button>

          {!isBlog && demoLink && (
            <Button
              variant="primary"
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              className="card-btn card-btn--demo"
            >
              <CgWebsite style={{ fontSize: "1.1em" }} />
              {demoLabel || "Live Demo"}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
    </div>
  );
}

export default ProjectCards;
