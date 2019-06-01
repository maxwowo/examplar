/* React */
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Latex extends Component {

  renderMathJax = () => {
    const currentNode = ReactDOM.findDOMNode(this);
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, currentNode]);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.renderMathJax();
  }

  componentDidMount() {
    this.renderMathJax();
  }

  render() {
    return (
      <p>{this.props.content}</p>
    );
  }
}

export default Latex;
