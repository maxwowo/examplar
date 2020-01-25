import React from 'react';
import { Select } from 'antd';

import { searchByName, University } from '../../models/university';
import { notifyUnreachableServer } from '../../tools/errorNotifier';
import useDidMountEffect from '../../hooks/useDidMountEffect';

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
  React.useEffect(
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

  const [options, setOptions] = React.useState<University[]>([]);
  useDidMountEffect(
    () => {
      searchByName('')
        .then(
          res => {
            setOptions(res.universities);
          }
        )
        .catch(
          () => {
            notifyUnreachableServer();
          }
        );
    }
  );

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
