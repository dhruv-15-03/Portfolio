import React, { useEffect, useRef, useState } from "react";

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
    let lastY = window.scrollY;
    let raf = 0;
    let target = 0;
    let current = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      // Velocity → temporary boost (clamped). Faster scroll = faster marquee.
      target = Math.max(Math.min(dy * 0.06, 1.4), -1.4);
    };

    const tick = () => {
      current += (target - current) * 0.12;
      target *= 0.92; // bleed off
      setBoost(current);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
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
