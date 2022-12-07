import { ADD_USER_CONVERSATION, SET_CONVERSATION, SET_USER_CONVERSATION } from "../constants/actionTypes";

const INITIALSTATE = {
    conversations: [],
    users: [],
}

const conversationReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case SET_CONVERSATION:
            return { ...state, conversations: action.payload };
    
        case ADD_USER_CONVERSATION:
            return { ...state, users: [...state.users, action.payload] };

        case SET_USER_CONVERSATION: 
            return { ...state, users: action.payload };
        default:
            return state;
    }
}

export default conversationReducer;