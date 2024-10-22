import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";
import "./register.css";

function Register(props: any) {
  const handleClose = () => props.onClose(); // Call parent function to close
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number is not valid")
        .min(10, "Phone number must be at least 10 digits")
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

      // Here, only 'username', 'email', 'phoneNumber', and 'password' will be submitted.
      console.log("Submitted Values:", submittedValues);

      // Call backend API or Firebase to handle user registration
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const strength = zxcvbn(e.target.value).score;
    setPasswordStrength(strength);
  };
  return (
    <>
      <Modal show={props.show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center title-cont">
            <h4>Create a New Account</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} className="register-form">
            {/* Username */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="Enter your username"
              />
              {formik.touched.username && formik.errors.username && (
                <span className="error-message">{formik.errors.username}</span>
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
                autoFocus
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
                <span className="error-message">
                  {formik.errors.phoneNumber}
                </span>
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
              <div className="password-strength-bar mt-2">
                <div
                  className={`strength-bar strength-${passwordStrength}`}
                  style={{ width: `${(passwordStrength + 1) * 20}%` }}
                ></div>
              </div>
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
                  <span className="error-message">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>

            <div className="text-sm text-center mt-3">
              Already have an account?{" "}
              <a href="/login" className="register-link">
                Continue
              </a>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
