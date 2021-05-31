import { Redirect } from "react-router-dom";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

// HTTP HEADERS ARE CASE INSENSITIVE
export const requestHeader = () => {
  const access_token = getLocalStorage("access_token");
  const refresh_token = getLocalStorage("refresh_token");
  return {
    access_token,
    refresh_token,
  };
};

export const isAuthenticated = () => {
  return getLocalStorage("refresh_token") && getLocalStorage("access_token");
};

export const redirect = (auth) => {
  let r = null;
  if (!auth) {
    r = <Redirect from="/" to="/login" />;
    if (isAuthenticated() && !isTokenExpired()) r = null;
  }
  return r;
};

const isTokenExpired = () => {
  let expireDate = new Date(getLocalStorage("expiration"));
  if (new Date().getTime() > expireDate.getTime()) {
    clearLocalStorage();
    return true;
  }
  return false;
};

export const clearLocalStorage = () => {
  if (isAuthenticated()) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiration");
  }
};

export const getAuthLocalData = () => {
  return {
    refreshToken: localStorage.getItem("refresh_token"),
    accessToken: localStorage.getItem("access_token"),
  };
};
