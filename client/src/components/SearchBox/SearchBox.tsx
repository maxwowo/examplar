import React from 'react';
import { Button, Input } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import qs from 'query-string';

import UniversitySelect from '../UniversitySelect/UniversitySelect';
import classes from './SearchBox.module.less';

const { Group } = Input;

interface SearchBoxProps extends RouteComponentProps {

}

const SearchBox: React.FC<SearchBoxProps> = (
  {
    history
  }
) => {
  const [inputValue, setInputValue] = React.useState<string | null>(null);
  const [universityId, setUniversityId] = React.useState<string | null>(null);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    history.push(
      qs.stringifyUrl(
        {
          url: '/search',
          query: {
            course: inputValue!,
            university: universityId!
          }
        }
      )
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(
      e.target.value
    );
  };

  const handleUniversityChange = (
    value: number
  ) => {
    setUniversityId(value.toString());
  };

  return (
    <form
      className={classes.searchBox}
      onSubmit={handleSubmit}
    >
      <Group
        compact
      >
        <Input
          className={classes.input}
          onChange={handleInputChange}
          size="large"
          placeholder="SearchPage for courses"
          name="course"
        />

        <UniversitySelect
          handleUniversityChange={handleUniversityChange}
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

export default withRouter(SearchBox);
