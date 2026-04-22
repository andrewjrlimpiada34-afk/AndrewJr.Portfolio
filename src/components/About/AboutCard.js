import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { usePortfolio } from "../../context/PortfolioContext";

function AboutCard() {
  const { aboutContent } = usePortfolio();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          {aboutContent.paragraphs.map((paragraph) => (
            <p className="about-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}

          <ul>
            {aboutContent.hobbies.map((hobby) => (
              <li className="about-activity" key={hobby}>
                <ImPointRight /> {hobby}
              </li>
            ))}
          </ul>

          <p className="about-quote">
            &quot;{aboutContent.quote}&quot;
          </p>
          <footer className="blockquote-footer">{aboutContent.footerName}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
