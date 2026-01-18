import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify", lineHeight: "1.8", fontSize: "1.1em" }}>
            Hello! I'm <span className="purple" style={{ fontWeight: "600" }}>Dhruv Rastogi</span>,
            a passionate AI/ML engineer and full-stack developer based in <span className="purple" style={{ fontWeight: "600" }}>Meerut, India.</span>
            <br /><br />
            Currently pursuing <span className="purple" style={{ fontWeight: "600" }}>B.Tech in Computer Science & Engineering (AI)</span> from MIET, Meerut, I specialize in building intelligent systems — from deep learning models to production-ready AI applications.
            <br /><br />
            When I'm not training models or architecting solutions, you'll find me:
          </p>
          <ul style={{ marginTop: "20px" }}>
            <li className="about-activity" style={{ 
              display: "flex", 
              alignItems: "center", 
              padding: "12px 15px",
              margin: "10px 0",
              background: "rgba(0, 212, 255, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(0, 212, 255, 0.1)",
              transition: "all 0.3s ease"
            }}>
              <ImPointRight style={{ marginRight: "15px", color: "#00d4ff" }} /> 
              <span>Fine-tuning LLMs & experimenting with GenAI 🤖</span>
            </li>
            <li className="about-activity" style={{ 
              display: "flex", 
              alignItems: "center", 
              padding: "12px 15px",
              margin: "10px 0",
              background: "rgba(191, 90, 242, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(191, 90, 242, 0.1)",
              transition: "all 0.3s ease"
            }}>
              <ImPointRight style={{ marginRight: "15px", color: "#bf5af2" }} /> 
              <span>Reading ML research papers & staying updated 📚</span>
            </li>
            <li className="about-activity" style={{ 
              display: "flex", 
              alignItems: "center", 
              padding: "12px 15px",
              margin: "10px 0",
              background: "rgba(255, 107, 157, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 107, 157, 0.1)",
              transition: "all 0.3s ease"
            }}>
              <ImPointRight style={{ marginRight: "15px", color: "#ff6b9d" }} /> 
              <span>Contributing to open-source AI projects 💻</span>
            </li>
            <li className="about-activity" style={{ 
              display: "flex", 
              alignItems: "center", 
              padding: "12px 15px",
              margin: "10px 0",
              background: "rgba(0, 255, 136, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(0, 255, 136, 0.1)",
              transition: "all 0.3s ease"
            }}>
              <ImPointRight style={{ marginRight: "15px", color: "#00ff88" }} /> 
              <span>Playing basketball to stay active 🏀</span>
            </li>
          </ul>

          <p style={{ 
            color: "#00d4ff", 
            marginTop: "30px",
            padding: "20px",
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(191, 90, 242, 0.1))",
            borderRadius: "15px",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            fontStyle: "italic",
            fontSize: "1.1em",
            textAlign: "center"
          }}>
            "Building the future, one intelligent algorithm at a time." 
          </p>
          <footer className="blockquote-footer" style={{ 
            marginTop: "15px",
            textAlign: "right",
            fontSize: "1em"
          }}>
            Dhruv Rastogi
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
