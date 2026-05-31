import React, { useEffect, useRef } from "react";

/**
 * SplitName — renders the hero wordmark per-letter with:
 *   1. Staggered enter animation (letters fall into place)
 *   2. Per-letter cursor follow: each letter tilts slightly toward the cursor
 *      so the whole word becomes a tactile, 3D object — a signature moment
 *      that no template portfolio has.
 *
 * Honors reduced-motion + coarse pointer (renders static).
 */
export default function SplitName({ text = "DHRUV RASTOGI", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const letters = Array.from(root.querySelectorAll(".split-letter"));
    let rect = null;
    let frame = 0;

    const refresh = () => { rect = root.getBoundingClientRect(); };

    const onMove = (e) => {
      if (!rect) refresh();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        letters.forEach((node) => {
          const lr = node.getBoundingClientRect();
          const cx = lr.left + lr.width / 2;
          const cy = lr.top + lr.height / 2;
          const dx = (e.clientX - cx) / 80;   // smaller = stronger
          const dy = (e.clientY - cy) / 80;
          const tx = Math.max(Math.min(dx, 6), -6);
          const ty = Math.max(Math.min(dy, 6), -6);
          node.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
        });
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      letters.forEach((node) => { node.style.transform = "translate3d(0,0,0)"; });
    };

    refresh();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <h1 ref={ref} className={`hero-name split-name ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={`split-letter${ch === " " ? " is-space" : ""}`}
          style={{ animationDelay: `${i * 35}ms` }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}
