import React from 'react';
import './Online.css';

export default function Online({user}) {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img 
                    className="rightbarProfileImg"
                    src={user?.img}
                    alt=""
                />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.userName}</span>
        </li>
    );
};


