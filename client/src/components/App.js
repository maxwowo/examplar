/* React */
import React from "react";

/* React router */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Navbar */
import Navbar from "./Navbar/Navbar";

/* All the pages */
import HomePage from "./HomePage/HomePage";
import PageNotFoundPage from "./PageNotFoundPage/PageNotFoundPage";

/* Styles */
import "./App.less";

const App = () => (
  <Router>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="*" component={PageNotFoundPage}/>
    </Switch>
  </Router>
);

export default App;
