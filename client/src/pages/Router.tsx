import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './LandingPage/LandingPage';
import SearchPage from './SearchPage/SearchPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

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
        path={`${process.env.PUBLIC_URL}/search`}
        component={SearchPage}
      />
      <Route
        path='*'
        component={NotFoundPage}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
