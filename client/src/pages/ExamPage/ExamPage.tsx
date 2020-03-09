import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';

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
      hi
    </PageLayout>
  );
};

export default ExamPage;
