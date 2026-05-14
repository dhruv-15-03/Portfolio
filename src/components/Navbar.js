import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";

/**
 * NavBar
 * ----------------------------------------------------------------------------
 * Two pieces of polish over the stock react-bootstrap Navbar:
 *
 *   1. SCROLL STATE → adds the .sticky class once the user has scrolled past
 *      a threshold, which triggers the glassy backdrop-filter blur defined in
 *      style.css. This is the same trick Apple/Vercel use — the bar feels
 *      "weightless" at the top and "anchored" once you start scrolling.
 *
 *   2. ACTIVE ROUTE → uses useLocation() to compute the active path and adds
 *      .is-active to the matching link. The CSS draws an animated gradient
 *      underline beneath the active item so users always know where they are.
 */
function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => updateNavbar(window.scrollY >= 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper — applies the active class to the matching nav link.
  const linkClass = (path) =>
    `nav-link-pro${pathname === path ? " is-active" : ""}`;

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center brand-pro"
        >
          <img src={logo} className="img-fluid logo" alt="brand" />
          {/* The logo image already reads "DR" — no text wordmark needed.
              Keeping the small "/ engineer" tag as the only verbal cue. */}
          <span className="brand-tag">/ engineer</span>
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
              <Nav.Link
                as={Link}
                to="/"
                className={linkClass("/")}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineHome /> <span>Home</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                className={linkClass("/about")}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser /> <span>About</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                className={linkClass("/project")}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen /> <span>Projects</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                className={linkClass("/resume")}
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument /> <span>Career</span>
              </Nav.Link>
            </Nav.Item>

            {/* Discoverability hint for the global ⌘K command palette.
                Hidden on mobile (palette is keyboard-only anyway). */}
            <Nav.Item className="cmdk-hint-wrap d-none d-md-flex">
              <button
                type="button"
                className="cmdk-hint"
                aria-label="Open command palette (Ctrl+K)"
                onClick={() => {
                  // Synthesize the ⌘K keystroke so the palette's global
                  // listener handles it — keeps a single source of truth.
                  const ev = new KeyboardEvent("keydown", {
                    key: "k",
                    code: "KeyK",
                    ctrlKey: true,
                    bubbles: true,
                  });
                  window.dispatchEvent(ev);
                }}
              >
                <kbd>⌘</kbd><kbd>K</kbd>
              </button>
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/dhruv-15-03/Portfolio"
                target="_blank"
                rel="noreferrer"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
