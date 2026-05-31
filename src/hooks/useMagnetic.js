import { useEffect, useRef } from "react";

/**
 * useMagnetic — pointer "magnet" effect for CTAs and small interactive
 * elements. The element pulls toward the cursor with subtle easing, then
 * snaps back on leave. Disabled on touch + reduced-motion.
 *
 *   strength — pixels of max travel (default 14)
 *   radius   — px around the element where the magnet engages (default 90)
 */
export default function useMagnetic({ strength = 14, radius = 90 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let rect = null;
    const refresh = () => { rect = el.getBoundingClientRect(); };

    const move = (e) => {
      if (!rect) refresh();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = Math.max(rect.width, rect.height) / 2 + radius;
      if (dist > max) return reset();
      const k = 1 - dist / max;
      const tx = (dx / max) * strength * (0.5 + k * 0.8);
      const ty = (dy / max) * strength * (0.5 + k * 0.8);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transition = "transform 120ms cubic-bezier(0.22,1,0.36,1)";
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.transition = "transform 380ms cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "translate3d(0,0,0)";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    refresh();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [strength, radius]);

  return ref;
}
