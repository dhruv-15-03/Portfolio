import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";

import { AiOutlineDownload } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";

const pdfDownloadLink = "https://drive.google.com/uc?export=view&id=1guFP3iu4OXYwPOdaXCAN5qy1OvnT7H7n";
const pdfPreviewLink = "https://drive.google.com/file/d/1guFP3iu4OXYwPOdaXCAN5qy1OvnT7H7n/preview";

function ResumeNew() {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ 
            fontSize: "2.8em", 
            fontWeight: "800",
            marginBottom: "15px",
            display: "inline-block",
            position: "relative"
          }}>
            <HiDocumentText style={{ marginRight: "15px", color: "#00d4ff" }} />
            My <span className="purple">Resume</span>
            <div style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "4px",
              background: "linear-gradient(90deg, #00d4ff, #bf5af2)",
              borderRadius: "2px"
            }} />
          </h1>
          <p style={{ 
            color: "rgba(255, 255, 255, 0.7)", 
            fontSize: "1.1em",
            marginTop: "25px"
          }}>
            Download my resume or view it below
          </p>
        </div>

        <Row style={{ justifyContent: "center", position: "relative", marginBottom: "30px" }}>
          <Col md={6} style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <Button
              variant="primary"
              href={pdfDownloadLink}
              target="_blank"
              style={{ 
                padding: "15px 35px",
                fontSize: "1.1em",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #00d4ff, #bf5af2)",
                border: "none",
                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)"
              }}
            >
              <AiOutlineDownload style={{ fontSize: "1.4em" }} />
              Download CV
            </Button>
          </Col>
        </Row>

        {/* Resume Preview Container */}
        <Row className="resume" style={{ justifyContent: "center" }}>
          <Col md={10} lg={8}>
            <div style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              {/* Decorative gradient top bar */}
              <div style={{
                height: "4px",
                background: "linear-gradient(90deg, #00d4ff, #bf5af2, #ff6b9d, #00ff88)",
                backgroundSize: "300% 100%",
                animation: "gradientMove 3s ease infinite"
              }} />
              <iframe
                src={pdfPreviewLink}
                title="resume"
                width="100%"
                height="1200px"
                style={{ 
                  border: "none", 
                  overflow: "hidden",
                  display: "block"
                }}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "40px" }}>
          <Button
            variant="primary"
            href={pdfDownloadLink}
            target="_blank"
            style={{ 
              padding: "15px 35px",
              fontSize: "1.1em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #bf5af2, #ff6b9d)",
              border: "none",
              boxShadow: "0 10px 30px rgba(191, 90, 242, 0.3)"
            }}
          >
            <AiOutlineDownload style={{ fontSize: "1.4em" }} />
            Download CV
          </Button>
        </Row>
      </Container>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default ResumeNew;
