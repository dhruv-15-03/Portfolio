import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — animates a number from 0 → target the first time the host
 * element scrolls into view. Useful for stats strips ("500K+", "1,000+").
 *
 * Why not just CSS? CSS can't tween a *number*. Why not framer-motion?
 * Because it's 30KB for one feature. This hook is 30 lines.
 *
 * Usage:
 *   const { ref, value } = useCountUp(1000, { duration: 1400 });
 *   <span ref={ref}>{value.toLocaleString()}</span>
 */
export default function useCountUp(target, opts = {}) {
  const {
    duration = 1500,
    decimals = 0,
    once = true,
    threshold = 0.4,
  } = opts;
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const el = ref.current;
    let raf;

    const animate = () => {
      const start = performance.now();
      const from = 0;
      const to = target;
      const tick = (t) => {
        const p = Math.min((t - start) / duration, 1);
        // easeOutCubic — feels weighty, settles cleanly.
        const eased = 1 - Math.pow(1 - p, 3);
        const next = from + (to - from) * eased;
        setValue(decimals === 0 ? Math.round(next) : Number(next.toFixed(decimals)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !fired.current)) {
            fired.current = true;
            animate();
            if (once) io.disconnect();
          }
        });
      },
      { threshold }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, decimals, once, threshold]);

  return { ref, value };
}
