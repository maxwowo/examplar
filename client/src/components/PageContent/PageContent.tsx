import React from 'react';
import classNames from 'classnames';

import classes from './PageContent.module.less';

interface PageContentProps extends React.HTMLAttributes<HTMLElement> {

}

const PageContent: React.FC<PageContentProps> = (
  {
    children,
    className
  }
) => (
  <div
    className={classNames(className, classes.pageContent)}
  >
    {children}
  </div>
);

export default PageContent;
