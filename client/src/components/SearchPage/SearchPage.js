/* React */
import React, { Component } from "react";

/* Ant Design */
import { List } from "antd";

/* Axios */
import Axios from "axios";

/* React Router */
import { withRouter } from "react-router-dom";

const {Item} = List;

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
      <List
        itemLayout="horizontal"
        dataSource={this.state.listItems}
        renderItem={item => (
          <Item>
            <Item.Meta
              title={<a href="https://www.google.com">{item.courseName}</a>}
              description={`${item.courseCode} @ ${item.university}`}
            />
          </Item>
        )}
      />
    );
  }
}

export default withRouter(SearchPage);