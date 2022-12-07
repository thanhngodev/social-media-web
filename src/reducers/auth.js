
import { AUTH, ERROR, LOGOUT } from '../constants/actionTypes';

const INITSTATE = {
    authData: JSON.parse(localStorage.getItem('profile')),
    errorMsg: ''
};


const authReducer = (state = INITSTATE,action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, errorMsg: '' };
    
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, errorMsg: '' };

        case ERROR:
            return {...state, errorMsg: action?.message } 

        default:
            return state;
    }
};

export default authReducer;