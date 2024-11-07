import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import  './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const handleResetPassword = async (e:any) => {
    e.preventDefault();
    try {
      console.log(token);
      console.log(email);
      const response = await axios.post('https://localhost:8080/gateway/Account/reset-password', { 
        email:email,
        token:token?.replace(/\s/g,'+'),
        newPassword:newPassword
       });
       console.log(response);
      setMessage("Your password has been reset successfully!");
    } catch (error) {
      setMessage("Error: Could not reset password.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="reset-password-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;