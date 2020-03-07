import { axiosWithAuth } from "../../axiosWithAuth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAIL = "SEARCH_FAIL";
export const FETCH_FAVORITES_START = "FETCH_FAVORITES_START";
export const FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS";
export const FETCH_FAVORITES_FAIL = "FETCH_FAVORITES_FAIL";
export const ADD_FAVORITES_START = "ADD_FAVORITES_START";
export const ADD_FAVORITES_SUCCESS = "ADD_FAVORITES_SUCCESS";
export const ADD_FAVORITES_FAIL = "ADD_FAVORITES_FAIL";
export const DELETE_FAVORITES_START = "DELETE_FAVORITES_START";
export const DELETE_FAVORITES_SUCCESS = "DELETE_FAVORITES_SUCCESS";
export const DELETE_FAVORITES_FAIL = "DELETE_FAVORITES_FAIL";

export const login = (user, callback) => dispatch => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post("/login", user)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.username });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      callback(true);
    })
    .catch(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      dispatch({ type: LOGIN_FAIL });
      callback(false);
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
};

export const clearErrorMessages = () => {
  return { type: CLEAR_ERROR };
};

export const searchSongs = q => dispatch => {
  dispatch({ type: SEARCH_START });
  axiosWithAuth()
    .get(`/songs/search?q=${q}`)
    .then(res => dispatch({ type: SEARCH_SUCCESS, payload: res.data }))
    .catch(res => dispatch({ type: SEARCH_FAIL }));
};

export const fetchFavorites = () => dispatch => {
  dispatch({ type: FETCH_FAVORITES_START });
  axiosWithAuth()
    .get("/faves")
    .then(res => dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: res.data }))
    .catch(() => dispatch({ type: FETCH_FAVORITES_FAIL }));
};

export const addFavorites = songId => dispatch => {
  dispatch({ type: ADD_FAVORITES_START, payload: songId });
  axiosWithAuth()
    .post("/faves", { songId })
    .then(res => dispatch({ type: ADD_FAVORITES_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: ADD_FAVORITES_FAIL }));
};

export const deleteFavorites = songId => dispatch => {
  dispatch({ type: DELETE_FAVORITES_START, payload: songId });
  axiosWithAuth()
    .delete("/faves", { data: { songId } })
    .then(res =>
      dispatch({ type: DELETE_FAVORITES_SUCCESS, payload: res.data })
    )
    .catch(err => dispatch({ type: DELETE_FAVORITES_FAIL }));
};
