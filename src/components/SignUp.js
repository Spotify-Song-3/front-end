import React from "react";
import { withFormik, Form, Field } from "formik";

import Header from "./Header";
const SignUp = () => {
  return (
    <div className="sign-up-page">
      <Header />
      <div className="sign-up-form-container">
        <Form className="sign-up-form">
          <label>
            <span>First Name:</span>
            <Field type="text" name="firstName" />
          </label>

          <label>
            <span> Last Name:</span>
            <Field type="text" name="lastName" />
          </label>

          <label>
            <span>Email:</span>
            <Field type="text" name="email" />
          </label>

          <label>
            <span>Password:</span>
            <Field type="text" name="password" />
          </label>
        </Form>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
})(SignUp);
