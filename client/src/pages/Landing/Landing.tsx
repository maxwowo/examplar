import React from 'react';

import Layout from '../../components/Layout/Layout';
import Centered from '../../components/Centered/Centered';

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
