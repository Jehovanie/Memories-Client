import React from 'react';
import { useEffect } from 'react';

import { Card, CardActions, CardContent, CardMedia, Button, Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom"

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';

import useStyles from "./style"

import { getPost, getPostBySearch } from "../../actions/posts_actions";
import CommentSection from './CommentSection/CommentSection';

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }))
        }
    }, [post])

    if (!post) {
        return null;
    }

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const recommendedPost = posts.filter(({ _id }) => _id != post._id);

    const openPost = (_id) => navigate(`/posts/${_id}`)

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6} >

            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                        {post.tags.map(item => `#${item} `).join("")}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>

                    <Typography variant="h6"> Created by : {post.name} </Typography>

                    <Typography variant="body1">{moment(post.createdAt).fromNow()} </Typography>

                    <Divider style={{ margin: '20px 0 ' }} />

                    <Typography variant="body1"><strong> Realtime Chat - coming soon!!!</strong></Typography>

                    <Divider style={{ margin: '20px 0 ' }} />

                    <CommentSection post={post} />

                    <Divider style={{ margin: '20px 0 ' }} />

                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile} />
                </div>
            </div>

            {recommendedPost.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like : </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPost.map(({ title, message, name, likes, selectedFile, _id }) => (
                            <div className={classes.miniCard} onClick={() => openPost(_id)} key={_id} >
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    {(message.length > 150) ? message.substr(0, 50) + "...lire la suite" : message}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1"> Likes: {likes.length}</Typography>
                                <img className={classes.image} src={selectedFile} alt="Image" width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
};

export default PostDetails;