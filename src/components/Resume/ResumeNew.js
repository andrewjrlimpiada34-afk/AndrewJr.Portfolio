import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { usePortfolio } from "../../context/PortfolioContext";

function ResumeNew() {
  const { certificates } = usePortfolio();

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Academic <strong className="purple">Certificates</strong>
        </h1>
        <p className="section-support certificate-support">
          A collection of my academic certificates and recognitions.
        </p>

        <Row className="certificate-grid">
          {certificates.map((certificate) => (
            <Col lg={4} md={6} sm={12} className="certificate-card-wrap" key={certificate.title}>
              <div className="certificate-card">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="img-fluid certificate-image"
                />
                <h3>{certificate.title}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default ResumeNew;
