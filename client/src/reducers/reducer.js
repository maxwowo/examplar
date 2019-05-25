/* Redux */
import { combineReducers } from "redux";

/* All the reducers */
import home from "./home";
import course from "./course";
import courseModal from "./courseModal";

const reducer = combineReducers({
  home,
  course,
  courseModal
});

export default reducer;
