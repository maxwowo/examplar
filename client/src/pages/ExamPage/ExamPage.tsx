import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'antd';

import PageLayout from '../../components/PageLayout/PageLayout';
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

  return (
    <PageLayout>
      <Row
        className={classes.examPage}
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
    </PageLayout>
  );
};

export default ExamPage;
