import React from 'react';

import Layout from '../../components/Layout/Layout';
import Centered from '../../components/Centered/Centered';
import TitleBox from '../../components/TitleBox/TitleBox';
import SearchBar from '../../components/SearchBar/SearchBar';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => (
  <Layout>
    <Centered>
      <TitleBox/>
      <SearchBar/>
    </Centered>
  </Layout>
);

export default LandingPage;
