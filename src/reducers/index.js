import { combineReducers } from "redux";
import posts from './posts_reducers'; ////this take a arrow functions that is get the initial value and the action reducer ( type and payload )

export default combineReducers({ posts })