/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext } from "react";
import axios from "axios";
import {
  clearLocalStorage,
  getAuthLocalData,
  setLocalStorage,
} from "../utils/AuthUtil";

const initialState = {
  username: "",
  email: "",
  profile: "",
  accessToken: "",
  refreshToken: "",
  authenticated: false,
  refreshExpiration: null,
};

export const AuthContext = createContext({
  userAuth: initialState,
});

const saveHeaders = (res) => {
  setLocalStorage("refresh_token", res.headers.refresh_token);
  setLocalStorage("access_token", res.headers.access_token);
  setLocalStorage("refresh_expiration", res.headers.refresh_expiration);
  setLocalStorage("access_expiration", res.headers.access_expiration);
};

export default (props) => {
  const [userAuth, setUserAuth] = useState(initialState);

  const login = (username, password) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((res) => {
        saveHeaders(res);
        setUserAuth({
          username: res.data.userName,
          email: res.data.email,
          profile: res.data.profile,
          accessToken: res.headers.access_token,
          refreshToken: res.headers.refresh_token,
          authenticated: true,
          refreshExpiration: res.headers.refresh_expiration,
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const signup = (email, username, password) => {
    const data = new FormData();
    data.append("email", email);
    data.append("userName", username);
    data.append("password", password);

    axios({
      url: "/api/user/signup/",
      method: "POST",
      data: data,
    })
      .then((res) => {
        saveHeaders(res);
        setUserAuth({
          username: res.data.userName,
          email: res.data.email,
          profile: res.data.profile,
          accessToken: res.headers.access_token,
          refreshToken: res.headers.refresh_token,
          authenticated: true,
          refreshExpiration: res.headers.refresh_expiration,
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const mapAuthToState = () => {
    const payload = getAuthLocalData();
    setUserAuth({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      refreshExpiration: payload.refreshExpiration,
      authenticated: true,
    });
  };

  const logout = () => {
    clearLocalStorage();
    setUserAuth(initialState);
  };

  return (
    <AuthContext.Provider
      value={{ userAuth, setUserAuth, login, signup, logout, mapAuthToState }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
