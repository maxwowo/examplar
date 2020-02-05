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

export interface CreateCourseBody {
  course: Course;
}

export const createCourse = (
  courseCode: string,
  courseName: string,
  universityId: number
): Promise<CreateCourseBody> => (
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
        res: ClientResponse<CreateCourseBody>
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
);

export const searchByCourseUniversityId = (
  course: string,
  universityId: string
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
      (err: ClientError) => {
        throw err;
      }
    )
);
