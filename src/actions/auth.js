import * as api from '../api';
import { AUTH, ERROR, SET_USER } from '../constants/actionTypes';

export const signin = (formdata,history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formdata);
        dispatch({ type: AUTH, data });
        dispatch({ type: SET_USER, data });
        history.push('/');
    } catch (error) {
        let message = error?.response.data.message;
        dispatch({ type: ERROR, message });
        message = '';
        dispatch({ type: ERROR, message });
    }
};

export const signup = (formdata,history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formdata);
        dispatch({ type: AUTH, data });
        history.push('/changeInfo');
    } catch (error) {
        console.log(error);
    }
};

export const google = (result,token,history) => async (dispatch) => {
    try {
        const googleAccount = await api.googleAccount(result);
        
        const data = { result: googleAccount.data, token };
        
        dispatch({ type: AUTH, data });
        dispatch({ type: SET_USER, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

// export const catchError = (message) => (dispatch) =>{
//     console.log(message);
//     dispatch({ type: ERROR, message });
// };