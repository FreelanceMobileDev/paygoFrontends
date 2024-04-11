import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 
import { LOGO } from "../constants/constantMessages";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const LoginComponent = () => {
  const [popupMessage, setPopupMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const navigate = useNavigate(); 

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseFailModal = () => setShowFailModal(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userType: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      userType: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://13.127.84.202:3213/api/admin/login?types=${values?.userType}`,
          { email: values?.email, password: values?.password }
        );
        setPopupMessage(response.data.popupMessage);
        setShowSuccessModal(true);
        navigate("/dashboard");
      } catch (error) {
        setPopupMessage(error.response.data.message);
        setShowFailModal(true);
      }
    },
  });

  return (
    <div className="landingPage">
      <div className="sidebar">
        <div className="logo">
          <img src={LOGO} alt="Logo" />
        </div>
        <h3 className="login">Login</h3>
        <h6 className="user-type-heading">Select User Type:</h6>
        <div className="user-type-radio">
          <label>
            <input
              type="radio"
              name="userType"
              value="horn"
              checked={formik.values.userType === "horn"}
              onChange={formik.handleChange}
            />
            Horn
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="banks"
              checked={formik.values.userType === "banks"}
              onChange={formik.handleChange}
            />
            Banks
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="insurance"
              checked={formik.values.userType === "insurance"}
              onChange={formik.handleChange}
            />
            Insurance
          </label>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="inputText">Email Address</label>
          </div>
          <div>
            <input
              className="inputTextField"
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label className="inputText" htmlFor="password">
              Password:
            </label>
            <input
              className="inputTextField"
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="submitButton">
            <button className="loginButton" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="content-section">
        <img
          alt="backgorundImage"
          src="https://paygoc.s3.ap-south-1.amazonaws.com/Illustration.png"
        />
      </div>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{formik.values.userType.toUpperCase()}</strong> has
            successfully logged in!
          </p>
          <p>{popupMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFailModal} onHide={handleCloseFailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{popupMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginComponent;
