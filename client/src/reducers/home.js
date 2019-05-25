/* Constants */
import {
  CHANGE_COURSE_SEARCH,
  CHANGE_UNIVERSITY_SEARCH
} from "../constants/actions";

/* Initial state */
const initial_state = {
  courseSearch: "",
  universitySearch: ""
};

const home = (state = initial_state, action) => {

  switch (action.type) {

    case CHANGE_COURSE_SEARCH:
      return {
        ...state,
        courseSearch: action.courseSearch
      };

    case CHANGE_UNIVERSITY_SEARCH:
      return {
        ...state,
        universitySearch: action.universitySearch
      };

    default:
      return {
        ...state
      };

  }
};

export default home;
