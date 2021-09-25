import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
// import Categories from "../components/nav/categories/Categories";
// import Settings from "../components/nav/settings/Settings";
// import Statistics from "../components/nav/statistics/Statistics";
import { AuthContext } from "../context/AuthContext";
import { isAuthenticated } from "../utils/AuthUtil";
import Login from "./Login/Login";
import "./App.scss";

const App = (props) => {
  const { userAuth, mapAuthToContext } = useContext(AuthContext);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (!userAuth.authenticated && isAuthenticated()) {
      mapAuthToContext();
      setIsAuthed(true);
    }
    if (!userAuth.authenticated && !isAuthenticated()) {
      setIsAuthed(false);
    }
  }, [userAuth, mapAuthToContext, isAuthed, setIsAuthed]);
  console.log(props);

  return (
    <div>
      {isAuthed ? null : <Redirect to="/auth" />}
      <Switch>
        <Route path="/auth" component={Login} />
        {/* <Route path="/categories" exact component={Categories} />
        <Route path="/statistics" exact component={Settings} />
      <Route path="/settings" exact component={Statistics} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
