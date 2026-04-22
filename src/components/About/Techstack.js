import React from "react";
import { Col, Row } from "react-bootstrap";
import { usePortfolio } from "../../context/PortfolioContext";

function Techstack() {
  const { aboutContent } = usePortfolio();

  return (
    <Row className="skills-row">
      {aboutContent.skills.map((skill) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="skill-tile-wrap"
          key={skill.label}
        >
          <div className="tech-icons">
            <img
              src={skill.iconUrl}
              alt={skill.label}
              className="tech-icon-images"
            />
            <div className="tech-icons-text">{skill.label}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
