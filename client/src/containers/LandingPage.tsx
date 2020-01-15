import React from 'react';

import Layout from '../components/Layout';
import Centered from '../components/Centered';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <Layout>
      <Centered>
        hello
      </Centered>
    </Layout>
  );
};

export default LandingPage;
