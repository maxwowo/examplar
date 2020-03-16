import React from 'react';
import classNames from 'classnames';

import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import classes from './DropdownMenu.module.less';

interface DropdownMenuProps extends MenuProps {

}

const DropdownMenu: React.FC<DropdownMenuProps> = (
  {
    className,
    children,
    ...rest
  }
) => (
  <Menu
    {...rest}
    className={
      classNames(
        className,
        classes.dropdownMenu
      )
    }
  >
    {children}
  </Menu>
);

export default DropdownMenu;
