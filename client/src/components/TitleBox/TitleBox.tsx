import React from 'react';
import { Typography } from 'antd';

import Logo from '../Logo/Logo';
import Space from '../Space/Space';
import classes from './TitleBox.module.less';

const { Title } = Typography;

interface TitleBoxProps {

}

const TitleBox: React.FC<TitleBoxProps> = () => (
  <div>
    <Title
      level={1}
      ellipsis
      className={classes.title}
    >
      Find your
      <Space/>
      <Logo/>
    </Title>
    <Title
      level={4}
      className={classes.description}
    >
      The best solutions written by students, organized into one place.
    </Title>
  </div>
);

export default TitleBox;
