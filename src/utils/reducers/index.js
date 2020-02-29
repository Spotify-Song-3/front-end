import { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAIL } from "../actions";

const INITIAL_STATE = {
  isLoading: false,
  message: "",
  searchResults: []
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_START:
      return { ...state, isLoading: true, searchResults: [] };
    case SEARCH_SUCCESS:
      return { ...state, isLoading: false, searchResults: action.payload };
    case SEARCH_FAIL:
      return { ...state, isLoading: false, message: "Error searching songs" };
    default:
      return state;
  }
};
