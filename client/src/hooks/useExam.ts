import React from 'react';
import examModel, { Exam } from '../models/exam';
import { notifyConnectionError } from '../tools/errorNotifier';

const useExam = (
  examId: number
): [
  Exam | undefined,
  boolean
] => {
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

  return [
    exam,
    examLoading
  ];
};

export default useExam;
