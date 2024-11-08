import React, { useState } from 'react';
import {forgotPasswordService} from '../../../RentalServices/Services/userService'
import  './ForgotPassword.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (z:any) => {
    z.preventDefault();
  



    try {
        console.log(email);
        const res =await forgotPasswordService(email);
        console.log(res);
      
      setMessage("If the email is registered, a reset link has been sent.");
    } catch (error) {
      console.log(error)
      setMessage("Error: Could not send reset link.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;