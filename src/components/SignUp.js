import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

import Header from "./Header";
const SignUp = ({ touched, errors }) => {
  // const [user, setUser] = useState("");
  return (
    <div className="sign-up-page">
      <Header />
      <div className="sign-up-form-container">
        <Form className="sign-up-form">
          <label>
            <span>First Name:</span>
            <Field type="text" name="firstName" />
            {touched.firstName && errors.firstName && (
              <p> {errors.firstName}</p>
            )}
          </label>

          <label>
            <span> Last Name:</span>
            <Field type="text" name="lastName" />
            {touched.lastName && errors.lastName && <p> {errors.lastName}</p>}
          </label>

          <label>
            <span>Email:</span>
            <Field type="text" name="email" />
            {touched.email && errors.email && <p> {errors.email}</p>}
          </label>

          <label>
            <span>Password:</span>
            <Field type="text" name="password" />
            {touched.password && errors.password && <p> {errors.password}</p>}
          </label>
          <button type="submit"> Sign Up</button>
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
  }),
  validationSchema: yup.object().shape({
    firstName: yup.string().required("Please Supply Your First Name"),
    lastName: yup.string().required("Please Supply Your First Name"),
    email: yup
      .string()
      .required("Please Supply A Valid Email Address")
      .email(),
    password: yup
      .string()
      .required("Please Supply A Password With A Minumum Of 8 Characters")
      .min(8)
  }),
  handleSubmit: (values, { resetForm }) => {
    // console.log(values);
    resetForm();
  }
})(SignUp);
