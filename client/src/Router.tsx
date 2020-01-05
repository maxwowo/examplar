import React, { FC } from 'react';
import LandingPage from './containers/LandingPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

interface RouterProps {

}

const Router: FC<RouterProps> = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path='/'
        component={LandingPage}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
