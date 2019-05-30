/* Constants */
import {
  SET_EXAM_QUESTIONS,
  CHANGE_SUB_QUESTION_SOLUTION,
  CHANGE_EXAM_ID
} from "../constants/actions";

/* Initial state */
const initial = {
  questions: [],
  solutions: [],
  examId: null
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

    case CHANGE_EXAM_ID:
      return {
        ...state,
        examId: action.examId
      };

    default:
      return {
        ...state
      };
  }
};

export default exam;
