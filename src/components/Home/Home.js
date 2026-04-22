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
import { usePortfolio } from "../../context/PortfolioContext";

function Home() {
  const { homeContent } = usePortfolio();

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col lg={7} md={7} className="home-header">
              <p className="hero-kicker">{homeContent.kicker}</p>
              <h1 className="heading-name hero-title">
                {homeContent.firstName}{" "}
                <strong className="main-name">{homeContent.lastName}</strong>
              </h1>

              <div className="hero-type">
                <Type />
              </div>

              <p className="home-intro">
                {homeContent.introPrimary}
              </p>

              <p className="home-intro home-intro-secondary">
                {homeContent.introSecondary}
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
                {homeContent.highlights.map((item) => (
                  <div className="hero-highlight-card" key={item.label}>
                    <span className="hero-highlight-label">{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={5} md={5} className="home-image-wrap">
              <img
                src={homeContent.heroImageUrl || homeLogo}
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
                  href={homeContent.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={homeContent.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={homeContent.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={homeContent.socialLinks.instagram}
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
