import React from "react";
import CaseStudy, {
  CaseStudyHero,
  CaseSection,
  Decision,
  Number,
} from "./CaseStudy";
import CaseTOC from "./CaseTOC";

/**
 * /work/algovisualizer
 * ----------------------------------------------------------------------------
 * The ML-education / frontend-systems case study. AlgoVisualizer runs 18 real
 * ML algorithms fully client-side (CPython + NumPy on Pyodide/WASM) with a
 * single trace-event contract driving D3/SVG renderers. Same rhythm as the
 * boot-usage and AI-Court studies so the three read as one body of work.
 */
function AlgoVisualizerCase() {
  return (
    <CaseStudy>
      <CaseTOC
        sections={[
          ["outcomes", "Outcomes"],
          ["problem", "Problem"],
          ["architecture", "Architecture"],
          ["tradeoffs", "Trade-offs"],
          ["postmortem", "Postmortem"],
          ["stack", "Stack"],
        ]}
      />
      <CaseStudyHero
        eyebrow="ML Education · WebAssembly · Frontend Systems"
        title="AlgoVisualizer"
        subtitle="An interactive, fully client-side playground for understanding how classic ML algorithms actually work. Edit real Python in the browser and watch each training step unfold — centroids moving, boundaries warping, trees splitting — with no backend and no install."
        meta={[
          { label: "Role", value: "Author · sole engineer" },
          { label: "Stack", value: "React · TypeScript · Vite · Pyodide · D3" },
          { label: "Status", value: "Live on Vercel · MIT" },
          { label: "Repo", value: "AlgoVisualizer" },
        ]}
        primaryLink={{
          href: "https://algo-visualizer-beige.vercel.app",
          label: "Live demo",
        }}
        secondaryLink={{
          href: "https://github.com/dhruv-15-03/AlgoVisualizer",
          label: "GitHub",
        }}
      />

      {/* ------- OUTCOMES (lead) ------- */}
      <CaseSection id="outcomes" eyebrow="01" title="Outcomes">
        <div className="number-grid">
          <Number
            value="18"
            label="ML algorithms"
            sub="Across classification, regression, clustering & dimensionality reduction"
          />
          <Number
            value="100%"
            label="Runs in the browser"
            sub="Real CPython + NumPy compiled to WebAssembly (Pyodide) — no backend"
          />
          <Number
            value="~115 KB"
            label="Gzipped home route"
            sub="Route-split vendor chunks, subsetted fonts, idle prewarm"
          />
          <Number
            value="12"
            label="Built-in datasets"
            sub="Iris & Wine plus synthetic blobs, moons, circles, spirals, mixtures"
          />
        </div>
      </CaseSection>

      {/* ------- PROBLEM ------- */}
      <CaseSection id="problem" eyebrow="02" title="The problem I noticed">
        <p>
          ML is usually taught two ways: the equations on a whiteboard, and a
          one-line <code>model.fit()</code> in a library. Both hide the part
          that actually builds intuition —{" "}
          <strong>what a centroid does on each iteration, how a decision
          boundary forms, when a tree decides to split.</strong> Learners can
          recite the math and call the API, yet never see the mechanism move.
        </p>
        <p>
          The interesting engineering constraint was self-imposed: do this with{" "}
          <strong>zero backend</strong> — so it's free to host, private by
          default, and shareable with a single link — while running{" "}
          <strong>real Python, not a JavaScript reimplementation</strong> that
          would slowly drift from how the algorithms actually behave.
        </p>
      </CaseSection>

      {/* ------- ARCHITECTURE ------- */}
      <CaseSection id="architecture" eyebrow="03" title="Architecture">
        <p className="case-section-lead">
          The whole system pivots on one idea: every algorithm is a Python{" "}
          generator that <em>yields</em> typed trace events, and everything
          else — the worker, the store, the renderers — is plumbing around
          that stream.
        </p>
        <ul className="arch-list">
          <li>
            <strong>Real Python in a worker.</strong> Each algorithm is a small
            module exposing <code>run(X, y, **kwargs)</code> that yields plain
            dicts. It executes on <strong>Pyodide (CPython + NumPy → WASM)</strong>{" "}
            inside a <strong>Web Worker</strong>, so the heavy WASM never blocks
            the UI thread; the main thread talks to it over{" "}
            <strong>Comlink</strong> RPC.
          </li>
          <li>
            <strong>One trace-event contract.</strong> The entire Python↔UI
            boundary is a single TypeScript file. Every yielded dict is an
            event with a <code>type</code> (e.g. <code>kmeans:assign</code>), a
            step index, a plain-English <code>explanation</code>, and a LaTeX{" "}
            <code>math</code> expression, plus an algorithm-specific payload —
            streamed back as it's produced.
          </li>
          <li>
            <strong>Family-specific renderers.</strong> A VizRouter dispatches
            each event type to a D3/SVG renderer — scatter plots, decision-
            boundary contours, tree diagrams, loss curves. Adding an algorithm
            is "write a Python generator + a renderer," never a core rewrite.
          </li>
          <li>
            <strong>Editable &amp; reactive.</strong> A <strong>Monaco</strong>{" "}
            editor holds the real Python; edits debounce-re-run. Hyperparameter
            sliders patch the exact value in the source and re-run, with a sweep
            mode across a range. <strong>Zustand</strong> holds session and race
            state.
          </li>
          <li>
            <strong>Learning modes.</strong> Algorithm Race runs several
            algorithms side by side on one dataset; Quiz mode hides the
            explanation panel so you predict the next step before it animates.
          </li>
        </ul>
      </CaseSection>

      {/* ------- TRADE-OFFS ------- */}
      <CaseSection id="tradeoffs" eyebrow="04" title="Trade-offs I rejected">
        <div className="decision-grid">
          <Decision
            name="Compute location"
            picked="Real CPython + NumPy in the browser via Pyodide/WASM."
            rejected="A Python backend, or reimplementing each algorithm in JS."
            why="A backend means hosting cost, latency, and code that can't leave a server; a JS reimplementation would slowly diverge from how the real algorithms behave. Pyodide keeps exact Python semantics, $0 hosting, and total privacy."
          />
          <Decision
            name="UI responsiveness"
            picked="Pyodide in a Web Worker, streamed over Comlink."
            rejected="Running Python on the main thread."
            why="WASM execution is heavy and bursty; on the main thread it would freeze the UI mid-train. A worker keeps scrubbing, editing and animating smooth while Python runs."
          />
          <Decision
            name="Python ↔ UI boundary"
            picked="One typed trace-event contract (type · step · explanation · math · payload)."
            rejected="Per-algorithm bespoke wiring into each renderer."
            why="A single contract makes every algorithm pluggable and every visual reusable — extending the app is additive, and renderers never need to know which algorithm produced an event."
          />
          <Decision
            name="Visualization"
            picked="D3 + hand-rolled SVG (Recharts only for loss curves)."
            rejected="A heavyweight charting library for everything."
            why="Decision boundaries, tree splits and centroid motion aren't 'charts' — they need bespoke SVG. Hand-rolling keeps the bundle lean and the animations exactly on-message."
          />
        </div>
      </CaseSection>

      {/* ------- POSTMORTEM ------- */}
      <CaseSection id="postmortem" eyebrow="05" title="If I rebuilt it tomorrow">
        <ul className="post-list">
          <li>
            <strong>Trim the Pyodide first-load.</strong> The runtime is a
            ~10&nbsp;MB one-time download before the first run. I'd prefetch it
            on idle more aggressively and explore a slimmer NumPy build so the
            first algorithm feels instant, not "downloading."
          </li>
          <li>
            <strong>Persisted, shareable sessions.</strong> Edits live in
            memory. I'd serialize the code + dataset + hyperparameters into a
            shareable URL so a teacher can hand a student an exact starting
            state.
          </li>
          <li>
            <strong>More renderers, same contract.</strong> The trace-event
            design scales; the gap is breadth. Next would be a couple of
            sequence-model visualizers to stress whether the one-contract bet
            holds for time-series algorithms.
          </li>
        </ul>
      </CaseSection>

      {/* ------- STACK ------- */}
      <CaseSection id="stack" eyebrow="06" title="Stack">
        <div className="stack-row">
          {[
            "React 18",
            "TypeScript",
            "Vite 5",
            "Pyodide · WASM",
            "Web Workers · Comlink",
            "D3 · SVG",
            "Zustand",
            "Monaco",
            "KaTeX",
            "Tailwind",
          ].map((s) => (
            <span key={s} className="project-tag">{s}</span>
          ))}
        </div>
      </CaseSection>
    </CaseStudy>
  );
}

export default AlgoVisualizerCase;
