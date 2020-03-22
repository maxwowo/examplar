import React from 'react';
import { BackTop } from 'antd';

import Navbar from '../Navbar/Navbar';
import FullPage, { FullPageProps } from '../FullPage/FullPage';
import PageContent from '../PageContent/PageContent';
import classes from './PageLayout.module.less';

interface PageLayoutProps extends FullPageProps {

}

const PageLayout: React.FC<PageLayoutProps> = (
  {
    fixedHeight,
    children
  }
) => (
  <FullPage
    fixedHeight={fixedHeight}
  >
    <Navbar/>
    <PageContent>
      {children}
    </PageContent>
    <BackTop
      className={classes.backTop}
    />
  </FullPage>
);

export default PageLayout;
