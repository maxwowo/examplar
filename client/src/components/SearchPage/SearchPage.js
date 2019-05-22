/* React */
import React, { Component } from "react";

/* Ant Design */
import { List, Typography, Button } from "antd";

/* Custom components */
import SearchBox from "../SearchBox/SearchBox";

/* Axios */
import Axios from "axios";

/* React Router */
import { withRouter, Link } from "react-router-dom";

/* Styles */
import "./SearchPage.less";

const { Item } = List;
const { Meta } = Item;
const { Text, Paragraph } = Typography;

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

    /* Submit the GET request */
    Axios.get("/api/courses", {
      params: {
        course: !course ? "" : course.trim(),
        university: !university ? "" : university.trim()
      }
    }).then(res => {

      /* Set the new states */
      this.setState({
        listItems: [...res.data],
        listLoading: false
      });

    }).catch(err => {

      /* Handle errors */
      console.log(err);

    });
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
      this.setState({ listLoading: true });

      /* Grab the list of items again */
      this.requestListItems(location);
    }
  }

  render() {

    const listHeader = (
      <Text>Search results</Text>
    );

    const noResult = (
      <div>
        <Paragraph>Your search did not match any courses</Paragraph>
        <Button type="primary" shape="round">Create course</Button>
      </div>
    );

    return (
      <div className="content-body" id="search-page-content">
        <SearchBox/>
        <List
          size="large"
          header={listHeader}
          dataSource={this.state.listItems}
          locale={{ emptyText: noResult }}
          loading={this.state.listLoading}
          renderItem={item => (
            <Item>
              <Meta
                title={<Link to={`/courses/${item.course_id}`}>{item.course_name}</Link>}
                description={`${item.course_code} @ ${item.university_name}`}
              />
            </Item>
          )}
        />
      </div>
    );
  }
}

export default withRouter(SearchPage);