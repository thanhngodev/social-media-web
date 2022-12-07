import * as api from '../api';
import { SET_CONVERSATION } from '../constants/actionTypes';


export const getConvers = (userId) => async(dispatch) => {
    try {
        const conversations = await api.getConversations(userId);
        dispatch({ type: SET_CONVERSATION, payload: conversations.data });
    } catch (error) {
        console.log(error);
    }
}