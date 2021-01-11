import axios from 'axios';
import { API_URL } from "../utils/config";
import { authHeader, ConflictException } from "../utils";

export const docsService = {
  createDoc,
  getDocsName,
};

function createDoc(docName) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/docs`, { docName }, { headers: authHeader() })
      .then((resp) => {
        console.log(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
  // const requestOptions = {
  //   method: "POST",
  //   headers: { ...authHeader(), "Content-Type": "application/json" },
  //   body: JSON.stringify(docName),
  // };

  // console.log(requestOptions);

  // return fetch(`${API_URL}/docs`, requestOptions).then(handleResponse);
}

function getDocsName() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  console.log(requestOptions);

  return fetch(`${API_URL}/docs`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === ConflictException) {
        // auto logout if 401 response returned from api
        // logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
