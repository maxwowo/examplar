import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Col, Row } from 'antd';

import PageLayout from '../../components/PageLayout/PageLayout';
import examModel, { Exam } from '../../models/exam';
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
        <Row
          type='flex'
          justify='space-between'
        >
          <Col
            xs={8}
            md={6}
          >
            ay
          </Col>
          <Col
            xs={16}
            md={18}
          >
            ay!
          </Col>
        </Row>
      </Card>
    </PageLayout>
  );
};

export default ExamPage;
