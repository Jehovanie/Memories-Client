import { FETCH_ALL, DELETE, CREATE, COMMENT, UPDATE, ADD_LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionType";
import * as api from "../api";

/**
 * Each function return a function that is an action
 * to change the global state after modify or update a collection in database.
 */

// Action Creators

export const getPost = (id) => async (dispatch) => {

    // const action = { type: 'FETCH_ALL', payload: [] }
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });

        dispatch({ type: END_LOADING })
    } catch (error) {

        console.log("ERROR FETCH_ALL : " + error.message);
    }

}

export const getPosts = (page) => async (dispatch) => {

    // const action = { type: 'FETCH_ALL', payload: [] }
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING })
    } catch (error) {

        console.log("ERROR FETCH_ALL : " + error.message);
    }

}

export const getPostBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("ERROR GET POST BY SEARCH : " + error.message);

    }
}

export const createPost = (post, navigate) => async (dispatch) => {

    try {
        ///par defaut le data est dans le res.data 
        const { data } = await api.createPost(post);

        ///call the reducer to change the state.
        dispatch({ type: CREATE, payload: data });

        navigate(`/posts/${data._id}`)
    } catch (error) {
        console.log("ERROR CREATE: " + error.message);
    }
}

export const updatedPost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatedPost(id, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log("ERROR UPDATE : " + error.message);
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id);

        dispatch({ type: COMMENT, payload: data })

        return data.comments;
    } catch (error) {
        console.log("ERROR COMMENT: " + error)
    }
}

export const delete_post = (id) => async (dispatch) => {

    try {
        await api.deletedPost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log("ERROR DELETE : " + error)
    }
}

export const add_like_post = (id) => async (dispatch) => {

    try {
        const { data } = await api.add_like(id);
        dispatch({ type: ADD_LIKE, payload: data })

    } catch (error) {
        console.log("ERROR ADD LIKE :" + error.message)
    }
}