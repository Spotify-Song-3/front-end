import { axiosWithAuth } from "../../axiosWithAuth";

export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAIL = "SEARCH_FAIL";

export const searchSongs = q => dispatch => {
  dispatch({ type: SEARCH_START });
  axiosWithAuth()
    .get(`/songs/search?q=${q}`)
    .then(res => dispatch({ type: SEARCH_SUCCESS, payload: res.data }))
    .catch(res => dispatch({ type: SEARCH_FAIL }));
};
