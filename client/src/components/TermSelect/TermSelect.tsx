import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

const maxTerm = 6;

const terms = Array
  .from(
    Array(maxTerm)
      .keys()
  )
  .map(i => i + 1);

interface TermSelectProps extends SelectProps {

}

const TermSelect: React.FC<TermSelectProps> = (
  {
    placeholder
  }
) => (
  <Select
    placeholder={placeholder}
  >
    {terms.map(
      (
        curr
      ) => (
        <Select.Option
          key={curr}
        >
          {curr}
        </Select.Option>
      )
    )}
  </Select>
);

export default TermSelect;
