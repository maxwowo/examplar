import React from 'react';
import { Select } from 'antd';

import { searchByName, University } from '../../models/university';
import { notifyUnreachableServer } from '../../tools/errorNotifier';

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
  const [value, setValue] = React.useState<string>('');
  const getByName = React.useCallback(
    () => {
      searchByName(value)
        .then(
          res => {
            if (value === res.query) {
              setOptions(res.universities);
            }
          }
        )
        .catch(
          () => {
            notifyUnreachableServer();
          }
        );
    },
    [
      value
    ]
  );
  React.useEffect(
    getByName,
    [getByName]
  );

  const [options, setOptions] = React.useState<University[]>([]);

  const handleSearch = (query: string) => {
    setValue(query);
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
          <Option value={curr.id} key={curr.id}>{curr.name}</Option>
        )
      )}
    </Select>
  );
};

export default UniversitySelect;
