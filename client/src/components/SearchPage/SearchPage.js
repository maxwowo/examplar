/* React */
import React, { Component } from "react";

/* Ant Design */
import { List } from "antd";

/* Custom components */
import SearchBox from "../SearchBox/SearchBox";

/* Axios */
import Axios from "axios";

/* React Router */
import { withRouter } from "react-router-dom";

/* Styles */
import "./SearchPage.less";

const { Item } = List;
const { Meta } = Item;

class SearchPage extends Component {
  state = {
    listItems: []
  };

  componentDidMount() {
    const { location } = this.props;

    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    const university = params.get("university");

    Axios.get("/api/courses", {
      params: {
        course: !course ? "" : course,
        university: !university ? "" : university
      }
    }).then(res => {
      this.setState({ listItems: [...res.data] });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div id="search-page-content">
        <SearchBox/>
        <List
          size="large"
          header={<div>Search results</div>}
          dataSource={this.state.listItems}
          renderItem={item => (
            <Item>
              <Meta
                title={<a href="https://www.google.com">{item.courseName}</a>}
                description={`${item.courseCode} @ ${item.university}`}
              />
            </Item>
          )}
        />
      </div>
    );
  }
}

export default withRouter(SearchPage);