import React from 'react';

import { getAllUniversities } from '../agents/university';

import FullPage from '../components/FullPage/FullPage';
import Router from '../pages/Router';
import { ClientError } from '../agents/client';

const App: React.FC = () => {
  getAllUniversities().then(res => console.log(res)).catch((err: ClientError) => console.log(err));
  return (
    <FullPage>
      <Router/>
    </FullPage>
  );
};

export default App;
