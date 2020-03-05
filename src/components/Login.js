import React, { useState, useEffect } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { login, clearErrorMessages } from "../utils/actions";

const Login = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleLoginSubmit = event => {
    event.preventDefault();
    props.login(user, () => props.history.push("/"));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) props.history.push("/");

    return () => props.clearErrorMessages();
  }, []);

  return (
    <div className="login-page-container">
      <Header />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h1>Log In</h1>
          {props.message && <div className="error">{props.message}</div>}
          <label>Username:</label>
          <input
            type="text"
            name="username"
            id="name"
            onChange={event => handleChange(event)}
            value={user.userName}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={event => handleChange(event)}
            value={user.password}
          />
          <button>Log In</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

export default connect(mapStateToProps, { login, clearErrorMessages })(Login);
