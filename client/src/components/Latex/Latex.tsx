import React from 'react';

import classes from './Latex.module.less';

interface LatexProps {

}

const Latex: React.FC<LatexProps> = (
  {
    children
  }
) => {
  const renderMathJax = () => {
    (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub]);
  };

  React.useEffect(
    () => {
      renderMathJax();
    },
    []
  );

  // renderMathJax();

  return (
    <p
      className={classes.latex}
    >
      {children}
    </p>
  );
};

export default Latex;
