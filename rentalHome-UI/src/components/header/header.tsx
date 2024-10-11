import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useState } from "react";
import Login from "../login/login";

function NavBars() {
  const [showLoginModal, setShowLoginModal] = useState(false); // Manage modal state

  const handleLoginClick = () => {
    setShowLoginModal(true); // Open the modal when clicked
  };

  const handleCloseModal = () => {
    setShowLoginModal(false); // Close modal when called
  };

  return (
    <>
    <Navbar collapseOnSelect sticky="top" expand="lg" className="bg-body-tertiary">
  <Container fluid className="me-3 ms-3">
    <Navbar.Brand className="me-5" href="/">
      <img src="src/assets/logofinal.png" className="logo-cont" alt="Logo" />
    </Navbar.Brand>
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="w-100">
        <Nav.Link href="#rent">Rent</Nav.Link>
        <Nav.Link href="#sell">Sell</Nav.Link>
        
        {/* Spacer to create gap between nav links */}
        <div className="ms-auto d-flex hide-at-lg">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          <Nav.Link onClick={handleLoginClick}>Log in</Nav.Link>
          <Nav.Link className="signUp" onClick={handleLoginClick}>SignUp</Nav.Link>

          <NavDropdown title="Dropdown" id="collapsible-nav-dropdown" className="header-dropdown">
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    <Login show={showLoginModal} onClose={handleCloseModal} />
    </>
  );
}

export default NavBars;
