import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';

import PageLayout from '../../components/PageLayout/PageLayout';
import ExamEdit from '../ExamEdit/ExamEdit';
import useExam from '../../hooks/useExam';
import useCourse from '../../hooks/useCourse';
import useSolution from '../../hooks/useSolution';
import classes from './ExamEditPage.module.less';

interface ExamPageMatchingParams {
  examId: string;
}

interface ExamEditPageProps extends RouteComponentProps<ExamPageMatchingParams> {

}

const ExamEditPage: React.FC<ExamEditPageProps> = (
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

  const loading: boolean[] = [
    examLoading,
    courseLoading,
    solutionLoading
  ];

  return (
    <PageLayout>
      <Card
        loading={loading.some(curr => curr)}
        bordered={false}
        className={classes.examEditPage}
      >
        <ExamEdit
          exam={exam}
          course={course}
          solution={solution}
        />
      </Card>
    </PageLayout>
  );
};

export default ExamEditPage;
