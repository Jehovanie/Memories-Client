import React from 'react';
import { useState } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';

import useStyle from "./styles";
import { useDispatch } from 'react-redux';

import { commentPost } from "../../../actions/posts_actions"
import { useRef } from 'react';

const CommentSection = ({ post }) => {

    const classes = useStyle();

    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("")

    const dispatch = useDispatch();

    const commentRef = useRef();

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user.result.name} : ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id))

        setComments(newComments);
        setComment("")

        commentRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div style={{ width: user ? "50%" : "100%" }} className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="body1">
                        <strong>
                            Comments
                        </strong>
                    </Typography>

                    {comments.map((comment, index) => (
                        <Typography gutterBottom variant="subtitle1" key={index}>
                            <strong> {comment.split(": ")[0]}</strong>
                            {comment.split(":")[1]}
                        </Typography>

                    ))}
                    <div ref={commentRef} /> 
                </div>
                {user?.result?.name && (
                    <div style={{ width: "50%" }}>
                        <Typography gutterBottom variant="body1"><strong>Write a comment</strong></Typography>
                        <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}> Comment </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;