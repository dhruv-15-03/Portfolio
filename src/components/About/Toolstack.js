import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiIntellij } from "react-icons/di";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiLinux,
  SiRender,
  SiNetlify,
} from "react-icons/si";

const ToolIcon = ({ children, name, color }) => (
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

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px", gap: "10px" }}>
      <ToolIcon name="Linux" color="#fcc624"><SiLinux /></ToolIcon>
      <ToolIcon name="VS Code" color="#007acc"><SiVisualstudiocode /></ToolIcon>
      <ToolIcon name="Postman" color="#ff6c37"><SiPostman /></ToolIcon>
      <ToolIcon name="IntelliJ" color="#fe315d"><DiIntellij /></ToolIcon>
      <ToolIcon name="Vercel"><SiVercel /></ToolIcon>
      <ToolIcon name="Render" color="#46e3b7"><SiRender /></ToolIcon>
      <ToolIcon name="Netlify" color="#00c7b7"><SiNetlify /></ToolIcon>
    </Row>
  );
}

export default Toolstack;
