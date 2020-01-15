import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledTitle = styled(Typography)`
  flex-grow: 1;
`;

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => (
  <AppBar
    position="static"
  >
    <Toolbar>
      <StyledTitle
        variant="h4"
      >
        Examplar
      </StyledTitle>
      <Button
        color="inherit"
      >
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
