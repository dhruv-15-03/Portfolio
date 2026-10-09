import React, { useEffect, useRef, useState } from "react";
import { isLitePerf } from "./LitePerf";

/**
 * MarqueeStrip — giant editorial scrolling-words band.
 *
 * Default state: smooth continuous translate marquee (CSS animation).
 * Enhanced state: scroll velocity nudges the speed, so the band reacts
 * to the page as you read — a signature flourish from publications
 * like NYT / Apple product pages, rare in dev portfolios.
 *
 * Honors prefers-reduced-motion (renders static row, no animation).
 */
export default function MarqueeStrip({
  words = [
    "BACKEND",
    "JVM",
    "LLM SYSTEMS",
    "DISTRIBUTED",
    "COMPILER",
    "CLOUD-NATIVE",
    "RAG",
    "SHIPPING",
  ],
  separator = "·",
  speed = 38, // seconds per loop at rest
}) {
  const trackRef = useRef(null);
  const [boost, setBoost] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isLitePerf()) return;
    let lastY = window.scrollY;
    let raf = 0;
    let target = 0;
    let current = 0;
    let visible = true;

    const tick = () => {
      current += (target - current) * 0.12;
      target *= 0.92; // bleed off
      setBoost(current);
      // Idle the loop when there's nothing to animate — saves a full
      // rAF/frame budget on low-end CPUs when the user isn't scrolling.
      if (Math.abs(current) < 0.002 && Math.abs(target) < 0.002) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      target = Math.max(Math.min(dy * 0.06, 1.4), -1.4);
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
        }, { rootMargin: "200px" })
      : null;
    if (io && trackRef.current?.parentElement) io.observe(trackRef.current.parentElement);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, []);

  // Two copies of the list so the loop is seamless.
  const items = [...words, ...words];

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          // boost shifts the in-flight transform without restarting the loop
          // by adding a small skew + transform offset proportional to velocity.
          transform: `skewY(${(boost * 0.6).toFixed(2)}deg)`,
        }}
      >
        {items.map((w, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-word">{w}</span>
            <span className="marquee-sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
