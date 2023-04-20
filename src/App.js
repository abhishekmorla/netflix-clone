import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import List from "./List";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup} />{" "}
        <Route path="/list" component={List} />{" "}
      </Switch>{" "}
    </Router>
  );
};

export default App;
