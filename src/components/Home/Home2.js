import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/andrew.png";
import Tilt from "react-parallax-tilt";
import { usePortfolio } from "../../context/PortfolioContext";

function Home2() {
  const { aboutContent } = usePortfolio();

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col lg={7} md={8} className="home-about-description">
            <h1 className="section-title">
              A little <span className="purple">about me</span>
            </h1>
            <p className="home-about-body">{aboutContent.storyIntro}</p>
            <p className="home-about-body">{aboutContent.storySecondary}</p>

            <div className="home-story-grid">
              {aboutContent.storyCards.map((item) => (
                <div className="story-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={5} md={4} className="myAvtar">
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
              <img
                src={aboutContent.profileImageUrl || myImg}
                className="img-fluid profile-photo"
                alt="Andrew"
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
