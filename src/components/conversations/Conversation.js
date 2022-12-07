import React, { useEffect, useState } from 'react';
import './Conversation.css';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';
import { ADD_USER_CONVERSATION, SET_USER_CONVERSATION } from '../../constants/actionTypes';

export default function Conversation({ conversation, currentUser }) {
    const [user,setUser] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getFriend = async () => {
            try {
                const res = await getUser(friendId);
                setUser(res.data);
                dispatch({ type: ADD_USER_CONVERSATION, payload: res.data });
            } catch (error) {
                console.log(error);
            }
        }
        getFriend();

        return () => {
            setUser({});
            dispatch({ type: SET_USER_CONVERSATION, payload: [] });
        }
    }, [conversation, currentUser._id,dispatch]);
    return (
        <div className="conversation">
            <img 
                className="conversationImg" 
                src={user?.profilePicture}
                alt=""
            />
            <span className="conversationName">{user.name}</span>
        </div>
    )
}
