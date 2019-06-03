/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { List, Typography, Layout } from "antd";

/* Custom components */
import SearchBox from "../HomePage/SearchBox/SearchBox";
import NoCourses from "./NoCourses/NoCourses";

/* Axios */
import Axios from "axios";

/* React Router */
import { withRouter, Link } from "react-router-dom";

/* Styles */
import "./SearchPage.less";

/* Constants */
import {
  UPDATE_COURSE_MODAL_VISIBILITY,
  UPDATE_COURSE_SEARCH,
  UPDATE_UNIVERSITY_SEARCH
} from "../../constants/actions";

const { Item } = List;
const { Meta } = Item;
const { Text } = Typography;
const { Content } = Layout;

const mapDispatchToProps = dispatch => (
  {
    handleUpdateCourse: e => dispatch(
      {
        courseSearch: e.target.value,
        type: UPDATE_COURSE_SEARCH
      }
    ),
    handleUniversitySelect: e => dispatch(
      {
        universitySearch: e,
        type: UPDATE_UNIVERSITY_SEARCH
      }
    ),
    handleModalToggle: e => dispatch(
      {
        type: UPDATE_COURSE_MODAL_VISIBILITY
      }
    )
  }
);

class SearchPage extends Component {

  state = {
    listItems: [],
    listLoading: true
  };

  /* Function that retrieves the list of courses which match search criteria and updates the states accordingly */
  requestListItems = location => {

    /* Get the search params */
    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    const university = params.get("university");

    /* Get all the courses that match the search criteria */
    Axios.get(
      "/api/courses",
      {
        params: {
          course: !course ? "" : course.trim(),
          university: !university ? "" : university.trim()
        }
      }
    ).then(
      res => {

        /* Set the new states */
        this.setState(
          {
            listItems: [...res.data],
            listLoading: false
          }
        );

      }
    ).catch(
      err => {

        /* Handle errors */
        console.log(err);

      }
    );
  };

  componentDidMount() {
    const { location } = this.props;

    /* Grab the list of items when the search page is loaded for the first time */
    this.requestListItems(location);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { location } = nextProps;

    /* If the user has searched for something else */
    if (location.search !== this.props.location.search) {

      /* Re-enable the loading animation */
      this.setState(
        {
          listLoading: true
        }
      );

      /* Grab the list of items again */
      this.requestListItems(location);
    }
  }

  render() {

    const listHeader = (
      <Text>Search results</Text>
    );

    return (
      <Content className="container-width" id="search-page-container">
        <SearchBox
          handleUpdateCourse={this.props.handleUpdateCourse}
          handleUniversitySelect={this.props.handleUniversitySelect}
        />
        <List
          size="large"
          header={listHeader}
          dataSource={this.state.listItems}
          locale={{
            emptyText: <NoCourses handleModalToggle={this.props.handleModalToggle}/>
          }}
          loading={this.state.listLoading}
          renderItem={item => (
            <Item>

              <Meta
                title={
                  <Link
                    to={`/courses/${item.course_id}`}
                  >
                    {item.course_name}
                  </Link>
                }
                description={`${item.course_code} @ ${item.university_name}`}
              />

            </Item>
          )}
        />
      </Content>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchPage));