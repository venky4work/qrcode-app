import { createAction } from "redux-api-middleware";

export const USER_SIGNUP = "USER_SIGNUP";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_IN_SUCCESS = "USER_SIGN_IN_SUCCESS";
export const USER_SIGN_IN_FAILURE = "USER_SIGN_IN_FAILURE";

const handleResponse = (action, state, res) => {
  // console.log(res.json());
  return res.json();
};

const handleError = (action, state, res) => {
  console.log(res.json());
};

const handleUserFormData = (user) => {
  var formData = new FormData();
  formData.append("action", "register");
  formData.append("username", user.username);
  formData.append("password", user.password);
  return formData;
};

const handleSingIn = (user) => {
    var formData = new FormData();
    formData.append("action", "login");
    formData.append("username", user.username);
    formData.append("password", user.password);
    return formData;
  };

export const userSignup = (user) =>
  createAction({
    endpoint: "https://my7.io/api/api.php",
    method: "POST",
    body: handleUserFormData(user),
    // headers: { "Content-Type": "multipart/form-data" },
    types: [
      { type: USER_SIGNUP },
      {
        type: USER_SIGNUP_SUCCESS,
        payload: (action, state, res) => handleResponse(action, state, res),
      },
      { type: USER_SIGNUP_FAILURE, payload: handleError },
    ],
  });

export const userSignIn = (user) =>
  createAction({
    endpoint: "https://my7.io/api/api.php",
    method: "POST",
    body: handleSingIn(user),
    // headers: { "Content-Type": "multipart/form-data" },
    types: [
      { type: USER_SIGN_IN },
      {
        type: USER_SIGN_IN_SUCCESS,
        payload: (action, state, res) => handleResponse(action, state, res),
      },
      { type: USER_SIGN_IN_FAILURE, payload: handleError },
    ],
  });
