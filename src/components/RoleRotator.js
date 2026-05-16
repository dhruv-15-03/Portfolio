import React, { useEffect, useMemo, useState } from "react";

/**
 * RoleRotator — cycles through honest role-title positioning every N seconds.
 * ----------------------------------------------------------------------------
 * Why this exists:
 *   The hero used to read "Open to Founding Engineer / Senior IC roles".
 *   At ~1 year of experience, "Founding Engineer / Senior IC" reads as
 *   overreach to anyone who actually hires for those titles.
 *
 *   This component renders one role at a time with a CSS crossfade. It feels
 *   alive without being noisy. Pauses on hover so a recruiter can read.
 *
 * Sizing strategy (the part that's tricky):
 *   We render the LONGEST label as a hidden, in-flow "sizer" span. That
 *   establishes the container's intrinsic width — so the layout never
 *   reflows when the active label changes. The visible labels live in an
 *   absolutely-positioned layer on top of the sizer.
 *
 *   This avoids `min-width: 12ch` (brittle — wrong font, wrong language,
 *   wrong sizing) and avoids JS measurement (which would race the first
 *   paint). It just lets the browser size the longest string for us.
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

  // Pick the longest label to act as the layout-establishing "sizer".
  // Done once per roles change — cheap, and keeps the DOM stable.
  const longest = useMemo(
    () => roles.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [roles]
  );

  return (
    <span
      className={`role-rotator ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
      aria-label={`Open to ${roles.join(", ")} roles`}
    >
      {/* Sizer — invisible but in flow, establishes the box's width. */}
      <span className="role-rotator-sizer" aria-hidden="true">
        {longest}
      </span>
      {/* Visible layer — absolutely positioned crossfade of all roles. */}
      <span className="role-rotator-stack" aria-hidden="true">
        {roles.map((role, i) => (
          <span
            key={role}
            className={`role-rotator-item${i === idx ? " is-active" : ""}`}
          >
            {role}
          </span>
        ))}
      </span>
    </span>
  );
}

export default RoleRotator;

