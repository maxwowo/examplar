import React from 'react';
import Router from '../pages/Router';

const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  showMathMenu: false,
  showMathMenuMSIE: false
};

const App: React.FC = () => {

  (window as any).MathJax.Hub.Config(MATHJAX_OPTIONS);

  return (
    <Router/>
  );
};

export default App;
