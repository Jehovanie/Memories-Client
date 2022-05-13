import { AUTH, LOGOUT } from "../constants/actionType";

const authReducer = (state = { authData: null }, action) => {

    switch (action.type) {

        case AUTH:
            /**
             * -------------------LOCALSTORAGE -----------------------------------------
             * The code above is the simplest implementation of the form inputs in React. 
             * By using the useState React Hook to control the component, 
             * we keep the input state up to date on every keystroke, as seen above.
             * 
             * Using the setItem() method To store the form input data in the browser storage, 
             * we must invoke the setItem() storage method by using the following syntax:
             * 
             * localStorage.setItem("key", "value")
             * 
             * So, for values of different data types like the object or array, 
             * we must convert it to a JSON string using JSON.stringify()
             */

            localStorage.setItem('profile', JSON.stringify({ ...action?.data })) ////not payload because we dispatch on the Auth component

            return { ...state, authData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null }

        default:
            return state;
    }
}

export default authReducer;