import React from 'react';
import 'katex/dist/katex.min.css';
import LatexNext from 'react-latex-next';

import classes from './Latex.module.less';

interface LatexProps {
  children?: string;
}

const Latex: React.FC<LatexProps> = (
  {
    children
  }
) => (
  <div
    className={classes.latex}
  >
    <LatexNext
      delimiters={
        [
          {
            left: '\\(',
            right: '\\)',
            display: false
          },
          {
            left: '\\[',
            right: '\\]',
            display: true
          }
        ]
      }
    >
      {children}
    </LatexNext>
  </div>
);

export default Latex;
