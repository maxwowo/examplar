import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

import classes from './Logo.module.less';

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
    <Typography.Text
      className={classes.exam}
    >
      Exam
    </Typography.Text>
    <Typography.Text
      className={classes.plar}
    >
      plar
    </Typography.Text>
  </div>
);

export default Logo;
