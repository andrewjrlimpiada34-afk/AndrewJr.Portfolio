import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p className="about-copy">
            I come from <span className="purple">Paye, Mogpog, Marinduque</span>
            , a place that shaped my values, perspective, and determination to
            pursue my goals. Growing up in a simple environment taught me the
            importance of hard work, resilience, and staying grounded while
            aiming high.
          </p>

          <p className="about-copy">
            I am currently taking up
            <span className="purple">
              {" "}
              Bachelor of Science in Computer Engineering
            </span>{" "}
            at <span className="purple">Marinduque State College</span>. As a
            student in this field, I am continuously developing my skills in
            programming, problem-solving, and system design. I am especially
            interested in how technology can improve everyday processes and
            create meaningful solutions.
          </p>

          <p className="about-copy">
            Beyond academics, I enjoy experiences that keep me inspired,
            focused, and creative.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing mobile games
            </li>
            <li className="about-activity">
              <ImPointRight /> Listening to music
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching movies
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading Marvel comics
            </li>
          </ul>

          <p className="about-copy">
            I believe that learning does not stop inside the classroom. Every
            experience contributes to who I am, how I think, and how I hope to
            grow as a future engineer.
          </p>

          <p className="about-quote">
            &quot;I believe that growth comes from continuous learning, and
            success is built through persistence, passion, and purpose.&quot;
          </p>
          <footer className="blockquote-footer">Andrew B. Limpiada Jr.</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
