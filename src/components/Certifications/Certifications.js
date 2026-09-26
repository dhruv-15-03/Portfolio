import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { FiExternalLink, FiAward, FiShield, FiCalendar, FiHash, FiFilter, FiCheck } from "react-icons/fi";
import { SiMicrosoft, SiGithub, SiOracle } from "react-icons/si";
import {
  certifications,
  issuerStyle,
  certStats,
  certVerificationStatus,
} from "../../data/certifications";
import useTilt from "../../hooks/useTilt";
import Seo from "../Seo";

/**
 * Certifications — premium, recruiter-grade page.
 *
 * Design intent:
 *   - Single source of truth (src/data/certifications.js). Every card is
 *     issuer-linked (Microsoft Learn or Oracle University) via `verifyUrl`, so a
 *     recruiter can validate any card in one click.
 *   - Tier-first IA: Expert → Professional → Associate. The eye lands on the
 *     most defensible work first.
 *   - 3D tilt cards (reused useTilt hook) with cursor-tracking sheen for the
 *     "master of 3D animation" feel — but constrained to one effect per card
 *     so the page stays elegant, not noisy.
 *   - Category filter chips on top (Cloud / AI / Data / DevOps / …) so a
 *     visitor can immediately see "what does he actually know in X area."
 *
 * No emojis. Typography uses the shared Inter / Space Grotesk / JetBrains Mono
 * stack defined in src/index.css.
 */

const ISSUER_LOGOS = {
  "Microsoft": SiMicrosoft,
  "Microsoft / GitHub": SiGithub,
  "Oracle": SiOracle,
};

function CertificationCard({ cert, index }) {
  const tiltRef = useTilt({ max: 7, scale: 1.012, perspective: 1100 });
  const issuer = issuerStyle[cert.issuer] || { mark: "·", color: "#9aa4b2" };
  const Logo = ISSUER_LOGOS[cert.issuer];
  const accentVar = `var(--cert-accent-${cert.accent || "blue"})`;
  const verificationStatus = certVerificationStatus(cert);
  const isVerified = verificationStatus === "verified";
  const statusLabel = isVerified ? "Verified" : "Learning record";
  const StatusIcon = isVerified ? FiCheck : FiShield;

  return (
    <div
      className="cert-tilt"
      ref={tiltRef}
      style={{ "--cert-accent": accentVar, "--issuer": issuer.color, animationDelay: `${(index % 6) * 60}ms` }}
    >
      <article className="cert-card" data-tier={cert.tier}>
        <div className="cert-sheen" aria-hidden="true" />

        {/* Header — issuer mark + tier ribbon */}
        <header className="cert-head">
          <div className="cert-mark" aria-hidden="true">
            {Logo ? <Logo /> : <span>{issuer.mark}</span>}
          </div>
          <div className="cert-head-meta">
            <span className="cert-issuer">{cert.issuer}</span>
            <span className="cert-verified" data-status={verificationStatus}>
              <StatusIcon aria-hidden="true" /> {statusLabel}
            </span>
          </div>
          <span className="cert-tier">
            <FiShield aria-hidden="true" />
            {cert.tier}
          </span>
        </header>

        {/* Title */}
        <h3 className="cert-title">{cert.title}</h3>

        {/* Skills — compact mono chips */}
        {cert.skills?.length > 0 && (
          <ul className="cert-skills" aria-label="Skills">
            {cert.skills.slice(0, 4).map((s) => (
              <li key={s}>{s}</li>
            ))}
            {cert.skills.length > 4 && (
              <li className="cert-skills-more">+{cert.skills.length - 4}</li>
            )}
          </ul>
        )}

        {/* Meta row */}
        <dl className="cert-meta">
          {cert.issued && (
            <div>
              <dt><FiCalendar aria-hidden="true" /> Issued</dt>
              <dd>{cert.issued}</dd>
            </div>
          )}
          {cert.expires && cert.expires !== "—" && (
            <div>
              <dt><FiCalendar aria-hidden="true" /> Expires</dt>
              <dd>{cert.expires}</dd>
            </div>
          )}
          {cert.credentialId && (
            <div className="cert-meta-cred">
              <dt><FiHash aria-hidden="true" /> Credential ID</dt>
              <dd className="mono" title={cert.credentialId}>{cert.credentialId}</dd>
            </div>
          )}
        </dl>

        {/* Verify CTA */}
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="cert-verify"
            aria-label={
              isVerified
                ? `Verify ${cert.title} on issuer site`
                : `View record for ${cert.title}`
            }
          >
            <FiShield aria-hidden="true" />
            <span>{isVerified ? "Verify credential" : "View record"}</span>
            <FiExternalLink className="cert-verify-ext" aria-hidden="true" />
          </a>
        ) : (
          <div className="cert-verify" aria-label={`${cert.title}: ${statusLabel}`}>
            <FiShield aria-hidden="true" />
            <span>{statusLabel}</span>
          </div>
        )}
      </article>
    </div>
  );
}

