import React from 'react';

import PageLayout from '../../components/PageLayout/PageLayout';
import Centered from '../../components/Centered/Centered';
import TitleBox from '../../components/TitleBox/TitleBox';
import SearchBar from '../../components/SearchBar/SearchBar';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => (
  <PageLayout>
    <Centered>
      <TitleBox/>
      <SearchBar/>
    </Centered>
  </PageLayout>
);

export default LandingPage;
