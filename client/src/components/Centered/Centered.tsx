import React from 'react';
import classes from './Centered.module.less';

interface CenteredProps {
  children: React.ReactNode;
}

const Centered: React.FC<CenteredProps> = (
  {
    children
  }
) => (
  <div
    className={classes.centered}
  >
    {children}
  </div>
);

export default Centered;
