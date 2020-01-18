import React from 'react';
import Navbar from '../Navbar/Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<PageLayoutProps> = (
  {
    children
  }
) => (
  <React.Fragment>
    <Navbar/>
    {children}
  </React.Fragment>
);

export default Layout;
