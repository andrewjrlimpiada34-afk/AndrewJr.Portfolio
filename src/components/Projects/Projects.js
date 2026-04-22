import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { usePortfolio } from "../../context/PortfolioContext";

function Projects() {
  const { projects } = usePortfolio();

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Project</strong>
        </h1>
        <p className="section-support project-support">
          For now, I am highlighting the project I personally own and continue
          to improve. More original work will be added here as I build them.
        </p>

        <Row className="project-grid">
          {projects.map((project) => (
            <Col xl={4} lg={5} md={6} sm={10} className="project-card" key={project.title}>
              <ProjectCard
                {...project}
                imgPath={project.imageUrl}
                isBlog={false}
              />
            </Col>
          ))}
        </Row>

        <div className="project-note">
          <h3>How future projects will appear here</h3>
          <p>
            Each new project can have its own image, short description, stack,
            GitHub link, and live demo link so this page grows with your work.
          </p>
        </div>
      </Container>
    </Container>
  );
}

export default Projects;
