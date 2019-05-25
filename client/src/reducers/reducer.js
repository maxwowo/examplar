/* Redux */
import { combineReducers } from "redux";

/* All the reducers */
import home from "./home";
import courseModal from "./courseModal";

const reducer = combineReducers({
  home,
  courseModal
});

export default reducer;
