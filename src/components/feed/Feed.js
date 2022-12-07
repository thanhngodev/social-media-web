import React, { useEffect, useState } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './Feed.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import { CircularProgress } from '@mui/material';

export default function Feed({user}) {
    const dispatch = useDispatch();
    const{ posts,userPosts, isLoading } = useSelector((state) => state.posts);
    const { userData } = useSelector((state) => state.user);
    const [displayPosts,setDisplayPosts] = useState([]);

    useEffect(() => {
        if(user) {
            dispatch(getPosts(user));
        }
    }, [dispatch,user]);

    useEffect(() => {
        if(user) {
            setDisplayPosts(userPosts);
        } else {
            setDisplayPosts(posts);
        }
        
    }, [user,userPosts,posts]);

    // const reloadProfile = () => {
    //     console.log("recall reload");
    //     dispatch(getPosts(user));
    // }

    if(!posts.length && !isLoading) return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    <Share />
                    <div className="feedNotPost">
                        <h4>Bạn chưa có bài viết !!!</h4>
                        <h4>Bạn hãy chia sẽ các bài viết của mình !!!</h4>
                    </div>
            </div>
        </div>
    )
    return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    { !user ? <Share id={user} /> :
                        userData.result._id === user ? <Share id={user} /> : null
                    }
                    
                    {
                        !isLoading ? 
                            displayPosts.map((p) => (
                                <div className="postWrapper" key={p._id}>
                                    <Post post={p}/>
                                </div>
                            )) : <div className="progress-circle" ><CircularProgress /> </div>
                    }
            </div>
        </div>
    )
}
