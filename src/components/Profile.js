import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

import Header from "./Header";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://bw-spotify-backend.herokuapp.com/api/users")
      .then(response => {
        console.log("here is the response to the users API", response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setUsers]);

  axiosWithAuth()
    .get("https://bw-spotify-backend.herokuapp.com/api/users/:id")
    .then(response => {
      console.log("here is the user:id", response);
    })
    .catch(error => {
      console.log(error);
    });

  useEffect(() => {
    axiosWithAuth()
      .get("https://bw-spotify-backend.herokuapp.com/api/faves")
      .then(response => {
        console.log(response);
        setFavs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setFavs]);
  console.log("here be favs", favs);

  return (
    <div className="profile-container">
      <Header />
      {/* {users.map(user => {
        return <h1>{user.username}</h1>;
      })} */}
      <div className="profile-body">
        <div className="profile-info">
          <i class="fas fa-id-card"></i>
          <h1> Username: </h1>
        </div>

        <div className="profile-favorite-songs">
          <h1> Favorite Tracks:</h1>
          {favs.map(fav => {
            return (
              <h3>
                {" "}
                {fav.track_name} by {fav.artist_name}
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
