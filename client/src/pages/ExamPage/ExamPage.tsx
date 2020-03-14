import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';

import PageLayout from '../../components/PageLayout/PageLayout';
import ExamDisplay from '../../components/ExamDisplay/ExamDisplay';
import useExam from '../../hooks/useExam';
import useCourse from '../../hooks/useCourse';
import classes from './ExamPage.module.less';
import useSolution from '../../hooks/useSolution';

interface ExamPageMatchingParams {
  examId: string;
}

interface ExamPageProps extends RouteComponentProps<ExamPageMatchingParams> {

}

const ExamPage: React.FC<ExamPageProps> = (
  {
    match
  }
) => {
  const examId = Number(match.params.examId);

  const [
    exam,
    examLoading
  ] = useExam(examId);

  const [
    course,
    courseLoading
  ] = useCourse(exam);

  const [
    solution,
    solutionLoading
  ] = useSolution(exam);

  const cardLoading: boolean[] = [
    examLoading,
    courseLoading,
    solutionLoading
  ];

  return (
    <PageLayout>
      <Card
        loading={cardLoading.some(curr => curr)}
        bordered={false}
        className={classes.examPage}
      >
        <ExamDisplay
          exam={exam}
          course={course}
          solution={solution}
        />
      </Card>
    </PageLayout>
  );
};

export default ExamPage;
