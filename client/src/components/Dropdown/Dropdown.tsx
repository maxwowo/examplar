import React from 'react';
import { Dropdown as AntDropdown } from 'antd';
import { DropDownProps as AntDropDownProps } from 'antd/lib/dropdown';

import classes from './Dropdown.module.less';

interface DropdownProps extends AntDropDownProps {

}

const Dropdown: React.FC<DropdownProps> = (
  {
    children,
    ...rest
  }
) => (
  <AntDropdown
    {...rest}
  >
    <div
      className={classes.dropdownDiv}
    >
      {children}
    </div>
  </AntDropdown>
);

export default Dropdown;
