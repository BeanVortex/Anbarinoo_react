/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext } from "react";
import axios from "axios";
import { BaseUrl } from "../index";
import {
  clearLocalStorage,
  getAuthLocalData,
  setLocalStorage,
} from "../utils/AuthUtil";

const userAuthInitial = {
  accessToken: "",
  refreshToken: "",
  authenticated: false,
  refreshExpiration: null,
};
const userInfoInitial = {
  username: "",
  profile: "",
  email: "",
};

export const AuthContext = createContext();
export const UserInfoContext = createContext();

const saveHeaders = (res) => {
  setLocalStorage("refresh_token", res.headers.refresh_token);
  setLocalStorage("access_token", res.headers.access_token);
  setLocalStorage("refresh_expiration", res.headers.refresh_expiration);
};

export default (props) => {
  const [userAuth, setUserAuth] = useState(userAuthInitial);
  const [userInfo, setUserInfo] = useState(userInfoInitial);

  const login = (username, password) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((res) => {
        saveHeaders(res);
        setUserAuth({
          accessToken: res.headers.access_token,
          refreshToken: res.headers.refresh_token,
          authenticated: true,
          refreshExpiration: res.headers.refresh_expiration,
        });
        setUserInfo({
          username: res.data.userName,
          profile: BaseUrl + "/user/profile_images/" + res.data.profileImage,
          email: res.data.email,
        });
      });
    //catching error in auth component
  };

  const signup = (email, username, password) => {
    const data = new FormData();
    data.append("email", email);
    data.append("userName", username);
    data.append("password", password);
    data.append("passwordRepeat", password);

    axios({
      url: "/api/user/signup/",
      method: "POST",
      data: data,
    }).then((res) => {
      saveHeaders(res);
      setUserAuth({
        accessToken: res.headers.access_token,
        refreshToken: res.headers.refresh_token,
        authenticated: true,
        refreshExpiration: res.headers.refresh_expiration,
      });
      setUserInfo({
        username: res.data.userName,
        profile:  BaseUrl + "/user/profile_images/" + res.data.profileImage,
        email: res.data.email,
      });
    });
    //catching error in auth component
  };

  const mapAuthToContext = () => {
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
    setUserAuth(userAuthInitial);
    setUserInfo(userInfoInitial);
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        setUserAuth,
        userInfo,
        setUserInfo,
        login,
        signup,
        logout,
        mapAuthToContext,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
