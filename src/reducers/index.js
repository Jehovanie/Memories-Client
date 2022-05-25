import { combineReducers } from "redux";

import posts from './posts_reducers'; ////this take a arrow functions that is get the initial value and the action reducer ( type and payload )
import auth from "./auth_reducers";

/**
 * to get the post we must use hook useSelector((state) => state.posts)
 * to get the user we must use hook useSelector((state ) => state.auth)
 */
export default combineReducers({ posts, auth })