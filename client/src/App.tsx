import React from 'react';

import FullPage from './components/FullPage/FullPage';
import Router from './pages/Router';

const App: React.FC = () => (
  <FullPage>
    <Router/>
  </FullPage>
);

export default App;
