import * as api from '../api';

export const likeCmt = (commentId) => async(dispatch) => {
    try {
        await api.likeComment(commentId);
    } catch (error) {
        console.log(error);
    }
}