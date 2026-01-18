import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import verimed from "../../Assets/Projects/verimed-ai.jpeg";
import secure from "../../Assets/Projects/secure-step.jpeg";
import tax from "../../Assets/Projects/tax.jpeg";
import dhrLang from "../../Assets/Projects/DhrLang.webp"
import court from "../../Assets/Projects/court.jpeg";
import thoughts from "../../Assets/Projects/thoughts.png";
import aisum from "../../Assets/Projects/AI-summ.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        {/* Enhanced Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 className="project-heading" style={{ 
            display: "inline-block", 
            position: "relative",
            marginBottom: "20px"
          }}>
            My Recent <strong className="purple">Works</strong>
            <div style={{
              position: "absolute",
              bottom: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "4px",
              background: "linear-gradient(90deg, #00d4ff, #bf5af2, #ff6b9d)",
              borderRadius: "2px"
            }} />
          </h1>
          <p style={{ 
            color: "rgba(255, 255, 255, 0.8)", 
            fontSize: "1.2em",
            marginTop: "30px",
            maxWidth: "700px",
            margin: "30px auto 0",
            lineHeight: "1.7"
          }}>
            A showcase of my recent development work — from AI-powered healthcare platforms to intelligent legal assistants and custom compilers. 
            <span style={{ color: "#00d4ff" }}> Each project </span> 
            demonstrates my expertise in ML, full-stack development, and solving real-world problems.
          </p>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dhrLang}
              isBlog={false}
              title="🔧 DhrLang Compiler"
              description="A custom-built statically-typed JVM compiler developed from scratch in Java. Features include Generics support and efficient multi-dimensional arrays. Shipped with CLI tools, VS Code extension, and automated CI/CD pipeline using GitHub Actions with CodeQL, SpotBugs, and Checkstyle integration."
              ghLink="https://github.com/dhruv-15-03/Dhrlang"
              demoLink="https://github.com/dhruv-15-03/Dhrlang" 
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={thoughts}
              isBlog={false}
              title="💭 Thoughts - Social Hub"
              description="A modern social media platform combining visual storytelling with real-time conversations. Features seamless post sharing, user networking, trending content discovery, and an engaging community experience powered by cutting-edge web technologies."
              ghLink="https://github.com/dhruv-15-03/social"
              demoLink="https://dhr-social.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={court}
              isBlog={false}
              title="⚖️ AI Legal Assistant"
              description="An intelligent legal technology platform leveraging NLP and transformer models to predict case outcomes with 87% accuracy. Features semantic search, legal document analysis, and AI-powered insights for lawyers and clients."
              ghLink="https://github.com/dhruv-15-03/AI-CourtRoom"
              demoLink="https://ai-court-room-iota.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={secure}
              isBlog={false}
              title="🛡️ SecureStep Backend"
              description="Engineered the backend infrastructure for a traveler safety application featuring real-time GPS tracking, instant emergency alerts, and trusted assistance networks. Built with scalability and reliability as core priorities."
              ghLink="https://github.com/dhruv-15-03/SecureStep-Backend"
              demoLink="https://secure-step-nu.vercel.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={verimed}
              isBlog={false}
              title="🏥 VeriMed Healthcare AI"
              description="Developed the backend architecture and AI models for an intelligent healthcare platform using TensorFlow and Scikit-Learn. Features medical data analysis, disease risk prediction using ensemble methods, and AI-driven diagnostics delivering personalized health assessments."
              ghLink="https://github.com/dhruv-15-03/VeriMed-backend"
              demoLink="https://veri-med.vercel.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aisum}
              isBlog={false}
              title="📝 Smart AI Summarizer"
              description="An NLP-powered document summarization tool leveraging transformer models and extractive/abstractive techniques. Transforms lengthy meeting notes into concise, actionable summaries with customizable output and collaborative sharing for teams."
              ghLink="https://github.com/dhruv-15-03/AI-Summarizer"
              demoLink="https://ai-summarizer-three-gold.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tax}
              isBlog={false}
              title="💰 TaxView - ML Tax Planner"
              description="A machine learning-powered financial tool using Random Forest and XGBoost models to analyze income patterns, optimize deductions, and provide intelligent tax reduction strategies with up to 95% prediction accuracy."
              ghLink="https://github.com/dhruv-15-03/Tax"
              demoLink="https://tax-puce.vercel.app/" 
            />
          </Col>
          
        </Row>

        {/* Projects Stats */}
        <Row style={{ justifyContent: "center", marginTop: "50px", paddingBottom: "30px" }}>
          <Col md={10}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              flexWrap: "wrap",
              padding: "30px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ 
                  fontSize: "2.5em", 
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #00d4ff, #bf5af2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>7+</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>AI-Powered Projects</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ 
                  fontSize: "2.5em", 
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #bf5af2, #ff6b9d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>36+</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>Technologies & ML Models</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ 
                  fontSize: "2.5em", 
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #ff6b9d, #00ff88)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>5+</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>ML Models in Production</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
