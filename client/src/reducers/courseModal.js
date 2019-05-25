/* Constants */
import {
  CHANGE_MODAL_VISIBILITY,
  CHANGE_COURSE_CODE_FIELD,
  CHANGE_COURSE_NAME_FIELD
} from "../constants/actions";

/* Initial state */
const initial = {
  visible: false,
  courseName: null,
  courseCode: null,
  university: null
};

const courseModal = (state = initial, action) => {

  switch (action.type) {

    case CHANGE_MODAL_VISIBILITY:
      return {
        ...state, visible: !state.visible
      };

    case CHANGE_COURSE_CODE_FIELD:
      return {
        ...state, courseCode: action.courseCode
      };

    case CHANGE_COURSE_NAME_FIELD:
      return {
        ...state, courseName: action.courseName
      };

    default:
      return {
        ...state
      };
  }
};

export default courseModal;