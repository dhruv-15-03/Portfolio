import React from "react";
import CaseStudy, {
  CaseStudyHero,
  CaseSection,
  Decision,
  Number,
} from "./CaseStudy";
import CaseTOC from "./CaseTOC";

/**
 * /work/ai-court
 * ----------------------------------------------------------------------------
 * The AI / full-stack case study. Same rhythm as boot-usage so the two read
 * as a *body of work*, not as one-offs.
 */
function AICourtCase() {
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
        eyebrow="AI · ML Engineering · MLOps · Full Stack"
        title="AI Legal Assistant"
        subtitle="A production ML service that predicts Indian legal case outcomes and retrieves relevant precedent — a scikit-learn classifier (91.8% accuracy, 0.83 macro-F1 over 10,838 labelled cases) wrapped in a real MLOps stack, behind a Java + React application shell."
        meta={[
          { label: "Role", value: "ML + full-stack · architect" },
          { label: "Stack", value: "Python · scikit-learn · SentenceTransformers · Flask · Java/Spring · React" },
          { label: "Status", value: "Live demo on Vercel · API on Render" },
          { label: "Repos", value: "AI-court-AI · AI-CourtRoom" },
        ]}
        primaryLink={{
          href: "https://ai-court-room-iota.vercel.app/",
          label: "Live demo",
        }}
        secondaryLink={{
          href: "https://github.com/dhruv-15-03/AI-CourtRoom",
          label: "GitHub",
        }}
      />

      {/* ------- OUTCOMES (lead) ------- */}
      <CaseSection id="outcomes" eyebrow="01" title="Outcomes">
        <div className="number-grid">
          <Number
            value="91.8%"
            label="Test-set accuracy"
            sub="Boosted random forest over TF-IDF features, 10,838 labelled cases"
          />
          <Number
            value="0.83"
            label="Macro-F1 across 3 classes"
            sub="6:1 class imbalance handled with SMOTE; per-class F1 up to 0.96"
          />
          <Number
            value="$0"
            label="Inference API cost"
            sub="Local extractive summarization + on-box features — no paid LLM in the hot path"
          />
          <Number
            value="512 MB"
            label="Production memory budget"
            sub="Ships on Render's free tier — gunicorn-tuned, Dockerized, drift-monitored"
          />
        </div>
      </CaseSection>

      {/* ------- PROBLEM ------- */}
      <CaseSection id="problem" eyebrow="02" title="The problem I noticed">
        <p>
          Talking to law students and junior associates, the same complaint
          kept coming back: <strong>finding the right precedent costs hours,
          and outcome estimates are pure intuition.</strong> Existing legal
          search products were keyword-driven and expensive; consumer LLMs
          would happily invent case names and confidently "predict" verdicts
          with no way to check the claim.
        </p>
        <p>
          The opportunity wasn't "make ChatGPT for lawyers." It was to build a
          system that <strong>predicts the likely outcome with a measurable,
          explainable model, retrieves real precedent to back it, and knows
          when to stay silent</strong> instead of guessing. The binding
          constraint made the engineering honest: a <strong>$0 budget on a
          512&nbsp;MB box</strong> — no paid LLM API, no managed vector
          database — which forced a lean classical-ML pipeline that has to earn
          every megabyte.
        </p>
      </CaseSection>

      {/* ------- ARCHITECTURE ------- */}
      <CaseSection id="architecture" eyebrow="03" title="Architecture">
        <p className="case-section-lead">
          A Python ML service (AI-court-AI) does the thinking; a separate
          Java + React app (AI-CourtRoom) is the product around it. The
          differentiator isn't a single model — it's the production
          scaffolding: abstention, explainability, drift monitoring, and a
          shadow model, all running inside a 512&nbsp;MB box.
        </p>
        <ul className="arch-list">
          <li>
            <strong>Data &amp; training (Python · offline).</strong> Indian
            judgments harvested and labelled into <strong>10,838 cases</strong>{" "}
            across three outcome classes, then turned into{" "}
            <strong>TF-IDF features fed to an AdaBoost-boosted random
            forest</strong>. A 6:1 class imbalance is countered with SMOTE.
            The artifact is serialized with <code>dill</code>, and every run
            writes <code>metrics.json</code> / <code>metadata.json</code> /
            <code>history.log</code> so each model has a paper trail.
          </li>
          <li>
            <strong>Prediction API (Flask).</strong> <code>/api/analyze</code>{" "}
            returns an outcome with a confidence score. Below a threshold it{" "}
            <strong>abstains</strong> — auto-queuing the case for human review
            (active learning) rather than guessing. Each response also ships
            the <strong>top TF-IDF features that drove the call</strong>, so
            the prediction is explainable instead of a black box.
          </li>
          <li>
            <strong>Precedent retrieval (RAG-style).</strong> An always-on{" "}
            lexical TF-IDF index with an <em>optional</em>{" "}
            SentenceTransformers (all-MiniLM-L6-v2) semantic index on top. The
            lexical path is the floor, so search <strong>degrades
            gracefully</strong> on the free tier where the semantic index is
            switched off to stay under 512&nbsp;MB.
          </li>
          <li>
            <strong>MLOps spine.</strong> Prometheus <code>/metrics</code>,
            drift endpoints that compare live class distributions against a
            committed baseline (with a drift history), ontology-aware
            hierarchical metrics, and a <strong>shadow "multi-axis"
            transformer</strong> running alongside the classifier for
            agreement monitoring. A model card and data sheet live next to the
            code.
          </li>
          <li>
            <strong>Application shell (separate repo).</strong> AI-CourtRoom is
            a React 19 + MUI + Tailwind front end over a{" "}
            <strong>Java 17 / Spring Boot 3 + JWT + MySQL</strong> backend, with
            multi-role auth (users / lawyers / judges) and WebSocket chat,
            calling the Python service for predictions.
          </li>
        </ul>
      </CaseSection>

      {/* ------- TRADE-OFFS ------- */}
      <CaseSection id="tradeoffs" eyebrow="04" title="Trade-offs I rejected">
        <div className="decision-grid">
          <Decision
            name="Model family"
            picked="A scikit-learn classifier (TF-IDF + boosted random forest) with confidence-based abstention."
            rejected="Prompting an LLM to 'predict the verdict'."
            why="A classifier gives a measurable accuracy / macro-F1 I can defend on a holdout, runs at $0 offline, and explains itself through its TF-IDF features. An LLM guess can't be scored or audited — exactly the wrong property for a legal-outcome claim."
          />
          <Decision
            name="Summarization"
            picked="Local extractive summarization, on-box."
            rejected="A paid LLM / hosted API (OpenAI, HuggingFace) generation step."
            why="The service had a hard $0 budget and a 512MB box. Local summarization keeps the demo free and private and removes a flaky network call from the request path."
          />
          <Decision
            name="Retrieval index"
            picked="Always-on lexical TF-IDF + an optional on-box semantic index."
            rejected="A managed vector database (Pinecone / Weaviate)."
            why="The corpus fits in memory, and a lexical floor means precedent search still works when the semantic index is disabled to fit the free tier. Graceful degradation beats a hard external dependency."
          />
          <Decision
            name="Release safety"
            picked="Versioned artifacts + drift monitoring + a shadow model."
            rejected="Retrain and redeploy by hand."
            why="A model is only trustworthy if a worse one can't quietly ship. Per-run metrics, a committed drift baseline, and a shadow comparison turn 'is this still good?' into something observable in production."
          />
        </div>
      </CaseSection>

      {/* ------- POSTMORTEM ------- */}
      <CaseSection id="postmortem" eyebrow="05" title="If I rebuilt it tomorrow">
        <ul className="post-list">
          <li>
            <strong>Temporal split, not random.</strong> 10,838 cases proves
            the pipeline, but a random holdout flatters the accuracy number.
            I'd switch to a time-based train/test split so the score reflects{" "}
            <em>future</em> cases and makes concept drift visible as the law
            moves.
          </li>
          <li>
            <strong>Calibrate the abstention threshold.</strong> Abstention
            runs off a hand-set confidence cut-off. I'd track calibration
            (reliability curves / ECE) so the threshold is principled, and
            report a coverage-vs-accuracy curve instead of a single headline
            number.
          </li>
          <li>
            <strong>Promote the shadow transformer properly.</strong> The
            multi-axis transformer already runs in shadow for agreement
            monitoring; the next step is an offline bake-off and, if it beats
            macro-F1 under the same governance gate, a controlled cutover.
          </li>
        </ul>
      </CaseSection>

      {/* ------- STACK ------- */}
      <CaseSection id="stack" eyebrow="06" title="Stack">
        <div className="stack-row">
          {[
            "Python 3.12",
            "scikit-learn",
            "SentenceTransformers",
            "Flask + Gunicorn",
            "Prometheus",
            "Docker · Render",
            "Java · Spring Boot",
            "React",
            "MySQL",
          ].map((s) => (
            <span key={s} className="project-tag">{s}</span>
          ))}
        </div>
      </CaseSection>
    </CaseStudy>
  );
}

export default AICourtCase;
