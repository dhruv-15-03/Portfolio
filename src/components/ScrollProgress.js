import React, { useEffect, useState } from "react";

/**
 * ScrollProgress — thin gradient bar pinned to the top of the viewport that
 * fills as you scroll. Tiny piece of UI but it does two things at once:
 *   - signals "this page has structure" before the user has scrolled
 *   - gives the page a sense of momentum (cinema-style)
 *
 * Implementation notes:
 *   - Uses one passive scroll listener — no layout reads beyond document.
 *   - Updates a single inline `transform: scaleX()` for cheap GPU compositing.
 *   - We deliberately do NOT setState on every scroll event. Instead, we
 *     write directly to a ref-style DOM node via the `style` prop swap, so
 *     React only re-renders when the rounded percent changes (every ~1%).
 */
function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const next = max > 0 ? (h.scrollTop / max) * 100 : 0;
        setPct((prev) => (Math.abs(prev - next) > 0.5 ? next : prev));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}

export default ScrollProgress;
