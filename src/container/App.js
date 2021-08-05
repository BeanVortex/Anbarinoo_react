import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../components/home/Home';
import Categories from "../components/nav/categories/Categories";
import Settings from "../components/nav/settings/Settings";
import Statistics from "../components/nav/statistics/Statistics";

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/categories" exact component={Categories}/>
          <Route path="/statistics" exact component={Settings}/>
          <Route path="/settings" exact component={Statistics}/>
        </Switch>
      </div>
    );
  }
}


export default App;
