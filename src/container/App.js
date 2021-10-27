import React, { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import Home from "./Home/Home";
import { AuthContext } from "../context/AuthContext";
import {
  isAuthenticated as isAuthenticatedInLocal,
  isTokenExpired as isLocalTokenExpired,
} from "../utils/AuthUtil";
import Auth from "./Auth/Auth";
import axios from "axios";
import AddProduct from "./Product/AddProduct/AddProduct";
import Nav from "../components/nav/Nav";
import "./App.scss";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import { getUserInfoUrl, baseUserProfileImageUrl } from "../utils/ApiUrls";

const App = () => {
  const {
    userInfo,
    setUserInfo,
    logout,
    mapAuthToContext,
    isAuthed,
    setIsAuthed,
  } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (!isAuthed && isAuthenticatedInLocal()) {
      mapAuthToContext();
    }
    if (!isAuthed && !isAuthenticatedInLocal()) {
      setIsAuthed(false);
    }
  }, [isAuthed, setIsAuthed, mapAuthToContext]);

  useEffect(() => {
    const logoutAndDeleteData = () => {
      setIsAuthed(false);
      logout();
      history.push("/auth");
    };

    if (!userInfo.username && !userInfo.profile && !isAuthed) {
      if (isAuthenticatedInLocal()) {
        if (!isLocalTokenExpired()) {
          axios
            .get(getUserInfoUrl)
            .then((res) => {
              setUserInfo({
                username: res.data.userName,
                profile: baseUserProfileImageUrl + res.data.profileImage,
                email: res.data.email,
              });
              setIsAuthed(true);
            })
            .catch(() => logoutAndDeleteData());
        } else logoutAndDeleteData();
      } else logoutAndDeleteData();
    }
  }, [history, isAuthed, logout, setIsAuthed, setUserInfo, userInfo]);

  return (
    <>
    <Helmet>
      <title>انبارینو</title>
    </Helmet>
      {isAuthed ? <Nav /> : null}
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Auth} />
        <Route path="/new-product" exact component={AddProduct} />
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
};

export default App;
