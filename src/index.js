import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import { BrowserRouter } from "react-router-dom";
import AuthConsumer from "./context/AuthContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "./resources/ApiUrls";
import {
  isAuthenticated,
  requestHeader,
  setLocalStorage,
} from "./utils/AuthUtil";

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  (request) => {
    if (isAuthenticated()) {
      let authHeaders = requestHeader();
      for (let header in authHeaders) {
        request.headers[header] = authHeaders[header];
      }
    }
    console.log("[REQ]: ", request);
    return request;
  },
  (error) => {
    console.log("[REQ](ERR): ", error.response);
    return Promise.reject(error.response);
  }
);

axios.interceptors.response.use(
  (response) => {
    let accessToken = response.headers.access_token;
    let refreshToken = response.headers.refresh_token;
    if (accessToken) setLocalStorage("access_token", accessToken);
    if (refreshToken) setLocalStorage("access_token", refreshToken);

    console.log("[RES]: ", response);
    return response;
  },
  (error) => {
    let accessToken = error.response.headers.access_token;
    let refreshToken = error.response.headers.refresh_token;
    if (accessToken) setLocalStorage("access_token", accessToken);
    if (refreshToken) setLocalStorage("access_token", refreshToken);

    console.log("[RES](ERR): ", error.response);
    return Promise.reject(error.response);
  }
);

ReactDOM.render(
  <AuthConsumer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthConsumer>,
  document.getElementById("root")
);
