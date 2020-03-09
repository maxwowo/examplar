import React from 'react';
import { SelectProps } from 'antd/lib/select';
import { Empty, Select } from 'antd';

import universityModel, { University } from '../../models/university';
import { notifyConnectionError } from '../../tools/errorNotifier';

export interface UniversitySelectProps {
  handleUniversityChange?: (
    value: number
  ) => void;
}

const UniversitySelect: React.ForwardRefExoticComponent<UniversitySelectProps & SelectProps> = React.forwardRef((
  {
    placeholder,
    size,
    className,
    handleUniversityChange,
    onChange,
    id,
  },
  ref: React.Ref<Select<number>>
  ) => {

  const [
    loading,
    setLoading
  ] = React.useState(true);

  const [
    selectValue,
    setSelectValue
  ] = React.useState<string>(
    ''
  );

  React.useEffect(
    () => {

      setLoading(true);

      universityModel.search(
        selectValue
      )
        .then(res => {
          if (selectValue === res.query) {
            setOptions(res.universities);
            setLoading(false);
          }
        })
        .catch(err => {
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
      value: number,
      option: React.ReactElement | React.ReactElement[]
    ) => {
      if (handleUniversityChange) {
        handleUniversityChange(value);
      }

      if (onChange) {
        onChange(value, option);
      }
    };

    return (
      <Select
        className={className}
        showSearch
        placeholder={placeholder}
        size={size}
        loading={loading}
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
