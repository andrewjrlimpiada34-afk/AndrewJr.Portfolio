import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import me from "../../Assets/andrew.png";
import { usePortfolio } from "../../context/PortfolioContext";

function About() {
  const { aboutContent } = usePortfolio();

  return (
    <>
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row className="justify-content-center about-hero-row">
            <Col
              lg={8}
              md={9}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <h1 className="about-heading">{aboutContent.heading}</h1>
              <div className="about-photo-top">
                <img
                  src={aboutContent.profileImageUrl || me}
                  alt="Andrew portrait"
                  className="img-fluid about-photo"
                />
              </div>
              <Aboutcard />
            </Col>
          </Row>

          <h1 className="project-heading">
            Basic <strong className="purple">Skillset</strong>
          </h1>
          <p className="section-support">{aboutContent.supportText}</p>
          <Techstack />

          <h1 className="project-heading">
            Outside the <strong className="purple">classroom</strong>
          </h1>
          <Row className="focus-grid">
            {aboutContent.focusCards.map((item) => (
              <Col md={4} className="focus-card-wrap" key={item.title}>
                <div className="focus-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default About;
