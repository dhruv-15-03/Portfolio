import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiIntellij } from "react-icons/di";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiLinux,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiApachemaven,
} from "react-icons/si";

/**
 * Toolstack
 * ----------------------------------------------------------------------------
 * The "what's open in your second monitor right now" list. Tools shown here
 * are the ones I genuinely live in every working day — IDE, version control,
 * the container/orchestrator/IaC trio, the CI runner, and the build tool I
 * publish OSS through.
 */
const ToolIcon = ({ children, name, color }) => (
  <Col xs={4} md={2} className="tech-icons" style={{ position: "relative" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span style={{ fontSize: "inherit", color: color || "inherit" }}>
        {children}
      </span>
      <span
        style={{
          fontSize: "0.2em",
          color: "rgba(255,255,255,0.7)",
          fontWeight: "500",
          letterSpacing: "0.5px",
        }}
      >
        {name}
      </span>
    </div>
  </Col>
);

function Toolstack() {
  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "50px",
        gap: "10px",
      }}
    >
      <ToolIcon name="IntelliJ" color="#fe315d"><DiIntellij /></ToolIcon>
      <ToolIcon name="VS Code" color="#007acc"><SiVisualstudiocode /></ToolIcon>
      <ToolIcon name="GitHub" color="#ffffff"><SiGithub /></ToolIcon>
      <ToolIcon name="GitHub Actions" color="#2088ff"><SiGithubactions /></ToolIcon>
      <ToolIcon name="Docker" color="#2496ed"><SiDocker /></ToolIcon>
      <ToolIcon name="Kubernetes" color="#326ce5"><SiKubernetes /></ToolIcon>
      <ToolIcon name="Terraform" color="#7b42bc"><SiTerraform /></ToolIcon>
      <ToolIcon name="Maven" color="#c71a36"><SiApachemaven /></ToolIcon>
      <ToolIcon name="Postman" color="#ff6c37"><SiPostman /></ToolIcon>
      <ToolIcon name="Linux" color="#fcc624"><SiLinux /></ToolIcon>
      <ToolIcon name="Vercel"><SiVercel /></ToolIcon>
    </Row>
  );
}

export default Toolstack;
