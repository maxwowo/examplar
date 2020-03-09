import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const maxTerm = 6;

const terms = Array
  .from(
    Array(maxTerm)
      .keys()
  )
  .map(i => i + 1);

interface TermSelectProps extends SelectProps {

}

const TermSelect: React.ForwardRefExoticComponent<TermSelectProps> = React.forwardRef((
  {
    ...rest
  },
  ref: React.Ref<Select<number>>
  ) => (
    <Select
      ref={ref}
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
