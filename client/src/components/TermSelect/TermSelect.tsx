import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const MAX_TERM = 6;

const terms = Array
  .from(
    Array(MAX_TERM)
      .keys()
  )
  .map(i => i + 1);

interface TermSelectProps extends SelectProps {

}

const TermSelect: React.ForwardRefExoticComponent<TermSelectProps> = React.forwardRef((
  {
    placeholder,
    onChange
  },
  ref: React.Ref<Select<number>>
  ) => (
    <Select
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
    >
      {terms.map(
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
  )
);

export default TermSelect;
