/* Constants */
import {
  SET_EXAM_QUESTIONS
} from "../constants/actions";

/* Initial state */
const initial = {
  questions: []
};

const exam = (state = initial, action) => {
  switch (action.type) {
    case SET_EXAM_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      };

    default:
      return {
        ...state
      };
  }
};

export default exam;
