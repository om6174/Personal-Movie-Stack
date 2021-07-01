import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="./Home">Home</Nav.Link>
        <Nav.Link href="./Dashboard">Dashboard</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
