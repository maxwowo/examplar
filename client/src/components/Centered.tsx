import React from 'react';
import styled from 'styled-components';

const StyledCentered = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

interface CenteredProps {
  children: React.ReactNode;
}

const Centered: React.FC<CenteredProps> = (
  {
    children
  }
) => (
  <StyledCentered>
    {children}
  </StyledCentered>
);

export default Centered;
