import * as api from '../api';
import { SET_NOTIFICATIONS } from '../constants/actionTypes';

export const getNotification = (id) => async(dispatch) => {
    
}

export const getNotifications = () => async(dispatch) => {
    try {
        const notifications = await api.getNotifications();
        dispatch({ type: SET_NOTIFICATIONS, payload: notifications.data })
    } catch (error) {
        console.log(error);
    }
}

export const addNotification = (notification) => async(dispatch) => {
    try {
        await api.addNotification(notification);
    } catch (error) {
        console.log(error);
    }
}

export const readNotification = (id) => async(dispatch) => {
    try {
        await api.readNotification(id);
    } catch (error) {
        console.log(error);
    }
}