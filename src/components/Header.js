import React, { useState, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import Form from "./Form";

const logo = require("../img/logo.png");

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // return (
  //   <div className="header-container">
  //     <div className="image-container">
  //       <a href="/">
  //         <img
  //           className="logo"
  //           src="https://files.slack.com/files-pri/T4JUEB3ME-FUP4QJ1D5/songsurfer.png"
  //         />
  //       </a>
  //     </div>

  // {/* useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setIsLoggedIn(true);
  //   }
  // }, []); */}

  return (
    <div className="header-container">
      <div className="header-top">
        <div className="image-container">
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>
        </div>
        <div className="header-links-container">
          <div className="header-links">
            {isLoggedIn ? (
              <React.Fragment>
                <NavLink to="/favorites">Favorites</NavLink>
                <NavLink to="/myprofile">Profile</NavLink>
                <NavLink
                  to="/"
                  onClick={() => localStorage.removeItem("token")}
                >
                  Logout
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="header-title">
        <div className="search-form">
          <Form />
        </div>
      </div>
    </div>
  );
};
export default Header;
