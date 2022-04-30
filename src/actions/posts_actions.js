import * as api from "../api";

// Action Creators
export const getPosts = () => async (dispatch) => {

    // const action = { type: 'FETCH_ALL', payload: [] }

    try {

        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {

        console.log("ERRORFETCH_ALL : " + error.message);
    }

}

export const createPost = (post) => async (dispatch) => {

    try {

        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {

        console.log("ERROR CREATE: " + error.message);
    }
}

export const updatedPost = (id, post) => async (dispatch) => {

    try {

        const { data } = await api.updatedPost(id, post);
        dispatch({ type: 'UPDATE', payload: data })
    } catch (error) {
        console.log("ERROR UPDATE : " + error.message);
    }
}