import { useEffect, useRef, useState } from "react";

/**
 * useReveal
 * --------------------------------------------------------------------------
 * Lightweight Intersection-Observer based reveal hook.
 *
 * WHY a custom hook instead of pulling in framer-motion / GSAP?
 *  - Zero dependency cost; we keep the bundle slim and the FPS budget free
 *    for the existing tsparticles + tilt + gradient animations.
 *  - Animations stay declarative in CSS (`.reveal` -> `.reveal-in`) so they
 *    are GPU-friendly and respect `prefers-reduced-motion` automatically.
 *  - Single observer per element + auto-disconnect after first reveal keeps
 *    scroll handlers cheap on mobile.
 *
 * Usage:
 *   const { ref, revealed } = useReveal();
 *   <div ref={ref} className={`reveal ${revealed ? "reveal-in" : ""}`} />
 */
export default function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who opt out of motion: just mark as revealed immediately.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}
