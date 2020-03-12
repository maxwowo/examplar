import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';

import PageLayout from '../../components/PageLayout/PageLayout';
import examModel, { Exam } from '../../models/exam';
import ExamNavbar from '../../components/ExamNavbar/ExamNavbar';
import ExamContent from '../../components/ExamContent/ExamContent';
import { notifyConnectionError } from '../../tools/errorNotifier';
import courseModel, { Course } from '../../models/course';
import { Solution } from '../../models/solution';
import classes from './ExamPage.module.less';

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
    setExam
  ] = React.useState<Exam>();

  const [
    examLoading,
    setExamLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      examModel
        .get(
          examId
        )
        .then(res => {
          setExam(res.exam);
          setExamLoading(false);
        })
        .catch(err => {
          notifyConnectionError(
            err,
            'Could not obtain exam details.'
          );
        });
    },
    [
      examId
    ]
  );

  const [
    course,
    setCourse
  ] = React.useState<Course>();

  const [
    courseLoading,
    setCourseLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      if (exam !== undefined) {
        courseModel
          .get(
            exam.courseId
          )
          .then(res => {
            setCourse(res.course);
            setCourseLoading(false);
          })
          .catch(err => {
            notifyConnectionError(
              err,
              'Could not obtain course details.'
            );
          });
      }
    },
    [
      exam
    ]
  );

  const [
    solution,
    setSolution
  ] = React.useState<Solution>();

  const [
    solutionLoading,
    setSolutionLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      if (exam !== undefined) {

      }
    },
    [
      exam
    ]
  );

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
        <ExamNavbar
          exam={exam}
          course={course}
        />
        <ExamContent/>
      </Card>
    </PageLayout>
  );
};

export default ExamPage;
