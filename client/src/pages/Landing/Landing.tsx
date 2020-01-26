import React from 'react';

import Layout from '../../components/Layout/Layout';
import Centered from '../../components/Centered/Centered';
import TitleBox from '../../components/TitleBox/TitleBox';
import SearchBox from '../../components/SearchBox/SearchBox';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <Layout>
      <Centered>
        <div>
          <TitleBox/>
          <SearchBox/>
        </div>
      </Centered>
    </Layout>
  );
};

export default LandingPage;
