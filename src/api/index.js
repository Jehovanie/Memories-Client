import axios from 'axios';
/**
 * this call to the back
 */

const API = axios.create({ baseURL: "http://localhost:5000" })



///this return all post via the back end
export const fetchPosts = () => API.get("/posts");

///this add newPost to the back end and return all post
export const createPost = (newPost) => API.post("/posts", newPost);

///this use to update the post already exist
export const updatedPost = (id, post_updated) => API.patch(`/posts/${id}`, post_updated)

///to delete one post
export const deletedPost = (id) => API.delete(`/posts/${id}`);

///like updata but just the champ like to add.
export const add_like = (id) => API.patch(`posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);