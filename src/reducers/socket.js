import { SET_SOCKET } from "../constants/actionTypes";

const initialState = {
    savedSocket: null,
}

const socketReducer = (state= initialState,action) => {
    switch (action.type) {
        case SET_SOCKET:
            return { savedSocket: action.payload };
    
        default:
            return state;
    }
}

export default socketReducer;