import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import classes from './Latex.module.less';

interface LatexProps {

}

class Latex extends Component<LatexProps> {

  renderMathJax = () => {
    const curr = ReactDOM.findDOMNode(this);
    (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub, curr]);
  };

  componentDidUpdate(): void {
    this.renderMathJax();
  }

  componentDidMount(): void {
    this.renderMathJax();
  }

  render(): React.ReactElement {
    return (
      <p
        className={classes.latex}
      >
        {this.props.children}
      </p>
    );
  }
}

export default Latex;
