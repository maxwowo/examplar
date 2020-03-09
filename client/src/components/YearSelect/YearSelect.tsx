import React from 'react';
import { DatePicker } from 'antd';
import { DatePickerDecorator, DatePickerProps } from 'antd/es/date-picker/interface';

import classes from './YearSelect.module.less';

interface YearSelectProps extends DatePickerProps {

}

const YearSelect: React.ForwardRefExoticComponent<YearSelectProps> = React.forwardRef((
  {
    ...rest
  },
  ref: React.Ref<DatePickerDecorator>
  ) => (
    <DatePicker
      className={classes.yearSelect}
      mode='year'
    />
  )
);

export default YearSelect;
