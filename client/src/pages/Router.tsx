import React, { FC } from 'react';
import Landing from './Landing/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './NotFound/NotFound';

interface RouterProps {

}

const Router: FC<RouterProps> = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/`}
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
