import axios from 'axios';
/**
 * this call to the back
 */

const url = "http://localhost:5000/posts";


///this return all post via the back end
export const fetchPosts = () => axios.get(url);

///this add newPost to the back end and return all post
export const createPost = (newPost) => axios.post(url, newPost);

///this use to update the post already exist
export const updatedPost = (id, post_updated) => axios.patch(`${url}/${id}`, post_updated)

///to delete one post
export const deletedPost = (id) => axios.delete(`${url}/${id}`);

///like updata but just the champ like to add.
export const add_like = (id) => axios.patch(`${url}/${id}/likePost`);