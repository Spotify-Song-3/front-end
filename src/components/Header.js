import React from "react";

import { NavLink } from "react-router-dom";
import Form from "./Form";

const Header = () => {
  return (
    <div className="header-container">
      <div className="image-container">
        <a href="/">
          <img
            className="logo"
            src="https://files.slack.com/files-pri/T4JUEB3ME-FUP4QJ1D5/songsurfer.png"
          />
        </a>
      </div>

      <div className="header-links-container">
        <div className="header-links">
          <NavLink to="/login">Login</NavLink>

          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
      <div className="header-title">
        <h1> Song Surfer</h1>
      </div>
      <div className="search-form">
        <Form />
      </div>
    </div>
  );
};
export default Header;
