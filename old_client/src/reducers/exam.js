/* Constants */
import {
  SET_EXAM_QUESTIONS,
  UPDATE_SOLUTIONS,
  UPDATE_EXAM_ID,
  UPDATE_USER_SOLUTION,
  UPDATE_SUB_QUESTION_ID,
  RESET_EXAM_PAGE,
  UPDATE_PREVIEW_SWITCH_STATE
} from "../constants/actions";

/* Initial state */
const initial = {
  questions: [],
  solutions: [],
  examId: null,
  userSolution: null,
  subQuestionId: null,
  solutionPreview: null,
  previewSwitchState: false
};

const exam = (state = initial, action) => {
  switch (action.type) {
    case SET_EXAM_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      };

    case UPDATE_SOLUTIONS:
      return {
        ...state,
        solutions: action.solutions
      };

    case UPDATE_EXAM_ID:
      return {
        ...state,
        examId: action.examId
      };

    case UPDATE_USER_SOLUTION:
      return {
        ...state,
        userSolution: action.userSolution
      };

    case UPDATE_SUB_QUESTION_ID:
      return {
        ...state,
        subQuestionId: action.subQuestionId
      };

    case RESET_EXAM_PAGE:
      return {
        ...initial
      };

    case UPDATE_PREVIEW_SWITCH_STATE:
      return {
        ...state,
        previewSwitchState: action.previewSwitchState
      };

    default:
      return {
        ...state
      };
  }
};

export default exam;
