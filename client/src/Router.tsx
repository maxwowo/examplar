import React, { FC } from 'react';
import Landing from './pages/Landing/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './pages/NotFound/NotFound';

interface RouterProps {

}

const Router: FC<RouterProps> = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path='/'
        component={Landing}
      />
      <Route
        path='*'
        component={NotFound}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
