import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';

import PageLayout from '../../components/PageLayout/PageLayout';
import examModel, { Exam } from '../../models/exam';
import ExamNavbar from '../../components/ExamNavbar/ExamNavbar';
import ExamContent from '../../components/ExamContent/ExamContent';
import { notifyConnectionError } from '../../tools/errorNotifier';
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

  React.useEffect(
    () => {
      examModel
        .get(
          examId
        )
        .then(res => {
          setExam(res.exam);
          console.log(res.exam);
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

  return (
    <PageLayout>
      <Card
        bordered={false}
        className={classes.examPage}
      >
        <ExamNavbar/>
        <ExamContent/>
      </Card>
    </PageLayout>
  );
};

export default ExamPage;
