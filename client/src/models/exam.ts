import client, { ClientError, ClientResponse } from '../services/networking';

export interface Exam {
  id: number;
  examYear: number;
  examTerm: number;
  courseId: number;
}

interface ExamBody {
  exams: Exam[];
}

interface GetBody {
  exam: Exam;
}

interface CreateBody {
  exam: Exam;
}

const examModel = {
  get: (
    examId: number
  ): Promise<GetBody> => (
    client
      .get(
        `/exams/${examId}`
      )
      .then(
        (
          res: ClientResponse<GetBody>
        ) => (
          res.data
        )
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  ),
  create: (
    examYear: number,
    examTerm: number,
    courseId: number
  ): Promise<CreateBody> => (
    client
      .post(
        '/exams',
        {
          examYear: examYear,
          examTerm: examTerm,
          courseId: courseId
        }
      )
      .then(
        (
          res: ClientResponse<CreateBody>
        ) => (
          res.data
        )
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  ),
  search: (
    courseId: number
  ): Promise<ExamBody> => (
    client
      .get(
        `/courses/${courseId}/exams`
      )
      .then(
        (
          res: ClientResponse<ExamBody>
        ) => (
          res.data
        )
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  )
};

export default examModel;
