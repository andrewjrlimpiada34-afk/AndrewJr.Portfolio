import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/andrew.png";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col lg={7} md={8} className="home-about-description">
            <h1 className="section-title">
              A little <span className="purple">about me</span>
            </h1>
            <p className="home-about-body">
              I enjoy exploring how systems work, solving problems through
              code, and building ideas into something real and useful. Every
              project is a chance for me to learn deeper, think better, and
              create something with purpose.
            </p>
            <p className="home-about-body">
              I&apos;m still growing, but I care a lot about consistency,
              curiosity, and building skills that can create meaningful
              solutions for everyday life.
            </p>

            <div className="home-story-grid">
              <div className="story-card">
                <h3>How I learn</h3>
                <p>
                  By building projects, revisiting mistakes, and improving one
                  small step at a time.
                </p>
              </div>
              <div className="story-card">
                <h3>What I value</h3>
                <p>
                  Hard work, resilience, and staying grounded while aiming for
                  bigger goals.
                </p>
              </div>
              <div className="story-card">
                <h3>What I want to build</h3>
                <p>
                  Technology that improves processes, solves real problems, and
                  feels useful to people.
                </p>
              </div>
            </div>
          </Col>

          <Col lg={5} md={4} className="myAvtar">
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
              <img src={myImg} className="img-fluid profile-photo" alt="Andrew" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
