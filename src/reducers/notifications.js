import { ADD_WAIT_TOKEN, SET_NOTIFICATIONS, SET_WAIT_TOKEN } from "../constants/actionTypes";

const initialState = {
    notifications: [],
    waitTokens: [],
}

const notificationsReducer = (state= initialState,action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return { ...state, notifications: action.payload };
    
        case ADD_WAIT_TOKEN:
            return { ...state, waitTokens: [...state.waitTokens, action.payload] };
        
        case SET_WAIT_TOKEN:
            return { ...state, waitTokens: action.payload };

        default:
            return state;
    }
}

export default notificationsReducer;