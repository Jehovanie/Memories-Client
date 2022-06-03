import { FETCH_ALL, CREATE, UPDATE, DELETE, ADD_LIKE, FETCH_BY_SEARCH } from "../constants/actionType";


const reducer = (posts = [], action) => {

    switch (action.type) {

        case FETCH_ALL:
            console.log(action.payload)
            return action.payload;

        case FETCH_BY_SEARCH:
            console.log(action.payload)
            return action.payload;

        case CREATE:
            return [...posts, action.payload];

        default:
            return posts;

        case UPDATE:
        case ADD_LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)

        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
    }
}

export default reducer;