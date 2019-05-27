/* Constants */
import {
  SET_COURSE_INFO,
  UPDATE_EXAMS,
  CHANGE_EXAM_MODAL_VISIBILITY
} from "../constants/actions";

/* Initial state */
const initial = {
  courseName: null,
  courseCode: null,
  universityName: null,
  exams: [],
  courseId: null,
  modalVisible: false
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

    case CHANGE_EXAM_MODAL_VISIBILITY:
      return {
        ...state,
        modalVisible: !state.modalVisible
      };

    default:
      return {
        ...state
      };
  }

};

export default course;
