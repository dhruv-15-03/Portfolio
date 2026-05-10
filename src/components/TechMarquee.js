import React from "react";
import {
  DiJava,
  DiPython,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiMysql,
  DiAws,
} from "react-icons/di";
import {
  SiSpringboot,
  SiTypescript,
  SiDocker,
  SiKubernetes,
  SiMicrosoftazure,
  SiPostgresql,
  SiRedis,
  SiTerraform,
  SiNextdotjs,
  SiTailwindcss,
  SiOpenai,
  SiApachemaven,
  SiTensorflow,
  SiPytorch,
  SiGithubactions,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

/**
 * TechMarquee — infinite horizontal logo strip under the hero.
 * ----------------------------------------------------------------------------
 * Why this works:
 *   - It instantly communicates *breadth* without forcing the user to scroll
 *     to the Techstack section. By the time they finish reading the headline,
 *     a Java + Spring + Azure + Python + LangChain ribbon has already scrolled
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
  { Icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { Icon: DiReact, label: "React", color: "#61dafb" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { Icon: DiNodejs, label: "Node.js", color: "#8cc84b" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
  { Icon: SiMicrosoftazure, label: "Azure", color: "#0078d4" },
  { Icon: DiAws, label: "AWS", color: "#ff9900" },
  { Icon: SiDocker, label: "Docker", color: "#2496ed" },
  { Icon: SiKubernetes, label: "Kubernetes", color: "#326ce5" },
  { Icon: SiTerraform, label: "Terraform", color: "#7c3aed" },
  { Icon: SiGithubactions, label: "GitHub Actions", color: "#2088ff" },
  { Icon: SiPostgresql, label: "Postgres", color: "#336791" },
  { Icon: DiMysql, label: "MySQL", color: "#00758f" },
  { Icon: DiMongodb, label: "MongoDB", color: "#47a248" },
  { Icon: SiRedis, label: "Redis", color: "#dc382d" },
  { Icon: SiOpenai, label: "OpenAI", color: "#ffffff" },
  { Icon: FaRobot, label: "LangChain · RAG", color: "#bf5af2" },
  { Icon: SiTensorflow, label: "TensorFlow", color: "#ff6f00" },
  { Icon: SiPytorch, label: "PyTorch", color: "#ee4c2c" },
  { Icon: SiApachemaven, label: "Maven Central", color: "#c71a36" },
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
