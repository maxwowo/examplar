import React from 'react';
import { Layout } from 'antd';

import classes from './FullPage.module.less';

interface FullPageProps {
  children: React.ReactNode;
}

const FullPage: React.FC<FullPageProps> = (
  {
    children
  }
) => (
  <Layout
    className={classes.fullPage}
  >
    {children}
  </Layout>
);

export default FullPage;
