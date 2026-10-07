import React, { useEffect, useState } from "react";

/**
 * DeferredAnalytics — loads @vercel/analytics only once the browser is idle,
 * so the analytics chunk and its beacon setup don't compete with first paint.
 */
export default function DeferredAnalytics() {
  const [Analytics, setAnalytics] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      import("@vercel/analytics/react")
        .then((mod) => {
          if (!cancelled) setAnalytics(() => mod.Analytics);
        })
        .catch((err) => {
          console.warn("Vercel Analytics failed to load", err);
        });
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(load, { timeout: 4000 })
      : window.setTimeout(load, 2000);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  return Analytics ? <Analytics /> : null;
}
