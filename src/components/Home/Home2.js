import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.jpeg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em", marginBottom: "30px" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <div className="home-about-body">
              <p style={{ marginBottom: "20px" }}>
                My journey into the world of programming began with curiosity and has evolved into a deep-seated passion for creating innovative solutions. 🚀
              </p>
              <p style={{ marginBottom: "20px" }}>
                I've developed strong proficiency in
                <b className="purple"> Java, JavaScript, and Python </b>
                — leveraging these languages to build robust and scalable applications.
              </p>
              <p style={{ marginBottom: "20px" }}>
                My core interests lie in architecting
                <b className="purple"> modern web applications </b> and exploring cutting-edge domains like{" "}
                <b className="purple">
                  Artificial Intelligence, Machine Learning, and DevOps.
                </b>
              </p>
              <p>
                I specialize in building production-ready applications using
                <b className="purple"> Node.js</b> alongside
                <b className="purple">
                  {" "}
                  modern JavaScript frameworks
                </b>
                {" "}such as
                <b className="purple"> React.js and Next.js</b>
              </p>
            </div>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1500}
              gyroscope={true}
            >
              <div style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden"
              }}>
                {/* Gradient Border Effect */}
                <div style={{
                  position: "absolute",
                  top: "-3px",
                  left: "-3px",
                  right: "-3px",
                  bottom: "-3px",
                  background: "linear-gradient(135deg, #00d4ff, #bf5af2, #ff6b9d, #00d4ff)",
                  backgroundSize: "400% 400%",
                  borderRadius: "26px",
                  animation: "gradientBorder 4s ease infinite",
                  zIndex: 0
                }} />
                <img 
                  src={myImg} 
                  className="img-fluid" 
                  alt="avatar"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "24px",
                    border: "3px solid rgba(15, 15, 35, 1)"
                  }}
                />
              </div>
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1 style={{ fontSize: "2.2em", marginBottom: "10px" }}>
              LET'S CONNECT
              <a
                href="https://leetcode.com/u/dhruv_1503/"
                target="_blank"
                rel="noreferrer"
                style={{ 
                  marginLeft: "15px",
                  color: "#ffa116",
                  transition: "all 0.3s ease"
                }}
              >
                <SiLeetcode />
              </a>
            </h1>
            <p style={{ fontSize: "1.1em", marginBottom: "20px" }}>
              I'm always excited to <span className="purple">collaborate </span>on interesting projects and ideas
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/dhruv-15-03"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/dhruv-rastogi-3b744032b/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_.dhruv_.15"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Container>
  );
}
export default Home2;
