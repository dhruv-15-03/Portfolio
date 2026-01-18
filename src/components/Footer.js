import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row className="align-items-center">
        <Col md="4" className="footer-copywright">
          <h3 style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            gap: "8px"
          }}>
            Designed & Developed with 
            <AiFillHeart style={{ color: "#ff6b9d", animation: "heartBeat 1.5s infinite" }} /> 
            by <span style={{ color: "#00d4ff", fontWeight: "600" }}>Dhruv Rastogi</span>
          </h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3 style={{ 
            background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Copyright © {year} 
            <span style={{ 
              color: "#00d4ff",
              WebkitTextFillColor: "#00d4ff",
              marginLeft: "5px",
              fontWeight: "700"
            }}>DR</span>
          </h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons" style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0
          }}>
            <li className="social-icons">
              <a
                href="https://github.com/dhruv-15-03"
                style={{ 
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease"
                }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/dhruv-rastogi-3b744032b/"
                style={{ 
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease"
                }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/_.dhruv_.15"
                style={{ 
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease"
                }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.youtube.com/@dhruvrastogi4428"
                style={{ 
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.5em",
                  transition: "all 0.3s ease"
                }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillYoutube />
              </a>
            </li>
          </ul>
        </Col>
      </Row>

      <style>{`
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </Container>
  );
}

export default Footer;
