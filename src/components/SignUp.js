import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

import Header from "./Header";

import CircularProgress from "@material-ui/core/CircularProgress";

const initialStatus = { isLoading: false, token: "", username: "", error: "" };

const SignUp = ({ touched, errors, status = initialStatus, ...props }) => {
  useEffect(() => {
    status?.token &&
      props.history.push("/login", { newSignedUpUser: status.username });
  }, [status.token]);

  return (
    <div className="sign-up-page">
      <Header />
      <div className="sign-up-form-container">
        <Form className="sign-up-form">
          <h1>
            <span>Sign up</span> <i className="fas fa-user-plus"></i>
          </h1>
          {status?.error && <div className="error">{status.error}</div>}
          {status?.isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <label>
                <span>Username:</span>
              </label>
              <Field type="text" name="username" />
              {touched.username && errors.username && (
                <p className="input-error">{errors.username}</p>
              )}

              <label>
                <span>Password:</span>
              </label>
              <Field type="password" name="password" />
              {touched.password && errors.password && (
                <p className="input-error">{errors.password}</p>
              )}
              <button type="submit"> Sign Up</button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    username: "",
    password: ""
  }),
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required("Please supply a username with a minumum of 4 characters.")
      .min(4),
    password: yup
      .string()
      .required("Please supply a password with a minumum of 8 characters.")
      .min(8)
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    setStatus({ isLoading: true, token: "", username: "", error: "" });
    axiosWithAuth()
      .post("/register", values)
      .then(res => {
        setStatus({
          token: res.data.token,
          username: values.username,
          error: "",
          isLoading: false
        });
        resetForm();
      })
      .catch(err => {
        setStatus({
          token: "",
          username: "",
          error: "Error signing up with the credentials provided.",
          isLoading: false
        });
      });
  }
})(SignUp);
