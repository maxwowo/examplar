import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './LandingPage/LandingPage';
import SearchPage from './SearchPage/SearchPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import CoursePage from './CoursePage/CoursePage';

interface RouterProps {

}

const Router: React.FC<RouterProps> = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path='/'
        component={Landing}
      />
      <Route
        path='/search'
        component={SearchPage}
      />
      <Route
        path='/courses/:courseId'
        component={CoursePage}
      />
      <Route
        path='*'
        component={NotFoundPage}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
