import { combineReducers } from "redux";
import pieces from "./reducer-pieces";
import turn from "./reducer-turn";
import loggedMoves from './reducer-logged-moves'

export default combineReducers({
  pieces,
  turn,
  loggedMoves
});
