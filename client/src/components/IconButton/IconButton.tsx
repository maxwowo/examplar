import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import classes from './IconButton.module.less';

interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  type: string;
}

const IconButton: React.FC<IconButtonProps> = (
  {
    type,
    onClick,
    className
  }
) => (
  <Icon
    type={type}
    className={
      classNames(
        classes.iconButton,
        className
      )
    }
    onClick={onClick}
  />
);

export default IconButton;
