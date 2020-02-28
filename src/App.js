import React from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Favorites from "./components/Favorites";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/favorites" component={Favorites} />
    </div>
  );
}

export default App;
