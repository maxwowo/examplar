import React from 'react';
import { Empty, Layout, List, Typography } from 'antd';

const LIST_HEADER = (
  <Typography.Text>
    Exams
  </Typography.Text>
);

const EMPTY = (
  <Empty
    description="No exams yet"
    image={Empty.PRESENTED_IMAGE_SIMPLE}
  />
);

interface CourseContentProps {

}

const CourseContent = () => (
  <Layout.Content>
    <List
      size='large'
      header={LIST_HEADER}
      // dataSource={}
    />
  </Layout.Content>
);

export default CourseContent;
