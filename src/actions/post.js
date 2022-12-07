import * as api from '../api';
import { CREATE, DELETE, END_CREATING, END_DELETING, END_LOADING, FETCH_ALL, FETCH_POST, START_CREATING, START_DELETING, START_LOADING, UPDATE_COMMENT } from '../constants/actionTypes';

export const createPost = (newPost,history) => async(dispatch) => {
    try {
        dispatch({ type: START_CREATING });
        const {data} = await api.createPost(newPost);
        dispatch({
            type: CREATE,
            payload: data
        });
        dispatch({ type: END_CREATING });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(id);
        dispatch({
            type: FETCH_POST,
            payload: { data }
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getTimeLine = () => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchTimeline();
        dispatch({
            type: FETCH_ALL,
            payload: { data }
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        await api.likePost(id);
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_DELETING });
        await api.deletePost(id);
        dispatch({ type: END_DELETING });
        dispatch({
            type: DELETE,
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateComments = (postId,updated) => async(dispatch) => {
    try {
        const updatedPost = await api.updateComments(postId,updated);
        dispatch({ type: UPDATE_COMMENT, payload: updatedPost.data });
    } catch (error) {
        console.log(error);
    }
}

export const addComment = (newComment) => async(dispatch) => {
    try {
        const savedComment = await api.addComment(newComment);
        console.log(savedComment.data);
    } catch (error) {
        console.log(error);
    }
}
