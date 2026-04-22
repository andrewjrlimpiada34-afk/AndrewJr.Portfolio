import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import juniorhigh from "../../Assets/AcadCertificates/juniorhigh.jpg";
import grade10 from "../../Assets/AcadCertificates/grade10.jpg";
import grade10Alt from "../../Assets/AcadCertificates/grade10-1.jpg";
import grade10Wh from "../../Assets/AcadCertificates/grade10-wh.jpg";
import grade11 from "../../Assets/AcadCertificates/grade11.jpg";
import grade11Alt from "../../Assets/AcadCertificates/grade11-1.jpg";
import wika from "../../Assets/AcadCertificates/wika.jpg";

const certificates = [
  { title: "Junior High Certificate", image: juniorhigh },
  { title: "Grade 10 Certificate", image: grade10 },
  { title: "Grade 10 Certificate 2", image: grade10Alt },
  { title: "Grade 10 Wika Certificate", image: grade10Wh },
  { title: "Grade 11 Certificate", image: grade11 },
  { title: "Grade 11 Certificate 2", image: grade11Alt },
  { title: "Wika Certificate", image: wika },
];

function ResumeNew() {
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
                  src={certificate.image}
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
