// This module is used to put all axios configurations in it

import axios from 'axios'
import logger from "./logService"

axios.interceptors.response.use(null, error => {
  const expectedError = error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // If any unexpected errors thrown while calling the backend
  if (!expectedError) {
    logger.log(error)
    alert("An unexpected error occured");

  }

  return Promise.reject(error);
})

// put the jwt in the header of the request because this is required
// by the backend in certain routes
function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};