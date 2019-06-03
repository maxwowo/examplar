/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* React Router */
import { withRouter } from "react-router-dom";

/* Ant Design components */
import { Button, Input } from "antd";

/* Custom components */
import UniversitySelect from "../../UniversitySelect/UniversitySelect";

/* Style */
import "./SearchBox.less";

const { Group } = Input;

const mapStateToProps = state => (
  {
    course: state.home.courseSearch,
    university: state.home.universitySearch
  }
);

const SearchBox = (
  {
    course,
    university,
    history,
    handleUpdateCourse,
    handleUpdateUniversitySelect
  }
) => {

  const handleSubmit = e => {

    e.preventDefault();

    /* Create a query string using the course and university inputs */
    const params = new URLSearchParams(
      {
        course: course,
        university: university
      }
    );

    /* Redirect to the search route with the query string */
    history.push(
      {
        pathname: "/search",
        search: params.toString()
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group compact>
        <Input
          id="search-box-input"
          size="large"
          placeholder="Search for courses"
          name="course"
          onChange={handleUpdateCourse}
          value={course}
        />

        <UniversitySelect
          onSelect={handleUpdateUniversitySelect}
          placeholder="Filter by university"
          size="large"
          id="search-box-select"
          value={university ? university : undefined}
        />

        <Button
          type="primary"
          htmlType="submit"
          id="search-box-btn"
          icon="search"
          size="large"
        />
      </Group>
    </form>
  );
};

export default withRouter(connect(mapStateToProps)(SearchBox));
