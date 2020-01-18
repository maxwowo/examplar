import React from 'react';
import FullPage from '../FullPage/FullPage';
import Navbar from '../Navbar/Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<PageLayoutProps> = (
  {
    children
  }
) => (
  <FullPage>
    <Navbar/>
    {children}
  </FullPage>
);

export default Layout;
