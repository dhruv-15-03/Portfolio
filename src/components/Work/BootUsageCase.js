import React from "react";
import CaseStudy, {
  CaseStudyHero,
  CaseSection,
  Decision,
  Number,
} from "./CaseStudy";
import CaseTOC from "./CaseTOC";
import Seo from "../Seo";

/**
 * /work/boot-usage
 * ----------------------------------------------------------------------------
 * The Open Source case study. boot-usage is an Apache-2.0 Spring Boot starter
 * on my GitHub (github.com/dhruv-15-03/boot-usage), distributed via JitPack.
 * Every class name and property on this page exists in the repository; if
 * the code changes, this page must change with it.
 *
 * Page rhythm (matches AICourtCase for consistency):
 *   1. Hero  — title, one-line subtitle, meta strip, two CTAs
 *   2. Outcomes — what ships today, no invented numbers
 *   3. Problem — the gap I noticed
 *   4. Architecture — the real classes and how they connect
 *   5. Trade-offs — what I picked and what I rejected
 *   6. Postmortem — what I'd change if I rebuilt it tomorrow
 *   7. Stack
 */
function BootUsageCase() {
  return (
    <CaseStudy>
      <Seo
        title="boot-usage — Spring Boot starter-usage analyzer · Dhruv Rastogi"
        description="Case study: boot-usage is an opt-in, Apache-2.0 Spring Boot 3 starter that classifies each declared starter as used, unused or indeterminate and exposes the report at /actuator/bootusage. Distributed via JitPack."
        path="/work/boot-usage"
      />
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
        subtitle="An opt-in Spring Boot 3 starter that tells you which of your declared starters are actually doing work. It reads Spring Boot's own auto-configuration condition report, classifies each starter as used, unused or indeterminate, and serves the result at /actuator/bootusage."
        meta={[
          { label: "Role", value: "Author · maintainer" },
          { label: "Stack", value: "Java 21 · Spring Boot 3.3.5 · Actuator · Gradle" },
          { label: "Status", value: "v1.0.3 on JitPack" },
          { label: "License", value: "Apache-2.0" },
        ]}
        primaryLink={{
          href: "https://jitpack.io/#dhruv-15-03/boot-usage",
          label: "JitPack",
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
            value="Opt-in"
            label="Off by default"
            sub="Nothing runs until spring.boot.usage.report.enabled=true"
          />
          <Number
            value="3 states"
            label="Per-starter verdict"
            sub="used · unused · indeterminate, from the condition report"
          />
          <Number
            value="JSON + MD"
            label="Report formats"
            sub="Actuator endpoint, plus bootusage.json / bootusage.md on startup"
          />
          <Number
            value="3 suites"
            label="Integration tests"
            sub="Endpoint, policies and report persistence, run in CI on JDK 21"
          />
        </div>
      </CaseSection>

      {/* ------- PROBLEM ------- */}
      <CaseSection id="problem" eyebrow="02" title="The problem I noticed">
        <p>
          Spring Boot projects accumulate starters. Someone adds{" "}
          <code>spring-boot-starter-data-redis</code> for a spike, the spike
          is dropped, and the starter stays on the classpath. Each one pulls in
          transitive jars and auto-configuration candidates, and nobody is sure
          whether it is safe to remove.
        </p>
        <p>
          Spring Boot already knows the answer internally: its{" "}
          <code>ConditionEvaluationReport</code> records which
          auto-configurations matched. <code>/actuator/conditions</code>{" "}
          exposes that report per auto-configuration class, but not per
          starter. I wanted <strong>one report, keyed by the starters in your
          build, that says which of them actually contributed something.</strong>
        </p>
      </CaseSection>

      {/* ------- ARCHITECTURE ------- */}
      <CaseSection id="architecture" eyebrow="03" title="Architecture">
        <p className="case-section-lead">
          Two auto-configurations, registered through{" "}
          <code>META-INF/spring/…AutoConfiguration.imports</code>. The
          analysis side is gated behind a property. The endpoint side only
          activates when Actuator is on the classpath and the report service
          exists.
        </p>
        <ul className="arch-list">
          <li>
            <strong>UsageAnalysisAutoConfiguration</strong>: active only when{" "}
            <code>spring.boot.usage.report.enabled=true</code>. It wires the
            analyzer, the report service, the policy enforcer and the report
            writer.
          </li>
          <li>
            <strong>BeanOriginTrackingPostProcessor</strong>: a{" "}
            <code>BeanPostProcessor</code> that records which jar each
            application bean was loaded from (via the class's{" "}
            <code>ProtectionDomain</code> code source) in a{" "}
            <code>ConcurrentHashMap</code>. It skips framework and JDK
            packages and CGLIB proxies.
          </li>
          <li>
            <strong>StarterUsageAnalyzer</strong>: finds declared starters from
            jar manifests and <code>pom.properties</code>, then checks each one
            against the <code>ConditionEvaluationReport</code> using a mapping
            from starter to its auto-configurations. Starters it has no mapping
            for fall back to a keyword heuristic and can come out as{" "}
            <em>indeterminate</em> rather than a false "unused".
          </li>
          <li>
            <strong>UsageReportService</strong>: builds the report in a{" "}
            <code>synchronized</code> method with a volatile cache and an
            optional <code>cache-ttl</code>. It applies any{" "}
            <code>UsageReportCustomizer</code> beans, so teams can add their
            own metadata.
          </li>
          <li>
            <strong>UsagePolicy / UsagePolicyEnforcer</strong>: an SPI for
            rules such as "no DevTools in prod". Policies return violations or
            warnings. With <code>policies-fail-on-violation=true</code> the
            enforcer throws <code>UsagePolicyViolationException</code> and
            startup fails.
          </li>
          <li>
            <strong>UsageReportPersistence</strong>: on{" "}
            <code>ApplicationReadyEvent</code> it writes{" "}
            <code>bootusage.json</code> (and <code>bootusage.md</code> when{" "}
            <code>markdown-summary=true</code>) to <code>output-dir</code>,
            default <code>build/boot-usage</code>.
          </li>
          <li>
            <strong>UsageEndpoint</strong>: an Actuator{" "}
            <code>@Endpoint(id = "bootusage")</code> with a read operation at{" "}
            <code>/actuator/bootusage</code>; <code>?force=true</code>{" "}
            bypasses the cache. It is registered by{" "}
            <code>UsageEndpointAutoConfiguration</code> and has to be exposed
            like any other endpoint (
            <code>management.endpoints.web.exposure.include=bootusage</code>).
          </li>
        </ul>
      </CaseSection>

      {/* ------- TRADE-OFFS ------- */}
      <CaseSection id="tradeoffs" eyebrow="04" title="Trade-offs I made">
        <p className="case-section-lead">
          The design choices in the current code, and the alternatives I
          decided against:
        </p>
        <div className="decision-grid">
          <Decision
            name="Activation"
            picked="Off by default; one property turns it on."
            rejected="Auto-activating on classpath presence."
            why="Analysis reads the condition report and scans jars at startup. That cost should be a deliberate choice, typically in CI or a staging profile, not a surprise in production."
          />
          <Decision
            name="Signal source"
            picked="Spring Boot's own ConditionEvaluationReport, mapped to starters."
            rejected="Runtime request or bean-call counters."
            why="The question is 'which starters contribute auto-configuration?'. Spring Boot already records that deterministically at startup. Runtime counters would add hot-path overhead and still wouldn't map cleanly back to starters."
          />
          <Decision
            name="Uncertainty"
            picked="A third 'indeterminate' state."
            rejected="Forcing every starter into used or unused."
            why="For starters without a known mapping, a confident 'unused' could lead someone to delete a dependency they need. Saying 'indeterminate' is more useful than a wrong answer."
          />
          <Decision
            name="Enforcement"
            picked="Pluggable UsagePolicy SPI; failing startup is opt-in."
            rejected="Hard-coded rules that always fail the build."
            why="Teams disagree on what counts as a violation. The SPI lets each team encode its own rules, and policies-fail-on-violation decides whether a violation blocks startup or is only reported."
          />
          <Decision
            name="Distribution"
            picked="Apache-2.0, built from Git tags on JitPack."
            rejected="A copyleft license, or a registry that needs credentials to consume."
            why="A starter only gets adopted if a company can add it as a normal dependency. Apache-2.0 plus JitPack means one repository line and one coordinate: com.github.dhruv-15-03:boot-usage:v1.0.3."
          />
        </div>
      </CaseSection>

      {/* ------- POSTMORTEM ------- */}
      <CaseSection id="postmortem" eyebrow="05" title="If I rebuilt it tomorrow">
        <ul className="post-list">
          <li>
            <strong>Make the starter mapping data-driven.</strong> The
            starter-to-auto-configuration map lives in code, and unknown
            starters fall back to a keyword heuristic. Generating that map from
            Spring Boot's own metadata would cut the number of indeterminate
            results.
          </li>
          <li>
            <strong>Native image hints.</strong> I haven't generated or tested
            AOT runtime hints. Shipping them would make the starter safe for
            Spring Boot native-image builds.
          </li>
          <li>
            <strong>Push, not only pull.</strong> The endpoint and report files
            are fine for one service. For a fleet, an optional Micrometer
            bridge would let the used / unused counts flow into existing
            dashboards.
          </li>
        </ul>
      </CaseSection>

      {/* ------- STACK / LINKS ------- */}
      <CaseSection id="stack" eyebrow="06" title="Stack">
        <div className="stack-row">
          {[
            "Java 21",
            "Spring Boot 3.3.5",
            "Spring Boot Actuator",
            "Gradle (java-library)",
            "JUnit 5",
            "GitHub Actions",
            "JitPack",
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