import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import useSiteStats from "../hooks/useSiteStats";
import useCountUp from "../hooks/useCountUp";

/**
 * SiteStats — the small "live" pill that lives in the footer.
 *
 * What it shows:
 *   - A pulsing green "live" dot
 *   - Eye icon + the *real* total visitor count, with a count-up animation
 *     the first time it scrolls into view
 *   - "viewers" label and the current local time, refreshed every minute
 *
 * What it deliberately does NOT do:
 *   - Show a fake number when the API is down. If `ready` is false the whole
 *     pill returns null so the footer just looks normal.
 *   - Show "currently online" — that requires WebSockets and a backend, and a
 *     fake "currently 1 viewer" looks worse than nothing.
 */
function SiteStats() {
  const { count, ready } = useSiteStats();

  // Tick the timestamp every minute so the pill feels alive on long sessions.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Animate the number up from 0 to the real count the first time the pill
  // is visible. If the API hasn't responded yet, useCountUp gets 0 → 0 (no-op).
  const { ref, value } = useCountUp(ready ? count : 0, { duration: 1400 });

  if (!ready) return null;

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      ref={ref}
      className="site-stats"
      role="status"
      aria-live="polite"
      aria-label={`${count} visits to date`}
    >
      <span className="site-stats-dot" aria-hidden="true" />
      <FiEye className="site-stats-icon" aria-hidden="true" />
      <span className="site-stats-count">
        {Math.round(value).toLocaleString()}
      </span>
      <span className="site-stats-label">visits</span>
      <span className="site-stats-sep" aria-hidden="true">·</span>
      <span className="site-stats-time">live · {time}</span>
    </div>
  );
}

export default SiteStats;
