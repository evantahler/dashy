import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";

function HilightableNavLink({ href, text }: { href: string; text: string }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const active = window.location.pathname === href;
    setActive(active);
  }, []);

  return (
    <Nav.Link active={active} href={href}>
      {text}
    </Nav.Link>
  );
}

function Sidebar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="/">&nbsp;&nbsp;&nbsp;Dashy!</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <HilightableNavLink href="/page" text="&nbsp;Page" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
