import qs from 'query-string';

import client, { ClientError, ClientResponse } from '../services/networking';

export interface Course {
  id: number;
  code: string;
  name: string;
  universityId: number;
}

export interface CourseBody {
  courses: Course[];
}

export interface GetBody {
  course: Course;
}

export interface CreateBody {
  course: Course;
}

const courseModel = {
  get: (
    courseId: number
  ): Promise<GetBody> => (
    client.get(
      `/courses/${courseId}`
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
    courseCode: string,
    courseName: string,
    universityId: number
  ): Promise<CreateBody> => (
    client.post(
      '/courses',
      {
        code: courseCode,
        name: courseName,
        universityId: universityId
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
    course?: string | null,
    universityId?: string | null
  ): Promise<CourseBody> => (
    client
      .get(
        qs.stringifyUrl(
          {
            url: '/courses',
            query: {
              course: course,
              universityId: universityId
            }
          }
        )
      )
      .then(
        (
          res: ClientResponse<CourseBody>
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

export default courseModel;
