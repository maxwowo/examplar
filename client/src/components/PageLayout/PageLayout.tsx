import React from 'react';

import Navbar from '../Navbar/Navbar';
import FullPage from '../FullPage/FullPage';

interface PageLayoutProps extends React.HTMLAttributes<HTMLElement> {

}

const PageLayout: React.FC<PageLayoutProps> = (
  {
    children
  }
) => (
  <FullPage>
    <Navbar/>
    {children}
  </FullPage>
);

export default PageLayout;
