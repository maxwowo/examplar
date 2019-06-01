/* React */
import React, { Component } from "react";
import ReactDOM from "react-dom";

class SolutionContent extends Component {

  renderMathJax = () => {
    const currentNode = ReactDOM.findDOMNode(this);
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, currentNode]);
  };

  componentDidMount() {
    this.renderMathJax();
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.content}}/>
    )
  }
}

export default SolutionContent;
