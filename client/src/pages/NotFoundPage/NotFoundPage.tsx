import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import Space from '../../components/Space/Space';
import classes from './NotFoundPage.module.less';

const { Title, Text } = Typography;

interface NotFoundProps {

}

const NotFoundPage: React.FC<NotFoundProps> = () => (
  <div
    className={classes.notFound}
  >
    <section
      className={classes.textSection}
    >
      <div>
        <Title
          className={classes.title}
        >
          404
        </Title>
        <Text
          className={classes.description}
        >
          Page not found,
          <Space/>
          <Link
            to='/'
          >
            go back home
          </Link>
          .
        </Text>
      </div>
    </section>
  </div>
);

export default NotFoundPage;