function Certifications() {
  const stats = certStats();
  const categories = useMemo(() => {
    const set = new Set(certifications.map((c) => c.category));
    return ["All", ...Array.from(set)];
  }, []);
  const [activeCat, setActiveCat] = useState("All");

  const filtered = useMemo(
    () =>
      activeCat === "All"
        ? certifications
        : certifications.filter((c) => c.category === activeCat),
    [activeCat]
  );

  // Group filtered set by tier so the page always reads top-down by signal.
  const tiers = ["Expert", "Professional", "Associate"];
  const tierLabel = {
    Expert:       "Expert certifications",
    Professional: "Professional certifications",
    Associate:    "Associate & specialist",
  };

  return (
    <Container fluid className="cert-section">
      <Seo
        title="Certifications — Dhruv Rastogi"
        description="Issuer-verified certifications held by Dhruv Rastogi: Microsoft Learn (AZ-400, AZ-204, DP-700 and more) and Oracle Cloud Infrastructure 2025, each linked to the issuer's own verification page."
        path="/certifications"
      />
      <Container>
        {/* ───────── Hero ───────── */}
        <header className="cert-hero">
          <span className="cert-eyebrow">
            <FiAward aria-hidden="true" /> Certifications
          </span>
          <h1 className="cert-h1" data-num="04"><span className="mark-underline is-shown">Issuer-verified credentials.</span></h1>
          <p className="cert-sub">
            Every card links to the issuer's own verification page: Microsoft
            Learn or Oracle University. Nothing here is self-reported.
          </p>

          <ul className="cert-stats" aria-label="Certification highlights">
            <li>
              <strong>{stats.verified}</strong>
              <span>issuer-verified</span>
            </li>
            <li>
              <strong>{stats.pros}</strong>
              <span>expert &amp; professional</span>
            </li>
            <li>
              <strong>{stats.issuers}</strong>
              <span>issuers</span>
            </li>
          </ul>
        </header>

        {/* ───────── Filter chips ───────── */}
        <nav className="cert-filter" aria-label="Filter by category">
          <span className="cert-filter-label">
            <FiFilter aria-hidden="true" /> Category
          </span>
          <div className="cert-filter-chips" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={activeCat === c}
                className={`cert-chip${activeCat === c ? " is-active" : ""}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </nav>

        {/* ───────── Tiered grids ───────── */}
        {tiers.map((tier) => {
          const items = filtered.filter((c) => c.tier === tier);
          if (items.length === 0) return null;
          return (
            <section key={tier} className="cert-tier-band">
              <div className="cert-tier-head">
                <span className="cert-tier-rule" aria-hidden="true" />
                <h2>{tierLabel[tier]}</h2>
                <span className="cert-tier-count">{items.length}</span>
                <span className="cert-tier-rule" aria-hidden="true" />
              </div>
              <div className="cert-grid">
                {items.map((cert, i) => (
                  <CertificationCard key={cert.id} cert={cert} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </Container>
  );
}

export default Certifications;
