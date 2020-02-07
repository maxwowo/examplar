import React from 'react';
import { SelectProps } from 'antd/lib/select';
import { Empty, Select } from 'antd';

import { SearchBody, searchByName, University } from '../../models/university';
import { notifyConnectionError } from '../../tools/errorNotifier';

export interface UniversitySelectProps {
  handleUniversityChange?: (
    value: number
  ) => void;
  onChange?: (
    value: number
  ) => void;
  defaultId?: number;
}

const UniversitySelect: React.ForwardRefExoticComponent<UniversitySelectProps & SelectProps> = React.forwardRef((
  {
    placeholder,
    size,
    className,
    handleUniversityChange,
    onChange,
    id,
    defaultId
  },
  ref: React.Ref<Select<number>>
  ) => {
    const [
      selectValue,
      setSelectValue
    ] = React.useState<string>(
      ''
    );
    const getByName = React.useCallback(
      () => {
        searchByName(selectValue)
          .then(
            (
              res: SearchBody
            ) => {
              if (selectValue === res.query) {
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
      selectValue
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
      setSelectValue(query);
    };

    const handleChange = (
      value: number
    ) => {
      if (handleUniversityChange) {
        handleUniversityChange(value);
      }

      if (onChange) {
        onChange(value);
      }
    };

    return (
      <Select
        className={className}
        showSearch
        placeholder={placeholder}
        defaultValue={defaultId}
        size={size}
        notFoundContent={
          <Empty
            description='No matching universities'
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      }
        ref={ref}
        onChange={handleChange}
        optionFilterProp="children"
        onSearch={handleSearch}
    >
      {options.map(
        (
          curr: University
        ) => (
          <Select.Option
            value={curr.id}
            key={curr.id}
          >
            {curr.name}
          </Select.Option>
        )
      )}
    </Select>
  );
  }
);

export default UniversitySelect;
