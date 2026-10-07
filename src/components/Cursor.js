import React, { useEffect, useRef } from "react";

/**
 * Cursor — magnetic dot + soft halo + global spotlight
 * ----------------------------------------------------------------------------
 * Three layers, all driven from a *single* mousemove listener with rAF
 * batching. We never trigger React re-renders — only direct style writes —
 * so this stays smooth even on a low-power laptop.
 *
 *   1. .cursor-dot     → tiny precise dot, follows the mouse 1:1
 *   2. .cursor-ring    → larger soft ring, lerped (eased) toward the dot
 *   3. CSS variables   → --mx / --my on <body>, used by the global spotlight
 *                        gradient declared in style.css. This is what gives
 *                        the page that "Linear / Vercel" radial-light feel.
 *
 * Auto-disabled on:
 *   - touch devices (no hover)
 *   - users with prefers-reduced-motion
 */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip entirely on touch / reduced-motion / small screens.
    // Audit feedback: "the dot doesn't always feel pixel-precise on small
    // icons; consider auto-disabling below 1280px". Done.
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 1279px)").matches;
    if (isTouch || reduced || isSmall) return;

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId;
    let dirty = false;
    let lastHoverTarget = null;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dirty = true;
      // Expose cursor position globally for the spotlight gradient layer.
      document.body.style.setProperty("--mx", `${mx}px`);
      document.body.style.setProperty("--my", `${my}px`);
    };

    const onDown = () => ring?.classList.add("is-down");
    const onUp = () => ring?.classList.remove("is-down");

    // Re-evaluate hover-target state on mouseover, but skip when the target
    // hasn't actually changed — saves a `closest()` selector walk on every
    // single mousemove-over-element event (these fire constantly).
    const onOver = (e) => {
      const t = e.target;
      if (t === lastHoverTarget) return;
      lastHoverTarget = t;
      const interactive =
        t.closest &&
        t.closest(
          "a, button, [role=button], input, textarea, select, .cta, .project-card, .oss-card, .timeline-card, .achievement-card, .cert-row, .skill-card-enhanced"
        ) !== null;
      ring?.classList.toggle("is-hover", interactive);
    };

    const tick = () => {
      // Lerp the ring toward the dot — "magnetic trailing" feel.
      const dx = mx - rx;
      const dy = my - ry;
      rx += dx * 0.18;
      ry += dy * 0.18;
      if (dirty || Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        dirty = false;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("visibilitychange", onVisibility);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

export default Cursor;
