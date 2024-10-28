import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
 
const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
 
  const handleRedirect = () => {
    navigate('/'); // Redirect to home or change to '/login' if needed
  };
 
  return (
<Container className="text-center mt-5">
<h1>Access Denied</h1>
<p>You do not have permission to view this page.</p>
<Button variant="primary" onClick={handleRedirect}>
        Go to Home
</Button>
</Container>
  );
};
 
export default Unauthorized;

 