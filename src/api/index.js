import axios from 'axios';
/**
 * this call to the back
 */

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatedPost = (id, post_updated) => axios.patch(`${url}/${id}`, post_updated)
export const deletedPost = (id) => axios.delete(`${url}/${id}`);

export const add_like = (id) => axios.patch(`${url}/${id}/likePost`);