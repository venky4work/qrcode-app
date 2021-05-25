import { USER_SIGNUP_SUCCESS, USER_SIGN_IN_SUCCESS } from "../actions/user";

const initialState = {
  results: {},
};

function user(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return {
        results: action.payload,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        results: action.payload,
      };
    default:
      return state;
  }
}

export default user;
