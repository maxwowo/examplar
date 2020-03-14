import React from 'react';
import { Exam } from '../models/exam';
import solutionModel, { Solution } from '../models/solution';
import { notifyConnectionError } from '../tools/errorNotifier';

const useSolution = (
  exam: Exam | undefined
): [
  Solution | undefined,
  boolean
] => {
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
        solutionModel
          .search(
            exam.id
          )
          .then(res => {
            setSolution(res.solution);
            setSolutionLoading(false);
          })
          .catch(err => {
            notifyConnectionError(
              err,
              'Could not obtain solution details.'
            );
          });
      }
    },
    [
      exam
    ]
  );

  return [
    solution,
    solutionLoading
  ];
};

export default useSolution;
