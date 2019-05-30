/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout, List, Typography, Empty } from "antd";
import { Link } from "react-router-dom";

/* Styles */
import "./CourseContent.less";

const { Content } = Layout;
const { Item } = List;
const { Meta } = Item;
const { Text } = Typography;

const listHeader = <Text>Exams</Text>;

const mapStateToProps = state => (
  {
    exams: state.course.exams,
    courseId: state.course.courseId
  }
);

const empty = (
  <Empty
    description="No exams yet"
    image={Empty.PRESENTED_IMAGE_SIMPLE}
  />
);

const CourseContent = props => (
  <Content>
    <List
      size="large"
      header={listHeader}
      dataSource={props.exams}
      locale={{ emptyText: empty }}
      id="course-content-list"
      renderItem={item => (
        <Item>

          <Meta
            title={
              <Link to={`/exams/${item.examId}`}>
                {item.examYear} term {item.examTerm}
              </Link>
            }
          />

        </Item>
      )}
    />
  </Content>
);

export default connect(mapStateToProps)(CourseContent);
