import { 
    Notifications, Person, Search, ArrowDropDownCircle, ExitToApp, Message
} from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Menu, MenuItem, ListItemIcon, Avatar, Badge, IconButton
} from '@mui/material';
import { withStyles } from '@mui/styles';
import decode from 'jwt-decode';

import './Topbar.css';
import { SET_SOCKET, LOGOUT, ADD_WAIT_TOKEN, SET_WAIT_TOKEN } from '../../constants/actionTypes';
import Notification from '../notification/Notification';
import { getNotifications, readNotification } from '../../actions/notifications';

export default function Topbar() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isFriendBox, setIsFriendBox] = useState(false);
    const [isChatBox, setIsChatBox] = useState(false);
    const [isNotifyBox, setIsNotifyBox] = useState(false);
    const [friendsNotify, setFriendsNotify] = useState([]);
    const [chatNotify, setChatNotify] = useState([]);
    const [postsNotify, setPostsNotify] = useState([]);
    const [unreadFriendsNotify, setUnreadFriendsNotify] = useState([]);
    const [unreadMessagesNotify, setUnreadMessagesNotify] = useState([]);
    const [unreadMainNotify, setUnreadMainNotify] = useState([]);

    const { savedSocket } = useSelector((state) => state.socket);
    const { notifications, waitTokens } = useSelector((state) => state.notifications);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    

    // Logout the session
    const handleLogout = useCallback(() => {
        savedSocket?.current.disconnect();
        dispatch({ type: SET_SOCKET, payload: null });
        dispatch({ type: LOGOUT });
        history.push('/login');
        setUser(undefined);
    }, [dispatch, history,savedSocket]);

    // send request to server to get all notifications
    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch])

    // set each of the notifications type
    useEffect(() => {
        if(notifications.length > 0) {
            const msgNotify = notifications.filter(notification => notification.type === 'message');
            const posts = notifications.filter(notification => notification.type === 'post');
            const friends = notifications.filter(notification => notification.type === 'friend');
            setChatNotify(msgNotify);
            setPostsNotify(posts);
            setFriendsNotify(friends);
        }
    }, [notifications]);

    // Set unreadable notifications
    useEffect(() => {
        if(friendsNotify.length > 0) {
            setUnreadFriendsNotify(friendsNotify.filter(friend => friend.seen === false));
            // auto read with waitTokens
            friendsNotify.forEach(notify => {
                if(waitTokens.length > 0 && waitTokens.includes(notify?.waitToken)) {
                    dispatch(readNotification(notify._id));
                    dispatch({ type: SET_WAIT_TOKEN, payload: waitTokens.filter(token => token !== notify.waitToken) });
                    setUnreadFriendsNotify([]);
                }
            })
        }
    }, [friendsNotify, dispatch]);

    useEffect(() => {
        if(chatNotify.length > 0) {
            setUnreadMessagesNotify(chatNotify.filter(friend => friend.seen === false));
            // auto read with waitTokens
            chatNotify.forEach(notify => {
                if(waitTokens.length > 0 && waitTokens.includes(notify?.waitToken)) {
                    dispatch(readNotification(notify._id));
                    dispatch({ type: SET_WAIT_TOKEN, payload: waitTokens.filter(token => token !== notify.waitToken) });
                    setUnreadMessagesNotify([]);
                }
            })
        }
    }, [chatNotify, dispatch]);

    useEffect(() => {
        if(postsNotify.length > 0) {
            setUnreadMainNotify(postsNotify.filter(friend => friend.seen === false));
            // auto read with waitTokens
            postsNotify.forEach(notify => {
                if(waitTokens.length > 0 && waitTokens.includes(notify?.waitToken)) {
                    dispatch(readNotification(notify._id));
                    dispatch({ type: SET_WAIT_TOKEN, payload: waitTokens.filter(token => token !== notify.waitToken) });
                    setUnreadMainNotify([]);
                }
            })
        }
    }, [postsNotify, dispatch]);

    // read Notifications when clicking
    const readFriendsNotify = () => {
        if(unreadFriendsNotify.length > 0) {
            unreadFriendsNotify.forEach(friend => {
                if(friend._id) {
                    dispatch(readNotification(friend._id));
                } else {
                    dispatch({ type: ADD_WAIT_TOKEN, payload: friend.waitToken });
                }
            });
            setUnreadFriendsNotify([]);
        }
    }

    const readMessagesNotify = () => {
        if(unreadMessagesNotify.length > 0) {
            unreadMessagesNotify.forEach(message => {
                if(message._id) {
                    dispatch(readNotification(message._id));
                } else {
                    dispatch({ type: ADD_WAIT_TOKEN, payload: message.waitToken });
                }
            });
            setUnreadMessagesNotify([]);
        }
    }

    const readMainNotify = () => {
        if(unreadMainNotify.length > 0) {
            unreadMainNotify.forEach(notify => {
                if(notify._id) {
                    dispatch(readNotification(notify._id));
                } else {
                    dispatch({ type: ADD_WAIT_TOKEN, payload: notify.waitToken });
                }
            });
            setUnreadMainNotify([]);
        }
    }

    // Logout when the token timeout
    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location,user?.token,handleLogout]);

    // Get notifications of socket server
    useEffect(() => {
        savedSocket?.current.on('getMessageNotify', (data) => {
            setUnreadMessagesNotify((prev) => [data, ...prev]);
            setChatNotify((prev) => [data, ...prev]);
            console.log('new message');
        });

        savedSocket?.current.on('getFriendsTag', (data) => {
            setUnreadMainNotify((prev) => [data, ...prev]);
            setPostsNotify((prev) => [data, ...prev]);
            console.log('new friends tag');
        });

        savedSocket?.current.on('getFriendsNotify', (data) => {
            setUnreadFriendsNotify((prev) => [data, ...prev]);
            setFriendsNotify((prev) => [data, ...prev]);
            console.log('new friends notify');
        });

        savedSocket?.current.on('getLikeNotify', (data) => {
            setUnreadMainNotify((prev) => [data, ...prev]);
            setPostsNotify((prev) => [data, ...prev]);
            console.log('new like notify');
        });

        savedSocket?.current.on('getCommentNotify', (data) => {
            setUnreadMainNotify((prev) => [data, ...prev]);
            setPostsNotify((prev) => [data, ...prev]);
            console.log('new comment notify');
        });

    }, [savedSocket, user.result._id])


    // dropdown list
    const [anchorEl, setAnchorEl] = React.useState(null);

    const StyledMenu = withStyles({
        paper: {
          border: '1px solid #d3d4d5',
        },
        })((props) => (
        <Menu
          elevation={0}
          anchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...props}
        />
    ));

    // Switch mode for notifications
    const switchMode = (mode) => {
        // 1: Friends
        // 2: Messages
        // 3: Notifications
        switch (mode) {
            case 1:
                setIsChatBox(false);
                setIsNotifyBox(false);
                setIsFriendBox(!isFriendBox);
                break;
        
            case 2:
                setIsChatBox(!isChatBox);
                setIsNotifyBox(false);
                setIsFriendBox(false);
                break;
            case 3:
                setIsChatBox(false);
                setIsNotifyBox(!isNotifyBox);
                setIsFriendBox(false);
                break;
            default:
                break;
        }
    }
    // jsx dom
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">SocialBook</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="search">
                    <Search className="searchIcon"/>
                    <input placeholder="Tìm kiếm bạn bè, hình ảnh, video ..." className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user?.result._id}`} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="topbarLinks" >
                        {/* <img src={user.result.profilePicture ? user.result.profilePicture : PF+'person/defaultUser.jpg'} alt="" className="topbarImg"/> */}
                        <Avatar src={user?.result.profilePicture} className="topbarAvatar">{user.result.name.charAt(0).toUpperCase()}</Avatar>
                        <span className="topbarUsername">{user.result.name.split(' ').slice(-1).join(' ')}</span>
                    </div>
                </Link>

                <div className="topbarIcons">
                    {/* Friends Notifications */}
                    <IconButton className="topbarIconButtons" onClick={() => {switchMode(1); readFriendsNotify()}}>
                        <Badge badgeContent={unreadFriendsNotify?.length} color="error" className="topbarIconItem">
                            <Person fontSize="large"/>
                        </Badge>
                    </IconButton>
                    {   isFriendBox &&   
                        <div className="box">
                            <h2 className="boxTitle">Bạn bè</h2>
                            <div className="boxDivider"></div>
                            <ul className="boxItems">
                                { friendsNotify.map((chat,id) => (
                                    <Notification key={id} content={chat} friends />
                                ))}
                            </ul>
                        </div>
                    }

                    {/* Chat Notifications */}
                    <IconButton onClick={() => {switchMode(2); readMessagesNotify()}} >
                        <Badge badgeContent={unreadMessagesNotify?.length} color="error" className="topbarIconItem">
                            <Message fontSize="large"/>
                        </Badge>
                    </IconButton>
                    {   isChatBox &&   
                        <div className="box">
                            <h2 className="boxTitle">Tin nhắn</h2>
                            <div className="boxDivider"></div>
                            <ul className="boxItems">
                                { chatNotify.map((chat,id) => (
                                    <Notification key={id} content={chat} />
                                ))}
                            </ul>
                            <span className="boxlinks" onClick={() => history.push('/chat')} > Xem tất cả trong tin nhắn </span>
                        </div>
                    }

                    {/* Posts Notifications */}
                    <IconButton onClick={() => {switchMode(3); readMainNotify()}}>
                        <Badge badgeContent={unreadMainNotify?.length} color="error" className="topbarIconItem">
                            <Notifications fontSize="large"/>
                        </Badge>
                    </IconButton>
                    {   isNotifyBox &&   
                        <div className="box">
                            <h2 className="boxTitle">Thông báo</h2>
                            <div className="boxDivider"></div>
                            <ul className="boxItems">
                                { postsNotify.map((chat,id) => (
                                    <Notification key={id} content={chat} />
                                ))}
                            </ul>
                        </div>
                    }

                    {/* Settings */}
                    <IconButton>
                        <div className="topbarIconItem">
                            <ArrowDropDownCircle 
                                fontSize="large" 
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            />
                            <StyledMenu
                                className="topbarIconItemMenu"
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem className="topbarItemMenu" >
                                    <Link to={`/profile/${user.result._id ? user.result._id : user.result.googleId}`} style={{textDecoration: 'none'}}>
                                        <div className="topbarMenu">
                                            <ListItemIcon>
                                                <Avatar src={user.result.profilePicture} className="topbarMenuAvatar">{user.result.name.charAt(0).toUpperCase()}</Avatar>
                                            </ListItemIcon>
                                            <span className="topbarMenuText">{user.result.name}</span>
                                        </div>
                                    </Link>
                                </MenuItem>
                                <MenuItem className="topbarItemMenu" onClick={handleLogout}>
                                    <div className="topbarMenu">
                                        <ListItemIcon>
                                            <ExitToApp fontSize="large" className="topbarMenuIcon"/>
                                        </ListItemIcon>
                                        <span className="topbarMenuText">Đăng xuất</span>
                                    </div>
                                </MenuItem>
                            </StyledMenu>
                        </div>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
