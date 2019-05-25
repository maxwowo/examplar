/* React */
import React from "react";

/* React router */
import { BrowserRouter as Router } from "react-router-dom";

/* Ant Design components */
import { Layout } from "antd";

/* Navbar */
import Navbar from "./Navbar/Navbar";

/* React Router Routes */
import Routes from "../Routes";

/* Styles */
import "./App.less";

const App = () => (
  <Router>
    <Layout id="app-layout">
      <Navbar/>
      <Layout>
        <Routes/>
      </Layout>
    </Layout>
  </Router>
);

export default App;
