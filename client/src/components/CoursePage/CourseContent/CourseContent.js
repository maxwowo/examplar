/* React */
import React from "react";

/* Ant Design components */
import { Layout, List, Typography } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Item } = List;
const { Meta } = Item;
const { Text } = Typography;

const listHeader = <Text>Exams</Text>;

const CourseContent = props => (
  <Content>
    <List
      size="large"
      header={listHeader}
      dataSource={props.exams}
      locale={{ emptyText: "No exams" }}
      renderItem={item => (
        <Item actions={[<Link to="#">Edit</Link>]}>

          <Meta
            title={
              <Link
                to={`/courses/${props.courseId}/exams/${item.exam_id}`}
              >
                {item.exam_year} term {item.exam_term}
              </Link>
            }
          />

        </Item>
      )}
    />
  </Content>
);

export default CourseContent;