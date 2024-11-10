
import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./login.css";
import Register from './register';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/myAppStore';
import { LoginModel } from '../../models/registerUserModel';
import { validateUser } from '../../RentalServices/Slicer/user/userThunk';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Login(props: any) {
  const handleClose = () => props.onClose(); // Call parent function to close
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Manage modal state
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const formData: LoginModel = {
          email: email,
          password: password
        };
        var res = await dispatch(validateUser(formData));
        // console.log(res);
        if (res.type == 'user/validateUser/fulfilled') {
          toast.success('Login successful!');
          // localStorage.setItem("token",res.payload);
          setTimeout(() => navigate(0), 1000);
        }
        if (res.type === 'user/validateUser/rejected') {
          // Handle rejection, such as network error or bad request
          setIsSigningIn(false);
          if (res.payload) {
            toast.error(res.payload as string); // Show specific error message from the rejected action payload
          } else {
            toast.error('Network Error. Please try again.');
          }
        }

      } catch (err) {
        // console.log(err);
        toast.error('Login failed. Please try again.');
        setIsSigningIn(false);
        setErrorMessage('Error signing in');
      }
    }
  };


  const handleRegisterClick = () => {
    handleClose();

    setShowRegisterModal(true); // Open the modal when clicked
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false); // Close modal when called
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} centered className='login-cont'>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center title-cont">

            <img src="../../../src/assets/icons/UrbanEstate.svg"></img>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='login-modal-body'>
          <ToastContainer />

          <Form onSubmit={onSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
            <Button variant="primary" type="submit" disabled={isSigningIn} className='login-button ms-auto me-auto'>
              {isSigningIn ? 'Signing In...' : 'Login'}
            </Button>

            <p className="login-footer">
              <a onClick={() => {
        handleClose(); 
        navigate('/forgot-password')} } style={{ cursor: 'pointer' }}>Forgot Password?</a>
            </p>

            <p>   Don't have an account?  <a className="login-footer" onClick={handleRegisterClick}>
              Sign-up.
            </a></p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Register show={showRegisterModal} onClose={handleCloseRegisterModal} />

    </>
  );

}

export default Login;



