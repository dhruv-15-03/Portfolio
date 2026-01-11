import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";

import { AiOutlineDownload } from "react-icons/ai";

const pdfDownloadLink = "https://drive.google.com/uc?export=view&id=15tsUo1puuFRYQKxC1p1oWxUYNVKn2Evw";
const pdfPreviewLink = "https://drive.google.com/file/d/15tsUo1puuFRYQKxC1p1oWxUYNVKn2Evw/preview";
function ResumeNew() {

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfDownloadLink}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <iframe
            src={pdfPreviewLink}
            title="resume"
            width="100%"
            height="1000px"
            style={{ border: "none" }}
          ></iframe>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfDownloadLink}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
