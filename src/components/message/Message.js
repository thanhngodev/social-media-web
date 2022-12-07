import { dateFormat } from '../../actions/format';
import React from 'react'
import './Message.css';
import Emojify from 'react-emojione';
import { useSelector } from 'react-redux';

export default function Message({message, own, userData}) {
    const { users } = useSelector((state) => state.conversation);
    const currentUser = users.find((user) => user._id === message.sender);

    return (
        own ? (
            <div className="message own">
                <div className="messageTop">
                    <Emojify>
                        <p className="messageTopText">
                            {message.text}
                        </p>
                    </Emojify>
                    {/* <img
                        className="messageTopImg"
                        src={userData?.profilePicture}
                        alt=""
                    /> */}
                </div>
                <div className="messageBottom">{dateFormat(message.createdAt)}</div>
            </div>
        ) : (
            <div className="message">
                <div className="messageTop">
                    <img
                        className="messageTopImg"
                        src={currentUser?.profilePicture}
                        alt=""
                    />
                   <Emojify>
                        <p className="messageTopText">
                            {message.text}
                        </p>
                    </Emojify>
                </div>
                <div className="messageBottom">{dateFormat(message.createdAt)}</div>
            </div>
        )
    )
}
