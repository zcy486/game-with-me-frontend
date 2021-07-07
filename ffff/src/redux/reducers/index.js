import { combineReducers } from "redux";
import user from "./userReducer";
import games from "./gameReducer";
import order from "./orderReducer";
import posts from "./postReducer";
import review from "./reviewReducer";

export default combineReducers({
  user,
  order,
  games,
  posts,
  review,
});
