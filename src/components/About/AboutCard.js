import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

/**
 * AboutCard
 * ----------------------------------------------------------------------------
 * Story-driven "About" — replaces the generic "I'm passionate about coding"
 * blurb with a real narrative arc:
 *   1. Where it started (curiosity → DSA → first compiler thoughts)
 *   2. Where it sharpened (production work, OSS publish, AI systems)
 *   3. Where it's going (founding-engineer / staff trajectory)
 *
 * Why three short beats? Recruiters skim. Each line is one fact + one outcome.
 */
function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify", lineHeight: "1.8", fontSize: "1.1em" }}>
            I'm <span className="purple" style={{ fontWeight: 600 }}>Dhruv Rastogi</span>,
            a Full Stack Engineer based in{" "}
            <span className="purple" style={{ fontWeight: 600 }}>Meerut, India</span>{" "}
            — currently shipping cloud-native data &amp; AI services full-time
            at <span className="purple" style={{ fontWeight: 600 }}>MAQ Software</span>{" "}
            while wrapping the final semester of{" "}
            <span className="purple" style={{ fontWeight: 600 }}>
              B.Tech CSE (AI Specialization), AKTU
            </span>{" "}
            (CGPA 8.5/10).
            <br />
            <br />
            <b className="purple">How I got here.</b> I started with DSA and
            JVM internals — that addiction turned into{" "}
            <i>DhrLang</i>, a statically-typed JVM language I built from lexer to
            bytecode (now at v3.0.0, with generics, multi-dim arrays, an LSP
            server and an EVM compiler target), and into <i>boot-usage</i>, an
            Apache-2.0 Spring-Boot Actuator starter (Java, GitHub Packages,
            topic-tagged for the Spring Boot ecosystem). Production work
            after that was the natural next step: REST APIs, RBAC, Redis,
            Kubernetes, Terraform, Azure Fabric. AI was layered on top — a
            scikit-learn outcome classifier, semantic retrieval and RAG-style
            search over real legal cases in <i>AI-Court</i>.
            <br />
            <br />
            Outside the editor:
          </p>

          <ul style={{ marginTop: 20 }}>
            <li className="about-activity about-activity-blue">
              <ImPointRight style={{ marginRight: 15, color: "#00d4ff" }} />
              <span>
                Solving algorithmic problems — <b>LeetCode Knight</b>, 1,000+
                solved 🏅
              </span>
            </li>
            <li className="about-activity about-activity-purple">
              <ImPointRight style={{ marginRight: 15, color: "#bf5af2" }} />
              <span>
                Reading distributed-systems and LLM papers (Designing
                Data-Intensive Applications is my bible) 📚
              </span>
            </li>
            <li className="about-activity about-activity-pink">
              <ImPointRight style={{ marginRight: 15, color: "#ff6b9d" }} />
              <span>
                <b>Teaching ML from scratch on YouTube</b> —
                first-principles, no hand-waving (
                <a
                  href="https://www.youtube.com/playlist?list=PLRKg0dTroUG95x_8KbiRTNXMYYNG1MQuz"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#ff6b9d", textDecoration: "underline" }}
                >
                  watch the playlist
                </a>
                ) 🎥
              </span>
            </li>
            <li className="about-activity about-activity-purple">
              <ImPointRight style={{ marginRight: 15, color: "#bf5af2" }} />
              <span>
                Maintaining open source on GitHub — issues
                always welcome 💻
              </span>
            </li>
            <li className="about-activity about-activity-green">
              <ImPointRight style={{ marginRight: 15, color: "#00ff88" }} />
              <span>
                Basketball &amp; long-form podcasts — the only two ways I
                actually unplug 🏀
              </span>
            </li>
          </ul>

          <p
            style={{
              color: "#00d4ff",
              marginTop: 30,
              padding: 20,
              background:
                "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(191, 90, 242, 0.1))",
              borderRadius: 15,
              border: "1px solid rgba(0, 212, 255, 0.2)",
              fontStyle: "italic",
              fontSize: "1.1em",
              textAlign: "center",
            }}
          >
            "I optimize for what survives Monday morning — not what looks good
            in a screenshot."
          </p>
          <footer
            className="blockquote-footer"
            style={{ marginTop: 15, textAlign: "right", fontSize: "1em" }}
          >
            Dhruv Rastogi
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
