import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LoginExpired: React.FC = () => {
    const navigate = useNavigate();
 
    const handleRedirect = () => {
      navigate('/'); // Redirect to home or change to '/login' if needed
    };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login Expired</h1>
      <p>Please log in again to continue.</p>
      <Button variant="primary" onClick={handleRedirect}>
        Go to Home
</Button>
    </div>
  );
};

export default LoginExpired;
