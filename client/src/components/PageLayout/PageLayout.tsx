import React from 'react';

import Navbar from '../Navbar/Navbar';
import FullPage, { FullPageProps } from '../FullPage/FullPage';
import PageContent from '../PageContent/PageContent';

interface PageLayoutProps extends FullPageProps {

}

const PageLayout: React.FC<PageLayoutProps> = (
  {
    fixedHeight,
    children
  }
) => (
  <FullPage
    fixedHeight={fixedHeight}
  >
    <Navbar/>
    <PageContent>
      {children}
    </PageContent>
  </FullPage>
);

export default PageLayout;
