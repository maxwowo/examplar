/* Constants */
import {
  UPDATE_COURSE_SEARCH,
  UPDATE_UNIVERSITY_SEARCH
} from "../constants/actions";

/* Initial state */
const initial = {
  courseSearch: "",
  universitySearch: ""
};

const home = (state = initial, action) => {

  switch (action.type) {

    case UPDATE_COURSE_SEARCH:
      return {
        ...state,
        courseSearch: action.courseSearch
      };

    case UPDATE_UNIVERSITY_SEARCH:
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
