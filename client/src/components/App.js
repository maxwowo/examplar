/* React */
import React from "react";

/* React router */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Ant Design components */
import { Layout } from "antd";

/* Navbar */
import Navbar from "./Navbar/Navbar";

/* All the pages */
import HomePage from "./HomePage/HomePage";
import SearchPage from "./SearchPage/SearchPage";
import CoursePage from "./CoursePage/CoursePage";
import PageNotFoundPage from "./PageNotFoundPage/PageNotFoundPage";

/* Styles */
import "./App.less";

const App = () => (
  <Router>
    <Layout id="app-layout">
      <Navbar/>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/courses/:id" component={CoursePage}/>
          <Route path="*" component={PageNotFoundPage}/>
        </Switch>
      </Layout>
    </Layout>
  </Router>
);

export default App;
