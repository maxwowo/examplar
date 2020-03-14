import React from 'react';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { Icon, Tooltip } from 'antd';
import classNames from 'classnames';

import classes from './IconButton.module.less';

interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  iconType: string;
  tooltipTitle: string;
  tooltipPlacement: TooltipPlacement;
}

const IconButton: React.FC<IconButtonProps> = (
  {
    iconType,
    tooltipTitle,
    tooltipPlacement,
    onClick,
    className
  }
) => (
  <Tooltip
    title={tooltipTitle}
    placement={tooltipPlacement}
  >
    <Icon
      type={iconType}
      className={
        classNames(
          classes.iconButton,
          className
        )
      }
      onClick={onClick}
    />
  </Tooltip>
);

export default IconButton;
