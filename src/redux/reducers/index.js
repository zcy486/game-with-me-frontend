import { combineReducers } from "redux";
import user from "./userReducer";
import games from "./gameReducer";
import order from "./orderReducer";
import posts from "./postReducer";

export default combineReducers({
  user,
  order,
  games,
  posts,
});
