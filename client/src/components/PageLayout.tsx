import React from 'react';

import FullSizeLayout from './FullSizeLayout/FullSizeLayout';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = (
  {
    children
  }
) => (
  <FullSizeLayout>
    <Navbar/>
    {children}
  </FullSizeLayout>
);

export default PageLayout;
