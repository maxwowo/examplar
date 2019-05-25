/* React */
import React from "react";

/* React router */
import { Route, Switch } from "react-router-dom";

/* All the pages */
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import CoursePage from "./components/CoursePage/CoursePage";
import PageNotFoundPage from "./components/PageNotFoundPage/PageNotFoundPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/search" component={SearchPage}/>
    <Route path="/courses/:id" component={CoursePage}/>
    <Route path="*" component={PageNotFoundPage}/>
  </Switch>
);

export default Routes;