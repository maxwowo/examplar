import React, { FC } from 'react';
import Landing from './pages/Landing/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
    </Switch>
  </BrowserRouter>
);

export default Router;
