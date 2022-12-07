import React, { useEffect } from 'react';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ONLINE_USER } from '../../constants/actionTypes';

export default function Home({user}) {
    const { savedSocket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    useEffect(() => {
        if(savedSocket !== null ) {
            savedSocket.current.emit('addUser', 
                {
                    userId: user.result._id, 
                    userName: user.result.name,
                    img: user.result?.profilePicture
                }
            );
            savedSocket.current.on('getUsers', (users) => {
                dispatch({ type: SET_ONLINE_USER, payload: users });
            })
        }
    }, [user.result, savedSocket, dispatch]);

    return (
        <> 
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed/>
                <Rightbar />
            </div>
        
        </>
    )
}
