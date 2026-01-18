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
            a passionate software developer based in <span className="purple" style={{ fontWeight: "600" }}>Meerut, India.</span>
            <br /><br />
            Currently pursuing <span className="purple" style={{ fontWeight: "600" }}>B.Tech in Computer Science & Engineering (AI)</span> from MIET, Meerut, I'm dedicated to transforming ideas into impactful digital solutions.
            <br /><br />
            When I'm not immersed in code, you'll find me:
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
              <span>Staying active with Basketball 🏀</span>
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
              <span>Exploring emerging technologies 📚</span>
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
              <span>Discovering new places & cultures ✈️</span>
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
            "Code is poetry — I write solutions that make a lasting impact." ✨
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
