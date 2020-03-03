import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleLoginSubmit = event => {
    event.preventDefault();
    console.log("Some Redux Action is About to Go On Here");
  };
  // console.log(user);
  return (
    <div className="login-page-container">
      <Header />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            id="name"
            onChange={event => handleChange(event)}
            value={user.userName}
          />
          <label>Password</label>
          <input
            type="text"
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
