import React from "react";
import CaseStudy, {
  CaseStudyHero,
  CaseSection,
  Decision,
  Number,
} from "./CaseStudy";

/**
 * /work/ai-court
 * ----------------------------------------------------------------------------
 * The AI / full-stack case study. Same rhythm as boot-usage so the two read
 * as a *body of work*, not as one-offs.
 */
function AICourtCase() {
  return (
    <CaseStudy>
      <CaseStudyHero
        eyebrow="AI · Full Stack · LLM Systems"
        title="AI Legal Assistant"
        subtitle="A retrieval-augmented LLM platform that helps lawyers and clients reason over case law — semantic search, multi-step LangChain reasoning, and a Spring Boot + React shell that runs the whole thing."
        meta={[
          { label: "Role", value: "Full-stack · architect" },
          { label: "Stack", value: "Python · LangChain · Vector search · Spring Boot · React" },
          { label: "Status", value: "Live demo · academic deployment" },
          { label: "Eval", value: "~87% on internal evaluation set" },
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
            value="~87%"
            label="Outcome-prediction accuracy"
            sub="On internal evaluation subset of labeled judgments"
          />
          <Number
            value="< 1.5s"
            label="Target retrieval latency"
            sub="Top-k semantic results from the vector store"
          />
          <Number
            value="5K+"
            label="Designed concurrent capacity"
            sub="Stateless API + async worker pool architecture"
          />
          <Number
            value="3 layers"
            label="LLM safety stack"
            sub="Retrieval grounding · prompt validation · output schema"
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
          would happily invent case names that didn't exist.
        </p>
        <p>
          The opportunity wasn't "make ChatGPT for lawyers" — it was{" "}
          <strong>build a system where every claim the LLM makes is
          grounded in a retrievable source, and where the user never sees
          ungrounded output.</strong> A RAG architecture, but with the safety
          guarantees pushed up into the API.
        </p>
      </CaseSection>

      {/* ------- ARCHITECTURE ------- */}
      <CaseSection id="architecture" eyebrow="03" title="Architecture">
        <p className="case-section-lead">
          Three independently scalable services. The backbone is a classic
          RAG pipeline; the differentiator is everything around it — safety,
          schema validation, and a non-LangChain fallback path so the system
          stays useful even if the LLM provider is down.
        </p>
        <ul className="arch-list">
          <li>
            <strong>Ingestion (Python · offline).</strong> PDFs and judgment
            HTML are chunked with a sentence-aware splitter (target ~512
            tokens, overlap 64), embedded with an OpenAI embedding model, and
            stored in a vector index alongside metadata (court, year, parties,
            cite-string) so retrieval can pre-filter cheaply.
          </li>
          <li>
            <strong>Retrieval API (Spring Boot).</strong> The user-facing
            REST surface. Auth, rate-limit, feature flags, and a
            <code>/search</code> endpoint that wraps a top-k vector query
            with optional metadata filters. Stateless — scales horizontally.
          </li>
          <li>
            <strong>Reasoning workers (Python · LangChain).</strong>{" "}
            Multi-step chain: retrieve → rerank → cite-check → structured
            output. The chain is fronted by a circuit breaker; if the LLM
            fails, the API still returns the raw top-k results so users get
            *something* useful instead of a hard error.
          </li>
          <li>
            <strong>UI (React).</strong> Chat-like interface with{" "}
            <em>every</em> generated sentence carrying an inline source
            citation. If the system can't ground a claim, it visibly says so
            instead of hallucinating.
          </li>
        </ul>
      </CaseSection>

      {/* ------- TRADE-OFFS ------- */}
      <CaseSection id="tradeoffs" eyebrow="04" title="Trade-offs I rejected">
        <div className="decision-grid">
          <Decision
            name="Vector store"
            picked="Postgres-based vector index, sharing the row with metadata."
            rejected="A managed vector DB (Pinecone / Weaviate)."
            why="The corpus was small enough that a managed vector DB was overkill, and a Postgres-side index lets the same row carry both metadata filters and the embedding — one query, one operational story."
          />
          <Decision
            name="Re-ranking"
            picked="A lightweight re-rank pass on top-k semantic results."
            rejected="Pure cosine top-k."
            why="Cosine over chunk embeddings has a well-known precision floor on long documents; a small rerank step measurably improved the perceived quality on hand-graded queries for low extra latency."
          />
          <Decision
            name="Output discipline"
            picked="Schema-validated structured output, retry on parse fail."
            rejected="Free-form LLM text."
            why="Structured output makes the UI deterministic to render and lets a citation-checker verify each claim. Free-form output would have made the inline-citation UX impossible."
          />
          <Decision
            name="Hosting"
            picked="Stateless API + async worker pool."
            rejected="Single monolith embedding LangChain in the request thread."
            why="LangChain calls are slow and bursty. Putting them on the request thread would have made p95 latency unbounded and tied the API's autoscaling to the LLM provider's rate limits."
          />
        </div>
      </CaseSection>

      {/* ------- POSTMORTEM ------- */}
      <CaseSection id="postmortem" eyebrow="05" title="If I rebuilt it tomorrow">
        <ul className="post-list">
          <li>
            <strong>Eval as a first-class artifact.</strong> The 87% number
            was a one-shot evaluation on a labeled holdout. I'd build a
            continuous eval harness (golden set + LLM-judged regression
            tests) that runs on every prompt change, so accuracy claims have
            a date and a commit attached.
          </li>
          <li>
            <strong>Drop LangChain for the production path.</strong> It was
            invaluable for prototyping; in production it's an extra
            abstraction layer between me and the model. A 200-line
            orchestration file would be easier to debug.
          </li>
          <li>
            <strong>Per-tenant grounding scope.</strong> Right now retrieval
            scope is global. A multi-tenant version (firm A only sees firm
            A's documents) would mean carrying a tenant-id into the
            embedding query and rebuilding the metadata index.
          </li>
        </ul>
      </CaseSection>

      {/* ------- STACK ------- */}
      <CaseSection id="stack" eyebrow="06" title="Stack">
        <div className="stack-row">
          {[
            "Python 3.11",
            "LangChain",
            "OpenAI (embeddings + chat)",
            "Postgres (vector index)",
            "Spring Boot 3",
            "React 18",
            "Vercel (UI)",
          ].map((s) => (
            <span key={s} className="project-tag">{s}</span>
          ))}
        </div>
      </CaseSection>
    </CaseStudy>
  );
}

export default AICourtCase;
