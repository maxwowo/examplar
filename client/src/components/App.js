/* React */
import React, { Component } from "react";

/* React router */
import { BrowserRouter as Router } from "react-router-dom";

/* Ant Design components */
import { Layout } from "antd";

/* Navbar */
import Navbar from "./Navbar/Navbar";

/* React Router Routes */
import Routes from "../Routes";

/* Script loader */
import LoadScript from "load-script";

/* Styles */
import "./App.less";

const MATHJAX_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";

const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]]
  },
  showMathMenu: false,
  showMathMenuMSIE: false
};

class App extends Component {

  componentWillMount() {
    LoadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });
  }

  render() {
    return (
      <Router>
        <Layout id="app-layout">
          <Navbar/>
          <Layout>
            <Routes/>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
