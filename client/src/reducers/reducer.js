/* Redux */
import { combineReducers } from "redux";

/* All the reducers */
import home from "./home";
import course from "./course";
import courseModal from "./courseModal";
import exam from "./exam";

const reducer = combineReducers({
  home,
  course,
  courseModal,
  exam
});

export default reducer;
