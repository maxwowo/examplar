import React from 'react';
import { SelectProps } from 'antd/lib/select';
import { Empty, Select } from 'antd';

import { SearchBody, searchByName, University } from '../../models/university';
import { notifyConnectionError } from '../../tools/errorNotifier';

export interface UniversitySelectProps extends SelectProps {
  handleUniversityChange?: (
    value: number
  ) => void;
}

const UniversitySelect: React.ForwardRefExoticComponent<UniversitySelectProps> = React.forwardRef((
  {
    placeholder,
    size,
    className,
    handleUniversityChange
  },
  ref: React.Ref<Select<number>>
  ) => {
    const [
      value,
      setValue
    ] = React.useState<string>(
      ''
    );
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
            notifyConnectionError(
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

  const [
    options,
    setOptions
  ] = React.useState<University[]>(
    []
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
      notFoundContent={
        <Empty
          description='No matching universities'
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      }
      ref={ref}
      onChange={handleUniversityChange}
      optionFilterProp="children"
      onSearch={handleSearch}
    >
      {options.map(
        (
          curr: University
        ) => (
          <Select.Option
            value={curr.id}
            key={curr.id}>
            {curr.name}
          </Select.Option>
        )
      )}
    </Select>
  );
  }
);

export default UniversitySelect;
