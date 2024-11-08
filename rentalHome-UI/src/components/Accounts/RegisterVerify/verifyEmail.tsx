import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Spinner } from 'react-bootstrap';
import { RegisterUser } from '../../../models/registerUserModel';
import { addUser } from '../../../RentalServices/Slicer/user/userThunk';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/myAppStore";

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Extract token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        setMessage("Invalid verification link.");
        setIsVerifying(false);
        return;
      }

      // Retrieve the pending registration from session storage
      const storedData = localStorage.getItem('pendingRegistration');

      if (storedData) {
        const { verificationToken, ...userDetails } = JSON.parse(storedData);
        console.log(userDetails.submittedValues)
        // Check if the token matches the stored token
        if (verificationToken === token) {
          completeRegistration(userDetails.submittedValues);
        } else {
          setMessage("Invalid or expired verification token.");
          setIsVerifying(false);
        }
      } else {
        setMessage("No registration data found. Please try registering again.");
        setIsVerifying(false);
      }
    }, 500); // Adjust the timeout as needed

    return () => clearTimeout(timeoutId);
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const completeRegistration = async (userDetails: RegisterUser) => {
    try {
        const res = await dispatch(addUser(userDetails));
        console.log(res);
        if (res.type === 'user/addUser/fulfilled') {
          toast.success('Register Success, Please Login');
          setTimeout(() => navigate("/"), 2000);
        }
        if (res.type === 'user/addUser/rejected') {
          // Handle rejection, such as network error or bad request
          if (res.payload) {
            console.log(res.payload)
            // Display the rejection payload, which contains the error message
            toast.error(res.payload as string);
          }
        }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <ToastContainer />
      {isVerifying ? (
        <>
          <Spinner animation="border" role="status" />
          <h4 className="mt-3">Verifying your email...</h4>
        </>
      ) : (
        <>
          <h4>{message}</h4>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </>
      )}
    </Container>
  );
};

export default VerifyEmail;
