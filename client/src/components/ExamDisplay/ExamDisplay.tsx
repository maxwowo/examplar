import React from 'react';

import ExamNavbar from '../ExamNavbar/ExamNavbar';
import ExamContent from '../ExamContent/ExamContent';
import { Exam } from '../../models/exam';
import { Course } from '../../models/course';
import { Solution } from '../../models/solution';

interface ExamDisplayProps {
  exam?: Exam;
  course?: Course;
  solution?: Solution;
  handleToggleDisplayExam: () => void;
}

const ExamDisplay: React.FC<ExamDisplayProps> = (
  {
    exam,
    course,
    solution,
    handleToggleDisplayExam
  }
) => (
  <div>
    <ExamNavbar
      exam={exam}
      course={course}
      handleToggleDisplayExam={handleToggleDisplayExam}
    />
    <ExamContent
      solution={solution}
    />
  </div>
);

export default ExamDisplay;
