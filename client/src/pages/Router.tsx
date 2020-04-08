import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './LandingPage/LandingPage';
import SearchPage from './SearchPage/SearchPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import CoursePage from './CoursePage/CoursePage';
import ExamPage from './ExamPage/ExamPage';
import ExamEditPage from '../components/ExamEditPage/ExamEditPage';
import ActivationPage from './ActivationPage/ActivationPage';

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
        exact
        path='/exams/:examId'
        component={ExamPage}
      />
      <Route
        exact
        path='/exams/:examId/edit'
        component={ExamEditPage}
      />
      <Route
        path='/email/validate/:token'
        component={ActivationPage}
      />
      <Route
        path='*'
        component={NotFoundPage}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
