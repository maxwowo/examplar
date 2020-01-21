import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface UniversitySelectProps {
  placeholder: string;
  size: 'default' | 'large' | 'small';
  className?: string;
}

const UniversitySelect: React.FC<UniversitySelectProps> = (
  {
    placeholder,
    size,
    className
  }
) => {
  const [options, setOptions] = React.useState([]);

  const handleSearch = (val: string) => {
    console.log(val);
  };

  return (
    <Select
      className={className}
      showSearch
      placeholder={placeholder}
      size={size}
      optionFilterProp="children"
      onSearch={handleSearch}
    >
      {options.map(
        (curr, i) => (
          <Option value={curr} key={i}>{curr}</Option>
        )
      )}
    </Select>
  );
};

export default UniversitySelect;
