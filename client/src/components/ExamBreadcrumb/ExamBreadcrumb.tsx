import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { Exam } from '../../models/exam';
import { Course } from '../../models/course';

interface ExamBreadcrumbProps {
  exam?: Exam;
  course?: Course;
}

const ExamBreadcrumb: React.FC<ExamBreadcrumbProps> = (
  {
    exam,
    course
  }
) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Link
        to={`/courses/${course?.id}`}
      >
        {course?.code}
      </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      {`${exam?.examYear} Term ${exam?.examTerm}`}
    </Breadcrumb.Item>
  </Breadcrumb>

);

export default ExamBreadcrumb;
