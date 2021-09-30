import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import axios from "axios";

import {
  isAuthenticated,
  requestHeader,
  setLocalStorage,
} from "./utils/AuthUtil";

axios.defaults.baseURL = "http://localhost:8080";

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
    console.log("[REQ](ERR): ", error);
    return Promise.reject(error);
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
    console.log("[RES](ERR): ", error);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
