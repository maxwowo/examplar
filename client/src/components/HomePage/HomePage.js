/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout, Typography } from "antd";

/* Custom components */
import SearchBox from "./SearchBox/SearchBox";

/* Style */
import "./HomePage.less";

/* Constants */
import {
  CHANGE_COURSE_SEARCH,
  CHANGE_UNIVERSITY_SEARCH
} from "../../constants/actions";

const { Title } = Typography;
const { Content } = Layout;

const mapDispatchToProps = dispatch => (
  {
    handleCourseChange: e => dispatch(
      {
        courseSearch: e.target.value,
        type: CHANGE_COURSE_SEARCH
      }
    ),
    handleUniversitySelect: e =>
      dispatch(
        {
          universitySearch: e,
          type: CHANGE_UNIVERSITY_SEARCH
        }
      )
  }
);

class HomePage extends Component {
  render() {
    return (
      <Content id="home-page-container" className="container-width">
        <Title id="home-page-title" ellipsis className="text">Find your examplar</Title>
        <Title level={4} className="text" id="home-page-subtitle">The best solutions written by your fellow students,
          organized into one
          place.</Title>
        <SearchBox
          handleCourseChange={this.props.handleCourseChange}
          handleUniversitySelect={this.props.handleUniversitySelect}
        />
      </Content>
    );
  }
}

export default connect(null, mapDispatchToProps)(HomePage);