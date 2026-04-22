import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import severino from "../../Assets/Projects/severino.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={severino}
              isBlog={false}
              title="Severino"
              description="A webapp shop that is still undergoing on its fully developed version. But you can still access some of the user features by logging in using your Google account."
              ghLink="https://github.com/andrewjrlimpiada34-afk/severino_webapp_shop"
              demoLink="https://severino-webapp-shop.vercel.app"
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
