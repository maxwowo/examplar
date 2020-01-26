import React from 'react';
import classNames from 'classnames';
import classes from './Centered.module.less';

interface CenteredProps {
  children: React.ReactNode;
  className?: string;
}

const Centered: React.FC<CenteredProps> = (
  {
    children,
    className
  }
) => (
  <div
    className={classNames(
      classes.centered,
      className
    )}
  >
    <div>
      {children}
    </div>
  </div>
);

export default Centered;
