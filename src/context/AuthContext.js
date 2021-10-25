/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext } from "react";
import axios from "axios";
import {
  clearLocalStorage,
  getAuthLocalData,
  setLocalStorage,
} from "../utils/AuthUtil";
import { loginUrl, signupUrl, baseUserProfileImageUrl } from "../resources/ApiUrls";

const userAuthInitial = {
  accessToken: "",
  refreshToken: "",
  refreshExpiration: null,
};
const userInfoInitial = {
  id: null,
  username: "",
  profile: "",
  email: "",
};
const isAuthedInitial = false;

export const AuthContext = createContext({
  userAuth: userAuthInitial,
  setUserAuth: () => {},
  userInfo: userInfoInitial,
  setUserInfo: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
  mapAuthToContext: () => {},
  isAuthed: isAuthedInitial,
  setIsAuthed: () => {},
});

const saveHeaders = (res) => {
  setLocalStorage("refresh_token", res.headers.refresh_token);
  setLocalStorage("access_token", res.headers.access_token);
  setLocalStorage("refresh_expiration", res.headers.refresh_expiration);
};

export default (props) => {
  const [userAuth, setUserAuth] = useState(userAuthInitial);
  const [userInfo, setUserInfo] = useState(userInfoInitial);
  const [isAuthed, setIsAuthed] = useState(isAuthedInitial);

  const login = async (username, password) => {
    let res = await axios
      .post(loginUrl, {
        username,
        password,
      })
      .then((res) => {
        saveHeaders(res);
        setUserAuth({
          accessToken: res.headers.access_token,
          refreshToken: res.headers.refresh_token,
          refreshExpiration: res.headers.refresh_expiration,
        });
        setIsAuthed(true);
        setUserInfo({
          id: res.data.id,
          username: res.data.userName,
          profile: baseUserProfileImageUrl + res.data.profileImage,
          email: res.data.email,
        });
      });
    return res;
    //catching error in auth component
  };

  const signup = async (email, username, password) => {
    const data = new FormData();
    data.append("email", email);
    data.append("userName", username);
    data.append("password", password);
    data.append("passwordRepeat", password);

    let res = await axios({
      url: signupUrl,
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
      setIsAuthed(true);
      setUserInfo({
        username: res.data.userName,
        profile: baseUserProfileImageUrl + res.data.profileImage,
        email: res.data.email,
      });
    });
    return res;
    //catching error in auth component
  };

  const mapAuthToContext = () => {
    const payload = getAuthLocalData();
    setUserAuth({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      refreshExpiration: payload.refreshExpiration,
    });
    setIsAuthed(true);
  };

  const logout = () => {
    clearLocalStorage();
    setUserAuth(userAuthInitial);
    setUserInfo(userInfoInitial);
    setIsAuthed(isAuthedInitial);
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
        isAuthed,
        setIsAuthed,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
