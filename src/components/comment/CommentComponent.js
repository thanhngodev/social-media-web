import React, { useState, useEffect } from 'react';
import { Avatar, Typography, TextField } from '@mui/material';
import { ThumbUpAlt, Reply, ArrowDropUp } from '@mui/icons-material';
import useStyles from './styles';
import { dateFormat } from '../../actions/format';
import { useDispatch, useSelector } from 'react-redux';
import { getReplies } from '../../api';
import { likeCmt } from '../../actions/comment';

function CommentComponent({comment,user,upCmt,postId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);


    const [isReply, setIsReply] = useState(false);
    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);
    const [liked, setLiked] = useState(comment.likes.includes(userData.result._id));
    const [countLiked, setCountLiked] = useState(comment.likes.length);
    const [placeholder,setPlaceholder] = useState('');

    useEffect(() => {
        const getRep = async() => {
            try {
                const rep = await getReplies(comment._id);
                setReplies(rep.data);
            } catch (error) {
                console.log(error);
            }
        }
        getRep();
    }, [postId, comment._id]);

    const likeHandler = (id) => {
        setLiked(!liked);
        setCountLiked(liked ? countLiked-1 : countLiked+1);
        dispatch(likeCmt(id));
    }

    const handleSubmit = () => { 
        const replyForm = {
            postId: postId,
            img: userData.result?.profilePicture,
            name: userData.result.name,
            message: reply,
            likes: [],
            root: comment._id,
            createdAt: Date.now()
        }
        setReply('');
        setReplies([replyForm, ...replies]);
        upCmt(replyForm);

    }

    const CommentDom = ({reply}) => {
        const [replyLiked,setReplyLiked] = useState(false);
        const [replyLikes,setReplyLikes] = useState(reply.likes.length);

        const replyLikeHandler = (id) => {
            setReplyLiked(!replyLiked);
            setReplyLikes(replyLiked ? replyLikes-1 : replyLikes+1);
            dispatch(likeCmt(id));
        }

        return (
            <div style={{ display: 'flex', marginTop: '10px', marginLeft: '35px' }}>
                <Avatar className={classes.cmtAvt} 
                src={reply?.img}>
                </Avatar>
                <div className={classes.cmtRight}>
                    <div className={classes.cmtMain}>
                        <Typography variant="subtitle2" component="span">{user.result.name === reply.name ? 'Bạn' : reply.name}</Typography>
                        <Typography color="textSecondary" className={classes.cmtTime} component="span">{dateFormat(reply.createdAt)}</Typography>
                        <Typography className={classes.cmtContent} variant="body2" component="div">
                            {reply.message}
                        </Typography>
                    </div>
                    <div className={classes.cmtAction}>
                        <div className={classes.group} onClick={() => replyLikeHandler(reply._id)} >
                        { replyLiked ? <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} color="primary" /> : 
                            <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} />
                        }
                            <span>Thích {replyLikes > 0 && `(${replyLikes})`}</span>
                        </div>
                        <div className={classes.group} onClick={() => setPlaceholder(reply.name)} >
                            <Reply sx={{ marginRight: '3px' }} />
                            <span>Trả lời</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <>
        <div className={classes.headCmtWrap}>
            <Avatar className={classes.cmtAvt} 
            src={comment?.img}>
            </Avatar>
            <div className={classes.cmtRight}>
                <div className={classes.cmtMain}>
                    <Typography variant="subtitle2" component="span">{user.result.name === comment.name ? 'Bạn' : comment.name}</Typography>
                    <Typography color="textSecondary" className={classes.cmtTime} component="span">{dateFormat(comment.createdAt)}</Typography>
                    <Typography className={classes.cmtContent} variant="body2" component="div">
                        {comment.message}
                    </Typography>
                </div>
                <div className={classes.cmtAction}>
                    <div className={classes.group} onClick={() => likeHandler(comment._id)} >
                    { liked ? <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} color="primary" /> : 
                        <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} />
                    }
                        
                        <span>Thích {countLiked > 0 && `(${countLiked})`}</span>
                    </div>
                    <div className={classes.group} onClick={() => {setPlaceholder(comment.name); setIsReply(true) }}>
                        <Reply sx={{ marginRight: '3px' }} />
                        <span>Trả lời {replies.length > 0 && `(${replies.length})`}</span>
                    </div>
                </div>
                { isReply &&
                    <div className={classes.replyInput}>
                        <TextField 
                            placeholder={placeholder !== "" ? `Trả lời ${placeholder}...` : `Trả lời...`}
                            fullWidth size="small" 
                            variant="standard"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleSubmit() }}
                            inputRef={input => input && input.focus()}
                        />
                    </div>
                }
            </div>
        </div>
        <div className={classes.replyBox}>
            {
                isReply ?
                replies.length > 0 && replies.map((reply, index) => (
                    <CommentDom key={index} reply={reply} />
                )): replies.length > 0 &&

                <div>
                    <span 
                        className={classes.viewReplyText}
                        onClick={() => setIsReply(!isReply)}
                    >
                    - Xem {replies.length} câu trả lời -
                    </span>
                </div>
            }
            { isReply && replies.length > 0 &&
                <span 
                    className={classes.dropUp}
                    onClick={() => setIsReply(!isReply)}
                >
                    Thu gọn <ArrowDropUp />
                </span>
            }
        </div>
    </>
    )
}

export default CommentComponent
