import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink,
  FiDownload,
  FiCommand,
  FiCornerDownLeft,
  FiCode,
  FiCpu,
  FiTrendingUp,
} from "react-icons/fi";

/**
 * CommandPalette — ⌘K / Ctrl+K launcher
 * ----------------------------------------------------------------------------
 * Vercel- / Linear-style keyboard palette that surfaces every navigable
 * action on the site behind one shortcut. Why it matters:
 *
 *   - Power users (recruiters who *use* keyboards on dev sites, founders,
 *     senior engineers) immediately recognize the pattern and respect it.
 *   - It collapses the entire IA into a 60-char text input — for the visitor
 *     who knows what they want, the site becomes ten times faster.
 *   - It signals "I build product, not just pages." This is the single
 *     cheapest senior-engineering tell.
 *
 * Design rules I held to:
 *   - Pure CSS modal (no portal library) — opens in a single state flip.
 *   - Real arrow-key navigation, real Enter to fire, real Escape to dismiss.
 *   - Type-ahead filters by item label, group, and keywords.
 *   - Internal routes use react-router (no full page reload); external links
 *     open in a new tab. Email opens mailto:.
 *   - Auto-focus the input on open. Restore focus on close.
 */

// Action shape: { id, label, group, keywords, icon, run() }
function buildActions(navigate, close) {
  const go = (path) => () => {
    navigate(path);
    close();
  };
  const open = (url) => () => {
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  return [
    // ---------- Navigation ----------
    { id: "home", label: "Go to Home", group: "Navigate", keywords: "home start landing", icon: FiHome, run: go("/") },
    { id: "about", label: "Go to About", group: "Navigate", keywords: "about story bio", icon: FiUser, run: go("/about") },
    { id: "projects", label: "Go to Projects", group: "Navigate", keywords: "projects work portfolio", icon: FiBriefcase, run: go("/project") },
    { id: "career", label: "Go to Career", group: "Navigate", keywords: "career resume cv experience", icon: FiFileText, run: go("/resume") },

    // ---------- Case studies ----------
    { id: "case-boot", label: "Read case study: boot-usage", group: "Case studies", keywords: "boot-usage spring actuator java", icon: FiCpu, run: go("/work/boot-usage") },
    { id: "case-ai", label: "Read case study: AI Legal Assistant", group: "Case studies", keywords: "ai-court court rag llm langchain", icon: FiCpu, run: go("/work/ai-court") },

    // ---------- Live demos ----------
    { id: "demo-ai", label: "Open AI-Court live demo", group: "Live demos", keywords: "ai court room legal", icon: FiExternalLink, run: open("https://ai-court-room-iota.vercel.app/") },
    { id: "demo-summarizer", label: "Open AI Summarizer live demo", group: "Live demos", keywords: "summarizer nlp ai", icon: FiExternalLink, run: open("https://ai-summarizer-three-gold.vercel.app/") },
    { id: "demo-securestep", label: "Open SecureStep live demo", group: "Live demos", keywords: "securestep gps safety", icon: FiExternalLink, run: open("https://secure-step-nu.vercel.app/") },
    { id: "demo-tax", label: "Open TaxView live demo", group: "Live demos", keywords: "tax view ml random forest", icon: FiExternalLink, run: open("https://tax-puce.vercel.app/") },
    { id: "demo-verimed", label: "Open VeriMed live demo", group: "Live demos", keywords: "verimed health ai", icon: FiExternalLink, run: open("https://veri-med.vercel.app/") },
    { id: "demo-thoughts", label: "Open Thoughts (social) live demo", group: "Live demos", keywords: "thoughts social react", icon: FiExternalLink, run: open("https://dhr-social.vercel.app/") },

    // ---------- Source code ----------
    { id: "src-dhrlang", label: "View DhrLang on GitHub", group: "Source", keywords: "dhrlang compiler jvm github source", icon: FiCode, run: open("https://github.com/dhruv-15-03/DhrLang") },
    { id: "src-bootusage", label: "View boot-usage on GitHub", group: "Source", keywords: "boot-usage spring boot starter source", icon: FiCode, run: open("https://github.com/dhruv-15-03/boot-usage") },
    { id: "src-aicourt", label: "View AI-CourtRoom on GitHub", group: "Source", keywords: "ai court room source javascript", icon: FiCode, run: open("https://github.com/dhruv-15-03/AI-CourtRoom") },
    { id: "src-aicourt-ai", label: "View AI-court-AI (Python core) on GitHub", group: "Source", keywords: "ai court ai python ml rag source", icon: FiCode, run: open("https://github.com/dhruv-15-03/AI-court-AI") },
    { id: "src-portfolio", label: "View this portfolio on GitHub", group: "Source", keywords: "portfolio source react", icon: FiCode, run: open("https://github.com/dhruv-15-03/Portfolio") },
    { id: "src-all", label: "View all repositories on GitHub", group: "Source", keywords: "github profile all repos", icon: FiGithub, run: open("https://github.com/dhruv-15-03") },

    // ---------- Profiles ----------
    { id: "linkedin", label: "Open LinkedIn", group: "Profiles", keywords: "linkedin profile contact", icon: FiLinkedin, run: open("https://www.linkedin.com/in/dhruv-rastogi-3b744032b/") },
    { id: "leetcode", label: "Open LeetCode (Knight, 1,000+ solved)", group: "Profiles", keywords: "leetcode dsa knight algorithms", icon: FiTrendingUp, run: open("https://leetcode.com/u/dhruv_1503/") },

    // ---------- Actions ----------
    { id: "email", label: "Email me — dhruvrastogi2004@gmail.com", group: "Actions", keywords: "email contact mail reach", icon: FiMail, run: open("mailto:dhruvrastogi2004@gmail.com") },
    { id: "cv", label: "Download CV (PDF)", group: "Actions", keywords: "cv resume pdf download", icon: FiDownload, run: open("https://drive.google.com/uc?export=view&id=1guFP3iu4OXYwPOdaXCAN5qy1OvnT7H7n") },
  ];
}

/**
 * Score actions against a query. Cheap, transparent ranking:
 *   - exact label-prefix match → 1000
 *   - label contains query     → 500 + (query length / label length) * 100
 *   - keywords contains query  → 200
 *   - group contains query     → 50
 *   - empty query              → 0 for everything (preserve original order)
 */
function rank(actions, query) {
  const q = query.trim().toLowerCase();
  if (!q) return actions.map((a) => ({ ...a, _score: 0 }));
  return actions
    .map((a) => {
      const label = a.label.toLowerCase();
      const kw = (a.keywords || "").toLowerCase();
      const grp = a.group.toLowerCase();
      let score = 0;
      if (label.startsWith(q)) score = 1000;
      else if (label.includes(q)) score = 500 + Math.round((q.length / label.length) * 100);
      else if (kw.includes(q)) score = 200;
      else if (grp.includes(q)) score = 50;
      return { ...a, _score: score };
    })
    .filter((a) => a._score > 0)
    .sort((a, b) => b._score - a._score);
}

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previouslyFocused = useRef(null);
  const navigate = useNavigate();

  // ----- open / close -----
  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  };

  // Global hotkey: ⌘K / Ctrl+K to toggle, "/" to open when not in an input.
  useEffect(() => {
    const onKey = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        document.activeElement &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) &&
        !document.activeElement.isContentEditable
      ) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus management — input on open, restore on close. Lock body scroll while open.
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement;
      document.body.style.overflow = "hidden";
      // setTimeout 0 lets the modal mount before we try to focus.
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus();
      }
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Build the action list once per open (cheap to keep stable).
  const actions = useMemo(() => buildActions(navigate, close), [navigate]);
  const filtered = useMemo(() => rank(actions, query), [actions, query]);

  // Keep the active row in view as the user arrows through results.
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIdx]);

  if (!open) return null;

  // ----- key handling inside the input -----
  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = filtered[activeIdx];
      if (a) a.run();
    }
  };

  // Group filtered results for visual separation.
  const grouped = filtered.reduce((acc, a) => {
    (acc[a.group] = acc[a.group] || []).push(a);
    return acc;
  }, {});

  // Track a global running index so each row knows its position for arrow nav.
  let rowIndex = -1;

  return (
    <div
      className="cmdk-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => {
        // Close on backdrop click but NOT on inner click.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="cmdk-modal" role="combobox" aria-expanded="true" aria-controls="cmdk-listbox" aria-haspopup="listbox">
        <div className="cmdk-input-row">
          <FiCommand className="cmdk-leading" aria-hidden="true" />
          <input
            ref={inputRef}
            className="cmdk-input"
            type="text"
            placeholder="Type a command, project, or page…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Search commands"
          />
          <span className="cmdk-esc">esc</span>
        </div>

        <div className="cmdk-list" id="cmdk-listbox" ref={listRef} role="listbox">
          {filtered.length === 0 ? (
            <div className="cmdk-empty">
              No matches for <em>{query}</em> — try “projects”, “github”, “email”…
            </div>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div className="cmdk-group" key={group}>
                <div className="cmdk-group-label">{group}</div>
                {items.map((a) => {
                  rowIndex += 1;
                  const isActive = rowIndex === activeIdx;
                  const Icon = a.icon;
                  const myIdx = rowIndex;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      data-idx={myIdx}
                      className={`cmdk-row${isActive ? " is-active" : ""}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIdx(myIdx)}
                      onClick={() => a.run()}
                    >
                      <Icon className="cmdk-row-icon" aria-hidden="true" />
                      <span className="cmdk-row-label">{a.label}</span>
                      {isActive && (
                        <span className="cmdk-row-enter" aria-hidden="true">
                          <FiCornerDownLeft />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
          <span className="cmdk-footer-shortcut">
            <kbd>⌘</kbd><kbd>K</kbd> to reopen
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
