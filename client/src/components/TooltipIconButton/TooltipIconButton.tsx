import React from 'react';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { Tooltip } from 'antd';

import IconButton from '../IconButton/IconButton';
import classes from './TooltipIconButton.module.less';

interface TooltipIconButtonProps extends React.HTMLAttributes<HTMLElement> {
  iconType: string;
  tooltipTitle: string;
  tooltipPlacement: TooltipPlacement;
}

const TooltipIconButton: React.FC<TooltipIconButtonProps> = (
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
    <div
      className={classes.tooltipIconButton}
    >
      <IconButton
        type={iconType}
        onClick={onClick}
        className={className}
      />
    </div>
  </Tooltip>
);

export default TooltipIconButton;
