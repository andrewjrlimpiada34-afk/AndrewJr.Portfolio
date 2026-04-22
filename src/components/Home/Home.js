import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col lg={7} md={7} className="home-header">
              <p className="hero-kicker">Hello World! I&apos;m</p>
              <h1 className="heading-name hero-title">
                Andrew B. <strong className="main-name">Limpiada Jr.</strong>
              </h1>

              <div className="hero-type">
                <Type />
              </div>

              <p className="home-intro">
                I&apos;m an aspiring Computer Engineer currently pursuing my
                studies at Marinduque State College. I&apos;m passionate about
                technology, creativity, and continuous learning.
              </p>

              <p className="home-intro home-intro-secondary">
                This portfolio reflects who I am as a student, builder, and
                lifelong learner. I enjoy understanding how systems work,
                solving problems through code, and turning ideas into reality.
              </p>

              <div className="hero-actions">
                <Button as={Link} to="/project" variant="primary">
                  View My Work
                </Button>
                <Button as={Link} to="/about" variant="outline-light">
                  Learn More About Me
                </Button>
              </div>

              <div className="hero-highlights">
                <div className="hero-highlight-card">
                  <span className="hero-highlight-label">Location</span>
                  <strong>Paye, Mogpog, Marinduque</strong>
                </div>
                <div className="hero-highlight-card">
                  <span className="hero-highlight-label">Current Path</span>
                  <strong>BS Computer Engineering</strong>
                </div>
                <div className="hero-highlight-card">
                  <span className="hero-highlight-label">Focus</span>
                  <strong>Practical web solutions</strong>
                </div>
              </div>
            </Col>

            <Col lg={5} md={5} className="home-image-wrap">
              <img
                src={homeLogo}
                alt="Andrew portfolio visual"
                className="img-fluid home-illustration"
              />
            </Col>
          </Row>
        </Container>
      </Container>

      <Home2 />

      <Container>
        <Row className="home-social-row">
          <Col md={12} className="home-about-social">
            <h1>Find Me Online</h1>
            <p>
              Feel free to <span className="purple">connect</span> with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/andrewjrlimpiada34-afk"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/DrewJrLimpiada"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/limpiada-andrew-jr-b-3299513b7"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/ajr_leo"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
