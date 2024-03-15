import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LOGO } from "../constants/constantMessages";
const LoginComponent = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div class="landingPage">
      <div className="col-md-3 sidebar">
        <div className="logo">
          <img src={LOGO} alt="Logo" />
        </div>
        <h3 className="login">Login</h3>
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
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
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
      <div className="col-md-8 content-section">
        <img
          alt="backgorundImage"
          src="https://codingzone.s3.ap-south-1.amazonaws.com/Illustration.png"
        />
      </div>
      <div className="col-md-1"></div>
    </div>
  );
};

export default LoginComponent;
