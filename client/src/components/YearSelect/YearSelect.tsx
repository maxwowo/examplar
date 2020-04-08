import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const YEAR_RANGE = 20;
const FROM_YEAR = new Date().getFullYear();

const years = Array
  .from(
    Array(YEAR_RANGE + 1)
      .keys()
  )
  .map(i => FROM_YEAR - i);

interface YearSelectProps extends SelectProps {

}

const YearSelect: React.ForwardRefExoticComponent<YearSelectProps> = React.forwardRef((
  {
    placeholder,
    onChange
  },
  ref: React.Ref<Select<number>>
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
