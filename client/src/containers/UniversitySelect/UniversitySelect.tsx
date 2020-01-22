import React from 'react';
import { Select } from 'antd';
import { searchByName, University } from '../../models/university';
import { ClientError } from '../../services/networking';

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
  const [options, setOptions] = React.useState<University[]>([]);

  const handleSearch = (query: string) => {
    searchByName(query)
      .then(
        res => setOptions(res)
      )
      .catch(
        (err: ClientError) => console.log(err)
      );
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
        (curr) => (
          <Option value={curr.name} key={curr.id}>{curr.name}</Option>
        )
      )}
    </Select>
  );
};

export default UniversitySelect;
