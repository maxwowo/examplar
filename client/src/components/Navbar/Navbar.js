/* React */
import React from 'react';

/* Ant Design components */
import {Layout, Typography} from "antd";

/* Styles */
import styles from "./Navbar.module.css";

const {Header} = Layout;
const {Title} = Typography;

const Navbar = () => (
  <Layout>
    <Header className={styles.header}>
      <Typography>
        <Title>Examplar</Title>
      </Typography>
    </Header>
  </Layout>
);

export default Navbar;