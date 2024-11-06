import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation,Outlet } from 'react-router-dom';
import './dashboardLayout.css';
import NavBars from '../header/header';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/myAppStore";
import React, { useEffect } from 'react';
import { initializeUserFromToken } from '../../RentalServices/Slicer/user/userThunk';





const DashboardLayout: React.FC = ({  }) => {
  const location = useLocation();
 
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector((state: RootState) => state.user.role);
// console.log(role);
  useEffect(() => {
      dispatch(initializeUserFromToken());
  }, [dispatch]);

  return (
    <>
      <NavBars />
      {/* Navbar for smaller screens */}
      <Navbar bg="light" variant="light" expand="lg" className="d-lg-none">
        <Container fluid>
          <Navbar.Brand>{role === 'owner' ? 'Owner Dashboard' : 'Tenant Dashboard'}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="flex-column">
              {role === 'tenant' && (
                <>
                  <Nav.Link as={Link} to="/dashboard/profile" active={location.pathname === '/dashboard/myProfile'}>
                    My Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/favorites" active={location.pathname === '/dashboard/favorites'}>
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/chat" active={location.pathname === '/dashboard/chat'}>
                    Chat
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/rate-us" active={location.pathname === '/dashboard/rate-us'}>
                    Rate Us
                  </Nav.Link>
                </>
              )}
              {role === 'owner' && (
                <>
                  <Nav.Link as={Link} to="/dashboard/profile" active={location.pathname === '/dashboard/myProfile'}>
                    My Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/my-properties" active={location.pathname === '/dashboard/my-properties'}>
                    View My Properties
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/favorites" active={location.pathname === '/dashboard/favorites'}>
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/chat" active={location.pathname === '/dashboard/chat'}>
                    Chat with Tenants
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="dashboard-layout">
        <Row>
          {/* Sidebar for larger screens */}
          <Col md={3} lg={2} className="bg-light sidebar d-none d-lg-block vh-100 p-3">
            <Navbar.Brand>{role === 'owner' ? 'Owner Dashboard' : 'Tenant Dashboard'}</Navbar.Brand>
            <Nav className="flex-column">
              {role === 'tenant' && (
                <>
                  <Nav.Link as={Link} to="/dashboard/profile" active={location.pathname === '/dashboard/myProfile'}>
                    My Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/favorites" active={location.pathname === '/dashboard/favorites'}>
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/chat" active={location.pathname === '/dashboard/chat'}>
                    Chat
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/rate-us" active={location.pathname === '/dashboard/rate-us'}>
                    Rate Us
                  </Nav.Link>
                </>
              )}
              {role === 'owner' && (
                <>
                  <Nav.Link as={Link} to="/dashboard/profile" active={location.pathname === '/dashboard/myProfile'}>
                    My Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/my-properties" active={location.pathname === '/dashboard/my-properties'}>
                    View My Properties
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/favorites" active={location.pathname === '/dashboard/favorites'}>
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard/chat" active={location.pathname === '/dashboard/chat'}>
                    Chat with Tenants
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Col>

          {/* Main Content */}
          <Col className="p-4 content">
            <Outlet /> {/* This renders the nested routes */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardLayout;
