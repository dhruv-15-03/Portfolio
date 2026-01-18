import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiGithub,
  DiAws,
  DiMysql,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
  DiVisualstudio,
} from "react-icons/di";
import {
  SiDocker,
  SiKubernetes,
  SiFirebase,
  SiNextdotjs,
  SiPostgresql,
  SiSpringboot,
  SiGithubactions,
} from "react-icons/si";

const TechIcon = ({ children, name, color }) => (
  <Col xs={4} md={2} className="tech-icons" style={{ position: "relative" }}>
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      gap: "10px"
    }}>
      <span style={{ fontSize: "inherit", color: color || "inherit" }}>{children}</span>
      <span style={{ 
        fontSize: "0.2em", 
        color: "rgba(255,255,255,0.7)",
        fontWeight: "500",
        letterSpacing: "0.5px"
      }}>
        {name}
      </span>
    </div>
  </Col>
);

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px", gap: "10px" }}>
      <TechIcon name="Python" color="#3776ab"><DiPython /></TechIcon>
      <TechIcon name="Java" color="#ed8b00"><DiJava /></TechIcon>
      <TechIcon name="Spring" color="#6db33f"><SiSpringboot /></TechIcon>
      <TechIcon name="JavaScript" color="#f7df1e"><DiJavascript1 /></TechIcon>
      <TechIcon name="Node.js" color="#339933"><DiNodejs /></TechIcon>
      <TechIcon name="React" color="#61dafb"><DiReact /></TechIcon>
      <TechIcon name="Next.js"><SiNextdotjs /></TechIcon>
      <TechIcon name="MongoDB" color="#47a248"><DiMongodb /></TechIcon>
      <TechIcon name="PostgreSQL" color="#336791"><SiPostgresql /></TechIcon>
      <TechIcon name="MySQL" color="#4479a1"><DiMysql /></TechIcon>
      <TechIcon name="Git" color="#f05032"><DiGit /></TechIcon>
      <TechIcon name="GitHub"><DiGithub /></TechIcon>
      <TechIcon name="VS Code" color="#007acc"><DiVisualstudio /></TechIcon>
      <TechIcon name="Firebase" color="#ffca28"><SiFirebase /></TechIcon>
      <TechIcon name="AWS" color="#ff9900"><DiAws /></TechIcon>
      <TechIcon name="Docker" color="#2496ed"><SiDocker /></TechIcon>
      <TechIcon name="CI/CD" color="#2088ff"><SiGithubactions /></TechIcon>
      <TechIcon name="K8s" color="#326ce5"><SiKubernetes /></TechIcon>
    </Row>
  );
}

export default Techstack;
