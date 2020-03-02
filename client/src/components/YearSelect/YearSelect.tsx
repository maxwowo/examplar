import React from 'react';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker/interface';

interface YearSelectProps extends DatePickerProps {

}

const YearSelect: React.FC<YearSelectProps> = (
  {
    ...rest
  }
) => (
  <DatePicker
    mode='year'
    {...rest}
  />
);

export default YearSelect;
