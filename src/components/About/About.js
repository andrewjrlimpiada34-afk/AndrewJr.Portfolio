import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import me from "../../Assets/andrew.png";

function About() {
  return (
    <>
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row className="justify-content-center about-hero-row">
            <Col
              lg={7}
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <h1 className="about-heading">
                More about <strong className="purple">my journey</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
              lg={5}
              md={5}
              style={{ paddingTop: "70px", paddingBottom: "50px" }}
              className="about-img"
            >
              <img src={me} alt="Andrew portrait" className="img-fluid about-photo" />
            </Col>
          </Row>

          <h1 className="project-heading">
            Basic <strong className="purple">Skillset</strong>
          </h1>
          <p className="section-support">
            These are the technologies I currently use and keep improving as I
            grow my foundation in software and web development.
          </p>
          <Techstack />

          <h1 className="project-heading">
            Outside the <strong className="purple">classroom</strong>
          </h1>
          <Row className="focus-grid">
            <Col md={4} className="focus-card-wrap">
              <div className="focus-card">
                <h3>How I think</h3>
                <p>
                  I like breaking down problems step by step and understanding
                  why a system works, not just how to make it run.
                </p>
              </div>
            </Col>
            <Col md={4} className="focus-card-wrap">
              <div className="focus-card">
                <h3>What keeps me balanced</h3>
                <p>
                  Music, games, movies, and comics help me recharge while also
                  sharpening creativity and perspective.
                </p>
              </div>
            </Col>
            <Col md={4} className="focus-card-wrap">
              <div className="focus-card">
                <h3>What I am building toward</h3>
                <p>
                  A strong career in technology where I can build useful tools
                  and contribute meaningful solutions through engineering.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default About;
