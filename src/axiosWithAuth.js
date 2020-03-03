import axios from "axios";

export const axiosWithAuth = () =>
  axios.create({
    baseURL: "https://bw-spotify-backend.herokuapp.com/api",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
