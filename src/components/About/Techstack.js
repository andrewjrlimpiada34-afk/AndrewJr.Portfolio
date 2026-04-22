import React from "react";
import { Col, Row } from "react-bootstrap";
import Java from "../../Assets/TechIcons/Java.svg";
import Mongo from "../../Assets/TechIcons/Mongo.svg";
import SQL from "../../Assets/TechIcons/SQL.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import ReactIcon from "../../Assets/TechIcons/React.svg";

const skills = [
  { icon: Java, alt: "Java", label: "Java" },
  { icon: Mongo, alt: "MongoDB", label: "MongoDB" },
  { icon: SQL, alt: "MySQL", label: "MySQL" },
  { icon: Git, alt: "Git", label: "Git" },
  { icon: ReactIcon, alt: "React.js", label: "React.js" },
];

function Techstack() {
  return (
    <Row className="skills-row">
      {skills.map((skill) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="skill-tile-wrap"
          key={skill.label}
        >
          <div className="tech-icons">
            <img src={skill.icon} alt={skill.alt} className="tech-icon-images" />
            <div className="tech-icons-text">{skill.label}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
