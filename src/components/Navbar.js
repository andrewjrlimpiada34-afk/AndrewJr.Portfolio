import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../Assets/logo.png";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";

function NavBar({ onOpenLogin }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { homeContent, settings } = usePortfolio();
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <img
            src={settings.logoUrl || homeContent.logoUrl || logo}
            className="img-fluid logo"
            alt="brand"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Certificates
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href={settings.githubProfile || "https://github.com/andrewjrlimpiada34-afk"}
                target="_blank"
                rel="noreferrer"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} /> GitHub
              </Button>
            </Nav.Item>

            <Nav.Item className="profile-trigger">
              <Button
                type="button"
                variant="outline-light"
                className="profile-btn"
                onClick={() => {
                  updateExpanded(false);
                  if (isAuthenticated) {
                    navigate("/admin");
                    return;
                  }

                  onOpenLogin();
                }}
              >
                {settings.logoUrl ? (
                  <Image
                    src={settings.logoUrl}
                    roundedCircle
                    className="profile-btn-image"
                    alt="Admin profile"
                  />
                ) : (
                  <AiOutlineSetting style={{ fontSize: "1.1em" }} />
                )}
                <span>{isAuthenticated ? "Dashboard" : "Admin"}</span>
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
