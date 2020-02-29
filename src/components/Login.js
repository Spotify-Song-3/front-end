import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";
import Header from "./Header";

const Login = props => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const { username, password } = creds;

  const handleChange = e =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/favorites");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Header />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
