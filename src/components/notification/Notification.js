import React, { useEffect, useState } from 'react';
import './notification.css';
import { Avatar, CircularProgress } from '@mui/material';
import Emojify from 'react-emojione';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../api';
import { dateFormat } from '../../actions/format';

const Notification = ({friends=false, content}) => {
    const [user,setUser] = useState({});
    const [isGeting, setIsGeting] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const get = async() => {
            try {
                setIsGeting(true);
                const res = await getUser(content?.sender);
                setUser(res.data);
                setIsGeting(false);
            } catch (error) {
                console.log(error);
            }
        }
        get();

        return () => {
            setUser({});
        }
        
    }, [content.sender]);

    const handleRedirect = (e) => {
        if(content.link !== '') {
            console.log(content.link);
            history.push(content.link);
        } else {
            e.preventDefault();
        }
    }

    const NotifyAndMessage = () => {
        return (
            <li className="Item" onClick={(e) => handleRedirect(e)}>
                {isGeting ? <CircularProgress size={30} /> : <>
                    <div className="notifyAvatar">
                        <Avatar src={user?.profilePicture} ></Avatar>
                    </div>
                    <div className="notifyContent">
                        <p><strong>{user?.name}</strong><Emojify style={{ width: 20, height: 20 }} > {content.action}</Emojify></p>
                        <span className="notifyTime">{dateFormat(content.createdAt)}</span>
                    </div>
                    <div className="readMark"></div>
                </>}
            </li>
        )
    }

    const Friends = () => {
        return (
            <li className="Item">
                {isGeting ? <CircularProgress size={30} /> : <>
                    <div className="notifyAvatar">
                        <Avatar src={user?.profilePicture} ></Avatar>
                    </div>
                    <div className="notifyFriend">
                        <div className="notifyContent">
                            <p><strong>{user?.name}</strong><Emojify style={{ width: 20, height: 20 }} > {content.action}</Emojify></p>
                            <div className="notifyAction">
                                <button className="btn btnCancel">Hủy</button>
                                <button className="btn btnAccept">Theo dõi lại</button>
                            </div>
                            <span className="notifyTime">{dateFormat(content.createdAt) || 'vừa xong'}</span>
                        </div>
                    </div>
                </>}
            </li>
        )
    }

    return (
        !friends ? <NotifyAndMessage /> : <Friends />
    )
}


export default Notification
