import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Tilt from "react-parallax-tilt";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Welcome!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> DHRUV RASTOGI</strong>
              </h1>

              <div style={{ padding: "50px 50px 50px 45px", textAlign: "left" }}>
                <Type />
              </div>

              {/* Status Badges */}
              <div style={{ paddingLeft: 45, paddingTop: 20, display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span className="status-badge" style={{
                  display: "inline-block",
                  padding: "10px 22px",
                  background: "linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 212, 255, 0.15))",
                  border: "1px solid rgba(0, 255, 136, 0.4)",
                  borderRadius: "50px",
                  fontSize: "0.95em",
                  color: "#00ff88",
                  backdropFilter: "blur(10px)",
                  animation: "pulse 2s infinite",
                  fontWeight: "500"
                }}>
                  🟢 Available for Opportunities
                </span>
                <span style={{
                  display: "inline-block",
                  padding: "10px 22px",
                  background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(191, 90, 242, 0.15))",
                  border: "1px solid rgba(0, 212, 255, 0.4)",
                  borderRadius: "50px",
                  fontSize: "0.95em",
                  color: "#00d4ff",
                  backdropFilter: "blur(10px)",
                  fontWeight: "500"
                }}>
                  📍 Based in India
                </span>
              </div>
            </Col>

            <Col md={5} className="home-img-container" style={{ paddingBottom: 20 }}>
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
                gyroscope={true}
              >
                <div className="home-img-wrapper" style={{
                  position: "relative",
                  padding: "20px"
                }}>
                  {/* Glow Effect Behind Image */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    height: "80%",
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    zIndex: 0
                  }} />
                  <img
                    src={homeLogo}
                    alt="home pic"
                    className="img-fluid"
                    style={{
                      maxHeight: "450px",
                      position: "relative",
                      zIndex: 1,
                      filter: "drop-shadow(0 0 30px rgba(0, 212, 255, 0.3))",
                      animation: "float 6s ease-in-out infinite"
                    }}
                  />
                </div>
              </Tilt>
            </Col>
          </Row>
        </Container>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "bounce 2s infinite"
        }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85em", marginBottom: "10px", letterSpacing: "1px" }}>
            Explore More
          </span>
          <div style={{
            width: "25px",
            height: "40px",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "15px",
            position: "relative"
          }}>
            <div style={{
              width: "4px",
              height: "8px",
              background: "linear-gradient(180deg, #00d4ff, #bf5af2)",
              borderRadius: "2px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "8px",
              animation: "scrollDown 2s infinite"
            }} />
          </div>
        </div>
      </Container>
      <Home2 />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes scrollDown {
          0% { top: 8px; opacity: 1; }
          100% { top: 20px; opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}

export default Home;
