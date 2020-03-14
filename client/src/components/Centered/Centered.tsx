import React from 'react';
import classNames from 'classnames';
import classes from './Centered.module.less';

interface CenteredProps extends React.HTMLAttributes<HTMLElement> {

}

const Centered: React.FC<CenteredProps> = (
  {
    children,
    className
  }
) => (
  <div
    className={
      classNames(
        classes.centered,
        className
      )
    }
  >
    <div>
      {children}
    </div>
  </div>
);

export default Centered;
