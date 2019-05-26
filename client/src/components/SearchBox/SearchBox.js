/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* React Router */
import { withRouter } from "react-router-dom";

/* Ant Design components */
import { Button, Input } from "antd";

/* Custom components */
import UniversitySelect from "../UniversitySelect/UniversitySelect";

/* Style */
import "./SearchBox.less";

/* Constants */
import {
  CHANGE_UNIVERSITY_SEARCH,
  CHANGE_COURSE_SEARCH
} from "../../constants/actions";

const { Group } = Input;

const mapDispatchToProps = dispatch => ({
  handleCourseChange: e =>
    dispatch({ courseSearch: e.target.value, type: CHANGE_COURSE_SEARCH }),
  handleUniversitySelect: e =>
    dispatch({ universitySearch: e, type: CHANGE_UNIVERSITY_SEARCH })
});

const mapStateToProps = state => ({
  course: state.home.courseSearch,
  university: state.home.universitySearch
});

const SearchBox = props => {

  const handleSubmit = e => {

    e.preventDefault();

    /* Create a query string using the course and university inputs */
    const params = new URLSearchParams({
      course: props.course,
      university: props.university
    });

    /* Redirect to the search route with the query string */
    props.history.push({
      pathname: "/search",
      search: params.toString()
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group compact>
        <Input
          id="search-box-input"
          size="large"
          placeholder="Search for courses"
          name="course"
          onChange={props.handleCourseChange}
          value={props.course}
        />

        <UniversitySelect
          onSelect={props.handleUniversitySelect}
          placeholder="Filter by university"
          size="large"
          id="search-box-select"
          value={props.university ? props.university : undefined}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));
