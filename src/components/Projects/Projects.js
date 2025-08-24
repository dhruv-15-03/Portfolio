import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import verimed from "../../Assets/Projects/verimed-ai.jpeg";
import secure from "../../Assets/Projects/secure-step.jpeg";
import tax from "../../Assets/Projects/tax.jpeg";
import court from "../../Assets/Projects/court.jpeg";
import thoughts from "../../Assets/Projects/thoughts.png";
import aisum from "../../Assets/Projects/ai-summarizer.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={thoughts}
              isBlog={false}
              title="Thoughts"
              description="Thoughts is a social media platform blending Instagram’s visual storytelling with Twitter’s real-time conversations. Share posts, connect with others, explore trending ideas, and express your thoughts in a vibrant, interactive community."
              ghLink="https://github.com/dhruv-15-03/social"
              demoLink="https://dhr-social.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={court}
              isBlog={false}
              title="AI-Courtroom"
              description="AI Courtroom is a smart legal assistant that predicts case outcomes, offers legal insights, and connects users with lawyers and judges—bringing intelligence, transparency, and efficiency to modern legal processes."
              ghLink="https://github.com/dhruv-15-03/AI-CourtRoom"
              demoLink="https://ai-court-room-iota.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={secure}
              isBlog={false}
              title="Secure-Step"
              description="Designed Backed of SecureStep which ensures traveler safety through real-time tracking, emergency alerts, and trusted assistance, providing peace of mind for journeys worldwide with smart, reliable, and user-friendly security features."
              ghLink="https://github.com/dhruv-15-03/SecureStep-Backend"
              demoLink="https://secure-step-nu.vercel.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={verimed}
              isBlog={false}
              title="VeriMed AI"
              description="Developed backend and AI Model of VeriMed is an intelligent healthcare platform that analyzes medical data, predicts disease risks, and provides actionable insights using AI-driven diagnostics, ensuring accurate, timely, and personalized health assessments for better patient care."
              ghLink="https://github.com/dhruv-15-03/VeriMed-backend"
              demoLink="https://veri-med.vercel.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aisum}
              isBlog={false}
              title="AI-Summarizer"
              description="AI-Summarizer is an advanced tool that leverages AI to condense lengthy meeting notes into concise summaries as demanded by the users, after that they can send that summarize document upto 5 users in total, making information consumption faster and more efficient."
              ghLink="https://github.com/dhruv-15-03/AI-Summarizer"
              demoLink="https://ai-summarizer-three-gold.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tax}
              isBlog={false}
              title="Tax Management System"
              description="TaxView uses machine learning to analyze your finances, optimize deductions, and suggest ways to reduce taxes while simplifying filing, ensuring compliance, and giving you smarter control over your tax planning."
              ghLink="https://github.com/dhruv-15-03/Tax"
              demoLink="https://tax-puce.vercel.app/" 
            />
          </Col>

          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
