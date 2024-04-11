import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../constants/constantMessages";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const LoginComponent = () => {
  const [popupMessage, setPopupMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleCloseUserModal = () => setShowUserModal(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (!values.userType) {
        setShowUserModal(true);
        return;
      }
      try {
        const response = await axios.post(
          `http://13.127.84.202:3213/api/admin/login?types=${values.userType}`,
          { email: values.email, password: values.password }
        );
        setPopupMessage(response.data.popupMessage);
        setShowModal(true);
        navigate("/dashboard");
      } catch (error) {
        setPopupMessage(error.response.data.message);
        setShowModal(true);
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{popupMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select User Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Select User Type</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginComponent;
