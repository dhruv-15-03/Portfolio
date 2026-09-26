import React from "react";
import { Container } from "react-bootstrap";
import { DiJava, DiPython, DiReact } from "react-icons/di";
import {
  SiSpringboot,
  SiFlask,
  SiTypescript,
  SiMicrosoftazure,
  SiDocker,
  SiGithubactions,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

/**
 * Techstack
 * ----------------------------------------------------------------------------
 * A plain list of the core skills that appear on the 1-page resume and can be
 * traced to shipped work (MAQ Software, RecruitCRM, CEERAS) or public repos.
 * No self-assessed percentages and no inflated technology counts.
 */
const SKILLS = [
  { name: "Java", icon: DiJava, color: "#ed8b00" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Python", icon: DiPython, color: "#3776ab" },
  { name: "Flask", icon: SiFlask, color: "#e6e6e6" },
  { name: "React", icon: DiReact, color: "#61dafb" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "SQL", icon: FaDatabase, color: "#4479a1" },
  { name: "Azure", icon: SiMicrosoftazure, color: "#0089d6" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Git / GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
];

function Techstack() {
  return (
    <Container style={{ marginTop: "30px", marginBottom: "40px" }}>
      <ul
        className="techstack-plain"
        aria-label="Core skills"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {SKILLS.map(({ name, icon: Icon, color }) => (
          <li
            key={name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 18px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              fontSize: "1em",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Icon aria-hidden="true" style={{ fontSize: "1.6em", color }} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Techstack;
