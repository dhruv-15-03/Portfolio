import React, { useEffect, useState } from "react";

/**
 * RoleRotator — cycles through honest role-title positioning every N seconds.
 * ----------------------------------------------------------------------------
 * Why this exists:
 *   The hero used to read "Open to Founding Engineer / Senior IC roles".
 *   At ~1 year of experience that's overreach. Better: cycle the actual
 *   titles I'd take today.
 *
 * Sizing strategy (v2 — dynamic):
 *   The previous version reserved width for the longest label, which left
 *   awkward whitespace before the trailing word "roles" when shorter
 *   labels were active. This version renders only the *current* label
 *   inline, so the box's width tracks reality. We trigger a CSS keyframe
 *   on every label change via a `key` on the inner span — that gives the
 *   crossfade without needing absolute positioning. The trailing word
 *   reflows naturally; with a fast (~250ms) animation it reads as
 *   intentional motion, not jank.
 */
function RoleRotator({ roles, intervalMs = 2400, className = "" }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || roles.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % roles.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [roles, intervalMs, paused]);

  const current = roles[idx];

  return (
    <span
      className={`role-rotator ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
      aria-label={`Open to ${roles.join(", ")} roles`}
    >
      {/* `key={current}` forces React to remount the inner span on every
          rotation, which re-runs the CSS keyframe and produces the fade. */}
      <span key={current} className="role-rotator-current">
        {current}
      </span>
    </span>
  );
}

export default RoleRotator;


