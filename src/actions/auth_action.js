import { AUTH } from "../constants/actionType";
import * as api from "../api";


export const signing = (formData, navigate) => async (dispatch) => {

    try {
        //log in the user
        const { data } = await api.signIn(formData);

        ///send the action
        dispatch({ type: AUTH, data })
        navigate("/")
    } catch (error) {

        const { data } = error.response;

        ///send the action
        dispatch({ type: AUTH, data })

        //don't move the user.. 
        navigate("/auth")
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        ///sign the user
        const { data } = await api.signUp(formData);

        ///send the action
        dispatch({ type: AUTH, data })
        navigate("/")
    } catch (error) {

        const { data } = error.response;
        ///send the action
        dispatch({ type: AUTH, data })

        //don't move the user.. 
        navigate("/auth")
    }
}