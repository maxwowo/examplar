import React from 'react';
import { Layout } from 'antd';
import styles from './FullSizeLayout.module.less'

interface FullSizeLayoutProps {
  children: React.ReactNode;
}

const FullSizeLayout: React.FC<FullSizeLayoutProps> = (
  {
    children
  }
) => (
  <Layout
    className={styles.FullSizeLayout}
  >
    {children}
  </Layout>
);

export default FullSizeLayout;
