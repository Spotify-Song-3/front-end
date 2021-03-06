import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  FETCH_FAVORITES_START,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAIL,
  ADD_FAVORITES_START,
  ADD_FAVORITES_SUCCESS,
  ADD_FAVORITES_FAIL,
  DELETE_FAVORITES_START,
  DELETE_FAVORITES_SUCCESS,
  DELETE_FAVORITES_FAIL
} from "../actions";

const INITIAL_STATE = {
  isLoading: false,
  isSearching: false,
  isFetching: false,
  actionID: null,
  message: "",
  searchResults: [],
  favoriteSongs: []
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isLoading: true, message: "" };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, username: action.payload };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        message: "Username/password combination is incorrect. Please try again."
      };
    case LOGOUT:
      return { ...INITIAL_STATE };
    case CLEAR_ERROR:
      return { ...state, message: "" };
    case SEARCH_START:
      return { ...state, isSearching: true, message: "", searchResults: [] };
    case SEARCH_SUCCESS:
      return { ...state, isSearching: false, searchResults: action.payload };
    case SEARCH_FAIL:
      return {
        ...state,
        isSearching: false,
        message: "Error searching songs."
      };
    case FETCH_FAVORITES_START:
      return { ...state, isFetching: true, message: "" };
    case FETCH_FAVORITES_SUCCESS:
      return { ...state, isFetching: false, favoriteSongs: action.payload };
    case FETCH_FAVORITES_FAIL:
      return {
        ...state,
        isFetching: false,
        message: "Error fetching favorite songs."
      };
    case ADD_FAVORITES_START:
      return { ...state, actionID: action.payload, message: "" };
    case ADD_FAVORITES_SUCCESS:
      return { ...state, actionID: null, favoriteSongs: action.payload };
    case ADD_FAVORITES_FAIL:
      return {
        ...state,
        actionID: false,
        message: "Error adding song to favorites."
      };
    case DELETE_FAVORITES_START:
      return { ...state, actionID: action.payload, message: "" };
    case DELETE_FAVORITES_SUCCESS:
      return { ...state, actionID: null, favoriteSongs: action.payload };
    case DELETE_FAVORITES_FAIL:
      return {
        ...state,
        actionID: null,
        message: "Error deleting a song from favorites."
      };
    default:
      return state;
  }
};
