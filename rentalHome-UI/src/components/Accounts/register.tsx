import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import "./register.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/myAppStore";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Register(props: any) {
  const handleClose = () => props.onClose(); // Call parent function to close
  // const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showStrengthBar, setShowStrengthBar] = useState(false);
  const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
        phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number is not valid")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number cannot exceed 10 digits")  // Added max validation
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      // Remove the confirmPassword before submission
      const { confirmPassword, ...submittedValues } = values;
      const verificationToken = generateToken();

      // Save pending registration in session storage with verification token
      localStorage.setItem('pendingRegistration', JSON.stringify({ submittedValues, verificationToken }));

      const templateParams = {
        to_email: values.email,
        verification_link: `http://localhost:5173/verify-email?token=${verificationToken}`,
      };

      try {
        setIsSubmitting(true);
       const res = await emailjs.send(
          'service_eyeojl5',    // Replace with your EmailJS Service ID
          'template_fl6npoa',    // Replace with your EmailJS Template ID
          templateParams,
          'WA4TH73BMASrl-8QC'    // Replace with your EmailJS User ID
        );
        console.log(res);
        toast.success('Verification email sent! Please check your inbox.', {
          autoClose: 3000, // Toast will auto-close after 3 seconds
          onClose: () => handleClose() // Close the modal after toast disappears
        });
        setIsSubmitting(false);
      } catch (error) {
        console.error('Failed to send verification email:', error);
        toast.error('Failed to send verification email.');
        setIsSubmitting(false);
      }
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    formik.handleChange(e);

    // Show the password strength bar when typing starts
    if (value.length > 0) {
      setShowStrengthBar(true);
    } else {
      setShowStrengthBar(false);
      setPasswordStrength(0); // Reset password strength when cleared
    }

    // Logic to set password strength
    if (value.length <= 3) {
      setPasswordStrength(0); // Weak
    } else if (value.length <= 6) {
      setPasswordStrength(1); // Medium
    } else if (value.length <= 9) {
      setPasswordStrength(2); // Fair
    } else if (value.length <= 12) {
      setPasswordStrength(3); // Strong
    } else {
      setPasswordStrength(4); // Very Strong
    }
  };



  return (
    <>
      <Modal show={props.show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center title-cont ">
          <img src="../../../src/assets/icons/UrbanEstate.svg"></img><h5>Create a New Account</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ToastContainer />
          <Form onSubmit={formik.handleSubmit} className="register-form">
            {/* Username */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                placeholder="Enter your username"
                autoFocus
              />
              {formik.touched.userName && formik.errors.userName && (
                <span className="error-message">{formik.errors.userName}</span>
              )}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="name@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="error-message">{formik.errors.email}</span>
              )}
            </Form.Group>

            {/* Phone Number */}
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                placeholder="Enter your phone number"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <span className="error-message">{formik.errors.phoneNumber}</span>
              )}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handlePasswordChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password && (
                <span className="error-message">{formik.errors.password}</span>
              )}

              {/* Password strength bar */}
              {showStrengthBar && (
                <div className="password-strength-bar mt-2">
                  <div
                    className={`strength-bar strength-${passwordStrength}`}
                    style={{ width: `${(passwordStrength + 1) * 20}%` }}
                  ></div>
                </div>
              )}
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder="Re-enter password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="error-message">{formik.errors.confirmPassword}</span>
                )}
            </Form.Group>

            {/* Submit Button */}
            <Button  type="submit" className="login-button ms-auto me-auto">
            {isSubmitting ? "Sending..." : "Sign Up"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* You can add a footer button here if needed */}
        </Modal.Footer>
      </Modal>
 
    </>
  );
}

export default Register;
