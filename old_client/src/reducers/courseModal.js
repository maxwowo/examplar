/* Constants */
import {
  UPDATE_COURSE_MODAL_VISIBILITY
} from "../constants/actions";

/* Initial state */
const initial = {
  visible: false
};

const courseModal = (state = initial, action) => {

  switch (action.type) {

    case UPDATE_COURSE_MODAL_VISIBILITY:
      return {
        ...state, visible: !state.visible
      };

    default:
      return {
        ...state
      };
  }
};

export default courseModal;