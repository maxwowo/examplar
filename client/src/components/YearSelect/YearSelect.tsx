import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const YEAR_RANGE = 20;
const FROM_YEAR = new Date().getFullYear() - YEAR_RANGE;

const years = Array
  .from(
    Array(YEAR_RANGE + 1)
      .keys()
  )
  .map(i => i + FROM_YEAR);

interface YearSelectProps extends SelectProps {

}

const YearSelect: React.ForwardRefExoticComponent<YearSelectProps> = React.forwardRef((
  {
    placeholder,
    onChange
  },
  ref: React.Ref<any>
  ) => {
    return (
      <Select
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
      >
        {years.map(
          (
            curr
          ) => (
            <Select.Option
              key={curr}
              value={curr}
            >
              {curr}
            </Select.Option>
          )
        )}
      </Select>
    );
  }
);

export default YearSelect;
