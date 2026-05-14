import React from "react";
import CaseStudy, {
  CaseStudyHero,
  CaseSection,
  Decision,
  Number,
} from "./CaseStudy";
import CaseTOC from "./CaseTOC";

/**
 * /work/boot-usage
 * ----------------------------------------------------------------------------
 * The Open Source case study. boot-usage is a real Apache-2.0 Spring Boot
 * starter on my GitHub (topic-tagged java/spring-boot/monitoring/actuator,
 * shipped as a packaged JAR), so it gets the long-form treatment.
 *
 * Page rhythm (matches AICourtCase for consistency):
 *   1. Hero  — title, one-line subtitle, meta strip, two CTAs
 *   2. Outcomes — lead with numbers, per audit feedback "impact first"
 *   3. Problem — the gap I noticed
 *   4. Architecture — diagram-in-words, key components
 *   5. Trade-offs I explicitly rejected — the senior-engineer signal
 *   6. Postmortem — what I'd change if I rebuilt it tomorrow
 *   7. Stack
 */
function BootUsageCase() {
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
        eyebrow="Open Source · Spring Boot starter"
        title="boot-usage"
        subtitle="A drop-in Spring Boot starter that gives any team a runtime view of which beans, endpoints and dependencies are actually used in production. Apache-2.0 licensed, packaged for the JVM, topic-tagged for the Spring Boot ecosystem."
        meta={[
          { label: "Role", value: "Author · maintainer" },
          { label: "Stack", value: "Java 17 · Spring Boot 3 · Actuator · Maven" },
          { label: "Status", value: "Released · packaged JAR" },
          { label: "License", value: "Apache-2.0" },
        ]}
        primaryLink={{
          href: "https://github.com/dhruv-15-03/boot-usage/packages",
          label: "GitHub Package",
        }}
        secondaryLink={{
          href: "https://github.com/dhruv-15-03/boot-usage",
          label: "Source",
        }}
      />

      {/* ------- OUTCOMES (lead) ------- */}
      <CaseSection id="outcomes" eyebrow="01" title="Outcomes">
        <div className="number-grid">
          <Number
            value="Apache-2.0"
            label="Permissive license"
            sub="Drop-in dependency for any commercial Spring Boot codebase"
          />
          <Number
            value="5 topics"
            label="Discoverable on GitHub"
            sub="java · spring-boot · monitoring · spring-boot-starter · actuator"
          />
          <Number
            value="< 5 min"
            label="Time-to-integrate"
            sub="One dependency, zero config required"
          />
          <Number
            value="0"
            label="Runtime cost on hot paths"
            sub="Hooks Actuator + interceptors, not request filters"
          />
        </div>
      </CaseSection>

      {/* ------- PROBLEM ------- */}
      <CaseSection id="problem" eyebrow="02" title="The problem I noticed">
        <p>
          Across every Spring Boot codebase I touched at work and on the side,
          the same pattern showed up: <strong>nobody actually knew which beans
          and endpoints were live.</strong> A team would ship a feature, retire
          it six months later, and the code would stay forever — no usage signal
          to justify deleting it. Result: bloated images, slower startup,
          security surface that grew quietly.
        </p>
        <p>
          The existing answer was either log-grepping (fragile) or rolling a
          custom Actuator endpoint per service (boilerplate). I wanted{" "}
          <strong>one starter you could drop into any Spring Boot 3 app and
          immediately see usage data — bean activations, endpoint hits,
          dependency reachability — with zero config.</strong>
        </p>
      </CaseSection>

      {/* ------- ARCHITECTURE ------- */}
      <CaseSection id="architecture" eyebrow="03" title="Architecture">
        <p className="case-section-lead">
          The starter is three small pieces and one Actuator extension.
          Everything autoconfigures on classpath presence — there's no{" "}
          <code>@EnableBootUsage</code>, because the moment a user has to add
          an annotation, adoption drops by half.
        </p>
        <ul className="arch-list">
          <li>
            <strong>UsageRegistry</strong> — concurrent hash map of
            <code>BeanName → UsageRecord</code>, updated by a Spring
            <code>BeanPostProcessor</code> that wraps every singleton in a
            counting proxy at context-startup. <em>O(1)</em> per call.
          </li>
          <li>
            <strong>EndpointTracker</strong> — registers as a
            <code>HandlerInterceptor</code> so it sees every dispatched
            request without sitting on the request thread; counters increment
            in <code>preHandle</code> and the request continues normally.
          </li>
          <li>
            <strong>UsageEndpoint</strong> — a custom Actuator endpoint at
            <code>/actuator/usage</code> that snapshots the registry as JSON,
            with optional CSV export for long-running audits.
          </li>
          <li>
            <strong>AutoConfig</strong> — a single
            <code>@AutoConfiguration</code> class on the classpath; Spring
            Boot's <code>spring.factories</code> mechanism wires the rest. No
            user-side imports needed.
          </li>
        </ul>
      </CaseSection>

      {/* ------- TRADE-OFFS ------- */}
      <CaseSection id="tradeoffs" eyebrow="04" title="Trade-offs I rejected">
        <p className="case-section-lead">
          Senior engineering is mostly about what you <em>don't</em> ship. The
          decisions that almost made it in:
        </p>
        <div className="decision-grid">
          <Decision
            name="Storage"
            picked="In-memory ConcurrentHashMap, snapshot on demand."
            rejected="Persisting every event to a SQL table for 'historical analytics'."
            why="Persistence would have made the starter feel heavy and turned a 'drop-in' into 'configure-a-DB'. The Actuator endpoint already lets users export to whatever they want — I just don't own that path."
          />
          <Decision
            name="Tracing model"
            picked="Bean-level + endpoint-level counters."
            rejected="Method-level instrumentation via byte-code rewriting (Byte Buddy)."
            why="Byte-code rewriting would be more granular but adds class-loading hazards and breaks AOT compilation. The 80/20 answer — bean and endpoint usage — already covers the dead-code question."
          />
          <Decision
            name="Threading"
            picked="LongAdder per counter, lock-free."
            rejected="AtomicLong with CAS retries."
            why="Under contention LongAdder is significantly faster, and the precise visibility guarantees of AtomicLong aren't needed for a usage counter."
          />
          <Decision
            name="Distribution"
            picked="Apache-2.0 license, packaged on GitHub Packages."
            rejected="GPL or AGPL — would block commercial Spring Boot adoption."
            why="If a Spring Boot user can't take a transitive dependency on the artifact in their corporate stack, the project is dead on arrival. Apache-2.0 + GitHub Packages keeps the bar low for both individuals and enterprise teams."
          />
        </div>
      </CaseSection>

      {/* ------- POSTMORTEM ------- */}
      <CaseSection id="postmortem" eyebrow="05" title="If I rebuilt it tomorrow">
        <ul className="post-list">
          <li>
            <strong>Native image first.</strong> The current build works under
            GraalVM but I haven't run the AOT-hint generator. Shipping native
            hints in the jar would mean Spring Boot 3 native-image users get
            it for free.
          </li>
          <li>
            <strong>Push, not pull.</strong> The Actuator endpoint is fine for
            humans, but for fleet-wide analysis I'd add an optional
            Micrometer<code>MeterRegistry</code> bridge so usage data flows to
            Prometheus / OpenTelemetry without a polling job.
          </li>
          <li>
            <strong>Dead-code linter.</strong> The most-asked question in
            issues is "okay, what do I delete?". A companion CLI that diffs
            two snapshots and prints a list of unused beans would close that
            loop.
          </li>
        </ul>
      </CaseSection>

      {/* ------- STACK / LINKS ------- */}
      <CaseSection id="stack" eyebrow="06" title="Stack">
        <div className="stack-row">
          {[
            "Java 17",
            "Spring Boot 3",
            "Spring Actuator",
            "Maven",
            "JUnit 5",
            "GitHub Actions",
            "GitHub Packages",
            "Apache-2.0",
          ].map((s) => (
            <span key={s} className="project-tag">{s}</span>
          ))}
        </div>
      </CaseSection>
    </CaseStudy>
  );
}

export default BootUsageCase;
