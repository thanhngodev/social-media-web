import React from 'react';
import './CloseFriend.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CloseFriend({ user}) {

    // const closeFriendSidebar = () => {
    //     return(
    //         <Link to={`/profile/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
    //             <li className="sidebarFriend">
    //                 <Avatar className="sidebarFriendImg" src={user?.profilePicture}></Avatar>
    //                 <span className="sidebarFriendName">{user.name}</span>
    //             </li>
    //         </Link>
    //     )
    // }

    // const closeFriendTag = () => {
    //     return(
    //         <li className="sidebarFriend">
    //             <Avatar className="sidebarFriendImg" src={user?.profilePicture}></Avatar>
    //             <span className="sidebarFriendName">{user.name}</span>
    //         </li>
    //     )
    // }

    return (
        // <div>
        //     {sidebar ? <closeFriendSidebar user={user} /> : <closeFriendTag user={user}/>}
        // </div>
        <Link to={`/profile/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <li className="sidebarFriend">
                <Avatar className="sidebarFriendImg" src={user?.profilePicture}></Avatar>
                <span className="sidebarFriendName">{user.name}</span>
            </li>
        </Link>
    )
}
