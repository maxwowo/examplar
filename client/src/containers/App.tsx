import React, { FC } from 'react';
import Router from '../Router';
import styled from 'styled-components';

interface AppProps {

}

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
`;

const App: FC<AppProps> = () => (
  <StyledApp>
    <Router/>
  </StyledApp>
);

export default App;
