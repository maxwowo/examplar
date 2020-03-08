import React from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';

import classes from './PageContent.module.less';

interface PageContentProps extends React.HTMLAttributes<HTMLElement> {

}

const PageContent: React.FC<PageContentProps> = (
  {
    children,
    className
  }
) => (
  <Layout.Content
    className={classNames(className, classes.pageContent)}
  >
    {children}
  </Layout.Content>
);

export default PageContent;
