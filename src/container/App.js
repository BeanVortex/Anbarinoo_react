import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Home from "./Home/Home";
import { AuthContext } from "../context/AuthContext";
import {
  isAuthenticated as isAuthenticatedInLocal,
  isTokenExpired as isLocalTokenExpired,
} from "../utils/AuthUtil";
import Auth from "./Auth/Auth";
import "./App.scss";
import axios from "axios";
import { BaseUrl } from "../index";
import AddProduct from "./Product/AddProduct/AddProduct";
import Nav from "../components/nav/Nav";

const App = () => {
  const { userInfo, setUserInfo, logout, userAuth, mapAuthToContext } =
    useContext(AuthContext);
  const [isAuthed, setIsAuthed] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!userAuth.authenticated && isAuthenticatedInLocal()) {
      mapAuthToContext();
    }
    if (!userAuth.authenticated && !isAuthenticatedInLocal()) {
      setIsAuthed(false);
    }
  }, [userAuth, isAuthed, setIsAuthed, mapAuthToContext]);

  useEffect(() => {
    if (!userInfo.username && !userInfo.img && !userAuth.authenticated) {
      if (isAuthenticatedInLocal() && !isLocalTokenExpired()) {
        axios.get("/api/user/info/").then((res) => {
          setUserInfo({
            username: res.data.userName,
            profile: BaseUrl + "/user/profile_images/" + res.data.profileImage,
            email: res.data.email,
          });
        });
      } else {
        setIsAuthed(false);
        logout();
        history.push("/auth");
      }
    }
  }, [history, logout, setUserInfo, userAuth, userInfo]);

  return (
    <>
      <Nav />
      {isAuthed ? null : <Redirect to="/auth" />}
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Auth} />
        <Route path="/new-product" exact component={AddProduct} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
