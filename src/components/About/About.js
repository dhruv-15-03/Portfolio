import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.jpg";
import Tilt from "react-parallax-tilt";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ 
              fontSize: "2.5em", 
              paddingBottom: "20px",
              fontWeight: "800",
              letterSpacing: "2px"
            }}>
              Get To <strong className="purple">Know Me</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "80px", paddingBottom: "50px" }}
            className="about-img"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
            >
              <div style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden"
              }}>
                {/* Gradient Glow */}
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "conic-gradient(from 0deg, #00d4ff, #bf5af2, #ff6b9d, #00ff88, #00d4ff)",
                  animation: "rotate 4s linear infinite",
                  opacity: "0.3"
                }} />
                <img 
                  src={laptopImg} 
                  alt="about" 
                  className="img-fluid"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "20px",
                    border: "3px solid rgba(255,255,255,0.1)"
                  }}
                />
              </div>
            </Tilt>
          </Col>
        </Row>

        {/* Skills Section with Enhanced Heading */}
        <div style={{ textAlign: "center", marginTop: "60px", marginBottom: "20px" }}>
          <h1 className="project-heading" style={{ 
            display: "inline-block", 
            position: "relative",
            fontSize: "2.8em",
            fontWeight: "800",
            letterSpacing: "2px"
          }}>
            Technical <strong className="purple">Arsenal</strong>
            <div style={{
              position: "absolute",
              bottom: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "150px",
              height: "4px",
              background: "linear-gradient(90deg, #00d4ff, #bf5af2, #ff6b9d)",
              borderRadius: "2px"
            }} />
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "1.1em",
            marginTop: "30px",
            maxWidth: "700px",
            margin: "30px auto 0",
            lineHeight: "1.7"
          }}>
            A comprehensive toolkit spanning AI/ML, full-stack development, and cloud infrastructure — 
            refined through hands-on experience building intelligent systems.
            <span style={{ color: "#00d4ff" }}> Hover over each skill </span> 
            to explore proficiency levels.
          </p>
        </div>

        <Techstack />

        <Github />
      </Container>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default About;
