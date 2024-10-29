import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import  {useDispatch, useSelector}  from 'react-redux';
import { useEffect, useState } from "react";
import Login from "../Accounts/login";
import Register from "../Accounts/register";
import { AppDispatch } from "../../store/myAppStore";
import { logout } from "../../RentalServices/Slicer/user/userSlicer";

function NavBars() {
  const [showLoginModal, setShowLoginModal] = useState(false); // Manage modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Manage modal state
  const [scrolled, setScrolled] = useState(false);
  const loginStatus=useSelector((state: { user: { isLoggedIn: any; }; })=>state.user.isLoggedIn);
  
  const dispatch = useDispatch<AppDispatch>();

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

  const handleLogout = ()=>{
    dispatch(logout());
    localStorage.removeItem("token");
   
    
  }

  useEffect(() => {
    console.log(loginStatus);
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
      <img src="src/assets/icons/UrbanEstate.svg" className="logo-cont" alt="Logo" />
    </Navbar.Brand>
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="w-100 ">

       <div className="ms-auto d-flex hide-at-lg">
       <Nav.Link href="/about-us">About Us</Nav.Link>
       <Nav.Link href="/rent">Rent</Nav.Link>
       <Nav.Link href="/sell">Post Property</Nav.Link>
       </div>
        
        {/* Spacer to create gap between nav links */}
        <div className="ms-auto d-flex hide-at-lg">
                {!loginStatus ? (
                  <>
                    <Nav.Link className="me-4" onClick={handleLoginClick}>Log in</Nav.Link>
                    <Nav.Link className="signUp" onClick={handleRegisterClick}>Sign Up</Nav.Link>
                  </>
                ) : (
                  <NavDropdown title="Dropdown" id="collapsible-nav-dropdown" className="header-dropdown">
                    <NavDropdown.Item href="#action/3.2">My Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  
                )}
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
