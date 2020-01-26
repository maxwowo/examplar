import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

import classes from './Logo.module.less';

const { Text } = Typography;

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = (
  {
    className
  }
) => (
  <div
    className={classNames(
      classes.logo,
      className
    )}
  >
    <Text
      className={classes.exam}
    >
      Exam
    </Text>
    <Text
      className={classes.plar}
    >
      plar
    </Text>
  </div>
);

export default Logo;
