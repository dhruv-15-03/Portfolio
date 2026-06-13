import React from "react";
import { Container } from "react-bootstrap";
import Home2 from "./Home2";
import Type from "./Type";
import TechMarquee from "../TechMarquee";
import MarqueeStrip from "../MarqueeStrip";
import SplitName from "../SplitName";
import DhrLangPlayground from "../DhrLangPlayground";
import RoleRotator from "../RoleRotator";
import useCountUp from "../../hooks/useCountUp";
import useMagnetic from "../../hooks/useMagnetic";

/**
 * Stat — single hero-metric tile with on-scroll count-up.
 * Animates from 0 → target the first time the tile enters the viewport,
 * then stays put. The number does the persuading; the label is just context.
 */
function Stat({ value, suffix = "", decimals = 0, label }) {
  const { ref, value: v } = useCountUp(value, { decimals });
  const display =
    decimals === 0 ? Math.round(v).toLocaleString() : v.toFixed(decimals);
  return (
    <li>
      <strong ref={ref}>
        {display}
        {suffix}
      </strong>
      <span>{label}</span>
    </li>
  );
}

/**
 * Home (Hero) — v4: typography-first
 * ----------------------------------------------------------------------------
 * Audit feedback addressed:
 *   - The illustrated avatar was the weakest visual element on the page.
 *     REMOVED. Headline + metrics now span full width, like Linear / Vercel /
 *     Brittany Chiang. Result: less surface area, more weight.
 *   - "Hey, I'm 👋" was 2018 trope copy. REMOVED.
 *   - "AI-driven SaaS" was unfalsifiable. Replaced with the *artifact* — RAG,
 *     semantic search, ML systems — words that map to actual code on GitHub.
 *   - Particles canvas was animation-noise on top of cursor + spotlight + grain
 *     + count-ups. REMOVED. Calmer page, sharper signal.
 *   - The right-column gradient blob is gone with the avatar; the spotlight
 *     gradient (cursor-following) carries the depth on its own.
 *
 * Layout discipline (top-1% rule "max one gradient-text per viewport"):
 *   - The big "DHRUV RASTOGI" wordmark stays as the single gradient anchor.
 *   - Hero metric values lose their per-tile gradient (now plain white) so
 *     the eye lands on the name first, the numbers second.
 */
function Home() {
  const ctaPrimaryRef = useMagnetic({ strength: 12, radius: 110 });
  const ctaGhostRef = useMagnetic({ strength: 10, radius: 90 });
  return (
    <section>
      <Container fluid className="home-section home-section--typo" id="home">
        <Container className="home-content">
          <div className="hero-stage">
            {/* "Currently @" badge — proof that someone is paying for this work today.
                The role rotator below cycles through the *honest* titles I'd take
                today (~1 YOE). "Founding Engineer" was overreach for the level. */}
            <div className="hero-currently">
              <span className="hero-currently-dot" />
              Currently <span className="hero-currently-strong">@ MAQ Software</span>
              <span className="hero-currently-sep">·</span>
              Open to{" "}
              <RoleRotator
                roles={[
                  "SDE-1 / SDE-2",
                  "Backend Engineer",
                  "AI / ML Engineer",
                  "Full-Stack Engineer",
                ]}
                className="hero-currently-strong"
              />{" "}
              roles
              <span className="hero-currently-sep">·</span>
              <span className="hero-currently-strong">Joinable in 2 weeks</span>
            </div>

            {/* The single gradient anchor on the page. Everything else stays white. */}
            <SplitName text="DHRUV RASTOGI" />

            {/* Role rotator — sits *below* the name so the wordmark dominates. */}
            <div className="hero-role">
              <Type />
            </div>

            {/* Concise positioning sentence — one breath, no buzzwords. */}
            <p className="hero-tagline hero-tagline--center">
              I build <span className="hero-tag-strong">production backends</span> in
              Java &amp; Spring, ship <span className="hero-tag-strong">LLM systems
              that don't hallucinate</span>, and publish open source
              <span className="hero-tag-strong"> on GitHub</span>.
            </p>

            {/* Hard-number proof strip. Only metrics that are on the resume. */}
            <ul className="hero-metrics hero-metrics--center" aria-label="Highlights">
              <Stat value={500} suffix="K+" label="records/day in production" />
              <Stat value={99.9} decimals={1} suffix="%" label="uptime SLA owned" />
              <Stat value={1000} suffix="+" label="LeetCode problems solved" />
              <Stat value={14} suffix="+ releases" label="OSS shipped · DhrLang v3.0.0 · Apache-2.0" />
            </ul>

            {/* Two CTAs only — the audit said three felt needy. Email lives in the
                global CTA band above the footer; here we focus the eye on work + career. */}
            <div className="hero-ctas hero-ctas--center">
              <a href="/project" ref={ctaPrimaryRef} className="cta cta-primary">
                Read the case studies
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>
              <a href="/resume" ref={ctaGhostRef} className="cta cta-ghost">
                Career
              </a>
            </div>
          </div>
        </Container>

        {/* Scroll affordance — small, accessible, never blocks content. */}
        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </Container>

      {/* Infinite logo ribbon — communicates breadth of stack before the
          user even decides to scroll. CSS-driven, zero JS work-per-frame. */}
      <TechMarquee />

      {/* Editorial scroll-reactive word strip — signature flourish that
          reacts to scroll velocity. Pure CSS animation + tiny rAF nudge. */}
      <MarqueeStrip />

      {/* SIGNATURE MOMENT — the thing that cannot exist in a README.
          A live tokenizer + AST visualizer for *real* DhrLang (the v3.0.0
          JVM language with three backends) that updates as you type. The
          single most credible "I actually wrote a compiler" proof on the
          page. */}
      <DhrLangPlayground />

      <Home2 />
    </section>
  );
}

export default Home;
