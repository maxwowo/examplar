/* Constants */
import {
  SET_EXAM_QUESTIONS,
  CHANGE_SUB_QUESTION_SOLUTION
} from "../constants/actions";

/* Initial state */
const initial = {
  questions: [],
  solutions: []
};

const exam = (state = initial, action) => {
  switch (action.type) {
    case SET_EXAM_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      };

    case CHANGE_SUB_QUESTION_SOLUTION:
      return {
        ...state,
        solutions: action.solutions
      };

    default:
      return {
        ...state
      };
  }
};

export default exam;
