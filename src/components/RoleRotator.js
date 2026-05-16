import React, { useEffect, useState } from "react";

/**
 * RoleRotator — cycles through honest role-title positioning every N seconds.
 * ----------------------------------------------------------------------------
 * Why this exists:
 *   The hero used to read "Open to Founding Engineer / Senior IC roles".
 *   At ~1 year of experience, "Founding Engineer / Senior IC" reads as
 *   overreach to anyone who actually hires for those titles. Better to be
 *   accurate, broad, and let the visitor see the spectrum we'd accept.
 *
 *   This component renders one role at a time with a CSS crossfade. It feels
 *   *alive* without being noisy. Pauses on hover so a recruiter can read.
 *
 * Implementation notes:
 *   - Pure CSS opacity transition. No animation library.
 *   - Respects prefers-reduced-motion: shows the first role statically.
 *   - The roles are passed in by the caller so the same component can be
 *     reused with different positioning per page if we ever want to.
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

  return (
    <span
      className={`role-rotator ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
      aria-label={`Open to ${roles.join(", ")} roles`}
    >
      {roles.map((role, i) => (
        <span
          key={role}
          className={`role-rotator-item${i === idx ? " is-active" : ""}`}
          aria-hidden={i !== idx}
        >
          {role}
        </span>
      ))}
    </span>
  );
}

export default RoleRotator;
