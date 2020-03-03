import React, { useState, useEffect } from "react";
import Header from "./Header";
import { axiosWithAuth } from "../axiosWithAuth";

const Login = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleLoginSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/favorites");
      })
      .catch(() => setError("Login error. Please try again."));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) props.history.push("/");
  }, []);

  return (
    <div className="login-page-container">
      <Header />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h1>Log In</h1>
          {error && <div className="error">{error}</div>}
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

export default Login;
