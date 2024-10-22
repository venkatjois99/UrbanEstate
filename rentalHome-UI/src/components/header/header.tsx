import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useEffect, useState } from "react";
import Login from "../Accounts/login";
import Register from "../Accounts/register";

function NavBars() {
  const [showLoginModal, setShowLoginModal] = useState(false); // Manage modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Manage modal state

  const [scrolled, setScrolled] = useState(false);
  
  const handleLoginClick = () => {
    setShowLoginModal(true); // Open the modal when clicked
  };

  const handleCloseModal = () => {
    setShowLoginModal(false); // Close modal when called
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true); // Open the modal when clicked
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false); // Close modal when called
  };


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
     <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      className={`navBar-body ${scrolled ? 'scrolled' : ''}`}
    >
  <Container fluid className="me-5 ms-5">
    <Navbar.Brand className="me-5" href="/">
      <img src="src\assets\icons\UrbanEstate.svg" className="logo-cont" alt="Logo" />
    </Navbar.Brand>
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="w-100 ">

       <div className="ms-auto d-flex hide-at-lg">
       <Nav.Link href="#about">About Us</Nav.Link>
       <Nav.Link href="/rent">Rent</Nav.Link>
       <Nav.Link href="#sell">Post Property</Nav.Link>
       </div>
        
        {/* Spacer to create gap between nav links */}
        <div className="ms-auto d-flex hide-at-lg">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          <Nav.Link onClick={handleLoginClick}>Log in</Nav.Link>
          <Nav.Link className="signUp" onClick={handleRegisterClick}>SignUp</Nav.Link>

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
    <Register show={showRegisterModal} onClose={handleCloseRegisterModal}/>        
    <Login show={showLoginModal} onClose={handleCloseModal} />
    </>
  );
}

export default NavBars;
