import React from 'react';
import { Typography } from 'antd';

import classes from './TitleBox.module.less';

const { Title, Text } = Typography;

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
      {' '}
      <Text
        className={classes.examplar}
      >
        Exam
      </Text>
      plar
    </Title>
    <Title
      level={4}
      className={classes.description}
    >
      The best solutions written by your fellow students, organized into one place.
    </Title>
  </div>
);

export default TitleBox;
