import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
// import Categories from "../components/nav/categories/Categories";
// import Settings from "../components/nav/settings/Settings";
// import Statistics from "../components/nav/statistics/Statistics";
import { AuthContext } from "../context/AuthContext";
import { isAuthenticated as isAuthenticatedInLocal } from "../utils/AuthUtil";
import Auth from "./Auth/Auth";
import "./App.scss";

const App = () => {
  const { userAuth, mapAuthToContext } = useContext(AuthContext);
  const [isAuthed, setIsAuthed] = useState(true);

  useEffect(() => {
    if (!userAuth.authenticated && isAuthenticatedInLocal()) {
      console.log(":s");
      mapAuthToContext();
    }
    if (!userAuth.authenticated && !isAuthenticatedInLocal()) {
      setIsAuthed(false);
    }
  }, [userAuth, isAuthed, setIsAuthed, mapAuthToContext]);

  return (
    <>
      {isAuthed ? null : <Redirect to="/auth" />}
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Auth} />
        {/* <Route path="/categories" exact component={Categories} />
        <Route path="/statistics" exact component={Settings} />
      <Route path="/settings" exact component={Statistics} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
