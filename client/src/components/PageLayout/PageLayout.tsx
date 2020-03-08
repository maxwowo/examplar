import React from 'react';

import Navbar from '../Navbar/Navbar';
import FullPage from '../FullPage/FullPage';
import PageContent from '../PageContent/PageContent';

interface PageLayoutProps extends React.HTMLAttributes<HTMLElement> {

}

const PageLayout: React.FC<PageLayoutProps> = (
  {
    children
  }
) => (
  <FullPage>
    <Navbar/>
    <PageContent>
      {children}
    </PageContent>
  </FullPage>
);

export default PageLayout;
