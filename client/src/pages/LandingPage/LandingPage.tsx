import React from 'react';

import PageLayout from '../../components/PageLayout/PageLayout';
import Centered from '../../components/Centered/Centered';
import TitleBox from '../../components/TitleBox/TitleBox';
import SearchBar from '../../components/SearchBar/SearchBar';
import PageContent from '../../components/PageContent/PageContent';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => (
  <PageLayout>
    <PageContent>
      <Centered>
        <TitleBox/>
        <SearchBar/>
      </Centered>
    </PageContent>
  </PageLayout>
);

export default LandingPage;
