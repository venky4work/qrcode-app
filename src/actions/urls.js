import { createAction } from "redux-api-middleware";

export const CREATE_URL = "CREATE_URL";
export const CREATE_URL_SUCCESS = "CREATE_URL_SUCCESS";
export const CREATE_URL_FAILURE = "CREATE_URL_FAILURE";

export const DELETE_URL = "DELETE_URL";
export const DELETE_URL_SUCCESS = "DELETE_URL_SUCCESS";
export const DELETE_URL_FAILURE = "DELETE_URL_FAILURE";

export const LIST_URL = "LIST_URL";
export const LIST_URL_SUCCESS = "LIST_URL_SUCCESS";
export const LIST_URL_FAILURE = "LIST_URL_FAILURE";

export const UPDATE_URL = "UPDATE_URL";
export const UPDATE_URL_SUCCESS = "UPDATE_URL_SUCCESS";
export const UPDATE_URL_FAILURE = "UPDATE_URL_FAILURE";

const handleResponse = (action, state, res) => {
  // console.log(res.json());
  return res.json();
};

const handleError = (action, state, res) => {
  console.log(res.json());
};

const handleCreateUrlData = (data) => {
  var formData = new FormData();
  formData.append("action", "addUrl");
  formData.append("url", data.url);
  formData.append("title", data.title);
  return formData;
};

const handleDeleteUrlData = (data) => {
  var formData = new FormData();
  formData.append("action", "deleteUrl");
  formData.append("id", data.id);
  return formData;
};
const handleListUrlData = (data) => {
  var formData = new FormData();
  formData.append("action", "listUrls");
  return formData;
};
const handleUpdateUrlData = (data) => {
  var formData = new FormData();
  formData.append("action", "updateUrl");
  formData.append("title", data.title);
  formData.append("id", data.id);
  formData.append("url", data.url);
  return formData;
};

export const createUrl = (data) =>
  createAction({
    endpoint: "https://my7.io/api/api.php",
    method: "POST",
    body: handleCreateUrlData(data),
    types: [
      { type: CREATE_URL },
      {
        type: CREATE_URL_SUCCESS,
        payload: (action, state, res) => handleResponse(action, state, res),
      },
      { type: CREATE_URL_FAILURE, payload: handleError },
    ],
  });

export const deleteUrl = (data) =>
  createAction({
    endpoint: "https://my7.io/api/api.php",
    method: "POST",
    body: handleDeleteUrlData(data),
    // headers: { "Content-Type": "multipart/form-data" },
    types: [
      { type: DELETE_URL },
      {
        type: DELETE_URL_SUCCESS,
        payload: (action, state, res) => handleResponse(action, state, res),
      },
      { type: DELETE_URL_FAILURE, payload: handleError },
    ],
  });

export const listUrl = (data) =>
  createAction({
    endpoint: "https://my7.io/api/api.php",
    method: "POST",
    body: handleListUrlData(data),
    // headers: { "Content-Type": "multipart/form-data" },
    types: [
      { type: LIST_URL },
      {
        type: LIST_URL_SUCCESS,
        payload: (action, state, res) => handleResponse(action, state, res),
      },
      { type: LIST_URL_FAILURE, payload: handleError },
    ],
  });

export const updateUrl = (data) =>
  createAction({
    endpoint: "https://my7.io/api/api.php",
    method: "POST",
    body: handleUpdateUrlData(data),
    // headers: { "Content-Type": "multipart/form-data" },
    types: [
      { type: UPDATE_URL },
      {
        type: UPDATE_URL_SUCCESS,
        payload: (action, state, res) => handleResponse(action, state, res),
      },
      { type: UPDATE_URL_FAILURE, payload: handleError },
    ],
  });
