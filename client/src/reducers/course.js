/* Constants */
import {
  SET_COURSE_INFO,
  UPDATE_EXAMS
} from "../constants/actions";

/* Initial state */
const initial = {
  courseName: null,
  courseCode: null,
  universityName: null,
  exams: [],
  courseId: null
};

const course = (state = initial, action) => {

  switch (action.type) {

    case SET_COURSE_INFO:
      return {
        ...state,
        courseName: action.courseName,
        courseCode: action.courseCode,
        universityName: action.universityName,
        exams: action.exams,
        courseId: action.courseId
      };

    case UPDATE_EXAMS:
      return {
        ...state,
        exams: action.exams
      };

    default:
      return {
        ...state
      };
  }

};

export default course;
