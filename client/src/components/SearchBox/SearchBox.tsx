import React from 'react';
import { Button, Input } from 'antd';

import UniversitySelect from '../UniversitySelect/UniversitySelect';
import classes from './SearchBox.module.less';

const { Group } = Input;

interface SearchBoxProps {

}

const SearchBox: React.FC<SearchBoxProps> = () => {
  return (
    <form
      className={classes.searchBox}
    >
      <Group
        compact
      >
        <Input
          className={classes.input}
          size="large"
          placeholder="SearchPage for courses"
          name="course"
        />

        <UniversitySelect
          className={classes.select}
          placeholder="Filter by university"
          size="large"
        />

        <Button
          className={classes.submitButton}
          type="primary"
          htmlType="submit"
          icon="search"
          size="large"
        />
      </Group>
    </form>
  );
};

export default SearchBox;
