/* Constants */
import {
  SET_EXAM_QUESTIONS,
  CHANGE_SOLUTIONS,
  CHANGE_EXAM_ID,
  CHANGE_USER_SOLUTION,
  CHANGE_SUB_QUESTION_ID
} from "../constants/actions";

/* Initial state */
const initial = {
  questions: [],
  solutions: [],
  examId: null,
  userSolution: null,
  subQuestionId: null
};

const exam = (state = initial, action) => {
  switch (action.type) {
    case SET_EXAM_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      };

    case CHANGE_SOLUTIONS:
      return {
        ...state,
        solutions: action.solutions
      };

    case CHANGE_EXAM_ID:
      return {
        ...state,
        examId: action.examId
      };

    case CHANGE_USER_SOLUTION:
      return {
        ...state,
        userSolution: action.userSolution
      };

    case CHANGE_SUB_QUESTION_ID:
      return {
        ...state,
        subQuestionId: action.subQuestionId
      };

    default:
      return {
        ...state
      };
  }
};

export default exam;
