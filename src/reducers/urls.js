import { CREATE_URL_SUCCESS, DELETE_URL_SUCCESS, LIST_URL_SUCCESS, UPDATE_URL_SUCCESS } from "../actions/urls";

const initialState = {
  results: [],
};

function urls(state = initialState, action) {
  switch (action.type) {
    case CREATE_URL_SUCCESS:
      return state;
    case LIST_URL_SUCCESS:
      return {
        results: action.payload,
      };
    case UPDATE_URL_SUCCESS:
        return state;
    case DELETE_URL_SUCCESS:
      return {
        results: action.payload,
      };
    default:
      return state;
  }
}

export default urls;
