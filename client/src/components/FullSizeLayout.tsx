import React from 'react';
import styled from 'styled-components';

interface FullSizeLayoutProps {
  children: React.ReactNode
}

const StyledFullSizeLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

const FullSizeLayout: React.FC<FullSizeLayoutProps> = (
  {
    children
  }
) => (
  <StyledFullSizeLayout>
    {children}
  </StyledFullSizeLayout>
);

export default FullSizeLayout;
