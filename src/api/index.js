import axios from 'axios';
/**
 * this call to the back
 */

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {

    if (localStorage.getItem('profile')) {

        ///setting the header to put the all data like:
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})



///this return all post via the back end
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

///get post from back by the param/query
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

///this add newPost to the back end and return all post
export const createPost = (newPost) => API.post("/posts", newPost);

///this use to update the post already exist
export const updatedPost = (id, post_updated) => API.patch(`/posts/${id}`, post_updated)

///to delete one post 
export const deletedPost = (id) => API.delete(`/posts/${id}`);

///like updata but just the champ like to add.
export const add_like = (id) => API.patch(`posts/${id}/likePost`);

///comment post
export const commentPost = (value, id) => API.post(`/posts/${id}/comment`, { value })

///login
export const signIn = (formData) => API.post("/user/signing", formData);

///register
export const signUp = (formData) => API.post("/user/signup", formData);