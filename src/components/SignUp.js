import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

import Header from "./Header";
import { axiosWithAuth } from "../axiosWithAuth";

const SignUp = ({ touched, errors, status, ...props }) => {
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   status && setUser(status);
  // }, [user, status]);

  useEffect(() => {
    status?.token && props.history.push("/login");
  }, [status]);

  return (
    <div className="sign-up-page">
      <Header />
      <div className="sign-up-form-container">
        <Form className="sign-up-form">
          <h1>Sign Up</h1>
          {/* <label>
            <span>First Name:</span>
            <Field type="text" name="firstName" />
            {touched.firstName && errors.firstName && (
              <p> {errors.firstName}</p>
            )}
          </label> */}

          {/* <label>
            <span> Last Name:</span>
            <Field type="text" name="lastName" />
            {touched.lastName && errors.lastName && <p> {errors.lastName}</p>}
          </label> */}
          {status?.error && <div className="error">{status.error}</div>}
          <label>
            <span>Username:</span>
            <Field type="text" name="username" />
            {touched.username && errors.username && <p>{errors.username}</p>}
          </label>

          <label>
            <span>Password:</span>
            <Field type="password" name="password" />
            {touched.password && errors.password && <p>{errors.password}</p>}
          </label>
          <button type="submit"> Sign Up</button>
        </Form>
        {/* {user && (
          <div className="dynamic-welcome">
            {" "}
            Welcome to Song Surfer {user.firstName}!{" "}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    // firstName: "",
    // lastName: "",
    username: "",
    password: ""
  }),
  validationSchema: yup.object().shape({
    // firstName: yup.string().required("Please Supply Your First Name"),
    // lastName: yup.string().required("Please Supply Your First Name"),
    username: yup.string().required("* Please Supply A Valid Username"),
    password: yup
      .string()
      .required("* Please Supply A Password With A Minumum Of 8 Characters")
      .min(8)
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    axiosWithAuth()
      .post("/register", values)
      .then(res => setStatus({ token: res.data.token }))
      .catch(err =>
        setStatus({ error: "Error signing up with the credentials provided." })
      );
    resetForm();
  }
})(SignUp);
