import React from 'react';
import 'katex/dist/katex.min.css';
import LatexNext from 'react-latex-next';

interface LatexProps {
  children?: string;
}

const Latex: React.FC<LatexProps> = (
  {
    children
  }
) => (
  <LatexNext>
    {children}
  </LatexNext>
);

export default Latex;