import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, List, Typography } from 'antd';

import { Exam } from '../../models/exam';
import classes from './CourseExams.module.less';

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

interface CourseExamsProps {
  exams: Exam[];
}

const CourseExams: React.FC<CourseExamsProps> = (
  {
    exams
  }
) => (
  <List
    size='large'
    header={LIST_HEADER}
    dataSource={exams}
    className={classes.examsList}
    locale={
      {
        emptyText: EMPTY
      }
    }
    renderItem={exam => (
      <List.Item>
        <List.Item.Meta
          title={
            <Link
              to={`/exams/${exam.id}`}
            >
              {exam.examYear} term {exam.examTerm}
            </Link>
          }
        />
      </List.Item>
    )}
  />
);

export default CourseExams;
