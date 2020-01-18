import React from 'react';

import Layout from '../../components/Layout/Layout';
import Centered from '../../components/Centered/Centered';
import TitleBox from './TitleBox/TitleBox';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <Layout>
      <Centered>
        <TitleBox/>
      </Centered>
    </Layout>
  );
};

export default LandingPage;
