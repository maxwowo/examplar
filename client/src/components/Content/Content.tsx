import React from 'react';
import classNames from 'classnames';

import classes from './Content.module.less';

interface ContentProps extends React.HTMLAttributes<HTMLElement> {

}

const Content: React.FC<ContentProps> = (
  {
    children,
    className
  }
) => (
  <div
    className={classNames(className, classes.content)}
  >
    {children}
  </div>
);

export default Content;
