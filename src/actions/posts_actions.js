import { FETCH_ALL, DELETE, CREATE, UPDATE, ADD_LIKE } from "../constants/actionType";
import * as api from "../api";

// Action Creators
export const getPosts = () => async (dispatch) => {

    // const action = { type: 'FETCH_ALL', payload: [] }
    try {

        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {

        console.log("ERROR FETCH_ALL : " + error.message);
    }

}


export const getPostBySearch = (searchQuery) => async (dispatch) => {

    try {

        const { data } = await api.fetchPostsBySearch(searchQuery);
        console.log(data)

    } catch (error) {
        console.log("ERROR GET POST BY SEARCH : " + error.message);

    }
}

export const createPost = (post) => async (dispatch) => {

    try {

        const { data } = await api.createPost(post);  ///par defaut le data est dans le res.data 
        dispatch({ type: CREATE, payload: data })  ///call the reducer to change the state.
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