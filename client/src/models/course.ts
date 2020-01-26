import qs from 'query-string';

import client, { ClientError, ClientResponse } from '../services/networking';

export interface Course {
  courseId: number;
  courseCode: string;
  courseName: string;
  universityId: number;
  universityName: string;
}

export interface CourseBody {
  courses: Course[];
}

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
