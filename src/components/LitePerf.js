import { useEffect } from "react";

/**
 * LitePerf — tags <body class="lite-mode"> on devices that should skip the
 * expensive decorative layers (spotlight, grain, backdrop-filter blurs,
 * marquee animation, parallax tilt). Content and layout are unchanged.
 *
 * The heuristics are deliberately broad, not "only truly weak hardware":
 *   - prefers-reduced-motion: reduce
 *   - touch-only input (hover: none) — this covers most phones/tablets
 *   - Save-Data or a 2g effective connection
 *   - navigator.deviceMemory <= 4 GB
 *   - navigator.hardwareConcurrency <= 4 cores
 *
 * The result is computed once and cached so components that branch on it
 * during their first render (tilt, marquee) agree with the body class that
 * this component applies in an effect after the tree mounts.
 */
let cached;

function detectLitePerf() {
  if (typeof window === "undefined") return false;
  const mq = (query) =>
    typeof window.matchMedia === "function" && window.matchMedia(query).matches;
  if (mq("(prefers-reduced-motion: reduce)") || mq("(hover: none)")) return true;

  const nav = typeof navigator === "undefined" ? undefined : navigator;
  if (!nav) return false;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory <= 4) return true;
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency > 0 &&
    nav.hardwareConcurrency <= 4
  ) {
    return true;
  }
  return false;
}

export function isLitePerf() {
  if (cached === undefined) cached = detectLitePerf();
  return cached;
}

export default function LitePerf() {
  useEffect(() => {
    if (!isLitePerf()) return undefined;
    document.body.classList.add("lite-mode");
    return () => document.body.classList.remove("lite-mode");
  }, []);
  return null;
}
