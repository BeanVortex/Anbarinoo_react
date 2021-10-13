import React, { useEffect, useContext } from "react";
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
  const { userInfo, setUserInfo, logout, mapAuthToContext, isAuthed, setIsAuthed } =
    useContext(AuthContext);

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
    if (!userInfo.username && !userInfo.img && !isAuthed) {
      if (isAuthenticatedInLocal() && !isLocalTokenExpired()) {
        axios
          .get("/api/user/info/")
          .then((res) => {
            setUserInfo({
              username: res.data.userName,
              profile:
                BaseUrl + "/user/profile_images/" + res.data.profileImage,
              email: res.data.email,
            });
            setIsAuthed(true);
          })
          .catch(() => {
            setIsAuthed(false);
            logout();
            history.push("/auth");
          });
      } else {
        setIsAuthed(false);
        logout();
        history.push("/auth");
      }
    }
  }, [history, isAuthed, logout, setIsAuthed, setUserInfo, userInfo]);

  console.log("body");
  return (
    <>
      {isAuthed ? <Nav /> : null}
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
