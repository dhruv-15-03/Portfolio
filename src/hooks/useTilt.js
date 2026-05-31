import { useEffect, useRef } from "react";

/**
 * useTilt — lightweight 3D parallax tilt for cards.
 * Pointer-driven rotateX/rotateY + a CSS-variable spotlight that follows
 * the cursor. Honors prefers-reduced-motion and disables on coarse pointers
 * (touch) so it never fights mobile scrolling.
 */
export default function useTilt({ max = 8, scale = 1.015, perspective = 900 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let frame = 0;
    let rect = null;

    const refreshRect = () => { rect = node.getBoundingClientRect(); };

    const onEnter = () => {
      refreshRect();
      node.style.willChange = "transform";
      node.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const onMove = (e) => {
      if (!rect) refreshRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const rx = (py - 0.5) * -2 * max;
      const ry = (px - 0.5) * 2 * max;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform = `perspective(${perspective}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
        node.style.setProperty("--tilt-x", `${(px * 100).toFixed(2)}%`);
        node.style.setProperty("--tilt-y", `${(py * 100).toFixed(2)}%`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
      node.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      node.style.setProperty("--tilt-x", "50%");
      node.style.setProperty("--tilt-y", "50%");
    };

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", refreshRect, { passive: true });
    window.addEventListener("resize", refreshRect);

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("resize", refreshRect);
    };
  }, [max, scale, perspective]);

  return ref;
}
