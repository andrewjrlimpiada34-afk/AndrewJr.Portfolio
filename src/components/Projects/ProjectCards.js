import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt={props.title} />
      <Card.Body>
        {props.status && <span className="project-status">{props.status}</span>}
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className="project-description">{props.description}</Card.Text>

        {props.stack && (
          <div className="project-tags">
            {props.stack.map((item) => (
              <span className="project-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="project-actions">
          <Button variant="primary" href={props.ghLink} target="_blank" rel="noreferrer">
            <BsGithub /> &nbsp;
            GitHub
          </Button>

          {!props.isBlog && props.demoLink && (
            <Button
              variant="outline-light"
              href={props.demoLink}
              target="_blank"
              rel="noreferrer"
            >
              <CgWebsite /> &nbsp;Live Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
