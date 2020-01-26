import React from 'react';
import { Select } from 'antd';

import { SearchBody, searchByName, University } from '../../models/university';
import { notifyError } from '../../tools/errorNotifier';

const { Option } = Select;

interface UniversitySelectProps {
  placeholder: string;
  size: 'default' | 'large' | 'small';
  className?: string;
  handleUniversityChange?: (
    value: number
  ) => void;
}

const UniversitySelect: React.FC<UniversitySelectProps> = (
  {
    placeholder,
    size,
    className,
    handleUniversityChange
  }
) => {
  const [value, setValue] = React.useState<string>('');
  const getByName = React.useCallback(
    () => {
      searchByName(value)
        .then(
          (
            res: SearchBody
          ) => {
            if (value === res.query) {
              setOptions(res.universities);
            }
          }
        )
        .catch(
          (
            err: Error
          ) => {
            notifyError(
              err,
              'Could not obtain university list.'
            );
          }
        );
    },
    [
      value
    ]
  );
  React.useEffect(
    getByName,
    [
      getByName
    ]
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
      onChange={handleUniversityChange}
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
