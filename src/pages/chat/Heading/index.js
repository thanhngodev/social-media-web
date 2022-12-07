import React from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import './index.css';

const Heading = ({ id }) => {
    const { recommentFrds } = useSelector((state) => state.user);
    const [currentUser] = recommentFrds.filter(friend => friend._id === id);
    return (
        <div className="chatBoxTop-heading">
            <Avatar src={currentUser?.profilePicture}></Avatar>
            <h3>{currentUser?.name}</h3>
        </div>
    )
}

export default Heading
