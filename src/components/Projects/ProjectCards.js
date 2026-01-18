import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <div style={{ overflow: "hidden", borderRadius: "16px", margin: "15px" }}>
        <Card.Img 
          variant="top" 
          src={props.imgPath} 
          alt="card-img"
          style={{
            transition: "transform 0.5s ease",
            borderRadius: "16px"
          }}
        />
      </div>
      <Card.Body style={{ padding: "20px 25px 25px" }}>
        <Card.Title style={{ 
          fontSize: "1.4em", 
          fontWeight: "700",
          marginBottom: "15px",
          background: "linear-gradient(135deg, #ffffff, #e0e0e0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          {props.title}
        </Card.Title>
        <Card.Text style={{ 
          textAlign: "justify",
          fontSize: "0.95em",
          lineHeight: "1.7",
          color: "rgba(255, 255, 255, 0.8)",
          marginBottom: "20px"
        }}>
          {props.description}
        </Card.Text>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button 
            variant="primary" 
            href={props.ghLink} 
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "0.9em"
            }}
          >
            <BsGithub style={{ fontSize: "1.2em" }} />
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>

          {!props.isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "0.9em",
                background: "linear-gradient(135deg, #bf5af2, #ff6b9d)",
                border: "none"
              }}
            >
              <CgWebsite style={{ fontSize: "1.2em" }} />
              Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
