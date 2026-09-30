import React from "react";
import { DiJava, DiPython, DiReact, DiMysql } from "react-icons/di";
import {
  SiSpringboot,
  SiFlask,
  SiTypescript,
  SiVuedotjs,
  SiDocker,
  SiKubernetes,
  SiMicrosoftazure,
  SiRedis,
  SiGithubactions,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

/**
 * TechMarquee — infinite horizontal logo strip under the hero.
 * ----------------------------------------------------------------------------
 * Why this works:
 *   - It instantly communicates *breadth* without forcing the user to scroll
 *     to the Techstack section. By the time they finish reading the headline,
 *     a Java + Spring + Azure + Python + ML ribbon has already scrolled
 *     past — the impression "this person works across the stack" is locked in
 *     before any conscious decision.
 *   - Pure CSS animation (translateX -50% loop) — zero JS, zero jank.
 *   - We render the list TWICE so the loop is seamless. The track width is
 *     2x; we animate -50% so the second copy starts exactly where the first
 *     began. No popping.
 *   - Edge fades on left/right are CSS masks → no extra DOM.
 */

const ITEMS = [
  { Icon: DiJava, label: "Java", color: "#f89820" },
  { Icon: SiSpringboot, label: "Spring Boot", color: "#6db33f" },
  { Icon: DiPython, label: "Python", color: "#3776ab" },
  { Icon: SiFlask, label: "Flask", color: "#e6e6e6" },
  { Icon: DiReact, label: "React", color: "#61dafb" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { Icon: SiVuedotjs, label: "Vue.js", color: "#42b883" },
  { Icon: DiMysql, label: "SQL · MySQL", color: "#00758f" },
  { Icon: SiRedis, label: "Redis", color: "#dc382d" },
  { Icon: SiMicrosoftazure, label: "Azure", color: "#0078d4" },
  { Icon: SiDocker, label: "Docker", color: "#2496ed" },
  { Icon: SiKubernetes, label: "Kubernetes", color: "#326ce5" },
  { Icon: SiGithubactions, label: "GitHub Actions", color: "#2088ff" },
  { Icon: FaRobot, label: "RAG · Multi-agent", color: "#bf5af2" },
];

function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Technologies I work with">
      <div className="tech-marquee-track">
        {[...ITEMS, ...ITEMS].map(({ Icon, label, color }, i) => (
          <div className="tech-marquee-item" key={`${label}-${i}`}>
            <Icon style={{ color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechMarquee;
