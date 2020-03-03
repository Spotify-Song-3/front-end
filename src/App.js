import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Favorites from "./components/Favorites";
import SearchResults from "./components/SearchResults";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/favorites" component={Favorites} />
      <Route path="/search/:term" component={SearchResults} />
      <Route path="/myprofile" component={Profile} />
      <Route path="/profile/:id" component={Profile} />
    </div>
  );
}

export default App;
