import React from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';

import classes from './FullPage.module.less';

export interface FullPageProps extends React.HTMLAttributes<HTMLElement> {
  fixedHeight?: boolean;
}

const FullPage: React.FC<FullPageProps> = (
  {
    fixedHeight,
    children
  }
) => (
  <Layout
    className={
      classNames(
        classes.fullPage,
        fixedHeight ? classes.fixedHeight : null
      )
    }
  >
    {children}
  </Layout>
);

export default FullPage;
