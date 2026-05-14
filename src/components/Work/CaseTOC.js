import React, { useEffect, useState } from "react";

/**
 * CaseTOC — sticky right-rail table of contents for /work/* case studies.
 *
 * Same visual language as the Resume TOC (`.resume-toc` class) so the two
 * pages feel like a set. We reuse those styles to avoid duplicating ~40 lines
 * of CSS — the difference here is *active-section highlighting* via
 * IntersectionObserver, which the resume TOC doesn't bother with because
 * the resume sections are short.
 *
 * `sections` = [['id', 'Label'], ...]   in document order.
 *
 * Hidden below 1100px (CSS rule in `.resume-toc`), so this never crowds
 * tablet / mobile.
 */
function CaseTOC({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.[0] ?? null);

  useEffect(() => {
    if (!sections.length) return;

    // Pick the section whose top is closest to a comfortable read line
    // (~140px from top — under the navbar). We use a single observer with
    // multiple targets and pick the lowest-index entry that is intersecting.
    const observer = new IntersectionObserver(
      (entries) => {
        // Sort intersecting entries by their top position so the topmost wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Section is "active" when its top sits in the upper third of the viewport.
        rootMargin: "-110px 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="resume-toc" aria-label="Case study sections">
      <div className="resume-toc-label">On this page</div>
      <ul>
        {sections.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeId === id ? "is-active" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CaseTOC;
