import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';

const StyledLayout = styled.div`
  height: 100vh;
  width: 100vw;
`;

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (
  {
    children
  }
) => (
  <StyledLayout>
    <Navbar/>
    <div>
      {children}
    </div>
  </StyledLayout>
);

export default Layout;
