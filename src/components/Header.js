import React from "react";

import { NavLink } from "react-router-dom";
import Form from "./Form";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-links-container">
        <div className="header-links">
          <NavLink to="/">Login</NavLink>

          <NavLink to="/">Sign Up</NavLink>
        </div>
      </div>
      <div className="search-form">
        <Form />
      </div>
    </div>
  );
};
export default Header;
